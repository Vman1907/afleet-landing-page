import { APICallerPost } from "../../Services/BaseService";
import { GetAmbassadorTimeLineUrl } from "../Constants/AmbassadorConfig";

export default class AmbassadorTimelineServices {

    public static async DeleteUser(loginMetadata: any) {
        const body = {
            'ambassador_name': loginMetadata.first_name,
            'email': loginMetadata.emailId,
            'programId': loginMetadata.programId,
            'user_name': loginMetadata.first_name + "-" + loginMetadata.last_name,
            'role': "ambassador"
        };
        const result = await APICallerPost<any, any>(
            GetAmbassadorTimeLineUrl + "/deleteCurrentAmbassador",
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "ambassador/Delete"
        )
            .then((response) => {
                console.log(response);
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
        return result;
    }
    public static async CreateUser(loginMetadata: any) {
        const body = {
            'ambassadorId': loginMetadata.id,
            'ambassador_name': loginMetadata.first_name,
            'email': loginMetadata.emailId,
            'programId': loginMetadata.programId,
            'user_name': loginMetadata.first_name + "-" + loginMetadata.last_name,
            'role': "ambassador"
        };
        const result = await APICallerPost<any, any>(
            GetAmbassadorTimeLineUrl + "/getUserToken",
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "ambassador/Create"
        )
            .then((response) => {
                console.log(response);
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
        return result;
    }
    public static async RemoveActivity(loginMetadata: any, activityId: any,activity:any) {
        const body = {
            'activityId': activityId,
            'activity': activity,
            'ambassadorId': loginMetadata.id,
            'ambassador_name': loginMetadata.first_name,
            'email': loginMetadata.emailId,
            'programId': loginMetadata.programId,
            'user_name': loginMetadata.first_name + "-" + loginMetadata.last_name,
            'role': "ambassador"
        };
        const result = await APICallerPost<any, any>(
            GetAmbassadorTimeLineUrl + "/deleteActivity",
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "ambassador/deleteActivity"
        )
            .then((response) => {
                console.log(response);
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
        return result;
    }

}