import { useEffect, useState } from "react";
import { client } from "utils/api-client";

export interface Person {
  id: number;
  name: string;
}

export const SearchPanel = ({ users }: { users: Person[] | null }) => {
  return (
    <form className="flex">
      <div>
        <input
          placeholder="项目名称"
          className="px-2 py-1 border-2 border-gray-200 rounded"
          type="text"
          name="name"
        />
      </div>
      <div>
        <select
          className="px-4 py-1 ml-2 border-2 border-gray-200 rounded"
          name="personId"
        >
          <option>负责人</option>
          {users?.map((person) => {
            return (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            );
          })}
        </select>
      </div>
    </form>
  );
};
