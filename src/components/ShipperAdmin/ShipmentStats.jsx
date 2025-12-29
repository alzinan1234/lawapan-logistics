"use client";

import React, { useState } from 'react';
import { ChevronDown, Plus, Upload, ArrowRight, ArrowLeft } from 'lucide-react';

const MonthDropdown = ({ month, setMonth, show, setShow, months }) => (
  <div className="relative">
    <button
      onClick={() => setShow(!show)}
      className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
    >
      {month}
      <ChevronDown
        className={`w-4 h-4 transition-transform ${show ? 'rotate-180' : ''}`}
      />
    </button>

    {show && (
      <>
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShow(false)}
        />
        <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[140px] max-h-[300px] overflow-y-auto">
          {months.map((m) => (
            <button
              key={m}
              onClick={() => {
                setMonth(m);
                setShow(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                m === month ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </>
    )}
  </div>
);

const ShipmentStats = () => {
  const [progressMonth, setProgressMonth] = useState('January');
  const [completedMonth, setCompletedMonth] = useState('January');
  const [spentMonth, setSpentMonth] = useState('January');

  const [showProgressDropdown, setShowProgressDropdown] = useState(false);
  const [showCompletedDropdown, setShowCompletedDropdown] = useState(false);
  const [showSpentDropdown, setShowSpentDropdown] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form data
  const [shipmentData, setShipmentData] = useState({
    // Step 1: Basic Information
    title: '',
    category: 'Furniture',
    description: '',
    weight: '',
    packagingType: 'Wooden Crates',
    length: '',
    width: '',
    height: '',
    images: [],
    
    // Step 2: Pickup & Delivery
    pickupAddress: '',
    deliveryAddress: '',
    pickupDate: '',
    deliveryDate: '',
    budget: '',
  });

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Sample data for different months
  const statsData = {
    January: { progress: 4, completed: 20, spent: 200 },
    February: { progress: 6, completed: 18, spent: 250 },
    March: { progress: 3, completed: 22, spent: 280 },
    April: { progress: 5, completed: 19, spent: 220 },
    May: { progress: 7, completed: 25, spent: 300 },
    June: { progress: 4, completed: 21, spent: 240 },
    July: { progress: 8, completed: 23, spent: 290 },
    August: { progress: 5, completed: 20, spent: 260 },
    September: { progress: 6, completed: 24, spent: 270 },
    October: { progress: 4, completed: 22, spent: 230 },
    November: { progress: 7, completed: 26, spent: 310 },
    December: { progress: 5, completed: 21, spent: 250 },
  };

  const categories = ['Furniture', 'Electronics', 'Food & Beverages', 'Clothing', 'Machinery', 'Chemicals', 'Construction Materials', 'Agricultural Products'];
  const packagingTypes = ['Wooden Crates', 'Cardboard Boxes', 'Plastic Containers', 'Pallets', 'Bulk', 'Bags', 'Barrels', 'Rolls'];

  const handleCreateShipment = () => {
    setShowCreateModal(true);
    setCurrentStep(1);
    // Reset form data
    setShipmentData({
      title: '',
      category: 'Furniture',
      description: '',
      weight: '',
      packagingType: 'Wooden Crates',
      length: '',
      width: '',
      height: '',
      images: [],
      pickupAddress: '',
      deliveryAddress: '',
      pickupDate: '',
      deliveryDate: '',
      budget: '',
    });
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setCurrentStep(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShipmentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setShipmentData((prev) => ({
      ...prev,
      images: [...prev.images, ...files.slice(0, 5 - prev.images.length)], // Max 5 images
    }));
  };

  const removeImage = (index) => {
    setShipmentData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleNextStep = () => {
    // Validate step 1
    if (currentStep === 1) {
      if (!shipmentData.title || !shipmentData.weight) {
        alert('Please fill in all required fields in Basic Information');
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmitShipment = (e) => {
    e.preventDefault();

    // Validate step 2
    if (!shipmentData.pickupAddress || !shipmentData.deliveryAddress || !shipmentData.budget) {
      alert('Please fill in all required fields in Pickup & Delivery Details');
      return;
    }

    // In a real app, you would make an API call here
    console.log('Creating shipment:', shipmentData);

    // Show success message
    alert(`Shipment "${shipmentData.title}" created successfully!\nBudget: €${parseInt(shipmentData.budget).toLocaleString()}`);

    // Update the progress count for the current month
    const updatedProgress = statsData[progressMonth].progress + 1;
    console.log(`Updated progress for ${progressMonth}: ${updatedProgress} shipments`);

    // Close modal
    handleCloseModal();

    // Show final confirmation
    alert(
      `Shipment published! You'll receive bids from transporters soon.\nProgress for ${progressMonth} updated to ${updatedProgress} shipments.`
    );
  };

  // Format number with commas
  const formatNumber = (num) => {
    return num ? parseInt(num).toLocaleString() : '';
  };

  const handleBudgetChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    if (!isNaN(value) || value === '') {
      setShipmentData((prev) => ({
        ...prev,
        budget: value,
      }));
    }
  };

  return (
    <>
      <div className="flex gap-4 p-6 bg-gray-50 ">
        {/* Create Shipment Card */}
        <div 
          className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-8 flex items-center justify-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group min-w-[200px]"
          onClick={handleCreateShipment}
        >
          <div className="flex items-center gap-3 text-gray-500 group-hover:text-blue-600 transition-colors">
            <Plus className="w-6 h-6" />
            <span className="text-lg font-medium">Create Shipment</span>
          </div>
        </div>

        {/* Shipments in progress */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm font-medium">Shipments in progress</h3>
            <MonthDropdown
              month={progressMonth}
              setMonth={setProgressMonth}
              show={showProgressDropdown}
              setShow={setShowProgressDropdown}
              months={months}
            />
          </div>
          <p className="text-5xl font-bold text-gray-900">{statsData[progressMonth].progress}</p>
        </div>

        {/* Completed shipments */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm font-medium">Completed shipments</h3>
            <MonthDropdown
              month={completedMonth}
              setMonth={setCompletedMonth}
              show={showCompletedDropdown}
              setShow={setShowCompletedDropdown}
              months={months}
            />
          </div>
          <p className="text-5xl font-bold text-gray-900">{statsData[completedMonth].completed}</p>
        </div>

        {/* Total Money spent */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm font-medium">Total Money spent</h3>
            <MonthDropdown
              month={spentMonth}
              setMonth={setSpentMonth}
              show={showSpentDropdown}
              setShow={setShowSpentDropdown}
              months={months}
            />
          </div>
          <p className="text-5xl font-bold text-gray-900">{statsData[spentMonth].spent}</p>
        </div>
      </div>

      {/* Create Shipment Modal */}
      {showCreateModal && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleCloseModal}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">CREATE SHIPMENT</h1>
                    <div className="flex items-center gap-4 mt-4">
                      <div className={`flex items-center gap-2 ${currentStep === 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
                          1
                        </div>
                        <span className="font-medium">Basic Information</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <div className={`flex items-center gap-2 ${currentStep === 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
                          2
                        </div>
                        <span className="font-medium">Pickup & Delivery</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-2xl text-gray-500">×</span>
                  </button>
                </div>
              </div>

              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <form className="p-6">
                  <div className="space-y-6">
                    {/* Shipment Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shipment title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={shipmentData.title}
                        onChange={handleInputChange}
                        placeholder="Ship 12 Pallets of Rice"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    {/* Category and Description */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <select
                          name="category"
                          value={shipmentData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <input
                          type="text"
                          name="description"
                          value={shipmentData.description}
                          onChange={handleInputChange}
                          placeholder="12 shrink-wrapped pallets, non-fragile"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                        />
                      </div>
                    </div>

                    {/* Weight and Packaging Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Weight (kg)
                        </label>
                        <input
                          type="number"
                          name="weight"
                          value={shipmentData.weight}
                          onChange={handleInputChange}
                          placeholder="2,300"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Type of packaging
                        </label>
                        <select
                          name="packagingType"
                          value={shipmentData.packagingType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                        >
                          {packagingTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Dimensions */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dimensions (L/W/H cm)
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                          type="number"
                          name="length"
                          value={shipmentData.length}
                          onChange={handleInputChange}
                          placeholder="Length"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                        />
                        <input
                          type="number"
                          name="width"
                          value={shipmentData.width}
                          onChange={handleInputChange}
                          placeholder="Width"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                        />
                        <input
                          type="number"
                          name="height"
                          value={shipmentData.height}
                          onChange={handleInputChange}
                          placeholder="Height"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                        />
                      </div>
                    </div>

                    {/* Upload Images */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload images
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <input
                          type="file"
                          id="image-upload"
                          multiple
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer flex flex-col items-center justify-center"
                        >
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-gray-600">Click to upload or drag and drop</span>
                          <span className="text-sm text-gray-500 mt-1">Max 5 images, 5MB each</span>
                        </label>
                      </div>
                      
                      {/* Preview uploaded images */}
                      {shipmentData.images.length > 0 && (
                        <div className="mt-4">
                          <div className="flex flex-wrap gap-2">
                            {shipmentData.images.map((image, index) => (
                              <div key={index} className="relative">
                                <div className="w-20 h-20 rounded border border-gray-200 overflow-hidden">
                                  <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Upload ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Next Button */}
                  <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      Next <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* Step 2: Pickup & Delivery Details */}
              {currentStep === 2 && (
                <form onSubmit={handleSubmitShipment} className="p-6">
                  <div className="space-y-6">
                    {/* Pickup Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pickup Address
                      </label>
                      <textarea
                        name="pickupAddress"
                        value={shipmentData.pickupAddress}
                        onChange={handleInputChange}
                        placeholder="Enter full pickup address"
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    {/* Delivery Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery Address
                      </label>
                      <textarea
                        name="deliveryAddress"
                        value={shipmentData.deliveryAddress}
                        onChange={handleInputChange}
                        placeholder="Enter full delivery address"
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pickup Date
                        </label>
                        <input
                          type="date"
                          name="pickupDate"
                          value={shipmentData.pickupDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                        />
                        <p className="text-sm text-gray-500 mt-1">Date with 2 days buffer</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Delivery Date
                        </label>
                        <input
                          type="date"
                          name="deliveryDate"
                          value={shipmentData.deliveryDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                        />
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                        <input
                          type="text"
                          name="budget"
                          value={formatNumber(shipmentData.budget)}
                          onChange={handleBudgetChange}
                          placeholder="200,000"
                          className="w-full pl-8 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Publish
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ShipmentStats;