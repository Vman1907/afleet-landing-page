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
import "../styles/AmbassadorCampaign.css";
import defaultImage from "../../Assets/Images/campaignDeafult.png";
import { useState } from "react";
import AmbaddsorRewardsModel from "../Models/AmbaddsorRewardsModel";
import AmbassdorRewardsService from "../Services/AmbassdorRewardsService";
import RewardView from "./Popevers/RewardView";

interface RewardCardProps {
  loginMetadata: LoginMetadata;
  rewardDetails: AmbaddsorRewardsModel;
}

const RewardCard: React.FC<RewardCardProps> = ({
  loginMetadata,
  rewardDetails,
}) => {
  const [showpop, setshowPopover] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [rewardstatus, setrewardStatus] = useState(rewardDetails.status);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);


  const UpdateRewardStatus = () => {
    AmbassdorRewardsService.RedeemRewardsList(loginMetadata, rewardDetails.id, rewardDetails.title).then((resp) => {
      if (resp.msg != null) { setAlertMessage(resp.msg); setShowAlert(true); }
      else {
        setAlertMessage("Reward Redemption Requested Again");
        setShowAlert(true);
        setrewardStatus(0);
      }
    }).catch(() => {
      setAlertMessage("Unable to Process request");
      setShowAlert(true);
    })
  }
  return (
    <IonCard class="campaignCard">
      <IonAlert isOpen={showAlert} message={alertMessage} onDidDismiss={() => { setShowAlert(false) }}></IonAlert>
      <IonAlert
        isOpen={showUpdateAlert}
        message="Are you sure You want to claim this reward Again?"
        onDidDismiss={() => {
          setShowUpdateAlert(false);
        }
        }
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Yes",
            handler: () => {
              UpdateRewardStatus();
            },
          },
        ]}
      />
      <RewardView
        loginMetadata={loginMetadata}
        showPopover={showpop}
        setShowPopover={setshowPopover}
        rewardDetails={rewardDetails}
      />
      <IonCardContent class="cardContent">
        <IonGrid>
          <IonRow class="mpAdjust">
            <IonCardSubtitle class="cardTitle cardSubtitle">{rewardDetails.points} RP</IonCardSubtitle>
          </IonRow>
          <IonRow>
            <IonThumbnail class="cardPic">
              <img
                src={
                  rewardDetails.reward_img
                    ? rewardDetails.reward_img != ""
                      ? rewardDetails.reward_img
                      : defaultImage
                    : defaultImage
                }
                className="cardPic2"
              />
            </IonThumbnail>
          </IonRow>
          <IonCardTitle class="cardRow cardTitle">
            {rewardDetails.title}
          </IonCardTitle>
          {rewardstatus === 0 ? (
            <IonCol>
              <IonRow class="buttonTag">
                <IonButton
                  disabled={true}
                  fill="solid"
                  class="cardButton2"
                >
                  Pending
                </IonButton>
              </IonRow>
              <IonRow>
                <IonButton
                  expand="block"
                  fill="clear"
                  class="cardButton detailsButton"
                  onClick={() => { setshowPopover(true) }}
                >
                  Details
                </IonButton>
              </IonRow>
            </IonCol>
          ) : rewardstatus === 1 ? (
            <IonCol>
              <IonRow class="buttonTag">
                <IonButton disabled={true} fill="solid" class="cardButton2" >
                  Claimed{" "}
                </IonButton>
              </IonRow>
              <IonRow>
                <IonButton
                  expand="block"
                  fill="clear"
                  class="cardButton detailsButton"
                  onClick={() => { setshowPopover(true) }}
                >
                  Details
                </IonButton>
              </IonRow>
            </IonCol>
          ) : rewardstatus === 2 ? (
            <IonCol>
              <IonRow >
                <IonButton onClick={() => {
                  setShowUpdateAlert(true);
                }} fill="outline" class="cardButton">
                  Rejected
                </IonButton>
              </IonRow>
              <IonRow>
                <IonButton
                  expand="block"
                  fill="clear"
                  class="cardButton detailsButton"
                  onClick={() => { setshowPopover(true) }}
                >
                  Details
                </IonButton>
              </IonRow>
            </IonCol>
          ) : (
            <IonCol>
              <IonRow>
                <IonButton
                  fill="outline"
                  class="cardButton"

                  onClick={() => {
                    AmbassdorRewardsService.RedeemRewardsList(loginMetadata, rewardDetails.id, rewardDetails.title)
                      .then((resp) => {
                        if (resp.msg != null) {
                          setAlertMessage(resp.msg);
                          setShowAlert(true);
                        }
                        else {
                          setAlertMessage("Reward Redemption Requested");
                          setShowAlert(true);
                          setrewardStatus(0);
                        }
                      }).catch(() => {
                        setAlertMessage("Unable to Process request");
                        setShowAlert(true);
                      })
                  }}
                >
                  Redeem Now
                </IonButton>
              </IonRow>
              <IonRow>
                <IonButton
                  expand="block"
                  fill="clear"
                  class="cardButton detailsButton"
                  onClick={() => { setshowPopover(true) }}
                >
                  Details
                </IonButton>
              </IonRow>
            </IonCol>
          )}
        </IonGrid>
      </IonCardContent>
    </IonCard >
  );
};
export default RewardCard;

function componentDidMount() {
  throw new Error("Function not implemented.");
}
