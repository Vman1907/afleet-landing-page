import {
  IonRow,
  IonCol,
  IonImg,
  IonButton,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonGrid,
  IonCardContent,
  IonThumbnail,
  IonSegment,
  IonInput,
  IonTitle,
  IonLabel,
} from "@ionic/react";
import { list } from "ionicons/icons";
import { useEffect, useState } from "react";
import line from "../../Assets/Images/Line.png";
import { SocialCampaignPlatform, SocialCampaignTaskType } from "../../Client/Constants/CampaignStatusConstant";
import { CampaignStatus } from "../Constants/AmbassadorEnums";
import { TaskStatus } from "../Constants/TaskStatusEnums";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import CampaignDetails from "../Models/CampaignDetails";
import TaskList from "../Models/TaskList";
import ProgramManagementService from "../Services/ProgramManagementService";
import AmbassadorSocialMediaService from "../Services/AmbassadorSocialMediaService";
import { StorageService } from "../../Services/StorageService";
import queryString from "query-string";
import { error } from "console";
import { isStringEmpty } from "../../Util/BasicUtilityFunctions";
import { AiTwotoneQuestionCircle } from "react-icons/ai";

interface TasksListProps {
  loginMetadata: LoginMetadata;
  count: number;
  list: TaskList;
  campaignst: number;
  campaignDetails: CampaignDetails;
  setShowPopover: (value: boolean) => void;
  setAlert: (value: boolean) => void;
  setAlert1: (value: boolean) => void;
  setAlertMessage: (value: string) => void;
  checkLastTask: () => void;

}

