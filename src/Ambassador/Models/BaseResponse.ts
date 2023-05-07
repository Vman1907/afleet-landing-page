import { LoginMetadata } from "./AmbassadorLoginMetadata";

export class BaseResponse extends LoginMetadata {
  public statusCode: number = 0;
  public status: boolean = false;
}
