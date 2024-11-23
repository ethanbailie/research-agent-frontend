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
  id: string;
  company: string;
  url: string;
  description: string;
  marketOpportunity: string;
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState<Results[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  const handleSearchResults = async () => {
    try {
      const response = await AnswerService.RetrieveAnswer();
      setResults(response); // Use real data instead of mockResults
    } catch (error) {
      console.error("Error retrieving answers:", error);
      setResults(mockResults); // Fallback to mock data in case of error
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  useEffect(() => {
    handleSearchResults();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6"
    >
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 mb-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        ← Back
      </button>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold text-gray-800 mb-6"
      >
        Results for: <span className="text-blue-500">{query}</span>
      </motion.h1>

      {/* Display Loading Spinner */}
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center h-64"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </motion.div>
      ) : (
        <>
          {/* Display Result Count */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-700 mb-6"
          >
            <strong>{results.length}</strong> results found.
          </motion.p>

          {/* Overview Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-10 p-6 bg-white rounded-lg shadow-md border-t-4 border-green-500"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-700 mb-4">
              <strong>Summary:</strong> The search results highlight companies
              innovating across AI, blockchain, and IoT, showcasing cutting-edge
              solutions tailored for transformative market needs.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Why It's Unique:</strong> These businesses leverage
              breakthrough technologies to address critical challenges in market
              analysis, supply chain, and urban infrastructure, setting them
              apart in competitive industries.
            </p>
            <p className="text-gray-700">
              <strong>Future Market Opportunity:</strong> The industries
              represented are projected to grow exponentially, with market
              opportunities ranging from $10B in AI-driven market analysis to
              $1.2T in smart city infrastructure by 2030.
            </p>
          </motion.div>

          {/* Results Section */}
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
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500"
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {result.company}
                </h2>
                <p className="text-gray-700 mb-4">
                  <strong>Description:</strong> {result.description}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Market Opportunity:</strong>{" "}
                  {result.marketOpportunity}
                </p>
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-700"
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
