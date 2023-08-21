import s from "./Message.module.scss"
import {FC} from "react";
import robot from "@/assets/img/robot.svg"
import {motion} from "framer-motion"

export interface IMessage {
    message: string
    owner: 'bot' | 'user'
}

export const Message: FC<IMessage> = ({message, owner}) => {
    const lettersFromMessage = message.split('')
    return (
        <div className={s[owner]}>
            {
                owner === 'user'
                    ?
                    <span className={s.avatar}>T</span>
                    :
                    <img width={40} height={40} src={robot} alt=""/>

            }
            <p className={s.text}>
                {
                    lettersFromMessage.map((letter, index) =>
                        <motion.span
                            key={index}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: index * 0.01}}
                        >
                            {letter}
                        </motion.span>
                    )
                }
            </p>
        </div>
    );
};

