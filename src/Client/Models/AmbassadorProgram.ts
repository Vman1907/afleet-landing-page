import CampaignforProgram from "./CampaignforProgram";

export class AmbassadorProgram {
    id: number = -1;
    ambassador_title: string = "";
    description: string = "";
    crypto_wallet: string = "";
    paypal_email: string = "";
    instagram_link: string = "";
    twitter_link: string = "";
    linkedin_link: string = "";
    website_link: string = "";
    email: string = "";
    ambassador_program_img: string = "";
    ambassador_img: string = "";
    total_points: number = 0;
    lifetime_points: number = 0;
    mailing_country: string = "";
    mailing_address: string = "";
    mailing_city: string = "";
    mailing_state: string = "";
    amb_reward: boolean = true;
    ambssador_program_id: number = -1;
    campaignList: CampaignforProgram[] = [];
}