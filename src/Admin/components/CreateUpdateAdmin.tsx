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
} from "@ionic/react";
import { useState } from "react";
import {
  ImageExtensions,
  ProfilePhotoDirectory,
} from "../Constants/ImageUploadConstant";
import AdminDetails from "../Models/AdminDetails";
import { LoginMetadata } from "../Models/LoginMetadata";
import "../Styles/AdminManagement.css";
import ImageUpload from "./ImageUpload";
import Loading from "./Loading";
import { close } from "ionicons/icons";
import line from "../../Assets/Images/Line.png";

interface CreateUpdateAdminProps {
  admin: AdminDetails;
  showPopover: boolean;
  setShowPopover: (value: boolean) => void;
  setAdmin: (value: AdminDetails) => void;
  isLoading: boolean;
  newAdminMode: boolean;
  createNewAdmin: () => void;
  UpdateAdmin: () => void;
  loginMetadata: LoginMetadata;
}

const CreateUpdateAdmin: React.FC<CreateUpdateAdminProps> = ({
  admin,
  showPopover,
  setShowPopover,
  setAdmin,
  isLoading,
  newAdminMode,
  createNewAdmin,
  UpdateAdmin,
  loginMetadata,
}) => {
  const [update, setUpdate] = useState(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const setFilePath = (value: string) => {
    admin.admin_img = value;
    setUpdate(update + 1);
  }
  return (
    <IonPopover
      isOpen={showPopover}
      onDidDismiss={() => {
        setShowPopover(false);
        setAdmin(new AdminDetails());
      }}
      class="AdminManagementPopover PopOverBorderRadiusAdjustment"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <IonGrid class="adminManagementPopOverGrid">
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
          <form onSubmit={newAdminMode ? createNewAdmin : UpdateAdmin}>
            <IonRow>
              <IonSegment mode="md" class="AdminPopTitle1">{newAdminMode ? "Add " : "Update "} Admin</IonSegment>
            </IonRow>
            <IonRow class="ion-text-center" style={{ marginBottom: "20px" }}>
              {/* <IonImg src={temp} style={{borderRadius:100,margin:"auto"}}></IonImg> */}
              <ImageUpload
                loginMetadata={loginMetadata}
                ChangeFilePath={setFilePath}
                filePath={admin.admin_img}
                id="adminProfilePicture"
                isUploading={isUploading}
                setIsUploading={setIsUploading}
                filePathForUploading={"admin/admin" + loginMetadata.id.toString() + "/admin/"}
              />
            </IonRow>

            <IonRow>
              <IonCol class="AdminName">First Name&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
              <IonCol class="AdminName">Last Name&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput
                  value={admin.first_name}
                  placeholder="First Name"
                  class="NameInput"
                  onIonChange={(e) => {
                    admin.first_name = e.detail.value ? e.detail.value : "";
                    setUpdate(update + 1);
                  }}
                  required={true}
                  type="text"

                ></IonInput>
                <IonImg src={line} class="lineSize" />
              </IonCol>
              <IonCol>
                <IonInput
                  value={admin.last_name}
                  placeholder="Last Name"
                  class="NameInput"
                  onIonChange={(e) => {
                    admin.last_name = e.detail.value ? e.detail.value : "";
                    setUpdate(update + 1);
                  }}
                  required={true}
                ></IonInput>
                <IonImg src={line} />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol class="AdminName">Email&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
              <IonCol class="AdminName">Phone number</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput
                  value={admin.email}
                  placeholder="example@example.com"
                  class="NameInput"
                  onIonChange={(e) => {
                    admin.email = e.detail.value ? e.detail.value : "";
                    setUpdate(update + 1);
                  }}
                  type="email"
                  required={true}
                ></IonInput>
                <IonImg src={line} class="lineSize" />
              </IonCol>
              <IonCol>
                <IonInput
                  value={admin.contact}
                  placeholder="Phone Number"
                  class="NameInput NumberInput"
                  type="number"
                  min="0"
                  onIonChange={(e) => {
                    admin.contact = e.detail.value ? e.detail.value : "";
                    setUpdate(update + 1);
                  }}
                ></IonInput>
                <IonImg src={line} />
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol class="AdminName">Country</IonCol>
              <IonCol class="AdminName">Super-Admin&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
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
            </IonRow>
            <IonRow>
              <IonSegment mode="md">
                <IonButton
                  fill="outline"
                  class="AdminManagementButton2 commonButton"
                  expand="full"
                  disabled={isUploading}
                  // onClick={newAdminMode ? createNewAdmin : UpdateAdmin}
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
export default CreateUpdateAdmin;
