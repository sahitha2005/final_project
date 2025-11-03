import { BrowserRouter as Router, Routes, Route } 
from "react-router-dom"; 
import TopicsPage from "./components/TopicsPage"; 
import ShapesPage from "./components/ShapesPage"; 
import SingleShapePage from "./components/SingleShapePage"; 
import ColorsPage from "./components/ColorsPage"; 
import SingleColorPage from "./components/SingleColorPage"; 
import AlphabetsGridPage from "./components/AlphabetsGridPage"; 
import SingleLetterPage from "./components/SingleLetterPage"; 
import ActivitiesMenu from './components/Activities/ActivitiesMenu'; 
import WordImageMatch from './components/Activities/WordImageMatch'; 
import LetterSort from './components/Activities/LetterSort'; 
import NumbersPage from './components/NumbersPage'; 
import SingleNumberPage from './components/SingleNumberPage'; 
import NumbersQuiz from './components/Activities/NumbersQuiz'; 
import ColorsQuiz from './components/Activities/ColorsQuiz'; 
import ShapesQuiz from './components/Activities/ShapesQuiz'; 
import Login from './components/Login'; 
import Signup from './components/Signup'; // Signup page import

function App() { 
  return ( 
    <Router> 
      <Routes> 
        {/* Login Page */}
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login />} />  {/* Optional direct route */}

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} /> 

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

        {/* Numbers */} 
        <Route path="/numbers" element={<NumbersPage />} /> 
        <Route path="/numbers/:number" element={<SingleNumberPage />} /> 

        {/* Activities */} 
        <Route path="/activities" element={<ActivitiesMenu />} /> 
        <Route path="/activities/word-match" element={<WordImageMatch />} /> 
        <Route path="/activities/letter-sort" element={<LetterSort />} /> 
        <Route path="/activities/numbers-quiz" element={<NumbersQuiz />} /> 
        <Route path="/activities/colors-quiz" element={<ColorsQuiz />} />
        <Route path="/activities/shapes-quiz" element={<ShapesQuiz />} /> 

        {/* Default Route */}
        <Route path="*" element={<TopicsPage />} /> 
      </Routes> 
    </Router> 
  ); 
} 

export default App;
