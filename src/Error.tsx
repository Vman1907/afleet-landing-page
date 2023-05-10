import { IonContent, IonPage, IonRouterOutlet, IonSegment } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router";
import NotFound from "./404";
import AdminMain from "./Admin/pages/AdminMain";
import AmbassadorMain from "./Ambassador/pages/AmbassadorMain";
import ClientMain from "./Client/pages/ClientMain";

const Error: React.FC = () => {
  let route = sessionStorage.getItem("page");
  if (route == null)
    return (
      <IonContent>
        Invalid URL
        {console.log("error")}
      </IonContent>
    );
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
  else if (route === "client")
    return (
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact={false}>
            <ClientMain />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    );
  else return <NotFound />;
};
export default Error;
