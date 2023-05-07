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
    IonTitle,
} from "@ionic/react";

import { useEffect, useState } from "react";
import "../Styles/ClientProfileSetting.css"
import temp from "../../Assets/Images/campaignDeafult.png";
import instagram from "./../../Assets/Images/instagram.svg";
import linkedin from "./../../Assets/Images/linkedin.svg";
import twitter from "./../../Assets/Images/Twitter.svg";
import community from "./../../Assets/Images/community.svg";
import website from "./../../Assets/Images/website.svg";
import TopComponent from "../Components/TopComponent";
import Loading from "../Components/Loading";
import { isStringEmpty, lowerCase } from "../../Util/BasicUtilityFunctions";
import defaultImg from '../../Assets/Images/defaultImage.svg'
import { LoginMetadata } from "../Models/LoginMetadata";
import ProgramDetails from "../../Ambassador/Models/ProgramDetails";
import { AiOutlineEdit } from "react-icons/ai";
import { GetClientProgramDetailsUrl } from "../Constants/ClientConfig";
import UpdateProgram from "../Components/UpdateProgram";
import ClientProgramService from "../Services/ClientProgramService";
import AddManagerPopover from "../Components/Popovers/AddManagerPopover";
import ManagerDetails from "../Models/ManagerDetails";
import ClientManagerService from "../Services/ClientManagerService";
import ManagerListResponse from "../Models/ManagerListResponse";
import { IoTrashOutline } from "react-icons/io5";
import { list } from "ionicons/icons";
interface ClientProfileSettingProps {
    loginMetadata: LoginMetadata;
    loginfunction: (loginMetadata: LoginMetadata | null) => void;
}

