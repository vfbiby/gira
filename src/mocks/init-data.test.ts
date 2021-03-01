import { ls } from "utils/ls-client";
import { init_mock_data, init_source_data } from "./init-data";

describe("Init mock data", () => {
  beforeEach(() => ls.clear());

  it("should init mock data when not inited", () => {
    expect(ls.get("data_inited")).toBe(null);
    init_mock_data();
    expect(ls.get("data_inited")).toBe(true);
    expect(ls.get("projects")).toStrictEqual(init_source_data.projects);
  });

  it("should not init mock data when inited", function () {
    ls.set("data_inited", "true");
    init_mock_data();
    expect(ls.get("projects")).toStrictEqual(null);
  });

  it("should init user data", function () {
    expect(ls.get("users")).toStrictEqual(null);
    init_mock_data();
    expect(ls.get("users")).toStrictEqual([
      { id: 1, name: "高修文" },
      { id: 2, name: "熊天成" },
      { id: 3, name: "郑华" },
      { id: 4, name: "王文静" },
    ]);
  });
});
