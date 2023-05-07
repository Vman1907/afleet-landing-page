import {
  CreatAdminURL,
  DeleteAdminURL,
  GetAdminDetailsURL,
  UpdateAdminURL,
} from "../Constants/AdminConfig";
import AdminDetails from "../Models/AdminDetails";
import { LoginMetadata } from "../Models/LoginMetadata";
import { APICallerDel, APICallerGet, APICallerPost, PostFormData } from "../../Services/BaseService";
import AdminListResponse from "../Models/AdminListResponse";

export default class AdminManagementService {
  public static async CreateAdmin(
    adminDetail: any,
    loginMetadata: LoginMetadata,
  ) {
    delete adminDetail.id;
    const body = {
      admin:adminDetail
    }
    const result = await APICallerPost<any, any>(
      CreatAdminURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      false,
      "admin"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async UpdateAdmin(
    admin: AdminDetails,
    loginMetadata: LoginMetadata
  ) {
    const body = {
      admin: admin,
    };
    const result = await APICallerPost<any, any>(
      UpdateAdminURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
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
  public static async GetAdminList(loginMetadata: LoginMetadata, forceRefresh: boolean) {
    const body = {};
    const result = await APICallerGet<AdminListResponse, any>(
      GetAdminDetailsURL,
      body,
      loginMetadata,
      "",
      !forceRefresh,
      0,
      true,
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
  public static async DeleteAdmin(
    loginMetadata: LoginMetadata,
    adminId: number
  ) {
    const body = {
      admin: {
        id: adminId
      }
    };
    const result = await APICallerDel<any, any>(
      DeleteAdminURL,
      body,
      loginMetadata,
      "Admin/DeleteAdmin"
    )
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => {
        throw error;
      });
    return result;
  }
}
