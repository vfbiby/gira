import { login } from "auth-provider";

describe("Auth Provider", () => {
  it("should return user data when login success", async () => {
    const user = await login({ username: "vf", password: "bb" });
    expect(user).toStrictEqual({
      name: "bb",
      id: 1,
      email: "3432@qq.com",
      avator_url:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLy3Vy8eiaLz8aDCIktUfcqpW1fIfv8w6DX0krO2NcA0SpgN7XwembK8Kk5TNtt6ZDDJkeazDy3OBA/132",
    });
  });

  it("should throw promise reject error when server validate failure", async () => {
    const user = login({ username: "wrong", password: "void" });
    await expect(user).rejects.toEqual("username or password is wrong!");
  });
});
