import {
  FinishCampaignURL,
  GetAmbassadorProgramDetailsUrl,
  GetCampaignListCalendarUrl,
  GetCampaignsCountURL,
  GetCampaignsListURL,
  GetProgramDetails,
  GetProgramsForAmbassador,
  GetTaskDetailsURL,
  InsertTaskDetailsURL,
  UpdateAmbassadorProgramURL,
  UpdateTaskCompletionLinkURL
} from "../Constants/AmbassadorConfig";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import { APICallerPost, APICallerPut } from "../../Services/BaseService";
import ProgramListResponse from "../Models/ProgramListResponse";
import ProgramDetails from "../Models/ProgramDetails";

export default class ProgramManagementService {

  public static async GetProgramList(loginMetadata: LoginMetadata, forceRefresh: boolean) {
    const body = {
      "params": {
        "ambassador_id": loginMetadata.id
      }
    };

    const result = await APICallerPost<ProgramListResponse, any>(
      GetProgramsForAmbassador,
      body,
      loginMetadata,
      "",
      !forceRefresh,
      0,
      true,
      "Program/GetPrograms"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async GetAmbassadorProgram(loginMetadata: LoginMetadata) {
    const body = {
      ambassadorId: loginMetadata.id,
      programId: loginMetadata.programId
    };

    const result = await APICallerPost<any, any>(
      GetAmbassadorProgramDetailsUrl,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Ambassador/GetPrograms"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

  public static async GetProgramDetails(loginMetadata: LoginMetadata, forceRefresh: boolean) {
    const body = {
      "params": {
        "ambassador_id": loginMetadata.id,
        "program_id": loginMetadata.programId
      }
    };

    const result = await APICallerPost<ProgramDetails, any>(
      GetProgramDetails,
      body,
      loginMetadata,
      "",
      !forceRefresh,
      0,
      true,
      "Program/GetPrograms"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

  public static async GetCampaignsList(loginMetadata: LoginMetadata, forceRefresh: boolean) {
    const body = {
      "ambassador_program_id": loginMetadata.ambassadorProgramId,
      "program_id": loginMetadata.programId
    };

    const result = await APICallerPost<any, any>(
      GetCampaignsListURL,
      body,
      loginMetadata,
      "",
      !forceRefresh,
      0,
      true,
      "Program/GetCampaigns"
    )
      .then((response) => {

        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

  public static async InsertTaskDetails(loginMetadata: LoginMetadata, custom_campaign_id: number, start_date: string, end_date: string) {

    const body = {
      "start_date": start_date,
      "end_date": end_date,
      "CustomCampaign": {
        "completion_status": 0,
        "amb_prog_id": loginMetadata.ambassadorProgramId,
        "custom_camp_id": custom_campaign_id
      },
      "CustomCampaign.amb_prog_id": loginMetadata.ambassadorProgramId,
      "CustomCampaign.custom_camp_id": custom_campaign_id
    };
    const result = await APICallerPost<any, any>(
      InsertTaskDetailsURL,
      body,
      loginMetadata,
      "",
      true,
      0,
      true,
      "Program/InsertTasks"
    )
      .then((response) => {
        console.log(response)
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

  public static async UpdateCampaignStatus(loginMetadata: LoginMetadata, title: string, total_points: number, custom_camp_id: number) {
    const body = { total_points: total_points, amb_id: loginMetadata.id, program_id: loginMetadata.programId, amb_prog_id: loginMetadata.ambassadorProgramId, custom_camp_id: custom_camp_id, completion_status: 1, campaign_name: title };
    console.log(body)
    const result = await APICallerPut<any, any>(
      FinishCampaignURL,
      body,
      loginMetadata,
      "ambassador/Campaign/Complete"
    ).then((response) => {
      return response;
    })
      .catch((error) => {
        console.log(error);
        return error;
      })
    return result;
  }

  public static async GetTaskDetails(loginMetadata: LoginMetadata, campaign_id: number, status: number) {
    const body = {
      "custom_campaign_id": campaign_id,
      "ambassador_prog_id": loginMetadata.ambassadorProgramId,
      "completion_status": status,
    };
    const result = await APICallerPost<any, any>(
      GetTaskDetailsURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Program/GetTasks"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

  public static async GetCampaignsListCalendar(loginMetadata: LoginMetadata, start_range: string, end_range: string) {
    const body = {
      "range_start": start_range,
      "range_end": end_range,
      "program_id": loginMetadata.programId
    };

    const result = await APICallerPost<any, any>(
      GetCampaignListCalendarUrl,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Program/GetCampaignsList"
    )
      .then((response) => {

        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

  public static async UpdateTaskLink(loginMetadata: LoginMetadata, custom_task_id: number, task_link: string, automatic: number) {
    const body = {
      "task_id": custom_task_id,
      "completion_link": task_link,
      "automatic": automatic
    };
    const result = await APICallerPut<any, any>(
      UpdateTaskCompletionLinkURL,
      body,
      loginMetadata,
      "Program/UpdateTaskLink"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

  public static async GetParticipatedCampaignsCount(loginMetadata: LoginMetadata, forceRefresh: boolean) {
    const body = {
      "ambassador_program_id": loginMetadata.ambassadorProgramId
    };

    const result = await APICallerPost<any, any>(
      GetCampaignsCountURL,
      body,
      loginMetadata,
      "",
      !forceRefresh,
      0,
      true,
      "Settings/GetCampaignsCounts"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

  public static async UpdateAmbassadorProgram(loginMetadata: LoginMetadata, forceRefresh: boolean, programDetails: ProgramDetails) {
    const body = {
      "ambassador_program": {
        "id": loginMetadata.ambassadorProgramId,
        "title": programDetails.title,
        "description": programDetails.description,
        "ambassador_id": loginMetadata.id,
        "program_id": loginMetadata.programId,
        "email": loginMetadata.emailId,
        "ambassador_program_img": programDetails.ambassador_program_img,
        "crypto_wallet": programDetails.crypto_wallet,
        "paypal_email": programDetails.paypal_email,
        "instagram_link": programDetails.instagram_link,
        "linkedin_link": programDetails.linkedin_link,
        "twitter_link": programDetails.twitter_link,
        "website_link": programDetails.website_link,
        "total_points": programDetails.total_points,
        "status": programDetails.status,
        "mailing_address": programDetails.mailing_address,
        "mailing_city": programDetails.mailing_city,
        "mailing_state": programDetails.mailing_state,
        "mailing_country": programDetails.mailing_country
      }
    };

    const result = await APICallerPut<any, any>(
      UpdateAmbassadorProgramURL,
      body,
      loginMetadata,
      "Settings/UpdateAmbassadorProgram"
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
