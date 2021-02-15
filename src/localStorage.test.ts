describe("localStorage", () => {
  it("can save data", () => {
    window.localStorage.setItem("__auth_provider_token", "valid-token");
    expect(window.localStorage.getItem("__auth_provider_token")).toBe(
      "valid-token"
    );
  });
});
