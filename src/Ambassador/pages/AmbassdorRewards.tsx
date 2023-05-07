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
  IonSegmentButton,
} from "@ionic/react";
import "../styles/AmbassdorRewards.css";
import temp from "../../Assets/Images/defaultImage.svg";
import React, { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import TopComponent from "../Components/TopComponent";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import AmbassdorRewardsService from "../Services/AmbassdorRewardsService";
import AmbassdorRewardsResponse from "../Models/AmbassdorRewardsResponse";
import AmbaddsorRewardsModel from "../Models/AmbaddsorRewardsModel";
import { isStringEmpty, lowerCase } from "../../Util/BasicUtilityFunctions";
import RewardCard from "../Components/RewardCard";
interface AmbassdorRewardsProps {
  loginMetadata: LoginMetadata;
  loginfunction: (value: LoginMetadata | null) => void;
}
const AmbassdorRewards: React.FC<AmbassdorRewardsProps> = ({
  loginMetadata,
  loginfunction,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<string>("all");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showAll, setShowAll] = useState<boolean>(true);
  const [showRedeemed, setShowRedeemed] = useState<boolean>(false);
  const [showAvailable, setShowAvailable] = useState<boolean>(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [rewardId, setRewardId] = useState(-1);
  const [rewardTitle, setRewardTitle] = useState("");
  const [rewardsList, setRewardsList] = useState<AmbassdorRewardsResponse>(
    new AmbassdorRewardsResponse()
  );
  console.log("Hello");
  useEffect(() => {
    document.title = "Rewards - Afleet"
    getData(false);
  }, []);
  const getData = (forceRefresh: boolean) => {
    AmbassdorRewardsService.GetRewardsList(loginMetadata, forceRefresh).then((resp) => {
      console.log(resp);
      setRewardsList(resp);
      setIsLoading(false);
    });
  }

  const UpdateRewardStatus = () => {
    setIsLoading(true);
    AmbassdorRewardsService.RedeemRewardsList(loginMetadata, rewardId, rewardTitle).then((resp) => {
      setAlertMessage(resp.msg);
      setShowAlert(true);
      getData(true);
      setIsLoading(false);
    }).catch(() => {
      setAlertMessage("Unable to Process request");
      setShowAlert(true);
      setIsLoading(false);
    })
  }
  return (
    <IonPage>
      <IonCard class="backgroundAdjustment" style={{ background: "#E5E5E5" }}>
        <IonContent scrollX={true} scrollY={true}>
          <IonAlert isOpen={showAlert} message={alertMessage} onDidDismiss={() => { setShowAlert(false) }}></IonAlert>
          <TopComponent
            loginMetadata={loginMetadata}
            searchText={searchText}
            setSearchText={setSearchText}
            loginfunction={loginfunction}
          />

          <IonAlert
            isOpen={showUpdateAlert}
            message="Are you sure You want to claim this reward Again?"
            onDidDismiss={() => {
              setShowUpdateAlert(false);
            }
            }
            buttons={[
              { text: "Cancel", role: "cancel" },
              {
                text: "Yes",
                handler: () => {
                  UpdateRewardStatus();
                },
              },
            ]}
          />
          <IonCardContent class="marginForContent">
            {isLoading ? (
              <Loading />
            ) : (
              <IonGrid class="scrolling">
                <IonRow class="dashboardName">Rewards
                </IonRow>
                <IonSegment mode="md"
                  onIonChange={(e) =>
                    console.log(`${e.detail.value} segment selected`)
                  }
                  class="AmbassdorRewardsTab"
                  value={currentPage}
                >
                  <IonSegmentButton
                    value="all"
                    onClick={() => {
                      setCurrentPage("all");
                      setShowAll(true);
                      setShowAvailable(false);
                      setShowRedeemed(false);
                    }}
                    class="AmbassdorSegmentButton"
                    defaultChecked={currentPage == 'all'}
                  >
                    <IonLabel>All Rewards</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton
                    value="earn"
                    onClick={() => {
                      setCurrentPage('earn');
                      setShowAll(false);
                      setShowAvailable(true);
                      setShowRedeemed(false);
                    }}
                    class="AmbassdorSegmentButton"
                  >
                    <IonLabel>Available Rewards</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton
                    value="current"
                    onClick={() => {
                      setCurrentPage('current');
                      setShowAll(false);
                      setShowAvailable(false);
                      setShowRedeemed(true);
                    }}
                    class="AmbassdorSegmentButton"
                  >
                    <IonLabel>Claimed Rewards</IonLabel>
                  </IonSegmentButton>
                </IonSegment>
                <IonRow>
                  {rewardsList.rewardList.length > 0 || rewardsList.rewardList2.length > 0 ?
                    (
                      <>
                        {rewardsList.rewardList.map((reward: AmbaddsorRewardsModel, index: number) => {
                          if (showAll || showAvailable)
                            if (lowerCase(
                              reward.title
                            ).includes(lowerCase(searchText))) {
                              return (
                                <RewardCard
                                  loginMetadata={loginMetadata}
                                  rewardDetails={reward}
                                />
                              )
                            }
                        })}
                        {rewardsList.rewardList2.map((reward: AmbaddsorRewardsModel, index: number) => {
                          if (showAll || (showRedeemed && (reward.status == 1 || reward.status == 0 || reward.status == 2)))
                            return (
                              <RewardCard
                                loginMetadata={loginMetadata}
                                rewardDetails={reward}
                              />
                            )
                        })}
                      </>)
                    : <IonRow style={{ display: "flex", justifyContent: "center", marginTop: "200px", width: "100%", fontSize: "1.3rem" }}>
                      <div>No new rewards available. Please come back later</div>
                    </IonRow>}

                </IonRow>
              </IonGrid>
            )}
          </IonCardContent>
        </IonContent>
      </IonCard>
    </IonPage>
  );
};
export default AmbassdorRewards;
