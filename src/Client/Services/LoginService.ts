import { clientLoginURL } from "../Constants/ClientConfig";
import { clientLoginMetadataExpiry, clientLoginMetadataKey } from "../Constants/ClientStorageConstants";
import { LoginMetadata } from "../Models/LoginMetadata";
import { APICallerPost } from "./BaseService";

export default class LoginService{
    public static async authenticate(email: string, password: string)
    {
        const body = { 
            "email": email,
            "password": password
        };
    const result = await APICallerPost<LoginMetadata, any>(
      clientLoginURL,
      body,
      new LoginMetadata("-1"),
      clientLoginMetadataKey,
      false,
      clientLoginMetadataExpiry,
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