import { iTaskWithoutId } from "../interfaces/iTask";

export const resetTaskValues = () => {
  return {
    title: "",
    description: "",
    isCompleted: false,
  };
};

export const areAllPropertiesEmpty = (obj: iTaskWithoutId): boolean => {
  // Check if "title" and "description" properties are empty
  if (obj.title.length === 0 || obj.description.length === 0) {
    return true;
  }

  // Get an array of all other property values
  const otherValues = Object.values(obj).filter(
    (key) => key !== "title" && key !== "description"
  );

  // Use Array.every() to check if all values are empty
  const allEmpty = otherValues.every((value) => {
    // Check if the value is boolean
    if (typeof value === "boolean") return true;
    // Check if the value is empty (null, undefined, empty string, empty array, empty object)
    if (value === null || value === undefined) {
      return true;
    } else if (value.trim() === "") {
      return true;
    } else if (Array.isArray(value) && value.length === 0) {
      return true;
    } else if (typeof value === "object" && Object.keys(value).length === 0) {
      return true;
    }

    // If none of the above conditions match, the value is not empty
    return false;
  });

  return allEmpty;
};
