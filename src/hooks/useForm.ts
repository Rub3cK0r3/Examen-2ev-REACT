import { useState, type ChangeEvent } from "react";

export const useForm = <T extends object>(initialForm: T) => {
    const [form, setForm] = useState(initialForm);

    const onInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const onResetForm = (): void => {
        setForm(initialForm)
    }
    return {
        ...form,
        form,
        onInputChange,
        onResetForm,
    }
}
