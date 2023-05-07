export class LoginMetadata {
  public statusCode: number = 0;
  public status: boolean = false;
  public tokenString: string = "";
  public emailId: string = "";
  public role: string = "";
  public first_name: string = "";
  public last_name: string = "";
  public id: number = -1;
  public superadmin: number = -1;
  public admin_img: string = "";
  constructor(token: string) {
    this.tokenString = token;
  }
}
