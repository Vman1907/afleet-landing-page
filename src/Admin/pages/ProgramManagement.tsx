import "../Styles/ProgramManagement.css";
import "../Styles/AdminManagement.css";
import temp from "../../Assets/Images/campaignDeafult.png";
import Edit from "../../Assets/Images/Edit.png";

import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
} from "@ionic/react";
import { useEffect, useState } from "react";
import download from "../../Assets/Images/download.svg";
import ProgramDetails from "../Models/ProgramDetails";
import ProgramManagementService from "../Services/ProgramManagementService";
import { LoginMetadata } from "../Models/LoginMetadata";
import Loading from "../components/Loading";
import ProgramDetailsResponse from "../Models/ProgramDetailsResponse";
import TopComponent from "../components/TopComponent";
import CreateUpdateProgram from "../components/CreateUpdateProgram";
import ProgramDetailsComponent from "../components/ProgramDetailsComponent";
import { GenericExcelWriter } from "../../Util/ExcelWriter";
import { ProgramSchema } from "../Constants/ExcelFileSchemas";
import PackageClientListResponse from "../Models/PackageClientListResponse";
import ClientManagementService from "../Services/ClientManagementService";
import {
  clientLoginMetadataExpiry,
  clientLoginMetadataKey,
} from "../../Client/Constants/ClientStorageConstants";
import { StorageService } from "../../Services/StorageService";
import { Browser } from "@capacitor/browser";
import { AiOutlineEdit } from "react-icons/ai";
import { isStringEmpty } from "../../Util/BasicUtilityFunctions";
import { IoTrashOutline } from "react-icons/io5";
import PackageList from "../components/PackageList";
import PackageListResponse from "../Models/PackageListResponse";
import PackageDetails from "../Models/PackageDetails";
interface ProgramManagementProps {
  name: string;
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}
const ProgramManagement: React.FC<ProgramManagementProps> = ({
  name,
  loginMetadata,
  loginfunction,
}) => {
  const [detail, setDetail] = useState<string>(
    loginMetadata.first_name + " " + loginMetadata.last_name
  );
  const [showPopover, setShowPopover] = useState(false);
  const [showPopover1, setShowPopover1] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const [programsetailsList, setProgramDetailsList] =
    useState<ProgramDetailsResponse>(new ProgramDetailsResponse());
  const [showPopoverEditUpdate, setShowPopoverEditUpdate] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(new ProgramDetails());
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [newProgramMode, setNewProgramMode] = useState(true);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [packag, setPackage] = useState(new PackageDetails());
  const [packageClientList, setPackageClientList] = useState(
    new PackageClientListResponse()
  );
  const [packageDetailsList, setPackageDetailsList] =
    useState<PackageListResponse>(new PackageListResponse());
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  useEffect(() => {
    document.title = "Program Management - Afleet"
    ProgramManagementService.GetProgramList(loginMetadata, false)
      .then((resp) => {
        setProgramDetailsList(resp);
        console.log(resp);
      })
      .catch((e) => {
        console.log(e);
      });
    ProgramManagementService.GetPackageClientList(loginMetadata)
      .then((resp: PackageClientListResponse) => {
        setPackageClientList(resp);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
    console.log(programsetailsList);
  }, []);

  const getData = () => {
    ProgramManagementService.GetProgramList(loginMetadata, true)
      .then((resp: ProgramDetailsResponse) => {
        setProgramDetailsList(resp);
        console.log(resp);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  const updateProgram = () => {
    setIsLoading(true);
    ProgramManagementService.UpdateProgram(selectedProgram, loginMetadata).then(
      (resp) => {
        if (resp.errors == undefined || resp.errors == null) {
          setShowPopoverEditUpdate(false);
          programsetailsList.programList[updateIndex] = selectedProgram;
          setAlertMessage("Program Updated Successfully");
          setIsLoading(false);
          setNewProgramMode(true);
          setUpdateIndex(-1);
          setSelectedProgram(new ProgramDetails());
          setShowAlert(true);
          getData();
        } else {
          setShowPopoverEditUpdate(false);
          setAlertMessage(resp.errors[0].message);
          setSelectedProgram(new ProgramDetails());
          setNewProgramMode(true);
          setUpdateIndex(-1);
          setIsLoading(false);
          setShowAlert(true);
          getData();
        }
      }
    );
  };
  const createProgram = () => {
    setIsLoading(true);
    ProgramManagementService.CreateProgram(selectedProgram, loginMetadata)
      .then((resp) => {
        if (resp.errors == undefined || resp.errors == null) {
          setShowPopoverEditUpdate(false);
          programsetailsList.programList.push(selectedProgram);
          setAlertMessage("Program Created Successfully");
          setIsLoading(false);
          setNewProgramMode(true);
          setSelectedProgram(new ProgramDetails());
          setShowAlert(true);
          getData();
        } else {
          setShowPopoverEditUpdate(false);
          setAlertMessage(resp.errors[0].message);
          setSelectedProgram(new ProgramDetails());
          setNewProgramMode(true);
          setIsLoading(false);
          setShowAlert(true);
          getData();
        }
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };
  const ProgramLogin = (email: string, programId: number, programName: string, timeline: number, leaderboard: number, program_img: string, package_id: number, invite_ambassadors: number, prog_client_id: number) => {
    setIsLoading(true);
    ClientManagementService.ClientLogin(loginMetadata, email)
      .then((resp: any) => {
        console.log(resp);
        resp.prog_client_id = prog_client_id;
        resp.program_id = programId;
        resp.role = 0;
        resp.mcampaign = 1;
        resp.mpackage = 1;
        resp.mcalendar = 1;
        resp.mleaderboard = 1;
        resp.mtimeline = 1;
        resp.mrewards = 1;
        resp.invite_ambassadors = invite_ambassadors;
        resp.program_name = programName;
        resp.invite_ambassadors = invite_ambassadors;
        resp.package_timeline = timeline;
        resp.package_leaderboard = leaderboard;
        resp.program_img = program_img;
        resp.package_id = package_id;
        StorageService.Set(
          clientLoginMetadataKey,
          resp,
          clientLoginMetadataExpiry
        ).then(() => {
          setShowPopover(false);
          Browser.open({ url: "/user" });
          setIsLoading(false);
        });
      })
      .catch((e: any) => {
        setIsLoading(false);
        console.log(e);
      });
  };
  const deleteAProgramPerm = () => {
    setIsLoading(true);
    ProgramManagementService.DeleteAProgramPerm(updateIndex, loginMetadata).then((resp: any) => {
      console.log(resp);
      if (resp.status == true) {
        setIsLoading(false);
        setAlertMessage("Program Deleted Permananetly");
        setShowAlert(true);
        getData();
      }
      else {
        setIsLoading(false);
        setAlertMessage("Unable to delete the Program");
        setShowAlert(true);
      }
    })
  }
  const deleteAProgram = () => {
    setIsLoading(true);
    ProgramManagementService.DeleteAProgram(updateIndex, loginMetadata).then((resp: any) => {
      console.log(resp);
      if (resp.status == true) {
        setIsLoading(false);
        setAlertMessage("Program Deleted Successfully");
        setShowAlert(true);
        getData();
      }
      else {
        setIsLoading(false);
        setAlertMessage("Unable to delete the Program");
        setShowAlert(true);
      }
    })
  }

  const ChangePackage = async () => {
    await ProgramManagementService.PlanUpdate(selectedProgram.id, packag.id, loginMetadata).then((resp) => {
      setShowPopover(false);
      getData();
      setAlertMessage("Plan Updated Successfully")
      setShowAlert(true);

    })
  }
  // if (isLoading) {
  //   return (
  //     <IonPage>
  //       <IonContent>
  //         <Loading />
  //       </IonContent>
  //     </IonPage>
  //   );
  // }
  return (
    <IonPage>
      <IonAlert isOpen={showDeleteAlert} onDidDismiss={() => { setShowDeleteAlert(false) }} message={"Are you sure to delete the program"} buttons={[
        {
          text: "Delete", handler: () => {

            deleteAProgram();
          },
        },
        {
          text: "Permananetly Delete",
          handler: () => {

            deleteAProgramPerm();
          },
        },
      ]} />
      <IonAlert
        isOpen={showConfirmAlert}
        message="Are you sure You want to change your plan"
        onDidDismiss={() => {
          setShowConfirmAlert(false);
        }
        }
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Yes",
            handler: () => {
              ChangePackage();
            },
          },
        ]}
      />
      <PackageList
        showPopover={showPopover1}
        setShowPopover={setShowPopover1}
        packageDetailsList={packageDetailsList}
        packag={packag}
        setPackage={setPackage}
        program={selectedProgram}
        loginMetadata={loginMetadata}
        ChangePackage={ChangePackage}
        setShowConfirmAlert={setShowConfirmAlert}
      />
      <ProgramDetailsComponent
        showPopover={showPopover}
        setShowPopover={setShowPopover}
        selectedProgram={selectedProgram}
        programLogin={ProgramLogin}
      />
      <CreateUpdateProgram
        loginMetadata={loginMetadata}
        showPopoverEditUpdate={showPopoverEditUpdate}
        setShowPopoverEditUpdate={setShowPopoverEditUpdate}
        isLoading={isLoading}
        selectedProgram={selectedProgram}
        newProgramMode={newProgramMode}
        createProgram={createProgram}
        updateProgram={updateProgram}
        packageClientList={packageClientList}
      />
      <IonCard class="backgroundAdjustment" style={{ background: "#E5E5E5" }}>
        <IonContent scrollX={true} scrollY={true}>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => {
              setAlertMessage("");
              setShowAlert(false);
            }}
            message={alertMessage}
          />
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
                <IonRow class="ProgramManagementHead">
                  <IonCol class="ProgramManagementSubHead">
                    Program Management
                  </IonCol>
                  <IonCol class="ion-text-end">
                    <IonButton
                      class="ProgramManagementButton commonButton"
                      fill="outline"
                      onClick={() =>
                        GenericExcelWriter(
                          programsetailsList.programList,
                          ProgramSchema,
                          "Program_Details"
                        )
                      }
                    >
                      <IonImg src={download}></IonImg>&nbsp;&nbsp;Download All
                    </IonButton>
                    <IonButton
                      class="ProgramManagementButton commonButton"
                      fill="outline"
                      onClick={() => {
                        setSelectedProgram(new ProgramDetails());
                        setNewProgramMode(true);
                        setShowPopoverEditUpdate(true);
                      }}
                    >
                      + Create Program
                    </IonButton>
                  </IonCol>
                </IonRow>

                <IonGrid>
                  <IonRow class="ProgramManagementTitle">
                    <IonCol
                      class="ProgramManagementContent ion-text-start"
                      style={{ paddingLeft: 30 }}
                    >
                      {" "}
                      Program Name
                    </IonCol>
                    <IonCol class="ProgramManagementContent ion-text-center">
                      Email
                    </IonCol>
                    <IonCol class="ProgramManagementContent ion-text-center">
                      Client Status
                    </IonCol>
                    <IonCol class="ProgramManagementContent ion-text-center">
                      Actions
                    </IonCol>
                  </IonRow>
                </IonGrid>
                {programsetailsList.programList.map((programDetail: ProgramDetails, index: number) => {
                  if (
                    programDetail.title
                      .toLowerCase()
                      .includes(searchText.toLowerCase()) ||
                    programDetail.email
                      .toLowerCase()
                      .includes(searchText.toLowerCase()) ||
                    programDetail.id == parseInt(searchText)
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
                                    isStringEmpty(programDetail.program_img)
                                      ? temp
                                      : programDetail.program_img
                                  }
                                  className="AdminManagementImage"
                                  alt="N/A"
                                />
                                <IonLabel>
                                  {programDetail.title}
                                </IonLabel>
                              </IonCol>

                            </IonRow>
                          </IonCol>
                          <IonCol class="ProgramManagementDetail ion-text-center">
                            {programDetail.email}
                          </IonCol>
                          <IonCol class="ProgramManagementDetail ion-text-center">
                            {programDetail.client_status ? "Active" : "Inactive"}
                          </IonCol>
                          <IonCol
                            class="ProgramManagementDetail ion-text-center"

                          >
                            {/* <IonSegment mode="md"> */}
                            {/* <IonImg
                            class="ProgramManagementEdit"
                            src={Edit}
                            onClick={() => {
                              setShowPopoverEditUpdate(true);
                              setUpdateIndex(index);
                              setSelectedProgram(Object.assign({}, programDetail));
                              setNewProgramMode(false);
                            }}
                          /> */}
                            <AiOutlineEdit className="ProgramManagementEdit" color="#B2B2B2" size={20} onClick={() => {
                              setShowPopoverEditUpdate(true);
                              setUpdateIndex(index);
                              setSelectedProgram(Object.assign({}, programDetail));
                              setNewProgramMode(false);
                            }} />
                            <IoTrashOutline className="ProgramManagementEdit" size={20} color="#B2B2B2" onClick={() => {
                              setUpdateIndex(programsetailsList.programList[index].id);
                              setShowDeleteAlert(true);
                            }} />
                            <IonButton
                              disabled={programDetail.client_status ? false : true}
                              fill="outline"
                              class="programManagementLoginButton commonButton"
                              onClick={() => {
                                setSelectedProgram(programDetail);
                                setShowPopover(true);
                              }}
                            >
                              Login
                            </IonButton>
                            {loginMetadata.superadmin == 1 ? <IonButton
                              fill="outline"
                              class="programManagementLoginButton commonButton"
                              onClick={async () => {
                                await ProgramManagementService.getPackageList(programDetail, loginMetadata).then((resp) => {
                                  setPackageDetailsList(resp)
                                  console.log(programDetail)
                                  console.log(programsetailsList)
                                  setPackage(resp.PackageList[0])
                                  setSelectedProgram(programDetail)
                                })
                                setShowPopover1(true);
                              }}
                            >
                              Change Plan
                            </IonButton> : null}


                            {/* </IonSegment> */}
                          </IonCol>
                        </IonRow>
                        <IonRow class="line"></IonRow>
                      </IonGrid>
                    );
                  }
                })}
              </IonGrid>)}
          </IonCardContent>
        </IonContent>
      </IonCard>
    </IonPage>
  );
};

export default ProgramManagement;
