export const ls = {
  set(key: string, value: any) {
    if (typeof value === "object") {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  },
  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key) || "");
    } catch (e) {
      return localStorage.getItem(key);
    }
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};
