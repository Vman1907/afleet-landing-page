import "../styles/AmbassadorLeaderboard.css";
import temp from "../../Assets/Images/campaignDeafult.png";
import star from "../../Assets/Images/stars.png";
import emptyStar from "../../Assets/Images/empty-star-48.png";

import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonPage,
  IonPopover,
  IonRow,
} from "@ionic/react";

import { useEffect, useState } from "react";

import TopComponent from "../Components/TopComponent";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import AmbassadorService from "../Services/AmbassadorService";
import { Leaderboard, leaderboardResponse } from "../Models/Leaderboard";
import Loading from "../Components/Loading";
import { isStringEmpty, lowerCase } from "../../Util/BasicUtilityFunctions";
import { te } from "date-fns/locale";
interface AmbassadorLeaderboardProps {
  name: string;
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}

const AmbassadorLeaderboard: React.FC<AmbassadorLeaderboardProps> = ({
  name,
  loginMetadata,
  loginfunction,
}) => {
  const [leaderBoardList, setLeaderboardList] = useState<leaderboardResponse>(
    new leaderboardResponse()
  );
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    document.title = "Leaderboard - Afleet"
    setIsLoading(true);
    AmbassadorService.leaderboardAmbassador(loginMetadata)
      .then((res) => {
        setLeaderboardList(res);
        setIsLoading(false);
        console.log(res);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  }, []);
  const showStars = (rating: number) => {
    console.log("inside showstars");
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<img src={i <= rating ? star : emptyStar} key={i} className="star-size"></img>);

    }

    return stars;
  };
  // const [second,setSecond]=useState(false);
  const [searchText, setSearchText] = useState("");
  if (isLoading) return <Loading />;
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
          <IonCardContent class="marginForContent">
            <IonGrid class="scrolling">
              <IonRow class="dashboardName">
                Leaderboard
              </IonRow>
              <IonGrid>
                <IonRow class="AmbassadorLeaderboardTitle">
                  <IonCol
                    class="AmbassadorLeaderboardContent ion-text-center"
                  >
                    Rank
                  </IonCol>
                  <IonCol class="AmbassadorLeaderboardContent ion-text-center">
                    Participant Name
                  </IonCol>
                  {/* <IonCol class="AmbassadorLeaderboardContent ion-text-center">
                    Email
                  </IonCol> */}
                  <IonCol class="AmbassadorLeaderboardContent ion-text-center">
                    RP
                  </IonCol>
                  <IonCol class="AmbassadorLeaderboardContent ion-text-center">
                    Lifetime RP
                  </IonCol>
                  <IonCol
                    class="AmbassadorLeaderboardContent ion-text-center"
                  >Campaigns completed</IonCol>
                  <IonCol
                    class="AmbassadorLeaderboardContent ion-text-center"
                  ></IonCol>
                </IonRow>
              </IonGrid>
              {leaderBoardList
                ? leaderBoardList.leadboardList.map(
                  (leaderboardList: Leaderboard, index: number) => {
                    if (lowerCase(
                      leaderboardList.first_name + " " + leaderboardList.last_name
                    ).includes(lowerCase(searchText))) {
                      return (
                        <IonGrid key={index}>
                          <IonGrid>
                            <IonRow class="AmbassadorLeaderboardRow">
                              <IonCol
                                class="AmbassadorLeaderboardDetail ion-text-center"
                              >
                                {index + 1}
                              </IonCol>
                              <IonCol class="AmbassadorLeaderboardDetail ion-text-center">
                                <IonRow>
                                  <img
                                    src={isStringEmpty(leaderboardList.image) ? isStringEmpty(leaderboardList.ambassador_img) ? temp : leaderboardList.ambassador_img : leaderboardList.image}
                                    className="AmbassadorLeaderboardImage"
                                  />
                                  {leaderboardList.title}
                                </IonRow>
                              </IonCol>
                              {/* <IonCol class="AmbassadorLeaderboardDetail ion-text-center">
                                {leaderboardList.email}
                              </IonCol> */}
                              <IonCol class="AmbassadorLeaderboardDetail ion-text-center">
                                {leaderboardList.total_points ? leaderboardList.total_points : 0}
                              </IonCol>
                              <IonCol class="AmbassadorLeaderboardDetail ion-text-center">
                                {leaderboardList.lifetime_points ? leaderboardList.lifetime_points : 0}
                              </IonCol>
                              <IonCol class="AmbassadorLeaderboardDetail ion-text-center">
                                {leaderboardList.campaign_completed.length}
                              </IonCol>
                              <IonCol
                                class="AmbassadorLeaderboardDetail ion-text-center"

                              >
                                {showStars(leaderboardList.rating)}
                              </IonCol>
                            </IonRow>

                            <IonRow class="line"></IonRow>
                          </IonGrid>
                        </IonGrid>
                      );
                    }
                  }
                )
                : ""}
            </IonGrid>
          </IonCardContent>
        </IonContent>
      </IonCard>
    </IonPage>
  );
};

export default AmbassadorLeaderboard;
