import {
  Actions,
  Container,
  ContainerMaisonSelector,
  ContentAction,
} from './Header.style'
import MaisonSelector from './MaisonSelector/MaisonSelector'
import UserNotAssigned from './UserNotAssigned/UserNotAssigned'
import AddNewUser from './AddNewUser/AddNewUser'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import useWindowSize from '../../../hooks/useWindowSize'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Tooltip from '@mui/material/Tooltip'
import { useState } from 'react'
import MoreIcon from '@mui/icons-material/MoreVert'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import moment from 'moment'
import { TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const Header = ({
  active,
  usersNotAssigned,
  handleSelectDay,
  handleChangMaison,
  handleCheckMeetingRoom,
  picklistMaison,
}) => {
  const [value, setValue] = useState(moment.now())

  const { width } = useWindowSize()
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleChange = (newValue) => {
    setValue(newValue)
    handleSelectDay(newValue)
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const mobileView = width < 1500

  return (
    <Container>
      <Actions>
        <Tooltip title="Open settings">
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleOpenUserMenu}
          >
            <MoreIcon sx={{ color: '#2196f3' }} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px', padding: '1rem' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <ContentAction>
            <UserNotAssigned usersNotAssigned={usersNotAssigned} />
            {handleChangMaison && <AddNewUser />}
            <FormControlLabel
              control={<Checkbox onChange={handleCheckMeetingRoom} />}
              label="Meeting Room"
            />
          </ContentAction>
        </Menu>
      </Actions>
      {/* <ButtonGroup sx={{ margin: '1rem 0', gap: '0.8rem' }}>
        {width > 1500
          ? day.map((item, index) => (
              <Button
                key={index}
                variant={
                  item.indexDay === active?.indexDay ? 'contained' : 'outlined'
                }
                onClick={() => handleSelectDay(item)}
                sx={{
                  padding: '0.7rem',
                  borderColor: '#ebebeb',
                  borderRadius: '0',
                }}
              >
                {item?.name}{' '}
              </Button>
            ))
          : day.map((item, index) => (
              <DayButton
                key={index}
                onClick={() => handleSelectDay(item)}
                active={item.indexDay === active?.indexDay}
              >
                {index + 1}
              </DayButton>
            ))}
      </ButtonGroup> */}
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      {handleChangMaison && (
        <ContainerMaisonSelector>
          <MaisonSelector
            handleChangMaison={handleChangMaison}
            picklistMaison={picklistMaison}
          />
        </ContainerMaisonSelector>
      )}
    </Container>
  )
}

export default Header
