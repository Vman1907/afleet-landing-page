import {
  IonPage,
  IonContent,
  IonGrid,
  IonCard,
  IonTitle,
  IonRow,
  IonInput,
  IonButton,
  IonLabel,
  IonImg,
  IonAlert,
} from "@ionic/react";
import React, { useState } from "react";
import { BsKey } from "react-icons/bs";
import { Redirect, useParams, useRouteMatch } from "react-router";
import logo from "../Assets/Images/logo_3.png";
import UtilService from "../Services/UtilService";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [alertMessage, setalertMessage] = useState("");
  const { token, role } = useParams<{ token: string; role: string }>();
  const [redirect, SetRedirect] = useState<boolean>(false);
  const [passwordCriteria, setShowPasswordCriteria] = useState<boolean>(false);
  if (redirect) {
    return <Redirect to={"/" + role} />;
  }
  return (
    <IonPage>
      <IonContent>
        <IonGrid className="outerBox">
          <IonCard className="LoginBox">
            <IonGrid>
              <BsKey
                className="forgotPasswordKey"
                style={{ marginLeft: "33%" }}
                size={70}
              />
              <IonRow className="LoginTitle">Change Password</IonRow>
              <IonRow className="LoginEmail">Password*</IonRow>
              <IonRow>&nbsp;</IonRow>
              <IonRow className="LoginInput">
                <IonInput
                  placeholder="Enter Password"
                  value={password}
                  type="password"
                  minlength={5}
                  onIonChange={(event) => {
                    setPassword(
                      event.detail.value == undefined
                        ? ""
                        : event.detail.value?.toString()
                    );
                  }}
                ></IonInput>
              </IonRow>
              <IonRow className="LoginEmail">Confirm Password*</IonRow>
              <IonRow>&nbsp;</IonRow>
              <IonRow className="LoginInput">
                <IonInput
                  type="password"
                  placeholder="Re-enter Password"
                  value={confirmPassword}
                  minlength={5}
                  onIonChange={(event) => {
                    setConfirmPassword(
                      event.detail.value == undefined
                        ? ""
                        : event.detail.value?.toString()
                    );
                  }}
                ></IonInput>
              </IonRow>
              <IonGrid>
                <IonRow>Password should have:</IonRow>
                <IonRow>1. Minimum eight characters</IonRow>
                <IonRow>2. Atleast one uppercase letter</IonRow>
                <IonRow>3. Atleast one lowercase letter</IonRow>
                <IonRow>4. Atleast one number</IonRow>
                <IonRow>5. Atleast one special character</IonRow>
              </IonGrid>
              <IonRow>
                <IonButton
                  className="LoginButton"
                  onClick={async () => {
                    if (password != confirmPassword) {
                      setalertMessage("Both Password Not Match");
                      setShowAlert2(true);
                    } else if (
                      !password.match(
                        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                      )

                    ) {
                      setShowPasswordCriteria(true);
                      setalertMessage(
                        "Password doesn't match the required criteria"
                      );
                      setShowAlert2(true);
                    } else {
                      setShowLoading(true);
                      UtilService.ChangePassword(password, token)
                        .then((resp: any) => {
                          console.log(resp);
                          if (resp.status == true) {
                            setShowLoading(false);
                            setalertMessage("Password Changed Successfully");
                            setShowAlert2(true);
                            setShowLoading(false);
                          } else {
                            setalertMessage("Invalid Email");
                            setShowAlert2(true);
                            setShowLoading(false);
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                          setalertMessage("Link Expired");
                          setShowAlert2(true);
                        });
                    }
                  }}
                >
                  Change Password
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
              setShowAlert2(false);
              setPassword("");
              setConfirmPassword("");
              if (alertMessage == "Password Changed Successfully") {
                SetRedirect(true);
              }
            }}
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default ResetPassword;
