import { UserInterface } from './interfaces/user.interface';
// d significa declare, declarar um tipo

declare global {
    namespace Express{
        interface Request {
            // adicionar user nas requests
            user?: UserInterface
            userChat?: UserInterface
        }
    }
}