const ClientProfileSetting: React.FC<ClientProfileSettingProps> = ({
    loginMetadata,
    loginfunction,
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [showPopover, setShowPopover] = useState(false);
    const [showPopover1, setShowPopover1] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [updateIndex, setUpdateIndex] = useState(-1);


    const [selectedProgram, setSelectedProgram] = useState(new ProgramDetails());
    const [programDetailsList, setProgramDetailsList] = useState<ProgramDetails>(new ProgramDetails);
    const [managerDetailsList, setManagerDetailsList] = useState<ManagerListResponse>(new ManagerListResponse());

    const [newManagerMode, setNewManagerMode] = useState(false);
    const [manager, setManager] = useState(new ManagerDetails());

    const getData = () => {
        setIsLoading(true);
        ClientProgramService.ManagerProgram(loginMetadata).then((data) => {
            console.log(data)
            setManagerDetailsList(data);
            setIsLoading(false);
        });
    }

    const getClientProgramDetails = () => {
        setIsLoading(true);
        ClientProgramService.ClientProgram(loginMetadata).then((data) => {
            console.log("Client Program Details", data)
            setProgramDetailsList(data);
            setSelectedProgram(data);
            setIsLoading(false);
            // console.log("FORM RESPONSES")
            // console.log(data);
        });
    }
    // function getClientProgramDetails() {
    //     const requestOptions = {
    //         method: 'POST',
    //         loginMetadata: loginMetadata,
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             'programId': loginMetadata.program_id
    //         })
    //     };

    //     fetch(GetClientProgramDetailsUrl, requestOptions)
    //         .then(response => response.json())
    //         .then((data) => {
    //             console.log("Client Program Details", data)
    //             setProgramDetailsList(data);
    //             setSelectedProgram(data);
    //             // console.log("FORM RESPONSES")
    //             // console.log(data);
    //         });
    // }

    const updateProgram = (e: any) => {
        setIsLoading(true);
        ClientProgramService.UpdateProgram(selectedProgram, loginMetadata).then(
            (resp) => {
                if (resp.errors == undefined || resp.errors == null) {
                    loginMetadata.program_img = selectedProgram.program_img;
                    loginMetadata.program_name = selectedProgram.title
                    loginfunction(loginMetadata);
                    setShowPopover(false);
                    setAlertMessage("Program Updated Successfully");
                    setIsLoading(false);
                    setShowAlert(true);
                    getClientProgramDetails();
                    window.location.reload();
                } else {
                    setShowPopover(false);
                    setAlertMessage(resp.errors[0].message);
                    setIsLoading(false);
                    setShowAlert(true);
                    getClientProgramDetails();
                }
            }
        );
    };

    const date = programDetailsList.expiry_date.substring(
        0,
        10
    );

    const [year, month, day] = date.split('-');

    const result = [day, month, year].join('-');


    useEffect(() => {
        document.title = "User Profile Setting - Afleet"
        setIsLoading(false);
        getClientProgramDetails();
        getData();
    }, []);

    const DeleteClient = () => {
        setIsLoading(true);
        ClientProgramService.DeleteManager(loginMetadata, managerDetailsList.managerList[updateIndex].id).then((resp: any) => {
            if (resp.status == true) {
                setAlertMessage("Client Deleted Successfully");
                setManager(new ManagerDetails());
                setIsLoading(false);
                setShowAlert(true);
                getClientProgramDetails();
                getData();
            }
            else {
                setAlertMessage("Failed to Delete Client");
                setManager(new ManagerDetails());
                setIsLoading(false);
                setShowAlert(true);
            }
        }).catch(() => {
            setAlertMessage("Failed to Delete Client");
            setManager(new ManagerDetails());
            setIsLoading(false);
            setShowAlert(true);
        })
    }

    const createNewManager = () => {
        setIsLoading(true)
        ClientManagerService.AddManager(manager, loginMetadata)
            .then((resp) => {
                if (resp.errors == undefined || resp.errors == null) {
                    setShowPopover1(false);
                    managerDetailsList.managerList.push(manager);
                    setAlertMessage(resp.msg);
                    setIsLoading(false);
                    setNewManagerMode(false);
                    setManager(new ManagerDetails());
                    setShowAlert(true);
                    getClientProgramDetails();
                    getData(); //Will be used when we have to refresh the data to get the list of managers.
                } else {
                    setShowPopover1(false);
                    setAlertMessage(resp.errors[0].message);
                    setManager(new ManagerDetails());
                    setNewManagerMode(false);
                    setIsLoading(false);
                    setShowAlert(true);
                }
            })
            .catch((e) => {
                setIsLoading(false);
            });
    };
    const updateManager = () => {
        setIsLoading(true)
        ClientManagerService.updateManager(manager, loginMetadata)
            .then((resp) => {
                if (resp.errors == undefined || resp.errors == null) {
                    setShowPopover1(false);
                    setAlertMessage(resp.msg);
                    setIsLoading(false);
                    setNewManagerMode(false);
                    setManager(new ManagerDetails());
                    setShowAlert(true);
                    getClientProgramDetails();
                    getData(); //Will be used when we have to refresh the data to get the list of managers.
                } else {
                    setShowPopover1(false);
                    setAlertMessage(resp.errors[0].message);
                    setManager(new ManagerDetails());
                    setNewManagerMode(false);
                    setIsLoading(false);
                    setShowAlert(true);
                }
            })
            .catch((e) => {
                setIsLoading(false);
            });
    };


    return (
        <IonPage>
            <IonCard class="backgroundAdjustment" style={{ background: "#E5E5E5" }}>
                <IonContent scrollX={true} scrollY={true}>

                    <AddManagerPopover
                        manager={manager}
                        showPopover={showPopover1}
                        setShowPopover={setShowPopover1}
                        setManager={setManager}
                        isLoading={isLoading}
                        newManagerMode={newManagerMode}
                        createNewManager={createNewManager}
                        loginMetadata={loginMetadata}
                        updateManager={updateManager}
                    />
                    <UpdateProgram
                        isLoading={isLoading}
                        loginMetadata={loginMetadata}
                        showPopover={showPopover}
                        setShowPopover={setShowPopover}
                        selectedProgram={selectedProgram}
                        updateProgram={updateProgram}
                    />
                    <IonAlert
                        isOpen={showDeleteAlert}
                        message={"Are you sure You want to  delete this Client"}
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
                                    DeleteClient();
                                },
                            },
                        ]}
                    />
                    <TopComponent
                        loginMetadata={loginMetadata}
                        loginfunction={loginfunction}
                        searchText={searchText}
                        setSearchText={setSearchText}
                    />
                    <IonAlert
                        isOpen={showAlert}
                        onDidDismiss={() => {
                            setAlertMessage("");
                            setShowAlert(false);
                        }}
                        message={alertMessage}
                    />

                    <IonCardContent class="marginForContent">
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <IonGrid class="scrolling">
                                <IonRow class="Head">
                                    <IonCol class="subHead ion-text-start">Profile Settings</IonCol>
                                    {loginMetadata.role == 0 ? <IonCol class="ion-text-end">
                                        <IonButton
                                            fill="outline"
                                            onClick={() => {
                                                setShowPopover1(true);
                                                setNewManagerMode(true);
                                            }}
                                        >
                                            + Manager
                                        </IonButton>
                                    </IonCol> : null}

                                </IonRow>
                                <IonCard class="dashboardCard1 ">

                                    <IonRow class="ion-padding" className="amb-programList">
                                        <IonCol style={{
                                            minWidth: "60px",
                                            maxWidth: "100px",
                                        }}> <img
                                            // style={{
                                            //     border: "100% solid #F3C97A",
                                            // }}
                                            style={{
                                                objectFit: "cover",
                                                borderRadius: "100%",
                                                height: "80px",
                                                width: "80px",
                                            }}
                                            src={isStringEmpty(programDetailsList.program_img) ? temp : programDetailsList.program_img} alt=""></img></IonCol>
                                        <IonCol >
                                            <IonRow
                                                class="ion-text-start"
                                                className="text-bold"
                                                style={{ fontSize: "2rem", textTransform: "capitalize" }}>
                                                {programDetailsList.title}
                                            </IonRow>
                                            <IonRow>


                                                {programDetailsList.email}

                                            </IonRow>
                                        </IonCol>


                                        <IonCol size="1">
                                            <AiOutlineEdit size={20}
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    setShowPopover(true);
                                                }}
                                            />
                                        </IonCol>


                                    </IonRow>
                                    <IonRow>
                                        <IonCol class="ion-text-start">
                                            <IonCol>
                                                <IonCol><img src={instagram} /></IonCol>
                                                <IonCol>Instagram:</IonCol>
                                            </IonCol>
                                            <IonCol className="text-bold" >
                                                {isStringEmpty(programDetailsList.instagram_link) ? "N/A" : <a href={programDetailsList.instagram_link}>{programDetailsList.instagram_link}</a>}

                                            </IonCol>

                                        </IonCol>
                                        <IonCol class="ion-text-start">
                                            <IonCol>
                                                <IonCol><img src={twitter} /></IonCol>
                                                <IonCol>Twitter:</IonCol>
                                            </IonCol>
                                            <IonCol className="text-bold" >
                                                {isStringEmpty(programDetailsList.twitter_link) ? "N/A" : <a href={programDetailsList.twitter_link}>{programDetailsList.twitter_link}</a>}

                                            </IonCol>
                                        </IonCol>
                                        <IonCol class="ion-text-start">
                                            <IonCol>
                                                <IonCol><img src={linkedin} /></IonCol>
                                                <IonCol>Linkedin:</IonCol>
                                            </IonCol>
                                            <IonCol className="text-bold" >
                                                {isStringEmpty(programDetailsList.linkedin_link) ? "N/A" : <a href={programDetailsList.linkedin_link}>{programDetailsList.linkedin_link}</a>}

                                            </IonCol>
                                        </IonCol>


                                    </IonRow>
                                    <IonRow>
                                        <IonCol class="ion-text-start">
                                            <IonCol>
                                                <IonCol>
                                                    <img src={community} />
                                                </IonCol>
                                                <IonCol>

                                                    Community Link:
                                                </IonCol>
                                            </IonCol>
                                            <IonCol className="text-bold">
                                                {isStringEmpty(programDetailsList.community_channel) ? "N/A" : <a href={programDetailsList.community_channel}>{programDetailsList.community_channel}</a>}

                                            </IonCol>

                                        </IonCol>
                                        <IonCol class="ion-text-start">
                                            <IonCol>
                                                <IonCol>
                                                    <img src={website} />
                                                </IonCol>
                                                <IonCol>

                                                    Website Link:
                                                </IonCol>
                                            </IonCol>
                                            <IonCol className="text-bold">
                                                {isStringEmpty(programDetailsList.website_link) ? "N/A" : <a href={programDetailsList.website_link}>{programDetailsList.website_link}</a>}

                                            </IonCol>

                                        </IonCol>
                                        <IonCol></IonCol>

                                    </IonRow>

                                    <IonRow className="amb-programList" class="ion-padding">
                                        <IonCol > About : {programDetailsList.description} </IonCol>
                                        <IonCol class="ion-text-end"> Expiry Date : {result} </IonCol>

                                    </IonRow>
                                </IonCard>
                                {loginMetadata.role == 0 && managerDetailsList.managerList.length > 0 ?
                                    (<IonGrid>
                                        <IonRow class="Head">
                                            <IonCol class="subHead ion-text-start">Manager Management</IonCol>
                                        </IonRow>
                                        <IonGrid>
                                            <IonRow class="AdminManagementTitle">
                                                <IonCol class="AdminManagementContent ion-text-start" style={{ paddingLeft: 30 }}>
                                                    Name
                                                </IonCol>
                                                <IonCol class="AdminManagementContent ion-text-center">
                                                    Email
                                                </IonCol>
                                                <IonCol class="AdminManagementContent ion-text-center"></IonCol>
                                            </IonRow>
                                        </IonGrid>
                                        {managerDetailsList.managerList.map(
                                            (List: ManagerDetails, index: number) => {
                                                if (
                                                    lowerCase(
                                                        List.first_name + " " + List.last_name
                                                    ).includes(lowerCase(searchText)) ||
                                                    lowerCase(List.email).includes(
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
                                                                                src={isStringEmpty(List.client_img) ? temp : List.client_img}
                                                                                className="AdminManagementImage"
                                                                            />
                                                                            <IonLabel>
                                                                                {List.first_name +
                                                                                    " " +
                                                                                    List.last_name}
                                                                            </IonLabel>
                                                                        </IonCol>
                                                                    </IonRow>
                                                                </IonCol>
                                                                <IonCol class="AdminManagementDetail ion-text-center">
                                                                    {List.email}
                                                                </IonCol>
                                                                <IonCol
                                                                    class="AmbassadorManagementDetail ion-text-center"
                                                                >
                                                                    <AiOutlineEdit className="ProgramManagementEdit" color="#B2B2B2" size={20} onClick={() => {
                                                                        setNewManagerMode(false);
                                                                        setManager(List)
                                                                        setShowPopover1(true)
                                                                        console.log(List)
                                                                    }} />
                                                                    <IoTrashOutline size={20} className="ClientManagementEdit" color="#B2B2B2" onClick={() => { setManager(Object.assign({}, List)); setUpdateIndex(index); setShowDeleteAlert(true) }} />
                                                                </IonCol>
                                                            </IonRow>
                                                            <IonRow class="line"></IonRow>
                                                        </IonGrid>
                                                    );
                                                }
                                            }
                                        )}
                                    </IonGrid>)
                                    : null}
                            </IonGrid>
                        )}
                    </IonCardContent>
                </IonContent>
            </IonCard>
        </IonPage >
    );
};

export default ClientProfileSetting;
