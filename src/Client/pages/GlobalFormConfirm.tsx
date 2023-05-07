import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonCard,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonPopover,
  IonRouterOutlet,
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

import "../Styles/ClientManage.css";
import { GlobalFormURL } from "../../Admin/Constants/AdminConfig";
import { PreRequirementData } from "../Models/RequireFormData";
import { Browser } from "@capacitor/browser";



interface GlobalFormConfirmProps {
  formId: any
  submit: Number
  setSubmit: (submit: any) => void
}

const GlobalFormConfirm: React.FC<GlobalFormConfirmProps> = ({ formId, setSubmit, submit }) => {
  const { programName } = useParams<{ programName: string }>();
  useEffect(() => {
    document.title = programName
  })
  return (
    <IonContent>

      <div className="form-confirm">

        <IonLabel>YOUR RESPONSE IS {
          submit == 1 ? "NOT " : (submit == 2 ? "" : "ALREADY ")
        }RECORDED</IonLabel><br />
        {/* <IonLabel>Thank You</IonLabel> */}
        <p style={{ cursor: "pointer" }}
          onClick={() => {
            setSubmit(0);
          }}
        >Fill Another Response</p>
        <span style={{ "marginLeft": "2%", "marginTop": "1%" }}>Powered By:</span>
        <IonImg src={logo} className="afleetLogo-footer" />
      </div>

    </IonContent>


  );

}

export default GlobalFormConfirm;



