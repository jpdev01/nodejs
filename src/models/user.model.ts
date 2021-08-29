import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    }
});

// 1 param = nome da coleção,
// 2 param = propriedade criada
export default model('Usuario', UserSchema);