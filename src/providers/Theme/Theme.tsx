import { FC, PropsWithChildren, useEffect } from 'react';

import { createContext, useCallback, useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { createTheme } from '@mui/material/styles';

import { ThemingToken } from "config/ui";
import { getItem, getStorage, setItem } from 'infrastructure/Persistence';
import { themeStorageKey } from 'config/persistence';


export const ThemeContext = createContext<() => void>(() => null);

type Props = PropsWithChildren<{}>;

const Theme: FC<Props> = ({ children }) => {
    const [mode, setMode] = useState<ThemingToken>(() =>
        getItem(
            getStorage(),
            themeStorageKey
        ) ?? ThemingToken.Light
    );


    const toggleTheme = useCallback(() => {
        setMode(prevMode => ({
            [ThemingToken.Light]: ThemingToken.Dark,
            [ThemingToken.Dark]: ThemingToken.Light
        })[prevMode]);
    }, []);

    const theme = useMemo(() => createTheme({
        palette: {
            mode
        }
    }), [mode]);

    useEffect(() => {
        setItem(
            getStorage(),
            themeStorageKey,
            mode
        );
    }, [mode]);

    return (
        <ThemeContext.Provider value={toggleTheme}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default Theme;
