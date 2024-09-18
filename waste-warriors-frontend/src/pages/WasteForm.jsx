/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import NavBar from '../components/NavBar';

const InputWastePreview = () => {
  const [formData, setFormData] = useState({
    wasteType: '',
    quantity: '',
    unit: 'kg',
    location: '',
    date: '',
    description: '',
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here
    console.log('Form submitted:', formData);
    alert('Waste data submitted successfully!');
    // Reset form after submission
    setFormData({
      wasteType: '',
      quantity: '',
      unit: 'kg',
      location: '',
      date: '',
      description: '',
    });
  };

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
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Input Waste Data</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="wasteType" className="block text-sm font-medium text-gray-700">
                          Waste Type
                        </label>
                        <select
                          id="wasteType"
                          name="wasteType"
                          value={formData.wasteType}
                          onChange={handleChange}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          required
                        >
                          <option value="">Select a waste type</option>
                          <option value="infectious">Infectious</option>
                          <option value="sharps">Sharps</option>
                          <option value="chemical">Chemical</option>
                          <option value="pharmaceutical">Pharmaceutical</option>
                          <option value="radioactive">Radioactive</option>
                          <option value="general">General</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                          Quantity
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="number"
                            name="quantity"
                            id="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                            placeholder="0.00"
                            required
                          />
                          <select
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                            className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
                          >
                            <option value="kg">kg</option>
                            <option value="lbs">lbs</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          id="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                          Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description (Optional)
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows="3"
                          value={formData.description}
                          onChange={handleChange}
                          className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                          placeholder="Additional details about the waste..."
                        ></textarea>
                      </div>
                    </div>

                    <div className="pt-5">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <PlusIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                          Add Waste Entry
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InputWastePreview;