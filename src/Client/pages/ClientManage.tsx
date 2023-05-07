import "../Styles/ClientManage.css";
import temp from "../../Assets/Images/campaignDeafult.png";
import download from "../../Assets/Images/download.svg";

import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonPage,
  IonPopover,
  IonRow,
  IonSegment,
  IonTitle,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { close } from "ionicons/icons";
import { menuController } from "@ionic/core";
import { chevronForwardOutline } from "ionicons/icons";
import { LoginMetadata } from "../Models/LoginMetadata";
import TopComponent from "../Components/TopComponent";
import AmbassdorProfilePopover from "../Components/Popovers/AmbassdorProfilePopover";
import { AmbassadorManageDetail } from "../Models/AmbassadorManageDetail";
import ClientAmbassadorService from "../Services/ClienAmbassadorService";
import { AmbassdorCampaignResponse } from "../Models/AmbassdorCampaignResponse";
import Loading from "../Components/Loading";
import { GenericExcelWriter, SelectiveExcelWriter } from "../../Util/ExcelWriter";
import { AmbassdorSchema } from "../Constants/ExcelFileSchema";
import { IoTrashBinOutline, IoTrashOutline } from "react-icons/io5";
import { Manage } from "../Models/Manage";
import AmbassadorProgramDetails from "../Models/AmbassadorProgramsDetails";
import { AiOutlineDownload } from "react-icons/ai";
import { AmbassadorProgram } from "../Models/AmbassadorProgram";
import ClientAmbassadorCampaign from "../Components/ClientAmbassadorCapaign";
import CampaignforProgram from "../Models/CampaignforProgram";
import { isStringEmpty, lowerCase } from "../../Util/BasicUtilityFunctions";
import { BsDownload } from "react-icons/bs";

