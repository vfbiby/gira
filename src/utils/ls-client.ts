export const ls = {
  set(key: string, value: any) {
    localStorage.setItem(key, value);
  },
  get(key: string) {
    return localStorage.getItem(key);
  },
};
