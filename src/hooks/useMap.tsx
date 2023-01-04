import { gql, useSubscription } from '@apollo/client'
import { useEffect } from 'react'
import { useState } from 'react'
import { getMappingPlacesAssigned } from '../utils/mapping/placesAssigned.mapping'
import { MaisonsList } from '../components/Map/Header/MaisonSelector/MaisonSelector'
import { client } from '../utils/graphql'
export const day = [
  { name: 'Sunday', indexDay: 1 },
  { name: 'Monday', indexDay: 2 },
  { name: 'Tuesday', indexDay: 3 },
  { name: 'Wednesday', indexDay: 4 },
  { name: 'Thursday', indexDay: 5 },
]
const useMap = () => {
  const [loadingApi, setLoading] = useState(false)
  const [activeDay, setActiveDay] = useState(day[0])
  const [activeSelectedMaisons, setActiveSelectedMaison] = useState(
    MaisonsList[2].id
  )
  const { data, loading } = useSubscription(
    gql`
      subscription places_assigned($indexDay: numeric!, $maisonsId: [uuid!]!) {
        places_assigned(
          where: { indexDay: { _eq: $indexDay }, maisonId: { _in: $maisonsId } }
        ) {
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
            role {
              name
            }
          }
        }
      }
    `,
    {
      variables: {
        indexDay: activeDay?.indexDay || 1,
        maisonsId: activeSelectedMaisons,
      },
    }
  )
  const {
    data: usersNotAssigned,
    loading: loadingUser,
    error,
  } = useSubscription(
    gql`
      subscription places_assigned($indexDay: numeric!, $maisonsId: [uuid!]!) {
        users(
          where: {
            maison_id: { _in: $maisonsId }
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
        indexDay: activeDay?.indexDay || 1,
        maisonsId: activeSelectedMaisons,
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

  const handleChangMaison = (value) => {
    console.log({ value })
    setActiveSelectedMaison(value.map((el) => el.id))
  }

  const handleRemoveUserAssigned = ({ indexPlace }) => {
    setLoading(true)
    const data = client.query({
      query: gql`
        mutation MyMutation($index_place: numeric!, $indexDay: numeric!) {
          update_places_assigned(
            where: {
              index_place: { _eq: $index_place }
              indexDay: { _eq: $indexDay }
            }
            _set: { userId: null }
          ) {
            returning {
              id
              userId
              index_place
              indexDay
            }
          }
        }
      `,
      variables: {
        index_place: indexPlace + 1,
        indexDay: activeDay?.indexDay || 1,
      },
    })
    setLoading(false)
  }

  return {
    placesAssigned,
    usersNotAssigned: usersNotAssigned?.users,
    activeDay,
    loading: loading || loadingApi,

    handleSelectDay,
    handleChangMaison,
    handleRemoveUserAssigned,
  }
}

export default useMap
