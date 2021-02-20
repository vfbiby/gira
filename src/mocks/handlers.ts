// src/mocks/handlers.js
import { rest } from "msw";

interface LoginBody {
  username: string;
  password: string;
}

export const handlers = [
  rest.post<LoginBody>("/login", (req, res, ctx) => {
    const { username, password } = req.body;
    if (username === "vf" && password === "bb") {
      return res(
        ctx.json({
          status: 200,
          data: {
            user: {
              id: 1,
              name: "bb",
              email: "3432@qq.com",
              avator_url:
                "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLy3Vy8eiaLz8aDCIktUfcqpW1fIfv8w6DX0krO2NcA0SpgN7XwembK8Kk5TNtt6ZDDJkeazDy3OBA/132",
            },
            token: "valid-token",
          },
        })
      );
    }
    //sessionStorage.setItem("is-authenticated", "true");
    return res(
      ctx.json({
        status: 401,
        errors: [],
        message: "username or password is wrong!",
      })
    );
  }),

  rest.get("/getForTest", (req, res, ctx) => {
    const user_id = req.url.searchParams.get("user_id");
    return res(
      ctx.json({
        user_id,
      })
    );
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
