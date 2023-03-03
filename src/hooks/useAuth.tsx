import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";
import { AuthServices } from "../config/api";
import { Cookie } from "../utils/cookie";

interface IState {
  access: string;
  refresh: string;
}

interface IMethods {
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => void;
}

interface IAuthState {
  state: IState;
  methods: IMethods;
}

const INITIAL_STATE: IState = { access: "", refresh: "" };

const AuthContext = createContext({} as IAuthState);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouter();

  const [state, setState] = useState<IState>(INITIAL_STATE);

  const logIn = async (email: string, password: string) => {
    try {
      const { access, refresh } = await authService.login(email, password);
      cookie.set({ access: access, refresh: refresh });
      setState({ access, refresh });
      push("/app");
    } catch (e) {
      throw new Error("login error", { cause: e });
    }
  };

  const logOut = () => {
    setState(INITIAL_STATE);
    cookie.delete();
    push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        state: state,
        methods: { logIn, logOut },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

const cookie = new Cookie("@refresh-token-app");
const authService = new AuthServices();
