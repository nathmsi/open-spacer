import { Container } from './EditMap.style'
import ModalAssignPlace from './ModalAssignPlace/ModalAssignPlace'
import { useState } from 'react'
import useMapEdit from '../../hooks/useMapEdit'

const lengthPerRow = 20

export const mapSpace = Array.from({ length: 50 }, () => []).map((el) =>
  Array.from({ length: lengthPerRow }, () => [])
)

const EditMap = () => {
  const { placesAssigned, maisonsList, removeMaisonInThisPlace } = useMapEdit()
  const [isOpen, setIsOpen] = useState(false)
  const [indexPlaceSelected, setIndexPlaceSelected] = useState(null)

  const handleSelectPlace = (index) => {
    setIndexPlaceSelected(index)
    setIsOpen(true)
  }

  return (
    <>
      <Container lengthPerRow={lengthPerRow}>
        {mapSpace?.map((row, index_y) => {
          return (
            <div key={index_y} className="row">
              {row.map((column, index_x) => {
                const { maison, meeting_room } =
                  placesAssigned?.[index_y]?.[index_x] || {}
                if (maison?.name) {
                  return (
                    <div
                      key={index_x}
                      className="place placeAssign"
                      onClick={() =>
                        removeMaisonInThisPlace({ index_y, index_x })
                      }
                    >
                      {maison?.name}
                    </div>
                  )
                }
                if (meeting_room?.name) {
                  return (
                    <div
                      key={index_x}
                      className="placeAssign"
                      onClick={() => handleSelectPlace({ index_y, index_x })}
                    >
                      room : {meeting_room?.name}
                    </div>
                  )
                }
                return (
                  <div
                    key={index_x}
                    className="place"
                    onClick={() => handleSelectPlace({ index_y, index_x })}
                  >
                    ({index_y + ',' + index_x})
                  </div>
                )
              })}
            </div>
          )
        })}
      </Container>
      <ModalAssignPlace
        indexPlace={indexPlaceSelected}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        maisonsList={maisonsList}
      />
    </>
  )
}
export default EditMap
