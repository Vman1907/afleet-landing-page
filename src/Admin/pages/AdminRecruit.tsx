import { IonAlert, IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonCheckbox, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonPopover, IonRow, IonSegment } from "@ionic/react";
import { ellipsisVertical } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import download from "../../Assets/Images/download.svg";
import { LoginMetadata } from '../Models/LoginMetadata';
import 'react-form-builder2/dist/app.css';
import { Route } from 'workbox-routing';
import { Redirect } from 'react-router';
import { Browser } from '@capacitor/browser';
import { isStringEmpty, lowerCase } from '../../Util/BasicUtilityFunctions';
import TopComponent from '../components/TopComponent';
import ClientRecruitmentFormDetailsResponse from '../../Client/Models/ClientRecruitmentFormDetailsResponse';
import Loading from '../components/Loading';
import AdminRecruitmentService from '../Services/AdminRecruitmentService';
import AdminRecruitmentForm from '../components/AdminRecruitmentForm';
import { Manage } from "../../Client/Models/Manage";
import { GenericExcelWriter, SelectiveExcelWriter } from "../../Util/ExcelWriter";
import { IoTrashOutline } from "react-icons/io5";
import { menuController } from "@ionic/core";
interface AdminRecruitProps {
  name: string;
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}
const AdminRecruit: React.FC<AdminRecruitProps> = ({ name, loginMetadata, loginfunction }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [formList, setFormList] = useState<ClientRecruitmentFormDetailsResponse[]>([]);
  const [searchText, setSearchText] = useState("");
  const [createForm, setCreateForm] = useState({ showForm: false, form: new ClientRecruitmentFormDetailsResponse })
  const [showPopover, setShowPopover] = useState(false);
  const [enable, setEnable] = useState(0);
  const [newForm, setNewForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([]);
  const [showSelectionPopover2, setShowSeectionPopover2] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [countChecked, setCountChecked] = useState(0);
  const [showRejectPopover, setShowRejectPopover] = useState(false);
  const [form, setForm] = useState(-1);
  const [formResponseList, setFormResponseList] = useState<Manage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  // const popover = useRef<HTMLIonPopoverElement>(null);
  useEffect(() => {
    document.title = "Promotion Form - Afleet"
    getAllFormData();
    getPromotionFormList();
    // window.location.reload();

  }, []);
  const getAllFormData = async () => {
    setIsLoading(true);
    await AdminRecruitmentService.getAllFormData(loginMetadata)
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
  const openMenu = async () => {
    await menuController.open();
  };

  const getpopover = (e: any) => {
    console.log(e)
    setForm(e)
    // popover.current!.event = e;
    setShowPopover(true);

  }

  const rejectAmbassdor = (index: any) => {

    AdminRecruitmentService.RejectAmbassdor(loginMetadata, formResponseList[index]).then((data) => {
      console.log("Ambassdor Status Set To Reject(2)");
      const newList = formResponseList.filter((data) => {
        return data.id != formResponseList[index].id
      })
      setFormResponseList(newList);
      getPromotionFormList();

    }).catch((error) => {
      console.log("ERROR");
      console.log(error.name);

    })
  }

  const getPromotionFormList = () => {
    AdminRecruitmentService.GetPromotionFormList(loginMetadata).then((data) => {
      setFormResponseList(data);
    });
  }

  const acceptAmbassdor = (index: any) => {
    console.log("Adding New Ambasdor Of INDEX: ", index, formResponseList[index].id);
    AdminRecruitmentService.AcceptAmbassdor(loginMetadata, formResponseList[index]).then((data) => {
      console.log("Ambassdor Status Set To Approved(1)");
      const newList = formResponseList.filter((data) => {
        return data.id != formResponseList[index].id
      })
      setFormResponseList(newList);
      getPromotionFormList();
    }).catch((error) => {
      console.log("ERROR");
      console.log(error.name);
    })
  }


  const reverse = (str: string) => {
    const date = str;

    const [year, month, day] = date.split('-');

    const result = [day, month, year].join('-');

    return result;
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
          <IonPopover
            isOpen={showRejectPopover}
            onDidDismiss={() => {
              setShowRejectPopover(false);
            }}
            class="ClientRewardsPopover2"
          >
            <IonGrid class="programManagementPopOverGrid">
              <IonRow class="ClientRewardsPopoverCloseButton">
                <IonIcon
                  // md={close}
                  class="iconSize"
                  size="large"
                  onClick={() => {
                    setShowRejectPopover(false);
                  }}
                ></IonIcon>
              </IonRow>
              <IonSegment mode="md" class="popHead">
                Are you sure you want to delete
              </IonSegment>
              <IonSegment mode="md" class="popHead2">the ambassador?</IonSegment>
              <IonSegment mode="md">
                <IonButton
                  fill="solid"
                  class="ClientRewardsButton7"
                  onClick={() => {
                    setShowRejectPopover(false);
                    // openMenu();
                    if (currentIndex >= 0) {
                      // console.log("ambassador rejected");
                      rejectAmbassdor(currentIndex);

                    } else {
                      formResponseList.map((formData, index) => {
                        if (formData.checked === true) {
                          // console.log(formData.email);
                          rejectAmbassdor(index);
                        }
                      });

                    }

                  }}
                >
                  Confirm
                </IonButton>
              </IonSegment>
              <IonSegment mode="md">
                <IonButton
                  class="ClientManageButton2"
                  fill="clear"
                  onClick={() => {
                    setShowRejectPopover(false);
                    openMenu();

                  }}
                >
                  Cancel
                </IonButton>
              </IonSegment>
            </IonGrid>
          </IonPopover>
          <IonPopover
            mode="ios"
            class="selectionPopover2"
            isOpen={showSelectionPopover2}
            onDidDismiss={() => {
              setShowSeectionPopover2(false);
            }}
            arrow={true}
            alignment="end"
          >
            <IonItem class="pop3">
              <IonGrid>

                <IonRow>
                  <IonCol class="pop2 ion-text-center">Accept?</IonCol>
                </IonRow>
                <IonRow class="ion-text-center">
                  <IonCol size="6">

                    <IonButton
                      size="default"
                      onClick={() => {
                        console.log("accepting ambassador");
                        acceptAmbassdor(currentIndex);
                        setCurrentIndex(-1);
                        setShowSeectionPopover2(false);
                        openMenu();
                      }}
                    >Confirm</IonButton>
                  </IonCol>
                  <IonCol size="6">


                    <IonButton
                      size="default"
                      onClick={() => {
                        setShowSeectionPopover2(false);
                        openMenu();
                        formResponseList[currentIndex].checked = false;
                        setFormResponseList(formResponseList);
                        setCurrentIndex(-1);

                      }}
                    >
                      Cancel
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>

          </IonPopover>
          {isLoading ? (
            <Loading />
          ) : (
            createForm.showForm ?
              <AdminRecruitmentForm form={createForm.form} setFormList={setFormList} setCreateForm={setCreateForm} loginMetadata={loginMetadata} loginfunction={loginfunction} setNewForm={setNewForm} newForm={newForm} />
              : (
                <IonGrid class="scrolling">
                  <IonRow class="ClientRewardsHead">
                    <IonCol class='ClientRewardsSubHead'>
                      Promotion Form
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
                          navigator.clipboard.writeText(window.location.origin + "/form/Afleet/" + form.toString())
                          setShowPopover(false);
                        }}>Copy Link</IonContent>

                      <IonContent class="ion-padding" style={{ cursor: "pointer" }}
                        onClick={() => {
                          Browser.open({ url: "/form/Afleet/" + form.toString() });
                          setShowPopover(false);
                        }}>View Form</IonContent>
                      <IonContent class="ion-padding" style={{ cursor: "pointer" }}
                        onClick={() => {
                          setShowPopover(false);
                          if (enable == 0) {
                            AdminRecruitmentService.UpdateForm(loginMetadata, 1).then((resp) => {
                              setEnable(1);
                            })
                          }
                          else {
                            AdminRecruitmentService.UpdateForm(loginMetadata, 0).then((resp) => {
                              setEnable(0);
                            })
                          }
                        }}>{enable == 0 ? "Disable Form" : "Enable Form"}</IonContent>

                    </IonPopover>
                    {formList.map((form, index) => {

                      return (<IonCol key={form.id} size='3'>
                        <IonCard key={form.id} className="form-card">
                          <div className='image-rep' onClick={() => {
                            if (enable == 0) {
                              setCreateForm({ showForm: true, form: form })
                            }
                            else {
                              setShowAlert(true);
                            }
                          }}></div>

                          <IonCardTitle className='form-title'>
                            Form
                            <IonItem button onClick={() => { getpopover(form.id) }} >
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
                  {formResponseList && formResponseList.length > 0 ?
                    <IonGrid>
                      <IonRow class="ClientRewardsHead">
                        <IonCol class="ClientRewardsSubHead">
                          Recruit Ambassador
                        </IonCol>
                        <IonCol class="ion-text-end">
                          <IonButton
                            class="ClientManageButton"
                            fill="outline"
                            onClick={async () => {
                              console.log("hey");
                              let form_data: any[] = [];
                              let RecruitAmbassadorSchema1: any[] = [];
                              await AdminRecruitmentService.GetFormSchema(loginMetadata).then((resp) => {
                                resp.schema.map((data: any) => {
                                  let val: any = [];
                                  let col = data.label
                                  let types = String;
                                  RecruitAmbassadorSchema1.push({
                                    column: col,
                                    type: types,
                                    value: (formList: any) => formList[data.field_name],
                                  })
                                })

                                resp.form_response.map((formData: any) => {
                                  let form_string = JSON.parse(formData.form_string)
                                  form_data.push(form_string)
                                })
                              })
                              // setShowPopover(true);
                              // openMenu();
                              countChecked
                                ? SelectiveExcelWriter(
                                  form_data,
                                  RecruitAmbassadorSchema1,
                                  checked,
                                  "Promotion_Details"
                                )
                                :
                                GenericExcelWriter(
                                  form_data,
                                  RecruitAmbassadorSchema1,
                                  "Promotion_Details"
                                );

                            }}
                          >
                            <IonImg src={download}></IonImg>&nbsp;&nbsp;
                            {countChecked ? "Download Checked" : "Download All"}
                          </IonButton>
                          <IonButton
                            fill="outline"
                            class="ClientRewardsButton3"
                            onClick={() => {
                              setShowRejectPopover(true);
                              openMenu();

                            }}
                          >
                            <IoTrashOutline size={20} color="#fffff" className="ClientRewardsEdit" />
                            Delete
                          </IonButton>
                        </IonCol>
                      </IonRow>

                      <IonGrid className="recruit-amb" style={{ minWidth: "600px" }}>

                        <IonRow class="ClientCampaignTitle">
                          <IonCol class="ClientCampaignContent ion-text-center" id="">
                            <IonCheckbox mode="md"
                              class="AmbassdorCheckBox"
                              checked={(countChecked == formResponseList.length) ? true : false}
                              onIonChange={(e) => {
                                setAllChecked(e.detail.checked);
                                if (e.detail.checked) {
                                  for (
                                    var i = 0;
                                    i < formResponseList.length;
                                    i++
                                  ) {
                                    checked[i] = true;
                                  }
                                  setCountChecked(
                                    formResponseList.length
                                  );
                                } else {
                                  for (
                                    var i = 0;
                                    i < formResponseList.length;
                                    i++
                                  ) {
                                    checked[i] = false;
                                  }
                                  setCountChecked(0);
                                }
                              }}

                            ></IonCheckbox>
                          </IonCol>
                          <IonCol class="ClientCampaignContent ion-text-start" id="" >
                            Name
                          </IonCol>
                          <IonCol class="ClientCampaignContent ion-text-center" id="" >
                            Email
                          </IonCol>
                          <IonCol class="ClientCampaignContent ion-text-center" id="" >
                            Phone Number
                          </IonCol>
                          <IonCol class="ClientCampaignContent ion-text-center" id="">
                            Country
                          </IonCol>
                          <IonCol class="ClientCampaignContent ion-text-center" id="" >

                          </IonCol>
                        </IonRow>


                        {formResponseList.map(
                          (formData, index: number) => {
                            if (lowerCase(
                              formData.first_name + " " + formData.last_name
                            ).includes(lowerCase(searchText)) ||
                              lowerCase(formData.email).includes(
                                lowerCase(searchText)
                              ) ||
                              lowerCase(formData.contact.toString()).includes(
                                lowerCase(searchText)
                              ) ||
                              lowerCase(formData.country).includes(
                                lowerCase(searchText)
                              )) {
                              return (

                                // <IonGrid key={formData.id}>
                                <IonRow class="ClientLeaderboardRow">
                                  <IonCol

                                    class="ClientLeaderboardDetail ion-text-center" id="index"
                                  >
                                    <IonCheckbox mode="md"

                                      class="AmbassdorCheckBox "
                                      disabled={allChecked}
                                      checked={checked[index]}
                                      onClick={() => { formData.checked = !formData.checked }}
                                      // style={{ marginLeft: 20 }}
                                      onIonChange={(e) => {
                                        if (e.detail.checked) {
                                          checked[index] = true;
                                          var count = 0;
                                          checked.forEach((value) => {
                                            if (value) count++;
                                          });

                                          setCountChecked(count);

                                          console.log(checked);
                                        } else {
                                          checked[index] = false;
                                          var count = 0;
                                          checked.forEach((value) => {
                                            if (value) count++;
                                          });
                                          setCountChecked(count);

                                        }
                                      }}></IonCheckbox>
                                  </IonCol>
                                  <IonCol class="ClientLeaderboardDetail ion-text-start">
                                    {formData.first_name + " " + formData.last_name}

                                  </IonCol>
                                  <IonCol class="ClientLeaderboardDetail ion-text-center">
                                    {formData.email}
                                  </IonCol>
                                  <IonCol class="ClientLeaderboardDetail ion-text-center">
                                    {formData.contact}

                                  </IonCol>
                                  <IonCol class="ClientLeaderboardDetail ion-text-center">
                                    {formData.country}



                                  </IonCol>
                                  <IonCol class="ClientLeaderboardDetail ion-text-center " style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    flexDirection: "row",
                                    flexWrap: "wrap"
                                  }} >
                                    <IonButton color="success" class="accept-btn"
                                      onClick={() => {
                                        setShowSeectionPopover2(true);
                                        setCurrentIndex(index);
                                        formData.checked = true;
                                        openMenu();
                                        // acceptAmbassdor(index)
                                      }}
                                    > <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                      width="10" height="10"
                                      viewBox="0 0 48 48"
                                      style={{ "fill": "#000000", "marginRight": 5 }}><path fill="#43A047" d="M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z"></path></svg>
                                      Accept
                                    </IonButton>

                                    <IonButton color="danger" class="reject-btn"
                                      onClick={() => {
                                        setShowRejectPopover(true);
                                        setCurrentIndex(index);
                                        formData.checked = true;
                                        // rejectAmbassdor(index)
                                      }}
                                    ><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                      width="10" height="10"
                                      viewBox="0 0 48 48"
                                      style={{ "fill": "#000000", "marginRight": 5 }}><path fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"></path><path fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"></path></svg>
                                      Reject
                                    </IonButton>


                                  </IonCol>
                                  <IonRow class="line"></IonRow>

                                </IonRow>


                                // </IonGrid>
                              )
                            }
                          })
                        }
                      </IonGrid>

                    </IonGrid>
                    : <></>
                  }
                </IonGrid>
              )
          )}
        </IonContent>
      </IonCard>


    </IonPage>
  );
};

export default AdminRecruit;
