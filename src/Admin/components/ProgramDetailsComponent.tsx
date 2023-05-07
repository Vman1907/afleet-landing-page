import {
  IonPopover,
  IonGrid,
  IonRow,
  IonIcon,
  IonCol,
  IonImg,
  IonLabel,
  IonSegment,
  IonButton,
} from "@ionic/react";
import { close } from "ionicons/icons";
import temp from "../../Assets/Images/campaignDeafult.png";
import ProgramDetails from "../Models/ProgramDetails";
import rewardVector from "../../Assets/Images/rewardVector.svg";
import websiteVector from "../../Assets/Images/websiteVector.svg";
import { isStringEmpty } from "../../Util/BasicUtilityFunctions";

interface ProgramDetailsComponentProps {
  showPopover: boolean;
  setShowPopover: (value: boolean) => void;
  selectedProgram: ProgramDetails;
  programLogin: (email: string, programId: number, programName: string, timeline: number, leaderboard: number, program_img: string, package_id: number, invite_ambassadors: number, prog_client_id: number) => void;
}

const ProgramDetailsComponent: React.FC<ProgramDetailsComponentProps> = ({
  showPopover,
  setShowPopover,
  selectedProgram,
  programLogin
}) => {
  return (
    <IonRow>
      <IonPopover
        isOpen={showPopover}
        onDidDismiss={() => {
          setShowPopover(false);
        }}
        class="programManagementPopover PopOverBorderRadiusAdjustment"
      >
        <IonGrid class="programManagementPopOverGrid">
          <IonRow class="programManagementPopoverCloseButton">
            <IonIcon
              class="iconSize"
              md={close}
              onClick={() => {
                setShowPopover(false);
              }}
              size="large"
            ></IonIcon>
          </IonRow>
          <IonRow>
            <IonCol size="1.5">
              <IonImg src={isStringEmpty(selectedProgram.program_img) ? temp : selectedProgram.program_img} class="programManagementPopoverImg"></IonImg>
            </IonCol>
            <IonCol class="programManagementPopoverName">
              <IonRow class="programManagementPopoverNameTitle">
                {selectedProgram.title}
              </IonRow>
              <IonRow class="programManagementPopoverNameEmail">
                {selectedProgram.email}
              </IonRow>
            </IonCol>
          </IonRow>
          <IonRow class="programManagementPopoverAboutTitle">About</IonRow>
          <IonRow class="programManagementPopoverAboutContent">
            {selectedProgram.description}
          </IonRow>
          <IonRow class="programManagementPopOverRow">
            <IonImg src={rewardVector} />
            &nbsp;&nbsp;
            <IonLabel class="programManagementPopoverrewardTitle">
              Max Reward-{" "}
            </IonLabel>
            <IonLabel class="programManagementPopoverrewardValue">
              {selectedProgram.max_reward}
            </IonLabel>
          </IonRow>
          <IonRow class="programManagementPopOverRow">
            <IonImg src={websiteVector} />
            &nbsp;&nbsp;
            <IonLabel class="programManagementPopoverrewardTitle">
              Website-{" "}
            </IonLabel>
            <IonLabel
              class="programManagementPopoverrewardValue underline"
              style={{ color: "#FFAD1A" }}
            >
              {selectedProgram.website_link}
            </IonLabel>
          </IonRow>
          <IonRow class="programManagementPopOverRow">
            <IonImg src={websiteVector} />
            &nbsp;&nbsp;
            <IonLabel class="programManagementPopoverrewardTitle">
              Blog-{" "}
            </IonLabel>
            <IonLabel class="programManagementPopoverrewardValue underline">
              {selectedProgram.community_group}
            </IonLabel>
          </IonRow>
          <IonRow class="programManagementPopOverRow">
            <IonImg src={websiteVector} />
            &nbsp;&nbsp;
            <IonLabel class="programManagementPopoverrewardTitle">
              Ambassador community link-{" "}
            </IonLabel>
            <IonLabel class="programManagementPopoverrewardValue underline">
              {selectedProgram.community_channel}
            </IonLabel>
          </IonRow>
          <IonRow class="programManagementPopOverButtonRow">
            <IonSegment mode="md">
              <IonButton
                class="ProgramManagementButton commonButton"
                fill="outline"
                style={{ width: 354 }}
                onClick={async () => {
                  await setShowPopover(false);
                  await programLogin(selectedProgram.email, selectedProgram.id, selectedProgram.title, selectedProgram.timeline, selectedProgram.leaderboard, selectedProgram.program_img, selectedProgram.package_id, selectedProgram.invite_ambassadors, selectedProgram.prog_client_id);
                }}
              >
                Login
              </IonButton>
            </IonSegment>
          </IonRow>
        </IonGrid>
      </IonPopover>
    </IonRow>
  );
};
export default ProgramDetailsComponent;
