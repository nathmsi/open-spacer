import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { deepOrange, deepPurple } from "@mui/material/colors";

import styles from "./index.module.scss";

import AddPlace from "./addPlace";

import { db } from "../../../utils/firebase";

import { stringAvatar } from "../../../utils/colors";


const ListEmploye = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    onValue(ref(db, `places`), (snapshot) => {
      const data = snapshot.val();
      const places =
        data &&
        Object.keys(data).map((key) => ({
          ...data[key],
        }));
      setPlaces(places);
    });
  }, []);

  return (
    <div>
      <div className={styles.container}>
        {places?.map(({ numberPlace }) => (
          <ListItem alignItems="flex-start" key={numberPlace}>
            <ListItemAvatar>
              <Avatar {...stringAvatar(numberPlace)} />
            </ListItemAvatar>
          </ListItem>
        ))}
      </div>
      <AddPlace />
    </div>
  );
};

export default ListEmploye;
