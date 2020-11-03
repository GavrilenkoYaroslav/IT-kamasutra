
export const required = (value: string) => {
    if (value) return undefined;
    return 'required field';
};

export const maxLengthCreator = (max: number) => (value: string) => {
  if (value.length > max) return `max length is ${max} symbols`;
  return undefined;
};