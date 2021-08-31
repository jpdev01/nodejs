import { MessageInterface } from './../interfaces/message.interface';
import { model, Schema } from 'mongoose';

interface MessageModel extends MessageInterface, Document {

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

// 1 param = nome da coleção,
// 2 param = propriedade criada
export default model<MessageModel>('Mensagem', MessageSchema);

//obs: o id da collection ja é criado automaticamente