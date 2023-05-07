// import './ExploreContainer.css';
import download from "../../Assets/Images/download.svg";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonPopover,
  IonRow,
  IonSegment,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import ProgramSelection from "../Components/ProgramSelection";
import TopComponent from "../Components/TopComponent";
import { LoginMetadata } from "../Models/LoginMetadata";
import { Manage } from "../Models/Manage";
import { menuController } from "@ionic/core";
import { AmbassadorManageDetail } from "../Models/AmbassadorManageDetail";
import { GenericExcelWriter, SelectiveExcelWriter } from "../../Util/ExcelWriter";
import { IoTrashOutline } from "react-icons/io5";
import { AmbassdorCampaignResponse } from "../Models/AmbassdorCampaignResponse";
import defaultImage from "../../Assets/Images/defaultImage.svg";
import { lowerCase } from "../../Util/BasicUtilityFunctions";
import ClientDashboardService from "../Services/ClientDashboardServices";
import ResourceDetailsList from "../Models/ResourceDetailsList";
import ResourceManagementService from "../Services/ClientResourcesService";
import { Browser } from "@capacitor/browser";
import { AiOutlineDownload } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";

interface ClientDashboardProps {
  name: string;
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  setShowNoProgram: (value: boolean) => void;
  setTimeline: (value: boolean) => void;
  setLeaderboard: (value: boolean) => void;
}

const COLORS = ["#1565D8", "#FA7878", "#FFAD1A", "#E9E9E9"];
// const archieveCampaigndata = [
//   { name: "ArchieveCampaign", value: 400 },
//   { name: "TotalCampaign", value: 600 },

// ];

