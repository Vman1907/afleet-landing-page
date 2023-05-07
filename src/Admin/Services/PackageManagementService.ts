import {
  CreatePackageURL,
  DeletePackageURL,
  GetPackageDetailsURL,
  UpdatePackageURL,
} from "../Constants/AdminConfig";
import PackageDetails from "../Models/PackageDetails";
import { LoginMetadata } from "../Models/LoginMetadata";
import { APICallerDel, APICallerGet, APICallerPost, APICallerPut } from "../../Services/BaseService";
import PackageListResponse from "../Models/PackageListResponse";

export default class PackageManagementService {
  public static async CreatePackage(
    packageDetail: PackageDetails,
    loginMetadata: LoginMetadata
  ) {
    const body = {
      package: packageDetail,
    };

    const result = await APICallerPost<any, any>(
      CreatePackageURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Admin/CreatePackage"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async UpdatePackage(
    packageDetail: PackageDetails,
    loginMetadata: LoginMetadata
  ) {
    const body = {
      package: packageDetail,
    };

    const result = await APICallerPut<any, any>(
      UpdatePackageURL,
      body,
      loginMetadata,
      ""
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async GetPackageList(loginMetadata: LoginMetadata, forceRefresh: boolean) {
    const body = {};
    const result = await APICallerGet<PackageListResponse, any>(
      GetPackageDetailsURL,
      body,
      loginMetadata,
      "",
      !forceRefresh,
      0,
      true,
      "Package/CreatePackage"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async DeletePackage(
    loginMetadata: LoginMetadata,
    planId: string
  ) {
    const body = {
      package: {
        plan_id: planId
      }
    };
    const result = await APICallerDel<any, any>(
      DeletePackageURL,
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
