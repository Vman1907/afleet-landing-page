import {
  CreateClientURL,
  DeleteClientURL,
  GetClientDetailsURL,
  LoginAsClientURL,
  UpdateClientURL,
} from "../Constants/AdminConfig";
import { LoginMetadata } from "../Models/LoginMetadata";
import {
  APICallerDel,
  APICallerGet,
  APICallerPost,
  APICallerPut,
} from "../../Services/BaseService";
import ClientDetails from "../Models/ClientDetails";
import ClientListResponse from "../Models/ClientListResponse";

export default class ClientManagementService {
  public static async CreateClient(
    clientDetail: any,
    loginMetadata: LoginMetadata,
  ) {
    delete clientDetail.id;
    const body = {
      client: clientDetail
    }
    const result = await APICallerPost<any, any>(
      CreateClientURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      false,
      "cleint/createClient"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async UpdateClient(
    client: ClientDetails,
    loginMetadata: LoginMetadata
  ) {
    const body = {
      client: client,
    };
    const result = await APICallerPut<any, any>(
      UpdateClientURL,
      body,
      loginMetadata,
      "Admin/CreateAdmin"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async GetClientList(
    loginMetadata: LoginMetadata,
    forceRefresh: boolean
  ) {
    const body = {};
    const result = await APICallerGet<ClientListResponse, any>(
      GetClientDetailsURL,
      body,
      loginMetadata,
      "",
      !forceRefresh,
      0,
      true,
      "Admin/getClientDetails"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async DeleteClient(
    loginMetadata: LoginMetadata,
    clientId: number
  ) {
    const body = {
      ClientId: clientId
    };
    const result = await APICallerDel<any, any>(
      DeleteClientURL,
      body,
      loginMetadata,
      "Admin/DeleteClient"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async ClientLogin(
    loginMetadata: LoginMetadata,
    clientEmail: string
  ) {
    const body = {
      email: clientEmail,
    };
    const result = await APICallerPost<any, any>(
      LoginAsClientURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Admin/CreateClient"
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
