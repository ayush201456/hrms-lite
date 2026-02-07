import { useState } from 'react';
import axios from 'axios';

function Attendance({ employees, apiBase }) {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Present');
  const [records, setRecords] = useState([]);
  const [totalPresent, setTotalPresent] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const markAttendance = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post(`${apiBase}/attendance`, { employeeId: selectedEmployee, date, status });
      setSuccess('Attendance marked successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error marking attendance');
    } finally {
      setLoading(false);
    }
  };

  const viewAttendance = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${apiBase}/attendance/${selectedEmployee}?date=${date}`);
      setRecords(res.data.records);
      setTotalPresent(res.data.totalPresent);
    } catch (err) {
      setError('Error fetching records');
    } finally {
      setLoading(false);
    }
  };

  const downloadAttendance = () => {
    if (!records.length) {
      setError('No records to download. Please view records first.');
      return;
    }
    const employeeName = employees.find(emp => emp.employeeId === selectedEmployee)?.fullName || 'Unknown';
    const csvContent = [
      ['Date', 'Status', 'Employee Name'], // Header
      ...records.map(rec => [rec.date.split('T')[0], rec.status, employeeName]) // Data rows
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `attendance_${employeeName.replace(' ', '_')}_${date || 'all'}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setSuccess('Attendance downloaded successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-teal-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Attendance Management</h2>
      {error && <p className="text-red-500 bg-red-50 p-3 rounded-lg mb-4 animate-bounce">{error}</p>}
      {success && <p className="text-green-500 bg-green-50 p-3 rounded-lg mb-4 animate-pulse">{success}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-400"
        >
          <option value="">Select Employee</option>
          {employees.map(emp => <option key={emp._id} value={emp.employeeId}>{emp.fullName}</option>)}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-400"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-400"
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={markAttendance}
          disabled={loading || !selectedEmployee || !date}
          className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Marking...' : 'Mark Attendance'}
        </button>
        <button
          onClick={viewAttendance}
          disabled={loading || !selectedEmployee}
          className="bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
        >
          View Records
        </button>
        <button
          onClick={downloadAttendance}
          disabled={!records.length}
          className="bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-200 disabled:opacity-50"  // Updated to orange
        >
          Download Attendance
        </button>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-lg font-semibold text-gray-800 mb-4">Total Present Days: <span className="text-green-600">{totalPresent}</span></p>
        <ul className="space-y-2">
          {records.map((rec, idx) => (
            <li
              key={idx}
              className={`p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 animate-slide-up ${rec.status === 'Present' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <span className="font-medium">{rec.date.split('T')[0]}</span>: {rec.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Attendance;