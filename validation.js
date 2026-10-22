window.QueueValidation = (() => {
  const animalTypes = ["Dog", "Cat", "Rabbit", "Other"];
  const statuses = ["Pending", "In Review", "Completed"];
  const normalizeName = (value) => value.trim().replace(/\s+/g, " ");

  function validateApplicant(input) {
    const errors = {};
    const data = {};
    for (const [field, label] of [["applicantName", "an applicant name"], ["animalName", "an animal name"]]) {
      const value = typeof input[field] === "string" ? input[field].trim() : "";
      if (!value) errors[field] = `Enter ${label}.`;
      else if (value.length > 80) errors[field] = "Use no more than 80 characters.";
      data[field] = normalizeName(value);
    }
    data.applicantEmail = typeof input.applicantEmail === "string" ? input.applicantEmail.trim() : "";
    if (!data.applicantEmail) errors.applicantEmail = "Enter an email address.";
    else if (data.applicantEmail.length > 254) errors.applicantEmail = "Use no more than 254 characters.";
    else if (!/^[^\s@.][^\s@]*@[^\s@.]+(?:\.[^\s@.]+)+$/.test(data.applicantEmail)) errors.applicantEmail = "Enter a valid email address.";
    data.animalType = input.animalType;
    if (!animalTypes.includes(data.animalType)) errors.animalType = "Select an animal type.";
    return { valid: Object.keys(errors).length === 0, errors, data };
  }

  function validateRecords(value) {
    if (!Array.isArray(value)) return null;
    const ids = new Set();
    const records = [];
    for (const item of value) {
      if (!item || typeof item !== "object") return null;
      const result = validateApplicant(item);
      const validDate = typeof item.createdAt === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(item.createdAt) && Number.isFinite(Date.parse(item.createdAt));
      if (!result.valid || typeof item.id !== "string" || !item.id || item.id.length > 100 || ids.has(item.id) || !statuses.includes(item.status) || !validDate) return null;
      ids.add(item.id);
      records.push({ ...result.data, id: item.id, status: item.status, createdAt: item.createdAt });
    }
    return records;
  }
  return { animalTypes, statuses, validateApplicant, validateRecords };
})();
