import {
  IonRow,
  IonCol,
  IonImg,
  IonButton,
  IonGrid,
  IonIcon,
  IonPopover,
  IonSegment,
  IonLabel,
  IonContent,
  IonInput,
} from "@ionic/react";
import { close } from "ionicons/icons";
import phone from "../../../Assets/Images/Phone.png";
import mail from "../../../Assets/Images/Mail.png";
import gaurav from "../../../Assets/Images/person.png";
import { menuController } from "@ionic/core";
import "../../Styles/ClientViewCampaign.css";
import { socialList } from "../../Models/socialList";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { CampaignTaskResponse } from "../../Models/CampaignTask";
import { GetClient } from "../../Models/GetClient";
import { Browser } from "@capacitor/browser";
import ClientAmbassadorService from "../../Services/ClienAmbassadorService";
import { LoginMetadata } from "../../Models/LoginMetadata";
import temp from "../../../Assets/Images/campaignDeafult.png";
import { SocialCampaignPlatform, SocialCampaignTaskType } from "../../Constants/CampaignStatusConstant";

interface ViewCampaignProps {
  showPopover: boolean;
  setShowPopover: (value: boolean) => void;
  TaskList: CampaignTaskResponse;
  setIsLoading2: (value: boolean) => void;
  setCampaignStatus: (value: string) => void;
  isLoading2: boolean;
  clientDetail: GetClient;
  loginMetadata: LoginMetadata;
  campaign_status: string;
  pos: number;
  GetAllPackage: (option: number) => void;
  option: number;
}

