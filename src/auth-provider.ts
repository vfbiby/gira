export const localStorageKey = "__auth_provider_token__";

export function getToken() {
  return window.localStorage.getItem(localStorageKey) || undefined;
}
