import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ref, onValue } from "firebase/database";
import DeleteIcon from '@mui/icons-material/Delete';

import IconButton from '@mui/material/IconButton';


import AddEmploye from './addEmploye';


import styles from "./index.module.scss";

import { db, deleteEmployee } from "../../../utils/firebase";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: name?.split(" ")[1]
      ? `${name?.split(" ")[0][0]}${name?.split(" ")[1][0]}`
      : name[0],
  };
}

const ListEmploye = () => {
  const [employes, setEmployes] = useState([]);

  useEffect(() => {
    onValue(ref(db, `employees`), (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      const employes = Object.keys(data).map((key) => ({
        ...data[key],
      }));
      setEmployes(employes);
    });
  }, []);

  const handleDelete = async ({ id }) => {
    await deleteEmployee({ id });
  }

  return (
    <div>
      <div className={styles.container}>
        {employes.map(({ name, id }) => (
          <ListItem alignItems="flex-start" key={id} 
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete({ id })}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemAvatar >
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
      <AddEmploye />
    </div>
  );
};

export default ListEmploye;
