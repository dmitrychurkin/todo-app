import { useContext } from "react";
import { SessionContext } from "./Session";

const useSession = () => useContext(SessionContext);

export default useSession;
