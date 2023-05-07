import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import { APICallerPost } from "../../Services/BaseService";
import {
  GetAmbassadorLeaderboardURL,
} from "../Constants/AmbassadorConfig";
import { leaderboardResponse } from "../Models/Leaderboard";

export default class AmbassadorService {
  public static async leaderboardAmbassador(loginMetadata: any) {
    const body = { program_id: loginMetadata.programId };
    const result = await APICallerPost<leaderboardResponse, any>(
      GetAmbassadorLeaderboardURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "ambassador/Campaign"
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
