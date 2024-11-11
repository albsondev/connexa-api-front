import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* outras rotas */}
      </Routes>
    </Router>
  );
}

export default App;
