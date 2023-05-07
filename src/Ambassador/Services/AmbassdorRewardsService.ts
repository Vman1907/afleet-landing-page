import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import { APICallerGet, APICallerPost } from "../../Services/BaseService";
import AmbassdorRewardsResponse from "../Models/AmbassdorRewardsResponse";
import { GetRewardsListURL, RedeemRewardsURL } from "../Constants/AmbassadorConfig";

export default class AmbassdorRewardsService {
  public static async GetRewardsList(loginMetadata: LoginMetadata, forceRefresh: boolean) {
    const body = {
      "program_rewards": {
        "program_id": loginMetadata.programId,
        "amb_prog_id": loginMetadata.ambassadorProgramId,

      }
    };
    const result = await APICallerPost<AmbassdorRewardsResponse, any>(
      GetRewardsListURL,
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
  public static async RedeemRewardsList(loginMetadata: LoginMetadata, id: Number, title: string) {
    const body = {
      "redeem_program_rewards": {
        "prog_reward_id": id,
        "prog_reward_title": title,
        "program_id": loginMetadata.programId,
        "amb_prog_id": loginMetadata.ambassadorProgramId
      }
    };
    const result = await APICallerPost<any, any>(
      RedeemRewardsURL,
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
}