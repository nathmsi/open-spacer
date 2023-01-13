import { useState } from 'react'
import { Container } from './index.style'
import {
  FormControl,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  Button,
} from '@mui/material'
import { client } from '../../../../../utils/graphql'
import { gql } from '@apollo/client'
const RowUpdate = ({
  maisonsList,
  fullName,
  maison_id,
  email,
  userRoleId,
  id,
  handleClose,
  roleList,
}) => {
  const [fullNameNew, setFullName] = useState(fullName)
  const [maisonNew, setMaison] = useState(maison_id)
  const [emailNew, setEmail] = useState(email)
  const [roleNew, setRole] = useState(userRoleId)

  const handleUpdate = () => {
    console.log({
      fullNameNew,
      maisonNew,
      emailNew,
      roleNew,
    })
    const res = client.query({
      query: gql`
        mutation update_users($id: uuid, $updateUser: users_set_input!) {
          update_users(_set: $updateUser, where: { id: { _eq: $id } }) {
            returning {
              id
            }
          }
        }
      `,
      variables: {
        id,
        updateUser: {
          email: emailNew,
          fullName: fullNameNew,
          maison_id: maisonNew,
          userRoleId: roleNew,
        },
      },
    })
    handleClose()
  }

  return (
    <Container>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Full Name"
        type="email"
        fullWidth
        variant="standard"
        defaultValue={fullName}
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
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Maison</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          defaultValue={maison_id}
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
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={(e) => {
            setRole(e.target.value)
          }}
          defaultValue={userRoleId}
        >
          {roleList &&
            roleList?.map((role, index) => (
              <MenuItem key={index} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Button onClick={handleUpdate}>UPDATE</Button>
      <Button onClick={handleClose}>CANCEL</Button>
    </Container>
  )
}

export default RowUpdate
