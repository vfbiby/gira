import { rest } from "msw";
import { ls } from "utils/ls-client";

export const projectHandlers = [
  rest.get("/projects/:projectId", (req, res, ctx) => {
    let { projectId } = req.params;
    const projects = ls.get("projects");
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

    const projects = ls.get("projects");

    projects[Number(projectId) - 1] = {
      ...projects[Number(projectId) - 1],
      ...(req.body as Record<string, any>),
    };

    ls.set("projects", projects);

    return res(
      ctx.json({
        projects: ls.get("projects")[Number(projectId) - 1],
      })
    );
  }),
];
