import '../Styles/ClientManage.css';
import '../Styles/ClientRecruit.css'


import { IonAlert, IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonPage, IonPopover, IonRow, IonSegment } from "@ionic/react";
import { chevronForwardOutline, ellipsisVertical } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { LoginMetadata } from '../Models/LoginMetadata';
import TopComponent from '../Components/TopComponent';
import ClientRecruitmentForm from '../Components/ClientRecruitmentForm';
import 'react-form-builder2/dist/app.css';
import ClientRecruitmentService from '../Services/ClientRecruitmentService';
import ClientRecruitmentFormDetailsResponse from '../Models/ClientRecruitmentFormDetailsResponse';
import Loading from '../Components/Loading';
import { Route } from 'workbox-routing';
import { Redirect } from 'react-router';
import { Browser } from '@capacitor/browser';
import { isStringEmpty, lowerCase } from '../../Util/BasicUtilityFunctions';
import AmbassdorInviteListResponse from '../Models/AmbassdorInviteListResponse';
import AmbassdorInviteDetails from '../Models/AmbassdorInviteDetails';
import AmbassadorInvite from '../Components/Popovers/AmbassadorInvite';
import temp from "../../Assets/Images/campaignDeafult.png";
interface ClientRecruitProps {
  name: string;
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}
const ClientRecruit: React.FC<ClientRecruitProps> = ({ name, loginMetadata, loginfunction }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [formList, setFormList] = useState<ClientRecruitmentFormDetailsResponse[]>([]);
  const [searchText, setSearchText] = useState("");
  const [createForm, setCreateForm] = useState({ showForm: false, form: new ClientRecruitmentFormDetailsResponse })
  const [showPopover, setShowPopover] = useState(false);
  const [showPopover1, setShowPopover1] = useState(false);
  const [enable, setEnable] = useState(0);
  const [newForm, setNewForm] = useState(false);
  const [invite, setInvite] = useState(false);
  const [email, setEmail] = useState("");
  const [aName, setAName] = useState("");
  const [ambassadorDetails, setAmbassdorDetails] = useState<AmbassdorInviteDetails>(new AmbassdorInviteDetails());
  const [ambassdorDetailsList, setAmbassdorDetailsList] =
    useState<AmbassdorInviteListResponse>(new AmbassdorInviteListResponse());
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [form, setForm] = useState(-1);
  // const popover = useRef<HTMLIonPopoverElement>(null);
  useEffect(() => {
    document.title = "User Recruit - Afleet"
    getAllFormData();
    getInviteList();
    // window.location.reload();

  }, []);
  const getAllFormData = async () => {
    setIsLoading(true);
    await ClientRecruitmentService.getAllFormData(loginMetadata)
      .then((resp) => {
        console.log(resp)
        setFormList(resp);
        setIsLoading(false);
        setEnable(resp[0].status)
      })
      .catch((e) => {
        console.log(e);
        // setIsLoading(false);
      });


  };
  const getInviteList = async () => {
    setIsLoading(true);
    await ClientRecruitmentService.inviteAmbList(loginMetadata)
      .then((resp) => {
        console.log(resp);
        setAmbassdorDetailsList(resp);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        // setIsLoading(false);
      });

  };

  const getpopover = (e: any) => {
    console.log(e)
    setForm(e)
    // popover.current!.event = e;
    setShowPopover(true);

  }


  const reverse = (str: string) => {
    const date = str;

    const [year, month, day] = date.split('-');

    const result = [day, month, year].join('-');

    return result;
  }

  const sendInvite = () => {
    ClientRecruitmentService.inviteAmb(loginMetadata, email, aName, form.toString()).then((resp) => {
      setShowPopover1(false);
      setShowAlert1(true);
    })
  }


  return (

    <IonPage>

      <IonCard class="backgroundAdjustment">
        <IonContent scrollX={true} scrollY={true}>
          <TopComponent
            loginMetadata={loginMetadata} loginfunction={loginfunction} searchText={searchText} setSearchText={setSearchText} />
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => {
              setShowAlert(false);

            }}
            message="Form is Disabled"
          />
          <IonAlert
            isOpen={showAlert1}
            onDidDismiss={() => {
              setShowAlert1(false);

            }}
            message="Invite Sent"
          />
          <IonAlert
            isOpen={invite}
            message={"Are you sure you want to invite this Ambassador"}
            onDidDismiss={() => {
              setInvite(false);
            }}
            buttons={[
              { text: "Cancel", role: "cancel" },
              {
                text: "Yes",
                handler: () => {
                  sendInvite();
                },
              },
            ]}
          />
          {isLoading ? (
            <Loading />
          ) : (
            createForm.showForm ?
              <ClientRecruitmentForm form={createForm.form} setFormList={setFormList} setCreateForm={setCreateForm} loginMetadata={loginMetadata} loginfunction={loginfunction} setNewForm={setNewForm} newForm={newForm} />
              : (
                <IonCardContent class="marginForContent">
                  <IonGrid class="scrolling">
                    <IonRow class="ClientRewardsHead">
                      <IonCol class='ClientRewardsSubHead'>
                        Ambassador Recruitment Form
                      </IonCol>
                      {formList.length > 0 ? <></> : <IonCol class='ion-text-end' size="2.5">
                        <IonButton fill='outline' class="ClientRecruitButton" onClick={() => { setNewForm(true); setCreateForm({ showForm: true, form: new ClientRecruitmentFormDetailsResponse }) }}>
                          + Create Recruit Form
                        </IonButton>
                      </IonCol>}

                    </IonRow>
                    <IonRow>
                      <IonPopover class='pop' id="formPopOver" isOpen={showPopover} onDidDismiss={() => setShowPopover(false)} translucent={true}>
                        <IonContent class="ion-padding " style={{ cursor: "pointer" }}
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.origin + "/form/" + loginMetadata.program_name + "/" + form.toString())
                            setShowPopover(false);
                          }}>Copy Link</IonContent>

                        <IonContent class="ion-padding" style={{ cursor: "pointer" }}
                          onClick={() => {
                            Browser.open({ url: "/form/" + loginMetadata.program_name + "/" + form.toString() });
                            setShowPopover(false);
                          }}>View Form</IonContent>
                        <IonContent class="ion-padding" style={{ cursor: "pointer" }}
                          onClick={() => {
                            setShowPopover(false);
                            if (enable == 0) {
                              ClientRecruitmentService.UpdateForm(loginMetadata, 1).then((resp) => {
                                setEnable(1);
                              })
                            }
                            else {
                              ClientRecruitmentService.UpdateForm(loginMetadata, 0).then((resp) => {
                                setEnable(0);
                              })
                            }
                          }}>{enable == 0 ? "Disable Form" : "Enable Form"}</IonContent>

                      </IonPopover>
                      <AmbassadorInvite
                        loginMetadata={loginMetadata}
                        showPopover={showPopover1}
                        setShowPopover={setShowPopover1}
                        ambassadorDetails={ambassadorDetails}
                        setInvite={setInvite}
                      />
                      {formList.map((form, index) => {

                        return (<IonCol key={form.id} size='3'>
                          <IonCard key={form.id} className="form-card">
                            <img src={isStringEmpty(loginMetadata.program_img) ? temp : loginMetadata.program_img} className='image-rep' onClick={() => {
                              if (enable == 0) {
                                setCreateForm({ showForm: true, form: form })
                              }
                              else {
                                setShowAlert(true);
                              }
                            }} />

                            <IonCardTitle className='form-title'>
                              Form
                              <IonItem lines="none" button onClick={() => { getpopover(form.id) }} >
                                <IonIcon class='ellipsis' icon={ellipsisVertical} id={form.id.toString()} />
                              </IonItem>


                            </IonCardTitle>
                            <IonCardSubtitle className=''>created at : {
                              reverse(form.createdAt.slice(0, -14))
                            } </IonCardSubtitle>
                          </IonCard>
                        </IonCol>)

                      })}

                    </IonRow>
                    {formList.length > 0 && ambassdorDetailsList.ambassadorList.length > 0 && loginMetadata.invite_ambassadors == 1 ? <IonGrid><IonRow class="ClientInviteHead">
                      <IonCol>
                        Invite Ambassadors
                      </IonCol></IonRow>
                      <IonGrid>
                        <IonRow class="ProgramManagementTitle">
                          <IonCol
                            class="ProgramManagementContent ion-text-start"
                            style={{ paddingLeft: 30 }}
                          >
                            {" "}
                            Ambassador Name
                          </IonCol>
                          <IonCol class="ProgramManagementContent ion-text-center">
                            Industry
                          </IonCol>
                          <IonCol class="ProgramManagementContent ion-text-center">
                            Country
                          </IonCol>
                          <IonCol class="ProgramManagementContent ion-text-center">
                            Invite
                          </IonCol>
                          <IonCol class="ProgramManagementContent ion-text-center" size='2'>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                      {ambassdorDetailsList.ambassadorList.map((ambDetail: AmbassdorInviteDetails, index: number) => {
                        if (
                          lowerCase(ambDetail.country).includes(
                            lowerCase(searchText)
                          ) ||
                          lowerCase(ambDetail.industry).includes(
                            lowerCase(searchText)

                          )
                        ) {
                          return (
                            <IonGrid key={index} class="programManagementGrids">
                              <IonRow
                                class="ProgramManagementRow"
                                onClick={() => {
                                  // setShowPopover(true);
                                }}
                              >
                                <IonCol class="ProgramManagementDetail ion-text-start">
                                  <IonRow>
                                    <IonCol class="ion-text-start imageCol">
                                      <img
                                        src={
                                          isStringEmpty(ambDetail.ambassador_img)
                                            ? temp
                                            : ambDetail.ambassador_img
                                        }
                                        className="AdminManagementImage"
                                        alt="N/A"
                                      />
                                      <IonLabel>
                                        {ambDetail.first_name + " " + ambDetail.last_name}
                                      </IonLabel>
                                    </IonCol>

                                  </IonRow>
                                </IonCol>
                                <IonCol class="ProgramManagementDetail ion-text-center">
                                  {ambDetail.industry}
                                </IonCol>
                                <IonCol class="ProgramManagementDetail ion-text-center">
                                  {ambDetail.country}
                                </IonCol>
                                <IonCol
                                  class="ProgramManagementDetail ion-text-center"

                                >
                                  <IonButton
                                    fill="outline"
                                    class="programManagementLoginButton commonButton"
                                    onClick={() => {
                                      setInvite(true);
                                      setEmail(ambDetail.email);
                                      setAName(ambDetail.first_name + " " + ambDetail.last_name);
                                      setForm(formList[0].id)
                                    }}
                                  >
                                    Invite
                                  </IonButton>
                                </IonCol>
                                <IonCol
                                  class="ProgramManagementDetail ion-text-start"
                                  size='2'
                                  style={{ display: "flex", alignItems: "center" }}
                                >
                                  More Info&nbsp;
                                  <IonIcon
                                    icon={chevronForwardOutline}
                                    size="medium"
                                    class="icon"
                                    onClick={() => {
                                      setEmail(ambDetail.email);
                                      setAName(ambDetail.first_name + " " + ambDetail.last_name);
                                      setForm(formList[0].id)
                                      setAmbassdorDetails(ambDetail)
                                      setShowPopover1(true)
                                    }}
                                  />
                                </IonCol>
                              </IonRow>
                              <IonRow class="line"></IonRow>
                            </IonGrid>
                          );
                        }
                      })}
                    </IonGrid>
                      : null}
                  </IonGrid>
                </IonCardContent>
              )
          )}
        </IonContent>
      </IonCard>


    </IonPage>
    // </IonContent>
  );
};

export default ClientRecruit;
