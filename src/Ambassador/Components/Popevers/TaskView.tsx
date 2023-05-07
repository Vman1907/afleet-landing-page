import { IonAlert, IonButton, IonCardSubtitle, IonCol, IonContent, IonFooter, IonGrid, IonIcon, IonImg, IonInput, IonItemDivider, IonPopover, IonRow, IonSegment, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react"
import { closeOutline, list, text } from "ionicons/icons";
import "../../styles/AmbassadorCampaign.css";
import { LoginMetadata } from "../../Models/AmbassadorLoginMetadata";
import CampaignDetails from "../../Models/CampaignDetails";
import defaultImage from "../../../Assets/Images/campaignDeafult.png";
import TaskList from "../../Models/TaskList";
import { CampaignStatus } from "../../Constants/AmbassadorEnums";
import ProgramManagementService from "../../Services/ProgramManagementService";
import TasksList from "../TasksList";
import { convertToUTC, isStringEmpty } from "../../../Util/BasicUtilityFunctions";
import { SocialCampaignPlatform } from "../../../Client/Constants/CampaignStatusConstant";
import { useState } from "react";
interface TaskViewProps {
    loginMetadata: LoginMetadata;
    showPopover: boolean
    setShowPopover: (value: boolean) => void;
    campaignImage: string;
    campaignName: string;
    tasklist: any
    campaignst: number
    campaignDetails: CampaignDetails;
    setCampaignStatus: (value: number) => void;
    setAlert1: (value: boolean) => void;
    setAlert2: (value: boolean) => void;
    setAlert3: (value: boolean) => void;
    setAlertMessage: (value: string) => void;
    setMessage: (value: string) => void;
}

const TaskView: React.FC<TaskViewProps> = (
    {
        loginMetadata,
        showPopover,
        setShowPopover,
        campaignName,
        campaignImage,
        tasklist,
        campaignst,
        campaignDetails,
        setCampaignStatus,
        setAlert1,
        setAlertMessage,
        setMessage,
        setAlert2,
        setAlert3,
    }

) => {
    const onDidDismiss = () => {
        setShowPopover(false);
    }
    const [alert, setAlert] = useState(false);
    const checkLastTask = () => {
        let pending = false;
        tasklist.map((list: TaskList) => {
            if (list.completion_status != 2) {
                pending = true;
            }

        })
        if (!pending) {
            ProgramManagementService.UpdateCampaignStatus(loginMetadata, campaignDetails.title, campaignDetails.points, campaignDetails.id).then((resp) => {
                setShowPopover(false);
                setAlert3(true);
            })
        }
    }

    return (
        <IonPopover
            isOpen={showPopover}
            backdropDismiss={true}
            onDidDismiss={onDidDismiss}
            id="popover-bottom4"
        >
            <IonContent scrollX={true} scrollY={true}>
                <IonAlert
                    isOpen={alert}
                    message="Please Enter Comment"
                    onDidDismiss={() => {
                        setAlert(false);
                    }}
                    backdropDismiss={true}
                ></IonAlert>
                <IonGrid class="scrolling">
                    <IonRow class="justify-content-end">
                        <IonIcon
                            icon={closeOutline}
                            class="setCross1 iconsize1"
                            size="large"
                            onClick={() => {
                                setShowPopover(false);
                            }}
                        ></IonIcon>
                    </IonRow>
                    <IonRow class="taskHeading">
                        <IonCol style={{
                            minWidth: "60px",
                            maxWidth: "80px",
                            marginRight: "10px",
                        }}>

                            <img src={
                                campaignImage
                                    ? campaignImage != ""
                                        ? campaignImage
                                        : defaultImage
                                    : defaultImage

                            } className="cardPic3 cardPic1" />

                        </IonCol>
                        <IonCol>
                            <IonRow class="taskViewTitle" style={{ fontSize: "1rem" }}>{campaignName}</IonRow>
                            <IonRow class="taskViewSubtitle">{campaignDetails.status == "Social" ? "Engagement" : campaignDetails.status}&nbsp;{"Campaign"}
                                {
                                    campaignDetails.platform > 0 ?
                                        <span>
                                            &nbsp;{", "}
                                            {campaignDetails.platform == SocialCampaignPlatform.Twitter ? "Twitter" :
                                                campaignDetails.platform == SocialCampaignPlatform.Instagram ? "Instagram" :
                                                    "Youtube"}
                                        </span> :
                                        <></>
                                }</IonRow>
                            <IonRow><span className="status1">
                                &nbsp;&nbsp;{campaignDetails.automatic == 0 ? "Manual" : "Automatic"}&nbsp;&nbsp;
                            </span></IonRow>
                        </IonCol>
                    </IonRow>
                    <IonItemDivider></IonItemDivider>

                    {tasklist.map((list: TaskList, index: number) => {
                        return (
                            <TasksList
                                loginMetadata={loginMetadata}
                                count={index}
                                list={list}
                                campaignst={campaignst}
                                campaignDetails={campaignDetails}
                                setShowPopover={setShowPopover}
                                setAlert={setAlert}
                                setAlert1={setAlert1}
                                setAlertMessage={setAlertMessage}
                                checkLastTask={checkLastTask}
                            />
                        )
                    })
                    }
                </IonGrid>

            </IonContent>
            {campaignst === CampaignStatus.ONGOING
                ? <></>
                : campaignst === CampaignStatus.COMPLETED ?
                    <IonToolbar>
                        <IonGrid>
                            <IonCol size='1' class="ion-text-end" >
                            </IonCol>
                            <IonCol size="10" class="justify-content-end">
                                <IonSegment mode="md">
                                    <IonButton
                                        disabled
                                        expand="block" fill="outline" class="cardButton1">Campaign Completed</IonButton>
                                </IonSegment>
                            </IonCol>
                        </IonGrid>
                    </IonToolbar> :
                    <IonToolbar>
                        <IonGrid>
                            <IonCol size='1' class="ion-text-end" >
                            </IonCol>
                            <IonCol size="10" class="justify-content-end">
                                <IonSegment mode="md">
                                    <IonButton
                                        expand="block" fill="outline" class="cardButton1"
                                        onClick={() => {
                                            ProgramManagementService.InsertTaskDetails(loginMetadata, campaignDetails.id, convertToUTC(campaignDetails.start_date), convertToUTC(campaignDetails.end_date))
                                                .then((resp) => {
                                                    if (resp.msg != null) {
                                                        setMessage(resp.msg)
                                                        setAlert2(true);

                                                    }
                                                    else {
                                                        setCampaignStatus(CampaignStatus.ONGOING);
                                                        setShowPopover(false);
                                                        campaignDetails.completion_status = CampaignStatus.ONGOING;
                                                    }
                                                });
                                        }}>Participate Now</IonButton>
                                </IonSegment>
                            </IonCol>
                        </IonGrid>
                    </IonToolbar>
            }

        </IonPopover >
    )
}

export default TaskView;