const ViewCampaign: React.FC<ViewCampaignProps> = ({
  showPopover,
  setShowPopover,
  TaskList,
  setIsLoading2,
  isLoading2,
  clientDetail,
  loginMetadata,
  campaign_status,
  setCampaignStatus,
  pos,
  GetAllPackage,
  option,
}) => {
  const openMenu = async () => {
    await menuController.open();
  };
  const [getSocialList, setSocialList] = useState(new socialList());
  const [checkReject, setCheckReject] = useState(false);
  const [completeCampaignCheck, setCompleteCampaignCheck] = useState(false);
  // const [completionStatus, setCompletionStatus] = useState(campaign_status);

  var showCompleteCampaignButton = true;
  const updateAmbassadorStatus = async (data: socialList) => {
    setIsLoading2(true);
    await ClientAmbassadorService.UpdateCampaignTaskStatus(
      loginMetadata,
      data.completion_status,
      data.ambassador_task_id,
      data.rejected_reason,
      clientDetail.end_date
    )
      .then(() => {
        setIsLoading2(false);
      })
      .catch((e) => {
        setIsLoading2(false);
      });
  };

  const updateCampaignStatus = async (data: GetClient) => {
    setIsLoading2(true);
    console.log(typeof (+data.amb_total_points + +data.points))
    console.log(typeof (data))
    await ClientAmbassadorService.UpdateCampaignStatus(
      loginMetadata,
      data.title,
      +data.ambassador_enrolled[pos].amb_total_points + +data.points,
      +data.ambassador_enrolled[pos].amb_lifetime_points + +data.points,
      data.ambassador_enrolled[pos].amb_id,
      data.program_id,
      data.ambassador_enrolled[pos].amb_prog_id,
      // data.amb_prog_id,
      data.custom_camp_id
    )
      .then(() => {
        setIsLoading2(false);
        setShowPopover(false);
        GetAllPackage(option);
        setCampaignStatus("1");
      })
      .catch((e) => {
        setIsLoading2(false);
      });
  };
  return (
    <span>
      <IonPopover
        isOpen={checkReject}
        backdropDismiss={true}
        onDidDismiss={() => {
          setCheckReject(false);
        }}
        class="finalPop3 "
      >
        <IonRow class="ClientCampaignPopoverCloseButton">
          <IonIcon
            md={close}
            class="iconSize"
            size="large"
            onClick={() => {
              setCheckReject(false);
            }}
          ></IonIcon>
        </IonRow>
        <form onSubmit={(e) => {
          getSocialList.completion_status = 3;
          updateAmbassadorStatus(getSocialList);
          setCheckReject(false);
          e.preventDefault();
        }}>
          <IonSegment mode="md" class="finalText2">
            Are you sure? You want to reject the
          </IonSegment>
          <IonSegment mode="md" class="finalText">task for ambassador?</IonSegment>

          <IonRow>
            <IonCol class="rejectCol" size="4">Reason for rejection&nbsp;:</IonCol>
            <IonCol class="urlColoumn">
              <IonInput
                placeholder="Reason for rejection"
                required={true}
                class="urlBox"
                onIonChange={(e) => {
                  e.detail.value == undefined
                    ? (getSocialList.rejected_reason = "")
                    : (getSocialList.rejected_reason = e.detail.value?.toString());
                }}
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonSegment mode="md" >
            <IonButton
              fill="outline"
              class="reviewButton"
              onClick={async () => {
                setCheckReject(false);
                Browser.open({
                  url: getSocialList.completion_link,
                });
              }}
            >
              Review Task
            </IonButton>

            <IonButton
              class="finalCancelButton2"
              fill="solid"
              // onClick={() => {
              //   getSocialList.completion_status = 3;
              //   updateAmbassadorStatus(getSocialList);
              //   setCheckReject(false);
              // }}
              type='submit'
            >
              Reject Anyway
            </IonButton>
          </IonSegment>
        </form>
      </IonPopover>

      <IonPopover
        isOpen={completeCampaignCheck}
        backdropDismiss={true}
        onDidDismiss={() => {
          setCompleteCampaignCheck(false);
        }}
        class="finalPop2"
      >
        <IonRow class="ClientCampaignPopoverCloseButton1">
          <IonIcon
            md={close}
            class="iconSize"
            size="large"
            onClick={() => {
              setCompleteCampaignCheck(false);
            }}
          ></IonIcon>
        </IonRow>

        <IonSegment mode="md" class="finalText2">
          Are you sure you want to complete
        </IonSegment>
        <IonSegment mode="md" class="finalText">tasks for ambassador?</IonSegment>
        <IonSegment mode="md">
          <IonButton
            fill="outline"
            class="reviewButton"
            onClick={async () => {
              setCompleteCampaignCheck(false);
            }}
          >
            Review Tasks
          </IonButton>

          <IonButton
            class="finalConfirmButton2"
            fill="solid"
            onClick={() => {
              updateCampaignStatus(clientDetail)
              setCampaignStatus("1")
              setCompleteCampaignCheck(false);
            }}
          >
            Complete Anyway
          </IonButton>
        </IonSegment>
      </IonPopover>

      <IonPopover
        isOpen={showPopover}
        id="popover-bottom3"
        backdropDismiss={true}
        onDidDismiss={() => {
          setShowPopover(false);
        }}
        color="#FFFDF9"
      >
        {isLoading2 ? (
          <Loading />
        ) : (
          <IonContent>
            <IonGrid>
              <IonRow>
                <IonIcon
                  md={close}
                  class="iconSize setCross"
                  size="large"
                  onClick={() => {
                    setShowPopover(false);
                  }}
                ></IonIcon>
              </IonRow>

              <IonRow class="taskContain">
                <IonCol size="3" class="ion-text-end">
                  <img src={clientDetail.campaign_img ? clientDetail.campaign_img : temp} className="ClientCampaignImage2" />
                </IonCol>
                <IonCol size="7" class="ion-text-start">
                  <IonRow class="taskTitle">{clientDetail.title}</IonRow>
                  <IonRow ><span className="infoType">{clientDetail.status}</span>
                    {
                      clientDetail.platform >= 0 ?
                        <div className="infoType1" >
                          {clientDetail.platform == SocialCampaignPlatform.Twitter ? "Twitter" :
                            clientDetail.platform == SocialCampaignPlatform.Instagram ? "Instagram" :
                              "Youtube"}
                        </div> :
                        <></>
                    }
                  </IonRow>
                </IonCol>
              </IonRow>

              {TaskList.custom_task.map((getSocialList, index) => {
                {
                  showCompleteCampaignButton = showCompleteCampaignButton && getSocialList.completion_status == 2;
                }
                return (
                  <IonGrid key={index}>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="1" class="ion-text-end indexStyle">
                          {index + 1}
                        </IonCol>
                        <IonCol class="ion-text-start taskTitle2" size="10">
                          {getSocialList.title}
                          {clientDetail.status == "Custom" || clientDetail.status == "UGC" ?

                            getSocialList.completion_status == 2 ? (
                              <span className="status2">
                                &nbsp;&nbsp;Approved&nbsp;&nbsp;
                              </span>
                            ) : getSocialList.completion_status == 3 ? (
                              <IonLabel class="inactiveStatus">
                                &nbsp;&nbsp;Rejected&nbsp;&nbsp;
                              </IonLabel>
                            ) : getSocialList.completion_status == 1 ? (
                              <IonLabel class="waitingStatus">
                                &nbsp;&nbsp;To be Verified&nbsp;&nbsp;
                              </IonLabel>
                            ) : null

                            : clientDetail.status == "Social" ?
                              getSocialList.completion_status == 2 ? (
                                <span className="status2">
                                  &nbsp;&nbsp;Task Completed&nbsp;&nbsp;
                                </span>
                              ) : getSocialList.completion_status == 0 ? (
                                <IonLabel class="waitingStatus">
                                  &nbsp;&nbsp;Task Pending&nbsp;&nbsp;
                                </IonLabel>
                              ) : null : null

                          }

                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol size="1" class="ion-text-end"></IonCol>
                        <IonCol class="ion-text-start" size="10">
                          {getSocialList.description}
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol size="1" class="ion-text-end"></IonCol>
                        <IonCol class="ion-text-start" size="10">
                          Link&nbsp;:&nbsp;&nbsp;
                          <a
                            className="linkDesign"
                            onClick={() => {
                              Browser.open({
                                url: getSocialList.link,
                              });
                            }}
                          >
                            {getSocialList.link}
                          </a>
                        </IonCol>
                      </IonRow>


                      <IonRow hidden={getSocialList.completion_link === null || (clientDetail.status != "Custom" && clientDetail.status != "UGC")}>
                        <IonCol size="1" class="ion-text-end"></IonCol>
                        <IonCol class="ion-text-start" size="10">
                          Submitted Link&nbsp;:&nbsp;&nbsp;
                          <a
                            className="linkDesign"
                            onClick={() => {
                              Browser.open({
                                url: getSocialList.completion_link,
                              });
                            }}
                          >
                            {getSocialList.completion_link}
                          </a>
                        </IonCol>
                      </IonRow>
                      <IonRow hidden={getSocialList.completion_status != 3 || (clientDetail.status != "Custom" && clientDetail.status != "UGC")}>
                        <IonCol size="1" class="ion-text-end"></IonCol>
                        <IonCol class="ion-text-start" size="10">
                          Rejected Reason&nbsp;:&nbsp;&nbsp;
                          <IonLabel>{getSocialList.rejected_reason}</IonLabel>
                        </IonCol>
                      </IonRow>
                      {clientDetail.status == "Custom" || clientDetail.status == "UGC" ?
                        getSocialList.completion_status == 1 ? (
                          <IonRow>
                            <IonCol size="1" class="ion-text-end"></IonCol>
                            <IonCol class="ion-text-start" size="10">
                              <IonButton
                                hidden={getSocialList.completion_link == null}
                                class="acceptButton2"
                                onClick={() => {
                                  getSocialList.completion_status = 2;
                                  updateAmbassadorStatus(getSocialList);
                                }}
                              >
                                {" "}
                                Approve
                              </IonButton>
                              <IonLabel>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</IonLabel>
                              <IonButton
                                hidden={getSocialList.completion_link == null}
                                class="rejectButton2"
                                onClick={() => {
                                  setSocialList(getSocialList);
                                  setShowPopover(false);
                                  setCheckReject(true);
                                }}
                              >
                                Reject
                              </IonButton>
                              <IonLabel>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</IonLabel>
                              <IonButton
                                hidden={getSocialList.completion_link == null}
                                class="ClientCampaignButton"
                                fill="clear"
                                onClick={() => {
                                  Browser.open({
                                    url: getSocialList.completion_link,
                                  });
                                }}
                              >
                                Open Link
                              </IonButton>
                            </IonCol>
                          </IonRow>
                        ) : null
                        : clientDetail.status == "Social" ?
                          <IonRow>
                            <IonCol size="1" class="ion-text-end"></IonCol>
                            <IonCol class="ion-text-start" size="10">
                              Task Type&nbsp;:&nbsp;&nbsp;
                              {getSocialList.task_type == SocialCampaignTaskType.Like ? "Like" :
                                getSocialList.task_type == SocialCampaignTaskType.Share ? "Share" :
                                  getSocialList.task_type == SocialCampaignTaskType.Follow ? "Follow" :
                                    "Comment"}
                            </IonCol>
                          </IonRow>
                          : null
                      }




                    </IonGrid>
                  </IonGrid>
                );
              })}
              {parseInt(campaign_status) === 1 ?
                <IonCol size="10" class="justify-content-end">
                  <IonSegment mode="md">
                    <IonButton
                      expand="block"
                      fill="outline"
                      class="cardButton1"
                    >
                      Campaign Completed
                    </IonButton>
                  </IonSegment>
                </IonCol>
                :
                <IonCol size="10" class="justify-content-end">
                  <IonSegment mode="md">
                    <IonButton
                      hidden={!showCompleteCampaignButton}
                      expand="block"
                      fill="outline"
                      class="cardButton1"
                      onClick={() => { setCompleteCampaignCheck(true) }}
                    >
                      Complete campaign for ambassador
                    </IonButton>
                  </IonSegment>
                </IonCol>
              }
            </IonGrid>
          </IonContent>
        )}
      </IonPopover>
    </span>
  );
};
export default ViewCampaign;
