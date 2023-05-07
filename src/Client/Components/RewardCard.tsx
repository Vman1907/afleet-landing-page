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
  IonFooter,
  IonIcon,
} from "@ionic/react";
import defaultImage from "../../Assets/Images/campaignDeafult.png";
import { useState } from "react";
import { LoginMetadata } from "../Models/LoginMetadata";
import ClientReward from "../Models/ClientRewards";
import { AiOutlineEdit } from "react-icons/ai";
import { duplicateOutline } from "ionicons/icons";
import { IoArchiveOutline, IoDuplicateOutline, IoTrashBinOutline, IoTrashOutline } from "react-icons/io5";
import { BiArchive, BiCopy } from "react-icons/bi";
import Trophy from "../../Assets/Images/Vector.png";

interface RewardCardProps {
  loginMetadata: LoginMetadata;
  rewardDetails: ClientReward;
  setShowPopover: (value: boolean) => void;
  setShowDeleteAlert: (value: boolean) => void;
  setUpdateIndex: (value: number) => void;
  setReward: (value: ClientReward) => void;
  index: number
  filter: string;
  reward: ClientReward;
  updateReward: () => void;
  createNewReward: () => void;
}

const RewardCard: React.FC<RewardCardProps> = ({
  loginMetadata,
  rewardDetails,
  setShowPopover,
  setShowDeleteAlert,
  setReward,
  setUpdateIndex,
  index,
  filter,
  reward,
  updateReward,
  createNewReward
}) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showAlert1, setShowAlert1] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");



  return (
    <IonCard class="rewardCard">
      <IonAlert
        isOpen={showAlert}
        message="Are you sure You want to duplicate this reward"
        onDidDismiss={() => {
          setShowAlert(false);
        }
        }
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Yes",
            handler: () => {
              createNewReward();
            },
          },
        ]}
      />
      <IonAlert
        isOpen={showAlert1}
        message={"Are you sure You want to " + (filter == 'active' ? "Archive" : "Unarchive") + " this reward"}
        onDidDismiss={() => {
          setShowAlert1(false);
        }
        }
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Yes",
            handler: () => {
              reward.status = (filter != 'active');
              updateReward();
            },
          },
        ]}
      />
      <IonCardContent class="cardContent">
        <IonGrid>
          <IonRow class="rewardCardHead">
            <IonCol>
              <img src={Trophy} style={{ width: "25px" }}></img>&nbsp;RP&nbsp;&nbsp;{rewardDetails.points}
            </IonCol>
            <IonCol class="ion-text-end">
              <AiOutlineEdit
                title="Edit"
                color="#B2B2B2"
                size={20}
                className="ClientRewardsEdit"
                onClick={() => {
                  setUpdateIndex(index);
                  setReward(
                    Object.assign({}, rewardDetails)
                  );
                  setShowPopover(true);
                }}
              />
            </IonCol>
          </IonRow>
          <IonRow style={{ marginTop: "5px" }}>
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
          <IonCardTitle class="cardRow" style={{ fontSize: "14px" }}>
            {rewardDetails.title}
          </IonCardTitle>
          <IonRow class="cardRow rewardDescription">
            <IonCol class="cardColumn">
              <IonCardSubtitle class="cardSubtitle">{rewardDetails.description.substring(0, 100)}{rewardDetails.description.charAt(100) ? "    .....more" : null}</IonCardSubtitle>
            </IonCol>
          </IonRow>
          <IonRow class="cardRow">
            <IonCol class="ion-text-center">
              <BiCopy
                size={33}
                className="rewardCardButtons"
                title="Duplicate"
                onClick={() => {
                  setReward(Object.assign({}, rewardDetails));
                  setUpdateIndex(index);
                  setShowAlert(true);
                }}
              />
            </IonCol>
            <IonCol class="ion-text-center">
              <BiArchive
                size={33}
                className="rewardCardButtons"
                title={filter == 'active' ? "Archive" : "Unarchive"}
                onClick={() => {
                  setReward(Object.assign({}, rewardDetails));
                  setUpdateIndex(index);
                  setShowAlert1(true);
                }}
              />


            </IonCol>
            <IonCol class="ion-text-center">
              <IoTrashOutline
                size={33}
                className="rewardCardButtons"
                title="Delete"
                onClick={() => {
                  setReward(
                    Object.assign({}, rewardDetails)
                  );
                  setUpdateIndex(rewardDetails.id);
                  setShowDeleteAlert(true);
                }}
              />
            </IonCol>
          </IonRow>

        </IonGrid>
      </IonCardContent>
    </IonCard >
  );
};
export default RewardCard;

function componentDidMount() {
  throw new Error("Function not implemented.");
}
