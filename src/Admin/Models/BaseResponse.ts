import { LoginMetadata } from "./LoginMetadata";

export class BaseResponse extends LoginMetadata {
  public statusCode: number = 0;
  public status: boolean = false;
}
