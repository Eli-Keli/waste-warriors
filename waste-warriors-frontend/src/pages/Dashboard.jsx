/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for the waste entries
  const wasteEntries = [
    {
      id: 1, type: 'Infectious',
      quantity: 50,
      location: 'Hospital A'
    },
    {
      id: 2, type: 'Sharps',
      quantity: 20,
      location: 'Clinic B'
    },
    {
      id: 3, type: 'Chemical',
      quantity: 30,
      location: 'Lab C'
    },
    {
      id: 4, type: 'Pharmaceutical',
      quantity: 15,
      location: 'Pharmacy D'
    },
  ];

  // Mock data for the chart
  const chartData = [
    {
      name: 'Infectious',

      amount: 120
    },
    {
      name: 'Sharps',
      amount: 80
    },
    {
      name: 'Chemical',
      amount: 60
    },
    {
      name: 'Pharmaceutical',
      amount: 40
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-indigo-600">Waste Warriors</span>
              </div>
              <div className="ml-6 flex space-x-8">
                <Link to="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium text-gray-900">
                  Dashboard
                </Link>
                <Link to="/add-waste" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                  Input Waste
                </Link>
                <Link to="/report" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                  Reports
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                <div className="flex border-b border-gray-200">
                  <button
                    className={`px-4 py-2 text-sm font-medium ${activeTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium ${activeTab === 'map' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('map')}
                  >
                    Waste Journey Map
                  </button>
                </div>
                <div className="p-4">
                  {activeTab === 'overview' ? (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Recent Waste Entries</h2>
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity (kg)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {wasteEntries.map((entry) => (
                            <tr key={entry.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.type}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.quantity}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.location}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Waste by Type</h2>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amount" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-gray-500">Map view placeholder - Integration Google Maps would go here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPreview;