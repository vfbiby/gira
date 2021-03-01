import { rest } from "msw";
import { ls } from "utils/ls-client";

export const projectsHandlers = [
  rest.get("/projects", (req, res, ctx) => {
    const personId = Number(req.url.searchParams.get("personId"));
    const name = req.url.searchParams.get("name");
    const projects = ls.get('projects');
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
    return res(ctx.json(ls.get("users")));
  }),
];
