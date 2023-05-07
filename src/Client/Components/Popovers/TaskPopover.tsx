import { IonAlert, IonButton, IonCardSubtitle, IonCol, IonContent, IonFooter, IonGrid, IonIcon, IonImg, IonInput, IonItemDivider, IonPopover, IonRow, IonSegment, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react"
import { closeOutline, list, text } from "ionicons/icons";
import defaultImage from "../../../Assets/Images/Ellipse.svg";
import { SocialCampaignTaskType } from "../../Constants/CampaignStatusConstant";
import { socialList } from "../../Models/socialList";
interface TaskPopoverProps {
    taskPop: boolean
    setTaskPop: (value: boolean) => void;
    task: socialList
}

const TaskPopover: React.FC<TaskPopoverProps> = (
    {
        taskPop,
        setTaskPop,
        task,
    }

) => {
    const onDidDismiss = () => {
        setTaskPop(false);
    }

    return (
        <IonPopover
            isOpen={taskPop}
            onDidDismiss={onDidDismiss}
            id="taskPopover"
        >
            <div style={{ padding: "0px 10px 10px 20px" }}>
                <IonRow class="justify-content-end" style={{ paddingTop: "5px" }}>
                    <IonIcon
                        icon={closeOutline}
                        class="setCross1 iconsize1"
                        size="large"
                        onClick={() => {
                            setTaskPop(false);
                        }}
                    ></IonIcon>
                </IonRow>
                <IonRow class="performanceTitle">
                    <span className="infoTaskImg"><img src={defaultImage} /></span>
                    <span style={{ fontWeight: 600, fontSize: "1.2rem" }}>{task.title}</span>
                </IonRow>
                <IonRow style={{ marginTop: "10px", fontWeight: 600 }}>
                    Description
                </IonRow>
                <IonRow class="infoTaskContent">
                    {task.description}
                </IonRow>
                <IonRow style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
                    <span>Link:&nbsp;</span>
                    <span className="infoTaskContent"><a href={task.link}>{task.link}</a></span>
                </IonRow>
                {task.task_type != -1 ? <IonRow style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
                    <span style={{ fontWeight: 600 }}>Task Type:&nbsp;</span>
                    <span className="infoTaskContent">{task.task_type == SocialCampaignTaskType.Like
                        ? "Like"
                        : task.task_type == SocialCampaignTaskType.Share
                            ? "Share"
                            : task.task_type == SocialCampaignTaskType.Follow
                                ? "Follow"
                                : task.task_type == SocialCampaignTaskType.Comment ? "Comment" : null}</span>
                </IonRow> : null}

            </div>
        </IonPopover >
    )
}

export default TaskPopover;