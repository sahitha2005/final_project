import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopicsPage from "./components/TopicsPage";
import ShapesPage from "./components/ShapesPage";
import SingleShapePage from "./components/SingleShapePage";
import ColorsPage from "./components/ColorsPage";
import SingleColorPage from "./components/SingleColorPage";
import AlphabetsGridPage from "./components/AlphabetsGridPage";
import SingleLetterPage from "./components/SingleLetterPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Topics Page */}
        <Route path="/topics" element={<TopicsPage />} />

        {/* Shapes */}
        <Route path="/shapes" element={<ShapesPage />} />
        <Route path="/shapes/:shape" element={<SingleShapePage />} />

        {/* Colors */}
        <Route path="/colors" element={<ColorsPage />} />
        <Route path="/colors/:color" element={<SingleColorPage />} />

        {/* Alphabets */}
        <Route path="/alphabets" element={<AlphabetsGridPage />} />
        <Route path="/alphabets/:letter" element={<SingleLetterPage />} />

        {/* Default Route */}
        <Route path="*" element={<TopicsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
