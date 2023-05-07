export class LoginMetadata {
  public clientId: number = -1;
  public statusCode: number = 0;
  public status: boolean = false;
  public tokenString: string = "";
  public emailId: string = "";
  public first_name: string = "";
  public last_name: string = "";
  public program_id: number = -1;
  public program_name: string = "";
  public program_img: string = "";
  public client_img: string = "";
  public program_checkout_page: string = "";
  public program_expiry_date: string = "";
  public package_id: number = -1;
  public package_timeline: number = -1;
  public invite_ambassadors: number = -1;
  public package_leaderboard: number = -1;
  public role: number = -1;
  public mcalendar: boolean = true;
  public mcampaign: boolean = true;
  public mleaderboard: boolean = true;
  public mrewards: boolean = true;
  public mtimeline: boolean = true;
  public prog_client_id: number = -1;
  public isInstaToken: boolean = false;
  public isTwitterToken: boolean = false;
  constructor(token: string) {
    this.tokenString = token;
  }
}