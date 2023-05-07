import {
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRoute,
  IonRow,
} from "@ionic/react";
import logo from "../../Assets/Images/logo_3.png";
import { Redirect, useLocation } from "react-router-dom";
import {
  mailOutline,
  mailSharp,
} from "ionicons/icons";
import "./Menu.css";
import temp from "../../Assets/Images/defaultImage.svg";
import { useEffect, useState } from "react";
import "../../theme/variables.css";
import { VscExtensions } from "react-icons/vsc";
import { MdOutlineLeaderboard, MdOutlinePeopleAlt, MdTimeline } from "react-icons/md";
import { BsChevronDown, BsChevronRight, BsPeople, BsTrophy } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { TbReportAnalytics, TbSpeakerphone } from "react-icons/tb"
import { LoginMetadata } from "../Models/LoginMetadata";
import { FaCodepen, FaRegCalendarAlt } from "react-icons/fa";
import { isStringEmpty } from "../../Util/BasicUtilityFunctions";
import { IoArrowForwardCircle, IoLogOut, IoLogOutOutline } from "react-icons/io5";
import { StorageService } from "../../Services/StorageService";
import { Browser } from "@capacitor/browser";
import Login from "../pages/Login";

const Dashboard = {
  title: "Dashboard",
  url: "/userdashboard",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};

const ProgramDetails = {
  title: "Program Details",
  url: "/userprogramdetails",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};

const ClientCampaign = {
  title: "Campaigns",
  url: "/Campaign",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};
const ClientRewards = {
  title: "Rewards",
  url: "/userrewards",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};
const Calendar = {
  title: "Calendar",
  url: "/usercalendar",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};
const Timeline = {
  title: "Community",
  url: "/usercommunity",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};
const Leaderboard = {
  title: "Leaderboard",
  url: "/userleaderboard",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};
const Reports = {
  title: "Intelligence",
  url: "/userreports",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};
const Manage = {
  title: "Manage",
  url: "/usermanage",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};
const Recruit = {
  title: "Recruit",
  url: "/userrecruit",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};
const Resources = {
  title: "Resources",
  url: "/userresources",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};
const AccountSetting = {
  title: "Account",
  url: "/useraccountsetting",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};
const ProfileSetting = {
  title: "Profile",
  url: "/userprofilesetting",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};
const MediaSetting = {
  title: "MediaSetting",
  url: "/usermediasetting",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};

interface MenuProps {
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  timeline: boolean;
  leaderboard: boolean;
}

