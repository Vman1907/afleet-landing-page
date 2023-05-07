import {
  IonAlert,
  IonButton,
  IonCard,
  IonContent,
  IonGrid,
  IonImg,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import LoginService from "../Services/LoginService";
import "../styles/Login.css";
import logo from "../../Assets/Images/logo_3.png";
import Loading from "../Components/Loading";
import { useRouteMatch } from "react-router";
import { BsKey } from "react-icons/bs";
import UtilService from "../../Services/UtilService";
interface IProps {
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}
const Login: React.FC<IProps> = ({ loginfunction }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setalertMessage] = useState("");
  const [showAlert2, setShowAlert2] = useState(false);
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState(false);
  const [route, setRoute] = useState(useRouteMatch().path.substring(1));

  useEffect(() => {
    document.title = "Login - Afleet"
  })
  return showLoading ? (
    <IonPage>
      <Loading />
    </IonPage>
  ) : forgotPassword ? (
    <IonPage>
      <IonContent>
        <IonGrid className="outerBox">
          <IonCard className="LoginBox">
            <IonGrid>
              <BsKey className="forgotPasswordKey" style={{ marginLeft: "33%" }} size={70} />
              <IonRow className="LoginTitle">Forgot Password</IonRow>
              <IonRow className="LoginContent">
                Enter Email to change password
              </IonRow>
              <IonRow className="LoginEmail">Email address*</IonRow>
              <IonRow>&nbsp;</IonRow>
              <IonRow className="LoginInput">
                <IonInput
                  placeholder="Enter Email Address"
                  value={email}
                  onIonChange={(event) => {
                    setEmail(
                      event.detail.value == undefined
                        ? ""
                        : event.detail.value?.toString()
                    );
                  }}
                ></IonInput>
              </IonRow>
              <IonRow>
                <IonButton
                  className="LoginButton"
                  onClick={async () => {
                    setShowLoading(true);
                    UtilService.resetPassword(email, route).then((resp) => {
                      if (resp.status == true) {
                        setShowLoading(false);
                        setalertMessage("Email sent successfully to reset Password");
                        setShowAlert2(true);
                        setShowLoading(false);
                      } else {
                        setalertMessage("Invalid Email");
                        setShowAlert2(true);
                        setShowLoading(false);
                      }
                    });
                  }}
                >
                  Send Reset Password Link
                </IonButton>
              </IonRow>
            </IonGrid>
          </IonCard>
        </IonGrid>
        <IonGrid>
          <IonRow>
            <IonLabel className="LoginLabel">&nbsp; Powered By:</IonLabel>
          </IonRow>
          <IonRow>
            <IonImg src={logo} className="LoginLabel" style={{ width: "250px" }} />
          </IonRow>
          <IonAlert
            isOpen={showAlert2}
            message={alertMessage}
            onDidDismiss={() => {
              setEmail("");
            }}
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  ) : (
    <IonPage>
      <IonContent>
        <IonGrid className="outerBox">
          <IonCard className="LoginBox">
            <IonGrid>
              <IonRow className="LoginTitle">Sign In</IonRow>
              <IonRow className="LoginContent">
                Sign in to manage your account
              </IonRow>
              <IonRow className="LoginEmail">Email address*</IonRow>
              <IonRow className="LoginInput">
                <IonInput
                  placeholder="Enter Email Address"
                  value={email}
                  onIonChange={(event) => {
                    setEmail(
                      event.detail.value == undefined
                        ? ""
                        : event.detail.value?.toString()
                    );
                  }}
                ></IonInput>
              </IonRow>
              <IonRow className="LoginEmail">Password*</IonRow>
              <IonRow className="LoginInput">
                <IonInput
                  placeholder="Enter Password"
                  value={password}
                  type="password"
                  onIonChange={(event) => {
                    setPassword(
                      event.detail.value == undefined
                        ? ""
                        : event.detail.value?.toString()
                    );
                  }}
                ></IonInput>
              </IonRow>
              <IonRow class="forgotPasswordButton2"><IonLabel onClick={() => { setForgotPassword(true) }}>Forgot Password</IonLabel></IonRow>
              <IonRow>
                <IonButton
                  className="LoginButton"
                  onClick={async () => {
                    setShowLoading(true);
                    LoginService.authenticate(email, password).then((resp) => {
                      if (resp.status === false) {
                        setShowLoading(false);
                        setShowAlert(true);
                        setShowLoading(false);
                      } else {
                        loginfunction(resp)
                        setShowLoading(false);
                        // setShowPopover(true);
                        // if(showPopover===false && loginMetadata.ambassadorProgramId!==-1) { loginfunction(loginMetadata);} 
                        // setShowLoading(false);
                      }
                    });
                  }}
                >
                  Login
                </IonButton>
              </IonRow>
            </IonGrid>
          </IonCard>
        </IonGrid>
        <IonGrid>
          <IonRow>
            <IonLabel className="LoginLabel">&nbsp; Powered By:</IonLabel>
          </IonRow>
          <IonRow>
            <IonImg src={logo} className="LoginLabel" style={{ width: "250px" }} />
          </IonRow>
          <IonAlert
            isOpen={showAlert}
            message="Incorrect password and username combination"
            onDidDismiss={() => {
              setEmail("");
              setPassword("");
            }}
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
