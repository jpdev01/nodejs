import { UserInterface } from './../interfaces/user.interface';
import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface UserModel extends UserInterface, Document {

}

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

//antes de executar uma ação, faça isso
UserSchema.pre<UserModel>('save', async function criptografarSenha(){
    //await = esperar
    this.password = await bcrypt.hash(this.password, 8); // quanto maior o numero, mais seguro!
});

// 1 param = nome da coleção,
// 2 param = propriedade criada
export default model<UserModel>('Usuario', UserSchema);