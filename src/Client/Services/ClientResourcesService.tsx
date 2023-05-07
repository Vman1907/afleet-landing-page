import { APICallerPost } from "../../Services/BaseService";
import { CreateResourceURL, DeleteResourceURL, GetResourcesURL, ResourceURL } from "../Constants/ClientConfig";
import { LoginMetadata } from "../Models/LoginMetadata";
import ResourceDetails from "../Models/ResourceDetails";
import ResourceDetailsList from "../Models/ResourceDetailsList";

export default class ResourceManagementService{
    public static async getResources(loginMetadata: LoginMetadata){
        const body = {
            programId: loginMetadata.program_id
        };
        const result = await APICallerPost<ResourceDetailsList, any>(
            GetResourcesURL,
            body,
            loginMetadata,
            "",
            false,
            0,
            false,
            "client/getResources"
        ).then((response) => {
            return response;
        }).catch((error) => {
            return error;
        });
        return result;
    }
    public static async createResource(loginMetadata: LoginMetadata, resourceDetails: ResourceDetails){
        resourceDetails.is_admin = false;
        resourceDetails.program_id = loginMetadata.program_id;
        resourceDetails.user_id = loginMetadata.clientId;
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
            "client/createResources"
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
            "client/deleteResources"
        ).then((response) => {
            return response;
        }).catch((error) => {
            return error;
        });
        return result;
    }
    public static async getResourcesForClient(loginMetadata: LoginMetadata){
        const body = {};
        const result = await APICallerPost<ResourceDetailsList, any>(
            ResourceURL,
            body,
            loginMetadata,
            "",
            false,
            0,
            false,
            "client/getResources"
        ).then((response) => {
            return response;
        }).catch((error) => {
            return error;
        })
        return result;
    }
}