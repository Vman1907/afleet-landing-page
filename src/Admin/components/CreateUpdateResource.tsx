import {
    IonPopover,
    IonGrid,
    IonRow,
    IonIcon,
    IonImg,
    IonSegment,
    IonCol,
    IonInput,
    IonButton,
    IonTextarea,
  } from "@ionic/react";
  import Loading from "./Loading";
  import { close } from "ionicons/icons";
  import line from "../../Assets/Images/Line.png";
  import "../Styles/ProgramManagement.css";
  import { useState } from "react";
  import ImageUpload from "./ImageUpload";
  import { LoginMetadata } from "../Models/LoginMetadata";
import ResourceDetails from "../Models/ResourceDetails";
  interface CreateResourceProps {
    showPopover: boolean;
    loginMetadata: LoginMetadata
    setShowPopover: (value: boolean) => void;
    selectedResource: ResourceDetails;
    isLoading: boolean;
    createResource: () => void;
  }
  
  const CreateResource: React.FC<CreateResourceProps> = ({
    showPopover,
    loginMetadata,
    setShowPopover,
    selectedResource,
    isLoading,
    createResource
  }) => {
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const changeFilePath = (value: string) => {
      selectedResource.image_url = value;
    }
  
  
    return (
      <IonRow>
        <IonPopover
        isOpen={showPopover}
        onDidDismiss={() => {
            setShowPopover(false);
        }}
        class="ProgramManagementPopoverCreate PopOverBorderRadiusAdjustment"
      >
          {isLoading ? (
            <Loading />
          ) : (
            <IonGrid class="programManagementPopOverGridCreate">
              <IonRow class="AdminManagementPopoverCloseButton ion-text-end">
                <IonIcon
                  md={close}
                  class="iconSize"
                  size="large"
                  onClick={() => {
                    setShowPopover(false);
                  }}
                ></IonIcon>
              </IonRow>
              <form onSubmit={createResource}>
                <IonRow>
                  <IonSegment mode="md" class="AdminPopTitle1">{"Create Resource"}</IonSegment>
                </IonRow>
                <IonRow class="ion-text-center">
                  <ImageUpload
                    loginMetadata={loginMetadata}
                    filePath={selectedResource.image_url}
                    ChangeFilePath={changeFilePath}
                    id={"programImage"}
                    filePathForUploading={"admin/admin" + loginMetadata.id.toString() + "/program/"}
                    isUploading={isUploading}
                    setIsUploading={setIsUploading}
                  />
                </IonRow>
                <IonRow>
                <IonCol class="AdminName">
                  Title&nbsp;<span style={{ "color": "red" }}>*</span>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonInput
                    placeholder="Title"
                    class="NameInput"
                    value={selectedResource.title}
                    onIonChange={(e) => {
                      selectedResource.title = e.detail.value ? e.detail.value : "";
                    }}
                    required={true}
                  ></IonInput>
                  <IonImg src={line} class="lineSize" />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol class="AdminName">Description</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonTextarea
                    placeholder="Description"
                    rows={5}
                    class="NameInput"
                    value={selectedResource.description}
                    onIonChange={(e) => {
                      selectedResource.description = e.detail.value ? e.detail.value : "";

                    }}
                  ></IonTextarea>
                  <IonImg src={line} />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol class="AdminName">Resource URL</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonInput
                    placeholder="Resource URL"
                    class="NameInput"
                    value={selectedResource.link_to_resource}
                    onIonChange={(e) => {
                      selectedResource.link_to_resource = e.detail.value ? e.detail.value : "";

                    }}
                  ></IonInput>
                  <IonImg src={line} />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonSegment mode="md">
                  <IonButton
                    fill="outline"
                    class="AdminManagementButton2 commonButton"
                    expand="full"
                    disabled={isUploading}
                    // onClick={newProgramMode ? createProgram : updateProgram}
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
      </IonRow>
    );
  };
  export default CreateResource;
  