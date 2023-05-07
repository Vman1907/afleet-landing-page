import {
  IonRow,
  IonCol,
  IonSearchbar,
  IonLabel,
  IonPopover,
  IonItem,
} from "@ionic/react";
import { LoginMetadata } from "../Models/LoginMetadata";
import temp from "../../Assets/Images/campaignDeafult.png";
import { Redirect } from "react-router";
import { StorageService } from "../../Services/StorageService";
import Login from "../pages/Login";
import { useState } from "react";
import "../Styles/AdminDashboard.css";
import { isStringEmpty } from "../../Util/BasicUtilityFunctions";

interface TopComponentProps {
  loginMetadata: LoginMetadata;
  searchText: string;
  setSearchText: (value: string) => void;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}

const TopComponent: React.FC<TopComponentProps> = ({
  loginMetadata,
  searchText,
  setSearchText,
  loginfunction,
}) => {
  const [detail, setDetail] = useState<string>(
    loginMetadata.first_name + " " + loginMetadata.last_name
  );
  const [showPopOver, setShowPopover] = useState(false);
  const [logoutClicked, setLogoutClicked] = useState(false);
  if (detail === "logout") {
    StorageService.Logout("Admin");
    loginfunction(new LoginMetadata("-1"));
    return (
      <Redirect to="/admin">
        <Login loginfunction={loginfunction} />
      </Redirect>
    );
  }
  return (
    <div className="topComponentFixed">
      <IonPopover arrow={false}
        mode="ios"
        side="bottom"
        size="auto"
        id="logoutPopOver"
        class="selectionPopover" isOpen={showPopOver} onDidDismiss={() => {
          setShowPopover(false);
          if (logoutClicked) {
            setDetail("logout");
          }
        }}
        // trigger="topComponentDropDown"
        triggerAction="click">
        <IonItem
          lines='full'
        >
          &nbsp;&nbsp;{loginMetadata.first_name + " " + loginMetadata.last_name}
        </IonItem>
        <IonRow class='line' />
        <IonItem style={{ height: 40 }} onClick={() => { setShowPopover(false); setLogoutClicked(true) }}>
          &nbsp;&nbsp;Logout
        </IonItem>
      </IonPopover>
      <span style={{ width: "80%" }}>
        <IonRow class="searchbarBorder">
          <IonSearchbar mode="md"
            class="searchBar"
            value={searchText}
            onIonChange={(e) => {
              setSearchText(e.detail.value ? e.detail.value : "");
            }}

          ></IonSearchbar>
        </IonRow>
      </span>

      <span>
        <IonRow>
          <IonCol class="ion-text-end">
            <img className="topComponentImage" src={isStringEmpty(loginMetadata.admin_img) ? temp : loginMetadata.admin_img} />
          </IonCol>
          <IonCol>
            {/* <IonRow> */}
            <IonRow class="SelectionStyle">
              <IonLabel id="topComponentDropDown" onClick={() => {
                setShowPopover(true);
              }}>
                <IonLabel>{loginMetadata.first_name + " " + loginMetadata.last_name}&#9660;</IonLabel></IonLabel>
            </IonRow>
            <IonRow class="designation"><IonLabel>Admin</IonLabel></IonRow>
          </IonCol>
        </IonRow>
      </span>
    </div>
  );
};
export default TopComponent;
