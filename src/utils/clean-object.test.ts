import { cleanObject } from "./clean-object";

describe("CleanObject", () => {
  it("should return origin object when it is valid", () => {
    const param = {
      name: "rider",
      personId: 23,
    };
    expect(cleanObject(param)).toStrictEqual(param);
  });

  it("should delete empty string property", () => {
    const param = {
      name: "",
      personId: 23,
    };
    expect(cleanObject(param)).toStrictEqual({ personId: 23 });
  });

  it("should not delete false property", function () {
    const param = {
      isVisible: false,
      personId: 23,
    };
    expect(cleanObject(param)).toStrictEqual(param);
  });

  it("should delete null property", function () {
    const param = {
      name: null,
      personId: 23,
    };
    expect(cleanObject(param)).toStrictEqual({ personId: 23 });
  });

  it("should delete undefined property", function () {
    const param = {
      name: undefined,
      personId: 23,
    };
    expect(cleanObject(param)).toStrictEqual({ personId: 23 });
  });
});
