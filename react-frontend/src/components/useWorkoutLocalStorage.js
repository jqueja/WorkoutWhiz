//import React from "react";
import { useState, useEffect } from "react";

function getSavedValue(key, initialValue) {
     const savedValue = JSON.parse(localStorage.getItem(key));

     if (savedValue) {
          return savedValue;
     } else {
          return initialValue;
     }
}
export default function useWorkoutLocalStorage(key, initialValue) {
     let [value, setValue] = useState(() => {
          return getSavedValue(key, initialValue);
     });

     useEffect(() => {
          const savedValue = JSON.parse(localStorage.getItem(key));

          if (savedValue) {
               console.log(savedValue.workoutName);
          } else {
               localStorage.setItem(key, JSON.stringify(value));
          }
     }, [value, key]);

     return [value, setValue];
}
