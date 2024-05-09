import PropertyCard from '@/components/PropertyCard'
import {revalidatePath} from 'next/cache'
import { fetchProperties } from '@/utils/requests';

const PropertiesPage = async () => {

  const properties = await fetchProperties();
  revalidatePath('/properties')

  //sort properties by date
  properties.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
  
  return (
    <section className='px-4 py-4'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {
          properties.length === 0 ? (
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

