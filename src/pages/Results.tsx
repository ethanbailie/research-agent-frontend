import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AnswerService from "../core/services/answer.service";

const mockResults = [
  {
    company: "Tech Innovators Inc.",
    url: "https://www.techinnovators.com",
    description:
      "A forward-thinking company leveraging AI to redefine market analysis.",
    marketOpportunity:
      "Growing demand for AI tools in market analysis projected at $10B by 2025.",
  },
  {
    company: "Future Enterprises",
    url: "https://www.futureenterprises.com",
    description:
      "Leading the charge in blockchain-based solutions for supply chain transparency.",
    marketOpportunity:
      "Blockchain in supply chain expected to reach $15B by 2027.",
  },
  {
    company: "NextGen Solutions",
    url: "https://www.nextgensolutions.com",
    description:
      "Pioneering smart city infrastructure with IoT-enabled solutions.",
    marketOpportunity:
      "Global smart city investment expected to exceed $1.2T by 2030.",
  },
];

interface Results {
  name: string;
  description: string;
  market_focus: string;
  unique_perspective: string;
  url: string;
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState<Results[]>([]);
  const [searchTerm, setSearchTerm] = useState(query || ""); // Sync searchTerm with query
  const [loading, setLoading] = useState<boolean>(true);
  const [queryResult, setQueryResult] = useState<string>("");

  const handleSearchResults = async (query: string) => {
    try {
      const data = { query: query };

      console.log(data);

      const response = await AnswerService.RetrieveAnswer(data);

      setResults(response.data.result.competitors);
      //  console.log(response.data.result.validation.unique);
      setQueryResult(response.data.result.validation.unique);
      //  setResults(response);
    } catch (error) {
      console.error("Error retrieving answers:", error);
      setResults(mockResults);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/results?query=${encodeURIComponent(searchTerm)}`);
      setLoading(true); // Reset loading state
      handleSearchResults(searchTerm); // Trigger new search
    }
  };

  useEffect(() => {
    handleSearchResults(searchTerm);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6"
    >
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
        🔍 Market <span className="text-blue-500">Lens</span>
      </h1>

      {/* Search Bar and Button */}
      <div className="mb-6 mx-auto flex flex-col sm:flex-row items-center gap-4 px-4 max-w-full sm:max-w-lg">
        <input
          type="text"
          placeholder="Enter a company or idea..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:flex-1 px-4 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="w-full sm:w-auto px-5 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Search
        </button>
      </div>

      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center h-64"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"></div>
        </motion.div>
      ) : (
        <>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-extrabold text-gray-800 mb-6"
          >
            Results for: <span className="text-blue-500">{query}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-700 mb-6"
          >
            <strong>{results.length}</strong> results found.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-10 p-6 bg-white rounded-lg shadow-md border-t-4 border-green-400"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 mb-4">
              <strong>Summary:</strong> {queryResult}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="space-y-6"
          >
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border-l-4 border-indigo-500"
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {result.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  <strong>Description:</strong> {result.description}
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Market Opportunity:</strong> {result.market_focus}
                </p>
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500 underline hover:text-indigo-700"
                >
                  Visit Website
                </a>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Results;
