import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonPage,
  IonRow,
} from "@ionic/react";
import NavBar from "../../NavBar";
import { useState } from "react";

import "../Styles/Signup.css";
import { Redirect } from "react-router";

const Signup = () => {
  const [name, setName] = useState<string | null | undefined>("");
  const [email, setEmail] = useState<string | null | undefined>("");
  const [password, setPassword] = useState<string | null | undefined>("");
  const [signin, setSignin] = useState(false);

  const handleClick = (e: any) => {
    e.preventDefault();
  };

  if (signin === true) {
    return <Redirect to="/user/login"></Redirect>;
  }

  return (
    <IonPage>
      <IonContent scrollY={true} scrollX={false} className="signup-page">
        <NavBar />
        <IonGrid>
          <IonRow class="signup-row justify-content-center">
            <IonCol class="info-column" size="4">
              <div className="info-container">
                <span>Don't pay today. Make sure you love it first.</span>
                <span>
                  We'll help you get Afleet plugged in and make sure you see a
                  clear success path before it's time to pay.
                </span>
                <span>
                  Upgrade, downgrade or cancel any time with 2 clicks.
                </span>
                <span>
                  No pressure and no commitment. You can upgrade, downgrade or
                  cancel your account any time with just a few clicks.
                </span>
                <span>Unlock community-led growth for your business.</span>
                <span>
                  Afleet makes it possible to drive growth through your
                  community. And we are here to help you achieve it
                </span>
              </div>
            </IonCol>
            <IonCol class="form-column" size="4">
              <form onSubmit={handleClick}>
                <span className="heading">Create an account</span>
                <IonItem class="input-container">
                  <IonInput
                    placeholder="Name"
                    value={name}
                    onIonChange={(e) => setName(e.detail.value)}
                    required={true}
                  ></IonInput>
                </IonItem>
                <IonItem class="input-container">
                  <IonInput
                    placeholder="Email Address"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value)}
                    required={true}
                  ></IonInput>
                </IonItem>
                <IonItem class="input-container">
                  <IonInput
                    placeholder="Password"
                    value={password}
                    onIonChange={(e) => {
                      setPassword(e.detail.value);
                    }}
                    required={true}
                  ></IonInput>
                </IonItem>
                <IonButton class="submit-button" type="submit">
                  Create account
                </IonButton>
              </form>
              <IonItem class="hr-line"></IonItem>
              <div className="line-text">or</div>
              <IonButton
                onClick={() => {
                  setSignin(true);
                }}
                class="signin-button"
              >
                Sign In
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
