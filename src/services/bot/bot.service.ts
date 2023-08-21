import {http} from "../../config/http.ts";

export const BotService = {
    async postBot(params: {message: string}) {
        return await http.post<string>('/send-message', params)
    },
}