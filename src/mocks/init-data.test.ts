import { ls } from "utils/ls-client";
import { init_mock_data, init_source_data } from "./init-data";

describe("Init mock data", () => {
  it("should init mock data when not inited", () => {
    expect(ls.get("data_inited")).toBe(null);
    init_mock_data();
    expect(ls.get("data_inited")).toBe("true");
    expect(JSON.parse(ls.get("projects") || "")).toStrictEqual(
      init_source_data.projects
    );
    //console.log(ls.get("projects"));
  });
});
