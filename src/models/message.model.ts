import { MessageInterface } from './../interfaces/message.interface';
import { Model, model, Schema, DocumentQuery } from 'mongoose';

interface MessageModel extends MessageInterface, Document {

}

interface MessageStatic extends Model<MessageModel> {
    findChat(currentUserId: string, receiverUserId: string): DocumentQuery<MessageModel[], MessageModel>;
}
const MessageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    sender: {
        //Schema.Types.ObjectId identificador unico para o id, chave estrangeira
        type: Schema.Types.ObjectId,
        // qual é a collection? usuario, logo seu id
        ref: 'Usuario',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

MessageSchema.statics.findChat = function (currentUserId: string, receiverUserId: string): DocumentQuery<MessageModel[], MessageModel> {
    return this.find({
        $or: [
            { $and: [{ sender: currentUserId }, { receiver: receiverUserId }] },
            { $and: [{ sender: receiverUserId }, { receiver: currentUserId }] }
        ]
    });
}

// 1 param = nome da coleção,
// 2 param = propriedade criada
export default model<MessageModel, MessageStatic>('Mensagem', MessageSchema);

//obs: o id da collection ja é criado automaticamente