const TasksList: React.FC<TasksListProps> = ({
  loginMetadata,
  count,
  list,
  campaignst,
  campaignDetails,
  setShowPopover,
  setAlert,
  setAlert1,
  setAlertMessage,
  checkLastTask,
}) => {
  const [taskstatus, settaskStatus] = useState(list.completion_status);

  useEffect(() => {
    settaskStatus(list.completion_status);
  })

  const twitterLogin = async () => {
    await AmbassadorSocialMediaService.requestToken(loginMetadata);
  }

  return (
    <>
      <IonGrid class="taskGrid">
        {/* {length > 1 ? <IonRow class="taskTop">
          <IonCol size="1" class="ion-text-center indexStyle">
           <AiTwotoneQuestionCircle size={8} color="black" />
          </IonCol>
          <IonCol>
            <IonRow class="taskViewTitle">
              <IonCol class="ion-text-start taskTitle2" size="10">
                {list.title}
                {campaignDetails.status == "Custom" || campaignDetails.status == "UGC" ? (
                  taskstatus == 2 ? (
                    <span className="status2">
                      &nbsp;&nbsp;Approved&nbsp;&nbsp;
                    </span>
                  ) : taskstatus == 3 ? (
                    <IonLabel class="inactiveStatus">
                      &nbsp;&nbsp;Rejected&nbsp;&nbsp;
                    </IonLabel>
                  ) : taskstatus == 1 ? (
                    <IonLabel class="waitingStatus">
                      &nbsp;&nbsp;To be Verified&nbsp;&nbsp;
                    </IonLabel>
                  ) : null
                ) : campaignDetails.status == "Social" ? (
                  taskstatus == 2 ? (
                    <span className="status2">
                      &nbsp;&nbsp;Task Completed&nbsp;&nbsp;
                    </span>
                  ) : taskstatus == 0 ? (
                    <IonLabel class="waitingStatus">
                      &nbsp;&nbsp;Task Pending&nbsp;&nbsp;
                    </IonLabel>
                  ) : null
                ) : null}
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow> : null} */}
        <IonRow hidden={count > 0}><IonCol size='1'></IonCol><IonCol>Summary:&nbsp;&nbsp;<span className="rewardDetails">{isStringEmpty(campaignDetails.description) ? "N/A" : campaignDetails.description}</span></IonCol></IonRow>
        <IonRow hidden={count > 0}><IonCol size='1'></IonCol><IonCol>Guidelines:&nbsp;&nbsp;<span className="rewardDetails">{isStringEmpty(list.description) ? "N/A" : list.description}</span></IonCol></IonRow>
        <IonRow hidden={count > 0}>
          <IonCol size="1" class="ion-text-end"></IonCol>
          <IonCol class="ion-text-start" size="10">
            Link&nbsp;:&nbsp;&nbsp;
            <span className="rewardDetails">
              {isStringEmpty(list.link) ? "N/A" : <a href={list.link}>{list.link}</a>}</span>

          </IonCol>
        </IonRow>
        <IonRow
          hidden={
            list.completion_link == null || (campaignDetails.status != "Custom" && campaignDetails.status != "UGC")
          }
        >
          <IonCol size='1'></IonCol><IonCol>Submitted Link:&nbsp;&nbsp;<span className="rewardDetails"><a href={list.completion_link}>{list.completion_link}</a></span></IonCol>
        </IonRow>
        <IonRow hidden={
          taskstatus != 3 || (campaignDetails.status != "Custom" && campaignDetails.status != "UGC")
        }><IonCol size='1'></IonCol><IonCol>Reason for rejection:&nbsp;&nbsp;<span className="rewardDetails">{list.rejected_reason}</span></IonCol></IonRow>
        {campaignDetails.status == "Custom" || campaignDetails.status == "UGC" ? (
          campaignst === CampaignStatus.ONGOING &&
            (taskstatus === TaskStatus.PENDING ||
              taskstatus === TaskStatus.REJECTED) ? (
            <IonRow>
              <IonCol size="1"></IonCol>
              <IonCol size="8" class="urlColoumn">
                <IonInput
                  placeholder="Enter URL"
                  class="urlBox"
                  value={list.completion_link}
                  onIonChange={(e) => {
                    e.detail.value == undefined
                      ? (list.completion_link = "")
                      : (list.completion_link = e.detail.value?.toString());
                  }}
                ></IonInput>
              </IonCol>
              <IonCol size="2">
                <IonButton
                  fill="clear"
                  onClick={() => {
                    list.completion_status = 1;
                    ProgramManagementService.UpdateTaskLink(
                      loginMetadata,
                      list.program_task_id,
                      list.completion_link,
                      campaignDetails.automatic,
                    ).then(async (resp) => {
                      if (campaignDetails.automatic == 0) {
                        await settaskStatus(TaskStatus.INPROCESS);
                        list.completion_status = 1;
                      }
                      else if (campaignDetails.automatic == 1) {
                        await settaskStatus(2);
                        list.completion_status = 2;
                        checkLastTask();
                      }
                    });
                  }}
                >
                  Submit
                </IonButton>
              </IonCol>
            </IonRow>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        {campaignDetails.status == "Social" ? (
          <IonRow>
            <IonCol size="1" class="ion-text-center indexStyle">
              <AiTwotoneQuestionCircle size={8} color="black" />
            </IonCol>
            <IonCol>Task Type:&nbsp;&nbsp;<span className="rewardDetails">{list.task_type == SocialCampaignTaskType.Like
              ? "Like"
              : list.task_type == SocialCampaignTaskType.Share
                ? "Share"
                : list.task_type == SocialCampaignTaskType.Follow
                  ? "Follow"
                  : "Comment"}</span></IonCol>
          </IonRow>
        ) : null}
        {
          campaignDetails.status == "Social" ? list.task_type == SocialCampaignTaskType.Comment
            ? taskstatus === TaskStatus.PENDING ?
              <IonCardSubtitle class="taskViewSubtitle">
                <IonRow style={{ "height": "min-content" }}>
                  <IonCol size="1" class="ion-text-end" style={{ "height": "min-content" }}></IonCol>
                  <IonCol size="4.5" class="comment" style={{ "height": "min-content" }}>Write Your Comment&nbsp;:&nbsp;</IonCol>
                  <IonCol size="6.5" style={{ "height": "min-content" }}><IonInput
                    style={{ "height": "min-content", "padding-top": "0" }}
                    placeholder="Comment"
                    class="NameInput"
                    value={list.commentBody}
                    onIonChange={(e) => {
                      list.commentBody = e.detail.value ? e.detail.value : "";
                    }}
                  ></IonInput>
                    <IonImg src={line} class="lineSize" /></IonCol>
                </IonRow>
              </IonCardSubtitle>
              : <></> : <></> : <></>
        }
        {campaignDetails.status == "Social" ? (
          taskstatus === TaskStatus.PENDING ? (
            <IonRow>
              <IonCol size="1"></IonCol>
              <IonCol>
                <IonButton
                  fill="outline"
                  onClick={async () => {
                    if (campaignDetails.platform == SocialCampaignPlatform.Twitter) {
                      let postId: string;
                      let userName: string;
                      if (list.link.indexOf("?") == -1) {
                        postId = list.link.split("status/")[1];
                      }
                      else {
                        postId = list.link.substring(list.link.lastIndexOf("/") + 1, list.link.lastIndexOf("?"));
                      }
                      const oauth_access_token = await StorageService.Get("oauth_access_token");
                      if (!oauth_access_token) {
                        await twitterLogin();
                      }
                      const oauth_access_token_secret = await StorageService.Get("oauth_access_token_secret");
                      console.log(oauth_access_token);
                      console.log(oauth_access_token_secret);
                      if (list.task_type == SocialCampaignTaskType.Like) {
                        AmbassadorSocialMediaService.likeTask(
                          loginMetadata,
                          oauth_access_token,
                          oauth_access_token_secret,
                          postId,
                          list.custom_task_id,
                          campaignDetails.id
                        ).then((resp) => {
                          setAlertMessage(resp.message)
                          setAlert1(true);
                          settaskStatus(TaskStatus.APPROVED);
                          setShowPopover(false);
                          list.completion_status = 2;
                          checkLastTask();
                        });
                      } else if (list.task_type == SocialCampaignTaskType.Share) {
                        AmbassadorSocialMediaService.retweetTask(
                          loginMetadata,
                          oauth_access_token,
                          oauth_access_token_secret,
                          postId,
                          list.custom_task_id,
                          campaignDetails.id
                        ).then((resp) => {
                          setAlertMessage(resp.message)
                          setAlert1(true);
                          settaskStatus(TaskStatus.APPROVED);
                          setShowPopover(false);
                          list.completion_status = 2;
                          checkLastTask();
                        });
                      } else if (
                        list.task_type == SocialCampaignTaskType.Comment
                      ) {
                        if (isStringEmpty(list.commentBody)) {
                          setAlert(true);
                        }
                        else {
                          AmbassadorSocialMediaService.commentTask(
                            loginMetadata,
                            oauth_access_token,
                            oauth_access_token_secret,
                            postId,
                            list.commentBody,
                            list.custom_task_id,
                            campaignDetails.id
                          ).then((resp) => {
                            setAlertMessage(resp.message)
                            setAlert1(true);
                            settaskStatus(TaskStatus.APPROVED);
                            setShowPopover(false);
                            list.completion_status = 2;
                            checkLastTask();
                          });
                        }
                      } else {
                        if (list.link.indexOf("?") == -1) {
                          userName = list.link.split(".com/")[1];
                        }
                        else {
                          userName = list.link.substring(list.link.lastIndexOf("/") + 1, list.link.lastIndexOf("?"));
                        }
                        AmbassadorSocialMediaService.followTask(
                          loginMetadata,
                          oauth_access_token,
                          oauth_access_token_secret,
                          userName,
                          list.custom_task_id,
                          campaignDetails.id
                        ).then((resp) => {
                          setAlertMessage(resp.message)
                          setAlert1(true);
                          settaskStatus(TaskStatus.APPROVED);
                          setShowPopover(false);
                          list.completion_status = 2;
                          checkLastTask();
                        });
                      }
                    }

                  }}
                >
                  Click to Complete Task
                </IonButton>
              </IonCol>
            </IonRow>
          ) : taskstatus == TaskStatus.APPROVED ? (
            <span className="status2">
              &nbsp;&nbsp;Task Completed&nbsp;&nbsp;
            </span>
          ) : (<></>)
        ) : (
          <></>
        )}
      </IonGrid>
    </>
  );
};

export default TasksList;
