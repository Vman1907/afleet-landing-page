import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
} from "@ionic/react";
import TopComponent from "../components/TopComponent";
import { LoginMetadata } from "../Models/LoginMetadata";
import error from "../../Assets/Images/error.png";
interface AdminDashboardProps {
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}
const AdminError: React.FC<AdminDashboardProps> = ({
  loginMetadata,
  loginfunction,
}) => {
  return (
    <IonPage>
      <IonCard class="backgroundAdjustment" style={{ background: "#E5E5E5" }}>
        <IonContent>
          <TopComponent
            searchText=""
            setSearchText={() => {}}
            loginMetadata={loginMetadata}
            loginfunction={loginfunction}
          />
          <IonCardContent class="marginForContent">
            <IonGrid>
              <IonRow>
                <IonSegment mode="md">
                  <IonImg className="errorImg" src={error}></IonImg>
                </IonSegment>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonContent>
      </IonCard>
    </IonPage>
  );
};
export default AdminError;
