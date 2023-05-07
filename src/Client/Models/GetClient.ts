import { CustomAmbassador } from "./CustomAmbassador";

export class GetClient {
    public id: number = -1;
    public amb_id: number = -1;
    public title: string = "";
    public campaign_reward_points: string = "";
    public total_submissions: string = "";
    public description: string = "";
    public start_date: string = "";
    public end_date: string = "";
    public campaign_img: string = "";
    public points: string = "";
    public status: string = "";
    public task_number: string = "1";
    public program_id: number = -1;
    public archeived: boolean = false;
    public automatic: number = 0;
    public amb_prog_id: number = -1;
    public amb_total_points: string = "";
    public amb_lifetime_points: string = "";
    public custom_camp_id: number = -1;
    public platform: number = -1;
    public campaign_url: string = "";
    public ambassador_enrolled: CustomAmbassador[] = [];
    public submissionsList: any = {};
    public reachArray: any = {};
    public update: boolean = false;
    public guidelines: String = "";
}