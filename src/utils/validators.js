
export const required = (value) => {
    if (value) return undefined;
    return 'required field';
};

export const maxLengthCreator = max => value => {
  if (value.length > max) return `max length is ${max} symbols`;
  return undefined;
};