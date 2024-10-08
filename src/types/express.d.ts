import { Request } from 'express';

declare module 'express' {
    export interface Request {
        user?: {
            email: string;
            role: string;
            staffId: string;
        }
    }
}