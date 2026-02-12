const AppConfig = {
    apiBase: "",
    openapiUrl: "/api/doc",

    defaultPageSize: 20,

    hiddenResources: ["simulate"],

    resourceSettings: {
        "round": {
            canCreate: false,
            canEdit: false,
            canDelete: false
        },
        "config": { canCreate: true, canEdit: true, canDelete: true },
        "account": { canCreate: true, canEdit: true, canDelete: true }
    },

    // Настройки отображения полей
    fields: {
        // Поля, скрытые в формах (Create/Edit)
        hideInForm: ["id", "created", "updated", "version", "deleted"],

        // Поля, скрытые в таблицах (List)
        hideInTable: ["payload", "password", "strategies"],

        // Форматтеры для таблицы (преобразование данных для чтения)
        formatters: {
            // Форматирование Instant (2026-01-21T05:32:10Z) в читаемый вид
            "created": (val) => formatDate(val),
            "updated": (val) => formatDate(val),
            "start_time": (val) => formatDate(val),
            "victory_time": (val) => formatDate(val),

            // Форматирование денег и чисел
            "balance": (val) => val !== null ? new Intl.NumberFormat('ru-RU').format(val) : "",
            "factor": (val) => val,
            "blocked": (val) => val ? "⛔ YES" : "Active",

            // Если объект, показываем кратко
            "user": (val) => val ? (val.email || `User#${val.id}`) : "-"
        }
    },

    // Кастомные страницы (если нужны)
    customRoutes: {},

    // Главная страница
    renderDashboard: (root, resources) => {
        root.append(Utils.h("h1", {}, "Dashboard"));
        const grid = Utils.h("div", { style: "display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;" });
        resources.forEach(res => {
            grid.append(Utils.h("div", { class: "card", style:"cursor:pointer; transition: transform 0.2s;", onclick:()=>location.hash=`#/${res.name}`},
                Utils.h("h3", {style:"margin:0 0 10px 0; color:var(--primary)"}, res.name.toUpperCase()),
                Utils.h("div", {style:"color:#94a3b8; font-size:0.9rem"},
                    Utils.h("span", {}, `${res.endpoints.length} operations`)
                )
            ));
        });
        root.append(grid);
    }
};

