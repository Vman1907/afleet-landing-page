import { APICallerPost } from "../../Services/BaseService";
import { ReportsGraphURL, ReportsOverallURL, ReportsPerformerURL, ReportsProgramURL, ReportsRewardURL } from "../Constants/ClientConfig";
import { LoginMetadata } from "../Models/LoginMetadata";

export default class ClientReportsService {
    public static async GetReportProgram(loginMetadata: LoginMetadata) {
        const body = { program_id: loginMetadata.program_id };
        const result = await APICallerPost<any, any>(
            ReportsProgramURL,
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "client/ReportsProgram"
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
    public static async GetReportPerformer(loginMetadata: LoginMetadata) {
        const body = { program_id: loginMetadata.program_id };
        const result = await APICallerPost<any, any>(
            ReportsPerformerURL,
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "client/ReportsPerformer"
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
    public static async GetReportReward(loginMetadata: LoginMetadata, start_date: any, end_date: any) {
        const body = { program_id: loginMetadata.program_id, start_date: start_date, end_date: end_date };
        const result = await APICallerPost<any, any>(
            ReportsRewardURL,
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "client/ReportsReward"
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
    public static async GetReportOverall(loginMetadata: LoginMetadata, start_date: any, end_date: any) {
        const body = { program_id: loginMetadata.program_id, start_date: start_date, end_date: end_date };
        const result = await APICallerPost<any, any>(
            ReportsOverallURL,
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "client/ReportsOverall"
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
    public static async GetReportGraph(loginMetadata: LoginMetadata, start_date: any, end_date: any) {
        const body = { program_id: loginMetadata.program_id, start_date: start_date, end_date: end_date };
        const result = await APICallerPost<any, any>(
            ReportsGraphURL,
            body,
            loginMetadata,
            "",
            false,
            0,
            true,
            "client/ReportsGraph"
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