import { LoginMetadata } from "./LoginMetadata";

import { socialList } from "./socialList";

export class CreateClient {
    public id: number = -1;
    public title: string = "";
    public description: string = "";
    public start_date: string = "";
    public end_date: string = "";
    public campaign_img: string = "";
    public points: string = "";
    public status: string = "Custom";
    public task_number: string = "1";
    public program_id: number = -1;
    public archeived: boolean = false;
    public automatic: number = 0;
    public platform: number = -1;

    public custom_task: socialList[] = [];
}