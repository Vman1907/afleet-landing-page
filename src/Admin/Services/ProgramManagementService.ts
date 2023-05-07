import {
  CreateProgramURL,
  DeleteAProgramPermURL,
  DeleteAProgramURL,
  GetPackageClientListURL,
  GetPackageListURL,
  GetProgramDetailsURL,
  UpdatePlanURL,
  UpdateProgramURL,
} from "../Constants/AdminConfig";
import ProgramDetails from "../Models/ProgramDetails";
import { LoginMetadata } from "../Models/LoginMetadata";
import {
  APICallerDel,
  APICallerGet,
  APICallerPost,
  APICallerPut,
} from "../../Services/BaseService";
import ProgramDetailsResponse from "../Models/ProgramDetailsResponse";
import PackageClientListResponse from "../Models/PackageClientListResponse";
import { convertToUTC } from "../../Util/BasicUtilityFunctions";

export default class ProgramManagementService {
  public static async GetProgramList(
    loginMetadata: LoginMetadata,
    forceRefresh: boolean
  ) {
    // const ProgramList: ProgramDetailsResponse = new ProgramDetailsResponse();
    // var Program = new ProgramDetails();
    // Program.title = "First Program";
    // Program.email = "abs@gmail.com";
    // Program.id = 1;
    // Program.description =
    //   "Est quisquam dolores. Qui et quaerat et. Consequatur numquam quidem in accusamus omnis. Voluptatem nulla quisquam qui perferendis vel voluptate";
    // Program.rewardPoints = "1600";
    // Program.website = "https://google.com";
    // Program.blog = "Http://blog";
    // Program.communityLink = "http://community";
    // ProgramList.programList.push(Program);
    // Program = new ProgramDetails();
    // Program.title = "Second Program";
    // Program.email = "abs@gmail.com";
    // Program.id = 2;
    // Program.description =
    //   "Est quisquam dolores. Qui et quaerat et. Consequatur numquam quidem in accusamus omnis. Voluptatem nulla quisquam qui perferendis vel voluptate";
    // Program.rewardPoints = "1600";
    // Program.website = "https://google.com";
    // Program.blog = "Http://blog2";
    // Program.communityLink = "http://community2";
    // ProgramList.programList.push(Program);
    // Program = new ProgramDetails();
    // Program.title = "Third Program";
    // Program.email = "abs@gmail.com";
    // Program.id = 3;
    // Program.description =
    //   "Est quisquam dolores. Qui et quaerat et. Consequatur numquam quidem in accusamus omnis. Voluptatem nulla quisquam qui perferendis vel voluptate";
    // Program.rewardPoints = "1600";
    // Program.website = "https://google.com";
    // Program.blog = "Http://blog3";
    // Program.communityLink = "http://community3";
    // ProgramList.programList.push(Program);
    // return ProgramList;
    const body = {};
    const result = await APICallerGet<ProgramDetailsResponse, any>(
      GetProgramDetailsURL,
      body,
      loginMetadata,
      "",
      !forceRefresh,
      0,
      true,
      "Program/CreateProgram"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async CreateProgram(
    program: any,
    loginMetadata: LoginMetadata
  ) {
    delete program.id;
    const body = {
      program: program,
      program_expiry: convertToUTC(program.expiry_date),
    };
    const result = await APICallerPost<any, any>(
      CreateProgramURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Admin/CreateAdmin"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async UpdateProgram(
    programDetails: ProgramDetails,
    loginMetadata: LoginMetadata
  ) {
    programDetails.expiry_date = convertToUTC(programDetails.expiry_date);
    const body = {
      program: programDetails,
    };

    const result = await APICallerPut<any, any>(
      UpdateProgramURL,
      body,
      loginMetadata,
      ""
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async GetPackageClientList(loginMetadata: LoginMetadata) {
    const body = {};
    const result = await APICallerGet<PackageClientListResponse, any>(
      GetPackageClientListURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      false,
      "admin/GetPackageClientList"
    )
      .then((resp) => {
        return resp;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async DeleteAProgramPerm(
    programId: number,
    loginMetadata: LoginMetadata
  ) {
    const body = { programId: programId };
    const result = await APICallerDel(
      DeleteAProgramPermURL,
      body,
      loginMetadata,
      "deleteingTheProgram"
    )
      .then((resp) => {
        return resp;
      })
      .catch((error: any) => {
        return error;
      });
    return result;
  }
  public static async DeleteAProgram(
    programId: number,
    loginMetadata: LoginMetadata
  ) {
    const body = {
      program: {
        id: programId
      }
    };
    const result = await APICallerDel(
      DeleteAProgramURL,
      body,
      loginMetadata,
      "deleteingTheProgram"
    )
      .then((resp) => {
        return resp;
      })
      .catch((error: any) => {
        return error;
      });
    return result;
  }

  public static async getPackageList(
    program: any,
    loginMetadata: LoginMetadata
  ) {
    const body = {
      package_id: program.package_id
    };
    const result = await APICallerPost<any, any>(
      GetPackageListURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Admin/GetPackages"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

  public static async PlanUpdate(
    program_id: any,
    package_id: any,
    loginMetadata: LoginMetadata
  ) {
    const body = {
      program_id: program_id,
      package_id: package_id,
    };
    const result = await APICallerPost<any, any>(
      UpdatePlanURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Admin/PlanUpdate"
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
