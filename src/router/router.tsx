import { Route, Routes } from "react-router-dom";
import { ScrollTop } from "../ScrollTop";
import Search from "../pages/Search";
import Results from "../pages/Results";
const GlobalRouter = () => {
  return (
    <ScrollTop>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </ScrollTop>
  );
};

export default GlobalRouter;
