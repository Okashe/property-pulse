'use client'
import PropertyCard from '@/components/PropertyCard'
import {revalidatePath} from 'next/cache'
import { fetchProperties } from '@/utils/requests';
import {useState, useEffect} from 'react'


const PropertiesPage = async () => {
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

    if (properties.length===0) {
      fetchPropertiesData();
    }
  }, [properties]);

 

  //sort properties by date
  properties.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
  
  return (
    <section className='px-4 py-4'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {
          properties.length === 0 && !loading ?(
            <p>No properties found!</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
              {
                properties.map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                  />
                ))}
            </div>
          )}

      </div>
    </section>
  )
}

export default PropertiesPage