// Хелпер для дат
function formatDate(isoString) {
    if (!isoString) return "-";
    try {
        return new Date(isoString).toLocaleString("ru-RU", {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
    } catch (e) { return isoString; }
}

/* ============================================================
   2. FRAMEWORK KERNEL
   ============================================================ */

/* --- Utils --- */
const Utils = {
    // Функция создания DOM элементов
    h(tag, attrs = {}, ...children) {
        const e = document.createElement(tag);
        for (const k in attrs) {
            if (k.startsWith("on")) e.addEventListener(k.substring(2).toLowerCase(), attrs[k]);
            else if (attrs[k] !== null && attrs[k] !== undefined && attrs[k] !== false) e.setAttribute(k, attrs[k]);
        }
        children.flat().forEach(c => {
            if (c === null || c === undefined) return;
            e.append(c instanceof Node ? c : document.createTextNode(String(c)));
        });
        return e;
    },

    // Безопасный рендер HTML из описания Swagger
    renderHTML(htmlContent) {
        if (!htmlContent) return null;
        const div = document.createElement("div");
        div.className = "help-text html-content";
        div.innerHTML = htmlContent;
        return div;
    },

    // HTTP Запросы
    async request(path, method = "GET", body = null) {
        const opts = { method, headers: { "Content-Type": "application/json" } };
        if (body) opts.body = JSON.stringify(body);
        try {
            // Убираем двойные слеши, если apiBase заканчивается на /
            const url = (AppConfig.apiBase + path).replace(/([^:]\/)\/+/g, "$1");
            const r = await fetch(url, opts);
            if (!r.ok) {
                let errText = await r.text();
                try { errText = JSON.stringify(JSON.parse(errText), null, 2); } catch(e){}
                alert(`Error ${r.status}:\n${errText}`);
                throw new Error(errText);
            }
            return r.status === 204 ? null : r.json();
        } catch (e) {
            console.error(e);
            return null;
        }
    }
};

/* --- Schema Engine --- */
const Schema = {
    spec: null,
    init(spec) { this.spec = spec; },
    // Разрешение ссылок $ref: "#/components/schemas/..."
    resolveRef(ref) {
        if (!ref || !ref.startsWith("#/")) return null;
        const parts = ref.split("/").slice(1);
        let current = this.spec;
        for (const p of parts) { if (!current) return null; current = current[p]; }
        return current;
    },
    get(schemaOrRef) {
        if (!schemaOrRef) return {};
        if (schemaOrRef.$ref) return this.get(this.resolveRef(schemaOrRef.$ref));
        return schemaOrRef;
    }
};

/* --- UI Components --- */
const UI = {
    /**
     * Поле поиска (Client-side)
     */
    searchBar(onInput) {
        return Utils.h("input", {
            type: "text",
            placeholder: "🔍 Filter loaded records...",
            style: "margin-bottom: 1rem; padding: 10px; width: 100%; max-width: 400px; border: 1px solid #334155;",
            oninput: (e) => onInput(e.target.value.toLowerCase())
        });
    },

    /**
     * Пагинация (на основе Spring Page object)
     */
    pagination(pageMeta, onPageChange) {
        // pageMeta structure: { size, number, totalElements, totalPages }
        if (!pageMeta || pageMeta.totalPages <= 1) return "";

        const { number, totalPages, totalElements } = pageMeta;
        const current = number; // Spring pages are 0-indexed

        const btn = (label, targetPage, isActive = false, isDisabled = false) => Utils.h("button", {
            class: `btn-page ${isActive ? 'active' : ''}`,
            disabled: isDisabled || isActive,
            onclick: () => onPageChange(targetPage)
        }, label);

        return Utils.h("div", { class: "pagination" },
            Utils.h("span", { class: "page-info" }, `Page ${current + 1} of ${totalPages} (${totalElements} items)`),
            btn("«", 0, false, current === 0),
            btn("‹", current - 1, false, current === 0),
            btn(String(current + 1), current, true),
            btn("›", current + 1, false, current === totalPages - 1),
            btn("»", totalPages - 1, false, current === totalPages - 1)
        );
    },

    /**
     * Таблица данных
     */
    table(data, columns, actions = []) {
        if (!data || data.length === 0) return Utils.h("div", { class: "empty" }, "No records found.");

        if (!columns) columns = Object.keys(data[0]);
        // Фильтр колонок из конфига
        columns = columns.filter(c => !AppConfig.fields.hideInTable.includes(c));

        const tbody = Utils.h("tbody", {},
            ...data.map(item => {
                // Создаем строку и добавляем data-атрибут для поиска
                const searchStr = Object.values(item).join(" ").toLowerCase();
                const row = Utils.h("tr", { "data-search": searchStr },
                    ...columns.map(c => {
                        let val = item[c];
                        // Применение форматтеров
                        if (AppConfig.fields.formatters[c]) {
                            val = AppConfig.fields.formatters[c](val, item);
                        } else if (typeof val === 'object' && val !== null) {
                            val = "{...}";
                        }
                        return Utils.h("td", {}, val);
                    }),
                    actions.length ? Utils.h("td", { class: "actions" }, ...actions.map(act => act(item))) : null
                );
                return row;
            })
        );

        const tableComp = Utils.h("div", { class: "table-wrapper" },
            Utils.h("table", { class: "data-table" },
                Utils.h("thead", {},
                    Utils.h("tr", {},
                        ...columns.map(c => Utils.h("th", {}, c)),
                        actions.length ? Utils.h("th", {}, "Actions") : null
                    )
                ),
                tbody
            )
        );
        tableComp.tbody = tbody; // Ссылка для поиска
        return tableComp;
    },

    description(schema) {
        if (!schema.description) return null;
        return Utils.renderHTML(schema.description);
    },

    /**
     * Универсальный Input
     */
    inputField(key, schema, model, isRequired) {
        schema = Schema.get(schema);
        let inputType = "text";
        // Определение типа HTML5 input
        if (schema.type === "integer" || schema.type === "number") inputType = "number";
        else if (schema.type === "boolean") inputType = "checkbox";
        else if (schema.format === "date") inputType = "date";
        else if (schema.format === "date-time") inputType = "datetime-local";

        // Дефолтные значения
        if (model[key] === undefined && schema.default !== undefined) model[key] = schema.default;

        let control;
        if (schema.enum) {
            // SELECT для Enum
            control = Utils.h("select", {
                    required: isRequired,
                    onchange: (e) => model[key] = e.target.value
                },
                Utils.h("option", {value: ""}, "-- select --"),
                ...schema.enum.map(v => Utils.h("option", { value: v, selected: model[key] === v }, v))
            );
        } else {
            // INPUT
            const attrs = {
                type: inputType,
                required: isRequired && inputType !== 'checkbox',
                placeholder: schema.example || "",
                min: schema.minimum, max: schema.maximum, pattern: schema.pattern
            };

            // Логика отображения значений
            if (model[key] !== undefined && model[key] !== null) {
                if (inputType === "datetime-local") {
                    // Обрезаем Instant (2026-01-21T05:32:10Z) до (2026-01-21T05:32) для input
                    try { attrs.value = String(model[key]).substring(0, 16); } catch(e){}
                }
                else if (inputType === "date") attrs.value = String(model[key]).split("T")[0];
                else if (inputType === "checkbox") attrs.checked = model[key] === true;
                else attrs.value = model[key];
            }

            // Логика сохранения значений
            attrs.oninput = (e) => {
                let val = e.target.value;
                if (inputType === "number") val = val ? Number(val) : null;
                if (inputType === "checkbox") val = e.target.checked;
                // Восстанавливаем формат Instant для Java
                if (inputType === "datetime-local" && val) val = val + ":00Z";
                model[key] = val;
            };
            control = Utils.h("input", attrs);
        }

        return Utils.h("div", { class: "form-control" },
            Utils.h("label", {}, key, isRequired ? Utils.h("span", {style:"color:#ef4444"}, "*") : null),
            control,
            this.description(schema)
        );
    },

    /**
     * Поле для массивов
     */
    arrayField(key, schema, model) {
        const itemSchema = Schema.get(schema.items);
        if (!model[key]) model[key] = [];

        const listContainer = Utils.h("div", { class: "array-list" });
        const renderList = () => {
            listContainer.innerHTML = "";
            model[key].forEach((val, idx) => {
                listContainer.append(Utils.h("div", { class: "array-item" },
                    Utils.h("span", {}, String(val)),
                    Utils.h("button", { type:"button", class:"btn-sm btn-danger", onclick: () => { model[key].splice(idx, 1); renderList(); }}, "×")
                ));
            });
        };
        renderList();

        let inputControl;
        if (itemSchema.enum) {
            inputControl = Utils.h("select", { class: "array-input" },
                Utils.h("option", { value: "" }, "- select -"),
                ...itemSchema.enum.map(v => Utils.h("option", { value: v }, v))
            );
        } else {
            inputControl = Utils.h("input", { class: "array-input", type: itemSchema.type === "integer" ? "number" : "text", placeholder: "Add item..." });
        }

        const addBtn = Utils.h("button", { type:"button", class:"btn-sm", onclick: () => {
                const val = inputControl.value;
                if (val) {
                    model[key].push((itemSchema.type==="integer"||itemSchema.type==="number") ? Number(val) : val);
                    inputControl.value = "";
                    renderList();
                }
            }}, "Add");

        return Utils.h("div", { class: "form-control" },
            Utils.h("label", {}, key + " [ ]"),
            listContainer,
            Utils.h("div", { class: "array-add-row" }, inputControl, addBtn),
            this.description(schema)
        );
    },

    /**
     * Рекурсивный генератор формы
     */
    buildFormInputs(schema, model, pathPrefix = "") {
        const container = Utils.h("div", { class: "fields-group" });
        schema = Schema.get(schema);
        const requiredFields = schema.required || [];

        if (schema.type === "object" && schema.properties) {
            for (const key in schema.properties) {
                // Скрытие полей по конфигу
                if (AppConfig.fields.hideInForm.includes(key)) continue;

                const propSchema = Schema.get(schema.properties[key]);
                const isRequired = requiredFields.includes(key);

                if (propSchema.type === "object") {
                    if (!model[key]) model[key] = {};
                    container.append(Utils.h("fieldset", {},
                        Utils.h("legend", {}, key + (isRequired?"*":"")),
                        this.description(propSchema),
                        this.buildFormInputs(propSchema, model[key], pathPrefix ? `${pathPrefix}.${key}` : key)
                    ));
                } else if (propSchema.type === "array") {
                    container.append(this.arrayField(key, propSchema, model));
                } else {
                    container.append(this.inputField(key, propSchema, model, isRequired));
                }
            }
        }
        return container;
    }
};

/* --- Router & Logic --- */
const Router = {
    resources: [],

    init(openapiSpec) {
        Schema.init(openapiSpec);
        this.parseResources(openapiSpec);
        window.addEventListener("hashchange", () => this.route());
        this.route();
    },

    parseResources(spec) {
        const map = {};
        for (const path in spec.paths) {
            const methods = spec.paths[path];
            for (const method in methods) {
                const op = methods[method];
                if (!op.tags) continue;
                const name = op.tags[0].replace("-controller", "");
                if (AppConfig.hiddenResources.includes(name)) continue;

                if (!map[name]) map[name] = { name, endpoints: [] };
                map[name].endpoints.push({ method, path, op });
            }
        }
        this.resources = Object.values(map);
    },

    async route() {
        const app = document.getElementById("app");
        const hash = location.hash.replace("#/", "");
        const [segment1, segment2, segment3] = hash.split("/");

        app.innerHTML = "";

        // Navigation
        const nav = Utils.h("nav", {},
            Utils.h("div", { class: "brand", onclick:()=>location.hash="" }, "AdminUI"),
            ...Object.keys(AppConfig.customRoutes).map(r => Utils.h("a", { href:`#/${r}`, class: r===segment1?"active":"" }, r.toUpperCase())),
            ...this.resources.map(r => Utils.h("a", { href:`#/${r.name}`, class: r.name===segment1?"active":"" }, r.name.toUpperCase()))
        );

        const main = Utils.h("main", {});
        app.append(nav, main);

        // Dashboard
        if (!segment1) {
            if (AppConfig.renderDashboard) AppConfig.renderDashboard(main, this.resources);
            return;
        }

        // Custom Routes
        if (AppConfig.customRoutes[segment1]) {
            await AppConfig.customRoutes[segment1](main);
            return;
        }

        // Resource Routes
        const res = this.resources.find(r => r.name === segment1);
        if (!res) {
            main.innerHTML = "<div class='card'><h2>404 Resource Not Found</h2></div>";
            return;
        }

        if (segment2 === "new") {
            await this.renderCreate(main, res);
        } else if (segment2 === "edit" && segment3) {
            await this.renderEdit(main, res, segment3);
        } else {
            await this.renderList(main, res);
        }
    },

    // --- LIST VIEW (Pagination + Search) ---
    async renderList(root, res) {
        const settings = AppConfig.resourceSettings[res.name] || { canCreate: true, canEdit: true, canDelete: true };
        const listEp = res.endpoints.find(e => e.method === "get" && !e.path.includes("{id}"));
        const createEp = res.endpoints.find(e => e.method === "post");

        // Header
        root.append(Utils.h("header", { class: "view-header" },
            Utils.h("h2", {}, `${res.name} List`),
            (settings.canCreate && createEp) ? Utils.h("a", { href: `#/${res.name}/new`, class: "btn btn-primary" }, "Create New") : null
        ));

        if (!listEp) return root.append("No list endpoint.");

        // UI Containers
        const filterInput = UI.searchBar((term) => {
            if (!currentTableRef || !currentTableRef.tbody) return;
            // Client-side filtering
            Array.from(currentTableRef.tbody.children).forEach(row => {
                const text = row.getAttribute("data-search") || "";
                row.style.display = text.includes(term) ? "" : "none";
            });
        });
        root.append(filterInput);

        const tableContainer = Utils.h("div", {});
        const paginationContainer = Utils.h("div", {});
        root.append(tableContainer, paginationContainer);

        let currentTableRef = null;
        let pageSize = AppConfig.defaultPageSize;

        // Fetch Logic
        const loadData = async (page) => {
            tableContainer.innerHTML = "<div style='padding:20px; text-align:center; color:#94a3b8'>Loading...</div>";
            paginationContainer.innerHTML = "";

            // Запрос на сервер: /api/round?page=0&size=20&sort=id,desc
            const sep = listEp.path.includes("?") ? "&" : "?";
            const url = `${listEp.path}${sep}page=${page}&size=${pageSize}&sort=id,desc`;

            const data = await Utils.request(url);
            tableContainer.innerHTML = "";

            if (!data) return;

            // Обработка Spring Page response: { content: [], page: { size, number, ... } }
            const items = data.content || (Array.isArray(data) ? data : []);
            const pageMeta = data.page;

            // Actions Column
            const actions = [];
            if (settings.canEdit) {
                const editEp = res.endpoints.find(e => e.method === "put" && e.path.includes("{id}"));
                if (editEp) actions.push((item) => Utils.h("a", { href:`#/${res.name}/edit/${item.id}`, class:"btn-sm" }, "Edit"));
            }
            if (settings.canDelete) {
                const delEp = res.endpoints.find(e => e.method === "delete" && e.path.includes("{id}"));
                if (delEp) {
                    actions.push((item) => Utils.h("button", { class:"btn-sm btn-danger", onclick: async() => {
                            if(confirm("Delete this item?")) {
                                await Utils.request(delEp.path.replace("{id}", item.id), "DELETE");
                                loadData(page); // Reload
                            }
                        }}, "Del"));
                }
            }

            // Render
            currentTableRef = UI.table(items, null, actions);
            tableContainer.append(currentTableRef);

            if (pageMeta) {
                paginationContainer.append(UI.pagination(pageMeta, (newPage) => loadData(newPage)));
            }

            // Re-apply filter if text exists
            if (filterInput.value) filterInput.dispatchEvent(new Event('input'));
        };

        // Start
        await loadData(0);
    },

    // --- CREATE VIEW ---
    async renderCreate(root, res) {
        const ep = res.endpoints.find(e => e.method === "post");
        this.renderFormView(root, res, ep, "Create New", {});
    },

    // --- EDIT VIEW ---
    async renderEdit(root, res, id) {
        const ep = res.endpoints.find(e => e.method === "put" && e.path.includes("{id}"));
        const listEp = res.endpoints.find(e => e.method === "get" && !e.path.includes("{id}"));
        let data = {};

        // Поиск данных (Fallback через List endpoint)
        if (listEp) {
            const resp = await Utils.request(`${listEp.path}?page=0&size=100`);
            const list = resp.content || resp;
            data = list.find(i => String(i.id) === String(id)) || {};
        }
        this.renderFormView(root, res, ep, `Edit #${id}`, data, id);
    },

    renderFormView(root, res, ep, title, initialData, id = null) {
        if (!ep) return root.append("Endpoint configuration error: No PUT/POST method found.");

        let schema = ep.op.requestBody?.content["application/json"]?.schema;
        if (!schema) return root.append("No schema defined for this endpoint.");

        let isArray = false;
        if (schema.type === "array") { isArray = true; schema = schema.items; }

        // Deep copy data
        const model = initialData ? JSON.parse(JSON.stringify(initialData)) : {};

        const form = Utils.h("form", {
                onsubmit: async (e) => {
                    e.preventDefault();
                    const path = id ? ep.path.replace("{id}", id) : ep.path;
                    const payload = isArray ? [model] : model;
                    const r = await Utils.request(path, ep.method.toUpperCase(), payload);
                    if (r !== null) location.hash = `#/${res.name}`;
                }
            },
            UI.buildFormInputs(schema, model),
            Utils.h("div", { class: "form-actions" },
                Utils.h("button", { type:"submit", class:"btn btn-primary" }, "Save Changes"),
                Utils.h("a", { href:`#/${res.name}`, class:"btn" }, "Cancel")
            )
        );

        root.append(Utils.h("h2", {}, title), Utils.h("div", { class: "card" }, form));
    }
};

/* ============================================================
   3. BOOTSTRAP (Styles & Init)
   ============================================================ */
(async () => {
    // CSS Styles
    document.head.append(Utils.h("style", {}, `
        :root { --bg: #0f172a; --card: #1e293b; --text: #e2e8f0; --primary: #3b82f6; --danger: #ef4444; --border: #334155; }
        * { box-sizing: border-box; }
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: var(--bg); color: var(--text); }
        a { color: var(--primary); text-decoration: none; cursor: pointer; }
        
        /* Navigation */
        nav { background: #020617; padding: 1rem; border-bottom: 1px solid var(--border); display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
        nav .brand { font-weight: bold; color: white; margin-right: 1rem; cursor: pointer; font-size: 1.2rem; }
        nav a { color: #94a3b8; padding: 6px 12px; border-radius: 6px; font-size: 0.9rem; transition: 0.2s; }
        nav a:hover, nav a.active { background: var(--card); color: white; }

        /* Main Layout */
        main { padding: 2rem; max-width: 1400px; margin: 0 auto; }
        .card { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem; }
        
        /* Table */
        .table-wrapper { overflow-x: auto; background: var(--card); border-radius: 8px; border: 1px solid var(--border); margin-bottom: 1rem; }
        table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem; white-space: nowrap; }
        th, td { padding: 12px 16px; border-bottom: 1px solid var(--border); }
        th { background: #020617; font-weight: 600; color: white; position: sticky; top: 0; }
        tr:hover { background: #334155; }
        
        /* Pagination */
        .pagination { display: flex; align-items: center; justify-content: flex-end; gap: 5px; margin-top: 15px; }
        .page-info { color: #94a3b8; font-size: 0.9rem; margin-right: 10px; }
        .btn-page { background: var(--card); border: 1px solid var(--border); color: var(--text); padding: 5px 10px; border-radius: 4px; cursor: pointer; }
        .btn-page:hover { border-color: var(--primary); }
        .btn-page.active { background: var(--primary); color: white; border-color: var(--primary); }
        .btn-page:disabled { opacity: 0.5; cursor: default; }

        /* Forms */
        .view-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .form-control { margin-bottom: 1.5rem; }
        .form-control label { display: block; margin-bottom: 8px; font-size: 0.9rem; color: #cbd5e1; font-weight: 500; }
        
        .help-text { display: block; margin-top: 6px; color: #64748b; font-size: 0.8rem; line-height: 1.5; }
        .help-text strong { color: #cbd5e1; font-weight: 600; }
        .help-text code { background: #334155; padding: 2px 5px; font-family: monospace; border-radius: 4px; color: #e2e8f0; }
        .help-text ul { padding-left: 20px; margin: 5px 0; }
        
        input, select { width: 100%; padding: 10px; background: #020617; border: 1px solid var(--border); color: white; border-radius: 6px; outline: none; transition: border 0.2s; }
        input:focus, select:focus { border-color: var(--primary); box-shadow: 0 0 0 2px rgba(59,130,246,0.2); }
        
        fieldset { border: 1px solid var(--border); margin-bottom: 1.5rem; padding: 1.5rem; border-radius: 8px; background: rgba(2, 6, 23, 0.3); }
        legend { padding: 0 8px; color: var(--primary); font-weight: 600; }
        
        .array-item { display: flex; justify-content: space-between; align-items: center; background: #0f172a; padding: 8px 12px; margin-bottom: 6px; border-radius: 6px; border: 1px solid #334155; }
        .array-add-row { display: flex; gap: 8px; margin-top: 8px; }
        .array-input { flex-grow: 1; }
        
        /* Buttons */
        .btn, .btn-primary, .btn-sm { display: inline-block; padding: 8px 16px; border-radius: 6px; border: none; cursor: pointer; font-size: 0.9rem; color: white; background: #475569; transition: 0.2s; }
        .btn-primary { background: var(--primary); }
        .btn-danger { background: var(--danger); }
        .btn-sm { padding: 4px 10px; font-size: 0.8rem; margin-right: 4px; }
        .btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .form-actions { display: flex; gap: 12px; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border); }
        
        .empty { padding: 3rem; text-align: center; color: #64748b; background: var(--card); border-radius: 8px; border: 1px solid var(--border); }
    `));

    // Application Init
    try {
        const res = await fetch(AppConfig.openapiUrl);
        const spec = await res.json();
        Router.init(spec);
    } catch (e) {
        document.getElementById("app").innerHTML = `<div style="color:red;padding:20px;text-align:center">
            <h3>Failed to load API Specification</h3>
            <p>Ensure backend is running at ${AppConfig.apiBase}</p>
            <pre>${e.message}</pre>
        </div>`;
    }
})();