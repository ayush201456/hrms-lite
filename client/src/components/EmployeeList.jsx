import { useState } from 'react';
import axios from 'axios';

function EmployeeList({ employees, onDelete, apiBase, loading }) {
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await axios.delete(`${apiBase}/employees/${id}`);
      onDelete();
    } catch (err) {
      alert('Error deleting employee');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <div className="text-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div><p className="mt-2 text-gray-600">Loading employees...</p></div>;
  if (!employees.length) return <p className="text-center py-8 text-gray-500 bg-gray-50 p-6 rounded-lg animate-fade-in">No employees found. Add one above!</p>;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Employee List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp, index) => (
          <div
            key={emp._id}
            className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="mb-4">
              <p className="text-sm text-gray-500">ID: <span className="font-mono text-blue-600">{emp.employeeId}</span></p>
              <h3 className="text-lg font-semibold text-gray-800">{emp.fullName}</h3>
              <p className="text-gray-600">{emp.email}</p>
              <p className="text-sm text-indigo-600 font-medium">{emp.department}</p>
            </div>
            <button
              onClick={() => handleDelete(emp._id)}
              disabled={deleting === emp._id}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
            >
              {deleting === emp._id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeList;