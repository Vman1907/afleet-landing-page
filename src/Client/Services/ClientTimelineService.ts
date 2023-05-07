import { GetClientTimeLineUrl } from "../Constants/ClientConfig";
import { LoginMetadata } from "../Models/LoginMetadata";
import { APICallerPost } from "./BaseService";

export default class ClientTimelineService {
    public static async DeleteUser(loginMetadata: LoginMetadata) {
        const body = {
            'clientId': loginMetadata.clientId,
            'programId': loginMetadata.program_id,
            'user_name': loginMetadata.first_name + "-" + loginMetadata.last_name,
            'email': loginMetadata.emailId,
            'role': "client"
        };
        const result = await APICallerPost<any, any>(
            GetClientTimeLineUrl + "/deleteCurrentUser",
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "Client/Delete"
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
    public static async GetClientToken(loginMetadata: LoginMetadata) {
        const body = {
            'clientId': loginMetadata.clientId,
            'programId': loginMetadata.program_id,
            'user_name': loginMetadata.first_name + "-" + loginMetadata.last_name,
            'email': loginMetadata.emailId,
            'role': "client"
        };
        const result = await APICallerPost<any, any>(
            GetClientTimeLineUrl + "/getUserToken",
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "Client/getUserToken"
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
    public static async RemoveActivity(loginMetadata: LoginMetadata, activityId: any,activity:any) {
        const body = {
            'activityId': activityId,
            'activity': activity,
            'clientId': loginMetadata.clientId,
            'programId': loginMetadata.program_id,
            'user_name': loginMetadata.first_name + "-" + loginMetadata.last_name,
            'email': loginMetadata.emailId,
            'role': "client"
        };
        const result = await APICallerPost<any, any>(
            GetClientTimeLineUrl + "/deleteActivity",
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "Client/deleteActivity"
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
}