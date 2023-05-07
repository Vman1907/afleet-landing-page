export class Completion {
    public completion_status: number = -1;
}

export class Leaderboard {
    public first_name: string = "";
    public last_name: string = "";
    public title: string = "";
    public total_points: number = 0;
    public lifetime_points: number = 0;
    public email: string = "";
    public mailing_country: string = "";
    public campaign_completed: Completion[] = [];
    public image: string = "";
    public ambassador_img: string = "";
    public rating: number = 0;
}

export class leaderboardResponse {
    public leadboardList: Leaderboard[] = [];
}