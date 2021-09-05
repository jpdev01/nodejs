import { UserInterface, UserMessage } from './../interfaces/user.interface';
import { MessageInterface } from './../interfaces/message.interface';
class MessageService {

    public getMessageDataByUser(messages: MessageInterface[], user: UserInterface): UserMessage {
        return {
            _id: user._id,
            name: user.name,
            avatar: user.avatar,
            lastMessage: messages[0]?.text || null,
            lastMessageDate: messages[0]?.createdAt || null
        }
    }

    public getOrderedMessages(messages: UserMessage[]): UserMessage[]{
        return messages.sort((a, b) => {
            //itera os dados do array
            // se a mensagem tem data
            return (a.lastMessageDate ? 0 : 1) - (b.lastMessageDate ? 0 : 1)
                // compara as datas
                || -(a.lastMessageDate > b.lastMessageDate)
                || +(a.lastMessageDate > b.lastMessageDate)
        })
    }

}

export default new MessageService();