import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
     const [userId, setUserId] = useState(null);

     const value = {
          userId,
          setUserId,
     };

     return (
          <UserContext.Provider value={value}>{children}</UserContext.Provider>
     );
};

const useUser = () => {
     const context = useContext(UserContext);
     if (!context) {
          throw new Error("useUser must be used within a UserProvider");
     }
     return context;
};

export { UserProvider, useUser };
