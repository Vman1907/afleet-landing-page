import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonPage,
  IonPopover,
  IonRouterOutlet,
  IonRow,
  IonSegment,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { useEffect, useState } from 'react';
import { ReactFormBuilder, ReactFormGenerator } from 'react-form-builder2';
import { Route, Redirect, useParams } from "react-router";
import { LoginMetadata } from '../Models/LoginMetadata';
import ClientRecruitmentService from "../Services/ClientRecruitmentService";
import ClientRecruitmentFormDetailsResponse from '../Models/ClientRecruitmentFormDetailsResponse';
import { IonReactRouter } from "@ionic/react-router";
import Page from "./Page";
import logo from "../../Assets/Images/logo_3.png";
import temp from "../../Assets/Images/defaultImage.svg";
import ReCAPTCHA from "react-google-recaptcha";
import "../Styles/ClientManage.css";
import { GlobalFormURL } from "../../Admin/Constants/AdminConfig";
import { PreRequirementData } from "../Models/RequireFormData";
import { Browser } from "@capacitor/browser";
import GlobalFormConfirm from "./GlobalFormConfirm";
import { Link } from "react-router-dom";
import { isStringEmpty } from "../../Util/BasicUtilityFunctions";
import error from "../../Assets/Images/error.png";
// import {Routes, Route, useNavigate} from 'react-router-dom';


const ClientRecruitFormGlobal: React.FC = () => {
  const [submit, setSubmit] = useState<Number>(0);
  const [showPopover, setShowPopover] = useState(false);
  const [formData, setFormData] = useState<any>([]);
  const { formId } = useParams<{ formId: string }>();
  const { programName } = useParams<{ programName: string }>();
  const [clientImg, setClientImg] = useState("");
  const [enable, setEnable] = useState(-1);
  const [verify, setVerify] = useState(true);



  useEffect(() => {
    document.title = programName

    fetch(GlobalFormURL + "/" + programName + "/" + formId)
      .then((result) => {
        // console.log(result.json());

        result.json().then((resultRes) => {
          let resp = [];
          console.log(resultRes);
          setClientImg(resultRes.programImg);
          resp = resultRes.response;
          setEnable(resultRes.status);
          // resp.push(formContent);
          // console.log(resp.isArray);
          // console.log(resp[0].id);
          setFormData(resp);

          console.log(resp);
        }).catch((err) => {
          console.log(err);

        })
      })


  }, []);

  function onChange(value: any) {
    setVerify(false);
  }



  if (enable == 0) {
    if (submit === 0)
      return (

        <IonContent class="form-parent">
          <div className="form-headband-wrapper">
            <span className="form-headband" ></span>
          </div>
          <div className="form-box">

            <IonPopover
              class="pop"
              isOpen={showPopover}
              onDidDismiss={() => {
                setShowPopover(false);
              }}

            >
              <IonContent class="ion-padding ion-text-center" style={{ cursor: "pointer" }}>
                Form Submited
              </IonContent>
            </IonPopover>

            <div className="afleetLogoWrapper">
              <img className="afleetLogo" src={isStringEmpty(clientImg) ? temp : clientImg} />
            </div>
            <ReactFormGenerator
              data={formData}
              form_method="POST"
              hide_actions={verify}
              form_action={GlobalFormURL + "/" + programName + "/" + formId + "/submit"}
              onSubmit={(res) => {
                // setShowPopover(true);
                console.log("Response")
                // console.log(res);
                interface formResponseType {
                  [key: string]: any
                };

                const formResponse: formResponseType = {

                };
                res.map((eachRes) => {
                  //swaping key vlaue pair
                  formResponse[eachRes.name] = eachRes.value;
                  // formResponse.eachRes.name = eachRes.value;
                  // console.log(eachRes.name + " " + eachRes.value);
                })

                console.log(formResponse);

                const requestOptions = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(formResponse)
                };

                fetch(GlobalFormURL + "/" + programName + "/" + formId + "/submit", requestOptions)
                  .then(response => response.json())
                  .then((data) => {
                    console.log(data);
                    setTimeout(() => { setSubmit(data.submitCode) }, 500);

                    // console.log("FORM RESPONSES SEND")
                    // console.log(data);

                  }).catch((error) => {
                    setSubmit(2);
                  })
                // setTimeout(() => {window.open("/form/"+formId, "_self")}, 50);

              }}
            // submitButton={<button type="submit" className="btn btn-primary">Submit</button>}


            />
            <ReCAPTCHA
              sitekey="6LebdNYiAAAAAKzznX-PTtOO6djRRdHxehk8HhVM"
              onChange={onChange}
            />
            <p style={{ "marginLeft": "44%" }}>Powered By:</p>
            <IonImg src={logo} className="afleetLogo-footer" />

          </div>

        </IonContent>


      );
    else return (<GlobalFormConfirm formId={formId} submit={submit} setSubmit={setSubmit} />);
  }
  else {
    return (
      <IonPage>
        <IonCard class="backgroundAdjustment" style={{ background: "#E5E5E5" }}>
          <IonContent>
            <IonCardContent class="marginForContent">
              <IonGrid>
                <IonRow>
                  <IonSegment mode="md">
                    <IonImg className="errorImg" src={error}></IonImg>
                  </IonSegment>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonContent>
        </IonCard>
      </IonPage>
    )
  }
}

export default ClientRecruitFormGlobal;