interface ClientManageProps {
  name: string;
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}
const ClientManage: React.FC<ClientManageProps> = ({
  name,
  loginMetadata,
  loginfunction,
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const [showPopover2, setShowPopover2] = useState(false);
  const [showPopover3, setShowPopover3] = useState(false);
  const [gender, setGender] = useState<string>();
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setemailInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [email1Input, setemail1Input] = useState("");
  const [first, setFirst] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [allChecked, setAllChecked] = useState(false);
  const [countChecked, setCountChecked] = useState(0);
  const [countChecked1, setCountChecked1] = useState(0);
  const [ambassador, setAmbaaadorCampaign] =
    useState<AmbassdorCampaignResponse>(new AmbassdorCampaignResponse());
  const [formResponseList, setFormResponseList] = useState<Manage[]>([]);
  const [checked, setChecked] = useState<boolean[]>([]);
  const [checked1, setChecked1] = useState<boolean[]>([]);
  const [store, setStore] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tempList, setTempList] = useState(new AmbassadorProgram());
  const [showSelectionPopover2, setShowSeectionPopover2] = useState(false);
  const [checkPopOver, setCheckPopover] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [showRPpop, setShowRPpop] = useState(false);
  const [bonusRP, setBonusRP] = useState("")
  const [ambassdorDetailsList, setAmbassdorDetailsList] =
    useState<AmbassadorProgramDetails>(new AmbassadorProgramDetails());
  const [alert, setAlert] = useState(false);
  const [alert1, setAlert1] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const openMenu = async () => {
    await menuController.open();
  };
  const getData = () => {
    ClientAmbassadorService.GetAmbassdorForPrograms(loginMetadata)
      .then((resp) => {
        console.log("response:", resp)
        setAmbassdorDetailsList(resp);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };


  // if (checkPopOver && tempList.campaign_enrolled.length != 0) {
  //   setCheckPopover(false);
  //   setShowSeectionPopover2(true);
  // }

  /*
    Auth: Tarun
    Work:
    1.Using "fetch" to getAllFormResponses(name, contact, email, country) from table form_requiretment_response
      updating the status of reach form entry response approve = 1 and reject = 2
      on accept => create a new ambassador by using createAmbassdorService
      updating the state of formResponseList according to accept and reject 
    Changes:
    1.Create a formResponseList variable and printing all the formResponse from this not from ambassdor 
  */

  // function acceptAmbassdor(index: any) {
  //   console.log("Adding New Ambasdor Of INDEX: ", index, formResponseList[index].id);
  //   const requesOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       ambassador: {
  //         first_name: formResponseList[index].first_name,
  //         last_name: formResponseList[index].last_name,
  //         email: formResponseList[index].email,
  //         password: 0,
  //         status: 1,

  //       },
  //       ambassador_program: {
  //         program_id: loginMetadata.program_id,
  //         ambassador_id: 0,
  //         title: formResponseList[index].first_name + " " + formResponseList[index].last_name,
  //       },
  //       id: formResponseList[index].id,
  //       status: 1,
  //       loginMetadata: loginMetadata

  //     })
  //   }

  //   fetch(GetClientManageUrl + "/setFormResponseStatus", requesOptions)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Ambassdor Status Set To Approved(1)");
  //       const newList = formResponseList.filter((data) => {
  //         return data.id != formResponseList[index].id
  //       })
  //       setFormResponseList(newList);

  //     }).catch((error) => {
  //       console.log("ERROR");
  //       console.log(error.name);
  //     })

  // }

  // function rejectAmbassdor(index: any) {
  //   console.log("Removing ", formResponseList[index].first_name)

  //   console.log(`Removing Ambasdor Of INDEX: ${index} FORMID: ${formResponseList[index].id}`);
  //   const requesOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       id: formResponseList[index].id,
  //       status: 2
  //     })
  //   }

  //   fetch(GetClientManageUrl + "/setFormResponseStatus", requesOptions)
  //     .then(response => response.json())
  //     .then((data) => {
  //       console.log("Ambassdor Status Set To Reject(2)");
  //       const newList = formResponseList.filter((data) => {
  //         return data.id != formResponseList[index].id
  //       })
  //       setFormResponseList(newList);

  //     }).catch((error) => {
  //       console.log("ERROR");
  //       console.log(error.name);
  //     })


  // }


  useEffect(() => {
    document.title = "User Manage - Afleet"
    getData();
    // const requestOptions = {
    //   method: 'POST',
    //   loginMetadata: loginMetadata,
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ 'programId': loginMetadata.program_id })
    // };

    // fetch(GetClientManageUrl + "/getAllFormResponse", requestOptions)
    //   .then(response => response.json())
    //   .then((data) => {
    //     console.log("FORM RESPONSES")
    //     console.log(data);
    //     setFormResponseList(data);
    //   });
    setIsLoading(false);
  }, []);
  // const [second,setSecond]=useState(false);
  if (isLoading) return <Loading />;
  return (
    <IonPage>
      {/* {console.log("form Res",formResponseList)} */}
      <IonCard class="backgroundAdjustment" style={{ background: "#E5E5E5" }}>
        <IonPopover
          isOpen={showRPpop}
          onDidDismiss={() => {
            setShowRPpop(false);
            setBonusRP("");
          }}
          class="ClientOfferRPPopover"
          id="ClientOfferRPPopover"
        >
          <IonGrid style={{ width: "100%", padding: "10px" }}>
            <form onSubmit={(e) => {
              e.preventDefault();
              ClientAmbassadorService.giveBonusRP(loginMetadata, tempList.ambssador_program_id, parseInt(bonusRP)).then((resp) => {
                if (resp.status == true) {
                  setShowRPpop(false);
                  setAlertMessage("Bonus RP given successfully");
                  setAlert1(true);
                  setBonusRP("");
                }
                else {
                  setAlertMessage(resp.message);
                  setAlert1(true);
                }
              })
            }}>
              <IonRow style={{ display: "flex", justifyContent: "flex-end" }}>
                <IonIcon
                  md={close}
                  size="large"
                  style={{ width: "25px", cursor: "pointer" }}
                  onClick={() => {
                    setShowRPpop(false);
                    setBonusRP("");
                  }}
                ></IonIcon>
              </IonRow>
              <IonRow class="BonusRPText">
                Enter the Bonus RP you want to give to the ambassador
              </IonRow>
              <IonRow class="bonusInputRow">
                <IonInput
                  class="NameInput2 NumberInput"
                  placeholder="Enter Bonus RP"
                  value={bonusRP}
                  type="number"
                  min="0"
                  onIonChange={(e) => {
                    setBonusRP(e.detail.value!);
                  }}
                  required={true}
                ></IonInput>
              </IonRow>
              <IonRow style={{ display: "flex", justifyContent: "flex-end", marginRight: "20px" }}>
                <IonButton
                  type="submit"
                  fill="solid"
                >
                  Submit
                </IonButton>
              </IonRow>
            </form>
          </IonGrid>
        </IonPopover>
        <IonAlert
          isOpen={alert1}
          onDidDismiss={() => {
            setAlert1(false);
          }}
          message={alertMessage}
        />
        <IonPopover
          isOpen={showPopover}
          onDidDismiss={() => {
            setShowPopover(false);
          }}
          class="ClientRewardsPopover2"
        >
          <IonGrid class="programManagementPopOverGrid">
            <IonRow class="ClientRewardsPopoverCloseButton">
              <IonIcon
                md={close}
                class="iconSize"
                size="large"
                onClick={() => {
                  setShowPopover(false);
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
                onClick={async () => {

                  openMenu();
                  await ClientAmbassadorService.DeleteAmbassadorProgram(loginMetadata, tempList.ambssador_program_id);
                  await getData();
                  setShowPopover2(false);
                  setShowPopover(false);
                  // if (currentIndex >= 0) {
                  //   console.log("ambassador rejected");
                  //   // rejectAmbassdor(currentIndex);

                  // } else {
                  //   formResponseList.map((formData, index) => {
                  //     if (formData.checked === true) {
                  //       console.log(formData.email);
                  //       // rejectAmbassdor(index);
                  //     }
                  //   });

                  // }
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
                  setShowPopover(false);
                  openMenu();
                }}
              >
                Cancel
              </IonButton>
            </IonSegment>
          </IonGrid>
        </IonPopover>

        {/* Popover2 */}
        {/* <IonPopover
          mode="ios"
          class="selectionPopover2"
          trigger={"selectionDot" + tempList.id.toString()}
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
                      // acceptAmbassdor(currentIndex);
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

        </IonPopover> */}
        <ClientAmbassadorCampaign
          loginMetadata={loginMetadata}
          tempList={tempList}
          setShowPopover3={setShowPopover3}
          showPopover3={showPopover3}
          getData={getData}
        />
        <IonAlert
          isOpen={alert}
          onDidDismiss={() => {
            setAlert(false)
          }
          }
          message="Ambassador is not enrolled in any Campaign"
        />
        <AmbassdorProfilePopover
          showPopover={showPopover}
          setShowPopover={setShowPopover}
          nameInput={nameInput}
          emailInput={emailInput}
          email1Input={email1Input}
          showPopover2={showPopover2}
          setShowPopover2={setShowPopover2}
          tempList={tempList}
          loginMetadata={loginMetadata}
          getData={getData}
          setShowRPpop={setShowRPpop}
        />
        <IonContent>
          <TopComponent
            loginMetadata={loginMetadata}
            loginfunction={loginfunction}
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <IonCardContent class="marginForContent">
            <IonGrid>
              <IonRow class="ClientManageHead">
                <IonCol class="ClientRewardsSubHead">
                  Manage Ambassador
                </IonCol>
                <IonCol class="ion-text-end">
                  <IonButton
                    class="ClientManageButton"
                    fill="outline"
                    onClick={() => {
                      countChecked
                        ? SelectiveExcelWriter(
                          ambassdorDetailsList.ambassadorList,
                          AmbassdorSchema,
                          checked,
                          "Ambassador_Details"
                        )
                        : GenericExcelWriter(
                          ambassdorDetailsList.ambassadorList,
                          AmbassdorSchema,
                          "Ambassador_Details"
                        );
                    }}
                  >
                    <BsDownload />
                    {/* <IonImg src={download}></IonImg> */}
                    &nbsp;&nbsp;
                    {countChecked ? "Download Checked" : "Download All"}
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow class="ClientAmbassadorTitle">
                <IonCol size="1" class="ClientAmbassadorContent ion-text-center" >
                  <IonCheckbox mode="md"
                    class="ClientAmbassdorCheckBox"
                    checked={(countChecked == ambassdorDetailsList.ambassadorList.length) ? true : false}

                    onIonChange={(e) => {
                      setAllChecked(e.detail.checked);
                      if (e.detail.checked) {
                        for (
                          var i = 0;
                          i < ambassdorDetailsList.ambassadorList.length;
                          i++
                        ) {
                          checked[i] = true;
                        }
                        setCountChecked(
                          ambassdorDetailsList.ambassadorList.length
                        );
                      } else {

                        for (
                          var i = 0;
                          i < ambassdorDetailsList.ambassadorList.length;
                          i++
                        ) {
                          checked[i] = false;
                        }
                        setCountChecked(0);

                      }
                    }}
                  ></IonCheckbox>
                </IonCol>
                <IonCol class="ClientAmbassadorContent ion-text-start"  >
                  Name
                </IonCol>
                <IonCol class="ClientAmbassadorContent ion-text-center" >
                  Email
                </IonCol>
                <IonCol class="ClientAmbassadorContent ion-text-center"  >
                  Total RP
                </IonCol>
                <IonCol class="ClientAmbassadorContent ion-text-center"  >
                  Enrolled Campaigns
                </IonCol>
                <IonCol
                  size="0.5"
                  class="ClientAmbassadorContent ion-text-center"
                ></IonCol>
                <IonCol size="0.5" class="ClientAmbassadorContent ion-text-center">

                </IonCol>
                <IonCol size="2" class="ClientAmbassadorContent ion-text-center"></IonCol>
              </IonRow>
              {ambassdorDetailsList.ambassadorList.map(
                (ambassdorDetail, index) => {
                  if (
                    lowerCase(
                      ambassdorDetail.ambassador_title
                    ).includes(lowerCase(searchText)) ||
                    lowerCase(
                      ambassdorDetail.email
                    ).includes(lowerCase(searchText))
                  ) {
                    return (
                      <IonGrid key={index}>
                        <IonRow >
                          <IonCol
                            size="1"
                            class="ClientAmbassadorContent ion-text-center"
                          >
                            <IonCheckbox mode="md"
                              class="ClientAmbassdorCheckBox"
                              disabled={allChecked}
                              checked={checked[index]}
                              onIonChange={(e) => {
                                if (e.detail.checked) {
                                  checked[index] = true;
                                  var count = 0;
                                  checked.forEach((value) => {
                                    if (value) count++;
                                  });
                                  console.log(count);
                                  setCountChecked(count);
                                  // setatleastOneChecked(countChecked);
                                  console.log(checked);
                                } else {
                                  checked[index] = false;
                                  var count = 0;
                                  checked.forEach((value) => {
                                    if (value) count++;
                                  });
                                  setCountChecked(count);
                                  console.log(countChecked);
                                  console.log(checked);
                                  // setatleastOneChecked(count);
                                }
                              }}
                            ></IonCheckbox>
                          </IonCol>
                          <IonCol class="ClientAmbassadorManagementDetail ion-text-center">
                            <IonRow>
                              <IonCol class="ion-text-start">
                                <img
                                  src={
                                    isStringEmpty(ambassdorDetail.ambassador_program_img)
                                      ? isStringEmpty(ambassdorDetail.ambassador_img) ?
                                        temp
                                        : ambassdorDetail.ambassador_img
                                      : ambassdorDetail.ambassador_program_img
                                  }
                                  alt="N/A"
                                  className="ambassadorImage"
                                />

                                {ambassdorDetail.ambassador_title}{" "}
                              </IonCol>
                            </IonRow>
                          </IonCol>
                          <IonCol class="ClientAmbassadorManagementDetail ion-text-center">
                            {ambassdorDetail.email}
                          </IonCol>
                          <IonCol
                            class="ClientAmbassadorManagementDetail ion-text-center">
                            {ambassdorDetail.total_points}

                          </IonCol>
                          <IonCol class="ClientAmbassadorManagementDetail ion-text-center"
                            onClick={() => {
                              setTempList(ambassdorDetail);
                              if (ambassdorDetail.campaignList.length) {
                                setShowPopover3(true)
                              }
                              else {
                                setAlert(true);
                              }

                            }}>
                            <a className="linkDesign">{
                              ambassdorDetail.campaignList.length
                            }
                            </a>
                          </IonCol>
                          <IonCol size="0.5" class="ClientAmbassadorManagementDetail ion-text-center"
                            onClick={() => {
                              SelectiveExcelWriter(
                                [ambassdorDetailsList.ambassadorList[index]],
                                AmbassdorSchema,
                                [true],
                                "Ambassador_Details"
                              );
                            }}
                          >
                            <AiOutlineDownload />
                          </IonCol>
                          <IonCol size="0.5" class="ClientAmbassadorManagementDetail ion-text-center"
                            onClick={() => {
                              setTempList(ambassdorDetail);
                              setShowPopover(true);
                            }}
                          >
                            <IoTrashOutline />
                          </IonCol>
                          <IonCol size="2" class="ClientAmbassadorManagementDetail ion-text-center" onClick={() => {
                            setTempList(ambassdorDetail);
                            setShowPopover2(true);
                            setemailInput(ambassdorDetail.email);
                          }}>
                            Know More &nbsp;
                            <IonIcon

                              icon={chevronForwardOutline}
                              size="medium"
                            />
                          </IonCol>
                        </IonRow>
                        <IonRow class="line"></IonRow>
                      </IonGrid>
                    );
                  }
                }
              )}
              {/* {formResponseList.map(
                (formData, index: number) => {
                  return (

                    <IonGrid key={formData.id}>
                      <IonGrid>
                        <IonRow class="ClientLeaderboardRow">
                          <IonCol
                            size="0.5"
                            class="ClientLeaderboardDetail ion-text-center" id="index"
                          >
                            <IonCheckbox mode ="md" class="checkbox" checked={formData.checked && true} onClick={() => { formData.checked = !formData.checked }}></IonCheckbox>
                          </IonCol>
                          <IonCol size="2" class="ClientLeaderboardDetail ion-text-center client-img-name">
                            <IonRow>
                              <IonCol size="8" class="ClientLeaderboardDetail response-content" id="client-name ">
                                {formData.first_name + " " + formData.last_name}
                              </IonCol>
                            </IonRow>
                          </IonCol>
                          <IonCol size="2" class="ClientLeaderboardDetail ion-text-center response-content">
                            {formData.email}
                          </IonCol>
                          <IonCol size="2" class="ClientLeaderboardDetail ion-text-center response-content">
                            {formData.contact}
                          </IonCol>
                          <IonCol size="2" class="ClientLeaderboardDetail ion-text-center response-content">
                            {formData.country}



                          </IonCol>
                          <IonCol size="3" class="ClientLeaderboardDetail ion-text-center">
                            <IonRow>
                              <IonCol size="4">
                                <IonButton color="success" class="accept-btn"
                                  onClick={() => {
                                    setShowSeectionPopover2(true);
                                    setCurrentIndex(index);
                                    openMenu();
                                    formData.checked = true;
                                    // acceptAmbassdor(index)
                                  }}
                                > Accept
                                </IonButton>



                              </IonCol>
                              <IonCol size="4">
                                <IonButton color="danger" class="reject-btn"
                                  onClick={() => {
                                    setShowPopover(true);
                                    setCurrentIndex(index);
                                    formData.checked = true;
                                    // rejectAmbassdor(index)
                                  }}
                                > Reject
                                </IonButton>


                              </IonCol>

                            </IonRow>

                          </IonCol>

                        </IonRow>


                      </IonGrid>

                    </IonGrid>
                  )
                })} */}
            </IonGrid>
          </IonCardContent>
        </IonContent>
      </IonCard>
    </IonPage>
  );
};

export default ClientManage;
