import { APICallerGet, APICallerPost } from "../../Services/BaseService";
import { GetAdminDashboardCountUrl } from "../Constants/AdminConfig";
import { LoginMetadata } from "../Models/LoginMetadata";

export default class DashboardService {
  public static async GetDashboardCount(loginMetadata: LoginMetadata){
    const body = {
      };
      const result = await APICallerGet<any, any>(
        GetAdminDashboardCountUrl,
        body,
        loginMetadata,
        "",
        false,
        0,
        false,
        "Dashboard/DashboardCount"
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
