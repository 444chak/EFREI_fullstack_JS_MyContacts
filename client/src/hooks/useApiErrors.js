import { useCallback, useState } from "react";

export default function useApiErrors() {
    const [formError, setFormError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});

    const resetErrors = useCallback(() => {
        setFormError("");
        setFieldErrors({});
    }, []);

    const setFromError = useCallback((error, fallbackMessage = "An unexpected error occurred") => {
        const status = error?.response?.status;
        const data = error?.response?.data;

        const message = data?.message || error?.message || fallbackMessage;
        const details = Array.isArray(data?.details) ? data.details : [];

        const nextFieldErrors = {};
        for (const item of details) {
            const fieldName = String(item?.field || "").trim();
            const fieldMessage = String(item?.message || "").trim();
            if (fieldName && fieldMessage) { nextFieldErrors[fieldName] = fieldMessage; }
        }

        setFieldErrors(nextFieldErrors);

        if (Object.keys(nextFieldErrors).length > 0) {
            setFormError(message || "Please fix the highlighted fields");
        } else {
            if (status >= 500) { setFormError("Server error. Please try again later."); }
            else { setFormError(message); }
        }
    }, []);

    const getFieldError = useCallback((fieldName) => {
        return fieldErrors[fieldName] || "";
    }, [fieldErrors]);

    return { formError, fieldErrors, setFromError, resetErrors, getFieldError, setFormError, setFieldErrors };
}


