import { LoginMetadata } from "./LoginMetadata";

export class BaseResponse {
    public token: string = "null";
    public status: boolean = false;
    public statusCode: number = 0;
}