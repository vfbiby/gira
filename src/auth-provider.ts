import { Form, User } from "context/auth-context";

export const localStorageKey = "__auth_provider_token__";

const handleUserResponsed = ({
  user,
  token,
}: {
  user: User;
  token: string;
}) => {
  localStorage.setItem(localStorageKey, token || "");
  console.log(user);
  return user;
};

export const login = async (data: Form) => {
  return fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    let data = await response.json();
    return handleUserResponsed(data["data"]);
  });
};

export function getToken() {
  return window.localStorage.getItem(localStorageKey) || undefined;
}

export async function logout() {
  window.localStorage.removeItem(localStorageKey);
}
