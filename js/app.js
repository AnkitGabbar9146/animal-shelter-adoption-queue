(() => {
  const form = document.querySelector(".adoption-form");
  const search = document.getElementById("search");
  const filter = document.getElementById("status-filter");
  const list = document.querySelector(".request-list");
  const message = document.querySelector(".form-message");
  const warning = document.querySelector(".storage-warning");
  const emptyTemplate = list.querySelector(".empty-state").cloneNode(true);
  const fields = ["applicantName", "applicantEmail", "animalName", "animalType"];
  const saved = QueueStorage.load();
  let requests = saved.requests;

  function showWarning(text) {
    warning.textContent = text;
    warning.hidden = !text;
  }
  function showErrors(errors) {
    for (const field of fields) {
      const control = form.elements.namedItem(field);
      document.getElementById(`${field}-error`)?.remove();
      control.setAttribute("aria-invalid", String(Boolean(errors[field])));
      control.removeAttribute("aria-describedby");
      if (errors[field]) {
        const error = document.createElement("p");
        error.id = `${field}-error`;
        error.className = "field-error";
        error.textContent = errors[field];
        control.closest(".field").append(error);
        control.setAttribute("aria-describedby", error.id);
      }
    }
  }
  function readForm() {
    return Object.fromEntries(fields.map((field) => [field, form.elements.namedItem(field).value]));
  }
  function persist(confirmation) {
    showWarning(QueueStorage.save(requests));
    message.textContent = confirmation;
    QueueAnalytics.logInteraction();
    render();
  }
  function createRow(request, index) {
    const row = document.createElement("li");
    row.className = "request-row";
    const info = document.createElement("div");
    info.className = "request-info";
    const name = document.createElement("h3");
    name.textContent = request.applicantName;
    const animal = document.createElement("p");
    animal.textContent = `${request.animalName} · ${request.animalType}`;
    const date = document.createElement("time");
    date.className = "request-date";
    date.dateTime = request.createdAt;
    date.textContent = new Date(request.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
    info.append(name, animal, date);
    const status = document.createElement("div");
    status.className = `select-wrapper request-status${request.status === "Completed" ? " status-completed" : ""}`;
    const label = document.createElement("label");
    label.className = "sr-only";
    label.htmlFor = `request-status-${index}`;
    label.textContent = `Status for ${request.applicantName}`;
    const select = document.createElement("select");
    select.id = label.htmlFor;
    for (const value of QueueValidation.statuses) select.add(new Option(value, value));
    select.value = request.status;
    select.addEventListener("change", () => {
      if (!QueueValidation.statuses.includes(select.value) || select.value === request.status) return;
      const nextStatus = select.value;
      requests = requests.map((item) => item.id === request.id ? { ...item, status: nextStatus } : item);
      persist(`Request status updated to ${nextStatus}.`);
      document.getElementById(select.id)?.focus();
    });
    const dot = document.createElement("span");
    dot.className = "status-dot";
    status.append(label, dot, select);
    row.append(info, status);
    return row;
  }
  function render() {
    const term = search.value.trim().toLowerCase();
    const visible = requests.filter((request) => (filter.value === "All statuses" || request.status === filter.value) && (request.applicantName.toLowerCase().includes(term) || request.animalName.toLowerCase().includes(term)));
    const counts = [requests.length, requests.filter((r) => r.status === "Pending").length, requests.filter((r) => r.status === "Completed").length];
    document.querySelectorAll(".summary-number").forEach((node, index) => { node.textContent = String(counts[index]).padStart(2, "0"); });
    document.querySelector(".queue-count").textContent = requests.length;
    const footer = document.querySelector(".queue-footer span");
    footer.textContent = `${visible.length} ${visible.length === 1 ? "request" : "requests"}${term || filter.value !== "All statuses" ? ` of ${requests.length}` : " in your queue"}`;
    list.replaceChildren();
    list.setAttribute("aria-busy", "false");
    if (visible.length) {
      const ul = document.createElement("ul");
      visible.forEach((request, index) => ul.append(createRow(request, index)));
      list.append(ul);
    } else {
      const empty = emptyTemplate.cloneNode(true);
      if (requests.length) {
        empty.querySelector("p").textContent = "No requests match your search or filter.";
        empty.querySelector(".empty-hint")?.remove();
        const clear = document.createElement("button");
        clear.type = "button";
        clear.textContent = "Clear filters";
        clear.addEventListener("click", () => { search.value = ""; filter.value = "All statuses"; render(); search.focus(); });
        empty.append(clear);
      }
      list.append(empty);
    }
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = QueueValidation.validateApplicant(readForm());
    showErrors(result.errors);
    if (!result.valid) {
      message.textContent = "Please check the highlighted fields.";
      form.elements.namedItem(Object.keys(result.errors)[0]).focus();
      return;
    }
    const id = globalThis.crypto?.randomUUID?.() ?? `request-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    requests.unshift({ ...result.data, id, status: "Pending", createdAt: new Date().toISOString() });
    persist("Adoption interest added to the queue.");
    form.reset();
    showErrors({});
  });
  for (const field of fields) {
    form.elements.namedItem(field).addEventListener("input", () => {
      if (document.getElementById(`${field}-error`)) showErrors(QueueValidation.validateApplicant(readForm()).errors);
    });
  }
  search.addEventListener("input", render);
  filter.addEventListener("change", render);
  showWarning(saved.warning);
  render();
})();
