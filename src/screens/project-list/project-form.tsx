import { UserSelect } from "components/user-select";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useAddProject, useEditProject } from "utils/use-projects";
import { ProjectProps } from ".";

interface CreateProjectProps extends Partial<ProjectProps> {}

export const ProjectForm = ({
  editingProject,
  close,
}: {
  editingProject?: ProjectProps;
  close?: () => void;
}) => {
  const {
    register,
    handleSubmit,
    errors,
    control,
    reset,
  } = useForm<CreateProjectProps>();
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();
  const onSubmit = async (data: CreateProjectProps) => {
    console.log(data);
    mutateAsync({ ...editingProject, ...data }).then(() => {
      reset({
        name: "",
        organization: "",
        personId: 0,
      });
      close?.();
    });
  };

  return (
    <form className="w-full p-2 sm:max-w-lg" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mt-3">
        <label
          className="w-full py-3 text-gray-900 dark:text-white"
          htmlFor="name"
        >
          Project Name
        </label>
        <input
          className="w-full px-4 py-2 text-pink-500 rounded bg-gray-50"
          type="text"
          defaultValue={editingProject?.name}
          name="name"
          ref={register({ required: true })}
        />
      </div>
      <div>
        {errors.name && (
          <p className="pt-3 text-pink-700">Project name is required.</p>
        )}
      </div>
      <div className="flex flex-col mt-2">
        <label
          className="w-full py-3 to-gray-900 dark:text-white"
          htmlFor="organization"
        >
          Organization
        </label>
        <input
          className="w-full px-4 py-2 text-pink-500 rounded bg-gray-50"
          type="text"
          defaultValue={editingProject?.organization}
          name="organization"
          ref={register({ required: true })}
        />
      </div>
      <div>
        {errors.organization && (
          <p className="pt-3 text-pink-700">Please type organization name.</p>
        )}
      </div>

      <div className="flex flex-col mt-2">
        <Controller
          render={({ value, onChange }) => (
            <UserSelect
              className="w-32 px-4 ml-2 text-pink-600 border border-gray-200 rounded dark:bg-gray-900"
              defaultOptionName="负责人"
              value={value}
              onChange={onChange}
            />
          )}
          defaultValue={editingProject?.personId}
          name="personId"
          control={control}
        />
      </div>

      <input
        className="w-full py-4 mt-10 tracking-widest text-white uppercase bg-pink-500 rounded"
        style={{ letterSpacing: "0.6rem" }}
        type="submit"
      />
    </form>
  );
};
