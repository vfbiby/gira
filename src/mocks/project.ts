import { rest } from "msw";
import { projects } from "./projects";

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
