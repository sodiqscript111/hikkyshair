import React from 'react';
import { Link } from 'react-router-dom';

const CollectionsSection: React.FC = () => {
  const collections = [
    {
      name: 'Bob',
      image: 'https://i.ibb.co/N6s3fXV3/Gemini-Generated-Image-mz4vb0mz4vb0mz4v.png',
      link: '/shop-all',
    },
    {
      name: 'Curly',
      image: 'https://i.ibb.co/W7Xmn3v/Gemini-Generated-Image-rinj5rinj5rinj5r.jpg',
      link: '/shop-all',
    },
    {
      name: 'Kinky',
      image: 'https://i.ibb.co/p6JV33hB/Gemini-Generated-Image-3s4r523s4r523s4r.jpg',
      link: '/shop-all',
    },
    {
      name: 'Straight',
      image: 'https://i.ibb.co/zWjGS6MD/argentine-straight-178319-webp-v-1739871833-width-500.jpg',
      link: '/shop-all',
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 font-inter"> {/* Removed bg-white */}
      <div className="flex flex-wrap justify-center gap-8">
        {collections.map((collection, index) => (
          <Link // Changed div to Link to make the whole card clickable
            key={index}
            to={collection.link} // Link to the specified path
            className="flex flex-col items-center max-w-xs cursor-pointer" // Removed styling classes
          >
            <div className="w-full h-64 overflow-hidden">
              <img
                src={collection.image}
                alt={`${collection.name} hair collection`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-center"> {/* Adjusted padding for closer name */}
              <h3 className="text-2xl font-normal text-[#121212] mt-2"> {/* Adjusted margin-top */}
                {collection.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CollectionsSection;