 "use client";
import React, { useState } from 'react';
import { Eye, Truck, ChevronLeft, ChevronRight } from 'lucide-react';

// Main Shipments List Component
const MyShipments = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [shipments, setShipments] = useState([
    {
      id: '7849',
      title: 'Furniture Delivery',
      route: 'Abidjan – Ouagadougou',
      status: 'In progress',
      statusColor: 'orange',
    },
    {
      id: '7850',
      title: 'Vehicle Parts',
      route: 'Abidjan – Ouagadougou',
      status: 'Delivered',
      statusColor: 'green',
    },
    {
      id: '7851',
      title: 'Vehicle Parts',
      route: 'Abidjan – Ouagadougou',
      status: 'Delivered',
      statusColor: 'green',
    },
    {
      id: '7852',
      title: 'Vehicle Parts',
      route: 'Abidjan – Ouagadougou',
      status: 'Delivered',
      statusColor: 'green',
    },
    {
      id: '7853',
      title: 'Vehicle Parts',
      route: 'Abidjan – Ouagadougou',
      status: 'Delivered',
      statusColor: 'green',
    },
  ]);

  const handleViewDetail = (id) => {
    // Next.js navigation
    window.location.href = `/dashboard/Shipper/shipments/${id}`;
  };

  const handleViewTracking = (id) => {
    // Next.js navigation
    window.location.href = `/dashboard/Shipper/shipments/${id}/tracking`;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-black">My Shipments</h1>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 text-black rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-50 flex items-center gap-2">
            + Create Shipment
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
         
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="text-left py-3 px-6 text-sm font-semibold">Shipment id</th>
              <th className="text-left py-3 px-6 text-sm font-semibold">Shipment title</th>
              <th className="text-left py-3 px-6 text-sm font-semibold">Pickup – Delivery</th>
              <th className="text-left py-3 px-6 text-sm font-semibold">Status</th>
              <th className="text-left py-3 px-6 text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-6 text-sm text-black">{shipment.id}</td>
                <td className="py-4 px-6 text-sm text-black">{shipment.title}</td>
                <td className="py-4 px-6 text-sm text-black">{shipment.route}</td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    shipment.statusColor === 'orange' 
                      ? 'bg-orange-100 text-orange-600' 
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {shipment.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewDetail(shipment.id)}
                      className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center hover:bg-purple-200 transition-colors"
                    >
                      <Eye className="w-4 h-4 text-purple-600" />
                    </button>
                    <button
                      onClick={() => handleViewTracking(shipment.id)}
                      className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors"
                    >
                      <Truck className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end  gap-2 py-6">
        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50">
          <ChevronLeft className="w-4 h-4 text-black" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded font-medium">1</button>
        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-black">2</button>
        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-black">3</button>
        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-black">4</button>
        <span className="px-2 text-black">...</span>
        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-black">30</button>
        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50">
          <ChevronRight className="w-4 h-4 text-black" />
        </button>
      </div>
    </div>
  );
};

export default MyShipments;