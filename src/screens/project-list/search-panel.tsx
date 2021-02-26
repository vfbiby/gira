export interface User {
  id: number;
  name: string;
}

interface SearchProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchProps) => {
  return (
    <form className="flex" onSubmit={(e) => e.preventDefault()}>
      <div>
        <input
          placeholder="项目名称"
          value={param.name}
          onChange={(e) => {
            setParam({
              ...param,
              name: e.target.value,
            });
          }}
          className="px-4 text-pink-600 placeholder-pink-300 border border-gray-200 rounded dark:bg-gray-900"
          type="text"
          name="name"
        />
      </div>
      <div>
        <select
          className="w-32 px-4 ml-2 text-pink-600 border border-gray-200 rounded dark:bg-gray-900"
          value={param.personId}
          onChange={(e) => {
            setParam({
              ...param,
              personId: e.target.value,
            });
          }}
          name="personId"
        >
          <option value="">负责人</option>
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
