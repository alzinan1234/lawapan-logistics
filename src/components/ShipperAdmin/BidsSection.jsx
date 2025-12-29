"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BidsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedShipment, setSelectedShipment] = useState(1);
  const [isFindingTransporter, setIsFindingTransporter] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const scrollContainerRef = useRef(null);
  const intervalRef = useRef(null);

  // Sample shipment data
  const shipments = [
    { id: 1, title: 'Ship 12 Tonnes of Rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop', status: 'Remove', statusColor: 'red', available: true, bids: 5 },
    { id: 2, title: 'Ship 8 Tonnes of Wheat', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop', status: 'Remove', statusColor: 'red', available: true, bids: 3 },
    { id: 3, title: 'Ship 15 Tonnes of Corn', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop', status: 'Remove', statusColor: 'red', available: true, bids: 7 },
    { id: 4, title: 'Ship 20 Tonnes of Soybeans', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop', status: 'Remove', statusColor: 'red', available: true, bids: 4 },
    { id: 5, title: 'Ship 10 Tonnes of Barley', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop', status: 'Remove', statusColor: 'red', available: true, bids: 2 },
  ];

  // Sample bidders data
  const bidders = [
    { id: 1, name: 'John Doe', price: '€150.00', avatar: '👤', shipmentId: 1, isSelected: false },
    { id: 2, name: 'Jane Smith', price: '€148.00', avatar: '👤', shipmentId: 1, isSelected: false },
    { id: 3, name: 'Mike Johnson', price: '€152.00', avatar: '👤', shipmentId: 1, isSelected: true },
    { id: 4, name: 'Sarah Williams', price: '€147.00', avatar: '👤', shipmentId: 2, isSelected: false },
    { id: 5, name: 'Tom Brown', price: '€149.00', avatar: '👤', shipmentId: 2, isSelected: false },
    { id: 6, name: 'Emily Davis', price: '€151.00', avatar: '👤', shipmentId: 3, isSelected: false },
    { id: 7, name: 'Chris Wilson', price: '€153.00', avatar: '👤', shipmentId: 3, isSelected: true },
    { id: 8, name: 'Anna Martinez', price: '€150.00', avatar: '👤', shipmentId: 4, isSelected: false }, 
    { id: 9, name: 'David Lee', price: '€149.00', avatar: '👤', shipmentId: 5, isSelected: true },
  ];

  // Filter bidders based on selected shipment
  const filteredBidders = bidders.filter(bidder => bidder.shipmentId === selectedShipment);

  // Calculate timer for finding transporter
  useEffect(() => {
    if (isFindingTransporter) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isFindingTransporter]);

  // Simulate finding transporter completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFindingTransporter(false);
    }, 10000); // Stop after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handlePrevSlide = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardElement = container.querySelector('.shipment-card');
      const cardWidth = cardElement ? cardElement.clientWidth : 216;
      const newScrollLeft = container.scrollLeft - cardWidth;
      container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
      
      // Update current slide based on scroll position
      const newSlide = Math.max(0, Math.floor(newScrollLeft / cardWidth));
      setCurrentSlide(newSlide);
    }
  }, []);

  const handleNextSlide = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardElement = container.querySelector('.shipment-card');
      const cardWidth = cardElement ? cardElement.clientWidth : 216;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const newScrollLeft = Math.min(container.scrollLeft + cardWidth, maxScroll);
      container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
      
      // Update current slide based on scroll position
      const newSlide = Math.min(
        shipments.length - 1,
        Math.floor(newScrollLeft / cardWidth)
      );
      setCurrentSlide(newSlide);
    }
  }, [shipments.length]);

  const handleShipmentClick = useCallback((shipmentId) => {
    setSelectedShipment(shipmentId);
    
    // Reset timer when selecting new shipment
    setIsFindingTransporter(true);
    setTimeElapsed(0);
    
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Set new interval
    intervalRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    
    // Simulate finding transporter for this shipment
    setTimeout(() => {
      setIsFindingTransporter(false);
    }, 5000 + Math.random() * 5000); // Random time between 5-10 seconds
  }, []);

  const handleSelectBidder = useCallback((bidderId) => {
    // In a real app, this would update the backend
    console.log('Selected bidder:', bidderId);
    
    // For demo, we'll just show an alert
    alert(`Selected bidder ${bidderId} for shipment ${selectedShipment}`);
  }, [selectedShipment]);

  const handleRemoveShipment = useCallback((shipmentId, e) => {
    e.stopPropagation();
    console.log('Remove shipment:', shipmentId);
    
    // In a real app, this would make an API call
    alert(`Shipment ${shipmentId} removed`);
  }, []);

  // Handle scroll events to update current slide
  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardElement = container.querySelector('.shipment-card');
      const cardWidth = cardElement ? cardElement.clientWidth : 216;
      const scrollLeft = container.scrollLeft;
      const slide = Math.round(scrollLeft / cardWidth);
      setCurrentSlide(slide);
    }
  }, []);

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="  p-6">
      {/* Bids Header with Navigation */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Bids</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            Shipment {selectedShipment} of {shipments.length}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${
                currentSlide === 0
                  ? 'bg-gray-100 border border-gray-200 cursor-not-allowed'
                  : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-blue-500'
              }`}
            >
              <ChevronLeft className={`w-5 h-5 ${currentSlide === 0 ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>
            <button
              onClick={handleNextSlide}
              disabled={currentSlide === shipments.length - 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${
                currentSlide === shipments.length - 1
                  ? 'bg-gray-100 border border-gray-200 cursor-not-allowed'
                  : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-blue-500'
              }`}
            >
              <ChevronRight className={`w-5 h-5 ${currentSlide === shipments.length - 1 ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Shipment Cards Slider */}
      <div className="mb-6 overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {shipments.map((shipment, index) => (
            <div
              key={shipment.id}
              className={`shipment-card relative flex-shrink-0 w-[200px] h-[140px] rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 ${
                selectedShipment === shipment.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
              }`}
              onClick={() => handleShipmentClick(shipment.id)}
            >
              <img
                src={shipment.image}
                alt={shipment.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Status Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                <button
                  onClick={(e) => handleRemoveShipment(shipment.id, e)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-full transition-colors"
                >
                  Remove
                </button>
              </div>
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  {shipment.bids} Bids
                </span>
              </div>

              {/* Title */}
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-semibold text-sm">{shipment.title}</h3>
                <p className="text-white/80 text-xs mt-1">Click to view bids</p>
              </div>

              {/* Slide indicator */}
              <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 ${
                selectedShipment === shipment.id ? 'opacity-100' : 'opacity-0'
              } transition-opacity`}>
                {shipments.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${
                      i === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Bids Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">
              Bids for Shipment {selectedShipment}
            </h3>
            <span className="text-sm text-gray-500">
              {filteredBidders.length} bidders
            </span>
          </div>
          
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600">
                  <th className="text-left py-3 px-6 text-white font-semibold text-sm">Bidders</th>
                  <th className="text-right py-3 px-6 text-white font-semibold text-sm">Price</th>
                  <th className="text-right py-3 px-6 text-white font-semibold text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBidders.map((bidder, index) => (
                  <tr
                    key={bidder.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    } ${bidder.isSelected ? 'bg-blue-50' : ''}`}
                  >
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm">
                          {bidder.avatar}
                        </div>
                        <span className="text-gray-400 text-sm font-medium">{bidder.name}</span>
                        {bidder.isSelected && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            Selected
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-right">
                      <span className="text-gray-900 font-medium text-sm">{bidder.price}</span>
                    </td>
                    <td className="py-3 px-6 text-right">
                      <button
                        onClick={() => handleSelectBidder(bidder.id)}
                        className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                          bidder.isSelected
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        }`}
                      >
                        {bidder.isSelected ? 'Selected ✓' : 'Select Bid'}
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredBidders.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-8 px-6 text-center text-gray-500">
                      No bids available for this shipment
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Assigned Transporter */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Assigned transporter</h3>
            {isFindingTransporter && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                Searching ({formatTime(timeElapsed)})
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-center justify-center py-12">
            {/* Hourglass Animation */}
            <div className="relative mb-8">
              <div className="hourglass-container">
                <svg width="120" height="160" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Top container */}
                  <path d="M20 10 L100 10 L100 20 L85 50 L60 75 L35 50 L20 20 Z" fill="#E8F3FF" stroke="#93C5FD" strokeWidth="2"/>
                  
                  {/* Sand in top */}
                  <path d="M25 15 L95 15 L95 22 L82 48 L60 70 L38 48 L25 22 Z" fill="#60A5FA" opacity="0.6">
                    {isFindingTransporter && (
                      <animate attributeName="d" 
                        values="M25 15 L95 15 L95 22 L82 48 L60 70 L38 48 L25 22 Z;
                                M25 15 L95 15 L95 18 L78 40 L60 60 L42 40 L25 18 Z;
                                M25 15 L95 15 L25 15 L25 15 L60 15 L95 15 L95 15 Z"
                        dur="3s"
                        repeatCount="indefinite"/>
                    )}
                  </path>
                  
                  {/* Middle neck */}
                  <ellipse cx="60" cy="80" rx="8" ry="4" fill="#93C5FD"/>
                  
                  {/* Bottom container */}
                  <path d="M20 140 L100 140 L100 150 L85 110 L60 85 L35 110 L20 150 Z" fill="#E8F3FF" stroke="#93C5FD" strokeWidth="2"/>
                  
                  {/* Sand in bottom */}
                  <path d="M60 85 L38 112 L25 138 L25 145 L95 145 L95 138 L82 112 Z" fill="#3B82F6" opacity="0.8">
                    {isFindingTransporter && (
                      <animate attributeName="d" 
                        values="M60 85 L60 85 L60 85 L25 85 L25 85 L95 85 L95 85 Z;
                                M60 90 L42 120 L25 140 L25 145 L95 145 L95 140 L78 120 Z;
                                M60 95 L38 112 L25 138 L25 148 L95 148 L95 138 L82 112 Z"
                        dur="3s"
                        repeatCount="indefinite"/>
                    )}
                  </path>
                  
                  {/* Falling sand particles */}
                  {isFindingTransporter && (
                    <>
                      <circle cx="60" cy="80" r="2" fill="#3B82F6">
                        <animate attributeName="cy" values="75;85;95" dur="1.5s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="1;0.8;0" dur="1.5s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="55" cy="85" r="1.5" fill="#3B82F6">
                        <animate attributeName="cy" values="75;85;95" dur="1.8s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="1;0.8;0" dur="1.8s" repeatCount="indefinite"/>
                      </circle>
                    </>
                  )}
                </svg>
              </div>
              
              {/* Decorative particles */}
              {isFindingTransporter && (
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <div className="absolute top-8 left-4 w-2 h-2 bg-blue-200 rounded-full animate-float" style={{animationDelay: '0s'}}></div>
                  <div className="absolute top-12 right-8 w-1.5 h-1.5 bg-blue-300 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute bottom-12 left-8 w-2 h-2 bg-blue-200 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
                  <div className="absolute bottom-8 right-4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
                </div>
              )}
            </div>

            {/* Text Content */}
            {isFindingTransporter ? (
              <>
                <h4 className="text-lg font-bold text-gray-900 mb-2 text-center">
                  Finding the Best Match for Your Shipment
                </h4>
                <p className="text-sm text-gray-500 text-center max-w-md">
                  We are actively working to assign the best-matched and most reliable transporter for your needs
                </p>
                <div className="mt-6 w-64 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (timeElapsed / 10) * 100)}%` }}
                  ></div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🚚</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2 text-center">
                    Transporter Assigned!
                  </h4>
                  <p className="text-sm text-gray-500 text-center max-w-md mb-4">
                    {selectedShipment === 1 && 'Mike Johnson has been assigned to your shipment'}
                    {selectedShipment === 2 && 'Tom Brown has been assigned to your shipment'}
                    {selectedShipment === 3 && 'Chris Wilson has been assigned to your shipment'}
                    {selectedShipment === 4 && 'Anna Martinez has been assigned to your shipment'}
                    {selectedShipment === 5 && 'David Lee has been assigned to your shipment'}
                  </p>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {filteredBidders.find(b => b.isSelected)?.price || '€150.00'}
                    </div>
                    <div className="text-sm text-gray-500">Best bid selected</div>
                  </div>
                </div>
                <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BidsSection;