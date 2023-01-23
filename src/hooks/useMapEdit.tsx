import { useEffect, useState } from 'react'
import { gql, useSubscription } from '@apollo/client'
import { getMappingPlacesByCoordinate } from '../utils/mapping/placesAssigned.mapping'
import { client } from '../utils/graphql'

const useMapEdit = () => {
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
      subscription places {
        place {
          y_coordinate
          x_coordinate
          updated_at
          maisonId
          id
          created_at
          maison {
            name
            id
          }
        }
      }
    `
  )
  const [placesAssigned, setPlaceAssigned] = useState([])

  useEffect(() => {
    if (data?.place?.length > 0) {
      const places = data?.place
      console.log({ places })
      setPlaceAssigned(getMappingPlacesByCoordinate(places))
    }
  }, [data])

  const removeMaisonInThisPlace = ({ index_x, index_y }) => {
    const data = client.query({
      query: gql`
        mutation MyMutation($x_coordinate: numeric!, $y_coordinate: numeric!) {
          delete_place(
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
