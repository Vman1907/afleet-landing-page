export class ProgramDetail {
    public id: number = -1;
    public title: string = "";
    public program_img: string = "";
    public checkout_page: string = "";
    public expiry_date: string = "";
    public package_id: number = -1;
    public timeline: number = -1;
    public leaderboard: number = -1;
    public invite_ambassadors: number = -1;
    public role: number = 0;
    public mcalendar: boolean = true;
    public mcampaign: boolean = true;
    public mleaderboard: boolean = true;
    public mrewards: boolean = true;
    public mtimeline: boolean = true;
    public prog_client_id: number = -1;
}

export class ProgramDetailsResponse {
    public programDetailList: ProgramDetail[] = [];
}