import { gql, useSubscription } from '@apollo/client'
import { client } from '../utils/graphql'
import { useState } from 'react'

const useUserAssigned = ({ place, indexDay, index_place }) => {
  const { maison } = place || {}
  const [loading, setLoading] = useState(false)
  const { data: userData, loading: loadingUser } = useSubscription(
    gql`
      subscription MyQuery($maisonId: uuid!, $indexDay: numeric!) {
        users(
          where: {
            maison_id: { _eq: $maisonId }
            places_assigneds_aggregate: {
              count: {
                predicate: { _eq: 0 }
                filter: { indexDay: { _eq: $indexDay } }
              }
            }
          }
        ) {
          fullName
          email
          id
          role {
            name
          }
        }
      }
    `,
    {
      variables: {
        maisonId: maison?.id,
        indexDay,
      },
    }
  )
  const handleSelectPlace = (userId) => {
    console.log({ userId })
    setLoading(true)
    const data = client.query({
      query: gql`
        mutation handleSelectPlace(
          $dataToSend: [places_assigned_insert_input!]!
        ) {
          insert_places_assigned(
            objects: $dataToSend
            on_conflict: {
              update_columns: userId
              constraint: places_assigned_indexDay_x_coordinate_y_coordinate_key
            }
          ) {
            returning {
              id
            }
          }
        }
      `,
      variables: {
        dataToSend: [
          {
            indexDay,
            userId: userId,
            x_coordinate: place?.x_coordinate,
            y_coordinate: place?.y_coordinate,
          },
        ],
      },
    })
    setLoading(false)
  }
  return {
    handleSelectPlace,
    users: userData?.users,
    loading: loading || loadingUser,
  }
}

export default useUserAssigned
