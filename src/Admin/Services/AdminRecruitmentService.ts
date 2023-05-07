import { ClientFormDataOnLoadURL, ClientRecruitmentEditFormUrl, ClientRecruitmentGetAllFormDataUrl, FormSchemaURL, GetClientManageUrl, UpdateFormStatusURL } from "../../Client/Constants/ClientConfig";
import { Manage } from "../../Client/Models/Manage";
import { APICallerPost, APICallerPut } from "../../Services/BaseService";
import { LoginMetadata } from "../Models/LoginMetadata";

export default class AdminRecruitmentService {
    public static async editForm(loginMetadata: LoginMetadata, formString: string, formId: number) {
        const body = {
            program_id: 999,
            form: { program_id: 999, form_string: formString, status: 0 },
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
            "admin/editForm"
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
    public static async getAllFormData(loginMetadata: LoginMetadata) {
        const body = {
            programId: 999,
        };
        const result = await APICallerPost<any, any>(
            ClientRecruitmentGetAllFormDataUrl,
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "admin/getAllFormData"
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
            "admin/getFormDataOnLoad"
        )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
        return result;
    }
    public static async UpdateForm(loginMetadata: LoginMetadata, status: number) {
        const body = {
            status: status,
            program_id: 999
        };
        const result = await APICallerPut<any, any>(
            UpdateFormStatusURL,
            body,
            loginMetadata,
            "Admin/updateForm"
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
    public static async GetPromotionFormList(loginMetadata: LoginMetadata) {
        const body = { programId: 999 };
        const result = await APICallerPost<any, any>(
            GetClientManageUrl + "/getAllFormResponse",
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "admin/Forms"
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
        const body = { program_id: 999 };
        const result = await APICallerPost<any, any>(
            FormSchemaURL,
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "admin/schema"
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
                program_id: 999,
                ambassador_id: 0,
                title: formResponseList.first_name + " " + formResponseList.last_name,
            },
            id: formResponseList.id,
            status: 1,
            loginMetadata: loginMetadata
        };
        const result = await APICallerPost<any, any>(
            GetClientManageUrl + "/setPromotionFormResponseStatus",
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "admin/Accept"
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
            GetClientManageUrl + "/setPromotionFormResponseStatus",
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "admin/Reject"
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