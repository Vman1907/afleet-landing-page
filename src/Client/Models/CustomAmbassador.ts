import { TaskStatus } from "../../Ambassador/Constants/TaskStatusEnums";

export class CustomAmbassador {
    public FirstName: string = "";
    public lastName: string = "";
    public Title: string = "";
    public completionStatus: string = "";
    public amb_prog_id: number = -1;
    public amb_id: number = -1;
    public amb_total_points: number = -1;
    public amb_lifetime_points: number = -1;
    public ambassador_program_img: string = "";
    public ambassador_img: string = "";
    public updatedAt: string = "";
    public completion_link: string = "";
    public completion_status: TaskStatus = TaskStatus.INPROCESS;
}