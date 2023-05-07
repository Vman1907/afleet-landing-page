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
  IonAlert,
} from "@ionic/react";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import CampaignDetails from "../Models/CampaignDetails";
import "../styles/AmbassadorCampaign.css";
import "moment-timezone";
import moment from "moment-timezone";
import defaultImage from "../../Assets/Images/campaignDeafult.png";
import { CampaignStatus } from "../Constants/AmbassadorEnums";
import ProgramManagementService from "../Services/ProgramManagementService";
import TaskView from "./Popevers/TaskView";
import { useState } from "react";
import TaskList from "../Models/TaskList";
import { convertToLocale, convertToUTC } from "../../Util/BasicUtilityFunctions";
import { SocialCampaignPlatform } from "../../Client/Constants/CampaignStatusConstant";

interface CampaignCardProps {
  loginMetadata: LoginMetadata;
  campaignDetails: CampaignDetails;
  status: string;
  GetCampaignslist: (value: boolean) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  loginMetadata,
  campaignDetails,
  status,
  GetCampaignslist
}) => {
  const [showpop, setshowPopover] = useState(false);
  const [campaignstatus, setcampaignStatus] = useState(campaignDetails.completion_status);
  const [tasklist, setTaskList] = useState<TaskList[] | []>([]);
  const [alert, setAlert] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [message, setMessage] = useState("");
  const [alert1, setAlert1] = useState(false);
  const [alertMeassage, setAlertMessage] = useState("");
  const clickHandler = (id: number, status: number) => {
    ProgramManagementService.GetTaskDetails(loginMetadata, id, status)
      .then((resp: any) => {
        if (resp != null) {
          setTaskList(resp);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <IonCard class="campaignCard">
      <TaskView
        loginMetadata={loginMetadata}
        showPopover={showpop}
        setShowPopover={setshowPopover}
        campaignImage={campaignDetails.campaign_img}
        campaignName={campaignDetails.title}
        tasklist={tasklist}
        campaignst={campaignstatus}
        campaignDetails={campaignDetails}
        setCampaignStatus={setcampaignStatus}
        setAlert1={setAlert1}
        setAlertMessage={setAlertMessage}
        setAlert2={setAlert}
        setMessage={setMessage}
        setAlert3={setAlert2}
      />
      <IonAlert
        isOpen={alert1}
        message={alertMeassage}
        onDidDismiss={() => {
          setAlert1(false);
        }}
        backdropDismiss={true}
      ></IonAlert>
      <IonAlert
        isOpen={alert}
        message={message}
        onDidDismiss={() => {
          setAlert(false);
          setMessage("");
        }}
        backdropDismiss={true}
      ></IonAlert>
      <IonAlert
        isOpen={alert2}
        message="Campaign Completed"
        onDidDismiss={() => {
          setAlert2(false);
          GetCampaignslist(true);
        }}
        backdropDismiss={true}
      ></IonAlert>
      <IonCardContent class="cardContent">
        <IonGrid>
          {campaignstatus != CampaignStatus.COMPLETED && campaignDetails.difference <= 12 && campaignDetails.difference >= 0 ? <IonRow class="ion-text-end" style={{ justifyContent: "end", color: "#456086", fontWeight: "600" }}>*Expires in {campaignDetails.difference} hours</IonRow> : <IonRow style={{ height: "21px" }}></IonRow>}
          <IonRow>
            <IonThumbnail class="cardPic">
              <img
                src={
                  campaignDetails.campaign_img
                    ? campaignDetails.campaign_img != ""
                      ? campaignDetails.campaign_img
                      : defaultImage
                    : defaultImage
                }
                className="cardPic2"
              />
            </IonThumbnail>
          </IonRow>
          <IonCardTitle class="cardRow cardTitle">
            {campaignDetails.title}
          </IonCardTitle>
          <IonCardSubtitle class="cardSubtitle" style={{ fontSie: "0.8rem" }}>{campaignDetails.status == "Social" ? "Engagement" : campaignDetails.status}&nbsp;{"Campaign"}
            {
              campaignDetails.platform > 0 ?
                <span>
                  &nbsp;{", "}
                  {campaignDetails.platform == SocialCampaignPlatform.Twitter ? "Twitter" :
                    campaignDetails.platform == SocialCampaignPlatform.Instagram ? "Instagram" :
                      "Youtube"}
                </span> :
                <></>
            }
          </IonCardSubtitle>
          <IonRow class="cardRow mpAdjust">
            <IonCol size="8" class="cardColumn">
              <IonCardTitle class="cardTitle">
                {moment(convertToLocale(campaignDetails.start_date)).format("Do MMM")} -{" "}
                {moment(convertToLocale(campaignDetails.end_date)).format("Do MMM")}
              </IonCardTitle>
              <IonCardSubtitle class="cardSubtitle">Duration</IonCardSubtitle>
            </IonCol>
            <IonCol size="4" class="cardColumn">
              <IonCardTitle class="cardTitle">
                {campaignDetails.points} Points
              </IonCardTitle>
              <IonCardSubtitle class="cardSubtitle ion-text-center">
                RP
              </IonCardSubtitle>
            </IonCol>
          </IonRow>
          {campaignstatus === CampaignStatus.DEADLINED ? (
            <IonCol>
              <IonRow>
                <IonButton
                  disabled={status === "completed" ? true : false}
                  fill="outline"
                  class="cardButton"
                >
                  Participate Now
                </IonButton>
              </IonRow>
              <IonRow>
                <IonButton
                  expand="block"
                  fill="clear"
                  class="cardButton detailsButton"
                  onClick={() => { setshowPopover(true); clickHandler(campaignDetails.id, campaignDetails.completion_status) }}
                >
                  Details
                </IonButton>
              </IonRow>
            </IonCol>
          ) : campaignstatus === CampaignStatus.ONGOING ? (
            <IonCol>
              <IonRow class="buttonTag">
                <IonButton disabled fill="solid" class="cardButton2" >
                  Ongoing{" "}
                </IonButton>
              </IonRow>
              <IonRow>
                <IonButton
                  expand="block"
                  fill="clear"
                  class="cardButton detailsButton"
                  onClick={() => { setshowPopover(true); clickHandler(campaignDetails.id, campaignDetails.completion_status) }}
                >
                  Details
                </IonButton>
              </IonRow>
            </IonCol>
          ) : campaignstatus === CampaignStatus.COMPLETED ? (
            <IonCol>
              <IonRow class="buttonTag">
                <IonButton disabled fill="solid" class="cardButton2">
                  Completed
                </IonButton>
              </IonRow>
              <IonRow>
                <IonButton
                  expand="block"
                  fill="clear"
                  class="cardButton detailsButton"
                  onClick={() => { setshowPopover(true); clickHandler(campaignDetails.id, campaignDetails.completion_status) }}
                >
                  Details
                </IonButton>
              </IonRow>
            </IonCol>
          ) : (
            <IonCol>
              <IonRow>
                <IonButton
                  disabled={status === "completed" ? true : false}
                  fill="outline"
                  class="cardButton"

                  onClick={() => {
                    ProgramManagementService.InsertTaskDetails(loginMetadata, campaignDetails.id, convertToUTC(campaignDetails.start_date), convertToUTC(campaignDetails.end_date))
                      .then((resp) => {
                        const abc = true;
                        if (resp.msg != null) {
                          setMessage(resp.msg)
                          setAlert(true);
                        }
                        else {
                          setcampaignStatus(CampaignStatus.ONGOING);
                          campaignDetails.completion_status = CampaignStatus.ONGOING;
                        }

                      })
                  }}
                >
                  Participate Now
                </IonButton>
              </IonRow>
              <IonRow>
                <IonButton
                  expand="block"
                  fill="clear"
                  class="cardButton detailsButton"
                  onClick={() => { setshowPopover(true); clickHandler(campaignDetails.id, campaignDetails.completion_status) }}
                >
                  Details
                </IonButton>
              </IonRow>
            </IonCol>
          )}
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};
export default CampaignCard;

function componentDidMount() {
  throw new Error("Function not implemented.");
}
