import { layoutStorageKey } from 'config/persistence';
import { LayoutToken } from 'config/ui';
import { getItem, getStorage } from 'infrastructure/Persistence';
import { createContext, useState } from 'react';
import { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';

export const LayoutContext = createContext<
  [LayoutToken, Dispatch<SetStateAction<LayoutToken>>]
>([LayoutToken.List, () => undefined]);

type Props = PropsWithChildren<{}>;

const Layout: FC<Props> = ({ children }) => {
  const [layout, setLayout] = useState<LayoutToken>(
    () => getItem(getStorage(), layoutStorageKey) ?? LayoutToken.List
  );

  return (
    <LayoutContext.Provider value={[layout, setLayout]}>
      {children}
    </LayoutContext.Provider>
  );
};

export default Layout;
