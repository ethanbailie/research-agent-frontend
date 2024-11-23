import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const mockResults = [
  { company: "Tech Innovators Inc.", idea: "AI-powered market analysis tool" },
  {
    company: "Future Enterprises",
    idea: "Blockchain-based supply chain tracking",
  },
  { company: "NextGen Solutions", idea: "Smart city infrastructure planning" },
];

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("query");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 mb-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Results for: <span className="text-blue-500">{query}</span>
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockResults.map((result, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {result.company}
            </h2>
            <p className="text-gray-700">{result.idea}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
