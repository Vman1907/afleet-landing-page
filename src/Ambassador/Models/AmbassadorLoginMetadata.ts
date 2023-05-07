export class LoginMetadata {
  public statusCode: number = 0;
  public id: number = -1;
  public ambassadorProgramId: number = -1;
  public ambassadorProgramImg: string = "";
  public programId: number = -1;
  public programName: string = "";
  public programEmail: string = "";
  public programImg: string = "";
  public status: boolean = false;
  public tokenString: string = "";
  public ambassador_img: string = "";
  public emailId: string = "";
  public role: string = "";
  public first_name: string = "";
  public last_name: string = "";
  public title: string = "";
  public points: string = "";
  constructor(token: string) {
    this.tokenString = token;
  }
  public package_timeline: number = -1;
  public package_leaderboard: number = -1;
  public amb_reward: boolean = true;
}
