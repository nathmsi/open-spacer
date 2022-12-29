import { useState, useEffect } from "react";
import DayOffEmployee from "../../HomePage/DayOffEmployee";
import styles from "./index.module.scss";

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

const ModalOff = ({ daySelected, countUnassigned }) => {
  const [open, setOpen] = useState(false);
  const [offEmployee, setOffEmployee] = useState([]);


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
          const offEmployeeRes = employes.filter(
            (el) => assignedEmployee[el.id]?.off
          );
          setOffEmployee(offEmployeeRes);
        }
      });
    }
  }, [daySelected]);

  const handleRemoveRemoteEmployee = async (employee) => {
    await remove(ref(db, `week/${daySelected}/employees/${employee.id}`));
  };

  return (
    <div>
       <Button  variant="outlined" onClick={handleClickOpen} startIcon={<EditIcon />}>Off ({offEmployee?.length})</Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
            top: '50vh'
        }}
      >
        <List>
        <div>
      <div className={styles.title}>Off Employee ({offEmployee?.length})</div>
      <div className={styles.container}>
        {offEmployee?.map(({ name, id }) => (
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
                  id : {id}
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

export default ModalOff;
