import { client } from "utils/api-client";

describe("Projects Mock Server", () => {
  it("should accept editing a project", async () => {
    let project_3 = await client("/projects/3").then();

    expect(project_3).toStrictEqual({
      id: 3,
      name: "物料管理系统",
      personId: 2,
      pin: false,
      organization: "物料组",
      created: 1604989757139,
    });

    const responseProject = await client("/projects/3", {
      method: "PATCH",
      data: {
        pin: true,
      },
    });

    //project_3 = await client("/projects/3").then();

    expect(responseProject).toStrictEqual({
      id: 3,
      name: "物料管理系统",
      personId: 2,
      pin: true,
      organization: "物料组",
      created: 1604989757139,
    });
  });
});
