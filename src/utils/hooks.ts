import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

export function useAuth() {
  const authContext = useContext(AuthContext);
  if( authContext === undefined ){
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return authContext;
}
