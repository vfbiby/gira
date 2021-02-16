interface Config extends RequestInit{
  token?: string;
}

export const client = async (endpoint: string, { token }:Config = {}) => {
  const defaultConfig = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : '',
    },
  };

  return window.fetch(endpoint, defaultConfig).then(async (response) => {
    return await response.json();
  });
};
