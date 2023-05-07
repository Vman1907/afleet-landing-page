import { CreateClient } from "./CreateClient";
import { socialList } from "./socialList";

export class CampaignTaskResponse {
    public custom_campaign:CreateClient=new CreateClient();
    public custom_task: socialList[] = [];
}