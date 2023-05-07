import { IonApp, IonButton, IonGrid, IonIcon, IonPopover, IonRedirect, IonRouterOutlet, IonRow, IonSegment, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useState, useEffect } from "react";
import { Route, Redirect, useParams } from "react-router";
import Loading from "../Components/Loading";
import Menu from "../Components/Menu";
import {
  AmbassadorLoginMetadataExpiry,
  AmbassadorLoginMetadataKey,
} from "../Constants/AmbassadorStorageConstants";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import { StorageService } from "../../Services/StorageService";
import Login from "./Login";
import Page from "./Page";
import "../styles/Login.css";
import { close } from "ionicons/icons";
import { Link } from "react-router-dom";
import AmbassadorError from "./AmbassdorError";
import NotFound from "../../404";

const AmbassadorMain: React.FC = () => {
  const [loginMetadata, setLoginMetadata] = useState(new LoginMetadata("-1"));
  const [showLoading, setShowLoading] = useState(false);
  const [showNoProgram, setShowNoProgram] = useState(false);
  const [timeline, setTimeline] = useState(false);
  const [ambreward, setAmbReward] = useState(false);
  const [leaderboard, setLeaderboard] = useState(false);
  let setLoginData = (resp: any) => {
    setLoginMetadata(resp);
    StorageService.Set(AmbassadorLoginMetadataKey, resp, AmbassadorLoginMetadataExpiry);
  };
  useEffect(() => {
    // setLoginMetadata(new LoginMetadata("-1"));
    setShowLoading(true);
    StorageService.Get(AmbassadorLoginMetadataKey)
      .then((resp) => {
        if (resp != null) setLoginMetadata(resp);
        console.log(resp);
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
            <Link to="/ambassador">

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
            No Program Enrolled, contact Admin
          </IonSegment>
          <IonSegment mode="md">
            <IonButton routerLink="/ambassador"
              onClick={() => setShowNoProgram(false)}
            >
              Cancel
            </IonButton>
          </IonSegment>
        </IonGrid>
      </IonPopover>
      {loginMetadata.tokenString != "-1" && loginMetadata.id != -1 ? (
        <IonSplitPane contentId="main" class="backgroundImage">
          <Menu
            loginMetadata={loginMetadata}
            timeline={timeline}
            ambReward={ambreward}
            leaderboard={leaderboard}
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
                setAmbReward={setAmbReward}
              />
            </Route>
            <Route path="/ambassador" exact={true}>
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/:name/:name2" exact={true}>
              <AmbassadorError loginMetadata={loginMetadata} loginfunction={setLoginData} />
            </Route>
            <Route path="/ambassador/login" exact={true}>
              <Redirect to="/dashboard" />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      ) : (
        <IonRouterOutlet id="main">
          <Route path="/ambassador/login" exact={true}>
            <Redirect to="/ambassador/login"></Redirect>
            <Login loginfunction={setLoginData} />
          </Route>
          <Route path="/:page" exact={true}>
            <NotFound />
          </Route>
          <Route path="/ambassador" exact={true}>
            <Login loginfunction={setLoginData} />
          </Route>
        </IonRouterOutlet>
      )}
    </IonReactRouter>
  );
};
export default AmbassadorMain;
