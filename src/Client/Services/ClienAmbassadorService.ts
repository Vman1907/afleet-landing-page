import { APICallerDel, APICallerGet, APICallerPut } from "../../Services/BaseService";
import { ambassadorCampaignURL, AmbassadorForProgramCampaignDeleteURL, AmbassadorForProgramDeleteURL, AmbassadorForProgramURL, ambassadorProgramCampaignURL, DeleteAmbassadorCampaignURL, GetAmbassdorProgramDetailURL, GetleaderboardAmbassdorURL, GiveBonusRPURL, UpdateCampaignStatusURL, UpdateCampaignTaskStatusURL, UpdateCampaignTaskStatusURL2 } from "../Constants/ClientConfig";
import { AmbassadorManageDetail } from "../Models/AmbassadorManageDetail";
import { AmbassdorCampaignResponse } from "../Models/AmbassdorCampaignResponse";
import { leaderboardResponse } from "../Models/Leaderboard";
import { LoginMetadata } from "../Models/LoginMetadata";
import { socialList } from "../Models/socialList";
import { APICallerPost } from "./BaseService";

export default class ClientAmbassadorService {
  public static async GetAmbassdorCampaignDetail(loginMetadata: LoginMetadata, force: boolean) {
    const body = {};
    const result = await APICallerGet<AmbassdorCampaignResponse, any>(
      ambassadorCampaignURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "ambassador/Campaign"
    ).then((response) => {
      console.log(response);
      return response;
    })
      .catch((error) => {
        console.log(error);
        return error;
      })
    return result;
  }
  public static async UpdateAmbassadorCampaign(loginMetadata: LoginMetadata, getSocialList: socialList) {
    const body = { ambassador: { ambassador_task_id: getSocialList.ambassador_task_id, completion_status: getSocialList.completion_status } };
    const result = await APICallerPut<any, any>(
      ambassadorProgramCampaignURL,
      body,
      loginMetadata,
      "campaignUpdate",
    )
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async DeleteAmbassadorCampaign(
    loginMetadata: LoginMetadata,
    toDelete: number[]
  ) {
    const body = {
      id: toDelete
    };
    const result = await APICallerDel<any, any>(
      DeleteAmbassadorCampaignURL,
      body,
      loginMetadata,
      "Admin/DeleteAmbassAdmin"
    )
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => {
        throw error;
      });
    return result;
  }
  public static async DeleteAmbassadorProgram(
    loginMetadata: LoginMetadata,
    ambassador_program_id: number
  ) {
    const body = {
      program_id: loginMetadata.program_id,
      program_name: loginMetadata.program_name,
      ambssador_prog_id: ambassador_program_id
    };
    const result = await APICallerDel<any, any>(
      AmbassadorForProgramDeleteURL,
      body,
      loginMetadata,
      "Client/DeleteAmbassador"
    )
      .then((response: any) => {
        // console.log("hyy", ambassador_program_id)
        return response;
      })
      .catch((error: any) => {
        console.log("hy", ambassador_program_id)
        throw error;
      });
    return result;
  }
  public static async DeleteAmbassadorProgramCampaign(
    loginMetadata: LoginMetadata,
    custom_camp_id: number,
    ambssador_program_id: number
  ) {
    const body = {
      custom_campaign_id: custom_camp_id,
      ambssador_program_id: ambssador_program_id
    };
    const result = await APICallerDel<any, any>(
      AmbassadorForProgramCampaignDeleteURL,
      body,
      loginMetadata,
      "Client/DeleteAmbassadorCampaign"
    )
      .then((response: any) => {
        // console.log("hyy", ambassador_program_id)
        return response;
      })
      .catch((error: any) => {
        // console.log("hy", ambassador_program_id)
        throw error;
      });
    return result;
  }
  public static async GetAmbassdorProgramDetail(loginMetadata: LoginMetadata, client_id: number) {
    const body = { client_id: client_id };
    const result = await APICallerPost<AmbassdorCampaignResponse, any>(
      GetAmbassdorProgramDetailURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "ambassador/Campaign"
    ).then((response) => {
      console.log(response);
      return response;
    })
      .catch((error) => {
        console.log(error);
        return error;
      })
    return result;
  }
  public static async GetAmbassdorForPrograms(loginMetadata: LoginMetadata) {
    const body = {
      program_id: loginMetadata.program_id
    };
    const result = await APICallerPost<AmbassdorCampaignResponse, any>(
      AmbassadorForProgramURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "ambassador/Programs"
    ).then((response) => {
      console.log(response);
      return response;
    })
      .catch((error) => {
        console.log(error);
        return error;
      })
    return result;
  }
  public static async leaderboardAmbassador(loginMetadata: LoginMetadata) {
    const body = { program_id: loginMetadata.program_id };
    const result = await APICallerPost<leaderboardResponse, any>(
      GetleaderboardAmbassdorURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "ambassador/Campaign"
    ).then((response) => {
      console.log(response);
      return response;
    })
      .catch((error) => {
        console.log(error);
        return error;
      })
    return result;
  }
  public static async giveBonusRP(loginMetadata: LoginMetadata, amb_prog_id: number, bonus: number) {
    const body = { amb_prog_id: amb_prog_id, bonus: bonus };
    const result = await APICallerPost<any, any>(
      GiveBonusRPURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "ambassador/bonusRP"
    ).then((response) => {
      console.log(response);
      return response;
    })
      .catch((error) => {
        console.log(error);
        return error;
      })
    return result;
  }
  public static async UpdateCampaignTaskStatus(loginMetadata: LoginMetadata, completion_status: Number, custom_task_id: Number, rejected_reason: string, end_date: string) {
    const body = { completion_status: completion_status, amb_task_id: custom_task_id, rejected_reason: rejected_reason, end_date: end_date };
    const result = await APICallerPut<leaderboardResponse, any>(
      UpdateCampaignTaskStatusURL,
      body,
      loginMetadata,
      "ambassador/CampaignTask/UpdateStatus"
    ).then((response) => {
      console.log(response);
      return response;
    })
      .catch((error) => {
        console.log(error);
        return error;
      })
    return result;
  }

