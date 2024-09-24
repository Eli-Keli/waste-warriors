/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { brandLogo, navLinks, userProfile } from '../data/navData'; // Import the data
import Map from '../components/MapComponent5';
import { Award, CheckCircle } from 'lucide-react';
import VolunteerModal from '../components/VolunteerModal';



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

const markersData = [
  { lat: -1.28333, lng: 36.81667, popupContent: 'Hospital A' },
  { lat: -1.2900, lng: 36.8200, popupContent: 'Transfer Station X' },
  { lat: -1.3000, lng: 36.8100, popupContent: 'Treatment Facility' },
  { lat: -1.2950, lng: 36.8050, popupContent: 'Disposal Site' }
];


const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMap, setShowMap] = useState(true);

  const handleOpenModal = () => {
    setShowMap(false);
    setIsModalOpen(true)
  };
  const handleCloseModal = () => {
    setShowMap(true);
    setIsModalOpen(false)
  };

  const handleSubmitVolunteer = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Submitted successfully");
    handleCloseModal();
  };


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
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-full">
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
                    <div className="h-full flex flex-col justify-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Waste Journey Map</h3>
                      {
                        showMap && <Map markers={markersData} />
                      }

                      <div className="p-5">
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-500">Journey Stages:</h4>
                          <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                            <li>Generated at Hospital A</li>
                            <li>Transferred to Transfer Station</li>
                            <li>Processed at Treatment Facility</li>
                            <li>Final Disposal at Disposal Site</li>
                          </ul>
                        </div>
                      </div>

                      {/* Volunteer/Community Section */}
                      <div className="bg-gray-50 px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Get Involved</h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Join our community of volunteers and help us improve medical waste management in your local area.
                          </p>
                          <div className="mt-4 flex">
                            <div className="flex-shrink-0">
                              <CheckCircle className="h-6 w-6 text-green-500" />
                            </div>
                            <div className="ml-3">
                              <h4 className="text-sm font-medium text-gray-900">Volunteer Opportunities</h4>
                              <p className="text-sm text-gray-500">
                                Assist with waste collection, sorting, and transportation. Sign up to volunteer today!
                              </p>
                              <button className="mt-2 inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                onClick={handleOpenModal}
                              >
                                Join as a Volunteer
                              </button>

                              {/* Volunteer Modal */}
                              <VolunteerModal
                                isOpen={isModalOpen}
                                onClose={handleCloseModal}
                                onSubmit={handleSubmitVolunteer}
                              />

                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Rewards Section */}
                      <div className="bg-white px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Rewards and Incentives</h3>
                        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <div className="bg-gray-50 overflow-hidden rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                              <div className="flex">
                                <div className="flex-shrink-0">
                                  <Award className="h-6 w-6 text-yellow-500" />
                                </div>
                                <div className="ml-3">
                                  <h4 className="text-sm font-medium text-gray-900">Top Waste Collectors</h4>
                                  <p className="mt-1 text-sm text-gray-500">
                                    Earn rewards for collecting the most waste each month.
                                  </p>
                                  <p className="mt-2 flex items-baseline text-2xl font-semibold text-gray-900">
                                    $10
                                    <span className="ml-2 text-sm font-medium text-gray-500">
                                      (KES 1290.00) gift card
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 overflow-hidden rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                              <div className="flex">
                                <div className="flex-shrink-0">
                                  <Award className="h-6 w-6 text-yellow-500" />
                                </div>
                                <div className="ml-3">
                                  <h4 className="text-sm font-medium text-gray-900">Referral Bonus</h4>
                                  <p className="mt-1 text-sm text-gray-500">
                                    Invite friends to join and earn rewards.
                                  </p>
                                  <p className="mt-2 flex items-baseline text-2xl font-semibold text-gray-900">
                                    $5
                                    <span className="ml-2 text-sm font-medium text-gray-500">
                                      (KES 645.00) per referral
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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