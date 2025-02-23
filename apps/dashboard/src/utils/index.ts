export const formatJSON = (value: any): string => {
  try {
    return JSON.stringify(value, null, 4);
  } catch (err) {
    return "Formatting error";
  }
};

export const parseJSON = (value: string): any => {
  try {
    return JSON.parse(value);
  } catch (err) {
    return {};
  }
};
