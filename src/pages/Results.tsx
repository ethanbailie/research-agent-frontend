import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AnswerService from "../core/services/answer.service";
const mockResults = [
  {
    company: "Tech Innovators Inc.",
    description:
      "A forward-thinking company leveraging AI to redefine market analysis.",
    marketOpportunity:
      "Growing demand for AI tools in market analysis projected at $10B by 2025.",
  },
  {
    company: "Future Enterprises",
    description:
      "Leading the charge in blockchain-based solutions for supply chain transparency.",
    marketOpportunity:
      "Blockchain in supply chain expected to reach $15B by 2027.",
  },
  {
    company: "NextGen Solutions",
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
  const [results, setResult] = useState<Results[]>([]);

  const handleSearchResults = async () => {
    try {
      const response = await AnswerService.RetrieveAnswer();

      console.log(response);
    } catch (error) {
      console.error("Error retrieving answers:", error);
      // Handle the error as needed (e.g., show a notification)
    }
  };

  useEffect(() => {
    handleSearchResults();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 mb-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Results for: <span className="text-blue-500">{query}</span>
      </h1>
      <div className="space-y-6">
        {mockResults.map((result, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {result.company}
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>Description:</strong> {result.description}
            </p>
            <p className="text-gray-700">
              <strong>Market Opportunity:</strong> {result.marketOpportunity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
