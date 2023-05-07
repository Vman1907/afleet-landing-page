import { AmbassadorCampaign } from "./AmbassadorCampaign";

export class AmbassadorManageDetail {
    public id:number=-1;
    public first_name: string = "";
    public last_name: string = "";
    public email: string = "";
    public end_date: string ="";
    public status: string = "";
    public title: string ="";
    public mailing_country:string="";
    public total_points:string="";
    public amb_program_id:number=-1;
    public campaign_enrolled: AmbassadorCampaign[] = [];
}