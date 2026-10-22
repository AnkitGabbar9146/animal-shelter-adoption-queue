window.QueueStorage = (() => {
  const key = "shelterdesk.adoptionRequests.v1";
  function load() {
    try {
      const saved = localStorage.getItem(key);
      if (saved === null) return { requests: [], warning: "" };
      const requests = QueueValidation.validateRecords(JSON.parse(saved));
      if (requests === null) return { requests: [], warning: "Saved requests could not be read. This session starts with an empty queue." };
      return { requests, warning: "" };
    } catch {
      return { requests: [], warning: "Browser storage is unavailable or unreadable. Changes may not persist after refresh." };
    }
  }
  function save(requests) {
    try {
      const records = QueueValidation.validateRecords(requests);
      if (records === null) throw new Error("Invalid requests");
      localStorage.setItem(key, JSON.stringify(records));
      return "";
    } catch {
      return "Requests are available in this session, but changes may not persist after refresh.";
    }
  }
  return { key, load, save };
})();
