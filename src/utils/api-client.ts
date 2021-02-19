import * as Auth from "../auth-provider";

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const client = async (
  endpoint: string,
  { token, data, ...restConfig }: Config = {}
) => {
  const defaultConfig = {
    method: "GET",
    headers: {
      "Content-Type": data ? "application/json" : "",
      Authorization: token ? `Bearer ${token}` : "",
    },
    ...restConfig,
  };

  defaultConfig.body = JSON.stringify(data);

  return window.fetch(endpoint, defaultConfig).then(async (response) => {
    if (response.status === 401) {
      Auth.logout();
      return Promise.reject("Please re-authenticate.");
    }
    return await response.json();
  });
};
