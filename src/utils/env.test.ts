describe("env", () => {
  it("should be read", () => {
    expect(process.env.REACT_APP_API_URL).toBe("http://localhost");
  });
});
