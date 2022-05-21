import type { SwitchProps } from '@mui/material/Switch';

import { memo } from "react";

import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import { useTheme as useMaterialTheme } from '@mui/material/styles';
import useTheme from "providers/Theme/useTheme";
import { LayoutToken, ThemingToken } from "config/ui";
import { useLayout } from "providers/Layout";

const SettingsBar = () => {
    const theme = useMaterialTheme();
    const toggleTheme = useTheme();

    const { layout, toggleLayout } = useLayout();

    return (
        <>
            {[
                {
                    title: 'Theme',
                    name: 'theme',
                    checked: theme.palette.mode === ThemingToken.Dark,
                    onChange: toggleTheme
                },
                {
                    title: 'Layout',
                    name: 'layout',
                    checked: layout === LayoutToken.Grid,
                    onChange: toggleLayout,
                    color: 'warning'
                }
            ].map(({ title, ...switchProps }) => (
                <Tooltip key={title} title={title}>
                    <Switch
                        {...switchProps as SwitchProps}
                    />
                </Tooltip>
            ))}
        </>
    );
};

export default memo(SettingsBar);
