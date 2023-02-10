export const transformTextToNumber = (text: string): number | "0" => {
  let result = text;
  if (text !== "0") {
    result = text.replace(/[^\d]/g, "");
    if (result.length > 1 && result[0] === "0") result = result.slice(1);
    else if (result === "0") {
      return "0";
    } else if (result === "") {
      return null;
    }
  }

  return Number(result);
};

export const transformTextToFloatValue = (text: string): string => {
  let result = text;
  if (text !== "0") {
    result = text.replace(/[^\d.]/g, "");
    if (result.length > 1 && result[0] === "0") result = result.slice(1);
    else if (result === "0") {
      return "0";
    } else if (result === "") {
      return null;
    }
  }

  return result;
};

export const setFormIntegerValue = (
  field: any,
  value: string,
  onChange: (value) => void
) => {
  if (value === "") {
    onChange(null);
  } else if (value === "0") {
    onChange(0);
  } else {
    onChange(transformTextToNumber(value));
  }
};

export const setFormFloatValue = (
  field: any,
  value: string,
  onChange: (value) => void
) => {
  if (value === "") {
    onChange(null);
  } else if (value === "0") {
    onChange(0);
  } else {
    const float_value = transformTextToFloatValue(value);
    onChange(float_value);
  }
};

export const setFormTextValue = (
  field: any,
  value: string,
  onChange: (value) => void
) => {
  if (value.trim() === "") onChange("");
  else onChange(value);
};

export const hasValidValue = (value: string | number): boolean => {
  return !!(value || value === 0);
};

export const getValue = (
  value: string | number,
  defaultValue: string | number = null
): string | number => {
  if (hasValidValue(value)) {
    return value;
  }
  if (defaultValue === null) {
    return value;
  }
  return defaultValue;
};

export const focusAtTheEnd = (ref, length) => {
  const { selectionStart, selectionEnd } = ref;
  if (selectionStart !== selectionEnd) return;
  ref.focus();
  ref.setSelectionRange(length, length);
};

export default {
  transformTextToNumber,
  setFormIntegerValue,
  setFormFloatValue,
  setFormTextValue,
  hasValidValue,
  getValue,
  focusAtTheEnd,
};
