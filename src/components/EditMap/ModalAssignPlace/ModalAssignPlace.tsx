import Button from '@mui/material/Button'
import {
  Backdrop,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { Content } from '../../Map/Header/AddNewUser/AddNewUser.style'
import { client } from '../../../utils/graphql'
import { gql } from '@apollo/client'

const ModalAssignPlace = ({ isOpen, indexPlace, onClose, maisonsList }) => {
  const [maison, setMaison] = useState('')
  const { index_y, index_x } = indexPlace || {}

  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    onClose()
  }

  const handleApply = async () => {
    if (maison) {
      setLoading(true)
      const maisonId = maison
      const data = client.query({
        query: gql`
          mutation MyMutation($dataToSend: [places_assigned_insert_input!]!) {
            insert_places_assigned(
              objects: $dataToSend
              on_conflict: {
                update_columns: [maisonId]
                constraint: places_assigned_indexDay_x_coordinate_y_coordinate_key
              }
            ) {
              returning {
                id
                indexDay
                maisonId
              }
            }
          }
        `,
        variables: {
          dataToSend: [1, 2, 3, 4, 5].map((index) => ({
            x_coordinate: index_x,
            y_coordinate: index_y,
            indexDay: index,
            maisonId,
          })),
        },
      })
      setLoading(false)
    }
    handleClose()
  }
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <div>
        <DialogTitle>ASSIGN PLACE ({index_y + ',' + index_x})</DialogTitle>
        <DialogContent>
          <Content>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Maison</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                onChange={(e) => {
                  setMaison(e.target.value)
                }}
              >
                {maisonsList?.map((maison, index) => (
                  <MenuItem key={index} value={maison.id}>
                    {maison.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Content>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleApply}>Add</Button>
        </DialogActions>
      </div>
      <Backdrop open={loading} />
    </Dialog>
  )
}

export default ModalAssignPlace
