import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { InputLabel } from '@mui/material'
import { useRouter } from 'next/router'

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

const MaisonSelector = ({ handleChangMaison, picklistMaison }) => {
  const [maisons, setMaisons] = React.useState([])

  const router = useRouter()
  const query = router.query

  React.useEffect(() => {
    const maisonSlected = picklistMaison.find((el) => el.name === query?.maison)
    if (maisonSlected) {
      setMaisons([maisonSlected.name])
      handleChangMaison([maisonSlected])
    }
  }, [query?.maison, picklistMaison])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setMaisons(value)
    handleChangMaison(
      value.map((name) => picklistMaison?.find((el) => el.name === name))
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
          {picklistMaison?.map(({ name }) => (
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
