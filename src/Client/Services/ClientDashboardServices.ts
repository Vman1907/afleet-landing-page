import { FormSchemaURL, GetAllCampaigRewardsUrl, GetAllCampaigUrl, GetClientManageUrl } from "../Constants/ClientConfig";
import { LoginMetadata } from "../Models/LoginMetadata";
import { Manage } from "../Models/Manage";
import { APICallerPost } from "./BaseService";

export default class ClientDashboardService {
    public static async GetAllCampaignDetail(loginMetadata: LoginMetadata) {
        const body = { program_id: loginMetadata.program_id, package_id: loginMetadata.package_id };
        const result = await APICallerPost<any, any>(
            GetAllCampaigUrl,
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "ambassador/Campaigns"
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
    public static async GetAllProgramRewardsDetail(loginMetadata: LoginMetadata) {
        const body = { program_id: loginMetadata.program_id };
        const result = await APICallerPost<any, any>(
            GetAllCampaigRewardsUrl,
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "ambassador/Rewards"
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
    public static async GetAmbassadorFormList(loginMetadata: LoginMetadata) {
        const body = { programId: loginMetadata.program_id };
        const result = await APICallerPost<any, any>(
            GetClientManageUrl + "/getAllFormResponse",
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "ambassador/Forms"
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
    public static async GetFormSchema(loginMetadata: LoginMetadata) {
        const body = { program_id: loginMetadata.program_id, client_id: loginMetadata.clientId };
        const result = await APICallerPost<any, any>(
            FormSchemaURL,
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "client/schema"
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
    public static async AcceptAmbassdor(loginMetadata: LoginMetadata, formResponseList: Manage) {
        const body = {
            ambassador: {
                first_name: formResponseList.first_name,
                last_name: formResponseList.last_name,
                email: formResponseList.email,
                password: 0,
                status: 1,
                industry: formResponseList.industry,
                country: formResponseList.country
            },
            ambassador_program: {
                program_id: loginMetadata.program_id,
                ambassador_id: 0,
                title: formResponseList.first_name + " " + formResponseList.last_name,
            },
            id: formResponseList.id,
            status: 1,
            loginMetadata: loginMetadata
        };
        const result = await APICallerPost<any, any>(
            GetClientManageUrl + "/setFormResponseStatus",
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "ambassador/Accept"
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
    public static async RejectAmbassdor(loginMetadata: LoginMetadata, formResponseList: Manage) {
        const body = {
            id: formResponseList.id,
            status: 2
        };
        const result = await APICallerPost<any, any>(
            GetClientManageUrl + "/setFormResponseStatus",
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "ambassador/Reject"
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