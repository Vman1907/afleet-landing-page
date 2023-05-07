import "../Styles/AmbassadorManagement.css";
import temp from "../../Assets/Images/campaignDeafult.png";
import dots from "../../Assets/Images/dots.svg";
import download from "../../Assets/Images/download.svg";

import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonItem,
  IonPage,
  IonPopover,
  IonRow,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { LoginMetadata } from "../Models/LoginMetadata";
import AmbassdorManagementService from "../Services/AmbassdorManagementService";
import AmbassdorDetails from "../Models/AmbassdorDetails";
import Loading from "../components/Loading";
import TopComponent from "../components/TopComponent";
import {
  GenericExcelWriter,
  SelectiveExcelWriter,
} from "../../Util/ExcelWriter";
import { AmbassdorSchema } from "../Constants/ExcelFileSchemas";
import CreateUpdateAmbassdor from "../components/CreateUpdateAmbassdor";
import AmbassdorListResponse from "../Models/AmbassdorListResponse";
import { AiOutlineDownload } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { StorageService } from "../../Services/StorageService";
import {
  AmbassadorLoginMetadataExpiry,
  AmbassadorLoginMetadataKey,
} from "../../Ambassador/Constants/AmbassadorStorageConstants";
import { Browser } from "@capacitor/browser";
import ProgramNameAndIdResponse from "../Models/ProgramNameAndIdResponse";
import { isStringEmpty } from "../../Util/BasicUtilityFunctions";
import { IoTrashOutline } from "react-icons/io5";
interface AmbassadorManagementProps {
  name: string;
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}
const AmbassadorManagement: React.FC<AmbassadorManagementProps> = ({
  name,
  loginMetadata,
  loginfunction,
}) => {
  const [detail, setDetail] = useState<string>(
    loginMetadata.first_name + " " + loginMetadata.last_name
  );
  const [isLoading, setIsLoading] = useState(true);
  const [ambassdorDetailsList, setAmbassdorDetailsList] =
    useState<AmbassdorListResponse>(new AmbassdorListResponse());
  const [allChecked, setAllChecked] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [ambassdor, setAmbassdor] = useState(new AmbassdorDetails());
  const [showPopover, setShowPopover] = useState(false);
  const [loginAsAmbassdor, setLoginAsAmbassdor] = useState(false);
  const [showSelectionPopover, setShowSeectionPopover] = useState(false);
  const [showDetailsPopover, setShowDetailsPopover] = useState(false);
  const [newAmbassdorMode, setNewAmbassdorMode] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [checked, setChecked] = useState<boolean[]>([]);
  const [countChecked, setCountChecked] = useState(0);
  const [showChoosePopover, setShowChoosePopover] = useState<boolean>(false);
  const [programList, setProgramList] = useState<ProgramNameAndIdResponse>(
    new ProgramNameAndIdResponse()
  );
  useEffect(() => {
    document.title = "Ambassador Management - Afleet"
    AmbassdorManagementService.GetProgramList(loginMetadata, true)
      .then((resp) => {
        setProgramList(resp);
        console.log(programList);
      })
      .catch((e) => {
        console.log(e);
      });
    getData(false);
  }, []);
  const getData = (forceRefresh: boolean) => {
    setIsLoading(true);
    AmbassdorManagementService.GetAmbassdorList(loginMetadata, forceRefresh)
      .then((resp) => {
        console.log(resp)
        setAmbassdorDetailsList(resp);
        checked.length = 0;
        for (var i = 0; i < resp.ambassdorList.length; i++) {
          checked.push(false);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };
  const createNewAmbassdor = () => {
    setIsLoading(true);
    AmbassdorManagementService.CreateAmbassdor(ambassdor, loginMetadata)
      .then((resp) => {
        if (resp && resp.status) {
          setShowPopover(false);
          ambassdorDetailsList.ambassdorList.push(ambassdor);
          setAlertMessage("Ambassdor Created Successfully");
          setIsLoading(false);
          setNewAmbassdorMode(true);
          setAmbassdor(new AmbassdorDetails());
          setShowAlert(true);
          getData(true);
        } else {
          setShowPopover(false);
          setAlertMessage(resp.msg);
          setAmbassdor(new AmbassdorDetails());
          setNewAmbassdorMode(true);
          setIsLoading(false);
          setShowAlert(true);
        }
      })
      .catch((e) => {
        setShowPopover(false);
        setAlertMessage(e.message);
        setAmbassdor(new AmbassdorDetails());
        setNewAmbassdorMode(true);
        setIsLoading(false);
        setShowAlert(true);
      });
  };
  const UpdateAmbassdor = () => {
    setIsLoading(true);
    AmbassdorManagementService.UpdateAmbassdor(ambassdor, loginMetadata)
      .then((resp) => {
        if (resp.errors == undefined || resp.errors == null) {
          setShowPopover(false);
          ambassdorDetailsList.ambassdorList[updateIndex] = ambassdor;
          setAlertMessage("Ambassdor Updated Successfully");
          setIsLoading(false);
          setNewAmbassdorMode(true);
          setUpdateIndex(-1);
          setAmbassdor(new AmbassdorDetails());
          setShowAlert(true);
          getData(true);
        } else {
          setShowPopover(false);
          setAlertMessage(resp.errors[0].message);
          setAmbassdor(new AmbassdorDetails());
          setNewAmbassdorMode(true);
          setUpdateIndex(-1);
          setIsLoading(false);
          setShowAlert(true);
        }
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  const DeleteAmbassador = () => {
    setIsLoading(true);
    AmbassdorManagementService.DeleteAmbassador(loginMetadata, ambassdor.id).then((resp) => {
      if (resp.status == "ok") {
        setAlertMessage("Ambassador Deleted Successfully");
        setAmbassdor(new AmbassdorDetails());
        setIsLoading(false);
        setShowAlert(true);
        getData(true);
      }
      else {
        setAlertMessage(resp.msg);
        setAmbassdor(new AmbassdorDetails());
        setIsLoading(false);
        setShowAlert(true);
      }
    }).catch((e) => {
      setAlertMessage(e);
      setAmbassdor(new AmbassdorDetails());
      setIsLoading(false);
      setShowAlert(true);
    })


  }

  const AmbassdorLogin = () => {
    AmbassdorManagementService.AmbassdorLogin(loginMetadata, ambassdor.email)
      .then((resp: any) => {
        resp.ambassadorProgramId = -1;
        console.log(resp);
        StorageService.Set(
          AmbassadorLoginMetadataKey,
          resp,
          AmbassadorLoginMetadataExpiry
        ).then(() => {
          Browser.open({ url: "/ambassador" });
        });
      })
      .catch((e: any) => {
        console.log(e);
      });
  };
  const associateAmbassdor = async (
    ambassadorId: number,
    program_id: number,
    title: string,
    email: string,
  ) => {
    setIsLoading(true);
    await AmbassdorManagementService.AssociateAmbassdorWithProgram(
      loginMetadata,
      ambassadorId,
      program_id,
      title,
      email
    )
      .then((resp) => {
        setAlertMessage(resp.msg);
        setShowChoosePopover(false);
        setIsLoading(false);
        setShowAlert(true);
        getData(true);
      })
      .catch(() => {
        setAlertMessage("Failed to associate Ambassdor");
        setIsLoading(false);
        setShowAlert(true);
      });
  };
  return (
    <IonPage>
      <CreateUpdateAmbassdor
        ambassdor={ambassdor}
        showPopover={showPopover}
        setShowPopover={setShowPopover}
        setAmbassdor={setAmbassdor}
        isLoading={isLoading}
        newAmbassdorMode={newAmbassdorMode}
        createNewAmbassdor={createNewAmbassdor}
        UpdateAmbassdor={UpdateAmbassdor}
        loginMetadata={loginMetadata}
      />
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => {
          setAlertMessage("");
          setShowAlert(false);
          setShowChoosePopover(false);
        }}
        message={alertMessage}
      />
      <IonAlert
        isOpen={loginAsAmbassdor}
        message={"Are you sure You want to login this Ambassador"}
        onDidDismiss={() => {
          setUpdateIndex(-1);
          setLoginAsAmbassdor(false);
        }}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Yes",
            handler: () => {
              AmbassdorLogin();
            },
          },
        ]}
      />


      <IonAlert
        isOpen={showDeleteAlert}
        message="Are you sure You want to delete this Ambassador"
        onDidDismiss={() => {
          setShowDeleteAlert(false);
          setUpdateIndex(-1);
        }
        }
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Yes",
            handler: () => {
              DeleteAmbassador();
            },
          },
        ]}
      />


      <IonPopover
        mode="ios"
        class="selectionPopover"
        isOpen={showSelectionPopover}
        trigger={"selectionDot" + updateIndex.toString()}
        onDidDismiss={() => {
          setShowSeectionPopover(false);
        }}
        arrow={false}
        // side="top"
        alignment="end"
      >
        <IonItem
          style={{ height: 40 }}
          onClick={() => {
            SelectiveExcelWriter(
              [ambassdorDetailsList.ambassdorList[updateIndex]],
              AmbassdorSchema,
              [true],
              "Ambassador_Details"
            );
            setShowSeectionPopover(false);
          }}
          lines="full"
        >
          <AiOutlineDownload />
          &nbsp;&nbsp;Download
        </IonItem>
        <IonRow class="line" />
        <IonItem
          style={{ height: 40 }}
          onClick={() => {
            setShowPopover(true);
            setShowSeectionPopover(false);
          }}
        >
          <BiEditAlt />
          &nbsp;&nbsp;Edit
        </IonItem>
        <IonRow class="line" />
        <IonItem
          style={{ height: 40 }}
          onClick={() => {
            setShowDeleteAlert(true);
            setShowSeectionPopover(false);
          }}
        >
          <IoTrashOutline />
          &nbsp;&nbsp;Delete
        </IonItem>
      </IonPopover>
      <IonCard class="backgroundAdjustment" style={{ background: "#E5E5E5" }}>
        <IonContent scrollX={true} scrollY={true}>
          {/* <IonGrid style={{padding:0.1}}> */}
          <TopComponent
            loginMetadata={loginMetadata}
            searchText={searchText}
            setSearchText={setSearchText}
            loginfunction={loginfunction}
          />
          <IonCardContent class="marginForContent">
            {isLoading ? (
              <Loading />
            ) : (
              <IonGrid class="scrolling">
                <IonRow class="AmbassadorManagementHead">
                  <IonCol class="AmbassadorManagementSubHead">
                    Ambassador Management
                  </IonCol>
                  <IonCol class="ion-text-end">
                    <IonButton
                      class="AmbassadorManagementButton commonButton"
                      fill="outline"
                      onClick={() => {
                        countChecked
                          ? SelectiveExcelWriter(
                            ambassdorDetailsList.ambassdorList,
                            AmbassdorSchema,
                            checked,
                            "Ambassador_Details"
                          )
                          : GenericExcelWriter(
                            ambassdorDetailsList.ambassdorList,
                            AmbassdorSchema,
                            "Ambassador_Details"
                          );
                      }}
                    >
                      <IonImg src={download}></IonImg>&nbsp;&nbsp;
                      {countChecked ? "Download Checked" : "Download All"}
                    </IonButton>
                    <IonButton
                      class="AmbassadorManagementButton commonButton"
                      fill="outline"
                      onClick={() => {
                        setShowPopover(true);
                        setNewAmbassdorMode(true);
                      }}
                    >
                      + Add Ambassdor
                    </IonButton>
                  </IonCol>
                </IonRow>
                <IonGrid>
                  <IonRow class="AmbassadorManagementTitle">
                    <IonCol
                      class="AmbassadorManagementContent checkboxWidth ion-text-center"
                    >
                      <IonCheckbox mode="md"
                        class="AmbassdorCheckBox"
                        checked={(countChecked == ambassdorDetailsList.ambassdorList.length) ? true : false}

                        onIonChange={(e) => {
                          setAllChecked(e.detail.checked);
                          if (e.detail.checked) {
                            for (
                              var i = 0;
                              i < ambassdorDetailsList.ambassdorList.length;
                              i++
                            ) {
                              checked[i] = true;
                            }
                            setCountChecked(
                              ambassdorDetailsList.ambassdorList.length
                            );
                          } else {
                            for (
                              var i = 0;
                              i < ambassdorDetailsList.ambassdorList.length;
                              i++
                            ) {
                              checked[i] = false;
                            }
                            setCountChecked(0);
                          }
                        }}
                      ></IonCheckbox>
                    </IonCol>
                    <IonCol class="AmbassadorManagementContent width25 ion-text-start">
                      Ambassador Name
                    </IonCol>
                    <IonCol class="AmbassadorManagementContent width25 ion-text-center">
                      Email
                    </IonCol>
                    <IonCol class="AmbassadorManagementContent width15 ion-text-center">
                      Country
                    </IonCol>
                    <IonCol class="AmbassadorManagementContent actionWidth ion-text-center">
                      Associated Program
                    </IonCol>
                    <IonCol
                      class="AmbassadorManagementContent actionWidth ion-text-center"
                    >Add Program</IonCol>
                    <IonCol class="actionWidth">Actions</IonCol>
                  </IonRow>
                </IonGrid>
                <IonRow>
                  <IonPopover
                    mode="ios"
                    id={"details"}
                    class="ambassadorScroll1"
                    isOpen={showDetailsPopover}
                    trigger={"details" + updateIndex.toString()}
                    onDidDismiss={() => {
                      setShowDetailsPopover(false);
                    }}
                    // arrow={false}
                    // side="top"
                    alignment="end"
                  >
                    <IonContent>
                      {
                        ambassdorDetailsList.ambassdorList.length > 0
                          &&
                          ambassdorDetailsList.ambassdorList[
                            updateIndex == -1 ? 0 : updateIndex
                          ].ProgramNames
                          ? ambassdorDetailsList.ambassdorList[
                            updateIndex == -1 ? 0 : updateIndex
                          ].ProgramNames.split(",").map(
                            (value: string, index: number) => {
                              return (
                                <IonRow key={index} >
                                  <IonItem style={{ height: 50 }} lines="none">
                                    <img
                                      className="AdminManagementImage"
                                      src={
                                        isStringEmpty(
                                          ambassdor.program_img.split(",")[index]
                                        )
                                          ? temp
                                          : ambassdor.program_img.split(",")[
                                          index
                                          ]
                                      }
                                    />
                                    &nbsp;&nbsp;{value}
                                  </IonItem>
                                  <IonRow class="line" />
                                </IonRow>
                              );
                            }
                          )
                          : null
                        // <IonItem style={{ height: 40 }} onClick={()=>{setShowPopover(true);setShowSeectionPopover(false)}}>
                        //   <BiEditAlt />
                        //   &nbsp;&nbsp;Edit
                        // </IonItem>
                      }
                    </IonContent>
                  </IonPopover>
                  <IonPopover
                    mode="ios"
                    id={"choose"}
                    class="ambassadorScroll"
                    isOpen={showChoosePopover}
                    trigger={"choose" + updateIndex.toString()}
                    onDidDismiss={() => {
                      setShowChoosePopover(false);
                      setAmbassdor(new AmbassdorDetails());
                    }}
                    // arrow={true}
                    side="bottom"
                    alignment="center"
                  >
                    <IonContent>
                      {
                        programList.programs.map((value: any, index: number) => {
                          // console.log(ambassdorDetailsList.ambassdorList[
                          //   updateIndex == -1 ? 0 : updateIndex
                          // ].ProgramNames.split(",").includes(value.id));
                          // console.log(ambassdorDetailsList.ambassdorList[
                          //   updateIndex == -1 ? 0 : updateIndex
                          // ].ProgramNames != null
                          // )
                          // console.log(value.id);
                          // console.log(ambassdor.Programid.split(","));
                          // console.log(ambassdor.Programid.split(",").includes(value.id) == false);
                          if (
                            ambassdor.ProgramNames &&
                            ambassdor.Programid.split(",").includes(
                              value.id.toString()
                            ) == false
                          ) {
                            return (
                              <IonRow key={index}>
                                <IonItem
                                  style={{ height: 50 }}
                                  lines="none"
                                  onClick={async () => {
                                    await setShowChoosePopover(false);
                                    await associateAmbassdor(
                                      ambassdor.id,
                                      value.id,
                                      ambassdor.first_name + ' ' + ambassdor.last_name,
                                      ambassdor.email
                                    );
                                    // setIsLoading(true);
                                    // AmbassdorManagementService.AssociateAmbassdorWithProgram(loginMetadata, ambassdor.id, value.id, ambassdor.first_name + " " + ambassdor.last_name).then((resp)=>{
                                    //   setAlertMessage(resp.msg);
                                    //   setIsLoading(false);
                                    //   setShowAlert(true);
                                    //   getData(true);
                                    // }).catch(()=>{
                                    //   setAlertMessage("Failed to associate Ambassdor");
                                    //   setIsLoading(false);
                                    //   setShowAlert(true);
                                    // })
                                  }}
                                >
                                  <img
                                    className="AdminManagementImage"
                                    src={
                                      isStringEmpty(value.program_img)
                                        ? temp
                                        : value.program_img
                                    }
                                  />
                                  &nbsp;&nbsp;{value.title}
                                </IonItem>
                                <IonRow class="line" />
                              </IonRow>
                            );
                          } else if (ambassdor.ProgramNames == null) {
                            return (
                              <IonRow key={index}>
                                <IonItem
                                  style={{ height: 50 }}
                                  lines="none"
                                  onClick={async () => {
                                    await setShowChoosePopover(false);
                                    await associateAmbassdor(
                                      ambassdor.id,
                                      value.id,
                                      ambassdor.first_name + ' ' + ambassdor.last_name,
                                      ambassdor.email
                                    );
                                    // setIsLoading(true);
                                    // AmbassdorManagementService.AssociateAmbassdorWithProgram(loginMetadata, ambassdor.id, value.id, ambassdor.first_name + " " + ambassdor.last_name).then((resp)=>{
                                    //   setAlertMessage(resp.msg);
                                    //   setIsLoading(false);
                                    //   setShowAlert(true);
                                    //   getData(true);
                                    // }).catch(()=>{
                                    //   setAlertMessage("Failed to associate Ambassdor");
                                    //   setIsLoading(false);
                                    //   setShowAlert(true);
                                    // })
                                  }}
                                >
                                  <img
                                    className="AdminManagementImage"
                                    src={
                                      isStringEmpty(value.program_img)
                                        ? temp
                                        : value.program_img
                                    }
                                  />
                                  &nbsp;&nbsp;{value.title}
                                </IonItem>
                                <IonRow class="line" />
                              </IonRow>
                            );
                          }
                        })
                        // <IonItem style={{ height: 40 }} onClick={()=>{setShowPopover(true);setShowSeectionPopover(false)}}>
                        //   <BiEditAlt />
                        //   &nbsp;&nbsp;Edit
                        // </IonItem>
                      }
                    </IonContent>
                  </IonPopover>
                </IonRow>
                {ambassdorDetailsList.ambassdorList.map(
                  (ambassdorDetail, index) => {
                    if (
                      (
                        ambassdorDetail.first_name +
                        " " +
                        ambassdorDetail.last_name
                      )
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                      ambassdorDetail.email
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    ) {
                      return (
                        <IonGrid key={index}>
                          <IonRow class="AmbassadorManagementRow">
                            <IonCol
                              class="AmbassadorManagementContent checkboxWidth ion-text-center"
                            >
                              <IonCheckbox mode="md"
                                class="AmbassdorCheckBox"
                                disabled={allChecked}
                                checked={checked[index]}
                                style={{ marginLeft: 20 }}
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
                                }}
                              ></IonCheckbox>
                            </IonCol>
                            <IonCol class="AmbassadorManagementDetail width25 ion-text-start">
                              <IonRow>
                                <IonCol>
                                  <img
                                    src={
                                      ambassdorDetail.ambassador_img
                                        ? ambassdorDetail.ambassador_img
                                        : temp
                                    }
                                    className="AdminManagementImage"
                                    alt="N/A"
                                  />
                                  {/* </IonCol>
                                <IonCol class="AmbassadorManagementDetail"> */}
                                  {ambassdorDetail.first_name +
                                    " " +
                                    ambassdorDetail.last_name}{" "}
                                </IonCol>
                              </IonRow>
                            </IonCol>
                            <IonCol class="AmbassadorManagementDetail width25 ion-text-center">
                              {ambassdorDetail.email}{" "}
                            </IonCol>
                            <IonCol class="AmbassadorManagementDetail width15 ion-text-center">
                              {ambassdorDetail.country}{" "}
                            </IonCol>

                            <IonCol
                              id={"details" + index.toString()}
                              class="AmbassadorManagementDetail actionWidth ion-text-center"
                              style={{
                                textDecoration:
                                  ambassdorDetail.noOfProgram != "0"
                                    ? "underline"
                                    : "none",
                                color:
                                  ambassdorDetail.noOfProgram != "0"
                                    ? "#f4be37"
                                    : "none",
                              }}
                              onClick={() => {
                                if (ambassdorDetail.noOfProgram != "0") {
                                  setAmbassdor(ambassdorDetail);
                                  setUpdateIndex(index);
                                  setShowDetailsPopover(true);
                                } else {
                                  setAlertMessage("No Program to show");
                                  setShowAlert(true);
                                }
                              }}
                            >
                              {ambassdorDetail.noOfProgram}
                              {" Programs"}
                            </IonCol>
                            <IonCol
                              class="AmbassadorManagementDetail actionWidth ion-text-center"
                              style={{ color: "#FFAD1A" }}
                              id={"choose" + index.toString()}
                              onClick={() => {
                                if (
                                  parseInt(ambassdorDetail.noOfProgram) !=
                                  programList.programs.length
                                ) {
                                  setAmbassdor(ambassdorDetail);
                                  setUpdateIndex(index);
                                  setShowChoosePopover(true);
                                } else {
                                  setAlertMessage("No More Program to add");
                                  setShowAlert(true);
                                }
                              }}
                            >
                              + ambassador program
                            </IonCol>
                            <IonCol
                              class="AmbassadorManagementDetail actionWidth ion-text-center"
                            >
                              <IonRow>
                                <IonButton
                                  fill="outline"
                                  class="programManagementLoginButton minWidthButton actionContentWidth commonButton"
                                  onClick={() => {
                                    setAmbassdor(
                                      Object.assign({}, ambassdorDetail)
                                    );
                                    setUpdateIndex(index);
                                    setLoginAsAmbassdor(true);
                                    console.log(ambassdorDetail)
                                  }}
                                >
                                  Login
                                </IonButton>
                                {/* </IonCol>
                            <IonCol
                              class="AmbassadorManagementDetail ion-text-center"
                            > */}
                                <IonImg
                                  id={"selectionDot" + index.toString()}
                                  class="AmbassadorManagementEdit actionContentWidth"
                                  src={dots}
                                  onClick={() => {
                                    setAmbassdor(ambassdorDetail);
                                    setUpdateIndex(index);
                                    setNewAmbassdorMode(false);
                                    setShowSeectionPopover(true);
                                  }}
                                />
                              </IonRow>
                            </IonCol>

                          </IonRow>
                          <IonRow class="line"></IonRow>
                        </IonGrid>
                      );
                    }
                  }
                )}
              </IonGrid>
            )}
          </IonCardContent>
        </IonContent>
      </IonCard>
    </IonPage>
  );
};

export default AmbassadorManagement;
