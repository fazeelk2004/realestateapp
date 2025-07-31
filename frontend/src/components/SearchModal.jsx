const SearchModal = ({ open, onCancel, onSearch, searchTerm, setSearchTerm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-base-100 p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h3 className="font-bold text-lg mb-4">Search</h3>
        <input
          type="text"
          placeholder="Type to search..."
          className="input input-bordered w-full mb-4"
          autoFocus
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onSearch} className="btn btn-primary">Search</button>
          <button onClick={onCancel} className="btn btn-error">Close</button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;