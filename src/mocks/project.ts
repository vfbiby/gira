import { rest } from "msw";

let projects = [
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
export const projectHandlers = [
  rest.get("/projects/:projectId", (req, res, ctx) => {
    let { projectId } = req.params;
    return res(
      ctx.delay(),
      ctx.json((projectId -= 1) > 0 ? projects[Number(projectId)] : projects[0])
    );
  }),

  rest.patch("/projects/:projectId", (req, res, ctx) => {
    const { projectId } = req.params;

    if (Number(projectId) < 1) {
      return res(
        ctx.status(404),
        ctx.json({
          error: 404,
          message: "unknown project",
        })
      );
    }

    projects[Number(projectId) - 1] = {
      ...projects[Number(projectId) - 1],
      ...(req.body as Record<string, any>),
    };

    return res(
      ctx.json({
        ...projects[Number(projectId) - 1],
      })
    );
  }),
];
