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
});
