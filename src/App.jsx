import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StartPolicy from './pages/StartPolicy';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start-policy" element={<StartPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
