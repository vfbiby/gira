export const SearchPanel = () => {
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
          <option value="">vfbiby</option>
          <option value="">vfbiby</option>
          <option value="">vfbiby</option>
        </select>
      </div>
    </form>
  );
};
