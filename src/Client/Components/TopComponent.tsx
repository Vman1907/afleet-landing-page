import {
  IonRow,
  IonCol,
  IonSearchbar,
  IonItem,
  IonPopover,
  IonLabel,
} from "@ionic/react";
import { LoginMetadata } from "../Models/LoginMetadata";
import temp from "../../Assets/Images/campaignDeafult.png";
import { Redirect } from "react-router";
import { StorageService } from "../../Services/StorageService";
import Login from "../pages/Login";
import { useState } from "react";
import "../Styles/ClientDashboard.css"
import { isStringEmpty } from "../../Util/BasicUtilityFunctions";
import { Browser } from "@capacitor/browser";
import leaderbord from "./../../Assets/Images/leaderboard.svg"
import setting from "./../../Assets/Images/setting.svg"
import ClientAccountSetting from "../pages/ClientAccountSetting";
import ClientProfileSetting from "../pages/ClientProfileSetting";
import ClientLeaderboard from "../pages/ClientLeaderboard";
import { IoClipboardOutline, IoSettingsOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { GrResources } from "react-icons/gr";
import { MdOutlineLeaderboard } from "react-icons/md";

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
  const [showPopOver1, setShowPopover1] = useState(false);
  const [logoutClicked, setLogoutClicked] = useState(false);
  if (detail === "logout") {
    StorageService.Logout("Client");
    loginfunction(new LoginMetadata("-1"));
    return (
      <Redirect to="/user/login">
        <Login loginfunction={loginfunction} />
      </Redirect>
    );
  }
  if (detail === "leaderboard") {
    return (
      <Redirect to="/userleaderboard">
        <ClientLeaderboard name="Leaderboard" loginMetadata={loginMetadata} loginfunction={loginfunction} />
      </Redirect>
    );
  }
  return (
    <div className="topComponentFixed">
      <IonPopover
        arrow={false}
        alignment="end" mode="ios"
        class="selectionPopover" id="logoutPopOver" isOpen={showPopOver} onDidDismiss={() => {
          setShowPopover(false);
          if (logoutClicked) {
            setDetail("logout");
          }
        }}
      // trigger={"topComponentDropDown"}
      >
        <IonItem
          lines='full'

        >
          &nbsp;&nbsp;{loginMetadata.program_name}
        </IonItem>
        <IonRow class='line' />
        <IonItem style={{ height: 40, cursor: "pointer" }} onClick={() => { setShowPopover(false); setLogoutClicked(true) }}>
          &nbsp;&nbsp;Logout
        </IonItem>
      </IonPopover>
      <IonPopover
        arrow={false}
        alignment="end" mode="ios"
        class="selectionPopover" id="logoutPopOver" isOpen={showPopOver1} onDidDismiss={() => {
          setShowPopover1(false);
        }}
      // trigger={"topComponentDropDown"}
      >
        <IonItem
          style={{ height: 40, cursor: "pointer" }}
          lines='full'
          onClick={() => {
            setShowPopover1(false);
          }}
          routerDirection="none"
          routerLink="/useraccountsetting"
          detail={false}
        >
          &nbsp;&nbsp;Account
        </IonItem>
        <IonRow class='line' />
        <IonItem style={{ height: 40, cursor: "pointer" }}
          onClick={() => {
            setShowPopover1(false);
          }}
          routerDirection="none"
          routerLink="/userprofilesetting"
          detail={false}
        >
          &nbsp;&nbsp;Profile
        </IonItem>
      </IonPopover>
      <span style={{ width: "85%" }}>
        <IonRow className="searchbarBorder">
          <IonSearchbar mode="md"
            class="searchBar1"
            value={searchText}
            onIonChange={(e) => {
              setSearchText(e.detail.value ? e.detail.value : "");
            }}
          ></IonSearchbar>
        </IonRow>
      </span>

      <span className="topImages">
        <IonItem routerLink="/afleetdocs" routerDirection="none"
          lines="none"
          detail={false} className="topImg">
          <GrResources className="topComponentImag1" title="Resources" /></IonItem>
        <IonItem routerLink="/userleaderboard" routerDirection="none"
          lines="none"
          detail={false} className="topImg">
          <MdOutlineLeaderboard className="topComponentImag1" title="Leaderboard" /></IonItem>
        <IonItem
          lines="none"
          detail={false}>
          <FiSettings className="topComponentImag1" onClick={() => {
            setShowPopover1(true)
          }} title="Settings" />
          {/* <img className="topComponentImag1" src={setting} alt="" /> */}
        </IonItem>

        <img onClick={() => {
          setShowPopover(true);
        }} className="topComponentImage" src={isStringEmpty(loginMetadata.program_img) ? temp : loginMetadata.program_img} />
        {/* <IonCol> */}
        {/* <IonRow> */}
        {/* <IonRow class="SelectionStyle"> */}
        {/* <IonLabel id="topComponentDropDown" onClick={() => { */}
        {/* setShowPopover(true); */}
        {/* }}>{loginMetadata.program_name}&#9660;</IonLabel> */}
        {/* </IonRow> */}
        {/* <IonRow class="designation">{loginMetadata.first_name + " " + loginMetadata.last_name}</IonRow> */}
        {/* </IonRow> */}
        {/* </IonCol> */}
      </span>
    </div>
  );
};
export default TopComponent;
