import {
  IonApp,
  IonGrid,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  Redirect,
  Route,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Main from "./Main";
import Error from "./Error";
import ResetPassword from "./Util/ResetPassword";
import ClientRecruitFormGlobal from "./Client/pages/ClientRecruitFormGlobal";
import Landing from "./Landing";
import Signup from "./Client/pages/Signup";
setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/reset/:role/:token">
            <ResetPassword />
          </Route>
          <Route path="/:page" exact={true}>
            <Main />
          </Route>
          <Route path="/:page/:page2" exact={true}>
            <Error />
          </Route>
          <Route path="/form/:programName/:formId">
            <ClientRecruitFormGlobal />
          </Route>
          <Route path="/:page/login" exact={true}>
            <Main />
          </Route>
          <Route path="/" exact={true}>
            {/* <Signup /> */}
            <Landing />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
