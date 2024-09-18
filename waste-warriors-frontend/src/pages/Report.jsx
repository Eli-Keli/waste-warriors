/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, Printer } from 'lucide-react';
import NavBar from '../components/NavBar';

const ReportPagePreview = () => {
  const [dateRange, setDateRange] = useState('last30days');

  const navLinks = [
    { href: '/', name: 'Dashboard', current: true },
    { href: '/add-waste', name: 'Input Waste', current: false },
    { href: '/report', name: 'Reports', current: false },
  ];

  const userProfile = {
    imageSrc:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    menuItems: [
      { name: 'Your Profile', href: '#' },
      { name: 'Settings', href: '#' },
      { name: 'Sign out', href: '#' },
    ],
  };

  // Mock data for charts
  const wasteByTypeData = [
    { name: 'Infectious', amount: 1200 },
    { name: 'Sharps', amount: 800 },
    { name: 'Chemical', amount: 600 },
    { name: 'Pharmaceutical', amount: 400 },
    { name: 'Radioactive', amount: 200 },
  ];

  const wasteByLocationData = [
    { name: 'Hospital A', amount: 1500 },
    { name: 'Clinic B', amount: 800 },
    { name: 'Lab C', amount: 600 },
    { name: 'Pharmacy D', amount: 300 },
  ];

  const wasteOverTimeData = [
    { name: 'Week 1', amount: 800 },
    { name: 'Week 2', amount: 950 },
    { name: 'Week 3', amount: 1100 },
    { name: 'Week 4', amount: 900 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="min-h-screen bg-gray-100">
        <NavBar
          brandLogo={{ src: 'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500', alt: 'Your Company' }}
          navigation={navLinks}
          userProfile={userProfile}
        />

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Waste Management Reports</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">Date Range</label>
                      <select
                        id="dateRange"
                        name="dateRange"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                      >
                        <option value="last7days">Last 7 Days</option>
                        <option value="last30days">Last 30 Days</option>
                        <option value="last3months">Last 3 Months</option>
                        <option value="lastyear">Last Year</option>
                      </select>
                    </div>
                    <div className="space-x-2">
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <Printer className="mr-2 h-5 w-5" />
                        Print
                      </button>
                      <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <Download className="mr-2 h-5 w-5" />
                        Download PDF
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="p-5">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Waste by Type</h3>
                        <div className="mt-2 h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={wasteByTypeData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="amount"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {wasteByTypeData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="p-5">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Waste by Location</h3>
                        <div className="mt-2 h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={wasteByLocationData}>
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
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg lg:col-span-2">
                      <div className="p-5">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Waste Over Time</h3>
                        <div className="mt-2 h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={wasteOverTimeData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="amount" fill="#82ca9d" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Summary Statistics</h3>
                    <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Waste Generated</dt>
                          <dd className="mt-1 text-3xl font-semibold text-gray-900">3,200 kg</dd>
                        </div>
                      </div>
                      <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                          <dt className="text-sm font-medium text-gray-500 truncate">Most Common Waste Type</dt>
                          <dd className="mt-1 text-3xl font-semibold text-gray-900">Infectious</dd>
                        </div>
                      </div>
                      <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                          <dt className="text-sm font-medium text-gray-500 truncate">Highest Waste Producer</dt>
                          <dd className="mt-1 text-3xl font-semibold text-gray-900">Hospital A</dd>
                        </div>
                      </div>
                      <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                          <dt className="text-sm font-medium text-gray-500 truncate">Waste Reduction</dt>
                          <dd className="mt-1 text-3xl font-semibold text-gray-900">12%</dd>
                        </div>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportPagePreview;