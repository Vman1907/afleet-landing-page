const baseURL = "http://localhost:3000";
export const baseURL2 =
  "https://rl8n03fwaa.execute-api.ap-south-1.amazonaws.com";
export const AmbassadorLoginURL = baseURL + "/login/ambassador";
export const CreatAmbassadorURL = baseURL + "/ambassador/create";
export const GetProgramsForAmbassador = baseURL + "/ambassador/program/getAll";
export const GetProgramDetails = baseURL + "/ambassador/program/get";
export const GetRewardsListURL = baseURL + "/ambassador/programRewards/getAll";
export const RedeemRewardsURL = baseURL + "/ambassador/programRewards/redeem";
export const GetCampaignsListURL =
  baseURL + "/ambassador/program/getCampaignDetails";
export const GetAmbassadorLeaderboardURL =
  baseURL + "/ambassador/program/getLeaderboard";
export const InsertTaskDetailsURL = baseURL + "/ambassador/program/participate";
export const GetTaskDetailsURL = baseURL + "/ambassador/program/taskDetails";

export const UpdateAmbassadorProgramURL =
  baseURL + "/ambassador/program/update";

export const GetCampaignsCountURL =
  baseURL + "/ambassador/settings/getCampaignCount";

export const UpdateTaskCompletionLinkURL =
  baseURL + "/ambassador/program/insertTaskLink";
export const GetCampaignListCalendarUrl =
  baseURL + "/ambassador/program/campaignList";
export const GetAmbassadorProgramDetailsUrl =
  baseURL + "/ambassador/programDetails";
export const AmbassadorTwitterRequestTokenUrl =
  baseURL + "/ambassador/twitter/requestToken";
export const AmbassadorTwitterAccessTokenUrl =
  baseURL + "/ambassador/twitter/accessToken";
export const AmbassadorTwitterActionUrl =
  baseURL + "/ambassador/twitter/action";
export const GetAmbassadorTimeLineUrl =
  baseURL + "/ambassador/timeline"
export const FinishCampaignURL =
  baseURL + "/campaign/custom/finishCampaign"

export const ResourceURL = baseURL + "/resources/ambassador/getLastFiveClientResources";
