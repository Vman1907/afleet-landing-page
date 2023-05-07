export const baseURL =
  "http://localhost:3000";
export const baseURL2 =
  "https://rl8n03fwaa.execute-api.ap-south-1.amazonaws.com";

export const clientLoginURL = baseURL + "/login/client";

export const GetRewardsDetailsURL = baseURL + "/client/getAllRewards";

export const CreateRewardURL = baseURL + "/client/createReward";

export const UpdateRewardURL = baseURL + "/client/updateReward";

export const DeleteRewardURL = baseURL + "/client/deleteReward";

export const GetClaimRewardsDetailsURL = baseURL + "/client/getPendingRewards";

export const UpdateCampaignTaskStatusURL =
  baseURL + "/campaign/custom/updateTaskStatus";
export const UpdateCampaignStatusURL =
  baseURL + "/campaign/custom/finishCampaignForAmbassador";

export const GetClientTimeLineUrl = baseURL + "/client/timeline"
export const AcceptOrRRejectRewardURL =
  baseURL + "/client/acceptOrRejectReward";
export const CreatClientURL = baseURL + "/campaign/custom/create";
export const CreatSocialClientURL = baseURL + "/campaign/social/create";
export const ViewCustomCampaignURL = baseURL + "/campaign/custom/get";
export const ViewSocialCampaignURL = baseURL + "/campaign/social/get";
export const DeleteCampaignURL = baseURL + "/campaign/custom/delete";
export const DeleteSocialCampaignURL = baseURL + "/campaign/social/delete";
export const ViewTaskURL = baseURL + "/campaign/custom/tasks";
export const ViewSocialTaskURL = baseURL + "/campaign/social/tasks";
export const campaignDetailURL = baseURL + "/campaign/custom/tasks";
export const customCampaignUpdate = baseURL + "/campaign/custom/update";
export const ambassadorCampaignURL = baseURL + "/ambassador/getAmbassadorList";
export const AmbassadorForProgramURL = baseURL + "/client/getAmbassador";
export const AmbassadorForProgramDeleteURL =
  baseURL + "/client/deleteAmbassador";
export const AmbassadorForProgramCampaignDeleteURL =
  baseURL + "/client/deleteAmbassadorCampaign";
export const ambassadorProgramCampaignURL =
  baseURL + "/ambassador/updateAmbassadorProgram";
export const DeleteAmbassadorCampaignURL =
  baseURL + "/ambassador/program/delete";
export const GetAmbassdorProgramDetailURL =
  baseURL + "/client/getClientProgram";
export const GetleaderboardAmbassdorURL =
  baseURL + "/ambassador/program/getLeaderboard";
export const ClientRecruitmentEditFormUrl =
  baseURL + "/client/recruit/createForm";
export const UpdateFormStatusURL =
  baseURL + "/client/recruit/updateFormStatus"
export const ClientRecruitmentGetFormDataUrl =
  baseURL + "/client/recruit/getFormData";
export const ClientFormDataOnLoadURL =
  baseURL + "/client/recruit/getFormOnLoad";
export const ClientRecruitmentGetAllFormDataUrl =
  baseURL + "/client/recruit/getAllFormData";
export const GetClientRecruitmentFormDataUrl = baseURL + "/form/:programName/:formId";
export const GetClientManageUrl =
  baseURL + "/client/recruitmentResponse/Manage";
export const GetAllCampaigUrl = baseURL + "/client/getAllCampaignCount";
export const GetAllCampaigRewardsUrl = baseURL + "/client/getAllProgramRewards";
export const GetAllPaymentDetail = baseURL + "/client/getPaymentDetail";
export const GetAllPackageDetails = baseURL + "/client/getAllPackage";
export const GetClientProgramDetailsUrl =
  baseURL + "/client/programDetails";
export const GetManagerProgramDetailsUrl =
  baseURL + "/client/managerDetails";
export const DeleteManagerURL =
  baseURL + "/client/deleteManager";

export const UpdateClientProgramURL = baseURL + "/client/program/update"
export const AddManagerURL = baseURL + "/client/addManager"
export const FormSchemaURL = baseURL + "/client/getForm"
export const InviteAmbListURL = baseURL + "/client/getAmb"
export const InviteAmbURL = baseURL + "/client/recruit/inviteAmbassadors"
export const ReportsProgramURL = baseURL + "/client/getreportsProgram"
export const ReportsPerformerURL = baseURL + "/client/getreportsPerformer"
export const ReportsRewardURL = baseURL + "/client/getreportsReward"
export const ReportsOverallURL = baseURL + "/client/getreportsOverall"
export const ReportsGraphURL = baseURL + "/client/getreportsGraph"
export const InfoOverallURL = baseURL + "/client/getInfoData"
export const TaskOverallURL = baseURL + "/client/getTaskData"
export const ReportAllCampURL = baseURL + "/client/getreportAllCamp"
export const ReportCampURL = baseURL + "/client/getreportCamp"
export const ReportCampEffURL = baseURL + "/client/getreportCampEff"
export const ReportTopCampURL = baseURL + "/client/getreportTopCamp"
export const ResourceURL = baseURL + "/resources/client/getLastFiveAdminResources";

export const GetResourcesURL = baseURL + "/resources/client/getAll";

export const CreateResourceURL = baseURL + "/resources/client/create";

export const DeleteResourceURL = baseURL + "/resources/client/delete";
export const setRewardEnableURL = baseURL + "/client/setRewardEnable";
export const updateManagerURL = baseURL + "/client/updateManager";
export const InstaLoginURL = baseURL + "/instagram/user/getLoginUrl";
export const InstaStoreURL = baseURL + "/instagram/user/storeToken";
export const TwitterLoginURL = baseURL + "/twitter/user/requestToken";
export const TwitterAccessURL = baseURL + "/twitter/user/accessToken";
export const UpdateCampaignTaskStatusURL2 =
  baseURL + "/campaign/custom/updateCampaignTask";
export const GiveBonusRPURL = baseURL + "/client/giveBonusRP";