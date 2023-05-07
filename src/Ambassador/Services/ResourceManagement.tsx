import { APICallerPost } from "../../Services/BaseService";
import { ResourceURL } from "../Constants/AmbassadorConfig";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import ResourceDetailsList from "../Models/ResourceDetailsList";

export default class ResourceManagementService{
    public static async getResourcesForAmbassador(loginMetadata: LoginMetadata){
        const body = {
            programId: loginMetadata.programId
        };
        const result = await APICallerPost<ResourceDetailsList, any>(
            ResourceURL,
            body,
            loginMetadata,
            "",
            false,
            0,
            false,
            "ambassador/getResources"
        ).then((response) => {
            return response;
        }).catch((error) => {
            return error;
        })
        return result;
    }
}