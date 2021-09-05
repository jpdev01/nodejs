import { UserInterface, UserMessage } from './../interfaces/user.interface';
import { MessageInterface } from './../interfaces/message.interface';
class MessageService {

    public getMessageDataByUser(messages: MessageInterface[], user: UserInterface): UserMessage {
        return {
            _id: user._id,
            name: user.name,
            avatar: user.avatar,
            lastMessage: messages[0] ? messages[0].text : null,
            lastMessageDate: messages[0] ? messages[0].createdAt : null
        }
    }
    
}

export default new MessageService();