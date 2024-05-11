'use client'
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import { fetchProperties } from '@/utils/requests';
import { useState, useEffect } from 'react';

const HomeProperties = async () => {


    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPropertiesData = async () => {
       
        try {
          const properties = await fetchProperties();
          setProperties(properties);
        } catch (error) {
          console.error('Error fetching property:', error);
        } finally {
          setLoading(false);
        }
      };
  
      if (properties.length === 0) {
        fetchPropertiesData();
      }
    }, [properties]);

    const recentProperties = properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto'>
          <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
            Recent Properties
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {recentProperties.length === 0 && !loading? (
              <p>No Properties Found</p>
            ) : (
              recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className='m-auto max-w-lg my-10 px-6'>
        <Link
          href='/properties'
          className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};
export default HomeProperties;