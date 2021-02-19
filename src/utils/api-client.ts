import * as Auth from "../auth-provider";

interface Config extends RequestInit {
  token?: string;
}

export const client = async (
  endpoint: string,
  { token, ...restConfig }: Config = {}
) => {
  const defaultConfig = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    ...restConfig,
  };

  return window.fetch(endpoint, defaultConfig).then(async (response) => {
    if (response.status === 401) {
      Auth.logout();
      return Promise.reject("Please re-authenticate.");
    }
    return await response.json();
  });
};
