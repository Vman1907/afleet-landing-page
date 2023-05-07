import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonPage, IonPopover, IonRow, IonSegment } from "@ionic/react";
import { ReactFormBuilder, ReactFormGenerator } from "react-form-builder2";
import ClientRecruitmentService from "../Services/ClientRecruitmentService";
import { LoginMetadata } from '../Models/LoginMetadata';
import { useEffect, useState } from "react";
import TopComponent from '../Components/TopComponent';
import ClientRecruitmentFormDetailsResponse from "../Models/ClientRecruitmentFormDetailsResponse";

import { PreRequirementData } from "../Models/RequireFormData";


interface ClientRecruitmentFormProp {
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  form: any;
  newForm: boolean,
  setFormList: (formObj: any) => void;
  setCreateForm: (formObj: any) => void;
  setNewForm: (value: boolean) => void;
}

const ClientRecruitmentForm: React.FC<ClientRecruitmentFormProp> = ({ loginMetadata, loginfunction, newForm, setFormList, setCreateForm, form, setNewForm }) => {


  const [previewVisible, setPreviewVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [fromContent, setFromContent] = useState(PreRequirementData);
  const [requiredFields, setRequiredFields] = useState(false);
  // fromContent = PreRequirementData;
  const onSubmitData = () => {
    console.log("Submit Click");
    ClientRecruitmentService.editForm(loginMetadata, JSON.stringify(fromContent), form.id)
      .then((resp) => {
        setNewForm(false);
        console.log(resp)
        ClientRecruitmentService.getAllFormData(loginMetadata)
          .then((resp) => {
            setFormList(resp);
            setAlertMessage("Form Submitted Successfully")
            setShowAlert(true);
          })

      })
      .catch((e) => {
        console.log(e);
      });

  }


  const onLoad = () => {
    console.log("Load From Data");


    if (newForm == true) {
      return new Promise<any>(async (resolve, reject) => {
        let reqFormData = fromContent;

        console.log("-------FORM DATA----------")
        console.log(reqFormData)
        setFromContent(reqFormData);
        resolve(reqFormData);


      });

    }
    else {
      return new Promise<any>(async (resolve, reject) => {
        let reqFormData: any = [];

        console.log("-------FORM DATA----------")
        // console.log(reqFormData);
        await ClientRecruitmentService.getFormDataOnLoad(loginMetadata, form.id).then((resp) => {
          console.log(resp);
          resp.map((fields: any) => {
            reqFormData.push(fields);
          })
        })
        // PreRequirementData.map((fields) => {
        //   // console.log(fields)
        //   if (reqFormData.length == 0 || !reqFormData.find((element) => element == fields)) {
        //     console.log("data is not present");
        //     reqFormData.push(fields);
        //   }
        // })
        console.log(reqFormData)
        setFromContent(reqFormData);

        // if(requiredFields == false) {
        //   PreRequirementData.map((data)=>{
        //     reqFormData.push(data);
        //   });
        //   setRequiredFields(true);
        // }

        resolve(reqFormData);


      });
    }
  };

  // const onLoad = () => {
  //     let data1 = (ClientRecruitmentService.getFormData(loginMetadata, 1)
  //     .then(value=>{
  //         setData(value);
  //     }).catch(err=>{
  //         console.log(err)
  //     }))
  //     return ClientRecruitmentService.getFormData(loginMetadata, 1)
  // };

  const onPost = (data: any) => {
    console.log("Post Data ", typeof (data.task_data), data);
    let formDataReq = data.task_data;

    setFromContent(formDataReq);
  };

  // const  onPost = (data: any) => {
  //     ClientRecruitmentService.editForm(loginMetadata, JSON.stringify(data), 1);
  // };

  // const clickHandler=()=>{
  //     let data1 = (ClientRecruitmentService.getFormData(loginMetadata, 1)
  //     .then(value=>{
  //         setData(value);
  //     }).catch(err=>{
  //         console.log(err)
  //     }))
  // }



  return (
    <div className="create-form-wrapper">
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => {
          setCreateForm({ showForm: false, form: form });

        }}
        message={alertMessage}
      />
      <IonPopover isOpen={previewVisible} onDidDismiss={() => { setPreviewVisible(false) }} class="ClientRewardsPopover3">
        <IonCard>
          <IonContent>
            <IonCardContent>
              <ReactFormGenerator
                form_action="/path/to/form/submit"
                form_method="POST"
                read_only={true}
                hide_actions={true}
                data={fromContent}
              />
            </IonCardContent>
          </IonContent>
        </IonCard>
      </IonPopover>
      <IonCardContent class="marginForContent">
        <IonRow class="ClientRewardsHead">
          <IonCol class='ClientRewardsSubHead'>
            Create Form
          </IonCol>
          <IonCol class='ion-text-end' size="2.5">
            <IonButton onClick={() => { setPreviewVisible(true) }}>Preview</IonButton>
            <IonButton onClick={() => { setCreateForm({ showForm: false, form: form }) }}>Back</IonButton>
          </IonCol>
        </IonRow>

        <IonCard>
          <IonCardHeader>
            <IonButton onClick={onSubmitData}> Submit </IonButton>
          </IonCardHeader>
          <IonCardContent>
            <ReactFormBuilder

              onLoad={onLoad}
              onPost={onPost}
            />
          </IonCardContent>

        </IonCard>
      </IonCardContent>
    </div>
  )

}
export default ClientRecruitmentForm;