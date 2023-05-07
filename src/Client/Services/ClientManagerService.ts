import { AddManagerURL, updateManagerURL } from "../Constants/ClientConfig";
import { LoginMetadata } from "../Models/LoginMetadata";
import ManagerDetails from "../Models/ManagerDetails";
import { APICallerPost } from "./BaseService";

export default class ClientManagerService {
  public static async AddManager(manager: ManagerDetails, loginMetadata: LoginMetadata) {
    const body = {
      ...manager,
      client_name: loginMetadata.first_name + " " + loginMetadata.last_name,
      program_id: loginMetadata.program_id
    }
    const result = await APICallerPost<any, any>(
      AddManagerURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      false,
      "client/addManager"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async updateManager(manager: ManagerDetails, loginMetadata: LoginMetadata) {
    const body = {
      manager: manager,
      managerId: manager.id,
    }
    const result = await APICallerPost<any, any>(
      updateManagerURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      false,
      "client/updateManager"
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
