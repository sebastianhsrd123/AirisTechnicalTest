export interface UserMetadata {
    user: {
        id: number;
        name: string;
        email: string;
        password?: string;
    }
    token: string;
}