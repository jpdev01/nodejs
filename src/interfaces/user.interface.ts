
export interface UserInterface {
    _id: any | string;
    name?: string;
    password?: string;
    avatar?: string;
    
}

export interface UserMessage extends UserInterface{
    lastMessage: string;
    lastMessageDate: Date;
}