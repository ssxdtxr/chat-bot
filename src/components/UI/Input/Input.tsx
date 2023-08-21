import {FC} from "react";
import s from "./Input.module.scss"

interface IInput {
    value: string
    setValue: (value: string) => void
    placeholder: string
}



const Input: FC<IInput> = ({ placeholder, setValue, value}) => {
    return (
            <input
                className={s.input}
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
            />
    );
};

export default Input;