import {
  CreatClientURL,
  CreatSocialClientURL,
  DeleteCampaignURL,
  ViewCustomCampaignURL,
  ViewTaskURL,
  ViewSocialCampaignURL,
  ViewSocialTaskURL,
  DeleteSocialCampaignURL,
  campaignDetailURL,
  customCampaignUpdate,
  InfoOverallURL,
  TaskOverallURL,
  ReportAllCampURL,
  ReportCampURL,
  ReportCampEffURL,
  ReportTopCampURL,
  InstaLoginURL,
  TwitterLoginURL,
  TwitterAccessURL,
  InstaStoreURL,
} from "../Constants/ClientConfig";
import { CreateClient } from "../Models/CreateClient";
import { LoginMetadata } from "../Models/LoginMetadata";
import {
  APICallerPost,
  APICallerGet,
  APICallerDel,
  APICallerPut,
} from "../../Services/BaseService";
import { GetClientResponse } from "../Models/GetClientResponse";
import { CampaignTaskResponse } from "../Models/CampaignTask";
import { convertToUTC } from "../../Util/BasicUtilityFunctions";
import { StorageService } from "../../Services/StorageService";
import { access } from "fs";
import { Browser } from "@capacitor/browser";

export default class createClientService {
  public static async CreateCampaign(
    campaignData: CampaignTaskResponse,
    loginMetadata: LoginMetadata,
    postCaption: string,
    postImg: string,
  ) {
    const body = {

      package_id: loginMetadata.package_id,
      loginMetadata: loginMetadata,
      program_client_id: loginMetadata.prog_client_id,
      postCaption: postCaption,
      postImg: postImg,

      custom_campaign: {
        title: campaignData.custom_campaign.title,
        description: campaignData.custom_campaign.description,
        start_date: convertToUTC(campaignData.custom_campaign.start_date),
        end_date: convertToUTC(campaignData.custom_campaign.end_date),
        campaign_img: campaignData.custom_campaign.campaign_img,
        points: campaignData.custom_campaign.points,
        status: campaignData.custom_campaign.status,
        program_id: campaignData.custom_campaign.program_id,
        task_number: campaignData.custom_campaign.task_number,
        archeived: false,
        automatic: campaignData.custom_campaign.automatic,
        platform: campaignData.custom_campaign.platform
      },
      custom_task: campaignData.custom_task,
    };
    // console.log(body);
    const result = await APICallerPost<any, any>(
      CreatClientURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Client/CreateClient"
    )
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
    return result;
  }
  public static async UpdateCampaign(
    campaignData: CampaignTaskResponse,
    loginMetadata: LoginMetadata
  ) {
    campaignData.custom_campaign.start_date = convertToUTC(campaignData.custom_campaign.start_date);
    campaignData.custom_campaign.end_date = convertToUTC(campaignData.custom_campaign.end_date);
    const body = campaignData;
    const result = await APICallerPut<any, any>(
      customCampaignUpdate,
      body,
      loginMetadata,
      "campaignUpdate"
    )
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
    // }
  }
  public static async UpdateArcheived(
    archeived: boolean,
    id: number,
    status: string,
    loginMetadata: LoginMetadata
  ) {
    const body = { custom_campaign: { id, archeived, status }, custom_task: [] };
    const result = await APICallerPut<any, any>(
      customCampaignUpdate,
      body,
      loginMetadata,
      "campaignArcheivedUpdate"
    )
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
    // }
  }
  public static async GetCampaignList(
    loginMetadata: LoginMetadata,
    option: number
  ) {
    const body = { program_id: loginMetadata.program_id, campaign_type: option };
    const result = await APICallerPost<GetClientResponse, any>(
      ViewCustomCampaignURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Package/CreatePackage"
    )
      .then((response) => {
        // console.log(option);
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async GetTaskList(
    loginMetadata: LoginMetadata,
    campaignId: number,
    amb_prog_id: number,
    option: number
  ) {
    const body = {
      custom_campaign: {
        custom_campaign_id: campaignId,
        amb_prog_id: amb_prog_id,
      },
      option: option
    };
    const result = await APICallerPost<CampaignTaskResponse, any>(
      ViewTaskURL,
      body,
      loginMetadata,
      "",
      false,
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
  public static async GetCampaignDetail(
    loginMetadata: LoginMetadata,
    campaignId: number,
    amb_prog_id: number,
    option: number
  ) {
    const body = {
      custom_campaign: {
        custom_campaign_id: campaignId,
        amb_prog_id: amb_prog_id,

      },
      option: option
    };
    const result = APICallerPost<CampaignTaskResponse, any>(
      campaignDetailURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Package/CreatePackage"
    )
      .then((response: any) => {
        return response;
      })
      .catch((e: any) => {
        return e;
      });
    return result;
  }
  public static async GetInfoOverall(
    loginMetadata: LoginMetadata,
    campaignId: number,
  ) {
    const body = {
      custom_camp_id: campaignId,
    };
    const result = APICallerPost<any, any>(
      InfoOverallURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Client/GetInfo"
    )
      .then((response: any) => {
        return response;
      })
      .catch((e: any) => {
        return e;
      });
    return result;
  }
  public static async GetInfoTask(
    loginMetadata: LoginMetadata,
    campaignId: number,
  ) {
    const body = {
      custom_camp_id: campaignId,
    };
    const result = APICallerPost<any, any>(
      TaskOverallURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Client/GetInfoTask"
    )
      .then((response: any) => {
        return response;
      })
      .catch((e: any) => {
        return e;
      });
    return result;
  }
  public static async GetReportAllCamp(
    loginMetadata: LoginMetadata,
  ) {
    const body = {
      program_id: loginMetadata.program_id,
    };
    const result = APICallerPost<any, any>(
      ReportAllCampURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Client/ReportAllCamp"
    )
      .then((response: any) => {
        return response;
      })
      .catch((e: any) => {
        return e;
      });
    return result;
  }
  public static async GetReportCamp(
    loginMetadata: LoginMetadata,
    option: number
  ) {
    const body = {
      program_id: loginMetadata.program_id,
      option: option
    };
    const result = APICallerPost<any, any>(
      ReportCampURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Client/ReportAllCamp"
    )
      .then((response: any) => {
        return response;
      })
      .catch((e: any) => {
        return e;
      });
    return result;
  }
  public static async GetReportCampEff(
    loginMetadata: LoginMetadata,
    option: number
  ) {
    const body = {
      program_id: loginMetadata.program_id,
      option: option
    };
    const result = APICallerPost<any, any>(
      ReportCampEffURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Client/ReportAllCamp"
    )
      .then((response: any) => {
        return response;
      })
      .catch((e: any) => {
        return e;
      });
    return result;
  }
  public static async GetReportTopCamp(
    loginMetadata: LoginMetadata,
    option: number
  ) {
    const body = {
      program_id: loginMetadata.program_id,
      option: option
    };
    const result = APICallerPost<any, any>(
      ReportTopCampURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Client/ReportAllCamp"
    )
      .then((response: any) => {
        return response;
      })
      .catch((e: any) => {
        return e;
      });
    return result;
  }
  public static async DeleteCampaign(
    loginMetadata: LoginMetadata,
    campaignId: number,
    option: number
  ) {
    const body = {
      custom_campaign: {
        id: campaignId,
      },
      option: option
    };
    const result = await APICallerDel<any, any>(
      DeleteCampaignURL,
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
  public static async requestInstaToken(loginMetadata: LoginMetadata) {
    const body = {
      program_client_id: loginMetadata.prog_client_id
    }
    return APICallerPost<any, any>(
      InstaLoginURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "client/instaCampaign"
    )
      .then((response) => {
        console.log(response);
        if (response.status == true) {
          Browser.open({ url: response.url, windowName: "_self" });
        }
        return response;
      })
      .catch((error) => {
        console.log(error);

        return error;
      });
  }
  public static async storeInstaToken(loginMetadata: LoginMetadata, access_token: any) {
    const body = {
      tokens: {
        auth_access_token: access_token,
        program_client_id: loginMetadata.prog_client_id
      }
    }
    return APICallerPost<any, any>(
      InstaStoreURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "client/instaStore"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);

        return error;
      });
  }
  public static async requestTwitterToken(loginMetadata: LoginMetadata) {
    const body = {
      program_client_id: loginMetadata.prog_client_id
    }
    return APICallerPost<any, any>(
      TwitterLoginURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "client/twitterCampaign"
    )
      .then(async (response) => {
        if (response.status == true) {
          await StorageService.Set("twitter_oauth_token", response.auth_access_token, 24 * 60 * 60);
          await StorageService.Set("twitter_oauth_token_secret", response.auth_access_secret, 24 * 60 * 60);
          window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${response.auth_access_token}`;
        }
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
  public static async twitterAccessToken(loginMetadata: any, oauth_token: any, oauth_token_secret: any, oauth_verifier: any) {

    const body = {
      "program_client_id": loginMetadata.prog_client_id,
      "oauth_token": oauth_token,
      "oauth_token_secret": oauth_token_secret,
      "oauth_verifier": oauth_verifier,
    }

    return APICallerPost<any, any>(
      TwitterAccessURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "client/twitterAccess"
    )
      .then((response) => {
        console.log(response);
        // debugger;
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
}
