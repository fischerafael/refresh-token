import { createContext, useContext } from "react";

interface IState {
  access: string;
  refresh: string;
}

interface IAuthState {
  state: IState;
}

const AuthContext = createContext({} as IAuthState);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const tokens = {
    access: "test",
    refresh: "test",
  };

  console.log(tokens);

  return (
    <AuthContext.Provider
      value={{
        state: tokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
