import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonGrid,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { useEffect, useState } from "react";
import TopComponent from "../Components/TopComponent";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import ProgramDetails from "../Models/ProgramDetails";
import ProgramManagementService from "../Services/ProgramManagementService";
import "../styles/AmbassadorDashboard.css";
import PersonalSettingsTab from "../Components/PersonalSettingsTab";
import PaymentSettingTab from "../Components/PaymentSettingTab";

interface AmbassadorSettingsProps {
  name: string;
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}
const AmbassadorSettings: React.FC<AmbassadorSettingsProps> = ({
  name,
  loginMetadata,
  loginfunction,
}) => {
  const [searchText, setSearchText] = useState("");
  const [first, setFirst] = useState(0);
  const [programDetails, setProgramDetails] = useState(new ProgramDetails());
  const [change, setChange] = useState("");
  const [change1, setChange1] = useState("");

  useEffect(() => {
    document.title = "Settings - Afleet"
    console.log("render");
    GetProgramDetails(false);
  }, []);
  const GetProgramDetails = (forceRefresh: boolean) => {
    ProgramManagementService.GetProgramDetails(loginMetadata, forceRefresh)
      .then((resp: any) => {
        if (resp != null) setProgramDetails(resp);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <IonPage>
      <IonCard class="backgroundAdjustment" style={{ background: "#E5E5E5" }}>
        <IonContent scrollX={true} scrollY={true}>
          <TopComponent
            loginMetadata={loginMetadata}
            loginfunction={loginfunction}
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <IonCardContent class="marginForContent">
            <IonGrid class="scrolling">

              <IonRow class="dashboardName">Settings</IonRow>
              <IonSegment mode="md"
                value={first.toString()}
                class="ClientCampaignTab1"
              >
                <IonSegmentButton
                  value="0"
                  onClick={() => {
                    setFirst(0);
                  }}
                  defaultChecked={first.toString() == '0'}
                  class="ClientSegmentButton"
                >
                  <IonLabel>Profile Settings</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton
                  value="1"
                  onClick={() => {
                    setFirst(1);
                  }}
                  class="ClientSegmentButton"
                >
                  <IonLabel>Notification Settings</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton
                  value="2"
                  onClick={() => {
                    setFirst(2);
                  }}
                  class="ClientSegmentButton"
                >
                  <IonLabel>Payment and Wallet</IonLabel>
                </IonSegmentButton>
              </IonSegment>
              <IonGrid>
                <IonRow>
                  {first === 0 ? (
                    <PersonalSettingsTab
                      loginMetadata={loginMetadata}
                      searchText=""
                      programDetails={programDetails}
                      loginfunction={loginfunction}
                      setProgramDetails={setProgramDetails}
                      setChange={setChange}
                      setChange1={setChange1}
                    />
                  ) : first === 1 ? (
                    <IonCard class="settingsCard">
                      <IonCardHeader>
                        <IonCardTitle>Coming Soon !!</IonCardTitle>
                      </IonCardHeader>
                    </IonCard>

                  ) : (
                    <PaymentSettingTab loginMetadata={loginMetadata} programDetails={programDetails}
                      loginfunction={loginfunction}
                      setProgramDetails={setProgramDetails} />
                  )}
                </IonRow>
              </IonGrid>
            </IonGrid>
          </IonCardContent>
        </IonContent>
      </IonCard>
    </IonPage>
  );
};

export default AmbassadorSettings;
