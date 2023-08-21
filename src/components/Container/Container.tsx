import {FC, ReactNode} from "react";
import s from "./Container.module.scss"

interface IContainer {
    children: ReactNode
}

export const Container: FC<IContainer> = ({children}) => {
    return (
        <div className={s.container}>
            {children}
        </div>
    );
};

