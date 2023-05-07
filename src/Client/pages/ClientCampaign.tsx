import "../Styles/ClientCampaign.css";

import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonPopover,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useEffect, useState } from "react";
import {

  IonLabel,
} from "@ionic/react";

import ClientCampaignTab from "../Components/ClientCampaignTab";
import { menuController } from "@ionic/core";
import { socialList } from "../Models/socialList";
import createClientService from "../Services/createClientService";
import { LoginMetadata } from "../Models/LoginMetadata";
import TopComponent from "../Components/TopComponent";
import CreateCampaignPopover from "../Components/Popovers/CreateCampaignPopover";
import { GetClientResponse } from "../Models/GetClientResponse";
import { CampaignTaskResponse } from "../Models/CampaignTask";
import { convertToLocale } from "../../Util/BasicUtilityFunctions";
import InfoPopover from "../Components/Popovers/InfoPopover";
import TaskPopover from "../Components/Popovers/TaskPopover";
import CampaignReportTab from "../Components/CampaignReportsTab";
import { TbReportAnalytics } from "react-icons/tb";
import CampaignforProgram from "../Models/CampaignforProgram";
import CampaignReportCampaign from "../Models/CampaignReportCampaign";
import CampaignPopover from "../Components/Popovers/CampaignPopover";
import { SocialCampaignTaskType } from "../Constants/CampaignStatusConstant";
import sort from "./../../Assets/Images/Sort.svg";
import queryString from "query-string";
import { StorageService } from "../../Services/StorageService";
interface ClientCampaignProps {
  name: string;
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}

