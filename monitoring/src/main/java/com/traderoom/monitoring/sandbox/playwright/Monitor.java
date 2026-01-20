package com.traderoom.monitoring.sandbox.playwright;


import com.traderoom.monitoring.sandbox.playwright.email.MailSenderStream;
import com.traderoom.monitoring.sandbox.playwright.model.BulletWave;
import com.traderoom.monitoring.sandbox.playwright.model.BulletWaveFactory;
import com.traderoom.monitoring.sandbox.playwright.model.CanTimer;
import com.traderoom.monitoring.sandbox.playwright.model.CanTimerFactory;
import com.traderoom.monitoring.sandbox.playwright.model.Cell;
import com.traderoom.monitoring.sandbox.playwright.model.CellFactory;
import com.traderoom.monitoring.sandbox.playwright.model.Grid;
import com.traderoom.monitoring.sandbox.playwright.model.GridFactory;
import com.traderoom.monitoring.sandbox.playwright.model.State;
import com.traderoom.monitoring.sandbox.playwright.model.Timeline;
import com.traderoom.monitoring.sandbox.playwright.model.TimerState;
import com.traderoom.monitoring.sandbox.playwright.service.TimelineService;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import com.microsoft.playwright.PlaywrightException;
import com.microsoft.playwright.TimeoutError;
import java.time.Instant;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Monitor {

    private static final Logger LOGGER = LoggerFactory.getLogger(Monitor.class);

    private static final String URL = Main.properties.getProperty("buleto.url.login");
    private static final String USERNAME = Main.properties.getProperty("buleto.profile.main.email");
    private static final String PASSWORD = Main.properties.getProperty("buleto.profile.main.password");

    private final Playwright playwright;
    private final Browser browser;
    private final Page page;
    private final TimelineService<Page> service;
    private final MailSenderStream mailSenderStream;
    private final ScheduledExecutorService scheduler;

    private State<Page> state;

    public Monitor(TimelineService<Page> service, MailSenderStream mailSenderStream) {
        this.service = service;
        this.mailSenderStream = mailSenderStream;
        LOGGER.info("Инициализация Playwright...");
        playwright = Playwright.create();
        BrowserType.LaunchOptions launchOptions = new BrowserType.LaunchOptions()
                .setHeadless(true);
        browser = playwright.firefox().launch(launchOptions);
        page = browser.newPage();
        scheduler = Executors.newScheduledThreadPool(1);
    }

    public void start() {
        LOGGER.info("Запуск мониторинга...");
        authenticate();
        waitForGridLoad();
        run();
        mailSenderStream.sendToMe("Start monitor","Мониторинг запущен в " + Instant.now());
    }

    private void authenticate() {
        try {
            LOGGER.info("Открытие страницы авторизации: " + URL);
            page.navigate(URL);

            Locator popupCloseButton = page.locator("jdiv[class*='popup'] [class*='close']");
            try {
                popupCloseButton.waitFor(new Locator.WaitForOptions().setTimeout(10000));
                if (popupCloseButton.isVisible()) {
                    popupCloseButton.click();
                    page.waitForTimeout(1000);
                }
            } catch (TimeoutError e) {
                LOGGER.warn("Попап не найден, скрываем вручную.");
                try {
                    page.evaluate("document.querySelector('jdiv.jivo-popup-root')?.remove();");
                } catch (Exception ignore) {
                }
            }

            Locator emailInput = page.locator("input[placeholder='Электронная почта'][type='email']");
            Locator passwordInput = page.locator("input[placeholder='Пароль'][type='password']");
            Locator submitButton = page.locator("button.common-form__submit");

            emailInput.waitFor(new Locator.WaitForOptions().setTimeout(2000));
            passwordInput.waitFor(new Locator.WaitForOptions().setTimeout(2000));
            submitButton.waitFor(new Locator.WaitForOptions().setTimeout(2000));

            if (!emailInput.isVisible() || !passwordInput.isVisible() || !submitButton.isVisible()) {
                LOGGER.error("Элементы формы авторизации не найдены");
                return;
            }

            emailInput.fill(USERNAME);
            passwordInput.fill(PASSWORD);

            if (submitButton.isDisabled()) {
                page.evaluate("document.querySelector('button.common-form__submit').removeAttribute('disabled')");
            }

            submitButton.click();
            page.waitForURL(url -> url.contains("traderoom"), new Page.WaitForURLOptions().setTimeout(10000));

            if (page.url().contains("traderoom")) {
                LOGGER.info("Авторизация успешна!");
            } else {
                LOGGER.warn("Авторизация не удалась. Текущий URL: " + page.url());
            }
        } catch (PlaywrightException e) {
            LOGGER.error("Ошибка авторизации: " + e.getMessage());
        }
    }

    private void waitForGridLoad() {
        LOGGER.info("Ожидание загрузки элементов grid...");
        try {
            page.locator("div.grid div.div1 span.cell__factor").waitFor(new Locator.WaitForOptions().setTimeout(50000));
            page.waitForTimeout(50000);
            LOGGER.info("Grid загружен, начинаем мониторинг.");
        } catch (TimeoutError e) {
            LOGGER.warn("Grid не загрузился в течение 50 секунд, продолжаем с текущим состоянием.");
        }
    }

    private void run() {
        Timeline timeline = new Timeline();
        Grid<Page> grid = GridFactory.create(this::extractCell, page);
        BulletWave<Page> bulletWave = BulletWaveFactory.create(this::extractBulletWave, page);
        CanTimer<Page> canTimer = CanTimerFactory.create(page, this::extractTime, this::extractStatus);
        state = new State<>(timeline, grid, bulletWave, canTimer);
        state.update();

        scheduler.scheduleAtFixedRate(() -> {
            try {
                if (page.isClosed() || !browser.isConnected()) {
                    LOGGER.warn("Страница или браузер закрыты, переавторизуемся...");
                    authenticate();
                    waitForGridLoad();
                    state.update();
                    return;
                }
                LOGGER.debug("Текущий URL: " + page.url());
                TimerState timerState = state.fix();
                if (timerState == TimerState.VICTORY && !state.isSaved()) {
                    service.save(state);
                    state.saved();
                } else if (timerState == TimerState.INIT) {
                    LOGGER.debug("Инициализация состояния");
                }
            } catch (Exception e) {
                LOGGER.error("Ошибка мониторинга: " + e.getMessage(), e);
            }
        }, 0, 1000, TimeUnit.MILLISECONDS);

        scheduler.scheduleAtFixedRate(() -> {
            try {
                LOGGER.info("Периодическая переавторизация...");
                authenticate();
                waitForGridLoad();
            } catch (Exception e) {
                LOGGER.error("Ошибка переавторизации: " + e.getMessage(), e);
            }
        }, 1, 1, TimeUnit.HOURS);
    }

    public void stop() {
        LOGGER.info("Остановка мониторинга...");
        scheduler.shutdown();
        try {
            if (!scheduler.awaitTermination(10, TimeUnit.SECONDS)) {
                scheduler.shutdownNow();
                LOGGER.warn("Принудительное завершение ScheduledExecutorService");
            }
        } catch (InterruptedException e) {
            scheduler.shutdownNow();
            LOGGER.error("Ошибка при ожидании завершения ScheduledExecutorService: {}", e.getMessage(), e);
            Thread.currentThread().interrupt();
        }
        mailSenderStream.shutdown();
        try {
            browser.close();
            LOGGER.info("Браузер закрыт");
        } catch (Exception e) {
            LOGGER.error("Ошибка при закрытии браузера: {}", e.getMessage(), e);
        }
        try {
            playwright.close();
            LOGGER.info("Playwright закрыт");
        } catch (Exception e) {
            LOGGER.error("Ошибка при закрытии Playwright: {}", e.getMessage(), e);
        }

        LOGGER.info("Мониторинг полностью остановлен");
    }

    private double extractBulletWave(Page page) {
        return Double.parseDouble(page.locator("#bullet-wave span").innerText());
    }

    private Cell<Page> extractCell(Byte index, Page page) {
        return CellFactory.create(index, page, this::extractFactor, this::extractVictory);
    }

    private Double extractFactor(Byte number, Page page) {
        if(number == 0) return 0d;
        Locator cellFactor = page.locator(String.format("div.grid div.div%d span.cell__factor", number));
        return cellFactor.isVisible() ? Double.parseDouble(cellFactor.innerText().trim()) : 0;
    }

    private Boolean extractVictory(Byte number, Page page) {
        Locator cell = page.locator(String.format("div.grid div.div%d.cell-victory", number));
        return cell.isVisible();
    }

    private byte extractTime(Page page) {
        return Byte.parseByte(page.locator("div.can-timer span").first().innerText());
    }

    private TimerState extractStatus(Page page) {
        String status = page.locator("div.can-timer span").first().getAttribute("class");
        return status.contains("red") ? TimerState.RED :
                status.contains("green") ? TimerState.GREEN :
                        status.contains("init") ? TimerState.INIT : TimerState.NONE;
    }

}
