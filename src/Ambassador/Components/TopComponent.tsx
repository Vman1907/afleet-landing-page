import {
  IonRow,
  IonCol,
  IonSearchbar,
  IonItem,
  IonPopover,
  IonLabel,
} from "@ionic/react";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import temp from "../../Assets/Images/campaignDeafult.png";
import { Redirect } from "react-router";
import { StorageService } from "../../Services/StorageService";
import Login from "../pages/Login";
import { useEffect, useState } from "react";
import { isStringEmpty } from "../../Util/BasicUtilityFunctions";
import leaderbord from "./../../Assets/Images/leaderboard.svg"
import setting from "./../../Assets/Images/setting.svg"
import AmbassadorLeaderboard from "../pages/AmbassadorLeaderboard";
import AmbassadorSettings from "../pages/AmbassadorSettings";
import { IoClipboardOutline } from "react-icons/io5";
import { RiFileInfoLine } from "react-icons/ri";
import { GrResources } from "react-icons/gr";
import { MdOutlineLeaderboard } from "react-icons/md";
import { FiSettings } from "react-icons/fi";

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
    ""
  );
  const [showPopOver, setShowPopover] = useState(false);
  const [logoutClicked, setLogoutClicked] = useState(false);
  if (detail === "logout") {
    StorageService.Logout("Ambassador");
    loginfunction(new LoginMetadata("-1"));
    return (
      <Redirect to="/ambassador">
        <Login loginfunction={loginfunction} />
      </Redirect>
    );
  }
  return (
    <div className="topComponentFixed">
      <IonPopover arrow={false}
        side="bottom"
        size="auto" mode="ios"
        class="selectionPopover" id="logoutPopOver" isOpen={showPopOver} onDidDismiss={() => {
          setShowPopover(false);
          if (logoutClicked) {
            setDetail("logout");
          }
        }}
      >
        <IonItem
          lines='full'
        >
          &nbsp;&nbsp;{loginMetadata.title}
        </IonItem>
        <IonRow class='line' />
        <IonItem style={{ height: 40 }} onClick={() => { setShowPopover(false); setLogoutClicked(true) }}>
          &nbsp;&nbsp;Logout
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
        <IonItem routerLink="/resources" routerDirection="none"
          lines="none"
          detail={false} class="topImg">
          <GrResources color="#8F8F8F" className="topComponentImag1" title="Resources" />
        </IonItem>
        {loginMetadata.package_leaderboard ? <IonItem routerLink="/leaderboard" routerDirection="none"
          lines="none"
          detail={false} class="topImg">
          <MdOutlineLeaderboard className="topComponentImag1" title="Leaderboard" />
        </IonItem> : <></>}

        <IonItem routerLink="/settings" routerDirection="none"
          lines="none"
          detail={false} class="topImg">
          <FiSettings className="topComponentImag1" title="Settings" />
          {/* <img className="topComponentImag1" src={setting} alt=""  /> */}
        </IonItem>
        <img onClick={() => {
          setShowPopover(true);
        }} className="topComponentImage" src={isStringEmpty(loginMetadata.ambassadorProgramImg) ? isStringEmpty(loginMetadata.ambassador_img) ? temp : loginMetadata.ambassador_img : loginMetadata.ambassadorProgramImg} />
      </span>
    </div>
  );
};
export default TopComponent;
