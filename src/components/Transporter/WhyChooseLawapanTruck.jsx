import React from 'react'
import { CheckCircle } from 'lucide-react'

// Array definitions for features remain the same as they are correct
const leftFeatures = [
  {
    title: 'No Hidden Fees',
    description: 'All services are completely free for transporters'
  },
  {
    title: 'Flexible Schedule',
    description: 'Accept jobs that fit your availability'
  },
  {
    title: 'Regional Coverage',
    description: 'Access to shipments across West Africa'
  }
]

const rightFeatures = [
  {
    title: 'Verified Shippers',
    description: 'Work only with trusted, verified businesses' // Corrected punctuation per image
  },
  {
    title: '24/7 Support',
    description: 'Our team is always here to help you'
  },
  {
    title: 'Growth Tools',
    description: 'Analytics and insights to grow your business'
  }
]

// FeatureCard component remains the same
const FeatureCard = ({ title, description }) => (
  <div className="flex gap-3 mb-6 sm:mb-8">
    <div className="flex-shrink-0 mt-1">
      {/* Used text-green-500 from the original, but the image uses a brighter green. */}
      {/* To match the image's green better, a custom color or a brighter Tailwind class like text-green-600 or text-lime-500 could be considered. Sticking with 500 for standard Tailwind usage. */}
      <CheckCircle className="w-6 h-6 text-green-500" /> 
    </div>
    <div>
      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
        {title}
      </h3>
      <p className="text-gray-600 text-xs sm:text-sm">
        {description}
      </p>
    </div>
  </div>
)

const WhyChooseLawapanTruck = () => {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto"> {/* Max-width adjusted for tighter grouping as seen in image */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 sm:mb-16 text-gray-900">
          Why Choose Lawapan Truck?
        </h2>

        {/* Outer container with relative positioning for the absolute divider */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          
          {/* Left Column */}
          <div className="flex flex-col justify-start">
            {leftFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          {/* Divider: Placed absolutely in the middle, hidden on small screens */}
          {/* The height is set to span the content by placing it in the relative container and using top/bottom */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 w-px bg-gray-300"></div>

          {/* Mobile Divider - Not present in the original image's style, so removing it for "same to same" look */}
          {/* <div className="md:hidden flex justify-center my-8">
            <div className="w-px h-12 bg-gray-300"></div>
          </div> */}

          {/* Right Column */}
          <div className="flex flex-col justify-start">
            {rightFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseLawapanTruck