import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { deepOrange, deepPurple } from "@mui/material/colors";

import styles from "./index.module.scss";

import AddPlace from "./addPlace";

import { db } from "../../../utils/firebase";

import { stringAvatar } from "../../../utils/colors";

import MapPlace from '../../MapPlace';

const ListPlace = () => {
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

  const handleRemovePlace = async (place) => {
    await remove(ref(db, `places/${place}`));
  };

  return (
    <div>
      <MapPlace {...({ handleRemovePlaceEmployee: handleRemovePlace, places, assignedPlace: [], editMode: true })} />
      <AddPlace />
    </div>
  );
};

export default ListPlace;
