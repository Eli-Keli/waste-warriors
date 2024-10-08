/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import NavBar from '../components/NavBar';
import { brandLogo, navLinks, userProfile } from '../data/navData'; // Import the data
import axiosInstance from '../../axiosInstance';

const InputWastePreview = () => {
  const [formData, setFormData] = useState({
    wasteType: '',
    quantity: '',
    unit: 'kg',
    location: '',
    date: '',
    description: '',
  });

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/waste', {
        waste_type: formData.wasteType,
        quantity: formData.quantity,
        location: formData.location,
        date: formData.date,
        description: formData.description,
      });

      if (response.status >= 200 && response.status < 300) {
        console.log('Waste data submitted successfully:', response.data);
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
      } else {
        console.error('Failed to submit waste data');
        alert('Failed to submit waste data');
      }
    } catch (error) {
      console.error('Error submitting waste data:', error);
      alert('Error submitting waste data');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar
        brandLogo={{ src: brandLogo.src, alt: brandLogo.alt }}
        navigation={navLinks}
        userProfile={userProfile}
      />

      <div className="py-10">
        {/* Header */}
        <div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Input Waste Data</h1>
          </div>
        </div>
        {/* Content */}
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
                          className="mt-1 block w-full px-3 py-2 text-base border focus:outline-none sm:text-sm rounded-md"
                          required
                        >
                          <option disabled>Select a waste type</option>
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
                            className="flex-1 min-w-0 block w-full px-3 py-2 rounded sm:text-sm border"
                            placeholder="0.00"
                            required
                          />
                          <select
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                            className="inline-flex items-center px-3 rounded border bg-gray-50 text-gray-500 sm:text-sm"
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
                          className="mt-1 px-3 py-2 block w-full shadow-sm sm:text-sm border rounded-md"
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
                          className="mt-1 px-3 py-2 block w-full shadow-sm sm:text-sm border rounded-md"
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
                          className="mt-1 px-3 py-2 block w-full shadow-sm sm:text-sm border rounded-md"
                          placeholder="Additional details about the waste..."
                        ></textarea>
                      </div>
                    </div>
                    {/* Buttons */}
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
