import { AdminLoginURL, ForgotPasswordURL, ResetPasswordURL } from "../Constants/AdminConfig";
import {
  AdminLoginMetadataExpiry,
  AdminLoginMetadataKey,
} from "../Constants/AdminStorageConstants";
import { BaseResponse } from "../Models/BaseResponse";
import { LoginMetadata } from "../Models/LoginMetadata";
import { APICallerPost } from "../../Services/BaseService";
import { StorageService } from "../../Services/StorageService";

export default class LoginService {
  public static async authenticate(email: string, password: string) {
    const body = {
      email: email,
      password: password,
    };
    const result = await APICallerPost<LoginMetadata, any>(
      AdminLoginURL,
      body,
      new LoginMetadata("-1"),
      AdminLoginMetadataKey,
      false,
      AdminLoginMetadataExpiry,
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
