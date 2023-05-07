import { APICallerPost } from "../../Services/BaseService";
import { CreateResourceURL, DeleteResourceURL, GetResourcesURL } from "../Constants/AdminConfig";
import { LoginMetadata } from "../Models/LoginMetadata";
import ResourceDetails from "../Models/ResourceDetails";
import ResourceDetailsList from "../Models/ResourceDetailsList";

export default class ResourceManagementService{
    public static async getResources(loginMetadata: LoginMetadata){
        const body = {};
        const result = await APICallerPost<ResourceDetailsList, any>(
            GetResourcesURL,
            body,
            loginMetadata,
            "",
            false,
            0,
            false,
            "admin/getResources"
        ).then((response) => {
            return response;
        }).catch((error) => {
            return error;
        });
        return result;
    }
    public static async createResource(loginMetadata: LoginMetadata, resourceDetails: ResourceDetails){
        resourceDetails.is_admin = true;
        resourceDetails.program_id = -1;
        resourceDetails.user_id = loginMetadata.id;
        const body = {
            resource: resourceDetails
        };
        const result = await APICallerPost<any, any>(
            CreateResourceURL,
            body,
            loginMetadata,
            "",
            false,
            0,
            false,
            "admin/createResources"
        ).then((response) => {
            return response;
        }).catch((error) => {
            return error;
        });
        return result;
    }
    public static async deleteResource(loginMetadata: LoginMetadata, resource_id: number){
        const body = {
            resource_id: resource_id
        };
        const result = await APICallerPost<any, any>(
            DeleteResourceURL,
            body,
            loginMetadata,
            "",
            false,
            0,
            false,
            "admin/deleteResources"
        ).then((response) => {
            return response;
        }).catch((error) => {
            return error;
        });
        return result;
    }
}