import { rest } from "msw";

export const projectsHandlers = [
  rest.get("/projects", (req, res, ctx) => {
    const personId = Number(req.url.searchParams.get("personId"));
    const name = req.url.searchParams.get("name");
    const projects = [
      {
        id: 1,
        name: "骑手管理",
        personId: 1,
        pin: true,
        organization: "外卖组",
        created: 1604989757139,
      },
      {
        id: 2,
        name: "团购 APP",
        personId: 2,
        pin: false,
        organization: "团购组",
        created: 1604989757139,
      },
      {
        id: 3,
        name: "物料管理系统",
        personId: 2,
        pin: false,
        organization: "物料组",
        created: 1604989757139,
      },
      {
        id: 4,
        name: "总部管理系统",
        personId: 3,
        pin: true,
        organization: "物料组",
        created: 1604989757139,
      },
      {
        id: 5,
        name: "送餐路线规划系统",
        personId: 4,
        pin: false,
        organization: "物料组",
        created: 1604989757139,
      },
    ];
    return res(
      ctx.delay(),
      ctx.json(
        personId
          ? projects.filter((project) => project.personId === personId)
          : name
          ? projects.filter((project) => project.name.includes(name))
          : projects
      )
    );
  }),

  rest.get("/users", (_, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          name: "高修文",
        },
        {
          id: 2,
          name: "熊天成",
        },
        {
          id: 3,
          name: "郑华",
        },
        {
          id: 4,
          name: "王文静",
        },
      ])
    );
  }),
];
