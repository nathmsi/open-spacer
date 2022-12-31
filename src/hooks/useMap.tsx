import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useState } from 'react'
import { getMappingPlacesAssigned } from '../utils/mapping/placesAssigned.mapping'

const useMap = () => {
  const { data } = useQuery(gql`
    query MyQuery {
      places_assigned {
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
  `)
  const [placesAssigned, setPlaceAssigned] = useState([])

  useEffect(() => {
    if (data?.places_assigned) {
      const places = data?.places_assigned
      setPlaceAssigned(getMappingPlacesAssigned(places))
    }
  }, [data])

  return {
    placesAssigned,
  }
}

export default useMap