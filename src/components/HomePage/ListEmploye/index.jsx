import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ref, onValue } from "firebase/database";
import DeleteIcon from "@mui/icons-material/Delete";

import IconButton from "@mui/material/IconButton";

import AddEmploye from "./addEmploye";

import styles from "./index.module.scss";

import { db, deleteEmployee } from "../../../utils/firebase";
import { stringAvatar } from "../../../utils/colors";


const ListEmploye = () => {
  const [employes, setEmployes] = useState([]);

  useEffect(() => {
    onValue(ref(db, `employees`), (snapshot) => {
      const data = snapshot.val();
      const employes = data && Object.keys(data).map((key) => ({
        ...data[key],
      }));
      setEmployes(employes);
    });
  }, []);

  const handleDelete = async ({ id }) => {
    await deleteEmployee({ id });
  };

  return (
    <div>
      <div className={styles.container}>
        {employes?.map(({ name, id }) => (
          <ListItem
            alignItems="flex-start"
            key={id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete({ id })}
              >
                <DeleteIcon />
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
      <AddEmploye />
    </div>
  );
};

export default ListEmploye;
