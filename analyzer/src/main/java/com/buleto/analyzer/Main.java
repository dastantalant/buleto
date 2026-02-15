import com.buleto.analyzer.ProjectDump;
import com.trading.roulette.api.StrategyFactory;

void main() throws IOException {
//    ProjectDump.of(MonitoringMain.class.getPackage())
//            .lineImport(true)
//            .linePackage(true)
//            .include(Client.class.getPackage())
//            .include(RoundJsonParser.class)
//            .include(CharSequenceUtil.class)
//            .include(DateTimeUtil.class)
//            .exclude(StrategyFactory.class)
//            .exclude(BarnetStrategy.class.getPackage())
//            .exclude(Runner.class.getPackage())
//            .debug()
//            .write();
    ProjectDump.of(StrategyFactory.class.getPackage())
                        .lineImport(false)
            .linePackage(true)
            .debug()
            .write();
}