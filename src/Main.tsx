import { IonApp, IonContent, IonPage, IonRouterOutlet, IonSegment, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useState, useEffect, createContext } from "react";
import { Route, Redirect, useParams, useRouteMatch } from "react-router";
import { LoginMetadata } from "./Admin/Models/LoginMetadata";
import AdminMain from "./Admin/pages/AdminMain";
import AmbassadorMain from "./Ambassador/pages/AmbassadorMain";
import Campaigns from "./Ambassador/pages/Campaigns";
import ClientMain from "./Client/pages/ClientMain";
import ClientRecruitFormGlobal from "./Client/pages/ClientRecruitFormGlobal";

const route = createContext("");
const Main: React.FC = () => {
  const { page } = useParams<{ page: string }>();
  console.log(useRouteMatch());
  let route = sessionStorage.getItem("page");
  if (route == null || page === 'ambassador' || page === 'user' || page === 'admin') {
    sessionStorage.setItem("page", page);
    route = page;
  }
  console.log(route);
  if (route === "admin")
    return (
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact={false}>
            <AdminMain />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    );
  else if (route === "ambassador")
    return (
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact={false}>
            {/* <Campaigns name="Campaign" loginMetadata={new LoginMetadata("-1")} loginfunction={() => { }} /> */}
            <AmbassadorMain />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    );
  else if (route === 'user')
    return (
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact={false}>
            <ClientMain />
          </Route>

        </IonRouterOutlet>
      </IonReactRouter>
    );
  // else if(route === "form")
  //     return(
  //       <IonReactRouter>
  //         <IonRouterOutlet>
  //           <Route path="/:formId" exact={false}>
  //             <ClientRecruitFormGlobal />
  //           </Route>
  //         </IonRouterOutlet>
  //       </IonReactRouter>

  //     );
  else
    return (
      <IonPage>
        <IonContent>
          <IonSegment mode="md" style={{ marginTop: 50 }}>
            Invalid URL
          </IonSegment>
        </IonContent>
      </IonPage>
    );
};
export default Main;
