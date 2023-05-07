import {
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRow,
} from "@ionic/react";
import logo from "../../Assets/Images/logo_3.png";
import { Redirect, useLocation } from "react-router-dom";
import {
  mailOutline,
  mailSharp,
} from "ionicons/icons";
import "./Menu.css";
import { useState } from "react";
import temp from "../../Assets/Images/defaultImage.svg";
import "../../theme/variables.css";
import { VscExtensions } from "react-icons/vsc";
import { FaBullhorn, FaCodepen, FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineLeaderboard, MdOutlinePeopleAlt, MdTimeline } from "react-icons/md";
import { BsChevronDown, BsChevronRight, BsPeople, BsTrophy } from "react-icons/bs";
import { IoArrowForwardCircle, IoLogOut, IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import { isStringEmpty } from "../../Util/BasicUtilityFunctions";
import { StorageService } from "../../Services/StorageService";
import Login from "../pages/Login";
import { IoIosPeople } from "react-icons/io";

const Dashboard = {
  title: "Dashboard",
  url: "/dashboard",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};

const ProgramDetails = {
  title: "Program",
  url: "/programdetails",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};

const Campaign = {
  title: "Campaigns",
  url: "/Campaign",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};
const AmbassadorRewards = {
  title: "Rewards",
  url: "/rewards",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};

const Calendar = {
  title: "Calendar",
  url: "/calendar",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};
const Community = {
  title: "Community",
  url: "/community",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};
const Timeline = {
  title: "Community",
  url: "/community",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};
const Leaderboard = {
  title: "Leaderboard",
  url: "/leaderboard",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};
const Settings = {
  title: "Settings",
  url: "/settings",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};

interface MenuProps {
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  timeline: boolean;
  leaderboard: boolean;
  ambReward: boolean;
}

const Menu: React.FC<MenuProps> = ({
  loginMetadata,
  loginfunction,
  timeline,
  leaderboard,
  ambReward,
}) => {
  const location = useLocation();
  const [detail, setDetail] = useState<string>(
    loginMetadata.first_name + " " + loginMetadata.last_name
  );
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
    <IonMenu
      contentId="main"
      type="overlay"
      style={{ width: "60%", maxWidth: 300 }}
      class="transparent-background md"
    >
      <IonContent class="transparent-background">
        <img src={logo} className="sideMenulogo" />
        {loginMetadata.programId == 13 ? <IonRow class="linkCover" ><a href="https://afleet.io/plans" className="link">Start your own program</a></IonRow> : <></>}
        <IonGrid>
          <IonList id="inbox-list" lines="none">
            {/* <IonImg src={logo} class="sideMenulogo"></IonImg> */}
            {/* {appPages.map((appPage, index) => {
            return ( */}
            <IonMenuToggle autoHide={false}>
              <IonItem
                className={
                  location.pathname === Dashboard.url ? "selected" : "notSelected"
                }
                routerLink={Dashboard.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <VscExtensions
                  className={
                    location.pathname === Dashboard.url
                      ? "selected labelMargin"
                      : "notSelected labelMargin"
                  }
                />
                <IonLabel style={{ marginTop: "3px", marginBottom: "3px" }}><IonRow><IonCol style={{ display: "flex", alignItems: "center" }}>{Dashboard.title}</IonCol>{location.pathname === Dashboard.url ? <IonCol class="ion-text-end"><IoArrowForwardCircle size={35} /></IonCol> : null}</IonRow></IonLabel>
              </IonItem>
              {timeline || loginMetadata.package_timeline ?
                <IonItem
                  className={
                    location.pathname === Timeline.url ? "selected" : "notSelected"
                  }
                  routerLink={Timeline.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IoIosPeople
                    className={
                      location.pathname === Timeline.url
                        ? "selected labelMargin"
                        : "notSelected labelMargin"
                    }
                  />
                  <IonLabel style={{ marginTop: "3px", marginBottom: "3px" }}><IonRow><IonCol style={{ display: "flex", alignItems: "center" }}>{Timeline.title}</IonCol>{location.pathname === Timeline.url ? <IonCol class="ion-text-end"><IoArrowForwardCircle size={35} /></IonCol> : null}</IonRow></IonLabel>
                </IonItem> : <></>}
              {/* <IonItem
                className={
                  location.pathname === ProgramDetails.url
                    ? "selected"
                    : "notSelected"
                }
                routerLink={ProgramDetails.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <FaCodepen
                  className={
                    location.pathname === ProgramDetails.url
                      ? "selected labelMargin"
                      : "notSelected labelMargin"
                  }
                />
                <IonLabel style={{ marginTop: "3px", marginBottom: "3px" }}><IonRow><IonCol style={{ display: "flex", alignItems: "center" }}>{ProgramDetails.title}</IonCol>{location.pathname === ProgramDetails.url ? <IonCol class="ion-text-end"><IoArrowForwardCircle size={35} /></IonCol> : null}</IonRow></IonLabel>
              </IonItem> */}

              <IonItem
                className={
                  location.pathname === Campaign.url
                    ? "selected"
                    : "notSelected"
                }
                routerLink={Campaign.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <FaBullhorn
                  className={
                    location.pathname === Campaign.url
                      ? "selected labelMargin"
                      : "notSelected labelMargin"
                  }
                />
                <IonLabel style={{ marginTop: "3px", marginBottom: "3px" }}><IonRow><IonCol style={{ display: "flex", alignItems: "center" }}>{Campaign.title}</IonCol>{location.pathname === Campaign.url ? <IonCol class="ion-text-end"><IoArrowForwardCircle size={35} /></IonCol> : null}</IonRow></IonLabel>
              </IonItem>
              {ambReward || loginMetadata.amb_reward ?
                <IonItem
                  className={
                    location.pathname === AmbassadorRewards.url
                      ? "selected"
                      : "notSelected"
                  }
                  routerLink={AmbassadorRewards.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <BsTrophy
                    className={
                      location.pathname === AmbassadorRewards.url
                        ? "selected labelMargin"
                        : "notSelected labelMargin"
                    }
                  />
                  <IonLabel style={{ marginTop: "3px", marginBottom: "3px" }}><IonRow><IonCol style={{ display: "flex", alignItems: "center" }}>{AmbassadorRewards.title}</IonCol>{location.pathname === AmbassadorRewards.url ? <IonCol class="ion-text-end"><IoArrowForwardCircle size={35} /></IonCol> : null}</IonRow></IonLabel>
                </IonItem> : <></>
              }


              <IonItem
                className={
                  location.pathname === Calendar.url
                    ? "selected"
                    : "notSelected"
                }
                routerLink={Calendar.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <FaRegCalendarAlt
                  className={
                    location.pathname === Calendar.url
                      ? "selected labelMargin"
                      : "notSelected labelMargin"
                  }
                />
                <IonLabel style={{ marginTop: "3px", marginBottom: "3px" }}><IonRow><IonCol style={{ display: "flex", alignItems: "center" }}>{Calendar.title}</IonCol>{location.pathname === Calendar.url ? <IonCol class="ion-text-end"><IoArrowForwardCircle size={35} /></IonCol> : null}</IonRow></IonLabel>
              </IonItem>
              {/* <IonItem
              className={
                location.pathname === Community.url
                  ? "selected"
                  : "notSelected"
              }
              routerLink={Community.url}
              routerDirection="none"
              lines="none"
              detail={false}
            >
              <BsPeople
                className={
                  location.pathname === Community.url
                    ? "selected labelMargin"
                    : "notSelected labelMargin"
                }
              />
              <IonLabel>{Community.title}</IonLabel>
            </IonItem> */}

              {leaderboard || loginMetadata.package_leaderboard ?
                <IonItem
                  className={
                    location.pathname === Leaderboard.url ? "selected" : "notSelected"
                  }
                  routerLink={Leaderboard.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <MdOutlineLeaderboard
                    className={
                      location.pathname === Leaderboard.url
                        ? "selected labelMargin"
                        : "notSelected labelMargin"
                    }
                  />
                  <IonLabel style={{ marginTop: "3px", marginBottom: "3px" }}><IonRow><IonCol style={{ display: "flex", alignItems: "center" }}>{Leaderboard.title}</IonCol>{location.pathname === Leaderboard.url ? <IonCol class="ion-text-end"><IoArrowForwardCircle size={35} /></IonCol> : null}</IonRow></IonLabel>
                </IonItem> : <></>}
              {/* <IonItem
                className={
                  location.pathname === Settings.url ? "selected" : "notSelected"
                }
                routerLink={Settings.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IoSettingsOutline
                  className={
                    location.pathname === Settings.url
                      ? "selected labelMargin"
                      : "notSelected labelMargin"
                  }
                />
                <IonLabel><IonRow><IonCol style={{ display: "flex", alignItems: "center" }}>{Settings.title}</IonCol>{location.pathname === Settings.url ? <IonCol class="ion-text-end"><IoArrowForwardCircle size={35} /></IonCol> : null}</IonRow></IonLabel>
              </IonItem> */}
            </IonMenuToggle>
          </IonList>
        </IonGrid>
        {/* <IonGrid style={{ position: "absolute", bottom: "20px", textAlign: "center", width: "90%" }}>
          <hr style={{ borderWidth: "1px" }}></hr>
          <IonRow class="sideMenulogo" style={{ paddingBottom: "0px", paddingTop: "0px", alignItems: "center" }}><div className="logoutWrapper" onClick={() => {
            setDetail("logout")
          }}><div className="logoutIconWrapper"><IoLogOut size={25} color="white" /></div>&nbsp;&nbsp;Logout</div></IonRow>
        </IonGrid> */}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
