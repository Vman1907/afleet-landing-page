import {
  IonAvatar,
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
  IonSegmentButton,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { BsTelephone } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import TopComponent from "../Components/TopComponent";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import ProgramDetails from "../Models/ProgramDetails";
import ProgramManagementService from "../Services/ProgramManagementService";
import "../styles/AmbassadorDashboard.css";
import CampaignDetails from "../Models/CampaignDetails";
import AmbassadorCampaignTab from "../Components/AmbassadorCampaignTab";
import { CampaignStatus } from "../Constants/AmbassadorEnums";
import ProgramSelection from "../Components/ProgramSelection";
import temp from "../../Assets/Images/campaignDeafult.png";
import { convertToLocale, isStringEmpty } from "../../Util/BasicUtilityFunctions";
import instagram from "./../../Assets/Images/instagram.svg";
import linkedin from "./../../Assets/Images/linkedin.svg";
import twitter from "./../../Assets/Images/Twitter.svg";
import community from "./../../Assets/Images/community.svg";
import website from "./../../Assets/Images/website.svg";

interface AmbassadorDashboardProps {
  name: string;
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  setShowNoProgram: (value: boolean) => void;
  setTimeline: (value: boolean) => void;
  setLeaderboard: (value: boolean) => void;
  setAmbReward: (value: boolean) => void;
}
const AmbassadorDashboard: React.FC<AmbassadorDashboardProps> = ({
  name,
  loginMetadata,
  loginfunction,
  setShowNoProgram,
  setLeaderboard, setTimeline,
  setAmbReward
}) => {
  const [searchText, setSearchText] = useState("");
  const [first, setFirst] = useState(0);
  const [programDetails, setProgramDetails] = useState(new ProgramDetails());
  const [campaignList, setCampaignList] = useState<CampaignDetails[]>([]);
  const [liveCampaigns, setLiveCampaigns] = useState<CampaignDetails[]>([]);
  const [upcomingCampaigns, setUpcomingCampaigns] = useState<CampaignDetails[]>(
    []
  );
  const [completedCampaigns, setCompletedCampaigns] = useState<
    CampaignDetails[]
  >([]);
  const [showPopover, setShowPopover] = useState(false);
  const [programDetailsList, setProgramDetailsList] = useState<ProgramDetails>(new ProgramDetails);

  useEffect(() => {
    document.title = "Dashboard - Afleet"
    if (loginMetadata.programId == null || loginMetadata.programId == -1) {
      setShowPopover(true);
    }
    if (showPopover == false && loginMetadata.ambassadorProgramId != -1 && loginMetadata.programId && loginMetadata.programId != -1) {
      GetProgramDetails(false);
      GetCampaignslist(true);
      loginfunction(loginMetadata);
      getAmbassadorProgramDetails();
    }
  }, []);
  const GetProgramDetails = (forceRefresh: boolean) => {
    ProgramManagementService.GetProgramDetails(loginMetadata, forceRefresh)
      .then((resp: any) => {
        if (resp != null) {
          setProgramDetails(resp);
          loginMetadata.points = resp.total_points;
          loginfunction(loginMetadata);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getAmbassadorProgramDetails = () => {
    ProgramManagementService.GetAmbassadorProgram(loginMetadata).then((data) => {
      setProgramDetailsList(data);
    });
  }

  const GetCampaignslist = (forceRefresh: boolean) => {
    ProgramManagementService.GetCampaignsList(loginMetadata, forceRefresh)
      .then((resp: any) => {
        if (resp != null && resp.campaignList != 0) {
          var currDate = convertToLocale(new Date().toISOString());
          {
            resp.campaignList.map(
              (campDetails: CampaignDetails, index: number) => {
                if (campDetails.completion_status === CampaignStatus.COMPLETED || currDate > campDetails.end_date) {
                  completedCampaigns.push(campDetails);
                }
                if (
                  currDate < convertToLocale(campDetails.end_date) &&
                  currDate >= convertToLocale(campDetails.start_date)
                ) {
                  liveCampaigns.push(campDetails);
                }
                if (currDate < convertToLocale(campDetails.start_date)) {
                  upcomingCampaigns.push(campDetails);
                }
              }
            );
          }
          setCampaignList(campaignList);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <IonPage>
      <IonCard class="backgroundAdjustment" style={{ background: "#E5E5E5" }}>
        <IonContent scrollX={true} scrollY={true}>
          <TopComponent
            loginMetadata={loginMetadata}
            loginfunction={loginfunction}
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <ProgramSelection
            loginMetadata={loginMetadata}
            GetProgramDetails={GetProgramDetails}
            showPopover={showPopover}
            GetCampaignslist={GetCampaignslist}
            setShowPopover={setShowPopover}
            loginfunction={loginfunction}
            setShowNoProgram={setShowNoProgram}
            setTimeline={setTimeline}
            setLeaderboard={setLeaderboard}
            setAmbReward={setAmbReward}
            getAmbassadorProgramDetails={getAmbassadorProgramDetails}
          />
          <IonGrid class="scrolling">
            <IonCardContent class="marginForContent">
              <IonRow class="dashboardName">Dashboard</IonRow>
              <IonRow>
                <div className="ambDashboradCard">
                  <IonGrid>
                    <IonRow>
                      <IonCol class="ambCardImg">
                        <img src={isStringEmpty(programDetails.ambassador_program_img) ? isStringEmpty(loginMetadata.ambassador_img) ? temp : loginMetadata.ambassador_img : programDetails.ambassador_program_img} className="ambImage1" />
                      </IonCol>
                      <IonCol class="ambCardRight">
                        <IonRow class="ambName">{programDetails.title}</IonRow>
                        <IonRow style={{ marginTop: "10px" }}>
                          <span className="ambRPspan">
                            Current RP {programDetails.total_points}
                          </span>
                          <span className="ambRPspan">
                            Lifetime RP {programDetails.lifetime_points}
                          </span>
                        </IonRow>
                        <IonRow style={{ marginTop: "10px" }}>
                          <IonCol class="progImg">
                            <img src={
                              isStringEmpty(loginMetadata.programImg) ? temp : loginMetadata.programImg
                            } className="progImg1" />
                          </IonCol>
                          <IonCol>
                            <IonRow style={{ fontSize: "0.9rem" }}>
                              {loginMetadata.programName}
                            </IonRow>
                            <IonRow style={{ fontSize: "0.8rem", color: "#8F8F8F" }}>
                              {loginMetadata.programEmail}
                            </IonRow>

                          </IonCol>

                        </IonRow>
                        <IonRow style={{ marginTop: "10px" }}>
                          <span className="ambCardTag">
                            <BsTelephone />&nbsp; Call
                          </span>
                          <span className="ambCardTag">
                            <MdMailOutline />&nbsp; Mail
                          </span>
                          <span className="ambCardTag">
                            <FaRegBell />&nbsp; Notification
                          </span>
                        </IonRow>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </div>
                {/* <IonCard class="ambassadorDetailsCard">
                <IonGrid>
                  <IonCol class="columnAlign">
                    <IonRow class="columnAlign">
                      <IonCol>
                        <IonAvatar class="ambImage">
                          <img src={isStringEmpty(programDetails.ambassador_program_img) ? isStringEmpty(loginMetadata.ambassador_img) ? temp : loginMetadata.ambassador_img : programDetails.ambassador_program_img} className="ambImage1" />
                        </IonAvatar>
                      </IonCol>
                    </IonRow>
                    <IonRow class="columnAlign">
                      <IonLabel class="ambName">
                        {programDetails.title}
                      </IonLabel>
                    </IonRow>
                    <IonRow class="columnAlign">
                      <IonLabel class="pointLabel">
                        {"Current RP : " + programDetails.total_points}
                      </IonLabel>
                    </IonRow>
                    <IonRow class="columnAlign">
                      <IonLabel class="pointLabel">
                        {"Lifetime RP : " + programDetails.lifetime_points}
                      </IonLabel>
                    </IonRow>
                    <IonRow>
                      <IonCol></IonCol>
                      <IonCol>
                        <IonAvatar class="iconAvatar">
                          <MdMailOutline className="iconStyle" />
                        </IonAvatar>
                      </IonCol>
                      <IonCol>
                        <IonAvatar class="iconAvatar">
                          <FaRegBell className="iconStyle" />
                        </IonAvatar>
                      </IonCol>
                      <IonCol>
                        <IonAvatar class="iconAvatar">
                          <BsTelephone className="iconStyle" />
                        </IonAvatar>
                      </IonCol>
                      <IonCol></IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        <IonAvatar class="progImg">
                          <img
                            src={
                              isStringEmpty(loginMetadata.programImg) ? temp : loginMetadata.programImg
                            }
                            className="progImg1"
                          />
                        </IonAvatar>
                      </IonCol>
                      <IonCol class="programColumn">
                        <IonRow>
                          <IonLabel class="programTitle">
                            {loginMetadata.programName}
                          </IonLabel>
                        </IonRow>
                        <IonRow>
                          <IonLabel>{loginMetadata.programEmail}</IonLabel>
                        </IonRow>
                      </IonCol>
                    </IonRow>
                  </IonCol>
                </IonGrid>
              </IonCard> */}
              </IonRow>
              <IonRow class="dashboardName">Program Details</IonRow>
              <IonRow>
                <div className="ambDashboradCard1">
                  <IonGrid style={{ padding: "15px" }}>
                    <IonRow>
                      <IonCol>
                        <IonRow class="ambProgTitle">
                          {programDetailsList.title}
                        </IonRow>
                        <IonRow style={{ fontSize: "1rem" }}>
                          {programDetailsList.description}
                        </IonRow>
                        <IonRow>
                          <IonCol class="ambProgLink"><img src={instagram} />&nbsp;&nbsp; {isStringEmpty(programDetailsList.instagram_link) ? "N/A" : <a href={programDetailsList.instagram_link} style={{ color: "black" }} target="_blank">{programDetailsList.instagram_link}</a>}</IonCol>
                          <IonCol class="ambProgLink"><img src={community} />&nbsp;&nbsp;{isStringEmpty(programDetailsList.community_channel) ? "N/A" : <a href={programDetailsList.community_channel} style={{ color: "black" }} target="_blank">{programDetailsList.community_channel}</a>}</IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol class="ambProgLink"><img src={twitter} />&nbsp;&nbsp; {isStringEmpty(programDetailsList.twitter_link) ? "N/A" : <a href={programDetailsList.twitter_link} style={{ color: "black" }} target="_blank">{programDetailsList.twitter_link}</a>}</IonCol>
                          <IonCol class="ambProgLink"><img src={website} />&nbsp;&nbsp; {isStringEmpty(programDetailsList.website_link) ? "N/A" : <a href={programDetailsList.website_link} style={{ color: "black" }} target="_blank">{programDetailsList.website_link}</a>}</IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol class="ambProgLink"><img src={linkedin} />&nbsp;&nbsp; {isStringEmpty(programDetailsList.linkedin_link) ? "N/A" : <a href={programDetailsList.linkedin_link} style={{ color: "black" }} target="_blank">{programDetailsList.linkedin_link}</a>}</IonCol>
                          <IonCol class="ambProgLink1"></IonCol>
                        </IonRow>
                      </IonCol>
                      <IonCol style={{ maxWidth: "240px", minWidth: "200px", paddingTop: "20px" }}>
                        <IonRow style={{ justifyContent: "center" }}>
                          <img src={isStringEmpty(programDetailsList.program_img) ? temp : programDetailsList.program_img} alt="" className="ambProgramImg" />
                        </IonRow>
                        <IonRow style={{ color: "#2E77AE", fontSize: "1rem", justifyContent: "center", marginTop: "5px" }}>{programDetailsList.email}</IonRow>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </div>
              </IonRow>
              <IonRow class="dashboardName">Campaigns</IonRow>
              <IonSegment mode="md" value={first.toString()} class="ClientCampaignTab1">
                <IonSegmentButton
                  value="0"
                  onClick={() => {
                    setFirst(0);
                  }}
                  defaultChecked={first.toString() == "0"}
                  class="ClientSegmentButton"
                >
                  <IonLabel>Live Campaigns</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton
                  value="1"
                  onClick={() => {
                    setFirst(1);
                  }}
                  class="ClientSegmentButton"
                >
                  <IonLabel>Upcoming Campaigns</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton
                  value="2"
                  onClick={() => {
                    setFirst(2);
                  }}
                  class="ClientSegmentButton"
                >
                  <IonLabel>Completed Campaigns</IonLabel>
                </IonSegmentButton>
              </IonSegment>
              <IonRow>
                {first === 0 && liveCampaigns ? (
                  <AmbassadorCampaignTab
                    loginMetadata={loginMetadata}
                    campaignList={liveCampaigns}
                    searchText={searchText}
                    status="live"
                    GetCampaignslist={GetCampaignslist}
                  />
                ) : first === 1 ? (
                  <AmbassadorCampaignTab
                    loginMetadata={loginMetadata}
                    campaignList={upcomingCampaigns}
                    searchText={searchText}
                    status="upcoming"
                    GetCampaignslist={GetCampaignslist}
                  />
                ) : (
                  <AmbassadorCampaignTab
                    loginMetadata={loginMetadata}
                    campaignList={completedCampaigns}
                    searchText={searchText}
                    status="completed"
                    GetCampaignslist={GetCampaignslist}
                  />
                )}
              </IonRow>
            </IonCardContent>
          </IonGrid>
        </IonContent>
      </IonCard>
    </IonPage>
  );
};

export default AmbassadorDashboard;
