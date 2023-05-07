import internal from "stream";
import { APICallerDel, APICallerGet } from "../../Services/BaseService";
import { GetAllPackageDetails, GetAllPaymentDetail } from "../Constants/ClientConfig";
import ClientRewardClaimsResponse from "../Models/ClientRewardClaimsResponse";
import ClientRewardsResponse from "../Models/ClientRewardsResponse";
import ClientRecruitmentFormDetailsResponse from "../Models/ClientRecruitmentFormDetailsResponse";
import { LoginMetadata } from "../Models/LoginMetadata";
import { APICallerPost } from "./BaseService";

export default class ClientAccountSettingService {
    public static async getPaymentDetail(loginMetadata: LoginMetadata) {
        const body = {
          programId: loginMetadata.program_id
        };
        const result = await APICallerPost<any, any>(
          GetAllPaymentDetail,
          body,
          loginMetadata,
          "",
          false,
          0,
          false,
          "client/AccountSetting"
        )
          .then((response) => {
            return response;
          })
          .catch((error) => {
            throw error;
          });
          console.log(result);
        return result;
      }

      public static async getPackagetDetail(loginMetadata: LoginMetadata) {
        const body = {
          packageId : loginMetadata.package_id
        };
        const result = await APICallerPost<any, any>(
          GetAllPackageDetails,
          body,
          loginMetadata,
          "",
          false,
          0,
          false,
          "client/AccountSetting"
        )
          .then((response) => {
            return response;
          })
          .catch((error) => {
            throw error;
          });
          console.log(result);
        return result;
      }
}