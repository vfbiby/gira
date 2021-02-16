// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    sessionStorage.setItem("is-authenticated", "true");
    return res(ctx.status(200));
  }),

  rest.get("http://localhost/me", (req, res, ctx) => {
    const isAuthenticated = !!sessionStorage.getItem("is-authenticated") || true;

    if (!isAuthenticated) {
      return res(
        ctx.status(403),
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