const ClientDashboard: React.FC<ClientDashboardProps> = ({
  name,
  loginMetadata,
  loginfunction,
  setShowNoProgram,
  setLeaderboard, setTimeline,
}) => {
  interface pieChartModel {
    name: string, value: Number
  }
  const [showPopover, setShowPopover] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [formResponseList, setFormResponseList] = useState<Manage[]>([]);
  const [checked, setChecked] = useState<boolean[]>([]);
  const [store, setStore] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tempList, setTempList] = useState(new AmbassadorManageDetail());
  const [showSelectionPopover2, setShowSeectionPopover2] = useState(false);
  const [checkPopOver, setCheckPopover] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [allChecked, setAllChecked] = useState(false);
  const [countChecked, setCountChecked] = useState(0);
  const [showRejectPopover, setShowRejectPopover] = useState(false);
  const [ambassador, setAmbaaadorCampaign] =
    useState<AmbassdorCampaignResponse>(new AmbassdorCampaignResponse());
  const [campaignCount, setCampaignCount] = useState<any>([]);
  const [completeCampaignData, setCompleteCampaignData] = useState<pieChartModel[]>()
  const [totalRewards, setTotalRewards] = useState<pieChartModel[]>();
  const [rewardCount, setRewardsCount] = useState<Array<number>>(new Array<number>(4));
  const [resourceList, setResourceList] = useState<ResourceDetailsList>(new ResourceDetailsList());
  const openMenu = async () => {
    await menuController.open();
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
  // const completeCampaigndata = [
  //   { name: "CompletedCampaign", value: 400 },
  //   { name: "TotalCampaign", value: 1000 },
  //   // { name: "Group C", value: 300 },
  //   // { name: "Group D", value: 200 },
  // ];

  const getAllCampaignDetails = () => {
    ClientDashboardService.GetAllCampaignDetail(loginMetadata).then((data) => {
      console.log(data, "hy")
      const dataRes = data[0];
      console.log(typeof (dataRes), dataRes.totalCount);
      // const activeCamp = dataRes.totalCount-dataRes.archiveCount-dataRes.completedCampign;
      const countList = [dataRes.archiveCount, dataRes.completedCampign, dataRes.totalCount, dataRes.allowed_campaign];
      setCampaignCount(countList);
      // console.log(countList);
      // console.log("totalCamp", campaignCount[0]);
      let campData: pieChartModel[] = [

        {
          name: "OngoingCampaign",
          value: isNaN(dataRes.archiveCount) ? 0 : dataRes.archiveCount
        },
        {
          name: "CompletedCampaign",
          value: isNaN(dataRes.completedCampign) ? 0 : dataRes.completedCampign
        },
        {
          name: "RemainingCampaign",
          value: isNaN(dataRes.allowed_campaign - dataRes.totalCount) ? 0 : dataRes.allowed_campaign - dataRes.totalCount
        }

      ];
      setCompleteCampaignData(campData);
    });
  }

  // function getAllCampaignDetails1() {
  //   const requestOptions = {
  //     method: 'POST',
  //     loginMetadata: loginMetadata,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ 'program_id': loginMetadata.program_id })
  //   };

  //   fetch(GetAllCampaigUrl, requestOptions)
  //     .then(response => response.json())
  //     .then((data) => {
  //       console.log("-----ALL Campaigns-----")
  //       const dataRes = data[0];
  //       console.log(typeof (dataRes), dataRes.totalCount);
  //       // const activeCamp = dataRes.totalCount-dataRes.archiveCount-dataRes.completedCampign;
  //       const countList = [dataRes.archiveCount, dataRes.completedCampign, dataRes.totalCount];
  //       setCampaignCount(countList);
  //       // console.log(countList);
  //       // console.log("totalCamp", campaignCount[0]);
  //       let campData: pieChartModel[] = [

  //         {
  //           name: "CompletedCampaign",
  //           value: dataRes.completedCampign
  //         },
  //         {
  //           name: "TotalCampaign",
  //           value: dataRes.totalCount - dataRes.completedCampign
  //         }

  //       ];

  //       const archData: pieChartModel[] = [
  //         {
  //           name: "ArchieveCampaign",
  //           value: dataRes.archiveCount
  //         },
  //         {
  //           name: "TotalCampaign",
  //           value: dataRes.totalCount - dataRes.archiveCount
  //         }
  //       ]
  //       setCompleteCampaignData(campData);
  //       setarchieveCampaigndata(archData);
  //     });

  // }

  const getAllProgramRewardsDetails = () => {
    ClientDashboardService.GetAllProgramRewardsDetail(loginMetadata)
      .then((data) => {
        console.log("-----ALL Rewards-----")
        console.log(typeof (data), data);
        let rewards: number[] = [0, 0, 0, 0];
        // let totRewards = 0;
        let pendingRewards = 0, acceptRewards = 0, rejectRewards = 0;
        data.map((ele: any) => {
          if (ele.status == 0) rewards[0] += ele.count;
          if (ele.status == 1) rewards[1] += ele.count;
          if (ele.status == 2) rewards[2] += ele.count;
          rewards[3] += ele.count;
        })
        // for(const item in data){
        //   // console.log(item);
        //   const element = data[item];
        //   if(element.status == 0) rewards[0] = rewards[0] + element.points;
        //   if(element.status == 1)rewards[1] = rewards[1] + element.points;
        //   if(element.status == 2) rewards[2] =  rewards[2] + element.points;
        //   rewards[3] = rewards[3] + element.points;
        // }
        console.log(rewards);
        setRewardsCount(rewards);
        const rewardData = [
          {
            name: "acceptRewards",
            value: isNaN(rewards[1]) ? 0 : rewards[1]
          }, {
            name: "rejectRewards",
            value: isNaN(rewards[2]) ? 0 : rewards[2]
          }, {
            name: "pendingRewards",
            value: isNaN(rewards[0]) ? 0 : rewards[0]
          },
          {
            name: "totalRewards",
            value: isNaN(rewards[3] - rewards[0] - rewards[1] - rewards[2]) ? 0 : rewards[3] - rewards[0] - rewards[1] - rewards[2]
          }
        ]

        setTotalRewards(rewardData);

      });
  }

  // function getAllProgramRewardsDetails1() {
  //   const requestOptions = {
  //     method: 'POST',
  //     loginMetadata: loginMetadata,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ 'program_id': loginMetadata.program_id })
  //   };

  //   fetch(GetAllCampaigRewardsUrl, requestOptions)
  //     .then(response => response.json())
  //     .then((data) => {
  //       console.log("-----ALL Rewards-----")
  //       console.log(typeof (data), data);
  //       let rewards: number[] = [0, 0, 0, 0];
  //       // let totRewards = 0;
  //       let pendingRewards = 0, acceptRewards = 0, rejectRewards = 0;
  //       data.map((ele: any) => {
  //         if (ele.status == 0) rewards[0] += ele.count;
  //         if (ele.status == 1) rewards[1] += ele.count;
  //         if (ele.status == 2) rewards[2] += ele.count;
  //         rewards[3] += ele.count;
  //       })
  //       // for(const item in data){
  //       //   // console.log(item);
  //       //   const element = data[item];
  //       //   if(element.status == 0) rewards[0] = rewards[0] + element.points;
  //       //   if(element.status == 1)rewards[1] = rewards[1] + element.points;
  //       //   if(element.status == 2) rewards[2] =  rewards[2] + element.points;
  //       //   rewards[3] = rewards[3] + element.points;
  //       // }
  //       console.log(rewards);
  //       setRewardsCount(rewards);
  //       const rewardData = [
  //         {
  //           name: "acceptRewards",
  //           value: isNaN(rewards[1]) ? 0 : rewards[1]
  //         }, {
  //           name: "rejectRewards",
  //           value: isNaN(rewards[2]) ? 0 : rewards[2]
  //         }, {
  //           name: "pendingRewards",
  //           value: isNaN(rewards[0]) ? 0 : rewards[0]
  //         },
  //         {
  //           name: "totalRewards",
  //           value: isNaN(rewards[3] - rewards[0] - rewards[1] - rewards[2]) ? 0 : rewards[3] - rewards[0] - rewards[1] - rewards[2]
  //         }
  //       ]

  //       setTotalRewards(rewardData);

  //     });

  // }

  const getAmbassadorFormList = () => {
    ClientDashboardService.GetAmbassadorFormList(loginMetadata).then((data) => {
      // console.log("FORM RESPONSES")
      // console.log(data);
      setFormResponseList(data);
    });
  }

  // function getAmbassadorFormList() {

  //   const requestOptions = {
  //     method: 'POST',
  //     loginMetadata: loginMetadata,
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ 'programId': loginMetadata.program_id })
  //   };

  //   fetch(GetClientManageUrl + "/getAllFormResponse", requestOptions)
  //     .then(response => response.json())
  //     .then((data) => {
  //       // console.log("FORM RESPONSES")
  //       // console.log(data);
  //       setFormResponseList(data);
  //     });

  // }


  useEffect(() => {
    document.title = "User Dashboard - Afleet"
    // setIsLoading(true);
    console.log("In useEffect")
    if (loginMetadata.program_id == null || loginMetadata.program_id == -1) {
      setShowPopover(true);
      console.log("program id ==> ", loginMetadata.program_id);
    } else {
      console.log("in else ----------")
      getAllCampaignDetails();
      getAllProgramRewardsDetails();
      getAmbassadorFormList();
      getResources();
    }



    // setIsLoading(false);
  }, []);
  const getResources = () => {
    ResourceManagementService.getResourcesForClient(loginMetadata).then((result) => {
      setResourceList(result);
    }).catch((error => {
      console.log("Error: ");
      console.log(error.message);
    }))
  }
  const acceptAmbassdor = (index: any) => {
    console.log("Adding New Ambasdor Of INDEX: ", index, formResponseList[index].id);
    ClientDashboardService.AcceptAmbassdor(loginMetadata, formResponseList[index]).then((data) => {
      console.log("Ambassdor Status Set To Approved(1)");
      const newList = formResponseList.filter((data) => {
        return data.id != formResponseList[index].id
      })
      setFormResponseList(newList);
      getAmbassadorFormList();
    }).catch((error) => {
      console.log("ERROR");
      console.log(error.name);
    })
  }

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

  const rejectAmbassdor = (index: any) => {
    console.log("Removing ", formResponseList[index].first_name)

    console.log(`Removing Ambasdor Of INDEX: ${index} FORMID: ${formResponseList[index].id}`);

    ClientDashboardService.RejectAmbassdor(loginMetadata, formResponseList[index]).then((data) => {
      console.log("Ambassdor Status Set To Reject(2)");
      const newList = formResponseList.filter((data) => {
        return data.id != formResponseList[index].id
      })
      setFormResponseList(newList);
      getAmbassadorFormList();

    }).catch((error) => {
      console.log("ERROR");
      console.log(error.name);

    })
  }

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

  console.log("METADATA", loginMetadata);
  return (
    <IonPage>
      <IonCard class="backgroundAdjustment" style={{ background: "#E5E5E5" }}>
        <IonContent scrollX={true} scrollY={true}>
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

          {/* Popover2 */}
          <IonPopover
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

          <ProgramSelection
            showPopover={showPopover}
            loginMetadata={loginMetadata}
            loginfunction={loginfunction}
            setShowPopover={setShowPopover}
            setShowNoProgram={setShowNoProgram}
            getAllCampaignDetails={getAllCampaignDetails}
            getAllProgramRewardsDetails={getAllProgramRewardsDetails}
            getAmbassadorFormList={getAmbassadorFormList}
            setTimeline={setTimeline}
            setLeaderboard={setLeaderboard}
          />

          <TopComponent
            loginMetadata={loginMetadata}
            loginfunction={loginfunction}
            searchText={searchText}
            setSearchText={setSearchText}
          />

          <IonCardContent class="marginForContent" >
            <IonGrid class="scrolling">
              <IonRow class="dashboardName">
                Dashboard
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonCard class="dashboardCard">
                    <IonRow>
                      <IonCol class="ion-text-start">Campaigns</IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart width={400} height={400}>
                            <Pie
                              data={completeCampaignData}
                              dataKey="value"
                              cx="50%"
                              cy="50%"
                              innerRadius={70}
                              outerRadius={90}
                              fill="#8884d8"
                            >
                              <Cell
                                key={`cell-0`}
                                fill={COLORS[0]}
                              />
                              <Cell
                                key={`cell-1`}
                                fill={COLORS[2]}

                              />
                              <Cell
                                key={`cell-2`}
                                fill={COLORS[3]}

                              />
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <IonRow className="data-pecent" style={{ "color": COLORS[0] }}>~{isNaN(Math.ceil(100 * campaignCount[0] / campaignCount[3])) ? 0 : Math.ceil(100 * campaignCount[0] / campaignCount[3])}%</IonRow>
                        <IonRow className="data-pecent" style={{ "color": COLORS[2] }}> ~{isNaN(Math.ceil(100 * campaignCount[1] / campaignCount[3])) ? 0 : Math.ceil(100 * campaignCount[1] / campaignCount[3])}%</IonRow>
                        <IonRow className="data-pecent" style={{ "color": COLORS[3] }}> ~{isNaN(Math.ceil(100 * (campaignCount[3] - campaignCount[2]) / campaignCount[3])) ? 0 : Math.ceil(100 * (campaignCount[3] - campaignCount[2]) / campaignCount[3])}%</IonRow>
                      </IonCol>
                      <IonCol style={{ display: "block", margin: "auto" }}>

                        <IonRow>
                          <IonCol size="1" class="ion-text-end"><div className="circle" style={{ "background": COLORS[0] }} /></IonCol>
                          <IonCol class="ion-text-start">Ongoing Campaigns</IonCol></IonRow>
                        <IonRow><IonCol class="ion-text-start" className="data">{campaignCount[0]}</IonCol> </IonRow>
                        <IonRow>
                          <IonCol size="1" class="ion-text-end"><div className="circle" style={{ "background": COLORS[2] }} /></IonCol>
                          <IonCol class="ion-text-start">Used Campaigns</IonCol></IonRow>
                        <IonRow><IonCol class="ion-text-start" className="data">{campaignCount[1]}</IonCol> </IonRow>
                        <IonRow>
                          <IonCol size="1" class="ion-text-end"><div className="circle" style={{ "background": COLORS[3] }} /></IonCol>
                          <IonCol class="ion-text-start">Remaining Campaigns</IonCol></IonRow>
                        <IonRow><IonCol class="ion-text-start" className="data">{campaignCount[3] - campaignCount[2]}</IonCol> </IonRow>
                      </IonCol>
                    </IonRow>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard class="dashboardCard">
                    <IonRow>
                      <IonCol class="ion-text-start">Ambassador Rewards Distribution</IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart width={400} height={400}>
                            <Pie
                              data={totalRewards}
                              dataKey="value"
                              cx="50%"
                              cy="50%"
                              innerRadius={70}
                              outerRadius={90}
                              fill="#8884d8"
                            >
                              <Cell
                                key={`cell-0`}
                                fill={COLORS[0]}
                              />
                              <Cell
                                key={`cell-1`}
                                fill={COLORS[1]}
                              />
                              <Cell
                                key={`cell-1`}
                                fill={COLORS[2]}

                              />
                              <Cell
                                key={`cell-3`}
                                fill={COLORS[3]}

                              />
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <IonRow className="data-pecent" style={{ "color": COLORS[0] }}>~{isNaN(Math.ceil(100 * rewardCount[1] / rewardCount[3])) ? 0 : Math.ceil(100 * rewardCount[1] / rewardCount[3])}%</IonRow>
                        <IonRow className="data-pecent" style={{ "color": COLORS[1] }}> ~{isNaN(Math.ceil(100 * rewardCount[2] / rewardCount[3])) ? 0 : Math.ceil(100 * rewardCount[2] / rewardCount[3])}%</IonRow>
                        <IonRow className="data-pecent" style={{ "color": COLORS[2] }}> ~{isNaN(Math.ceil(100 * rewardCount[0] / rewardCount[3])) ? 0 : Math.ceil(100 * rewardCount[0] / rewardCount[3])}%</IonRow>
                      </IonCol>
                      <IonCol style={{ display: "block", margin: "auto" }}>
                        <IonRow>
                          <IonCol size="1" class="ion-text-end"><div className="circle" style={{ "background": COLORS[0] }} /></IonCol>
                          <IonCol class="ion-text-start"><span>Distributed Rewards</span></IonCol>

                        </IonRow>
                        <IonRow><IonCol class="ion-text-start" className="data">{rewardCount[1]}</IonCol></IonRow>
                        <IonRow>
                          <IonCol size="1" class="ion-text-end"><div className="circle" style={{ "background": COLORS[1] }} /></IonCol>
                          <IonCol class="ion-text-start">Rejected Rewards</IonCol>

                        </IonRow>
                        <IonRow> <IonCol class="ion-text-start" className="data">{rewardCount[2]}</IonCol></IonRow>
                        <IonRow>
                          <IonCol size="1"><div className="circle" style={{ "background": COLORS[2] }} /></IonCol>
                          <IonCol>Pending Rewards</IonCol>
                        </IonRow>
                        <IonRow><IonCol class="ion-text-start" className="data">{rewardCount[0]}</IonCol></IonRow>
                      </IonCol>
                    </IonRow>
                  </IonCard>
                </IonCol>
              </IonRow>
              {formResponseList && formResponseList.length > 0 ?
                <IonGrid>
                  <IonRow class="dashboardName">
                    Recruit Ambassador
                    <IonCol class="ion-text-end">
                      <IonButton
                        class="ClientManageButton"
                        fill="outline"
                        onClick={async () => {
                          console.log("hey");
                          let form_data: any[] = [];
                          let RecruitAmbassadorSchema1: any[] = [];
                          await ClientDashboardService.GetFormSchema(loginMetadata).then((resp) => {
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
                              "Ambassador_Recruit_Details"
                            )
                            :
                            GenericExcelWriter(
                              form_data,
                              RecruitAmbassadorSchema1,
                              "Ambassador_Recruit_Details"
                            );

                        }}
                      >
                        <BsDownload color="#2E77AE" size={16} />&nbsp;&nbsp;
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
          </IonCardContent>
        </IonContent>
      </IonCard>
    </IonPage>
  );
};

export default ClientDashboard;
