import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { InputLabel } from '@mui/material'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}
export const MaisonsList = [
  {
    name: 'Dior',
    created_at: '2022-12-31T18:28:27.862449+00:00',
    updated_at: '2022-12-31T18:28:27.862449+00:00',
    id: '1e821e43-53b0-42f6-b414-076e8cc1ec5d',
  },
  {
    name: 'Eden Gallery',
    created_at: '2022-12-31T19:09:56.997063+00:00',
    updated_at: '2022-12-31T19:09:56.997063+00:00',
    id: '9968d977-dc1d-493a-a169-d5523245c2c3',
  },
  {
    name: 'VCA/C',
    created_at: '2022-12-31T18:28:31.868651+00:00',
    updated_at: '2022-12-31T19:18:33.469814+00:00',
    id: '8a3c69c4-a0c6-4ac0-a68f-51092528a147',
  },
]

const MaisonSelector = ({ handleChangMaison }) => {
  const [maisons, setMaisons] = React.useState([MaisonsList[0]?.name])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setMaisons(value)
    handleChangMaison(
      value.map((name) => MaisonsList?.find((el) => el.name === name))
    )
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 150, padding: 0 }}>
        <InputLabel id="demo-multiple-checkbox-label">Select Maison</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          defaultValue={'All'}
          value={maisons}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => {
            return selected?.join(',')
          }}
          size="small"
          MenuProps={MenuProps}
        >
          {MaisonsList.map(({ name }) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={maisons?.some((el) => el === name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default MaisonSelector
