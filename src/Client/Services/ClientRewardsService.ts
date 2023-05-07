import { APICallerDel, APICallerGet } from "../../Services/BaseService";
import { AcceptOrRRejectRewardURL, CreateRewardURL, DeleteRewardURL, GetClaimRewardsDetailsURL, GetRewardsDetailsURL, setRewardEnableURL, UpdateRewardURL } from "../Constants/ClientConfig";
import ClientRewardClaimsResponse from "../Models/ClientRewardClaimsResponse";
import ClientRewardsResponse from "../Models/ClientRewardsResponse";
import { LoginMetadata } from "../Models/LoginMetadata";
import { APICallerPost } from "./BaseService";

export default class ClientRewardsService {
  public static async GetRewardsList(loginMetadata: LoginMetadata, forceRefresh: boolean) {
    const body = {
      program_id: loginMetadata.program_id
    };
    const result = await APICallerPost<ClientRewardsResponse, any>(
      GetRewardsDetailsURL,
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
    console.log(result);
    return result;
  }
  public static async CreateReward(
    reward: any,
    loginMetadata: LoginMetadata,
  ) {
    delete reward.id;
    reward.status = true;
    reward.program_id = loginMetadata.program_id;
    const body = {
      reward: reward
    }
    const result = await APICallerPost<any, any>(
      CreateRewardURL,
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
  public static async UpdateReward(
    reward: any,
    loginMetadata: LoginMetadata
  ) {
    const body = {
      reward: reward,
    };
    const result = await APICallerPost<any, any>(
      UpdateRewardURL,
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
  public static async DeleteReward(
    loginMetadata: LoginMetadata,
    rewardId: number
  ) {
    const body = {
      reward: {
        id: rewardId
      }
    };
    const result = await APICallerDel<any, any>(
      DeleteRewardURL,
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
  public static async GetClaimRewardsList(loginMetadata: LoginMetadata, forceRefresh: boolean) {
    const body = {
      program_id: loginMetadata.program_id
    };
    const result = await APICallerPost<ClientRewardClaimsResponse, any>(
      GetClaimRewardsDetailsURL,
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
    console.log(result);
    return result;
  }
  public static async AcceptOrRejectReward(
    id: number,
    status: number,
    loginMetadata: LoginMetadata
  ) {
    const body = {
      loginMetadata: loginMetadata,
      reward: {
        id: id,
        status: status
      },
    };
    const result = await APICallerPost<any, any>(
      AcceptOrRRejectRewardURL,
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
  public static async setRewardEnable(
    status: boolean,
    loginMetadata: LoginMetadata
  ) {
    const body = {
      program_id: loginMetadata.program_id,
      status: status
    };
    const result = await APICallerPost<any, any>(
      setRewardEnableURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Client/setRewardEnable"
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
