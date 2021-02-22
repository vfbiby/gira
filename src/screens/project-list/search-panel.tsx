export interface Person {
  id: number;
  name: string;
}

interface SearchProps {
  users: Person[];
  param: {
    name: string;
    personId: number;
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
          className="px-2 py-1 border-2 border-gray-200 rounded dark:bg-gray-900"
          type="text"
          name="name"
        />
      </div>
      <div>
        <select
          className="px-4 py-1 ml-2 border-2 border-gray-200 rounded dark:bg-gray-900"
          value={param.personId}
          onChange={(e) => {
            setParam({
              ...param,
              personId: Number(e.target.value),
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
