import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, remove, update } from "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyA34Lo7QhlbVKB3OIcrE2PKoqesDAs4QYU",
  authDomain: "mahon-lev.firebaseapp.com",
  projectId: "mahon-lev",
  storageBucket: "mahon-lev.appspot.com",
  messagingSenderId: "634141257862",
  appId: "1:634141257862:web:e04cd100f9d59c2e166107",
  databaseURL: "https://mahon-lev-default-rtdb.firebaseio.com",
};
// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);




export const addEmployee = async (data) => {
  await set(ref(db, `employees/${data?.id}`), {
    ...data
  });
}

export const updateEmployee = async (data) => {
  await update(ref(db, `employees/${data.id}`), {
    ...data
  });
}

export const deleteEmployee = async (id) => {
  await remove(ref(db, `employees/${id}`));
}


export const addPlace = async (place) => {
  await set(ref(db, `places/${place.numberPlace}`), {
    ...place
  });
}


export const updatePlace = async (place) => {
  await update(ref(db, `places/${place.numberPlace}`), {
    ...place
  });
}

export const removePlace = async (numberPlace) => {
  await remove(ref(db, `places/${numberPlace}`));
}