  public static async UpdateCampaignStatus(loginMetadata: LoginMetadata, title: string, total_points: Number, lifetime_points: Number, amb_id: Number, prog_id: Number, amb_prog_id: Number, custom_camp_id: Number) {
    const body = { total_points: total_points, lifetime_points: lifetime_points, amb_id: amb_id, prog_id: prog_id, amb_prog_id: amb_prog_id, custom_camp_id: custom_camp_id, completion_status: 1, campaign_name: title, program_name: loginMetadata.program_name };
    console.log(body)
    const result = await APICallerPut<any, any>(
      UpdateCampaignStatusURL,
      body,
      loginMetadata,
      "ambassador/Campaign/UpdateStatus"
    ).then((response) => {
      return response;
    })
      .catch((error) => {
        console.log(error);
        return error;
      })
    return result;
  }

  public static async UpdateCampaignTaskStatusUpdated(loginMetadata: LoginMetadata, completion_status: Number, ambassador_program_id: Number, ambassador_id: Number, campaign_id: Number, amb_task_id: Number, rejection_reason: String) {
    const body = {
      ambassador_program_id: ambassador_program_id,
      ambassador_id: ambassador_id,
      campaign_id: campaign_id,
      amb_task_id: amb_task_id,
      program_id: loginMetadata.program_id,
      completion_status: completion_status,
      rejection_reason: rejection_reason
    };
    const result = await APICallerPost<any, any>(
      UpdateCampaignTaskStatusURL2,
      body,
      loginMetadata,
      "",
      false,
      0,
      false,
      "ambassador/CampaignTask/UpdateStatus"
    ).then((response) => {
      console.log(response);
      return response;
    })
      .catch((error) => {
        console.log(error);
        return error;
      })
    return result;
  }

}
