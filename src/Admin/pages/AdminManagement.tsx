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
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
} from "@ionic/react";
import { useEffect, useState } from "react";
import CreateUpdateAdminService from "../Services/AdminManagementService";
import { LoginMetadata } from "../Models/LoginMetadata";
import Loading from "../components/Loading";
import AdminDetails from "../Models/AdminDetails";
import AdminManagementService from "../Services/AdminManagementService";
import AdminListResponse from "../Models/AdminListResponse";
import { lowerCase } from "../../Util/BasicUtilityFunctions";
import CreateUpdateAdmin from "../components/CreateUpdateAdmin";
import TopComponent from "../components/TopComponent";
import { trashOutline } from "ionicons/icons";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
interface AdminManagementProps {
  name: string;
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}

const AdminManagement: React.FC<AdminManagementProps> = ({
  name,
  loginMetadata,
  loginfunction,
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const [admin, setAdmin] = useState(new AdminDetails());
  const [newAdminMode, setNewAdminMode] = useState(true);
  const [adminDetailsList, setAdminDetailsList] = useState<AdminListResponse>(
    new AdminListResponse()
  );
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [profileImage, setProfileImage] = useState<File>();

  useEffect(() => {
    document.title = "Admin Management - Afleet"
    getData(false);
  }, []);
  const getData = (forceRefresh: boolean) => {
    setIsLoading(true);
    AdminManagementService.GetAdminList(loginMetadata, forceRefresh)
      .then((resp) => {
        setAdminDetailsList(resp);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }
  const createNewAdmin = () => {
    setIsLoading(true);
    CreateUpdateAdminService.CreateAdmin(admin, loginMetadata)
      .then((resp) => {
        if (resp.errors == undefined || resp.errors == null) {
          setShowPopover(false);
          adminDetailsList.admins.push(admin);
          setAlertMessage("Admin Created Successfully");
          setIsLoading(false);
          setNewAdminMode(true);
          setAdmin(new AdminDetails());
          setShowAlert(true);
          getData(true);
          setProfileImage(undefined);
        } else {
          setShowPopover(false);
          setAlertMessage(resp.errors[0].message);
          setAdmin(new AdminDetails());
          setNewAdminMode(true);
          setIsLoading(false);
          setShowAlert(true);
          setProfileImage(undefined);
        }
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };
  const UpdateAdmin = () => {
    setIsLoading(true);
    CreateUpdateAdminService.UpdateAdmin(admin, loginMetadata)
      .then((resp) => {
        if (resp.errors == undefined || resp.errors == null) {
          setShowPopover(false);
          adminDetailsList.admins[updateIndex] = admin;
          setAlertMessage("Admin Updated Successfully");
          setIsLoading(false);
          setNewAdminMode(true);
          setUpdateIndex(-1);
          setAdmin(new AdminDetails());
          setShowAlert(true);
          getData(true);
          setProfileImage(undefined);
        } else {
          setShowPopover(false);
          setAlertMessage(resp.errors[0].message);
          setAdmin(new AdminDetails());
          setNewAdminMode(true);
          setUpdateIndex(-1);
          setIsLoading(false);
          setShowAlert(true);
          setProfileImage(undefined);
        }
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  const DeleteAdmin = () => {
    setIsLoading(true);
    AdminManagementService.DeleteAdmin(loginMetadata, updateIndex).then((resp: any) => {
      if (resp.status == "ok") {
        setAlertMessage("Admin Deleted Successfully");
        setAdmin(new AdminDetails());
        setIsLoading(false);
        setShowAlert(true);
        getData(true);
      }
      else {
        setAlertMessage(resp.msg);
        setAdmin(new AdminDetails());
        setIsLoading(false);
        setShowAlert(true);
      }
    }).catch((e) => {
      setAlertMessage(e);
      setAdmin(new AdminDetails());
      setIsLoading(false);
      setShowAlert(true);
    })
  }
  return (
    <IonPage>
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
          <IonAlert
            isOpen={showDeleteAlert}
            message="Are you sure You want to delete this Admin"
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
                  DeleteAdmin();
                },
              },
            ]}
          />
          <CreateUpdateAdmin
            admin={admin}
            showPopover={showPopover}
            setShowPopover={setShowPopover}
            setAdmin={setAdmin}
            isLoading={isLoading}
            newAdminMode={newAdminMode}
            createNewAdmin={createNewAdmin}
            UpdateAdmin={UpdateAdmin}
            loginMetadata={loginMetadata}
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
                <IonRow class="AdminManagementHead">
                  <IonCol class="AdminManagementSubHead">Admin Management</IonCol>
                  <IonCol class="ion-text-end">
                    <IonButton
                      class="AdminManagementButton commonButton"
                      fill="outline"
                      onClick={() => {
                        setShowPopover(true);
                        setNewAdminMode(true);
                      }}
                    >
                      + Add Admin
                    </IonButton>
                  </IonCol>
                </IonRow>
                <IonGrid>
                  <IonRow class="AdminManagementTitle">
                    <IonCol class="AdminManagementContent ion-text-start" style={{ paddingLeft: 30 }}>
                      Name
                    </IonCol>
                    <IonCol class="AdminManagementContent ion-text-center">
                      Email
                    </IonCol>
                    <IonCol class="AdminManagementContent ion-text-center">
                      Phone Number
                    </IonCol>
                    <IonCol class="AdminManagementContent ion-text-center">
                      Country
                    </IonCol>
                    <IonCol class="AdminManagementContent ion-text-center">
                      Super Admin
                    </IonCol>
                    <IonCol class="AdminManagementContent ion-text-center">Actions</IonCol>

                  </IonRow>
                </IonGrid>
                {adminDetailsList.admins.map(
                  (adminDetail: AdminDetails, index: number) => {
                    if (
                      lowerCase(
                        adminDetail.first_name + " " + adminDetail.last_name
                      ).includes(lowerCase(searchText)) ||
                      lowerCase(adminDetail.email).includes(
                        lowerCase(searchText)
                      ) ||
                      lowerCase(adminDetail.contact).includes(
                        lowerCase(searchText)
                      )
                    ) {
                      return (
                        <IonGrid key={index} class="adminManagementGrids">
                          <IonRow class="AdminManagementRow">
                            <IonCol class="AdminManagementDetailCol ion-text-start">
                              <IonRow>
                                <IonCol>
                                  <img
                                    src={adminDetail.admin_img ? adminDetail.admin_img : temp}
                                    className="AdminManagementImage"
                                    alt="N/A"
                                  />
                                  {/* </IonCol>
                                <IonCol class="AdminManagementDetail"> */}
                                  {adminDetail.first_name +
                                    " " +
                                    adminDetail.last_name}
                                </IonCol>
                              </IonRow>
                            </IonCol>
                            <IonCol class="AdminManagementDetailCol ion-text-center">
                              {adminDetail.email}
                            </IonCol>
                            <IonCol class="AdminManagementDetailCol ion-text-center">
                              {adminDetail.contact}
                            </IonCol>
                            <IonCol class="AdminManagementDetailCol ion-text-center">
                              {adminDetail.country}{" "}
                            </IonCol>
                            <IonCol class="AdminManagementDetailCol ion-text-center">
                              {adminDetail.superadmin == true ? "Yes" : "No"}
                            </IonCol>
                            <IonCol
                              class="AdminManagementDetailCol ion-text-center"
                            >
                              {" "}
                              <AiOutlineEdit className="AdminManagementEdit" color="#B2B2B2" size={20} onClick={() => {
                                setUpdateIndex(index);
                                setNewAdminMode(false);
                                setAdmin(Object.assign({}, adminDetail));
                                setShowPopover(true);
                              }} />
                              {/* <IonImg
                              class="AdminManagementEdit"
                              src={Edit}
                              onClick={() => {
                                setUpdateIndex(index);
                                setNewAdminMode(false);
                                setAdmin(Object.assign({}, adminDetail));
                                setShowPopover(true);
                              }}
                            /> */}
                              {/* </IonCol>
                            <IonCol class="AdminManagementDetail ion-text-center"> */}
                              <IoTrashOutline size={20} className="AdminManagementDelete" color="#B2B2B2" onClick={() => { setNewAdminMode(true); setAdmin(Object.assign({}, adminDetail)); setUpdateIndex(adminDetail.id); setShowDeleteAlert(true); }} />

                              {/* <IonIcon md={trashOutline} color="#B2B2B2" class="AdminManagementEdit" onClick={() => {setNewAdminMode(true);setAdmin(Object.assign({}, adminDetail));setUpdateIndex(adminDetail.id);setShowDeleteAlert(true);}}/> */}
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

export default AdminManagement;
