import internal from "stream";
import { APICallerDel, APICallerGet, APICallerPut } from "../../Services/BaseService";
import { AcceptOrRRejectRewardURL, CreateRewardURL, DeleteRewardURL, GetClaimRewardsDetailsURL, GetRewardsDetailsURL, UpdateRewardURL, ClientRecruitmentEditFormUrl, GetClientRecruitmentFormDataUrl, ClientRecruitmentGetAllFormDataUrl, ClientFormDataOnLoadURL, UpdateFormStatusURL, InviteAmbListURL, InviteAmbURL } from "../Constants/ClientConfig";
import ClientRewardClaimsResponse from "../Models/ClientRewardClaimsResponse";
import ClientRewardsResponse from "../Models/ClientRewardsResponse";
import ClientRecruitmentFormDetailsResponse from "../Models/ClientRecruitmentFormDetailsResponse";
import { LoginMetadata } from "../Models/LoginMetadata";
import { APICallerPost } from "./BaseService";

export default class ClientRecruitmentService {
  public static async editForm(loginMetadata: LoginMetadata, formString: string, formId: number) {
    const body = {
      client_id: loginMetadata.clientId,
      program_id: loginMetadata.program_id,
      form: { program_id: loginMetadata.program_id, form_string: formString, status: 0 },
      formId: formId,
    };
    const result = await APICallerPost<any, any>(
      ClientRecruitmentEditFormUrl,
      body,
      loginMetadata,
      "",
      false,
      0,
      false,
      "client/editForm"
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
  public static async UpdateForm(loginMetadata: LoginMetadata, status: number) {
    const body = {
      status: status,
      program_id: loginMetadata.program_id
    };
    const result = await APICallerPut<any, any>(
      UpdateFormStatusURL,
      body,
      loginMetadata,
      "Client/updateForm"
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

  public static async getFormData(loginMetadata: LoginMetadata, formId: number) {
    const body = {
      // form:{program_id:1},
      formId: formId,
    };
    const result = await APICallerPost<any, any>(
      GetClientRecruitmentFormDataUrl,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "client/getFormData"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

  public static async getAllFormData(loginMetadata: LoginMetadata) {
    const body = {
      programId: loginMetadata.program_id,
    };
    const result = await APICallerPost<any, any>(
      ClientRecruitmentGetAllFormDataUrl,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "client/getAllFormData"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async getFormDataOnLoad(loginMetadata: LoginMetadata, formId: number) {
    const body = {
      form_id: formId,
    };
    const result = await APICallerPost<any, any>(
      ClientFormDataOnLoadURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "client/getFormDataOnLoad"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

  public static async showFormData(loginMetadata: LoginMetadata) {
    const body = {
      program_id: loginMetadata.program_id,
    };
    const result = await APICallerPost<any, any>(
      ClientRecruitmentGetAllFormDataUrl,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "client/getFormData"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async inviteAmbList(loginMetadata: LoginMetadata) {
    const body = {
      program_id: loginMetadata.program_id,
    };
    const result = await APICallerPost<any, any>(
      InviteAmbListURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "client/getInviteAmbList"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async inviteAmb(loginMetadata: LoginMetadata, email: string, name: string, form_id: string) {
    const body = {
      email: email,
      aName: name,
      program_name: loginMetadata.program_name,
      form_id: form_id
    };
    const result = await APICallerPost<any, any>(
      InviteAmbURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "client/getInviteAmb"
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