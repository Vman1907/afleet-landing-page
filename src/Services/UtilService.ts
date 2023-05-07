import { ForgotPasswordURL, ResetPasswordURL } from "../Admin/Constants/AdminConfig";
import { AdminLoginMetadataKey, AdminLoginMetadataExpiry } from "../Admin/Constants/AdminStorageConstants";
import { LoginMetadata } from "../Admin/Models/LoginMetadata";
import { APICallerPost } from "./BaseService";




export default class UtilService{

public static async resetPassword(email: string, route: string) {
    const body = {
      email: email,
      role: route,
    };
    const result = await APICallerPost<LoginMetadata, any>(
      ResetPasswordURL,
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


  public static async ChangePassword(password: string, token: string) {
    const body = {
      password: password,
    };
    const result = await APICallerPost<LoginMetadata, any>(
      ForgotPasswordURL,
      body,
      new LoginMetadata(token),
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