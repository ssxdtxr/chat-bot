import s from "./ChatBot.module.scss"
import {Container} from "../../components/Container/Container.tsx";
import {Chat} from "../../components/Chat/Chat.tsx";
import {FormEvent, useState} from "react";
import {useMutation} from "react-query";
import {BotService} from "../../services/bot/bot.service.ts";
import Input from "../../components/UI/Input/Input.tsx";
import {IMessage} from "../../components/Message/Message.tsx";
import {IChunk} from "../../types/IChunk.ts";
import {AnimatePresence, motion} from "framer-motion";
import {ReactComponent as IconSend} from "../../assets/img/send.svg";


const buttonVariant = {
    initial: {opacity: 0},
    animate: {opacity: 1},
}
export const ChatBot = () => {
    const [messageValue, setMessageValue] = useState<string>('')
    const [messagesList, setMessagesList] = useState<IMessage[]>([{
        message: 'Hello! I’m BotHub, AI-based bot designed to answer all your questions.',
        owner: 'bot'
    }]);
    const {mutateAsync, isLoading} = useMutation(['bot'],
        () => BotService.postBot({message: messagesList[messagesList.length - 1].owner}), {
            onSuccess: async (data) => {
                const dataChunks = data.data.match(/\{.*?}/g);
                const wordPromises = dataChunks?.map(async (chunk: string) => {
                    const jsonObj: IChunk = JSON.parse(chunk);
                    if (jsonObj.value) {
                        return jsonObj.value;
                    }
                    return;
                });

                const resolvedWords = await Promise.all(wordPromises || []);
                const nonEmptyWords = resolvedWords.filter((word?: string) => word !== '');
                setMessagesList((prevMessage) => [...prevMessage, {message: nonEmptyWords.join(''), owner: 'bot'}])
            }
        })

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (messageValue) {
            setMessagesList([...messagesList, {message: messageValue, owner: 'user'}])
            setMessageValue('')
            mutateAsync()
        }
    }


    return (
        <div className={s.main}>
            <Container>
                <div className={s.title}>
                    <h1>Bot Chat</h1>
                    <p>AI-based service</p>
                </div>
                <Chat messagesList={messagesList} isLoading={isLoading}/>

                <form onSubmit={handleSubmit}>
                    <Input
                        value={messageValue}
                        setValue={setMessageValue}
                        placeholder="Start typing here..."
                    />
                    <AnimatePresence>
                        {
                            <motion.button
                                variants={buttonVariant}
                                initial='initial'
                                animate='animate'
                                exit='initial'
                                className={s.send}
                                whileTap={{scale: .8}}
                            >
                                <IconSend/>
                            </motion.button>
                        }
                    </AnimatePresence>
                </form>
            </Container>
        </div>
    );
};

