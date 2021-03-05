import { rest } from "msw";
import { ProjectProps } from "screens/project-list";
import { ls } from "utils/ls-client";

export const projectsHandlers = [
  rest.get("/projects", (req, res, ctx) => {
    const personId = Number(req.url.searchParams.get("personId"));
    const name = req.url.searchParams.get("name");
    const projects = ls.get("projects");
    return res(
      ctx.delay(),
      ctx.json(
        personId
          ? projects.filter(
              (project: ProjectProps) => project.personId === personId
            )
          : name
          ? projects.filter((project: ProjectProps) =>
              project.name.includes(name)
            )
          : projects
      )
    );
  }),

  rest.post<ProjectProps>("/projects", (req, res, ctx) => {
    const projects = ls.get("projects");
    const projectId = projects[projects.length - 1].id + 1;
    const { name, organization, personId } = req.body;
    if (!name || !organization || !personId) {
      return res(
        ctx.status(404),
        ctx.json({
          status: 404,
          message: "please provide name organization and personId",
        })
      );
    }
    const project = {
      id: projectId,
      name,
      organization,
      personId,
      pin: false,
      created: new Date(),
    };
    projects.push(project);
    ls.set("projects", projects);

    return res(ctx.json(project));
  }),

  rest.get("/users", (_, res, ctx) => {
    return res(ctx.json(ls.get("users")));
  }),
];
