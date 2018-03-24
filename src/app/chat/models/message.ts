import { User } from './user';

export interface Message {
    from: User;
    content: string;
}

export interface ChatMessage extends Message {
    from: User;
    content: string;
}
