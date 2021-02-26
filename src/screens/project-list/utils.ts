import { useMemo } from "react";
import { useUrlQueryParam } from "utils/useUrlQueryParam";

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  const projectsParams = useMemo(
    () => ({
      ...param,
      personId: Number(param.personId) || undefined,
    }),
    [param]
  );

  return [projectsParams, setParam] as const;
};
