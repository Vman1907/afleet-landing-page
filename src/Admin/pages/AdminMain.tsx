import { IonApp, IonContent, IonRouterOutlet, IonSegment, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useState, useEffect } from "react";
import { Route, Redirect } from "react-router";
import Loading from "../components/Loading";
import Menu from "../components/Menu";
import {
  AdminLoginMetadataExpiry,
  AdminLoginMetadataKey,
} from "../Constants/AdminStorageConstants";
import { LoginMetadata } from "../Models/LoginMetadata";
import { StorageService } from "../../Services/StorageService";
import Login from "./Login";
import Page from "./Page";
import "../Styles/Login.css";
import AdminError from "./AdminError";
import NotFound from "../../404";

const AdminMain: React.FC = () => {
  const [loginMetadata, setLoginMetadata] = useState(new LoginMetadata("-1"));
  const [showLoading, setShowLoading] = useState(false);
  let setLoginData = (resp: any) => {
    setLoginMetadata(resp);
    StorageService.Set(AdminLoginMetadataKey, resp, AdminLoginMetadataExpiry);
  };
  useEffect(() => {
    // setLoginMetadata(new LoginMetadata("-1"));
    setShowLoading(true);
    StorageService.Get(AdminLoginMetadataKey)
      .then((resp) => {
        if (resp != null) setLoginMetadata(resp);
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
      {loginMetadata.tokenString != "-1" ? (
        <IonSplitPane contentId="main" class="backgroundImage">
          <Menu loginMetadata={loginMetadata} loginfunction={setLoginData} />
          <IonRouterOutlet id="main">
            <Route path="/:name" exact={true}>
              <Page
                loginMetadata={loginMetadata}
                loginfunction={setLoginData}
              />
            </Route>
            <Route path="/admin" exact={true}>
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/:name/:name2" exact={true}>
              <AdminError loginMetadata={loginMetadata} loginfunction={setLoginData} />
            </Route>
            <Route path="/admin/login" exact={true}>
              <Redirect to="/dashboard" />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      ) : (
        <IonRouterOutlet id="main">
          <Route path="/admin/login" exact={true}>
            <Redirect to="/admin/login"></Redirect>
            <Login loginfunction={setLoginData} />
          </Route>
          <Route path="/:page" exact={true}>
            <NotFound />
          </Route>
          <Route path="/admin" exact={true}>
            <Login loginfunction={setLoginData} />
          </Route>
        </IonRouterOutlet>
      )}
    </IonReactRouter>
  );
};
export default AdminMain;