const ClientCampaign: React.FC<ClientCampaignProps> = ({
  name,
  loginMetadata,
  loginfunction,
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const [showPopover2, setShowPopover2] = useState(false);
  const [showPopover3, setShowPopover3] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [first, setFirst] = useState(0);
  const [pop1, setPop1] = useState(false);
  const [pop2, setPop2] = useState(true);
  const [pop3, setPop3] = useState(true);
  const [pop4, setPop4] = useState(true);
  const [pop5, setPop5] = useState(true);
  const [pop6, setPop6] = useState(true);
  const [Taskpop1, setTaskPop1] = useState(false);
  const [Taskpop2, setTaskPop2] = useState(true);
  const [Taskpop3, setTaskPop3] = useState(true);
  const [newcampaign, setNewCampaign] = useState(false);
  const [campaignData, setCampaignData] = useState(new CampaignTaskResponse());
  const [customTask, setCustomTask] = useState<socialList[]>([]);

  const [social, setSocial] = useState(new socialList());
  const [social2, setSocial2] = useState(new socialList());
  const [social3, setSocial3] = useState(new socialList());
  const [checkEdit, setCheckEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [option, setOption] = useState(4);
  const [update, setUpdate] = useState(0);
  const [totalUGC, setTotalUGC] = useState(0);

  const [totalCustom, setTotalCustom] = useState(0);
  const [totalSocial, setTotalSocial] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [campPoints, setCampPoints] = useState(0);
  const [camp, setCamp] = useState(0);
  const [accept, setAccept] = useState(0);
  const [pending, setPending] = useState(0);
  const [topCamp, setTopCamp] = useState<CampaignReportCampaign[]>([]);
  const [task1, setTask1] = useState(false);
  const [task2, setTask2] = useState(false);
  const [task3, setTask3] = useState(false);
  const [campaignURL, setCampaignURL] = useState("");
  const [Guidelines, setGuidelines] = useState("");
  const [sortPop, setSortPop] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMesssage] = useState("");

  useEffect(() => {
    document.title = "User Campaign - Afleet";

    (async () => {
      const access_token = window.location.href.slice(
        window.location.href.indexOf('=') + 1,
        window.location.href.indexOf('&'),
      );
      if (window.location.href.includes("access_token=") && access_token) {
        try {
          createClientService.storeInstaToken(loginMetadata, access_token).then((resp) => {
            if (resp.status == true) {
              loginMetadata.isInstaToken = true;
              setMesssage("Authentication Successful. Please create campaign again")
              setShowAlert(true);
            }
          });
        } catch (error) {
          console.error(error);
          setMesssage("Authentication Failed")
          setShowAlert(true);
        }
      }
    })();
    (async () => {
      const { oauth_token, oauth_verifier } = queryString.parse(window.location.search);
      if (oauth_token && oauth_verifier) {
        try {
          const SS_oauth_token = await StorageService.Get("twitter_oauth_token");
          if (oauth_token != SS_oauth_token) {
            console.log("Token Mismatched.");
          }
          const SS_oauth_token_secret = await StorageService.Get("twitter_oauth_token_secret");
          createClientService.twitterAccessToken(loginMetadata, SS_oauth_token, SS_oauth_token_secret, oauth_verifier).then((resp) => {
            if (resp.status == true) {
              loginMetadata.isTwitterToken = true;
              setMesssage("Authentication Successful. Please create campaign again")
              setShowAlert(true);
            }
          });
        } catch (error) {
          console.error(error);
          setMesssage("Authentication Failed")
          setShowAlert(true);
        }
      }
    })();
  }, [])
  const openMenu = async () => {
    await menuController.open();
  };
  const [CampaignList, setCampaignList] = useState<GetClientResponse>(
    new GetClientResponse()
  );
  const getData = async () => {
    await createClientService.GetReportAllCamp(loginMetadata).then((resp) => {
      setTotalUGC(resp.UGC_campaign);
      setTotalCustom(resp.custom_campaign);
      setTotalSocial(resp.social_campaign);
      setTotalPoints(resp.total_points);
    })
  }

  const getCampData = async (page: number) => {
    // await createClientService.GetReportCamp(loginMetadata, page).then(async (resp) => {
    //   setCampPoints(resp.camp_points);
    //   setCamp(resp.total_campaign);
    // })

    // await createClientService.GetReportCampEff(loginMetadata, page).then(async (resp) => {
    //   setAccept(resp.accepted);
    //   setPending(resp.pending);
    // })

    await createClientService.GetReportTopCamp(loginMetadata, page).then(async (resp) => {
      setTopCamp(resp);
    })
  }
  const GetCampaignByID = async (campaignId: number, amb_prog_id: number) => {
    setIsLoading(true);

    await createClientService.GetCampaignDetail(loginMetadata, campaignId, 0, option).then((res) => {
      res.custom_campaign.start_date = convertToLocale(res.custom_campaign.start_date);
      res.custom_campaign.end_date = convertToLocale(res.custom_campaign.end_date);
      setCampaignData(res);
      setCustomTask(res.custom_task);
      res.custom_task.map((val: any, index: number) => {
        if (index == 0) {
          setSocial(val);
        }
        else if (index == 1) {
          setSocial2(val);
        }
        else {
          setSocial3(val);
        }
      })
      console.log(res.custom_task);
      setCampaignURL(res.custom_task[0].link);
      setGuidelines(res.custom_task[0].description);
      if (res.custom_campaign.status == "Social") {
        if (res.custom_campaign.task_number == 1) {
          if (res.custom_task[0].task_type = SocialCampaignTaskType.Like) {
            setTask1(true);
          }
          else if (res.custom_task[0].task_type = SocialCampaignTaskType.Share) {
            setTask2(true);
          }
          else if (res.custom_task[0].task_type = SocialCampaignTaskType.Comment) {
            setTask3(true);
          }
        }
        else if (res.custom_campaign.task_number == 2) {
          if (res.custom_task[0].task_type = SocialCampaignTaskType.Like) {
            setTask1(true);
          }
          else if (res.custom_task[0].task_type = SocialCampaignTaskType.Share) {
            setTask2(true);
          }
          else if (res.custom_task[0].task_type = SocialCampaignTaskType.Comment) {
            setTask3(true);
          }
          if (res.custom_task[1].task_type = SocialCampaignTaskType.Like) {
            setTask1(true);
          }
          else if (res.custom_task[1].task_type = SocialCampaignTaskType.Share) {
            setTask2(true);
          }
          else if (res.custom_task[1].task_type = SocialCampaignTaskType.Comment) {
            setTask3(true);
          }
        }
        else {
          setTask1(true);
          setTask2(true);
          setTask3(true);
        }
      }
      setIsLoading(false);
      setShowPopover(true);
    })
      .catch((e) => {
        setIsLoading(false);
      })

  }

  const GetAllPackage = async (option: number) => {
    setIsLoading(true);
    await createClientService
      .GetCampaignList(loginMetadata, option)
      .then(async (resp) => {
        await setCampaignList(resp);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };
  return (
    <IonPage>
      <IonCard class="backgroundAdjustment" style={{ background: "#E5E5E5" }}>
        <CampaignPopover
          setIsLoading={setIsLoading}
          loginMetadata={loginMetadata}
          showPopover={showPopover}
          setShowPopover={setShowPopover}
          campaignData={campaignData}
          customTask={customTask}
          newcampaign={newcampaign}
          setCampaignURL={setCampaignURL}
          setGuidelines={setGuidelines}
          campaignURL={campaignURL}
          Guidelines={Guidelines}
          setTask1={setTask1}
          setTask2={setTask2}
          setTask3={setTask3}
          task1={task1}
          task2={task2}
          task3={task3}
          option={option}
          GetAllPackage={GetAllPackage}
        />
        <IonAlert isOpen={showAlert} message={message} onDidDismiss={() => { setShowAlert(false) }} />
        <IonPopover
          trigger="sortCampaigns"
          id="CampaignSort"
          isOpen={sortPop}
          onDidDismiss={() => setSortPop(false)}
          arrow={true}
          alignment="center"
          side="bottom"
        >
          <IonGrid style={{ margin: "0" }}>
            <IonRow>
              <IonCard class="CampaignSortCard" onClick={async () => {
                setSortPop(false);
                await setOption(4);
                await GetAllPackage(4);
              }}>
                <IonCardContent>
                  All Campaigns
                </IonCardContent>
              </IonCard>
            </IonRow>
            <IonRow>
              <IonCard class="CampaignSortCard" onClick={async () => {
                setSortPop(false);
                await setOption(1);
                await GetAllPackage(1);
              }}>
                <IonCardContent>
                  Engagement Campaigns
                </IonCardContent>
              </IonCard>
            </IonRow>
            <IonRow>
              <IonCard class="CampaignSortCard" onClick={async () => {
                setSortPop(false);
                await setOption(0);
                await GetAllPackage(0);
              }}>
                <IonCardContent>
                  Custom Campaigns
                </IonCardContent>
              </IonCard>
            </IonRow>
            <IonRow>
              <IonCard class="CampaignSortCard" onClick={async () => {
                setSortPop(false);
                await setOption(2);
                await GetAllPackage(2);
              }}>
                <IonCardContent>
                  UGC Campaigns
                </IonCardContent>
              </IonCard>
            </IonRow>
          </IonGrid>
        </IonPopover>
        {/* <CreateCampaignPopover
          loginMetadata={loginMetadata}
          showPopover={showPopover}
          showPopover2={showPopover2}
          showPopover3={showPopover3}
          setShowPopover={setShowPopover}
          setShowPopover2={setShowPopover2}
          setShowPopover3={setShowPopover3}
          pop1={pop1}
          pop2={pop2}
          pop3={pop3}
          pop4={pop4}
          pop5={pop5}
          pop6={pop6}
          setPop1={setPop1}
          setPop2={setPop2}
          setPop3={setPop3}
          setPop4={setPop4}
          setPop5={setPop5}
          setPop6={setPop6}
          campaignData={campaignData}
          setCampaignData={setCampaignData}
          setUpdate={setUpdate}
          update={update}
          Taskpop1={Taskpop1}
          Taskpop2={Taskpop2}
          Taskpop3={Taskpop3}
          newcampaign={newcampaign}
          setTaskPop1={setTaskPop1}
          setTaskPop2={setTaskPop2}
          setTaskPop3={setTaskPop3}
          customTask={customTask}
          option={option}
          GetAllPackage={GetAllPackage}
          checkEdit={checkEdit}
        /> */}
        <IonContent>
          <TopComponent
            loginMetadata={loginMetadata}
            loginfunction={loginfunction}
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <IonCardContent class="marginForContent">
            <IonGrid>
              <IonRow class="ClientCampaignHead">
                <span className="ClientCampaignSubHead">{option == 0 ? "Custom Campaigns" : option == 1 ? "Engagement Campaigns" : option == 2 ? "UGC Campaigns" : "Campaigns"}</span>
                <span className="ClientCampaignSubHead2">
                  <span className="ClientCampaignSort" id="sortCampaigns" onClick={() => {
                    setSortPop(true);
                  }}>
                    {/* <IonSelect
                      class="SelectionStyle2"
                      interface="popover"
                      value={option}
                      placeholder="All Campaigns"
                      onIonChange={async (e) => { await setOption(e.detail.value); GetAllPackage(e.detail.value) }}
                    >
                      <IonSelectOption value="4">All Campaigns</IonSelectOption>
                      <IonSelectOption value="0">Custom Campaigns</IonSelectOption>
                      <IonSelectOption value="1">Social Campaigns</IonSelectOption>
                      <IonSelectOption value="2">UGC Campaigns</IonSelectOption>
                    </IonSelect> */}
                    <img src={sort} />
                    <span style={{ marginLeft: "5px" }}>Sort</span>
                  </span>
                  <span >
                    <IonButton
                      class="ClientCampaignButton"
                      fill="outline"
                      onClick={() => {
                        setCampaignData(new CampaignTaskResponse());
                        setCampaignURL("");
                        setGuidelines("");
                        setTask1(false);
                        setTask2(false);
                        setTask3(false);
                        setCustomTask([new socialList(), new socialList(), new socialList()]);
                        setCheckEdit(false);
                        setShowPopover(true);
                        openMenu();
                        setNewCampaign(true);
                      }}
                    >
                      + Create Campaign
                    </IonButton>
                  </span>
                </span>


              </IonRow>

              <IonSegment mode="md"
                onIonChange={(e) => console.log(`${e.detail.value} segment selected`)}
                value={first.toString()}
                class="ClientCampaignTab"
                style={{ marginBottom: "0px" }}
              >
                <IonSegmentButton

                  value="0"
                  onClick={() => {
                    setFirst(0);
                  }}
                  defaultChecked={first.toString() == '0'}
                  class="ClientSegmentButton"
                >
                  <IonLabel>Current</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton
                  value="1"
                  onClick={() => {
                    setFirst(1);
                  }}
                  class="ClientSegmentButton"
                >
                  <IonLabel>Past</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton
                  value="2"
                  onClick={() => {
                    setFirst(2);
                  }}
                  class="ClientSegmentButton"
                >
                  <IonLabel>Archived</IonLabel>
                </IonSegmentButton>
                {/* <IonSegmentButton
                  value="3"
                  onClick={() => {
                    setFirst(3);
                  }}
                  class="ClientSegmentButton"
                >
                  <IonLabel style={{ color: "#456086" }}><TbReportAnalytics size={24} />&nbsp;Reports</IonLabel>
                </IonSegmentButton> */}
              </IonSegment>

              {first == 0 ? (
                <ClientCampaignTab
                  loginMetadata={loginMetadata}
                  searchText={searchText}
                  GetAllPackage={GetAllPackage}
                  newcampaign={newcampaign}
                  setNewCampaign={setNewCampaign}
                  CampaignList={CampaignList}
                  update={update}
                  setUpdate={setUpdate}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                  option={option}
                  GetCampaignByID={GetCampaignByID}
                  setCheckEdit={setCheckEdit}
                  archeived={false}
                  current={true}
                  topCamp={topCamp}
                  getCampData={getCampData}
                />
              ) : first == 1 ? (
                <ClientCampaignTab
                  loginMetadata={loginMetadata}
                  searchText={searchText}
                  GetAllPackage={GetAllPackage}
                  CampaignList={CampaignList}
                  newcampaign={newcampaign}
                  setNewCampaign={setNewCampaign}
                  update={update}
                  setUpdate={setUpdate}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                  option={option}
                  GetCampaignByID={GetCampaignByID}
                  setCheckEdit={setCheckEdit}
                  archeived={false}
                  current={false}
                  topCamp={topCamp}
                  getCampData={getCampData}
                />
              ) : first == 2 ? (
                <ClientCampaignTab
                  loginMetadata={loginMetadata}
                  searchText={searchText}
                  GetAllPackage={GetAllPackage}
                  CampaignList={CampaignList}
                  newcampaign={newcampaign}
                  setNewCampaign={setNewCampaign}
                  update={update}
                  setUpdate={setUpdate}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                  option={option}
                  GetCampaignByID={GetCampaignByID}
                  setCheckEdit={setCheckEdit}
                  archeived={true}
                  current={false}
                  topCamp={topCamp}
                  getCampData={getCampData}
                />
              ) :
                <CampaignReportTab
                  loginMetadata={loginMetadata}
                  option={option}
                  getData={getData}
                  totalUGC={totalUGC}
                  totalCustom={totalCustom}
                  totalSocial={totalSocial}
                  totalPoints={totalPoints}
                  getCampData={getCampData}
                  campPoints={campPoints}
                  camp={camp}
                  accept={accept}
                  pending={pending}
                  topCamp={topCamp}
                />
              }
            </IonGrid>
          </IonCardContent>
        </IonContent>
      </IonCard>

    </IonPage>
  );
};

export default ClientCampaign;
