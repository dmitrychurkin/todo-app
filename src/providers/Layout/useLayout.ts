import { layoutStorageKey } from "config/persistence";
import { LayoutToken } from "config/ui";
import { getStorage, setItem } from "infrastructure/Persistence";
import { useCallback, useContext, useEffect } from "react";
import { LayoutContext } from "./Layout";

const useLayout = () => {
    const [layout, setLayout] = useContext(LayoutContext);

    const gridTemplateColumns = useCallback(() =>
        layout === LayoutToken.Grid
            ? 'repeat(2, auto)'
            : 'initial', [layout]);

    useEffect(() => {
        setItem(
            getStorage(),
            layoutStorageKey,
            layout
        );
    }, [layout]);

    return {
        layout,
        toggleLayout: () => setLayout(layout => ({
            [LayoutToken.Grid]: LayoutToken.List,
            [LayoutToken.List]: LayoutToken.Grid
        })[layout]),
        gridTemplateColumns
    };
};

export default useLayout;
