import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/results?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r ">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          🔍 Optimize <span className="text-blue-500">AI</span>
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Discover cost savings in your business.
        </p>
        <input
          type="text"
          placeholder="Enter ideas to automate."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-5 py-3 mb-6 text-lg border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
        />
        <button
          onClick={handleSearch}
          className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
