import {
  IonPopover,
  IonGrid,
  IonRow,
  IonIcon,
  IonSegment,
  IonCol,
  IonInput,
  IonImg,
  IonRadioGroup,
  IonItem,
  IonLabel,
  IonRadio,
  IonButton,
  IonTextarea,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { LoginMetadata } from "../Models/LoginMetadata";
import "../Styles/AdminManagement.css";
import ImageUpload from "./ImageUpload";
import Loading from "./Loading";
import { close } from "ionicons/icons";
import line from "../../Assets/Images/Line.png";
import AmbassdorDetails from "../Models/AmbassdorDetails";

interface CreateUpdateAmbassdorProps {
  ambassdor: AmbassdorDetails;
  showPopover: boolean;
  setShowPopover: (value: boolean) => void;
  setAmbassdor: (value: AmbassdorDetails) => void;
  isLoading: boolean;
  newAmbassdorMode: boolean;
  createNewAmbassdor: () => void;
  UpdateAmbassdor: () => void;
  loginMetadata: LoginMetadata;
}

const CreateUpdateAmbassdor: React.FC<CreateUpdateAmbassdorProps> = ({
  ambassdor,
  showPopover,
  setShowPopover,
  setAmbassdor,
  isLoading,
  newAmbassdorMode,
  createNewAmbassdor,
  UpdateAmbassdor,
  loginMetadata,
}) => {
  const [update, setUpdate] = useState(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const changeFilePath = (value: string) => {
    ambassdor.ambassador_img = value;
    setUpdate(update + 1);
  }
  return (
    <IonPopover
      isOpen={showPopover}
      onDidDismiss={() => {
        setShowPopover(false);
        setAmbassdor(new AmbassdorDetails());
      }}
      class="AdminManagementPopover PopOverBorderRadiusAdjustment"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <IonGrid class="programManagementPopOverGrid">
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
          <form onSubmit={newAmbassdorMode ? createNewAmbassdor : UpdateAmbassdor}>
            <IonRow>
              <IonSegment mode="md" class="AdminPopTitle1">{newAmbassdorMode ? "Add " : "Update "} Ambassdor</IonSegment>
            </IonRow>
            <IonRow class="ion-text-center" style={{ marginBottom: "20px" }}>
              <ImageUpload
                loginMetadata={loginMetadata}
                ChangeFilePath={changeFilePath}
                filePath={ambassdor.ambassador_img}
                id="AmbassdorProfilePicture"
                filePathForUploading={"admin/admin" + loginMetadata.id.toString() + "/ambassador/"}
                isUploading={isUploading}
                setIsUploading={setIsUploading}

              />
            </IonRow>

            <IonRow>
              <IonCol class="AdminName">First Name&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
              <IonCol class="AdminName">Last Name&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput
                  value={ambassdor.first_name}
                  placeholder="First Name"
                  class="NameInput"
                  onIonChange={(e) => {
                    ambassdor.first_name = e.detail.value ? e.detail.value : "";
                    setUpdate(update + 1);
                  }}
                  required={true}
                ></IonInput>
                <IonImg src={line} class="lineSize" />
              </IonCol>
              <IonCol>
                <IonInput
                  value={ambassdor.last_name}
                  placeholder="Last Name"
                  class="NameInput"
                  onIonChange={(e) => {
                    ambassdor.last_name = e.detail.value ? e.detail.value : "";
                    setUpdate(update + 1);
                  }}
                  required={true}
                ></IonInput>
                <IonImg src={line} />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol class="AdminName">Email&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
              <IonCol class="AdminName">URL</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput
                  value={ambassdor.email}
                  placeholder="example@example.com"
                  class="NameInput"
                  onIonChange={(e) => {
                    ambassdor.email = e.detail.value ? e.detail.value : "";
                    setUpdate(update + 1);
                  }}
                  type="email"
                  required={true}
                ></IonInput>
                <IonImg src={line} class="lineSize" />
              </IonCol>
              <IonCol>
                <IonInput
                  value={ambassdor.url}
                  placeholder="URL"
                  class="NameInput"
                  onIonChange={(e) => {
                    ambassdor.url = e.detail.value ? e.detail.value : "";
                    setUpdate(update + 1);
                  }}
                  type="url"
                ></IonInput>
                <IonImg src={line} />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol class="AdminName">Country&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
              <IonCol class="AdminName">Industry&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput
                  value={ambassdor.country}
                  placeholder="Country"
                  class="NameInput"
                  onIonChange={(e) => {
                    ambassdor.country = e.detail.value ? e.detail.value : "";
                    setUpdate(update + 1);
                  }}
                  required={true}
                ></IonInput>
                <IonImg src={line} class="lineSize" />
              </IonCol>
              <IonCol>
                <IonInput
                  value={ambassdor.industry}
                  placeholder="Industry"
                  class="NameInput"
                  onIonChange={(e) => {
                    ambassdor.industry = e.detail.value ? e.detail.value : "";
                    setUpdate(update + 1);
                  }}
                  required={true}
                ></IonInput>
                <IonImg src={line} />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol class="AdminName">About</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonTextarea
                  placeholder="About"
                  autoGrow={true}
                  class="NameInput"
                  value={ambassdor.about}
                  onIonChange={(e) => {
                    ambassdor.about = e.detail.value ? e.detail.value : "";
                    setUpdate(update + 1);
                  }}
                  rows={1}
                  maxlength={250}
                ></IonTextarea>
                <IonImg src={line} class="lineSize" />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonSegment mode="md">
                <IonButton
                  fill="outline"
                  class="AdminManagementButton2 commonButton"
                  expand="full"
                  disabled={isUploading}
                  // onClick={newAmbassdorMode ? createNewAmbassdor : UpdateAmbassdor}
                  type='submit'
                >
                  Confirm
                </IonButton>
              </IonSegment>
            </IonRow>
          </form>
        </IonGrid>
      )}
    </IonPopover>
  );
};
export default CreateUpdateAmbassdor;
