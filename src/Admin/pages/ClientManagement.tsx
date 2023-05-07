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
  IonLabel,
  IonPage,
  IonRow,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { LoginMetadata } from "../Models/LoginMetadata";
import Loading from "../components/Loading";
import { isStringEmpty, lowerCase } from "../../Util/BasicUtilityFunctions";
import TopComponent from "../components/TopComponent";
import ClientManagementService from "../Services/ClientManagementService";
import ClientDetails from "../Models/ClientDetails";
import ClientListResponse from "../Models/ClientListResponse";
import CreateUpdateClient from "../components/CreateUpdateClient";
import { StorageService } from "../../Services/StorageService";
import { clientLoginMetadataExpiry, clientLoginMetadataKey } from "../../Client/Constants/ClientStorageConstants";
import { Browser } from '@capacitor/browser';
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";

interface ClientManagementProps {
  name: string;
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}

const ClientManagement: React.FC<ClientManagementProps> = ({
  name,
  loginMetadata,
  loginfunction,
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const [client, setClient] = useState(new ClientDetails());
  const [newClientMode, setNewClientMode] = useState(false);
  const [clientDetailsList, setClientDetailsList] = useState<ClientListResponse>(
    new ClientListResponse()
  );
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [loginAsClient, setLoginAsClient] = useState(false);

  useEffect(() => {
    document.title = "Client Management - Afleet"
    getData(false);
  }, []);
  const getData = (forceRefresh: boolean) => {
    setIsLoading(true);
    ClientManagementService.GetClientList(loginMetadata, forceRefresh)
      .then((resp) => {
        console.log(resp)
        setClientDetailsList(resp);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }
  const createNewClient = () => {
    setIsLoading(true);
    ClientManagementService.CreateClient(client, loginMetadata)
      .then((resp) => {
        if (resp.errors == undefined || resp.errors == null) {
          setShowPopover(false);
          clientDetailsList.clientList.push(client);
          setAlertMessage("Client Created Successfully");
          setIsLoading(false);
          setNewClientMode(false);
          setClient(new ClientDetails());
          setShowAlert(true);
          getData(true);
        } else {
          setShowPopover(false);
          setAlertMessage(resp.errors[0].message);
          setClient(new ClientDetails());
          setNewClientMode(false);
          setIsLoading(false);
          setShowAlert(true);
        }
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };
  const UpdateClient = () => {
    setIsLoading(true);
    ClientManagementService.UpdateClient(client, loginMetadata)
      .then((resp) => {
        if (resp.errors == undefined || resp.errors == null) {
          setShowPopover(false);
          clientDetailsList.clientList[updateIndex] = client;
          setAlertMessage("Client Updated Successfully");
          setIsLoading(false);
          setNewClientMode(false);
          setUpdateIndex(-1);
          setClient(new ClientDetails());
          setShowAlert(true);
          getData(true);
        } else {
          setShowPopover(false);
          setAlertMessage(resp.errors[0].message);
          setClient(new ClientDetails());
          setNewClientMode(false);
          setUpdateIndex(-1);
          setIsLoading(false);
          setShowAlert(true);
        }
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  const DeleteClient = () => {
    setIsLoading(true);
    ClientManagementService.DeleteClient(loginMetadata, clientDetailsList.clientList[updateIndex].id).then((resp: any) => {
      if (resp.status == true) {
        setAlertMessage("Client Deleted Successfully");
        setClient(new ClientDetails());
        setIsLoading(false);
        setShowAlert(true);
        getData(true);
      }
      else {
        setAlertMessage("Failed to Delete Client");
        setClient(new ClientDetails());
        setIsLoading(false);
        setShowAlert(true);
      }
    }).catch(() => {
      setAlertMessage("Failed to Delete Client");
      setClient(new ClientDetails());
      setIsLoading(false);
      setShowAlert(true);
    })
  }

  const ClientLogin = () => {
    ClientManagementService.ClientLogin(loginMetadata, client.email).then((resp: any) => {
      console.log(resp);
      StorageService.Set(clientLoginMetadataKey, resp, clientLoginMetadataExpiry).then(() => {
        Browser.open({ url: "/user" });
      })
    }).catch((e: any) => {
      console.log(e);
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
            message={"Are you sure You want to " + (loginAsClient ? "login" : "delete") + " this Client"}
            onDidDismiss={() => {
              setShowDeleteAlert(false);
              setUpdateIndex(-1);
              setLoginAsClient(false);
            }
            }
            buttons={[
              { text: "Cancel", role: "cancel" },
              {
                text: "Yes",
                handler: () => {
                  loginAsClient ? ClientLogin() : DeleteClient();
                },
              },
            ]}
          />
          <CreateUpdateClient
            client={client}
            showPopover={showPopover}
            setShowPopover={setShowPopover}
            setClient={setClient}
            isLoading={isLoading}
            newClientMode={newClientMode}
            createNewClient={createNewClient}
            UpdateClient={UpdateClient}
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
                  <IonCol class="AdminManagementSubHead">Client Management</IonCol>
                  <IonCol class="ion-text-end">
                    <IonButton
                      class="AdminManagementButton commonButton"
                      fill="outline"
                      onClick={() => {
                        setShowPopover(true);
                        setNewClientMode(true);
                      }}
                    >
                      + Add Client
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
                      Role
                    </IonCol>
                    <IonCol class="AdminManagementContent ion-text-center">
                      Status
                    </IonCol>
                    <IonCol class="AdminManagementContent ion-text-center">Actions</IonCol>
                    {/* <IonCol size="0.75"></IonCol> */}
                  </IonRow>
                </IonGrid>
                {clientDetailsList.clientList.map(
                  (clientDetail: ClientDetails, index: number) => {
                    if (
                      lowerCase(
                        clientDetail.first_name + " " + clientDetail.last_name
                      ).includes(lowerCase(searchText)) ||
                      lowerCase(clientDetail.email).includes(
                        lowerCase(searchText)
                      )
                    ) {
                      return (
                        <IonGrid key={index} class="adminManagementGrids">
                          <IonRow class="AdminManagementRow">
                            <IonCol class="AdminManagementDetail ion-text-start">
                              <IonRow>
                                <IonCol class="ion-text-start imageCol">
                                  <img
                                    src={isStringEmpty(clientDetail.client_img) ? temp : clientDetail.client_img}
                                    className="AdminManagementImage"
                                  />
                                  {/* </IonCol> */}
                                  {/* <IonCol class="AdminManagementDetail"> */}
                                  <IonLabel>
                                    {clientDetail.first_name +
                                      " " +
                                      clientDetail.last_name}
                                  </IonLabel>
                                </IonCol>
                              </IonRow>
                            </IonCol>
                            <IonCol class="AdminManagementDetail ion-text-center">
                              {clientDetail.email}
                            </IonCol>
                            <IonCol class="AdminManagementDetail ion-text-center">
                              {0}
                            </IonCol>
                            <IonCol class="AdminManagementDetail ion-text-center">
                              {clientDetail.status ? "Active" : "Inactive"}{" "}
                            </IonCol>
                            <IonCol
                              class="AmbassadorManagementDetail ion-text-center"
                            >

                              <IonButton
                                disabled={clientDetail.status ? false : true}
                                fill="outline"
                                class="programManagementLoginButton commonButton"
                                onClick={() => { setLoginAsClient(true); setClient(Object.assign({}, clientDetail)); setUpdateIndex(index); setShowDeleteAlert(true); }}
                              >
                                Login
                              </IonButton>
                              {/* </IonCol>
                            <IonCol
                              class="AdminManagementDetail ion-text-center"
                              size="1.5"
                            > */}
                              {" "}
                              <AiOutlineEdit className="ClientManagementEdit" color="#B2B2B2" size={20} onClick={() => {
                                setUpdateIndex(index);
                                setClient(Object.assign({}, clientDetail));
                                setShowPopover(true);
                                setNewClientMode(false);
                              }} />

                              <IoTrashOutline size={20} className="ClientManagementEdit" color="#B2B2B2" onClick={() => { setLoginAsClient(false); setClient(Object.assign({}, clientDetail)); setUpdateIndex(index); setShowDeleteAlert(true) }} />
                              {/* <IonImg
                              class="AdminManagementEdit"
                              src={Edit}
                              onClick={() => {
                                setUpdateIndex(index);
                                setClient(Object.assign({}, clientDetail));
                                setShowPopover(true);
                              }}
                            /> */}
                            </IonCol>
                            {/* <IonCol size="0.75" class="AdminManagementDetail ion-text-center">
                            <IonIcon md={trashOutline} class="AdminManagementEdit"  onClick={() => {setClient(Object.assign({}, clientDetail));setUpdateIndex(clientDetail.id);setShowDeleteAlert(true);}}/>
                          </IonCol> */}
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

export default ClientManagement;
