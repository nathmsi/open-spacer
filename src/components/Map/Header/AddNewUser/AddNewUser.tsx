import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { Content } from './AddNewUser.style'
import { listRole } from '../../../../hooks/useMap'
import useUserUpdate from '../../../../hooks/useUserUpdate'
import Backdrop from '../../../commons/backdrop'

const AddNewUser = ({ MaisonList }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [fullName, setFullName] = useState('')
  const [maison, setMaison] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const { createNewUser, loading } = useUserUpdate()

  const handleClickOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleAddEmploye = async () => {
    const user = {
      fullName,
      maison,
      role,
      email,
    }
    await createNewUser(user)
    console.log(user)
    handleClose()
  }
  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
      >
        Add User
      </Button>
      <Dialog open={isOpen} onClose={handleClose}>
        <div>
          <DialogTitle>Add User</DialogTitle>
          <DialogContent>
            <Content>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Full Name"
                type="email"
                fullWidth
                variant="standard"
                onChange={(e) => setFullName(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                onChange={(e) => setEmail(e.target.value)}
              />
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
                  {MaisonList?.map((maison, index) => (
                    <MenuItem key={index} value={maison.id}>
                      {maison.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  onChange={(e) => {
                    setRole(e.target.value)
                  }}
                >
                  {listRole &&
                    listRole?.map((role, index) => (
                      <MenuItem key={index} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Content>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddEmploye}>Add</Button>
          </DialogActions>
        </div>
      </Dialog>
      <Backdrop open={loading} />
    </>
  )
}

export default AddNewUser
