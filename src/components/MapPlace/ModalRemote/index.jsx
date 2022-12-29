import { useState, useEffect } from "react";
import RemoteEmployee from "../../HomePage/RemoteEmployee";
import styles from './index.module.scss'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import EditIcon from '@mui/icons-material/Edit';
import { get, onValue, ref, remove } from "firebase/database";
import { db } from "../../../utils/firebase";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "../../../utils/colors";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const ModalRemote = ({ daySelected, countUnassigned }) => {
  const [open, setOpen] = useState(false);
  const [remoteEmployee, setRemoteEmployee] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  useEffect(() => {
    if (daySelected) {
      onValue(ref(db, `week/${daySelected}`), async (snapshot) => {
        const data = snapshot.val();
        const employesSnapshot = await get(ref(db, `employees`));
        const employesGlobal = employesSnapshot.val();
        if (employesGlobal) {
          const employes =
            employesGlobal &&
            Object.keys(employesGlobal).map((key) => ({
              ...employesGlobal[key],
            }));
          const assignedEmployee = data?.employees || [];
          const remoteEmployee = employes.filter(
            (el) => assignedEmployee[el.id]?.remote
          );
          setRemoteEmployee(remoteEmployee);
        }
      });
    }
  }, [daySelected]);

  const handleRemoveRemoteEmployee = async (employee) => {
    await remove(ref(db, `week/${daySelected}/employees/${employee.id}`));
  };

  return (
    <div>
      <Button onClick={handleClickOpen} variant="outlined" startIcon={<EditIcon />}>Remote ({remoteEmployee?.length})</Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
            top: '50vh'
        }}
      >
        {/* <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Unassigned Employee ({countUnassigned})
            </Typography>
          </Toolbar>
        </AppBar> */}
        <List>
        <div>
      <div className={styles.title}>Remote Employee ({remoteEmployee?.length})</div>
      <div className={styles.container}>
        {remoteEmployee?.map(({ name, id }) => (
          <ListItem
            alignItems="flex-start"
            key={id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveRemoteEmployee({ name, id })}
              >
                <RemoveCircleOutlineOutlinedIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar {...stringAvatar(name)} />
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {/* id : {id} */}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </div>
    </div>
        </List>
      </Dialog>
    </div>
  );
};

export default ModalRemote;
