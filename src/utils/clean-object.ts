export const isVoid = (value: unknown) =>
  value === "" || value === null || value === undefined;

export const cleanObject = (obj: { [key: string]: unknown }) => {
  let result = { ...obj };
  Object.keys(result).forEach(
    (key) => isVoid(result[key]) && delete result[key]
  );
  return result;
};
