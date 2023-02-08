import { useEffect, useState } from 'react'
import { ref, onValue, remove } from 'firebase/database'

import AddPlace from './addPlace'

import { db } from '../../../utils/firebase'

import MapPlace from '../../MapPlace'

const ListPlace = () => {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    onValue(ref(db, `places`), (snapshot) => {
      const data = snapshot.val()
      const places =
        data &&
        Object.keys(data).map((key) => ({
          ...data[key],
        }))
      setPlaces(places)
    })
  }, [])

  const handleRemovePlace = async (place) => {
    await remove(ref(db, `places/${place}`))
  }

  return (
    <div>
      <MapPlace
        {...{
          handleRemovePlaceEmployee: handleRemovePlace,
          places,
          assignedPlace: [],
          editMode: true,
          modePlaceEdit: true,
        }}
      />
      <AddPlace />
    </div>
  )
}

export default ListPlace
