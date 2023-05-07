import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
} from "@ionic/react";
import { useEffect, useState } from "react";
import "../Styles/AdminDashboard.css";
import "../Styles/PackageManagement.css";
import PackageDetails from "../Models/PackageDetails";
import PackageManagementService from "../Services/PackageManagementService";
import { LoginMetadata } from "../Models/LoginMetadata";
import PackageListResponse from "../Models/PackageListResponse";
import Loading from "../components/Loading";
import { lowerCase } from "../../Util/BasicUtilityFunctions";
import TopComponent from "../components/TopComponent";
import CreateUpdatePackage from "../components/CreateUpdatePackage";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";

interface PackageManagementProps {
  name: string;
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}
const PackageManagement: React.FC<PackageManagementProps> = ({
  name,
  loginMetadata,
  loginfunction,
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const [packageDetails, setPackageDetails] = useState(new PackageDetails());
  const [packageDetailsList, setPackageDetailsList] =
    useState<PackageListResponse>(new PackageListResponse());
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [searchText, setSearchText] = useState("");
  const [newPackageMode, setNewPackageMode] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deletePackagePlanId, setDeletePackagePlanId] = useState('')


  const GetAllPackage = async (forceRefresh: boolean) => {
    await PackageManagementService.GetPackageList(loginMetadata, forceRefresh)
      .then((resp) => {
        setPackageDetailsList(resp);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    GetAllPackage(false);
    document.title = "Package Management - Afleet"
  }, []);

  const createNewPackage = () => {
    setIsLoading(true);
    PackageManagementService.CreatePackage(packageDetails, loginMetadata)
      .then((resp) => {
        if (resp.errors == undefined || resp.errors == null) {
          setShowPopover(false);
          packageDetailsList.PackageList.push(packageDetails);
          setAlertMessage("Package Created Successfully");
          setIsLoading(false);
          setNewPackageMode(false);
          setPackageDetails(new PackageDetails());
          setShowAlert(true);
          GetAllPackage(true);
        } else {
          setShowPopover(false);
          setAlertMessage(resp.errors[0].message);
          setPackageDetails(new PackageDetails());
          setNewPackageMode(false);
          setIsLoading(false);
          setShowAlert(true);
        }
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };
  const UpdatePackage = () => {
    setIsLoading(true);
    PackageManagementService.UpdatePackage(packageDetails, loginMetadata)
      .then((resp) => {
        if (resp.errors == undefined || resp.errors == null) {
          setShowPopover(false);
          packageDetailsList.PackageList[updateIndex] = packageDetails;
          setAlertMessage("Package Updated Successfully");
          setIsLoading(false);
          setNewPackageMode(false);
          setUpdateIndex(-1);
          setPackageDetails(new PackageDetails());
          setShowAlert(true);
          GetAllPackage(true);
        } else {
          setShowPopover(false);
          setAlertMessage(resp.errors[0].message);
          setPackageDetails(new PackageDetails());
          setNewPackageMode(false);
          setUpdateIndex(-1);
          setIsLoading(false);
          setShowAlert(true);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        setAlertMessage("There is an Error, Contact Admin!!");
        setShowAlert(true);
      });
  };
  const DeletePackage = () => {
    setIsLoading(true);
    PackageManagementService.DeletePackage(loginMetadata, deletePackagePlanId).then((resp: any) => {
      if (resp.status == "ok") {
        setAlertMessage("Package Deleted Successfully");
        setPackageDetails(new PackageDetails());
        setIsLoading(false);
        setShowAlert(true);
        GetAllPackage(true);
      }
      else {
        setAlertMessage(resp.msg);
        setPackageDetails(new PackageDetails());
        setIsLoading(false);
        setShowAlert(true);
      }
    }).catch((e) => {
      setAlertMessage(e);
      setPackageDetails(new PackageDetails());
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
            message="Are you sure You want to delete this Package"
            onDidDismiss={() => {
              setShowDeleteAlert(false);
              setUpdateIndex(-1);
              setDeletePackagePlanId('')
            }
            }
            buttons={[
              { text: "Cancel", role: "cancel" },
              {
                text: "Yes",
                handler: () => {
                  DeletePackage();
                },
              },
            ]}
          />
          <CreateUpdatePackage
            showPopover={showPopover}
            setShowPopover={setShowPopover}
            GetAllPackage={GetAllPackage}
            loginMetadata={loginMetadata}
            isLoading={isLoading}
            setPackageDetails={setPackageDetails}
            packageDetails={packageDetails}
            newPackageMode={newPackageMode}
            createNewPackage={createNewPackage}
            UpdatePackage={UpdatePackage}
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
                  <IonCol class="AdminManagementSubHead">
                    Package Management
                  </IonCol>
                  <IonCol class="ion-text-end">
                    <IonButton
                      class="AdminManagementButton commonButton"
                      fill="outline"
                      onClick={() => {
                        setNewPackageMode(true);
                        setShowPopover(true);
                      }}
                    >
                      + Create Package
                    </IonButton>
                  </IonCol>
                </IonRow>
                {packageDetailsList.PackageList && packageDetailsList.PackageList.sort((a, b) => Number(b.status) - Number(a.status)).map((packageDetail, index) => {
                  console.log(packageDetail);
                  if (
                    lowerCase(packageDetail.title).includes(lowerCase(searchText))
                  ) {
                    return (
                      <IonRow key={index}>
                        <IonCard class="packageDetailsCard" style={{}}>
                          <IonGrid>
                            <IonRow>
                              <IonCol class="packageNameText">
                                {packageDetail.title}
                                {/* <IonLabel class="numDays">| 20Days</IonLabel> */}
                                {packageDetail.status ? <IonLabel class="status">
                                  &nbsp;&nbsp;Active&nbsp;&nbsp;
                                </IonLabel> : <IonLabel class="inactiveStatus">
                                  &nbsp;&nbsp;Inactive&nbsp;&nbsp;
                                </IonLabel>}
                                {packageDetail.frequency=='m' ? <IonLabel class="status">
                                  &nbsp;&nbsp;Monthly&nbsp;&nbsp;
                                </IonLabel> :packageDetail.frequency=='y' ? <IonLabel class="status">
                                  &nbsp;&nbsp;Yearly&nbsp;&nbsp;
                                </IonLabel>: packageDetail.frequency=='w' ?<IonLabel class="status">
                                  &nbsp;&nbsp;Weekly&nbsp;&nbsp;
                                </IonLabel> :undefined}
                              </IonCol>
                              <IonCol class="ion-text-end boxContent2" size="0.5">
                                {/* <IonImg
                                class="PackageManagementEdit"
                                src={Edit}
                                onClick={() => {
                                  setUpdateIndex(index);
                                  setPackageDetails(packageDetail);
                                  setShowPopover(true);
                                }}
                              /> */}
                                <AiOutlineEdit color="#B2B2B2" size={20} onClick={() => {
                                  setNewPackageMode(false);
                                  setUpdateIndex(index);
                                  setPackageDetails(packageDetail);
                                  setShowPopover(true);
                                }} />
                              </IonCol>
                              {/* <IonCol class="ion-text-end boxContent2" size="0.5">
                                {/* <IonImg
                                class="PackageManagementEdit"
                                src={Edit}
                                onClick={() => {
                                  setUpdateIndex(index);
                                  setPackageDetails(packageDetail);
                                  setShowPopover(true);
                                }}
                              /> 
                                <IoTrashOutline size={20} color="#B2B2B2" onClick={() => { setPackageDetails(Object.assign({}, packageDetail)); setUpdateIndex(index); setDeletePackagePlanId(packageDetail.plan_id); setShowDeleteAlert(true); }} />
                              </IonCol> */}
                            </IonRow>
                            <IonRow>
                              <IonCol size="8">
                                {packageDetail.description}
                              </IonCol>
                            </IonRow>
                            <IonRow>
                              <IonCol>
                                <IonCard class="BoxSizing">
                                  <IonSegment mode="md" class="numberSize">
                                    {packageDetail.ambassador_count}
                                  </IonSegment>
                                  <IonRow class="boxContent ion-text-center">
                                    Allowed Ambassador
                                  </IonRow>
                                </IonCard>
                              </IonCol>
                              <IonCol>
                                <IonCard class="BoxSizing">
                                  <IonSegment mode="md" class="numberSize">
                                    {packageDetail.allowed_managers}
                                  </IonSegment>
                                  <IonRow class="boxContent ion-text-center">
                                    Allowed Manager
                                  </IonRow>
                                </IonCard>
                              </IonCol>
                              <IonCol>
                                <IonCard class="BoxSizing">
                                  <IonSegment mode="md" class="numberSize">{packageDetail.allowed_campaign}</IonSegment>
                                  <IonRow class="boxContent ion-text-center">
                                    Allowed Campaigns
                                  </IonRow>
                                </IonCard>
                              </IonCol>
                            </IonRow>
                            <IonRow style={{ marginTop: -20 }}>
                              <IonCol class="ion-text-end boxContent2">
                                $ {packageDetail.price}
                              </IonCol>
                            </IonRow>
                            {/*
                            Author:- Aman Kumar Shukla (theWiseAman)
                            Description:- Link button for the checkout page of the Product Plan
                          */}
                            <IonButton
                              disabled={!packageDetail.status}
                              onClick={() => {
                                window.open(
                                  packageDetail.checkout_page ? packageDetail.checkout_page : '/admin/Login',
                                  "noopener,noreferrer"
                                );
                              }}
                              style={{ backgroundColor: "#007bff", borderRadius: "0.5rem", textDecoration: "none", margin: "1rem" }}
                              color="#3880ff"
                              size="default"
                            >
                              Checkout Page
                            </IonButton>
                            {/*
                            Author:- Aman Kumar Shukla (theWiseAman)
                            Description:- End of code
                          */}
                          </IonGrid>
                        </IonCard>
                      </IonRow>
                    );
                  }
                })}
              </IonGrid>
            )}
          </IonCardContent>
        </IonContent>
      </IonCard>
    </IonPage>
  );
};

export default PackageManagement;
