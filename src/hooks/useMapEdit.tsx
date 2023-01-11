import { useEffect, useState } from 'react'
import { day, getDayNumber } from './useMap'
import { gql, useSubscription } from '@apollo/client'
import { getMappingPlacesAssignedByCoordinate } from '../utils/mapping/placesAssigned.mapping'
import { client } from '../utils/graphql'

const useMapEdit = () => {
  const [activeDay, setActiveDay] = useState(day[getDayNumber() - 1] || day[0])

  const { data: maisonList } = useSubscription(
    gql`
      subscription MyQuery {
        maison {
          id
          name
          updated_at
          created_at
        }
      }
    `
  )

  const {
    data,
    loading,
    error: errorMessage,
  } = useSubscription(
    gql`
      subscription places_assigned($indexDay: numeric!) {
        places_assigned(
          where: {
            indexDay: { _eq: $indexDay }
            index_place: { _is_null: true }
          }
        ) {
          id
          updated_at
          userId
          created_at
          indexDay
          index_place
          x_coordinate
          y_coordinate
          meeting_room {
            id
            name
          }
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
            role {
              name
            }
          }
        }
      }
    `,
    {
      variables: {
        indexDay: 2,
      },
    }
  )
  const [placesAssigned, setPlaceAssigned] = useState([])

  useEffect(() => {
    if (data?.places_assigned) {
      const places = data?.places_assigned
      console.log({ places })
      setPlaceAssigned(getMappingPlacesAssignedByCoordinate(places))
    }
  }, [data])

  const removeMaisonInThisPlace = ({ index_x, index_y }) => {
    const data = client.query({
      query: gql`
        mutation MyMutation($x_coordinate: numeric!, $y_coordinate: numeric!) {
          delete_places_assigned(
            where: {
              x_coordinate: { _eq: $x_coordinate }
              y_coordinate: { _eq: $y_coordinate }
            }
          ) {
            returning {
              id
            }
          }
        }
      `,
      variables: {
        x_coordinate: index_x,
        y_coordinate: index_y,
      },
    })
  }

  return {
    placesAssigned,
    loading,
    maisonsList: maisonList?.maison,

    removeMaisonInThisPlace,
  }
}

export default useMapEdit
