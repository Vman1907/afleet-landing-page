import { AmbassadorLoginURL } from "../Constants/AmbassadorConfig";
import {
  AmbassadorLoginMetadataExpiry,
  AmbassadorLoginMetadataKey,
} from "../Constants/AmbassadorStorageConstants";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import { APICallerPost } from "../../Services/BaseService";

export default class LoginService {
  public static async authenticate(email: string, password: string) {
    const body = {
      email: email,
      password: password,
    };
    const result = await APICallerPost<LoginMetadata, any>(
      AmbassadorLoginURL,
      body,
      new LoginMetadata("-1"),
      AmbassadorLoginMetadataKey,
      false,
      AmbassadorLoginMetadataExpiry,
      false,
      "Login/VerifyOTP"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
}
