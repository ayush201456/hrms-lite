import { useState } from 'react';
import axios from 'axios';

function AddEmployee({ onAdd, apiBase }) {
  const [form, setForm] = useState({ fullName: '', email: '', department: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post(`${apiBase}/employees`, form);
      setForm({ fullName: '', email: '', department: '' });
      setSuccess('Employee added successfully!');
      setTimeout(() => setSuccess(''), 3000);
      onAdd();
    }  catch (err) {
  console.error('Error adding employee:', err); // Log the full error for debugging
  setError(err.response?.data?.error || 'Error adding employee'); // Ensure it's a string
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Employee</h2>
      {error && <p className="text-red-500 bg-red-50 p-3 rounded-lg mb-4 animate-bounce">{error}</p>}
      {success && <p className="text-green-500 bg-green-50 p-3 rounded-lg mb-4 animate-pulse">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400"
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400"
          required
        />
        <input
          type="text"
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Adding...
            </div>
          ) : (
            'Add Employee'
          )}
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;