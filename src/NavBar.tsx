import { useState } from "react";

import menu from "./Assets/Images/menu_alt_04.svg";
import Logo from "./../src/Assets/Images/logo_3.png";
import close from "./Assets/Images/close_big.svg";

import "./../src/Admin/Styles/NavBar.css";
import { IonButton, IonContent, IonItem, IonPopover } from "@ionic/react";

const NavBar: React.FC = () => {
  const [navbar, setNavbar] = useState(false);
  const [existingUser, setExistingUser] = useState(false);

  return (
    <nav className="navbar ">
      {/* <div className="container-fluid">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>

          <a className="navbar-brand" href="#">
            <img src={Logo} alt="" />
          </a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Case Studies</a>
            </li>
            <li>
              <a href="#">Existing User</a>
            </li>
            <li>
              <button className="btn get-started">Get started</button>
            </li>
          </ul>
        </div>
      </div> */}
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src={Logo} alt="" />
        </div>
        <div className="navbar-links">
          <span>
            <a href="#">Home</a>
          </span>
          <span>
            <a href="https://afleet.io/blog/feed/](https://afleet.io/blog/feed/">
              Blog
            </a>
          </span>
          <span>
            <a href="https://afleet.io/case-studies">Case Studies</a>
          </span>
          <span>
            <a id="existing-button" href="#">
              Existing User
            </a>
            <IonPopover
              side="bottom"
              trigger="existing-button"
              triggerAction="click"
            >
              <IonContent>
                <IonItem>
                  <IonButton>Ambassador</IonButton>
                </IonItem>
                <IonItem>
                  <IonButton>Program Manager</IonButton>
                </IonItem>
              </IonContent>
            </IonPopover>
          </span>
          <a href="#">
            <button className="get-started">Get Started</button>
          </a>
        </div>
        <div
          className={navbar ? "side-navbar-links open" : "side-navbar-links"}
        >
          <span
            onClick={() => {
              setNavbar(false);
            }}
          >
            <img src={close} alt="" />
          </span>
          <span>
            <a href="#">Home</a>
          </span>
          <span>
            <a href="https://afleet.io/blog/feed/](https://afleet.io/blog/feed/">
              Blog
            </a>
          </span>
          <span>
            <a href="https://afleet.io/case-studies">Case Studies</a>
          </span>
          <span
            onClick={() => {
              setExistingUser(true);
            }}
          >
            <a id="existing-sidenav" href="#">
              Existing User
            </a>
            <IonPopover
              side="bottom"
              isOpen={existingUser}
              onDidDismiss={() => {
                setExistingUser(false);
              }}
              triggerAction="click"
            >
              <IonContent>
                <IonItem>
                  <IonButton>Ambassador</IonButton>
                </IonItem>
                <IonItem>
                  <IonButton>Program Manager</IonButton>
                </IonItem>
              </IonContent>
            </IonPopover>
          </span>
          <a href="#pricing">
            <button className="get-started">Get Started</button>
          </a>
        </div>
        <span
          onClick={() => {
            setNavbar(true);
          }}
          className="hamburger-menu"
        >
          <img src={menu} alt="" />
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
