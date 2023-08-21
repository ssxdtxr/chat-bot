import s from "./Chat.module.scss"
import {IMessage, Message} from "../Message/Message.tsx";
import {FC, useEffect, useRef} from "react";
import {Loading} from "../UI/Loading/Loading.tsx";

interface IChat {
    messagesList: IMessage[]
    isLoading?: boolean
}

export const Chat: FC<IChat> = ({messagesList, isLoading}) => {
    const messageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageContainerRef.current) {
            const container = messageContainerRef.current;
            container.scrollTop = container.scrollHeight;
        }
    }, [messagesList]);

    return (
        <>
            <div className={s.main} ref={messageContainerRef}>
                {messagesList.map((message, index) =>
                    <Message key={index} message={message.message} owner={message.owner}/>
                )}
                {isLoading && <Loading/>}
            </div>
        </>
    );
};