const Menu: React.FC<MenuProps> = ({
  loginMetadata,
  loginfunction,
  timeline,
  leaderboard,
}) => {
  const location = useLocation();
  const [subMenu, showSubMenu] = useState(false);
  const [accountSubMenu, showAccountSubMenu] = useState(false);
  const [detail, setDetail] = useState<string>(
    loginMetadata.first_name + " " + loginMetadata.last_name
  );
  if (detail === "logout") {
    StorageService.Logout("Client");
    loginfunction(new LoginMetadata("-1"));
    return (
      <Redirect to="/user">
        <Login loginfunction={loginfunction} />
      </Redirect>
    );
  }

  return (
    <IonMenu
      contentId="main"
      type="overlay"
      style={{ width: "70%", maxWidth: 300 }}
      class="transparent-background md"
    >
      <IonContent class="transparent-background">
        <img src={logo} className="sideMenulogo" />
        {loginMetadata.program_id == 13 ? <IonRow class="linkCover" ><a href="https://afleet.io/plans" className="link">Start your own program</a></IonRow> : <></>}
        <IonGrid >
          <IonList id="inbox-list" lines="none">

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
                      ? "selected "
                      : "notSelected"
                  }
                />
                <IonLabel style={{ marginLeft: 20, marginTop: "3px", marginBottom: "3px" }}><IonRow><IonCol style={{ display: "flex", alignItems: "center" }}>{Dashboard.title}</IonCol>{location.pathname === Dashboard.url ? <IonCol class="ion-text-end"><IoArrowForwardCircle size={35} /></IonCol> : null}</IonRow></IonLabel>
              </IonItem>
              {(timeline || loginMetadata.package_timeline) && (loginMetadata.mtimeline) ?
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
                        ? "selected "
                        : "notSelected"
                    }
                  />
                  <IonLabel style={{ marginLeft: 20, marginTop: "3px", marginBottom: "3px" }}><IonRow><IonCol style={{ display: "flex", alignItems: "center" }}>{Timeline.title}</IonCol>{location.pathname === Timeline.url ? <IonCol class="ion-text-end"><IoArrowForwardCircle size={35} /></IonCol> : null}</IonRow></IonLabel>

                </IonItem>
                : <></>}

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
                    ? "selected "
                    : "notSelected "
                }
              />
              <IonLabel style={{ marginLeft: 40 }}>
                {ProgramDetails.title}
              </IonLabel>
            </IonItem> */}
              {loginMetadata.mcampaign ? <IonItem
                className={
                  location.pathname === ClientCampaign.url
                    ? "selected"
                    : "notSelected"
                }
                routerLink={ClientCampaign.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <TbSpeakerphone
                  className={
                    location.pathname === ClientCampaign.url
                      ? "selected "
                      : "notSelected"
                  }
                />
                <IonLabel style={{ marginLeft: 20, marginTop: "3px", marginBottom: "3px" }}><IonRow><IonCol style={{ display: "flex", alignItems: "center" }}>{ClientCampaign.title}</IonCol>{location.pathname === ClientCampaign.url ? <IonCol class="ion-text-end"><IoArrowForwardCircle size={35} /></IonCol> : null}</IonRow></IonLabel>

              </IonItem> : <></>}
              <IonItem
                onClick={() => {
                  subMenu ? showSubMenu(false) : showSubMenu(true);
                }}
                className="notSelected"
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <BsPeople />
                <IonLabel style={{ marginLeft: 20, cursor: "pointer", marginTop: "3px", marginBottom: "3px" }}>Ambassador</IonLabel>
                {subMenu ? <BsChevronDown style={{ cursor: "pointer" }} /> : <BsChevronRight style={{ cursor: "pointer" }} />}

              </IonItem>
              {subMenu ? (
                <IonItem
                  className={
                    location.pathname === Manage.url
                      ? "selected1 shifting"
                      : "notSelected shifting"
                  }
                  routerLink={Manage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonLabel style={{ marginTop: "2px", marginBottom: "2px" }}><IonRow><IonCol style={{ display: "flex", alignItems: "center" }}>{Manage.title}</IonCol>{location.pathname === Manage.url ? <IonCol class="ion-text-end"><IoArrowForwardCircle size={35} style={{ color: "white" }} /></IonCol> : null}</IonRow></IonLabel>

                </IonItem>
              ) : null}
              {subMenu ? (
                <IonItem
                  className={
                    location.pathname === Recruit.url
                      ? "selected1 shifting"
                      : "notSelected shifting"
                  }
                  routerLink={Recruit.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonLabel style={{ marginTop: "2px", marginBottom: "2px" }}><IonRow><IonCol style={{ display: "flex", alignItems: "center" }}>{Recruit.title}</IonCol>{location.pathname === Recruit.url ? <IonCol class="ion-text-end"><IoArrowForwardCircle size={35} style={{ color: "white" }} /></IonCol> : null}</IonRow></IonLabel>

                </IonItem>
              ) : null}
              {subMenu ? (
                <IonItem
                  className={
                    location.pathname === Resources.url
                      ? "selected1 shifting"
                      : "notSelected shifting"
                  }
                  routerLink={Resources.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonLabel style={{ marginTop: "2px", marginBottom: "2px" }}><IonRow><IonCol style={{ display: "flex", alignItems: "center" }}>{Resources.title}</IonCol>{location.pathname === Resources.url ? <IonCol class="ion-text-end"><IoArrowForwardCircle size={35} style={{ color: "white" }} /></IonCol> : null}</IonRow></IonLabel>

                </IonItem>
              ) : null}
              {loginMetadata.mrewards ? <IonItem
                className={
                  location.pathname === ClientRewards.url
                    ? "selected"
                    : "notSelected"
                }
                routerLink={ClientRewards.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <BsTrophy
                  className={
                    location.pathname === ClientRewards.url
                      ? "selected "
                      : "notSelected"
                  }
                />{" "}
                <IonLabel style={{ marginLeft: 20, marginTop: "3px", marginBottom: "3px" }}><IonRow><IonCol style={{ display: "flex", alignItems: "center" }}>{ClientRewards.title}</IonCol>{location.pathname === ClientRewards.url ? <IonCol class="ion-text-end"><IoArrowForwardCircle size={35} /></IonCol> : null}</IonRow></IonLabel>

              </IonItem> : <></>}
              {loginMetadata.mcalendar ? <IonItem
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
                      ? "selected"
                      : "notSelected"
                  }
                />
                <IonLabel style={{ marginLeft: 20, marginTop: "3px", marginBottom: "3px" }}><IonRow><IonCol style={{ display: "flex", alignItems: "center" }}>{Calendar.title}</IonCol>{location.pathname === Calendar.url ? <IonCol class="ion-text-end"><IoArrowForwardCircle size={35} /></IonCol> : null}</IonRow></IonLabel>

              </IonItem> : <></>}


              {(leaderboard || loginMetadata.package_leaderboard) && (loginMetadata.mleaderboard) ?
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
                        ? "selected "
                        : "notSelected"
                    }
                  />
                  <IonLabel style={{ marginLeft: 20, marginTop: "3px", marginBottom: "3px" }}><IonRow><IonCol style={{ display: "flex", alignItems: "center" }}>{Leaderboard.title}</IonCol>{location.pathname === Leaderboard.url ? <IonCol class="ion-text-end"><IoArrowForwardCircle size={35} /></IonCol> : null}</IonRow></IonLabel>

                </IonItem>
                : <></>}
              <IonItem
                className={
                  location.pathname === Reports.url ? "selected" : "notSelected"
                }
                routerLink={Reports.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <TbReportAnalytics
                  className={
                    location.pathname === Reports.url
                      ? "selected "
                      : "notSelected"
                  }
                />
                <IonLabel style={{ marginLeft: 20, marginTop: "3px", marginBottom: "3px" }}><IonRow><IonCol style={{ display: "flex", alignItems: "center" }}>{Reports.title}</IonCol>{location.pathname === Reports.url ? <IonCol class="ion-text-end"><IoArrowForwardCircle size={35} /></IonCol> : null}</IonRow></IonLabel>

              </IonItem>
              {/* <IonItem
                onClick={() => {
                  accountSubMenu ? showAccountSubMenu(false) : showAccountSubMenu(true);
                }}
                className="notSelected"
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <AiOutlineSetting />
                <IonLabel style={{ marginLeft: 20, cursor: "pointer" }}>Settings</IonLabel>
                {accountSubMenu ? <BsChevronDown /> : <BsChevronRight />}

              </IonItem> */}
              {/* {accountSubMenu ? (
                <IonItem
                  className={
                    location.pathname === AccountSetting.url
                      ? "selected1 shifting"
                      : "notSelected shifting"
                  }
                  routerLink={AccountSetting.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonLabel ><IonRow><IonCol style={{ display: "flex", alignItems: "center" }}>{AccountSetting.title}</IonCol>{location.pathname === AccountSetting.url ? <IonCol class="ion-text-end"><IoArrowForwardCircle size={35} style={{ color: "white" }} /></IonCol> : null}</IonRow></IonLabel>

                </IonItem>
              ) : null}
              {accountSubMenu ? (
                <IonItem
                  className={
                    location.pathname === ProfileSetting.url
                      ? "selected1 shifting"
                      : "notSelected shifting"
                  }
                  routerLink={ProfileSetting.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonLabel><IonRow><IonCol style={{ display: "flex", alignItems: "center" }}>{ProfileSetting.title}</IonCol>{location.pathname === ProfileSetting.url ? <IonCol class="ion-text-end"><IoArrowForwardCircle size={35} style={{ color: "white" }} /></IonCol> : null}</IonRow></IonLabel>

                </IonItem>
              ) : null} */}
              {/* {accountSubMenu ? (
              <IonItem
                className={
                  location.pathname === MediaSetting.url
                    ? "selected shifting"
                    : "notSelected shifting"
                }
                routerLink={MediaSetting.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonLabel>Media Setting</IonLabel>
              </IonItem>
            ) : null} */}
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
