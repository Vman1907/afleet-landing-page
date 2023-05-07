import {
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRow,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import { Redirect } from "react-router";
import {
  cubeOutline,
  mailOutline,
  mailSharp,
  peopleOutline,
  personOutline,
} from "ionicons/icons";
import "./Menu.css";
import { FaCoins, FaWpforms } from "react-icons/fa";
import { VscExtensions } from "react-icons/vsc";
import logo from "../../Assets/Images/logo_3.png";
import { BiCube } from "react-icons/bi";
import { BsPeople, BsPerson } from "react-icons/bs";
import { LoginMetadata } from "../Models/LoginMetadata";
import { IoClipboardOutline, IoDocument, IoLogOut, IoLogOutOutline } from "react-icons/io5";
import { StorageService } from "../../Services/StorageService";
import Login from "../pages/Login";
import { useState } from "react";

const Dashboard = {
  title: "Dashboard",
  url: "/dashboard",
  iosIcon: mailOutline,
  mdIcon: mailSharp,
};
const ProgramManagement = {
  title: "Program Management",
  url: "/programmanagement",
  iosIcon: cubeOutline,
  mdIcon: cubeOutline,
};
const AmbassadorManagement = {
  title: "Ambassador Management",
  url: "/ambassadormanagement",
  iosIcon: peopleOutline,
  mdIcon: peopleOutline,
};
const AdminManagement = {
  title: "Admin Management",
  url: "/adminmanagement",
  iosIcon: personOutline,
  mdIcon: personOutline,
};
const PackageManagement = {
  title: "Package Management",
  url: "/packagemanagement",
  iosIcon: "FaCoins",
  mdIcon: "FaCoins",
};

const ClientManagement = {
  title: "Client Management",
  url: "/clientmanagement",
  iosIcon: peopleOutline,
  mdIcon: peopleOutline,
};
const AdminRecruit = {
  title: "Promotion Form",
  url: "/promote",
  iosIcon: peopleOutline,
  mdIcon: peopleOutline,
};
const ResourceManagement = {
  title: "Resource Management",
  url: "/resourcemanagement",
  iosIcon: peopleOutline,
  mdIcon: peopleOutline,
};

interface MenuProps {
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}

const Menu: React.FC<MenuProps> = ({
  loginMetadata,
  loginfunction
}) => {
  const location = useLocation();
  const [detail, setDetail] = useState<string>(
    loginMetadata.first_name + " " + loginMetadata.last_name
  );
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
    <IonMenu
      contentId="main"
      type="overlay"
      style={{ width: "50%", maxWidth: 300 }}
      class="transparent-background md"
    >
      <IonContent class="bac transparent-background">
        <img src={logo} className="sideMenulogo" />
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
              {/* <IonIcon slot="start" ios={Dashboard.iosIcon} md={Dashboard.mdIcon} /> */}
              <VscExtensions
                className={
                  location.pathname === Dashboard.url
                    ? "selected "
                    : "notSelected"
                }
                size={20}
              />
              <IonLabel style={{ marginLeft: 18 }}>{Dashboard.title}</IonLabel>
            </IonItem>
            <IonItem
              className={
                location.pathname === ProgramManagement.url
                  ? "selected"
                  : "notSelected"
              }
              routerLink={ProgramManagement.url}
              routerDirection="none"
              lines="none"
              detail={false}
            >
              <BiCube
                className={
                  location.pathname === ProgramManagement.url
                    ? "selected "
                    : "notSelected"
                }
                size={20}
              />
              {/* <IonIcon
                slot="start"
                ios={ProgramManagement.iosIcon}
                md={ProgramManagement.mdIcon}
              /> */}
              <IonLabel style={{ marginLeft: 18 }}>
                {ProgramManagement.title}
              </IonLabel>
            </IonItem>
            <IonItem
              className={
                location.pathname === AmbassadorManagement.url
                  ? "selected"
                  : "notSelected"
              }
              routerLink={AmbassadorManagement.url}
              routerDirection="none"
              lines="none"
              detail={false}
            >
              <BsPeople
                className={
                  location.pathname === AmbassadorManagement.url
                    ? "selected "
                    : "notSelected"
                }
                size={20}
              />
              {/* <IonIcon
                slot="start"
                ios={AmbassadorManagement.iosIcon}
                md={AmbassadorManagement.mdIcon}
              /> */}
              <IonLabel style={{ marginLeft: 18 }}>
                {AmbassadorManagement.title}
              </IonLabel>
            </IonItem>
            <IonItem
              className={
                location.pathname === AdminManagement.url
                  ? "selected"
                  : "notSelected"
              }
              routerLink={AdminManagement.url}
              routerDirection="none"
              lines="none"
              detail={false}
            >
              <BsPerson
                className={
                  location.pathname === Dashboard.url
                    ? "selected "
                    : "notSelected"
                }
                size={20}
              />
              {/* <IonIcon
                slot="start"
                ios={AdminManagement.iosIcon}
                md={AdminManagement.mdIcon}
              /> */}
              <IonLabel style={{ marginLeft: 18 }}>
                {AdminManagement.title}
              </IonLabel>
            </IonItem>
            <IonItem
              className={
                location.pathname === ClientManagement.url
                  ? "selected"
                  : "notSelected"
              }
              routerLink={ClientManagement.url}
              routerDirection="none"
              lines="none"
              detail={false}
            >
              <BsPeople
                className={
                  location.pathname === ClientManagement.url
                    ? "selected "
                    : "notSelected"
                }
                size={20}
              />
              {/* <IonIcon
                slot="start"
                ios={ClientManagement.iosIcon}
                md={ClientManagement.mdIcon}
              /> */}
              <IonLabel style={{ marginLeft: 18 }}>
                {ClientManagement.title}
              </IonLabel>
            </IonItem>
            <IonItem
              className={
                location.pathname === PackageManagement.url
                  ? "selected"
                  : "notSelected"
              }
              routerLink={PackageManagement.url}
              routerDirection="none"
              lines="none"
              detail={false}
            >
              {/* <IonIcon slot="start" ios={PackageManagement.iosIcon} md={PackageManagement.mdIcon} /> */}
              <FaCoins
                className={
                  location.pathname === PackageManagement.url
                    ? "selected "
                    : "notSelected"
                }
                size={20}
              />
              <IonLabel style={{ marginLeft: 18 }}>
                {PackageManagement.title}
              </IonLabel>
            </IonItem>
            <IonItem
              className={
                location.pathname === ResourceManagement.url
                  ? "selected"
                  : "notSelected"
              }
              routerLink={ResourceManagement.url}
              routerDirection="none"
              lines="none"
              detail={false}
            >
              {/* <IonIcon slot="start" ios={PackageManagement.iosIcon} md={PackageManagement.mdIcon} /> */}
              <IoClipboardOutline
                className={
                  location.pathname === ResourceManagement.url
                    ? "selected "
                    : "notSelected"
                }
                size={20}
              />
              <IonLabel style={{ marginLeft: 18 }}>
                {ResourceManagement.title}
              </IonLabel>
            </IonItem>
            {loginMetadata.superadmin == 1 ? <IonItem
              className={
                location.pathname === AdminRecruit.url
                  ? "selected"
                  : "notSelected"
              }
              routerLink={AdminRecruit.url}
              routerDirection="none"
              lines="none"
              detail={false}
            >
              {/* <IonIcon slot="start" ios={PackageManagement.iosIcon} md={PackageManagement.mdIcon} /> */}
              <FaWpforms
                className={
                  location.pathname === AdminRecruit.url
                    ? "selected "
                    : "notSelected"
                }
                size={20}
              />
              <IonLabel style={{ marginLeft: 18 }}>
                {AdminRecruit.title}
              </IonLabel>
            </IonItem> : null}

          </IonMenuToggle>
        </IonList>
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
