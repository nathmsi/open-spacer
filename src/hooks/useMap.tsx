import { gql, useSubscription } from '@apollo/client'
import { useEffect } from 'react'
import { useState } from 'react'
import {
  getMappingPlacesAssignedByCoordinate,
  getMappingPlacesByCoordinate,
} from '../utils/mapping/placesAssigned.mapping'
import { client } from '../utils/graphql'
import { useRouter } from 'next/router'

export const day = [
  { name: 'Sunday', indexDay: 1 },
  { name: 'Monday', indexDay: 2 },
  { name: 'Tuesday', indexDay: 3 },
  { name: 'Wednesday', indexDay: 4 },
  { name: 'Thursday', indexDay: 5 },
]

export const listRole = [
  {
    name: 'IOS',
    created_at: '2023-01-02T11:52:00.151695+00:00',
    updated_at: '2023-01-02T11:52:00.151695+00:00',
    id: '1165ab36-baff-46a6-b2e8-e5fbc305be5f',
  },
  {
    name: 'SF',
    created_at: '2023-01-02T11:52:03.862208+00:00',
    updated_at: '2023-01-02T11:52:03.862208+00:00',
    id: 'cfe82f22-21cc-4b9d-a45e-d28f9f20e785',
  },
  {
    name: 'Manager',
    created_at: '2023-01-02T11:52:10.680007+00:00',
    updated_at: '2023-01-02T11:52:10.680007+00:00',
    id: 'b92263d8-6536-45eb-ad79-2b09c9b22957',
  },
  {
    name: 'BACK',
    created_at: '2023-01-02T11:52:18.380355+00:00',
    updated_at: '2023-01-02T11:52:18.380355+00:00',
    id: '5d300f0b-9020-44f1-b0c5-e502f74b9b10',
  },
  {
    name: 'FRONT/BACK',
    created_at: '2023-01-02T11:52:15.105736+00:00',
    updated_at: '2023-01-03T19:58:08.465093+00:00',
    id: 'c13534e3-9fe2-43c2-9ab7-c6418ed5c07e',
  },
]

export function getDayNumber() {
  var d = new Date()
  var dayNumber = d.getDay() + 1
  return dayNumber
}

const useMap = ({ allMaison = false }) => {
  const [loadingApi, setLoading] = useState(false)
  const [activeDay, setActiveDay] = useState(new Date())
  const [showMeetingRoom, setShowMeetingRoom] = useState(false)
  const [picklistMaison, setPickListMaison] = useState([])
  const [activeSelectedMaisons, setActiveSelectedMaison] = useState([])
  const router = useRouter()
  const { maison: defaultMaison } = router?.query || {}

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
    data: dataPlaceAssign,
    loading,
    error: errorMessage,
  } = useSubscription(
    gql`
      subscription places_assigned($activeDay: date!) {
        places_assigned(where: { date: { _eq: $activeDay } }) {
          id
          updated_at
          created_at
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
        activeDay: activeDay,
      },
    }
  )

  console.log(errorMessage, dataPlaceAssign)

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

  const { data: dataPlace, loading: loadingPlace } = useSubscription(
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
  const [places, setPlaces] = useState([])

  useEffect(() => {
    if (defaultMaison && picklistMaison?.length > 0) {
      const idMaison = picklistMaison.find(
        (el) => el.name?.toUpperCase() === defaultMaison?.toUpperCase()
      )?.id
      console.log({ idMaison, defaultMaison })
      if (idMaison) {
        setActiveSelectedMaison([idMaison])
      }
    }
  }, [defaultMaison, picklistMaison])

  useEffect(() => {
    if (maisonList?.maison) {
      setPickListMaison(maisonList?.maison)
    }
  }, [maisonList])

  useEffect(() => {
    if (dataPlaceAssign?.places_assigned) {
      const places = dataPlaceAssign?.places_assigned
      setPlaceAssigned(getMappingPlacesAssignedByCoordinate(places))
    }
  }, [dataPlaceAssign])

  useEffect(() => {
    if (dataPlace?.place) {
      const places = dataPlace?.place
      setPlaces(getMappingPlacesByCoordinate(places))
    }
  }, [dataPlace])

  const handleSelectDay = (date) => {
    console.log(date.format())
    setActiveDay(date?.format())
  }

  const handleChangMaison = (value) => {
    console.log({ value })
    setActiveSelectedMaison(value.map((el) => el.id))
  }

  const handleRemoveUserAssigned = ({ index_x, index_y }) => {
    setLoading(true)
    const data = client.query({
      query: gql`
        mutation MyMutation(
          $x_coordinate: numeric!
          $y_coordinate: numeric!
          $indexDay: numeric!
        ) {
          update_places_assigned(
            where: {
              x_coordinate: { _eq: $x_coordinate }
              y_coordinate: { _eq: $y_coordinate }
              indexDay: { _eq: $indexDay }
            }
            _set: { userId: null }
          ) {
            returning {
              id
              userId
              indexDay
            }
          }
        }
      `,
      variables: {
        x_coordinate: index_x,
        y_coordinate: index_y,
        indexDay: activeDay?.indexDay || 1,
      },
    })
    setLoading(false)
  }

  const handleCheckMeetingRoom = (event) => {
    setShowMeetingRoom(event.target.checked)
  }

  return {
    placesAssigned,
    usersNotAssigned: usersNotAssigned?.users,
    activeDay,
    loading: loading || loadingApi,
    picklistMaison,
    places,

    handleSelectDay,
    handleChangMaison,
    handleRemoveUserAssigned,
    handleCheckMeetingRoom,
  }
}

export default useMap
