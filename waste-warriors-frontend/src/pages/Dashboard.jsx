/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { brandLogo, navLinks, userProfile } from '../data/navData'; // Import the data
import Map from '../components/MapComponent4';


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
      <NavBar
        // brandLogo={{ src: brandLogo.src, alt: brandLogo.alt }}
        navigation={navLinks}
        userProfile={userProfile}
      />

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
                      {/* <p className="text-gray-500">Map view placeholder - Integration Google Maps would go here</p> */}
                      <Map />

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