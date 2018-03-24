import { User } from './user';

export interface ChatMessage {
    from: User;
    content: string;
}
