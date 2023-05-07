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
} from "@ionic/react";
import { useState } from "react";
import { LoginMetadata } from "../Models/LoginMetadata";
import "../Styles/AdminManagement.css";
import ImageUpload from "./ImageUpload";
import Loading from "./Loading";
import { close } from "ionicons/icons";
import line from "../../Assets/Images/Line.png";
import ClientDetails from "../Models/ClientDetails";

interface CreateUpdateClientProps {
  client: ClientDetails;
  showPopover: boolean;
  setShowPopover: (value: boolean) => void;
  setClient: (value: ClientDetails) => void;
  isLoading: boolean;
  newClientMode: boolean;
  createNewClient: () => void;
  UpdateClient: () => void;
  loginMetadata: LoginMetadata;
}

const CreateUpdateClient: React.FC<CreateUpdateClientProps> = ({
  client,
  showPopover,
  setShowPopover,
  setClient,
  isLoading,
  newClientMode,
  createNewClient,
  UpdateClient,
  loginMetadata,
}) => {
  const [update, setUpdate] = useState(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const setFilePath = (value: string) => {
    client.client_img = value;
    setUpdate(update + 1);
  }
  return (
    <IonPopover
      isOpen={showPopover}
      onDidDismiss={() => {
        setShowPopover(false);
        setClient(new ClientDetails());
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
          <form onSubmit={newClientMode ? createNewClient : UpdateClient}>
            <IonRow>
              <IonSegment mode="md" class="AdminPopTitle1">{newClientMode ? "Add " : "Update "} Client</IonSegment>
            </IonRow>
            <IonRow class="ion-text-center" style={{ marginBottom: "20px" }}>
              <ImageUpload
                loginMetadata={loginMetadata}
                ChangeFilePath={setFilePath}
                filePath={client.client_img}
                id="clientProfilePicture"
                filePathForUploading={"admin/admin" + loginMetadata.id.toString() + "/client/"}
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
                  value={client.first_name}
                  placeholder="First Name"
                  class="NameInput"
                  onIonChange={(e) => {
                    client.first_name = e.detail.value ? e.detail.value : "";
                    setUpdate(update + 1);
                  }}
                  required={true}
                ></IonInput>
                <IonImg src={line} class="lineSize" />
              </IonCol>
              <IonCol>
                <IonInput
                  value={client.last_name}
                  placeholder="Last Name"
                  class="NameInput"
                  onIonChange={(e) => {
                    client.last_name = e.detail.value ? e.detail.value : "";
                    setUpdate(update + 1);
                  }}
                  required={true}
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
                  value={client.email}
                  placeholder="example@example.com"
                  class="NameInput"
                  onIonChange={(e) => {
                    client.email = e.detail.value ? e.detail.value : "";
                    setUpdate(update + 1);
                  }}
                  required={true}
                  type="email"
                ></IonInput>
                <IonImg src={line} class="lineSize" />
              </IonCol>
              {/* <IonCol>
                <IonInput
                  value={admin.contact}
                  placeholder="Phone Number"
                  class="NameInput"
                  onIonChange={(e) => {
                    admin.contact = e.detail.value ? e.detail.value : "";
                    setUpdate(update + 1);
                  }}
                ></IonInput>
                <IonImg src={line} />
              </IonCol> */}
            </IonRow>

            {/* <IonRow>
              <IonCol class="AdminName">Country</IonCol>
              <IonCol class="AdminName">Super-Admin</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput
                  value={admin.country}
                  placeholder="Country"
                  class="NameInput"
                  onIonChange={(e) => {
                    admin.country = e.detail.value ? e.detail.value : "";
                    setUpdate(update + 1);
                  }}
                ></IonInput>
                <IonImg src={line} class="lineSize" />
              </IonCol>
              <IonCol>
                <IonRadioGroup
                  value={admin.superadmin == true ? "Yes" : "No"}
                  onIonChange={(e) => {
                    admin.superadmin = e.detail.value == "Yes" ? true : false;
                    setUpdate(update + 1);
                  }}
                >
                  <IonRow>
                    <IonCol class="radioButton">
                      <IonItem>
                        <IonLabel>Yes</IonLabel>
                        <IonRadio slot="start" value="Yes" class="radioColor" />
                      </IonItem>
                    </IonCol>
                    <IonCol class="radioButton">
                      <IonItem>
                        <IonLabel>No</IonLabel>
  
                        <IonRadio slot="start" value="No" class="radioColor" />
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonRadioGroup>
              </IonCol>
            </IonRow> */}
            <IonRow class="packageName">
              <IonCol size="6">
                <IonItem lines="none">
                  <IonLabel>Status</IonLabel>
                  <IonToggle
                    class="toggleChecked"
                    checked={client.status == 1 ? true : false}
                    onIonChange={(e) => {
                      console.log(e);
                      client.status = e.detail.checked ? 1 : 0;
                      setUpdate(update + 1);
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
      )}
    </IonPopover>
  );
};
export default CreateUpdateClient;
