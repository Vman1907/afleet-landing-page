import { GetCampaignListCalendarUrl } from "../../Ambassador/Constants/AmbassadorConfig";
import ProgramDetails from "../../Ambassador/Models/ProgramDetails";
import { APICallerDel, APICallerGet, APICallerPut } from "../../Services/BaseService";
import { convertToUTC } from "../../Util/BasicUtilityFunctions";
import { DeleteManagerURL, GetClientProgramDetailsUrl, GetManagerProgramDetailsUrl, UpdateClientProgramURL } from "../Constants/ClientConfig";
import { LoginMetadata } from "../Models/LoginMetadata";
import { APICallerPost } from "./BaseService";

export default class ClientProgramService {

    public static async UpdateProgram(
        programDetails: ProgramDetails,
        loginMetadata: LoginMetadata,
    ) {
        programDetails.expiry_date = convertToUTC(programDetails.expiry_date)
        const body = {
            program: programDetails,
        };

        const result = await APICallerPut<any, any>(
            UpdateClientProgramURL,
            body,
            loginMetadata,
            "",
        )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
        return result;
    }

    public static async GetCampaignsListCalendar(loginMetadata: LoginMetadata, start_range: string, end_range: string) {
        const body = {
            "range_start": start_range,
            "range_end": end_range,
            "program_id": loginMetadata.program_id
        };

        const result = await APICallerPost<any, any>(
            GetCampaignListCalendarUrl,
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "Program/GetCampaignsList"
        )
            .then((response) => {

                return response;
            })
            .catch((error) => {
                throw error;
            });
        return result;
    }

    public static async ClientProgram(loginMetadata: LoginMetadata) {
        const body = {
            programId: loginMetadata.program_id
        };
        const result = await APICallerPost<any, any>(
            GetClientProgramDetailsUrl,
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "client/Program"
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
    public static async ManagerProgram(loginMetadata: LoginMetadata) {
        const body = {
            program_id: loginMetadata.program_id
        };
        const result = await APICallerPost<any, any>(
            GetManagerProgramDetailsUrl,
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "Client/getManagerDetails"
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

    public static async DeleteManager(
        loginMetadata: LoginMetadata,
        clientId: number
    ) {
        const body = {
            managerId: clientId
        };
        const result = await APICallerDel<any, any>(
            DeleteManagerURL,
            body,
            loginMetadata,
            "Client/DeleteManager"
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