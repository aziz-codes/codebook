export const validator = (payload) => {
  for (const [key, value] of Object.entries(payload)) {
    if (!value || value.trim?.() === "") {
      return {
        success: false,
        message: `${formatKey(key)} is required.`,
      };
    }
  }

  return {
    success: true,
    message: "All fields are valid.",
  };
};

// optional helper to make keys more readable
const formatKey = (key) => {
  return key
    .replace(/([A-Z])/g, " $1") // camelCase → camel Case
    .replace(/_/g, " ") // snake_case → snake case
    .replace(/\b\w/g, (l) => l.toUpperCase()); // capitalize
};
