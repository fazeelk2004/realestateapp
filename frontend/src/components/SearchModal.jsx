/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

const SearchModal = ({ open, onCancel, onSearch, setSearchTerm }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(input, e);
  };

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
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={(e) => handleSearch(e)} className="btn btn-primary">Search</button>
          <button onClick={onCancel} className="btn btn-error">Close</button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;