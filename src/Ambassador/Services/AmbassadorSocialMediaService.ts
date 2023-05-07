import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import { APICallerPost } from "../../Services/BaseService";
import { StorageService } from "../../Services/StorageService";
import { AmbassadorTwitterAccessTokenUrl, AmbassadorTwitterActionUrl, AmbassadorTwitterRequestTokenUrl } from "../Constants/AmbassadorConfig";

export default class AmbassadorSocialMediaService {

  //Step 1
  public static async requestToken(loginMetadata: any) {
    const body = {}
    return await APICallerPost<any, any>(
      AmbassadorTwitterRequestTokenUrl,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "ambassador/Campaign"
    )
      .then((response) => {
        // debugger;
        console.log(response);
        StorageService.Set("oauth_token", response.oauth_token, 24 * 60 * 60);
        StorageService.Set("oauth_token_secret", response.oauth_token_secret, 24 * 60 * 60);
        window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${response.oauth_token}`;
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
  //Step 2
  public static async accessToken(loginMetadata: any, oauth_token: any, oauth_token_secret: any, oauth_verifier: any) {

    const body = {
      "oauth_token": oauth_token,
      "oauth_token_secret": oauth_token_secret,
      "oauth_verifier": oauth_verifier,
    }

    return await APICallerPost<any, any>(
      AmbassadorTwitterAccessTokenUrl,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "ambassador/Campaign"
    )
      .then((response) => {
        console.log(response);
        // debugger;
        StorageService.Set("oauth_access_token", response.oauth_access_token, 24 * 60 * 60);
        StorageService.Set("oauth_access_token_secret", response.oauth_access_token_secret, 24 * 60 * 60);
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  public static async likeTask(loginMetadata: any, oauth_access_token: any, oauth_access_token_secret: any, postId: any, task_id: number, campaign_id: number) {
    const body = {
      "oauth_access_token": oauth_access_token,
      "oauth_access_token_secret": oauth_access_token_secret,
      "url": `https://api.twitter.com/1.1/favorites/create.json?id=` + postId,
      "task_status": {
        "completion_status": 2
      },
      "custom_task_id": task_id,
      "custom_campaign_id": campaign_id,
      "amb_prog_id": loginMetadata.ambassadorProgramId,
    }

    return await APICallerPost<any, any>(
      AmbassadorTwitterActionUrl,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "ambassador/Campaign"
    )
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  public static async retweetTask(loginMetadata: any, oauth_access_token: any, oauth_access_token_secret: any, postId: any, task_id: number, campaign_id: number) {
    const body = {
      "oauth_access_token": oauth_access_token,
      "oauth_access_token_secret": oauth_access_token_secret,
      "url": `https://api.twitter.com/1.1/statuses/retweet/` + postId + `.json`,
      "task_status": {
        "completion_status": 2
      },
      "custom_task_id": task_id,
      "custom_campaign_id": campaign_id,
      "amb_prog_id": loginMetadata.ambassadorProgramId,
    }

    return await APICallerPost<any, any>(
      AmbassadorTwitterActionUrl,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "ambassador/Campaign"
    )
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });

  }

  public static async commentTask(loginMetadata: any, oauth_access_token: any, oauth_access_token_secret: any, postId: any, commentBody: any, task_id: number, campaign_id: number) {
    const body = {
      "oauth_access_token": oauth_access_token,
      "oauth_access_token_secret": oauth_access_token_secret,
      "url": `https://api.twitter.com/1.1/statuses/update.json?status=` +
        commentBody +
        `&in_reply_to_status_id=` +
        postId +
        `&auto_populate_reply_metadata=` +
        true,
      "task_status": {
        "completion_status": 2
      },
      "custom_task_id": task_id,
      "custom_campaign_id": campaign_id,
      "amb_prog_id": loginMetadata.ambassadorProgramId,
    }

    return await APICallerPost<any, any>(
      AmbassadorTwitterActionUrl,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "ambassador/Campaign"
    )
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });

  }

  public static async followTask(loginMetadata: any, oauth_access_token: any, oauth_access_token_secret: any, userName: any, task_id: number, campaign_id: number) {

    const body = {
      "oauth_access_token": oauth_access_token,
      "oauth_access_token_secret": oauth_access_token_secret,
      "url": `https://api.twitter.com/1.1/friendships/create.json?screen_name=` +
        userName +
        `&follow=` +
        true,
      "task_status": {
        "completion_status": 2
      },
      "custom_task_id": task_id,
      "custom_campaign_id": campaign_id,
      "amb_prog_id": loginMetadata.ambassadorProgramId,
    }

    return await APICallerPost<any, any>(
      AmbassadorTwitterActionUrl,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "ambassador/Campaign"
    )
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });

  }


}
