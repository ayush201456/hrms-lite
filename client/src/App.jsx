import { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import Attendance from './components/Attendance';
// Developed by Ayush Gupta
const API_BASE = '/api'; // In production, this proxies to Express; in dev, Vite proxies it

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API_BASE}/employees`);
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6 animate-fade-in flex flex-col">  {/* Updated background gradient */}
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 drop-shadow-sm">HRMS Lite Dashboard</h1>
      <div className="max-w-6xl mx-auto space-y-10 flex-grow">
        <AddEmployee onAdd={fetchEmployees} apiBase={API_BASE} />
        <EmployeeList employees={employees} onDelete={fetchEmployees} apiBase={API_BASE} loading={loading} />
        <Attendance employees={employees} apiBase={API_BASE} />
      </div>
      {/* Footer with author credit */}
      <footer className="mt-10 py-4 text-center text-gray-500 text-sm border-t border-gray-200">
        Developed by <a href="https://github.com/ayush201456" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">Ayush Gupta</a> | HRMS Lite © 2026
      </footer>
    </div>
  );
}

export default App;