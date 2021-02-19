// src/mocks/handlers.js
import { rest } from "msw";

interface LoginBody {
  username: string;
  password: string;
}

interface LoginResponse {
  id: number;
  name: string;
  email: string;
  token: string;
}

export const handlers = [
  rest.post<LoginBody>("/login", (req, res, ctx) => {
    const { username, password } = req.body;
    if (username === "vf" && password === "bb") {
      return res(
        ctx.json({
          id: 1,
          name: "bb",
          email: "3432@qq.com",
          token: "valid-token",
        })
      );
    }
    sessionStorage.setItem("is-authenticated", "true");
    return res(ctx.json({ message: "hello world!" }));
  }),

  rest.get("/me", (req, res, ctx) => {
    const { authorization } = req.headers.getAllHeaders();
    //const isAuthenticated = !!sessionStorage.getItem("is-authenticated") || true;

    if (!authorization) {
      return res(
        ctx.status(401),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        name: "bb",
        email: "3432@qq.com",
        token: "valid-token",
      })
    );
  }),
];
