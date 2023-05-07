// import {
//   IonRow,
//   IonCol,
//   IonImg,
//   IonButton,
//   IonGrid,
//   IonIcon,
//   IonInput,
//   IonPopover,
//   IonSegment,
// } from "@ionic/react";
// import line from "../../../Assets/Images/Line.png"
// import { close } from 'ionicons/icons';
// interface RecruitPopoverProps {
//   showPopover: boolean;
//   setShowPopover: (value: boolean) => void;
//   nameInput:string;
//   emailInput:string;
//   email1Input:string;
// }

// const RecruitPopover: React.FC<RecruitPopoverProps> = ({
//   showPopover,
//   setShowPopover,
//   nameInput,
//   emailInput,
//   email1Input
// }) => {

//   return (
//       <IonPopover isOpen={showPopover} onDidDismiss={() => { setShowPopover(false) }} class="ClientRewardsPopover3">
//       <IonGrid class='programManagementPopOverGrid'>
//           <IonRow class='ClientRewardsPopoverCloseButton'>
//               <IonIcon md={close} class="iconSize" size="large" onClick={() => { setShowPopover(false) }}></IonIcon>
//           </IonRow>

//           <IonRow>
//               <IonSegment mode="md" class="AdminPopTitle">
//                   Create Recruit Form
//               </IonSegment></IonRow>
//           <IonRow class="AdminName2">
//               Name
//           </IonRow>
//           <IonRow>
//               <IonCol>
//                   <IonInput value={nameInput} class="NameInputz" placeholder="Name" >
//                   </IonInput>
//                   <IonImg src={line} class="lineSize2" />
//               </IonCol>
//           </IonRow>
//           <IonRow>
//               <IonCol>
//                   <IonRow class="AdminName2">
//                       Email
//                   </IonRow>
//                   <IonRow>
//                       <IonCol>
//                           <IonInput value={emailInput} placeholder="email" class="NameInputz">
//                           </IonInput>
//                           <IonImg src={line} class="lineSize2" />
//                       </IonCol>
//                   </IonRow>
//               </IonCol>
//               <IonCol>
//                   <IonRow class="AdminName2">
//                       Email
//                   </IonRow>
//                   <IonRow>
//                       <IonCol>
//                           <IonInput value={email1Input} placeholder="Email" class="NameInputz">
//                           </IonInput><IonImg src={line} class="lineSize2" />
//                       </IonCol>
//                   </IonRow>
//               </IonCol>
//           </IonRow>
//           <IonRow class="borderset">
//               <IonGrid>

//               </IonGrid>
//           </IonRow>
//           <IonRow>
//               <IonSegment mode="md" >
//                   <IonButton fill="outline" class='ClientRewardsButton2' expand="full">
//                       Confirm
//                   </IonButton>
//               </IonSegment>
//           </IonRow>
//       </IonGrid>
//   </IonPopover>
//   );
// };
// export default RecruitPopover;


import {
  IonPopover,
  IonGrid,
  IonRow,
  IonIcon,
  IonSegment,
  IonCol,
  IonInput,
  IonImg,
  IonItem,
  IonLabel,
  IonButton,
  IonToggle,
  IonContent,
} from "@ionic/react";
import { useState } from "react";
import { LoginMetadata } from "../../Models/LoginMetadata";
// import "../../Styles/ClientManage.css";
import "../../../Admin/Styles/AdminManagement.css"
import ImageUpload from ".././ImageUpload";
import Loading from ".././Loading";
import { close } from "ionicons/icons";
import line from "../../../Assets/Images/Line.png";
import defaultImage from "../../../Assets/Images/campaignDeafult.png";
import ManagerDetails from "../../Models/ManagerDetails";
import { isStringEmpty } from "../../../Util/BasicUtilityFunctions";

interface AddManagerPopoverProps {
  manager: ManagerDetails;
  showPopover: boolean;
  setShowPopover: (value: boolean) => void;
  setManager: (value: ManagerDetails) => void;
  isLoading: boolean;
  newManagerMode: boolean;
  createNewManager: () => void;
  updateManager: () => void;
  loginMetadata: LoginMetadata;
}

