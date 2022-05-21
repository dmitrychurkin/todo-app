import { useMemo } from "react";
import { object, string } from "yup";

const useFormValidation = () =>
    useMemo(() =>
        object().shape({
            title: string()
                .min(3, 'Task title too short!')
                .max(50, 'Task title too long!')
                .required('Task title is required'),
            description: string()
                .min(3, 'Task description too short!')
                .max(100, 'Task description too long!')
                .required('Task description is required')
        }), []);

export default useFormValidation;
