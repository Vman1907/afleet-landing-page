import { CreateAmbassdorURL, GetAmbassdorDetailsURL, UpdateAmbassdorURL, LoginAsAmbassdorURL, GetProgramNameIdURL, CreateAmbassdorProgram, DeleteAmbassadorURL } from "../Constants/AdminConfig";
import AmbassdorDetails from "../Models/AmbassdorDetails";
import { LoginMetadata } from "../Models/LoginMetadata";
import { LoginMetadata as AmbassdorLginMetadata } from "../../Ambassador/Models/AmbassadorLoginMetadata"
import { APICallerDel, APICallerGet, APICallerPost, APICallerPut, PostFormData } from "../../Services/BaseService";
import AmbassdorListResponse from "../Models/AmbassdorListResponse";
import ProgramNameAndIdResponse from "../Models/ProgramNameAndIdResponse";

export default class AmbassdorManagementService {
  public static async GetAmbassdorList(loginMetadata: LoginMetadata, forceRefresh: boolean) {
    const body = {
    };
    const result = await APICallerGet<AmbassdorListResponse, any>(
      GetAmbassdorDetailsURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Ambassdor/GetAmbassdor"
    )
      .then((response) => {
        console.log("hey", response)
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async CreateAmbassdor(
    ambassdorDetail: any,
    loginMetadata: LoginMetadata,
  ) {
    delete ambassdorDetail.id;
    const body = {
      ambassador: ambassdorDetail
    }
    const result = await APICallerPost<any, any>(
      CreateAmbassdorURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      false,
      "ambassdor/create"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async UpdateAmbassdor(
    ambassdor: AmbassdorDetails,
    loginMetadata: LoginMetadata
  ) {
    const body = {
      ambassador: ambassdor,
    };
    const result = await APICallerPut<any, any>(
      UpdateAmbassdorURL,
      body,
      loginMetadata,
      "Admin/UpdateAmbassdor"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async AmbassdorLogin(
    loginMetadata: LoginMetadata,
    ambassdorEmail: string
  ) {
    const body = {
      email: ambassdorEmail,
    };
    const result = await APICallerPost<AmbassdorLginMetadata, any>(
      LoginAsAmbassdorURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Admin/CreateClient"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async GetProgramList(loginMetadata: LoginMetadata, forceRefresh: boolean) {
    const body = {
    };
    const result = await APICallerGet<ProgramNameAndIdResponse, any>(
      GetProgramNameIdURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Ambassdor/CreateAmbassdor"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
  public static async AssociateAmbassdorWithProgram(
    loginMetadata: LoginMetadata,
    ambassdorId: number,
    programId: number,
    title: string,
    email: string
  ) {
    const body = {
      ambassador_program: {
        email: email,
        ambassador_id: ambassdorId,
        program_id: programId,
        title: title
      }
    };
    const result = await APICallerPost<any, any>(
      CreateAmbassdorProgram,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Admin/associateAmbassador"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

  public static async DeleteAmbassador(
    loginMetadata: LoginMetadata,
    ambassadorId: number
  ) {
    const body = {
      ambassador: {
        id: ambassadorId
      }
    };
    const result = await APICallerDel<any, any>(
      DeleteAmbassadorURL,
      body,
      loginMetadata,
      "Admin/DeleteAmbassador"
    )
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => {
        throw error;
      });
    return result;
  }
}
