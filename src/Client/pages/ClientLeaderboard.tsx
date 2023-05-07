import "../Styles/ClientLeaderboard.css";
import star from "../../Assets/Images/stars.png";
import emptyStar from "../../Assets/Images/empty-star-48.png";
import firstRank from "../../Assets/Images/1st-rank.svg"
import secondRank from "../../Assets/Images/2nd-rank.svg"
import thirdRank from "../../Assets/Images/3rd-rank.svg"
import temp from "../../Assets/Images/campaignDeafult.png";

import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonPage,
  IonPopover,
  IonRow,
} from "@ionic/react";

import { useEffect, useState } from "react";

import TopComponent from "../Components/TopComponent";
import { LoginMetadata } from "../Models/LoginMetadata";
import ClientAmbassadorService from "../Services/ClienAmbassadorService";
import { Leaderboard, leaderboardResponse } from "../Models/Leaderboard";
import Loading from "../Components/Loading";
import { isStringEmpty, lowerCase } from "../../Util/BasicUtilityFunctions";
import { chevronForwardOutline } from "ionicons/icons";

interface ClientLeaderboardProps {
  name: string;
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}

const showIndex = (index: number) => {
  if (index === 1) return (<img src={firstRank}></img>);
  if (index === 2) return (<img src={secondRank}></img>);
  if (index === 3) return (<img src={thirdRank}></img>)
  return (index);
}

const showStars = (rating: number) => {
  console.log("inside showstars");
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<img src={i <= rating ? star : emptyStar} key={i} className="star-size"></img>);

  }

  return stars;
};

const ClientLeaderboard: React.FC<ClientLeaderboardProps> = ({
  name,
  loginMetadata,
  loginfunction,
}) => {
  const [leaderBoardList, setLeaderboardList] = useState<leaderboardResponse>(
    new leaderboardResponse()
  );
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    document.title = "User Leaderboard - Afleet"
    setIsLoading(true);
    ClientAmbassadorService.leaderboardAmbassador(loginMetadata)
      .then((res) => {
        setLeaderboardList(res);
        console.log(res)
        // console.log("Leader Board Response : ",leaderBoardList);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  }, []);
  const [showPopover, setShowPopover] = useState(false);
  // const [second,setSecond]=useState(false);
  const [searchText, setSearchText] = useState("");
  if (isLoading) return <Loading />;
  return (
    <IonPage>
      <IonCard class="backgroundAdjustment" style={{ background: "#E5E5E5" }}>
        {/* <IonPopover
        isOpen={showPopover}
        onDidDismiss={() => {
          setShowPopover(false);
        }}
      >
        <IonRow>Create Campaign</IonRow>
      </IonPopover> */}
        <IonContent scrollX={true} scrollY={true}>
          <TopComponent
            loginMetadata={loginMetadata}
            loginfunction={loginfunction}
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <IonCardContent class="marginForContent">
            <IonGrid class="scrolling" style={{ minWidth: "800px" }}>
              <IonRow class="dashboardName">
                Leaderboard
              </IonRow>
              <IonGrid>
                <IonRow class="ClientLeaderboardTitle">
                  <IonCol class="ClientLeaderboardContent ion-text-center">
                    Rank
                  </IonCol>
                  <IonCol class="ClientLeaderboardContent ion-text-start" >
                    Participant Name
                  </IonCol>
                  <IonCol class="ClientLeaderboardContent ion-text-center" >
                    Email
                  </IonCol>
                  <IonCol class="ClientLeaderboardContent ion-text-center">
                    RP
                  </IonCol>
                  <IonCol class="ClientLeaderboardContent ion-text-center">
                    Lifetime RP
                  </IonCol>
                  <IonCol
                    class="ClientLeaderboardContent ion-text-center"
                  >Campaigns Completed</IonCol>
                  <IonCol
                    class="ClientLeaderboardContent ion-text-center"
                  ></IonCol>
                </IonRow>
              </IonGrid>
              {leaderBoardList.leadboardList.map(
                (leaderboardList: Leaderboard, index: number) => {
                  if (lowerCase(
                    leaderboardList.first_name + " " + leaderboardList.last_name
                  ).includes(lowerCase(searchText)) ||
                    lowerCase(leaderboardList.email).includes(
                      lowerCase(searchText)
                    )) {
                    return (

                      <IonGrid key={index}>
                        <IonGrid>
                          <IonRow class="ClientLeaderboardRow">
                            <IonCol
                              class="ClientLeaderboardDetail ion-text-center" id="index"
                            >
                              {showIndex(index + 1)}
                            </IonCol>
                            <IonCol class="ClientLeaderboardDetail ion-text-start ">
                              <img src={isStringEmpty(leaderboardList.image) ? isStringEmpty(leaderboardList.ambassador_img) ? temp : leaderboardList.ambassador_img : leaderboardList.image} className="ClientLeaderboardImage" />
                              {leaderboardList.title}
                            </IonCol>
                            <IonCol class="ClientLeaderboardDetail ion-text-center">
                              {leaderboardList.email}
                            </IonCol>
                            <IonCol class="ClientLeaderboardDetail ion-text-center">
                              <IonRow>
                                <IonCol class="points">
                                  {leaderboardList.total_points ? leaderboardList.total_points : 0}
                                </IonCol>
                              </IonRow>

                            </IonCol>
                            <IonCol class="ClientLeaderboardDetail ion-text-center">
                              <IonRow>
                                <IonCol class="points">
                                  {leaderboardList.lifetime_points ? leaderboardList.lifetime_points : 0}
                                </IonCol>
                              </IonRow>
                            </IonCol>
                            <IonCol class="ClientLeaderboardDetail ion-text-center">
                              {leaderboardList.campaign_completed.length}
                            </IonCol>
                            <IonCol class="ClientLeaderboardDetail ion-text-center">
                              <IonRow >
                                <IonCol size="8">
                                  {showStars(leaderboardList.rating)}

                                </IonCol>
                                <IonCol >
                                  {/* <p className="rating">

                                {"(" + (leaderboardList.rating ? leaderboardList.rating : 0) + "/5)"}
                              </p> */}
                                  {/* <IonIcon
                                  icon={chevronForwardOutline}
                                  size="medium"
                                  class="icon"
                                  onClick={() => {

                                  }}
                                /> */}
                                </IonCol>

                              </IonRow>
                            </IonCol>
                            {/* <IonCol
                      class="ClientLeaderboardDetail ion-text-center"
                      size="3"
                    >
                      Yes
                    </IonCol> */}
                          </IonRow>

                          <IonRow class="line"></IonRow>
                        </IonGrid>

                      </IonGrid>
                    )
                  }
                })}

            </IonGrid>
          </IonCardContent>
        </IonContent>
      </IonCard>

    </IonPage>
  );
};

export default ClientLeaderboard;
