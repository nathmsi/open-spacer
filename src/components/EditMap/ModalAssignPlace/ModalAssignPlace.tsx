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
          mutation MyMutation($dataToSend: [place_insert_input!]!) {
            insert_place(
              objects: $dataToSend
              on_conflict: {
                update_columns: [maisonId]
                constraint: place_x_coordinate_y_coordinate_id_key
              }
            ) {
              returning {
                id
                maisonId
              }
            }
          }
        `,
        variables: {
          dataToSend: [
            {
              x_coordinate: index_x,
              y_coordinate: index_y,
              maisonId,
            },
          ],
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
