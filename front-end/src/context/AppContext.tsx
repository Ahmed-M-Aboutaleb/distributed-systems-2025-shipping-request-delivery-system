"use client";
import { AppState, User } from "@/types/main";
import { createContext, useContext, useState } from "react";

const defaultState: AppState = {
  currentUser: {
    _id: "-1",
    name: "test",
    email: "test@test.com",
    companyName: "test company",
    phoneNumber: "1234567890",
    businessAddress: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "USA",
      apartment: "Apt 1A",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  setCurrentUser: () => {},
  accessToken: "",
  setAccessToken: () => {},
};

interface Props {
  children: React.ReactNode;
}

const AppContext = createContext<AppState>(defaultState);

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(
    defaultState.currentUser
  );
  const [accessToken, setAccessToken] = useState<string>(
    defaultState.accessToken
  );
  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
