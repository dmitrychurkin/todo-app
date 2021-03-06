import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { FC, PropsWithChildren } from 'react';

import type { User } from "firebase/auth";

export const SessionContext = createContext<User | void | null>(undefined);

type Props = PropsWithChildren<{}>;

const Session: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | void | null>(undefined);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => setUser(user));
  }, []);

  return (
    <SessionContext.Provider value={user}>{children}</SessionContext.Provider>
  );
};

export default Session;
