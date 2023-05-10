import {
  IonApp,
  IonButton,
  IonGrid,
  IonIcon,
  IonPopover,
  IonRouterOutlet,
  IonRow,
  IonSegment,
  IonSplitPane,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useState, useEffect } from "react";
import { Route, Redirect, useParams } from "react-router";
import Loading from "../Components/Loading";
import Menu from "../Components/Menu";
import {
  clientLoginMetadataExpiry,
  clientLoginMetadataKey,
} from "../Constants/ClientStorageConstants";
import { LoginMetadata } from "../Models/LoginMetadata";
import { StorageService } from "../Services/StorageService";
import Login from "./Login";
import Page from "./Page";
import "../Styles/Login.css";
import { close } from "ionicons/icons";
import { Link } from "react-router-dom";
import ClientError from "./ClientError";
import NotFound from "../../404";
import Signup from "./Signup";

const ClientMain: React.FC = () => {
  const [loginMetadata, setLoginMetadata] = useState(new LoginMetadata("-1"));
  const [showLoading, setShowLoading] = useState(false);
  const [showNoProgram, setShowNoProgram] = useState(false);
  const [timeline, setTimeline] = useState(false);
  const [leaderboard, setLeaderboard] = useState(false);

  let setLoginData = async (resp: any) => {
    // debugger;
    setLoginMetadata(resp);
    await StorageService.Set(
      clientLoginMetadataKey,
      resp,
      clientLoginMetadataExpiry
    );
  };

  useEffect(() => {
    setShowLoading(true);
    StorageService.Get(clientLoginMetadataKey)
      .then((resp) => {
        if (resp != null) setLoginMetadata(resp);
        console.log(loginMetadata);
        setShowLoading(false);
      })
      .catch(() => {
        setShowLoading(false);
      });
    console.log("hello");
  }, []);
  if (showLoading) {
    return (
      <IonApp>
        <Loading />
      </IonApp>
    );
  }
  return (
    <IonReactRouter>
      <IonPopover
        isOpen={showNoProgram}
        onDidDismiss={() => {
          setShowNoProgram(false);
        }}
        class="ClientRewardsPopover2"
      >
        <IonGrid class="programManagementPopOverGrid">
          <IonRow class="ClientRewardsPopoverCloseButton">
            <Link to="/user">
              <IonIcon
                md={close}
                class="iconSize"
                size="large"
                onClick={() => {
                  setShowNoProgram(false);
                }}
              ></IonIcon>
            </Link>
          </IonRow>
          <IonSegment mode="md" class="popHead">
            You do have any Active Programs, Contact Admin!!
          </IonSegment>
          <IonSegment mode="md">
            <IonButton
              routerLink="/user"
              onClick={() => setShowNoProgram(false)}
            >
              Cancel
            </IonButton>
          </IonSegment>
        </IonGrid>
      </IonPopover>
      {loginMetadata.tokenString != "-1" && loginMetadata.clientId != -1 ? (
        <IonSplitPane contentId="main" class="backgroundImage">
          <Menu
            timeline={timeline}
            leaderboard={leaderboard}
            loginMetadata={loginMetadata}
            loginfunction={setLoginData}
          />
          <IonRouterOutlet id="main">
            <Route path="/:name" exact={true}>
              <Page
                loginMetadata={loginMetadata}
                loginfunction={setLoginData}
                setShowNoProgram={setShowNoProgram}
                setTimeline={setTimeline}
                setLeaderboard={setLeaderboard}
              />
            </Route>
            <Route path="/user" exact={true}>
              <Redirect to="/userdashboard" />
            </Route>
            <Route path="/:name/:name2" exact={true}>
              <ClientError
                loginMetadata={loginMetadata}
                loginfunction={setLoginData}
              />
            </Route>
            <Route path="/user/login" exact={true}>
              <Redirect to="/userdashboard" />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      ) : (
        <IonRouterOutlet id="main">
          <Route path="/user/login" exact={true}>
            <Redirect to="/user/login"></Redirect>
            <Login loginfunction={setLoginData} />
          </Route>
          <Route path="/:page" exact={true}>
            <NotFound />
            {console.log("hello")}
          </Route>
          <Route path="/user" exact={true}>
            <Login loginfunction={setLoginData} />
          </Route>
          <Route path="/user/signup" exact={true}>
            <Signup />
          </Route>
        </IonRouterOutlet>
      )}
    </IonReactRouter>
  );
};
export default ClientMain;
