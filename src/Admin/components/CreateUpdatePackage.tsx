import {
  IonPopover,
  IonGrid,
  IonRow,
  IonIcon,
  IonSegment,
  IonInput,
  IonImg,
  IonCol,
  IonItem,
  IonLabel,
  IonToggle,
  IonButton,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { LoginMetadata } from "../Models/LoginMetadata";
import PackageDetails from "../Models/PackageDetails";
import Loading from "./Loading";
import { close } from "ionicons/icons";
import { useState } from "react";
import line from "../../Assets/Images/Line.png";

interface CreateUpdatePackageProps {
  showPopover: boolean;
  GetAllPackage: (forceRefresh: boolean) => void;
  loginMetadata: LoginMetadata;
  setShowPopover: (value: boolean) => void;
  isLoading: boolean;
  setPackageDetails: (value: PackageDetails) => void;
  packageDetails: PackageDetails;
  newPackageMode: boolean;
  createNewPackage: () => void;
  UpdatePackage: () => void;
}

const CreateUpdatePackage: React.FC<CreateUpdatePackageProps> = ({
  showPopover,
  GetAllPackage,
  loginMetadata,
  setShowPopover,
  isLoading,
  setPackageDetails,
  packageDetails,
  newPackageMode,
  createNewPackage,
  UpdatePackage,
}) => {
  const [update, setUpdate] = useState(0);
  return (
    <IonPopover
      isOpen={showPopover}
      onDidDismiss={() => {
        GetAllPackage(true);
        setShowPopover(false);
        setPackageDetails(new PackageDetails());
      }}
      class="PackageManagementPopover PopOverBorderRadiusAdjustment"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <IonGrid class="packageManagementPopOverGrid">
          <IonRow class="AdminManagementPopoverCloseButton">
            <IonIcon
              md={close}
              class="iconSize"
              size="large"
              onClick={() => {
                setShowPopover(false);
                setPackageDetails(new PackageDetails());
              }}
            ></IonIcon>
          </IonRow>

          <IonRow>
            <IonSegment mode="md" class="AdminPopTitle">{newPackageMode ? "Create Package" : "Update Package"}</IonSegment>
          </IonRow>
          <form onSubmit={newPackageMode ? createNewPackage : UpdatePackage}>
            <IonRow class="packageName">Name&nbsp;<span style={{ "color": "red" }}>*</span></IonRow>
            <IonRow>
              <IonInput
                value={packageDetails.title}
                class="NameInput"
                placeholder="Title"
                onIonChange={(e) => {
                  packageDetails.title = e.detail.value ? e.detail.value : "";
                  setUpdate(update + 1);
                }}
                required={true}
              ></IonInput>
            </IonRow>
            <IonRow>
              <IonImg src={line} class="ImagePop" />
            </IonRow>
            <IonRow>
              <IonCol class="packageName">Cost&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
              <IonCol class="packageName">Allowed Ambassdor&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput
                  value={packageDetails.price}
                  placeholder="0"
                  class="NameInput NumberInput"
                  type="number"
                  min="0"
                  onIonChange={(e) => {
                    packageDetails.price = e.detail.value ? e.detail.value : "";
                    setUpdate(update + 1);
                  }}
                  required={true}
                ></IonInput>
                <IonImg src={line} class="lineSize" />
              </IonCol>
              <IonCol>
                <IonInput
                  value={packageDetails.ambassador_count}
                  placeholder="1356336335"
                  class="NameInput NumberInput"
                  type="number"
                  min="0"
                  onIonChange={(e) => {
                    packageDetails.ambassador_count = e.detail.value
                      ? parseInt(e.detail.value)
                      : 0;
                    setUpdate(update + 1);
                  }}
                  required={true}
                ></IonInput>
                <IonImg src={line} />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol class="packageName">Allowed Campaigns&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
              <IonCol class="packageName">Allowed Managers&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput
                  value={packageDetails.allowed_campaign}
                  placeholder="0"
                  class="NameInput NumberInput"
                  type="number"
                  min="0"
                  onIonChange={(e) => {
                    packageDetails.allowed_campaign = e.detail.value
                      ? parseInt(e.detail.value)
                      : 0;
                    setUpdate(update + 1);
                  }}
                  required={true}
                ></IonInput>
                <IonImg src={line} class="lineSize" />
              </IonCol>
              <IonCol>
                <IonInput
                  value={packageDetails.allowed_managers}
                  placeholder="1356336335"
                  class="NameInput NumberInput"
                  type="number"
                  min="0"
                  onIonChange={(e) => {
                    packageDetails.allowed_managers = e.detail.value
                      ? parseInt(e.detail.value)
                      : 0;
                    setUpdate(update + 1);
                  }}
                  required={true}
                ></IonInput>
                <IonImg src={line} />
              </IonCol>
            </IonRow>
            <IonRow class="packageName">Description&nbsp;<span style={{ "color": "red" }}>*</span></IonRow>
            <IonRow>
              <IonInput
                value={packageDetails.description}
                class="NameInput"
                placeholder="Description"
                onIonChange={(e) => {
                  packageDetails.description = e.detail.value
                    ? e.detail.value
                    : "";
                  setUpdate(update + 1);
                }}
                maxlength={250}
                required={true}
              ></IonInput>
            </IonRow>
            <IonRow>
              <IonImg src={line} class="ImagePop" />
            </IonRow>
            <IonRow>
              <IonCol style={{paddingTop: 13}}>
                <IonLabel>Billing Frequency</IonLabel>
              </IonCol>
              <IonCol>
              <IonSelect disabled={newPackageMode != true} placeholder="Billing" value={packageDetails.frequency} onIonChange={(e)=>{packageDetails.frequency = e.detail.value;setUpdate(update+1)}}><IonSelectOption value={'w'}>Weekly</IonSelectOption><IonSelectOption value={'m'}>Monthly</IonSelectOption><IonSelectOption value={'y'}>Annually</IonSelectOption></IonSelect>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol style={{paddingTop: 13}}>
                <IonLabel>Trial Period</IonLabel>
              </IonCol>
              <IonCol>
                <IonRow>
                <IonCol>
                <IonInput value={packageDetails.trial_count}
                class="NameInput"
                placeholder="Description"
                // disabled={newPackageMode != true}
                style={{marginTop: 10}}
                onIonChange={(e) => {
                  packageDetails.trial_count = e.detail.value
                  ? parseInt(e.detail.value)
                  : 0;
                  setUpdate(update + 1);
                }}
                maxlength={250}
                required={true}/><IonImg src={line} class="lineSize" /></IonCol>
                <IonCol>
              <IonSelect placeholder="Unit" value={packageDetails.trial_unit} onIonChange={(e)=>{packageDetails.trial_unit = e.detail.value;setUpdate(update+1)}}><IonSelectOption value={'day'}>Days</IonSelectOption><IonSelectOption value={'month'}>Months</IonSelectOption></IonSelect>
              </IonCol>
              </IonRow>
              </IonCol>
              
            </IonRow>
            <IonRow class="packageName">
              <IonCol>
                <IonItem lines="none">
                  <IonLabel>Status</IonLabel>
                  <IonToggle
                    class="toggleChecked"
                    checked={packageDetails.status}
                    onIonChange={(e) => {
                      console.log(e);
                      packageDetails.status = e.detail.checked;
                      setUpdate(update + 1);
                    }}
                  ></IonToggle>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem lines="none">
                  <IonLabel>Timeline</IonLabel>
                  <IonToggle
                    class="toggleChecked"
                    checked={packageDetails.timeline}
                    onIonChange={(e) => {
                      console.log(e);
                      packageDetails.timeline = e.detail.checked;
                      setUpdate(update + 1);
                    }}
                  ></IonToggle>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow class="packageName">
              <IonCol>
                <IonItem lines="none">
                  <IonLabel>Referal Campaign</IonLabel>
                  <IonToggle
                    class="toggleChecked"
                    checked={packageDetails.referal_campaign}
                    disabled={true}
                    onIonChange={(e) => {
                      packageDetails.referal_campaign = e.detail.checked;
                      setUpdate(update + 1);
                    }}
                  ></IonToggle>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem lines="none">
                  <IonLabel>Custom Email</IonLabel>
                  <IonToggle
                    class="toggleChecked"
                    checked={packageDetails.custom_email}
                    onIonChange={(e) => {
                      packageDetails.custom_email = e.detail.checked;
                      setUpdate(update + 1);
                    }}
                  ></IonToggle>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow class="packageName">
              <IonCol>
                <IonItem lines="none">
                  <IonLabel>Custom Branding</IonLabel>
                  <IonToggle
                    class="toggleChecked"
                    checked={packageDetails.custom_branding}
                    onIonChange={(e) => {
                      packageDetails.custom_branding = e.detail.checked;
                      setUpdate(update + 1);
                    }}
                  ></IonToggle>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem lines="none">
                  <IonLabel>Leaderboard</IonLabel>
                  <IonToggle
                    class="toggleChecked"
                    checked={packageDetails.leaderboard}
                    onIonChange={(e) => {
                      packageDetails.leaderboard = e.detail.checked;
                      setUpdate(update + 1);
                    }}
                  ></IonToggle>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow class="packageName">
              <IonCol class="inviteToggle">
                <IonItem lines="none">
                  <IonLabel>Invite Ambassadors</IonLabel>
                  <IonToggle
                    class="toggleChecked"
                    checked={packageDetails.invite_ambassadors}
                    onIonChange={(e) => {
                      packageDetails.invite_ambassadors = e.detail.checked;
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
                  // onClick={newPackageMode ? createNewPackage : UpdatePackage}
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
export default CreateUpdatePackage;
