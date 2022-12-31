import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useState } from 'react'
import { getMappingPlacesAssigned } from '../utils/mapping/placesAssigned.mapping'
export const day = [
  { name: 'Sunday', indexDay: 1 },
  { name: 'Monday', indexDay: 2 },
  { name: 'Tuesday', indexDay: 3 },
  { name: 'Wednesday', indexDay: 4 },
  { name: 'Thursday', indexDay: 5 },
]
const useMap = () => {
  const [activeDay, setActiveDay] = useState(day[0])

  const { data, loading } = useQuery(
    gql`
      query MyQuery($indexDay: numeric!) {
        places_assigned(where: { indexDay: { _eq: $indexDay } }) {
          id
          updated_at
          userId
          created_at
          index_place
          maison {
            name
            id
          }
          user {
            id
            maison_id
            email
            updated_at
            created_at
            fullName
            maison {
              name
              updated_at
              id
            }
          }
        }
      }
    `,
    {
      variables: {
        indexDay: activeDay?.indexDay || 1,
      },
    }
  )
  const [placesAssigned, setPlaceAssigned] = useState([])

  useEffect(() => {
    if (data?.places_assigned) {
      const places = data?.places_assigned
      setPlaceAssigned(getMappingPlacesAssigned(places))
    }
  }, [data])

  const handleSelectDay = (day) => {
    setActiveDay(day)
  }

  return {
    placesAssigned,
    handleSelectDay,
    activeDay,
    loading,
  }
}

export default useMap