const AddManagerPopover: React.FC<AddManagerPopoverProps> = ({
  manager,
  showPopover,
  setShowPopover,
  setManager,
  isLoading,
  newManagerMode,
  createNewManager,
  updateManager,
  loginMetadata,
}) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const setFilePath = (value: string) => {
    manager.client_img = value;
  }
  return (
    <IonPopover
      isOpen={showPopover}
      onDidDismiss={() => {
        setShowPopover(false);
        setManager(new ManagerDetails());
      }}
      // class="AdminManagementPopover PopOverBorderRadiusAdjustment"
      id="addManagerPopover"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <IonContent scrollX={true} scrollY={true}>
          <IonGrid class="programManagementPopOverGrid scrolling1">
            <IonRow class="AdminManagementPopoverCloseButton">
              <IonIcon
                md={close}
                class="iconSize"
                size="large"
                onClick={() => {
                  setShowPopover(false);
                }}
              ></IonIcon>
            </IonRow>
            <form onSubmit={newManagerMode ? createNewManager : updateManager}>
              <IonRow>
                <IonSegment mode="md" class="AdminPopTitle1">{newManagerMode ? "Add " : "Update "} Manager</IonSegment>
              </IonRow>
              <IonRow class="ion-text-center" style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
                {newManagerMode ? <ImageUpload
                  loginMetadata={loginMetadata}
                  ChangeFilePath={setFilePath}
                  filePath={manager.client_img}
                  id="clientProfilePicture"
                  filePathForUploading={"admin/admin" + loginMetadata.clientId.toString() + "/client/"}
                  isUploading={isUploading}
                  setIsUploading={setIsUploading}
                /> : <img src={isStringEmpty(manager.client_img) ? defaultImage : manager.client_img} style={{ height: 50, width: 50, borderRadius: "100%" }} />}
              </IonRow>
              <IonRow>
                <IonCol class="AdminName">First Name&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
                <IonCol class="AdminName">Last Name&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonInput
                    value={manager.first_name}
                    placeholder="First Name"
                    class="NameInput"
                    onIonChange={(e) => {
                      manager.first_name = e.detail.value ? e.detail.value : "";
                    }}
                    disabled={!newManagerMode}
                    required={true}
                  ></IonInput>
                  <IonImg src={line} class="lineSize" />
                </IonCol>
                <IonCol>
                  <IonInput
                    value={manager.last_name}
                    placeholder="Last Name"
                    class="NameInput"
                    onIonChange={(e) => {
                      manager.last_name = e.detail.value ? e.detail.value : "";
                    }}
                    required={true}
                    disabled={!newManagerMode}
                  ></IonInput>
                  <IonImg src={line} />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol class="AdminName">Email&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
                {/* <IonCol class="AdminName">Phone number</IonCol> */}
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonInput
                    value={manager.email}
                    placeholder="example@example.com"
                    class="NameInput"
                    onIonChange={(e) => {
                      manager.email = e.detail.value ? e.detail.value : "";
                    }}
                    required={true}
                    type="email"
                    disabled={!newManagerMode}
                  ></IonInput>
                  <IonImg src={line} class="lineSize" />
                </IonCol>
              </IonRow>
              <IonRow class="packageName">
                <IonCol>
                  <IonItem lines="none">
                    <IonLabel>Active</IonLabel>
                    <IonToggle
                      class="toggleChecked"
                      checked={manager.active}
                      onIonChange={(e) => {
                        manager.active = e.detail.checked;
                      }}
                    ></IonToggle>
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem lines="none">
                    <IonLabel>Timeline</IonLabel>
                    <IonToggle
                      class="toggleChecked"
                      checked={manager.timeline}
                      onIonChange={(e) => {
                        console.log(e);
                        manager.timeline = e.detail.checked;
                      }}
                    ></IonToggle>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow class="packageName">
                <IonCol>
                  <IonItem lines="none">
                    <IonLabel>Campaigns</IonLabel>
                    <IonToggle
                      class="toggleChecked"
                      checked={manager.campaign}
                      onIonChange={(e) => {
                        console.log(e);
                        manager.campaign = e.detail.checked;
                      }}
                    ></IonToggle>
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem lines="none">
                    <IonLabel>Rewards</IonLabel>
                    <IonToggle
                      class="toggleChecked"
                      checked={manager.rewards}
                      onIonChange={(e) => {
                        console.log(e);
                        manager.rewards = e.detail.checked;
                      }}
                    ></IonToggle>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow class="packageName">
                <IonCol>
                  <IonItem lines="none">
                    <IonLabel>Leaderboard</IonLabel>
                    <IonToggle
                      class="toggleChecked"
                      checked={manager.leaderboard}
                      onIonChange={(e) => {
                        console.log(e);
                        manager.leaderboard = e.detail.checked;
                      }}
                    ></IonToggle>
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem lines="none">
                    <IonLabel>Calendar</IonLabel>
                    <IonToggle
                      class="toggleChecked"
                      checked={manager.calendar}
                      onIonChange={(e) => {
                        console.log(e);
                        manager.calendar = e.detail.checked;
                      }}
                    ></IonToggle>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonSegment mode="md">
                  <IonButton
                    fill="outline"
                    class="AdminManagementButton2 commonButton"
                    expand="full"
                    disabled={isUploading}
                    // onClick={newClientMode ? createNewClient : UpdateClient}
                    type="submit"
                  >
                    Confirm
                  </IonButton>
                </IonSegment>
              </IonRow>
            </form>
          </IonGrid>
        </IonContent>

      )}
    </IonPopover>
  );
};
export default AddManagerPopover;
