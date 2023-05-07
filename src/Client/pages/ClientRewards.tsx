import "../Styles/ClientRewards.css";
import temp from "../../Assets/Images/campaignDeafult.png";
import dots from "../../Assets/Images/dots.svg";
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonItem,
  IonPage,
  IonPopover,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonToggle,
} from "@ionic/react";
import { useEffect, useState } from "react";
import {
  IonLabel,
} from "@ionic/react";
import { LoginMetadata } from "../Models/LoginMetadata";
import TopComponent from "../Components/TopComponent";
import RewardPopover from "../Components/Popovers/RewardPopover";
import ClientReward from "../Models/ClientRewards";
import ClientRewardsService from "../Services/ClientRewardsService";
import ClientRewardsResponse from "../Models/ClientRewardsResponse";
import Loading from "../Components/Loading";
import { isStringEmpty, lowerCase } from "../../Util/BasicUtilityFunctions";
import ClientRewardClaimsResponse from "../Models/ClientRewardClaimsResponse";
import ClientRewardClaimsModel from "../Models/ClientRewardClaimsModel";
import { BiCopy } from "react-icons/bi";
import { BsArchive } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import { SelectiveExcelWriterForRewards } from "../../Util/ExcelWriter";
import { RewardsDetailsSchema } from "../Constants/ExcelFileSchema";
import RewardCard from "../Components/RewardCard";
import reactSelect from "react-select";
import ClientReportsService from "../Services/ClientReportsService";
// import {ClientRewards} from "../Components/Menu";
interface ClientRewardsProps {
  name: string;
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}
const ClientRewards: React.FC<ClientRewardsProps> = ({
  name,
  loginMetadata,
  loginfunction,
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const [filter, setFilter] = useState<string>("active");
  const [reward, setReward] = useState<ClientReward>(new ClientReward());
  const [tabSelection, setTabSelection] = useState<string>("all");
  const [rewardsDetailsList, setRewardsDetailsList] =
    useState<ClientRewardsResponse>(new ClientRewardsResponse());
  const [claimRewardsDetailsList, setClaimRewardsDetailsList] =
    useState<ClientRewardClaimsResponse>(new ClientRewardClaimsResponse());
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [newRewardMode, setNewRewardMode] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showSelectionPopover, setShowSeectionPopover] = useState(false);
  const [rewardEnable, setRewardEnable] = useState(true);

  useEffect(() => {
    document.title = "User Rewards - Afleet"
    getRewardsData(false);
    getRewardToggle();
    getClaimeRewardsData(false);
  }, []);

  const getRewardToggle = () => {
    setIsLoading(true);
    ClientReportsService.GetReportProgram(loginMetadata).then((resp) => {
      setRewardEnable(resp.amb_reward);
      setIsLoading(false);
    }).catch((e) => {
      console.log(e);
      setIsLoading(false);
    });
  }
  const getRewardsData = (forceRefresh: boolean) => {
    setIsLoading(true);
    ClientRewardsService.GetRewardsList(loginMetadata, forceRefresh)
      .then((resp) => {
        setRewardsDetailsList(resp);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };
  const getClaimeRewardsData = (forceRefresh: boolean) => {
    setIsLoading(true);
    ClientRewardsService.GetClaimRewardsList(loginMetadata, forceRefresh)
      .then((resp) => {
        setClaimRewardsDetailsList(resp);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };
  const createNewReward = () => {
    setIsLoading(true);
    console.log(reward);
    ClientRewardsService.CreateReward(reward, loginMetadata)
      .then((resp) => {
        if (resp.errors == undefined || resp.errors == null) {
          setShowPopover(false);
          rewardsDetailsList.rewardList.push(reward);
          setAlertMessage(resp.msg);
          setIsLoading(false);
          setNewRewardMode(false);
          setReward(new ClientReward());
          setShowAlert(true);
          getRewardsData(true);
        } else {
          setShowPopover(false);
          setAlertMessage(resp.errors[0].message);
          setReward(new ClientReward());
          setNewRewardMode(false);
          setIsLoading(false);
          setShowAlert(true);
        }
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };
  const UpdateReward = () => {
    console.log(reward)
    setIsLoading(true);
    ClientRewardsService.UpdateReward(reward, loginMetadata)
      .then((resp) => {
        if (resp.errors == undefined || resp.errors == null) {
          setShowPopover(false);
          rewardsDetailsList.rewardList[updateIndex] = reward;
          setAlertMessage("Reward Updated Successfully");
          setIsLoading(false);
          setNewRewardMode(false);
          setUpdateIndex(-1);
          setReward(new ClientReward());
          setShowAlert(true);
          getRewardsData(true);
        } else {
          setShowPopover(false);
          setAlertMessage(resp.errors[0].message);
          setReward(new ClientReward());
          setNewRewardMode(false);
          setUpdateIndex(-1);
          setIsLoading(false);
          setShowAlert(true);
        }
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  const DeleteReward = () => {
    setIsLoading(true);
    ClientRewardsService.DeleteReward(loginMetadata, updateIndex)
      .then((resp: any) => {
        if (resp.status == "ok") {
          setAlertMessage("Reward Deleted Successfully");
          setReward(new ClientReward());
          setIsLoading(false);
          setShowAlert(true);
          getRewardsData(true);
        } else {
          setAlertMessage(resp.msg);
          setReward(new ClientReward());
          setIsLoading(false);
          setShowAlert(true);
        }
      })
      .catch((e) => {
        setAlertMessage(e);
        setReward(new ClientReward());
        setIsLoading(false);
        setShowAlert(true);
      });
  };
  const AcceptOrRejectReward = (id: number, status: number) => {
    setIsLoading(true);
    ClientRewardsService.AcceptOrRejectReward(id, status, loginMetadata)
      .then((resp) => {
        if (resp.errors == undefined || resp.errors == null && resp.status == true) {
          setAlertMessage(resp.msg);
          setIsLoading(false);
          setShowAlert(true);
          getClaimeRewardsData(true);
        } else {
          setAlertMessage(resp.errors[0].message);
          setIsLoading(false);
          setShowAlert(true);
        }
      })
      .catch((e) => {
        setIsLoading(false);
      });
  }
  const setRewardEnableDisable = (status: boolean) => {
    setIsLoading(true);
    console.log(status)
    ClientRewardsService.setRewardEnable(status, loginMetadata).then((resp) => {
      setRewardEnable(status);
      setIsLoading(false);
    }).catch((e) => {
      console.log(e);
      setIsLoading(false);
    });
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
            message="Are you sure You want to delete this Reward"
            onDidDismiss={() => {
              setShowDeleteAlert(false);
              setUpdateIndex(-1);
            }}
            buttons={[
              { text: "Cancel", role: "cancel" },
              {
                text: "Yes",
                handler: () => {
                  DeleteReward();
                },
              },
            ]}
          />
          <RewardPopover
            showPopover={showPopover}
            setShowPopover={setShowPopover}
            clientReward={reward}
            setClientRewards={setReward}
            isLoading={isLoading}
            newRewardMode={newRewardMode}
            createNewReward={createNewReward}
            UpdateReward={UpdateReward}
            loginMetadata={loginMetadata}
          />
          <IonPopover
            mode="ios"
            class="selectionPopover"
            isOpen={showSelectionPopover}
            trigger={"selectionDot" + updateIndex.toString()}
            onDidDismiss={() => {
              setReward(new ClientReward());
              setShowSeectionPopover(false);
            }}
            arrow={false}
            // side="top"
            alignment="end"
          >
            <IonItem style={{ height: 40 }} lines="full" onClick={() => {
              reward.status = (filter != 'active');
              UpdateReward();
              setShowSeectionPopover(false);
            }}  >
              <BsArchive />
              &nbsp;&nbsp;{filter == 'active' ? "Archive" : "Unarchive"}
            </IonItem>
            <IonRow class="line" />
            <IonItem
              style={{ height: 40 }}
              onClick={() => {
                createNewReward()
                setShowSeectionPopover(false);
              }}
            >
              <BiCopy />
              &nbsp;&nbsp;Duplicate
            </IonItem>
          </IonPopover>
          <TopComponent
            loginMetadata={loginMetadata}
            loginfunction={loginfunction}
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <IonCardContent class="marginForContent">
            {isLoading ? (
              <Loading />
            ) : (
              <IonGrid class="scrolling" style={{ minWidth: "700px" }}>
                <IonRow class="ClientRewardsHeader">
                  <IonCol class="ClientRewardsSubHead" size="6">
                    Rewards
                  </IonCol>
                  <IonCol size="1" class="filterStyle ion-text-end">
                    Filter
                  </IonCol>
                  <IonCol size="2" class="ion-text-start">
                    <IonSelect
                      class={
                        "ion-text-center " +
                        (filter == ""
                          ? "SelectionStyleRewards"
                          : "SelectionStyleRewardsSelected")
                      }
                      interface="popover"
                      value={filter}
                      placeholder="-select-"
                      onIonChange={(e) => setFilter(e.detail.value)}
                    >
                      {tabSelection == "all" ? (
                        <IonSelectOption value="active">Active</IonSelectOption>
                      ) : null}
                      {tabSelection == "all" ? (
                        <IonSelectOption value="archieve">
                          Archived
                        </IonSelectOption>
                      ) : null}
                      {tabSelection == "pending" ? (
                        <IonSelectOption value="pending">Pending</IonSelectOption>
                      ) : null}
                      {tabSelection == "pending" ? (
                        <IonSelectOption value="claimed">
                          Distributed
                        </IonSelectOption>
                      ) : null}
                      {tabSelection == "pending" ? (
                        <IonSelectOption value="rejected">
                          Rejected
                        </IonSelectOption>
                      ) : null}
                    </IonSelect>
                  </IonCol>
                  {tabSelection == "pending" ? <IonCol class="ion-text-end">
                    <IonButton
                      class="ClientRewardsButton"
                      fill="outline"
                      onClick={async () => {
                        console.log("hy", claimRewardsDetailsList.rewardList)
                        await SelectiveExcelWriterForRewards(claimRewardsDetailsList.rewardList, RewardsDetailsSchema, filter == "pending" ? 0 : filter == "claimed" ? 1 : 2);
                      }}
                    >
                      Download
                    </IonButton>
                  </IonCol> : null}
                  <IonCol class="ion-text-end">
                    <IonButton
                      class="ClientRewardsButton"
                      fill="outline"
                      onClick={() => {
                        setShowPopover(true);
                        setNewRewardMode(true);
                      }}
                    >
                      + Create Rewards
                    </IonButton>
                  </IonCol>
                </IonRow>
                <IonRow class="rewardToggle">
                  Turn {rewardEnable ? "off" : "on"} rewards for ambassadors <IonToggle
                    // class="toggleChecked"
                    checked={rewardEnable}
                    onIonChange={(e) => {
                      setRewardEnableDisable(e.detail.checked);
                    }}
                  ></IonToggle>
                </IonRow>
                {/* <IonRow class="ion-text-end">
                <IonCol class="ion-text-end">
                <IonButton
                    class="ClientRewardsButton"
                    fill="outline"
                    onClick={() => {
                      setShowPopover(true);
                      setNewRewardMode(true);
                    }}
                  >
                    Download
                  </IonButton>
                  </IonCol>
                </IonRow> */}
                <IonSegment mode="md"
                  value={tabSelection}
                  onIonChange={(e) =>
                    console.log(`${e.detail.value} segment selected`)
                  }
                  class="ClientRewardsTab"
                >
                  <IonSegmentButton
                    value="all"
                    onClick={() => {
                      setTabSelection("all");
                      setFilter("active");
                    }}
                    class="ClientSegmentButton"
                  >
                    <IonLabel>All Rewards</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton
                    value="pending"
                    onClick={() => {
                      setTabSelection("pending");
                      setFilter("pending");
                    }}
                    class="ClientSegmentButton"
                  >
                    <IonLabel>Reward Claims</IonLabel>
                  </IonSegmentButton>
                </IonSegment>
                {tabSelection == "all" ? (
                  <IonRow>
                    {rewardsDetailsList.rewardList.map(
                      (rewardDetail: ClientReward, index: number) => {
                        if (
                          lowerCase(rewardDetail.title).includes(
                            lowerCase(searchText)
                          ) &&
                          ((filter === "active" && rewardDetail.status == true) ||
                            (filter == "archieve" &&
                              rewardDetail.status == false))
                        ) {
                          return (
                            <RewardCard
                              loginMetadata={loginMetadata}
                              rewardDetails={rewardDetail}
                              setShowPopover={setShowPopover}
                              setReward={setReward}
                              setUpdateIndex={setUpdateIndex}
                              index={index}
                              filter={filter}
                              setShowDeleteAlert={setShowDeleteAlert}
                              reward={reward}
                              updateReward={UpdateReward}
                              createNewReward={createNewReward}
                            />
                            // <IonGrid key={index}>
                            //   <IonRow class="ClientRewardsRow">
                            //     <IonCol size="1">

                            //     </IonCol>
                            //     <IonCol
                            //       class="ClientRewardsDetail ion-text-start"
                            //     >
                            //       <img
                            //         src={
                            //           isStringEmpty(rewardDetail.reward_img)
                            //             ? temp
                            //             : rewardDetail.reward_img
                            //         }
                            //         className="ClientRewardsImage"
                            //       />
                            //       {" "}
                            //       {rewardDetail.title}
                            //     </IonCol>
                            //     <IonCol
                            //       class="ClientRewardsDetail ion-text-center"
                            //     >
                            //       {rewardDetail.points} Points
                            //     </IonCol>
                            //     <IonCol class="ClientRewardsDetail ion-text-start">
                            //       {rewardDetail.description}
                            //     </IonCol>
                            //     <IonCol
                            //       class="ClientRewardsDetail ion-text-end"
                            //     >
                            //       {" "}
                            //       <IonRow>
                            //         <AiOutlineEdit
                            //           color="#B2B2B2"
                            //           size={20}
                            //           className="ClientRewardsEdit"
                            //           onClick={() => {
                            //             setUpdateIndex(index);
                            //             setReward(
                            //               Object.assign({}, rewardDetail)
                            //             );
                            //             setShowPopover(true);
                            //           }}
                            //         />{" "}
                            //         <IoTrashOutline size={20} color="#B2B2B2"
                            //           className="ClientRewardsEdit"
                            //           onClick={() => {
                            //             setReward(
                            //               Object.assign({}, rewardDetail)
                            //             );
                            //             setUpdateIndex(rewardDetail.id);
                            //             setShowDeleteAlert(true);
                            //           }}
                            //         />{" "}
                            //         <IonImg
                            //           class="ClientRewardsEdit"
                            //           id={"selectionDot" + index.toString()}
                            //           onClick={() => {
                            //             setReward(Object.assign({}, rewardDetail));
                            //             setUpdateIndex(index);
                            //             setShowSeectionPopover(true);
                            //           }}
                            //           src={dots}
                            //         />
                            //       </IonRow>
                            //     </IonCol>
                            //   </IonRow>
                            //   <IonRow class="line"></IonRow>
                            // </IonGrid>
                          );
                        }
                      }
                    )}
                  </IonRow>
                ) : (
                  <IonGrid>

                    <IonRow class="ClientRewardsTitle">
                      <IonCol size="1"></IonCol>
                      <IonCol
                        class="ClientRewardsContent ion-text-start"
                      >
                        Ambassdor
                      </IonCol>
                      <IonCol
                        class="ClientRewardsContent ion-text-center"
                      >
                        Earned Points
                      </IonCol>
                      <IonCol
                        class="ClientRewardsContent ion-text-center"
                      >
                        Reward Claimed
                      </IonCol>
                      <IonCol class="ClientRewardsContent ion-text-center">
                        Status{" "}
                      </IonCol>
                      {filter === "pending" ? <IonCol
                        class="ClientRewardsContent ion-text-center"
                      >
                        Distributed/Rejected
                      </IonCol> : null}
                    </IonRow>

                    {claimRewardsDetailsList.rewardList.map(
                      (rewardDetail: ClientRewardClaimsModel, index: number) => {
                        if (
                          lowerCase(rewardDetail.name).includes(
                            lowerCase(searchText)
                          ) &&
                          ((filter === "pending" && rewardDetail.status == 0) ||
                            (filter == "claimed" && rewardDetail.status == 1) ||
                            (filter == "rejected" && rewardDetail.status == 2))
                        ) {
                          return (
                            <IonGrid key={index}>
                              <IonRow class="ClientRewardsRow">
                                <IonCol size="1"></IonCol>
                                <IonCol
                                  class="ClientRewardsDetail ion-text-start"
                                >
                                  <img
                                    src={
                                      isStringEmpty(rewardDetail.ambassador_program_img)
                                        ? isStringEmpty(rewardDetail.ambassador_img)
                                          ? temp
                                          : rewardDetail.ambassador_img
                                        : rewardDetail.ambassador_program_img
                                    }
                                    className="ClientRewardsImage"
                                  />
                                  {" "}
                                  {rewardDetail.name}
                                </IonCol>
                                <IonCol
                                  class="ClientRewardsDetail ion-text-center"
                                >
                                  {rewardDetail.points} Points
                                </IonCol>
                                <IonCol
                                  class="ClientRewardsDetail ion-text-center"
                                >
                                  {rewardDetail.title}
                                </IonCol>
                                <IonCol class="ClientRewardsDetail ion-text-center">
                                  {rewardDetail.status == 1 ? (
                                    <IonLabel class={"status moveRight"}>
                                      &nbsp;&nbsp;Accepted&nbsp;&nbsp;
                                    </IonLabel>
                                  ) : rewardDetail.status == 2 ? (
                                    <IonLabel class={"inactiveStatus moveRight"}>
                                      &nbsp;&nbsp;Rejected&nbsp;&nbsp;
                                    </IonLabel>
                                  ) : (
                                    <IonLabel class="status moveRight">
                                      &nbsp;&nbsp;Pending&nbsp;&nbsp;
                                    </IonLabel>
                                  )}
                                </IonCol>
                                {filter == "pending" ? <IonCol
                                  class="ClientRewardsContent ion-text-center"
                                >
                                  <IonSegment mode="md">
                                    <IonButton
                                      class="acceptButton"
                                      disabled={rewardDetail.status != 0}
                                      onClick={() => {
                                        AcceptOrRejectReward(rewardDetail.id, 1);
                                      }}
                                    >
                                      {" "}
                                      Distribute
                                    </IonButton>
                                    <IonLabel>
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </IonLabel>
                                    <IonButton
                                      disabled={rewardDetail.status != 0}
                                      class="rejectButton"
                                      onClick={() => {
                                        AcceptOrRejectReward(rewardDetail.id, 2);
                                      }}
                                    >
                                      Reject
                                    </IonButton>
                                  </IonSegment>
                                </IonCol> : null}
                              </IonRow>
                              <IonRow class="line"></IonRow>
                            </IonGrid>
                          );
                        }
                      }
                    )}
                  </IonGrid>
                )}
              </IonGrid>
            )}
          </IonCardContent>
        </IonContent>
      </IonCard>
    </IonPage>
  );
};

export default ClientRewards;
