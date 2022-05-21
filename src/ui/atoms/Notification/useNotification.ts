import { useState } from "react";

const useNotification = () => {
    const [message, setMessage] = useState<Error | null>(null);

    const onOpen = setMessage;
    const onClose = () => {
        setMessage(null);
    };

    return {
        message,
        onOpen,
        onClose
    };
};

export default useNotification;
