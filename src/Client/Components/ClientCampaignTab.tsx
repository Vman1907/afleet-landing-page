import "../Styles/ClientCampaign.css";

import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPopover,
  IonRow,
  IonSegment,
} from "@ionic/react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { useEffect, useState } from "react";
import { close } from "ionicons/icons";
import { GetClient } from "../Models/GetClient";
import { GetClientResponse } from "../Models/GetClientResponse";
import createClientService from "../Services/createClientService";
import { LoginMetadata } from "../Models/LoginMetadata";
import { menuController } from "@ionic/core";
import Loading from "./Loading";
import {
  BsArchive,
  BsChatLeft,
  BsClipboardCheck,
  BsInfoCircle,
  BsInstagram,
  BsPeople,
  BsTwitter,
} from "react-icons/bs";
import { CampaignTaskResponse } from "../Models/CampaignTask";
import {
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineLeft,
  AiOutlineLike,
  AiOutlineMore,
} from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import {
  convertToLocale,
  isStringEmpty,
  lowerCase,
} from "../../Util/BasicUtilityFunctions";
import InfoPopover from "./Popovers/InfoPopover";
import TaskPopover from "./Popovers/TaskPopover";
import { socialList } from "../Models/socialList";
import imgs from "./../../Assets/Images/photoFrame.png";
import { BiLink, BiShare } from "react-icons/bi";
import Calendar from "react-calendar";
import { Browser } from "@capacitor/browser";
import defaultImage from "../../Assets/Images/campaignDeafult.png";
import {
  SocialCampaignPlatform,
  SocialCampaignTaskType,
} from "../Constants/CampaignStatusConstant";
import { APICallerPost } from "../Services/BaseService";
import ClientAmbassadorService from "../Services/ClienAmbassadorService";
import { TaskStatus } from "../../Ambassador/Constants/TaskStatusEnums";
import { FaShare } from "react-icons/fa";
import { MdAreaChart } from "react-icons/md";
import CampaignReportCampaign from "../Models/CampaignReportCampaign";
interface ClientCampaignTabProps {
  loginMetadata: LoginMetadata;
  searchText: string;
  CampaignList: GetClientResponse;
  update: number;
  setUpdate: (value: number) => void;
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
  newcampaign: boolean;
  setNewCampaign: (value: boolean) => void;
  option: number;
  GetAllPackage: (option: number) => void;
  GetCampaignByID: (
    campaignID: number,
    amb_prog_id: number,
    status: string
  ) => void;
  setCheckEdit: (value: boolean) => void;
  archeived: boolean;
  current: boolean;
  topCamp: CampaignReportCampaign[];
  getCampData: (campaignType: number) => void;
}

const ClientCampaignTab: React.FC<ClientCampaignTabProps> = ({
  loginMetadata,
  searchText,
  GetAllPackage,
  CampaignList,
  update,
  setUpdate,
  setIsLoading,
  newcampaign,
  setNewCampaign,
  isLoading,
  option,
  GetCampaignByID,
  setCheckEdit,
  archeived,
  current,
  topCamp,
  getCampData
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const [showPopover2, setShowPopover2] = useState(false);
  const [isLoading2, setIsLoading2] = useState(true);
  const [toDelete, setDelete] = useState(-1);
  const [toOpen, setOpen] = useState(-1);
  const [toFind, setToFind] = useState(-1);
  const [campaignStatus, setCampaignStatus] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showSelectionPopover, setShowSeectionPopover] = useState(false);
  const [showSelectionPopover2, setShowSeectionPopover2] = useState(false);
  const [tempDetail, setTemp] = useState(new GetClient());
  const [checkPopOver, setCheckPopover] = useState(false);
  const [clientDetail, setClientDetails] = useState(new GetClient());
  const [pos, setPos] = useState(0);
  const [date, setDate] = useState(new Date());
  const [range_end, setRangeEnd] = useState(new Date());
  const [range_start, setRangeStart] = useState(
    new Date(new Date().setDate(range_end.getDate() - 90))
  );
  const [TaskList, setTaskList] = useState<CampaignTaskResponse>(
    new CampaignTaskResponse()
  );
  const [previousOpenIndex, setPreviousOpenIndex] = useState<number>(-1);
  const [campaignLoading, setCampaignLoading] = useState<boolean>(false);
  const [openCampign, setOpenCampaign] = useState<boolean[]>([]);
  const [openViewAll, setOpenViewAll] = useState<boolean[]>([]);
  const [openGuidelines, setOpenGuidelines] = useState<boolean[]>([]);
  const [infoPop, setInfoPop] = useState(false);
  const [taskPop, setTaskPop] = useState(false);
  const [taskDetail, setTaskDetail] = useState<socialList>(new socialList());
  const [platform, setPlatform] = useState<SocialCampaignPlatform>(SocialCampaignPlatform.Instagram);
  const [task_completion_link, setTaskCompletionLink] = useState<String>("");
  const [showPostPopover, setShowPostPopover] = useState<boolean>(false);
  const [checkReject, setCheckReject] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>();
  const [selectedClient, setSelectedClient] = useState<any>();
  const [rejectedReason, setRejectedReason] = useState<String>("");

  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const openMenu = async () => {
    await menuController.open();
  };
  const compreDate = (a: Date, b: Date) => {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  };
  const GetTaskDetail = (id: number, amb_prog_id: number) => {
    setIsLoading2(true);
    createClientService
      .GetTaskList(loginMetadata, id, amb_prog_id, option)
      .then(async (resp) => {
        setTaskList(resp);
        setIsLoading2(false);
      })
      .catch((e) => {
        setIsLoading2(false);
      });
  };
  const updateAmbassadorStatus = async (
    ambassador_program_id: Number,
    ambassador_id: Number,
    campaign_id: Number,
    amb_task_id: Number,
    completion_status: Number,
    rejection_reason: String
  ) => {
    setIsLoading(true);
    await ClientAmbassadorService.UpdateCampaignTaskStatusUpdated(
      loginMetadata,
      completion_status,
      ambassador_program_id,
      ambassador_id,
      campaign_id,
      amb_task_id,
      rejection_reason
    )
      .then(() => {
        GetAllPackage(option);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };
  const reverse = (str: string) => {
    const date = str;

    const [year, month, day] = date.split("-");

    const result = [day, month, year].join("-");

    return result;
  };
  if (checkPopOver && tempDetail.ambassador_enrolled.length != 0) {
    setCheckPopover(false);
    setShowSeectionPopover2(true);
  }
  useEffect(() => {
    setOpenGuidelines([]);
    setOpenCampaign([]);
    setOpenViewAll([]);
    GetAllPackage(option);
    getCampData(option);
  }, [option]);
  return (
    <IonGrid style={{ padding: "0px" }}>
      <IonRow>
        <IonCol style={{ padding: "0px" }}>
          {/* <ViewCampaign
        pos={pos}
        campaign_status={campaignStatus}
        setCampaignStatus={setCampaignStatus}
        showPopover={showPopover}
        setShowPopover={setShowPopover}
        TaskList={TaskList}
        setIsLoading2={setIsLoading2}
        isLoading2={isLoading2}
        clientDetail={clientDetail}
        loginMetadata={loginMetadata}
        GetAllPackage={GetAllPackage}
        option={option}
      /> */}

          {/* <InfoPopover
        loginMetadata={loginMetadata}
        infoPop={infoPop}
        setInfoPop={setInfoPop}
        taskPop={taskPop}
        setTaskPop={setTaskPop}
        clientDetail={clientDetail}
        setTaskDetails={setTaskDetail}
      /> */}
          {/* <TaskPopover
        taskPop={taskPop}
        setTaskPop={setTaskPop}
        task={taskDetail}
      /> */}
      <IonPopover
        isOpen={checkReject}
        backdropDismiss={true}
        onDidDismiss={() => {
          setCheckReject(false);
        }}
        class="finalPop3 "
      >
        <IonRow class="ClientCampaignPopoverCloseButton">
          <IonIcon
            md={close}
            class="iconSize"
            size="large"
            onClick={() => {
              setCheckReject(false);
            }}
          ></IonIcon>
        </IonRow>
        <form onSubmit={(e) => {
          updateAmbassadorStatus(
            selectedTask
              .ambassador_program_id,
              selectedTask.ambassador_id,
            selectedClient,
            selectedTask
              .ambassador_custom_campaign_task_id,
            3,
            rejectedReason
          );
          // setRejectedReason("")
          setCheckReject(false);
          e.preventDefault();
        }}>
          <IonSegment mode="md" class="finalText2">
            Are you sure? You want to reject the
          </IonSegment>
          <IonSegment mode="md" class="finalText">task for ambassador?</IonSegment>

          <IonRow>
            <IonCol class="rejectCol" size="4">Reason for rejection&nbsp;:</IonCol>
            <IonCol class="urlColoumn">
              <IonInput
                placeholder="Reason for rejection"
                required={true}
                class="urlBox"
                onIonChange={(e) => {
                  e.detail.value == undefined
                    ? (setRejectedReason(""))
                    : (setRejectedReason(e.detail.value?.toString()));
                }}
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonSegment mode="md" >
            <IonButton
              fill="outline"
              class="reviewButton"
              onClick={async () => {
                setCheckReject(false);
                // Browser.open({
                  // url: getSocialList.completion_link,
                // });
              }}
            >
              Cancel
            </IonButton>

            <IonButton
              class="finalCancelButton2"
              fill="solid"
              onClick={() => {
                updateAmbassadorStatus(
                  selectedTask
                    .ambassador_program_id,
                    selectedTask.ambassador_id,
                  selectedClient,
                  selectedTask
                    .ambassador_custom_campaign_task_id,
                  3,
                  rejectedReason
                );
                setCheckReject(false);
              }}
              type='submit'
            >
              Reject
            </IonButton>
          </IonSegment>
        </form>
      </IonPopover>
          <IonPopover
            mode="ios"
            class="selectionPopover3 backgoundForEditPopover"
            trigger={"selectionDot" + toOpen.toString()}
            isOpen={showSelectionPopover}
            onDidDismiss={() => {
              setShowSeectionPopover(false);
            }}
            // arrow={true}
            alignment="end"
          >
            <IonRow>
              <IonItem
                class="backgoundForEditPopover outlineEditClass"
                onClick={() => {
                  GetCampaignByID(
                    clientDetail.id,
                    clientDetail.amb_prog_id,
                    clientDetail.status
                  );
                  setCheckEdit(true);
                  setNewCampaign(false);
                }}
              >
                <AiOutlineEdit
                  //  style={{ height: 40, cursor: "pointer" }} 
                  color="black"
                />
                &nbsp;&nbsp;Edit
              </IonItem>
            </IonRow>
            <IonRow class="line" />
            <IonRow>
              {archeived ? (
                <IonItem
                  // style={{ height: 40, cursor: "pointer" }}
                  class="outlineEditClass backgoundForEditPopover"
                  lines="full"
                  onClick={async () => {
                    await createClientService.UpdateArcheived(
                      false,
                      clientDetail.id,
                      clientDetail.status,
                      loginMetadata
                    );
                    GetAllPackage(option);
                    setShowSeectionPopover(false);
                  }}
                >
                  <BsArchive color="black" />
                  &nbsp;&nbsp;Unarchive
                </IonItem>
              ) : (
                <IonItem
                  // style={{ height: 40, cursor: "pointer" }}
                  class="outlineEditClass backgoundForEditPopover"
                  lines="full"
                  onClick={async () => {
                    await createClientService.UpdateArcheived(
                      true,
                      clientDetail.id,
                      clientDetail.status,
                      loginMetadata
                    );
                    GetAllPackage(option);
                    setShowSeectionPopover(false);
                  }}
                >
                  <BsArchive color="black" />
                  &nbsp;&nbsp;Archive
                </IonItem>
              )}
            </IonRow>
            <IonRow class="line" />
            <IonRow>
              <IonItem
                class="backgoundForEditPopover outlineEditClass"
                onClick={() => {
                  setShowPopover2(true);
                  setDelete(clientDetail.id);
                }}
              >
                <IoTrashOutline
                  color="black"
                // style={{ height: 40, cursor: "pointer" }} 
                />
                &nbsp;&nbsp;Delete
              </IonItem>
            </IonRow>
          </IonPopover>
          {/* <IonPopover
        mode="ios"
        class="ambassadorScroll"
        trigger={"selectionDot" + tempDetail.id.toString()}
        isOpen={showSelectionPopover2}
        onDidDismiss={() => {
          setShowSeectionPopover2(false);
        }}
        arrow={true}
        alignment="end"
      >
        <IonItem class="pop3">
          <IonRow>
            <IonCol class="pop2">
              Ambassadors Enrolled
            </IonCol>
          </IonRow>
        </IonItem>
        {tempDetail.ambassador_enrolled.map((element, key) => {
          return (
            <IonRow class="ambNameWrapper">
              <IonCol size="2"><img src={isStringEmpty(element.ambassador_program_img) ? isStringEmpty(element.ambassador_img) ? temp : element.ambassador_img : element.ambassador_program_img} className="ClientCampaignImage " /></IonCol>
              <IonCol size="6" class='ion-text-start'>
                {element.Title}
              </IonCol>
              <IonCol size="4" class=" ion-text-end">
                <IonButton class="ClientCampaignButton" fill="clear" onClick={async () => { await setShowSeectionPopover2(false); await setCampaignStatus(element.completionStatus); await setPos(key); await setShowPopover(true); await GetTaskDetail(toFind, element.amb_prog_id); }}>
                  Open
                </IonButton>
              </IonCol>
              <IonRow class="line" />
            </IonRow>
          );
        })}

      </IonPopover> */}
          <IonPopover isOpen={showPostPopover} onDidDismiss={() => setShowPostPopover(false)} id="postShowPopover">
            <IonGrid>
              <IonRow>
                {platform ==
                  SocialCampaignPlatform.Instagram ? (
                  <iframe
                    src={
                      task_completion_link ==
                        "" ||
                        task_completion_link ==
                        undefined ||
                        task_completion_link ==
                        null
                        ? defaultImage
                        : task_completion_link.split(
                          "?"
                        )[0] +
                        (task_completion_link.split(
                          "?"
                        )[0][
                          task_completion_link.split(
                            "?"
                          )[0].length - 1
                        ] == "/"
                          ? ""
                          : "/") +
                        "embed"
                    }
                    width="380"
                    height="600"
                    frameBorder="0"
                    scrolling="no"
                  />
                ) : platform ==
                  SocialCampaignPlatform.Twitter ? (
                  <TwitterTweetEmbed
                    tweetId={
                      task_completion_link
                        .split("?")[0]
                        .split("/")[
                      task_completion_link
                        .split("?")[0]
                        .split("/").length - 1
                      ]
                    }
                  />
                ) : undefined}</IonRow></IonGrid>
          </IonPopover>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => {
              setAlertMessage("");
              setShowAlert(false);
            }}
            message={alertMessage}
          />

          <IonPopover
            isOpen={showPopover2}
            onDidDismiss={() => {
              setShowPopover2(false);
              openMenu();
              setDelete(-1);
            }}
            class="ClientRewardsPopover2"
          >
            <IonGrid class="programManagementPopOverGrid">
              <IonRow class="ClientRewardsPopoverCloseButton">
                <IonIcon
                  md={close}
                  class="iconSize"
                  size="large"
                  onClick={() => {
                    setShowPopover2(false);
                    openMenu();
                    setDelete(-1);
                  }}
                ></IonIcon>
              </IonRow>
              <IonSegment mode="md" class="popHead">
                Are you sure you want to delete
              </IonSegment>
              <IonSegment mode="md" class="popHead2">
                the Campaign?
              </IonSegment>
              <IonSegment mode="md">
                <IonButton
                  fill="solid"
                  class="ClientRewardsButton7"
                  onClick={async () => {
                    setShowPopover2(false);
                    openMenu();
                    setIsLoading(true);
                    await createClientService
                      .DeleteCampaign(loginMetadata, toDelete, option)
                      .then((resp: any) => {
                        if (resp.status == "ok") {
                          setShowSeectionPopover(false);
                          setAlertMessage(resp.msg);
                          setUpdate(update + 1);
                        } else {
                          setShowSeectionPopover(false);
                          setAlertMessage(resp.msg);
                          setIsLoading(false);
                        }
                      })
                      .catch((e) => {
                        setAlertMessage(e);
                        setIsLoading(false);
                        setShowAlert(true);
                      });
                    setDelete(-1);

                    GetAllPackage(option);
                    setShowAlert(true);
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
                    setShowPopover2(false);
                    openMenu();
                    setDelete(-1);
                  }}
                >
                  Cancel
                </IonButton>
              </IonSegment>
            </IonGrid>
          </IonPopover>
          {isLoading ? (
            <Loading />
          ) : (
            <IonGrid>
              <IonCol>
                {CampaignList.GetClientList.map((getClient, index) => {
                  // if(index == 0){setOpenCampaign([])};
                  if (openCampign.length < CampaignList.GetClientList.length) {
                    openCampign.push(false);
                    openGuidelines.push(false);
                    openViewAll.push(false);
                  }
                  if (
                    (compreDate(new Date(getClient.start_date), range_start) <
                      0 &&
                      compreDate(new Date(getClient.start_date), range_end) > 0) &&
                    lowerCase(getClient.title).includes(
                      lowerCase(searchText)
                    ) &&
                    ((compreDate(new Date(getClient.end_date), new Date()) <
                      0 &&
                      current &&
                      !getClient.archeived && !archeived) ||
                      (compreDate(new Date(getClient.end_date), new Date()) >
                        0 &&
                        !current &&
                        !getClient.archeived && !archeived) ||
                      (getClient.archeived && archeived))
                  ) {
                    return openCampign[index] == true ? (
                      getClient.status == "Custom" ? (
                        <IonRow key={index}>
                          <IonCard
                            class="customCampaignOpenCard"
                          // style={{
                          //   padding: 20,
                          //   width: "100%",
                          //   borderRadius: 16,
                          //   boxShadow: "0px 1px 4px rgba(46, 119, 174, 0.2)",
                          //   background: "rgba(190, 212, 230, 0.1)",
                          // }}
                          >
                            <IonGrid style={{ padding: 0 }}>
                              <IonRow>
                                <IonCol size="0.5" style={{ paddingLeft: 0, display: "flex", alignItems: "center" }}>
                                  <AiOutlineLeft
                                    size={20}
                                    color="#2E77AE"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      openCampign[index] = false;
                                      setUpdate(update + 1);
                                    }}
                                  ></AiOutlineLeft>
                                </IonCol>
                                <IonCol style={{ maxWidth: "70px", minWidth: "60px", display: "flex", alignItems: "center" }}>
                                  <img
                                    src={
                                      getClient.campaign_img == "" ||
                                        getClient.campaign_img == undefined ||
                                        getClient.campaign_img == null
                                        ? defaultImage
                                        : getClient.campaign_img
                                    }
                                    style={{ height: 60, borderRadius: '100%', width: 60, objectFit: "cover" }}
                                  ></img>
                                </IonCol>
                                <IonCol class="ion-text-end">
                                  <IonRow>
                                    <IonLabel
                                      // style={{
                                      //   fontWeight: "bold",
                                      //   fontSize: 20,
                                      // }}
                                      class="titleForCampaign"
                                    >
                                      {getClient.title
                                        .substring(0, 1)
                                        .toUpperCase() +
                                        getClient.title.substring(1)}
                                      &nbsp;&nbsp;&nbsp;&nbsp;
                                    </IonLabel>
                                  </IonRow>
                                  <IonRow>
                                    <IonLabel
                                      // style={{
                                      //   fontWeight: 200,
                                      //   background: "#E0EAF5",
                                      // }}
                                      class="automaticAndManualStyle"
                                    >
                                      &nbsp;&nbsp;
                                      {getClient.automatic == 0
                                        ? "Manual"
                                        : "Auto"}
                                      &nbsp;&nbsp;
                                    </IonLabel>
                                    &nbsp;&nbsp;
                                    <IonLabel
                                      // style={{
                                      //   fontWeight: 200,
                                      //   background: "#E0EAF5",
                                      // }}
                                      class="automaticAndManualStyle"
                                    >
                                      &nbsp;&nbsp;{"Custom"}&nbsp;&nbsp;
                                    </IonLabel>
                                  </IonRow>
                                  <IonRow style={{ paddingLeft: "5px" }}>
                                    <IonLabel style={{ color: "#2E77AE" }}>
                                      {getClient.campaign_reward_points} RP
                                    </IonLabel>
                                  </IonRow>
                                </IonCol>
                                <IonCol
                                  class="ion-text-end"
                                  style={{ color: "#2E77AE" }}
                                >
                                  {getClient.campaign_url == "" || getClient.campaign_url == undefined || getClient.campaign_url == null ? null :
                                    <BiLink
                                      size={20}
                                      className="linkIcon"
                                      style={{ cursor: "pointer" }}
                                      // style={{
                                      //   marginRight: 10,
                                      //   background: "#E0EAF5",
                                      //   borderRadius: 4,
                                      // }}
                                      onClick={() => {
                                        Browser.open({ url: getClient.campaign_url, windowName: "_blank" })
                                      }}
                                    ></BiLink>
                                  }
                                  <AiOutlineMore size="20" style={{ cursor: "pointer" }} id={"selectionDot" + index.toString()} onClick={() => {
                                    setClientDetails(getClient);
                                    setOpen(index);
                                    setShowSeectionPopover(true);
                                  }} />
                                </IonCol>
                              </IonRow>
                              <IonRow
                                style={{ marginTop: 15, marginBottom: 15 }}
                              >
                                <IonLabel>
                                  {/* <span style={{ color: "#2E77AE" }}>
                                    Reached&nbsp;&nbsp;
                                  </span>
                                  122&nbsp;&nbsp;&nbsp;&nbsp; */}
                                  <span style={{ color: "#2E77AE" }}>
                                    Enrolled ambassadors&nbsp;&nbsp;
                                  </span>
                                  {getClient.ambassador_enrolled}
                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                  <span style={{ color: "#2E77AE" }}>
                                    Duration&nbsp;&nbsp;
                                  </span>
                                  {Math.floor((Date.parse(getClient.end_date) -
                                    Date.parse(getClient.start_date)) /
                                    (1000 * 60 * 60 * 24)) +
                                    " Days " +
                                    ((Math.floor((Date.parse(getClient.end_date) -
                                      Date.parse(getClient.start_date)) / (1000 * 60 * 60))) % 24) +
                                    " Hours "}
                                </IonLabel>
                              </IonRow>
                              <IonRow style={{ width: "80%", marginBottom: "5px" }}>
                                <IonLabel>{getClient.description}</IonLabel>
                              </IonRow>
                              {getClient.guidelines ?
                                <IonRow >
                                  <IonLabel
                                    style={{
                                      // textDecoration: "underline",
                                      color: "#2E77AE",
                                      cursor: "pointer"
                                    }}

                                    onClick={() => {
                                      openGuidelines[index] =
                                        !openGuidelines[index];
                                      setUpdate(update + 1);
                                    }}
                                  >
                                    <u>Guidelines</u>
                                  </IonLabel>
                                </IonRow>
                                : undefined}
                              {openGuidelines[index] ? (
                                <IonRow style={{ width: "80%" }}>{getClient.guidelines}</IonRow>
                              ) : undefined}
                              <IonRow
                                class="submissionsRow"
                              // style={{
                              //   justifyContent: "space-between",
                              //   marginTop: 10,
                              //   marginBottom: 10,
                              //   color: "#2E77AE",
                              // }}
                              >
                                <IonLabel style={{ display: "flex", alignItems: "center" }}>
                                  <BsClipboardCheck></BsClipboardCheck>
                                  &nbsp;&nbsp;Submissions&nbsp;&nbsp;
                                  {
                                    Object.keys(getClient.submissionsList)
                                      .length
                                  }
                                </IonLabel>
                                <IonLabel
                                  style={{ display: "flex", alignItems: "center", textDecoration: "underline", cursor: "pointer" }}
                                  onClick={() => {
                                    openViewAll[index] = !openViewAll[index];
                                    setUpdate(update + 1);
                                  }}
                                >
                                  View {!openViewAll[index] ? "All" : "Less"}
                                </IonLabel>
                              </IonRow>
                              {Object.keys(getClient.submissionsList).map(
                                (elem: any, index2: number) => {
                                  let ele = getClient.submissionsList[elem];
                                  if (openViewAll[index] || index2 < 2)
                                    return (
                                      <IonRow key={index2}>
                                        <IonCol>

                                          <IonRow>
                                            <IonCard
                                              class="submissionCard"
                                            // style={{ width: "100%", marginLeft: '0px', borderRadius: '4px' ,boxShadow: 'none', border: '1px solid #E0EAF5'}}
                                            >
                                              <IonCardContent
                                                style={{ padding: " 10px 5px" }}
                                              >
                                                <IonGrid
                                                  style={{
                                                    paddingLeft: 0,
                                                    paddingBottom: 0,
                                                    paddingTop: 0,
                                                  }}
                                                >
                                                  <IonRow>
                                                    <IonCol
                                                      style={{
                                                        paddingLeft: 0,
                                                        paddingBottom: 0,
                                                        paddingTop: 0,
                                                        marginRight: 10,
                                                        maxWidth: "100px",
                                                        minWidth: "100px"
                                                      }}
                                                    >
                                                      <img
                                                        src={
                                                          ele[0]
                                                            .ambassador_img ==
                                                            "" ||
                                                            ele[0]
                                                              .ambassador_img ==
                                                            undefined ||
                                                            ele[0]
                                                              .ambassador_img ==
                                                            null
                                                            ? defaultImage
                                                            : ele[0]
                                                              .ambassador_img
                                                        }
                                                        style={{
                                                          height: "100px",
                                                          width: "100px",
                                                          objectFit: "cover",
                                                          // margin: "auto",
                                                        }}
                                                      />
                                                    </IonCol>
                                                    <IonCol
                                                      style={{ padding: 0 }}
                                                    >
                                                      <IonRow style={{}}>
                                                        <IonCol
                                                          style={{
                                                            color: "#2E77AE",
                                                            display: "flex", alignItems: "center"
                                                          }}
                                                        >
                                                          <IonLabel
                                                            style={{
                                                              fontSize: "1rem",
                                                            }}
                                                          >
                                                            {
                                                              ele[0]
                                                                .ambassador_name
                                                            }
                                                          </IonLabel>
                                                        </IonCol>
                                                        <IonCol class="ion-text-end">
                                                          <IonLabel style={{
                                                            fontSize: "0.8rem",
                                                          }}>
                                                            Lifetime RPs&nbsp;&nbsp;<span>{ele[0].lifetime_points}</span>
                                                          </IonLabel>
                                                        </IonCol>
                                                      </IonRow>
                                                      <IonRow>
                                                        <BiLink size="20" />
                                                        &nbsp;&nbsp;&nbsp;
                                                        <a target="_blank" href={ele[0]
                                                          .task_completion_link} style={{ color: '#8B8B8B' }}>
                                                          {
                                                            ele[0]
                                                              .task_completion_link
                                                          }</a>
                                                      </IonRow>
                                                      <IonRow
                                                        style={{
                                                          marginTop: "10px",
                                                          fontSize: "1rem",
                                                          fontWeight: 500,
                                                        }}
                                                      >
                                                        <IonCol>
                                                          <IonRow style={{}}>
                                                            {ele[0].task_completion_status ==
                                                              TaskStatus.APPROVED ||
                                                              ele[0].task_completion_status ==
                                                              TaskStatus.PENDING ||
                                                              ele[0].task_completion_status ==
                                                              TaskStatus.INPROCESS ? (
                                                              <IonButton
                                                                style={{ height: 20 }}
                                                                color="success"
                                                                class="accept-btn"
                                                                disabled={ele[0]
                                                                  .task_completion_status ==
                                                                  TaskStatus.APPROVED}
                                                                onClick={() => {
                                                                  if (
                                                                    ele[0]
                                                                      .task_completion_status !=
                                                                    TaskStatus.APPROVED
                                                                  ) {
                                                                    updateAmbassadorStatus(
                                                                      ele[0]
                                                                        .ambassador_program_id,
                                                                      ele[0].ambassador_id,
                                                                      getClient.id,
                                                                      ele[0]
                                                                        .ambassador_custom_campaign_task_id,
                                                                      2,
                                                                      ""
                                                                    );
                                                                  }
                                                                }}
                                                              >
                                                                {" "}
                                                                <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  x="0px"
                                                                  y="0px"
                                                                  width="10"
                                                                  height="10"
                                                                  viewBox="0 0 48 48"
                                                                  style={{
                                                                    fill: "#000000",
                                                                    marginRight: 5,
                                                                  }}
                                                                >
                                                                  <path
                                                                    fill="#43A047"
                                                                    d="M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z"
                                                                  ></path>
                                                                </svg>
                                                                {ele[0]
                                                                  .task_completion_status ==
                                                                  TaskStatus.APPROVED
                                                                  ? "Accepted"
                                                                  : "Accept"}
                                                              </IonButton>
                                                            ) : undefined}{ele[0].task_completion_status ==
                                                              TaskStatus.REJECTED ? undefined :
                                                              <IonLabel>
                                                                &nbsp;&nbsp;&nbsp;
                                                              </IonLabel>}
                                                            {ele[0].task_completion_status ==
                                                              TaskStatus.REJECTED ||
                                                              ele[0].task_completion_status ==
                                                              TaskStatus.PENDING ||
                                                              ele[0].task_completion_status ==
                                                              TaskStatus.INPROCESS ? (
                                                              <IonButton
                                                                color="danger"
                                                                style={{ height: 20 }}
                                                                class="reject-btn"
                                                                disabled={ele[0]
                                                                  .task_completion_status ==
                                                                  TaskStatus.REJECTED}
                                                                onClick={() => {
                                                                  if (
                                                                    ele[0]
                                                                      .task_completion_status !=
                                                                    TaskStatus.REJECTED
                                                                  ) {
                                                                    setSelectedTask(ele[0]);
                                                                    setSelectedClient(getClient.id)
                                                                    setCheckReject(true);
                                                                    // updateAmbassadorStatus(
                                                                    //   ele[0]
                                                                    //     .ambassador_program_id,
                                                                    //   ele[0].ambassador_id,
                                                                    //   getClient.id,
                                                                    //   ele[0]
                                                                    //     .ambassador_custom_campaign_task_id,
                                                                    //   3
                                                                    // );
                                                                  }
                                                                }}
                                                              >
                                                                <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  x="0px"
                                                                  y="0px"
                                                                  width="10"
                                                                  height="10"
                                                                  viewBox="0 0 48 48"
                                                                  style={{
                                                                    fill: "#000000",
                                                                    marginRight: 5,
                                                                  }}
                                                                >
                                                                  <path
                                                                    fill="#F44336"
                                                                    d="M21.5 4.5H26.501V43.5H21.5z"
                                                                    transform="rotate(45.001 24 24)"
                                                                  ></path>
                                                                  <path
                                                                    fill="#F44336"
                                                                    d="M21.5 4.5H26.5V43.501H21.5z"
                                                                    transform="rotate(135.008 24 24)"
                                                                  ></path>
                                                                </svg>
                                                                {ele[0]
                                                                  .task_completion_status ==
                                                                  TaskStatus.REJECTED
                                                                  ? "Rejected"
                                                                  : "Reject"}
                                                              </IonButton>
                                                            ) : undefined}
                                                          </IonRow>
                                                        </IonCol>
                                                        <IonCol
                                                          class="ion-text-end"
                                                          style={{
                                                            fontSize: "0.8rem",
                                                            color: "#2E77AE",
                                                            display: "flex", alignItems: "center", justifyContent: "flex-end"
                                                          }}
                                                        >
                                                          {new Date(
                                                            ele[0].updatedAt
                                                          ).toDateString()}
                                                        </IonCol>
                                                      </IonRow>
                                                    </IonCol>
                                                  </IonRow>
                                                </IonGrid>
                                              </IonCardContent>
                                            </IonCard>
                                          </IonRow>
                                        </IonCol>
                                      </IonRow>
                                    );
                                }
                              )}
                            </IonGrid>
                          </IonCard>
                        </IonRow>
                      ) : getClient.status == "Social" ? (
                        <IonRow key={index}>
                          <IonCard
                            class="customCampaignOpenCard"
                          // style={{
                          //   padding: 20,
                          //   width: "100%",
                          //   borderRadius: 16,
                          //   boxShadow: "0px 1px 4px rgba(46, 119, 174, 0.2)",
                          //   background: "rgba(190, 212, 230, 0.1)",
                          // }}
                          >
                            <IonGrid style={{ padding: 0 }}>
                              <IonRow>
                                <IonCol size="0.5" style={{ paddingLeft: 0, display: "flex", alignItems: "center" }}>
                                  <AiOutlineLeft
                                    size={20}
                                    color="#2E77AE"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      openCampign[index] = false;
                                      setUpdate(update + 1);
                                    }}
                                  ></AiOutlineLeft>
                                </IonCol>
                                <IonCol style={{ maxWidth: "70px", minWidth: "60px", display: "flex", alignItems: "center" }}>
                                  <img
                                    src={
                                      getClient.campaign_img == "" ||
                                        getClient.campaign_img == undefined ||
                                        getClient.campaign_img == null
                                        ? defaultImage
                                        : getClient.campaign_img
                                    }
                                    style={{ height: 60, borderRadius: '100%', width: 60, objectFit: "cover" }}
                                  ></img>
                                </IonCol>
                                <IonCol class="ion-text-end">
                                  <IonRow>
                                    <IonLabel
                                      // style={{
                                      //   fontWeight: "bold",
                                      //   fontSize: 20,
                                      // }}
                                      class="titleForCampaign"
                                    >
                                      {getClient.title
                                        .substring(0, 1)
                                        .toUpperCase() +
                                        getClient.title.substring(1)}
                                      &nbsp;&nbsp;&nbsp;&nbsp;
                                    </IonLabel>
                                  </IonRow>
                                  <IonRow>
                                    <IonLabel
                                      // style={{
                                      //   fontWeight: 200,
                                      //   background: "#E0EAF5",
                                      // }}
                                      class="automaticAndManualStyle"
                                    >
                                      &nbsp;&nbsp;
                                      {getClient.automatic == 0
                                        ? "Manual"
                                        : "Auto"}
                                      &nbsp;&nbsp;
                                    </IonLabel>
                                    &nbsp;&nbsp;
                                    <IonLabel
                                      // style={{
                                      //   fontWeight: 200,
                                      //   background: "#E0EAF5",
                                      // }}
                                      class="automaticAndManualStyle"
                                    >
                                      &nbsp;&nbsp;{"Engagement"}&nbsp;&nbsp;
                                    </IonLabel>
                                    {getClient.platform == SocialCampaignPlatform.Twitter ?
                                      <>&nbsp;&nbsp;
                                        <IonLabel
                                          style={{
                                            background: " #2E77AE",
                                            borderRadius: "8px",
                                            color: "white"
                                          }}
                                        >
                                          &nbsp;&nbsp;{"Twitter"}&nbsp;&nbsp;
                                        </IonLabel></> :
                                      getClient.platform == SocialCampaignPlatform.Instagram ? <>&nbsp;&nbsp;
                                        <IonLabel
                                          style={{
                                            background: " #2E77AE",
                                            borderRadius: "8px",
                                            color: "white"
                                          }}
                                        >
                                          &nbsp;&nbsp;{"Instagram"}&nbsp;&nbsp;
                                        </IonLabel></> :
                                        null}
                                  </IonRow>
                                  <IonRow style={{ paddingLeft: "5px" }}>
                                    <IonLabel style={{ color: "#2E77AE" }}>
                                      {getClient.campaign_reward_points} RP
                                    </IonLabel>
                                  </IonRow>
                                </IonCol>
                                <IonCol
                                  class="ion-text-end"
                                  style={{ color: "#2E77AE" }}
                                >
                                  <BiLink
                                    size={20}
                                    className="linkIcon"
                                    style={{ cursor: "pointer" }}
                                    // style={{
                                    //   marginRight: 10,
                                    //   background: "#E0EAF5",
                                    //   borderRadius: 4,
                                    // }}
                                    onClick={() => {
                                      Browser.open({ url: getClient.campaign_url, windowName: "_blank" })
                                    }}
                                  ></BiLink>
                                  <AiOutlineMore size="20" style={{ cursor: "pointer" }} id={"selectionDot" + index.toString()} onClick={() => {
                                    setClientDetails(getClient);
                                    setOpen(index);
                                    setShowSeectionPopover(true);
                                  }} />
                                </IonCol>
                              </IonRow>
                              <IonRow
                                style={{ marginTop: 15, marginBottom: 15 }}
                              >
                                <IonLabel>
                                  <span style={{ color: "#2E77AE" }}>
                                    Reached&nbsp;&nbsp;
                                  </span>
                                  {getClient.reachArray?.impressions ?? 0}
                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                  <span style={{ color: "#2E77AE" }}>
                                    Enrolled ambassadors&nbsp;&nbsp;
                                  </span>
                                  {getClient.ambassador_enrolled}
                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                  <span style={{ color: "#2E77AE" }}>
                                    Duration&nbsp;&nbsp;
                                  </span>
                                  {Math.floor((Date.parse(getClient.end_date) -
                                    Date.parse(getClient.start_date)) /
                                    (1000 * 60 * 60 * 24)) +
                                    " Days " +
                                    ((Math.floor((Date.parse(getClient.end_date) -
                                      Date.parse(getClient.start_date)) / (1000 * 60 * 60))) % 24) +
                                    " Hours "}
                                </IonLabel>
                              </IonRow>
                              <IonRow style={{ width: "80%", marginBottom: "5px" }}>
                                <IonLabel>{getClient.description}</IonLabel>
                              </IonRow>
                              {getClient.guidelines ?
                                <IonRow >
                                  <IonLabel
                                    style={{
                                      // textDecoration: "underline",
                                      color: "#2E77AE",
                                      cursor: "pointer",
                                    }}

                                    onClick={() => {
                                      openGuidelines[index] =
                                        !openGuidelines[index];
                                      setUpdate(update + 1);
                                    }}
                                  >
                                    <u>Guidelines</u>
                                  </IonLabel>
                                </IonRow>
                                : undefined}
                              {openGuidelines[index] ? (
                                <IonRow style={{ width: "80%", marginBottom: "5px" }}>{getClient.guidelines}</IonRow>
                              ) : undefined}
                              <IonRow style={{ display: "flex", alignItems: "center" }}>
                                {getClient.platform == SocialCampaignPlatform.Twitter ? <BsTwitter
                                  size={25}
                                  style={{
                                    color: "#2E77AE",
                                  }}
                                /> : getClient.platform == SocialCampaignPlatform.Instagram ? <BsInstagram
                                  size={25}
                                  style={{
                                    color: "#2E77AE",
                                  }}
                                ></BsInstagram> : undefined}
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <span style={{ width: "90%" }}>
                                  <IonCard
                                    class="submissionCard"
                                    style={{ height: 30 }}
                                  >
                                    <IonRow
                                      style={{
                                        justifyContent: "space-between",
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                        alignItems: "center",
                                        height: "100%"
                                      }}
                                    >
                                      <IonLabel>
                                        <AiOutlineHeart
                                          size={20}
                                        ></AiOutlineHeart>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        {getClient.reachArray?.likes ?? "0"}
                                      </IonLabel>
                                      <IonLabel>
                                        <BsChatLeft size={20}></BsChatLeft>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        {getClient.reachArray?.comments ?? "0"}
                                      </IonLabel>
                                      <IonLabel>
                                        <FaShare size={20}></FaShare>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        {getClient.reachArray?.shares ?? "0"}
                                      </IonLabel>
                                      <IonLabel>
                                        <MdAreaChart size={20}></MdAreaChart>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        {getClient.reachArray?.impressions ?? 0}
                                      </IonLabel>
                                    </IonRow>
                                  </IonCard>
                                </span>
                              </IonRow>
                              <IonRow
                                class="submissionsRow"
                              // style={{
                              //   justifyContent: "space-between",
                              //   marginTop: 10,
                              //   marginBottom: 10,
                              //   color: "#2E77AE",
                              // }}
                              >
                                <IonLabel style={{ display: "flex", alignItems: "center" }}>
                                  <BsClipboardCheck></BsClipboardCheck>
                                  &nbsp;&nbsp;Submissions&nbsp;&nbsp;
                                  {
                                    Object.keys(getClient.submissionsList)
                                      .length
                                  }
                                </IonLabel>
                                <IonLabel
                                  style={{ display: "flex", alignItems: "center", textDecoration: "underline", cursor: "pointer" }}
                                  onClick={() => {
                                    openViewAll[index] = !openViewAll[index];
                                    setUpdate(update + 1);
                                  }}
                                >
                                  View {!openViewAll[index] ? "All" : "Less"}
                                </IonLabel>
                              </IonRow>
                              {Object.keys(getClient.submissionsList).map(
                                (elem: any, index2: number) => {
                                  let ele = getClient.submissionsList[elem];
                                  if (openViewAll[index] || index2 < 2)
                                    return (
                                      <IonRow key={index2}>
                                        <IonCol>
                                          <IonRow>
                                            <IonCard
                                              class="submissionCard"
                                            // style={{ width: "100%", marginLeft: '0px',borderRadius:'4px' ,boxShadow: 'none', border: '1px solid #E0EAF5' }}
                                            >
                                              <IonCardContent
                                                style={{ padding: " 10px 5px" }}
                                              >
                                                <IonGrid
                                                  style={{
                                                    paddingLeft: 0,
                                                    paddingBottom: 0,
                                                    paddingTop: 0,
                                                  }}
                                                >
                                                  <IonRow>
                                                    <IonCol
                                                      size="1.5"
                                                      style={{
                                                        paddingLeft: 0,
                                                        paddingBottom: 0,
                                                        paddingTop: 0,
                                                        marginRight: 10,
                                                        maxWidth: "100px",
                                                        minWidth: "100px"
                                                      }}
                                                    >
                                                      <img
                                                        src={
                                                          ele[0].ambassador_img ==
                                                            "" ||
                                                            ele[0].ambassador_img ==
                                                            undefined ||
                                                            ele[0].ambassador_img ==
                                                            null
                                                            ? defaultImage
                                                            : ele[0].ambassador_img
                                                        }
                                                        style={{
                                                          height: "100px",
                                                          objectFit: "cover",
                                                          // margin: "auto",
                                                          width: "100px"
                                                        }}
                                                      />
                                                    </IonCol>
                                                    <IonCol style={{ padding: 0 }}>
                                                      <IonRow style={{}}>
                                                        <IonCol
                                                          style={{
                                                            padding: 0,
                                                            color: "#2E77AE",
                                                            display: "flex", alignItems: "center"
                                                          }}
                                                        >
                                                          <IonLabel
                                                            style={{ fontSize: "1rem" }}
                                                          >
                                                            {ele[0].ambassador_name}
                                                          </IonLabel>
                                                        </IonCol>
                                                        <IonCol class="ion-text-end">
                                                          <IonLabel style={{
                                                            fontSize: "0.8rem",
                                                          }}>
                                                            Lifetime RPs&nbsp;&nbsp;<span>{ele[0].lifetime_points}</span>
                                                          </IonLabel>
                                                        </IonCol>
                                                      </IonRow>
                                                      <IonRow>
                                                        {ele.map((e: any) => {
                                                          if (
                                                            e.task_type ==
                                                            SocialCampaignTaskType.Like
                                                          )
                                                            return (
                                                              <IonCol>
                                                                <AiOutlineLike></AiOutlineLike>
                                                                &nbsp;&nbsp;Liked
                                                              </IonCol>
                                                            );
                                                        })}
                                                        {ele.map((e: any) => {
                                                          if (
                                                            e.task_type ==
                                                            SocialCampaignTaskType.Share
                                                          )
                                                            return (
                                                              <IonCol>
                                                                <BiShare></BiShare>
                                                                &nbsp;&nbsp;Share
                                                              </IonCol>
                                                            );
                                                        })}
                                                        {ele.map((e: any) => {
                                                          if (
                                                            e.task_type ==
                                                            SocialCampaignTaskType.Comment
                                                          )
                                                            return (
                                                              <IonCol>
                                                                <BsChatLeft size={15}></BsChatLeft>
                                                                &nbsp;&nbsp;Comment
                                                              </IonCol>
                                                            );
                                                        })}
                                                      </IonRow>
                                                      <IonRow
                                                        style={{
                                                          marginTop: "10px",
                                                          fontSize: "1rem",
                                                          fontWeight: 500,
                                                        }}
                                                      >
                                                        <IonCol>
                                                          {/* <IonLabel>
                                                        Name.......
                                                      </IonLabel> */}
                                                        </IonCol>
                                                        <IonCol
                                                          class="ion-text-end"
                                                          style={{
                                                            fontSize: "0.8rem",
                                                            color: "#2E77AE",
                                                            display: "flex", alignItems: "center", justifyContent: "flex-end"
                                                          }}
                                                        >
                                                          {new Date(
                                                            ele[0].updatedAt
                                                          ).toDateString()}
                                                        </IonCol>
                                                      </IonRow>
                                                    </IonCol>
                                                  </IonRow>
                                                </IonGrid>
                                              </IonCardContent>
                                            </IonCard>
                                          </IonRow>
                                        </IonCol>
                                      </IonRow>
                                    );
                                }
                              )}
                            </IonGrid>
                          </IonCard>
                        </IonRow>
                      ) : (
                        <IonRow>
                          <IonCard
                            class="customCampaignOpenCard"
                          // style={{
                          //   padding: 20,
                          //   width: "100%",
                          //   borderRadius: 16,
                          //   boxShadow: "0px 1px 4px rgba(46, 119, 174, 0.2)",
                          //   background: "rgba(190, 212, 230, 0.1)",
                          // }}
                          >
                            <IonGrid style={{ padding: 0 }}>
                              <IonRow>
                                <IonCol size="0.5" style={{ paddingLeft: 0, display: "flex", alignItems: "center" }}>
                                  <AiOutlineLeft
                                    size={20}
                                    style={{ color: "#2E77AE", cursor: 'pointer' }}
                                    onClick={() => {
                                      openCampign[index] = false;
                                      setUpdate(update + 1);
                                    }}
                                  ></AiOutlineLeft>
                                </IonCol>
                                <IonCol style={{ maxWidth: "70px", minWidth: "60px", display: "flex", alignItems: "center" }}>
                                  <img
                                    src={
                                      getClient.campaign_img == "" ||
                                        getClient.campaign_img == undefined ||
                                        getClient.campaign_img == null
                                        ? defaultImage
                                        : getClient.campaign_img
                                    }
                                    style={{ height: 60, borderRadius: '100%', width: 60, objectFit: "cover" }}
                                  ></img>
                                </IonCol>
                                <IonCol class="ion-text-end">
                                  <IonRow>
                                    <IonLabel
                                      // style={{
                                      //   fontWeight: "bold",
                                      //   fontSize: 20,
                                      // }}
                                      class="titleForCampaign"
                                    >
                                      {getClient.title
                                        .substring(0, 1)
                                        .toUpperCase() +
                                        getClient.title.substring(1)}
                                      &nbsp;&nbsp;&nbsp;&nbsp;
                                    </IonLabel>
                                  </IonRow>
                                  <IonRow>
                                    <IonLabel
                                      class="automaticAndManualStyle"
                                    // style={{
                                    //   fontWeight: 200,
                                    //   background: "#E0EAF5",
                                    // }}
                                    >
                                      &nbsp;&nbsp;
                                      {getClient.automatic == 0
                                        ? "Manual"
                                        : "Auto"}
                                      &nbsp;&nbsp;
                                    </IonLabel>
                                    &nbsp;&nbsp;
                                    <IonLabel
                                      // style={{
                                      //   fontWeight: 200,
                                      //   background: "#E0EAF5",
                                      // }}
                                      class="automaticAndManualStyle"
                                    >
                                      &nbsp;&nbsp;{"UGC"}&nbsp;&nbsp;
                                    </IonLabel>
                                    {getClient.platform == SocialCampaignPlatform.Twitter ?
                                      <>&nbsp;&nbsp;
                                        <IonLabel
                                          style={{
                                            background: " #2E77AE",
                                            borderRadius: "8px",
                                            color: "white"
                                          }}
                                        >
                                          &nbsp;&nbsp;{"Twitter"}&nbsp;&nbsp;
                                        </IonLabel></> :
                                      getClient.platform == SocialCampaignPlatform.Instagram ? <>&nbsp;&nbsp;
                                        <IonLabel
                                          style={{
                                            background: " #2E77AE",
                                            borderRadius: "8px",
                                            color: "white"
                                          }}
                                        >
                                          &nbsp;&nbsp;{"Instagram"}&nbsp;&nbsp;
                                        </IonLabel></> :
                                        null}
                                  </IonRow>
                                  <IonRow style={{ paddingLeft: "5px" }}>
                                    <IonLabel style={{ color: "#2E77AE" }}>
                                      {getClient.campaign_reward_points} RP
                                    </IonLabel>
                                  </IonRow>
                                </IonCol>
                                <IonCol
                                  class="ion-text-end"
                                  style={{ color: "#2E77AE" }}
                                >
                                  {/* {
                                  <BiLink
                                    size={20}
                                    style={{
                                      marginRight: 10,
                                      background: "#E0EAF5",
                                      borderRadius: 4,
                                    }}
                                    onClick={() => {}}
                                  ></BiLink>} */}
                                  <AiOutlineMore size="20" style={{ cursor: "pointer" }} id={"selectionDot" + index.toString()} onClick={() => {
                                    setClientDetails(getClient);
                                    setOpen(index);
                                    setShowSeectionPopover(true);
                                  }} />
                                </IonCol>
                              </IonRow>
                              <IonRow
                                style={{ marginTop: 15, marginBottom: 15 }}
                              >
                                <IonLabel>
                                  {/* <span style={{ color: "#2E77AE" }}>
                                    Reached&nbsp;&nbsp;
                                  </span>
                                  122&nbsp;&nbsp;&nbsp;&nbsp; */}
                                  <span style={{ color: "#2E77AE" }}>
                                    Enrolled ambassadors&nbsp;&nbsp;
                                  </span>
                                  {getClient.ambassador_enrolled}
                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                  <span style={{ color: "#2E77AE" }}>
                                    Duration&nbsp;&nbsp;
                                  </span>
                                  {Math.floor((Date.parse(getClient.end_date) -
                                    Date.parse(getClient.start_date)) /
                                    (1000 * 60 * 60 * 24)) +
                                    " Days " +
                                    ((Math.floor((Date.parse(getClient.end_date) -
                                      Date.parse(getClient.start_date)) / (1000 * 60 * 60))) % 24) +
                                    " Hours "}
                                </IonLabel>
                              </IonRow>
                              <IonRow style={{ width: "80%", marginBottom: "5px" }}>
                                <IonLabel>{getClient.description}</IonLabel>
                              </IonRow>
                              {getClient.guidelines ?
                                <IonRow>
                                  <IonLabel
                                    style={{
                                      textDecoration: "underline",
                                      color: "#2E77AE",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      openGuidelines[index] =
                                        !openGuidelines[index];
                                      setUpdate(update + 1);
                                    }}
                                  >
                                    Guidelines
                                  </IonLabel>
                                </IonRow> : null}
                              {openGuidelines[index] ? (
                                <IonRow style={{ width: "80%" }}>{getClient.guidelines}</IonRow>
                              ) : undefined}
                              <IonRow
                                class="submissionsRow"
                              // style={{
                              //   justifyContent: "space-between",
                              //   marginTop: 10,
                              //   marginBottom: 10,
                              //   color: "#2E77AE",
                              // }}
                              >
                                <IonLabel style={{ display: "flex", alignItems: "center" }}>
                                  <BsClipboardCheck></BsClipboardCheck>
                                  &nbsp;&nbsp;Submissions&nbsp;&nbsp;
                                  {
                                    Object.keys(getClient.submissionsList)
                                      .length
                                  }
                                </IonLabel>
                                <IonLabel
                                  style={{ display: "flex", alignItems: "center", textDecoration: "underline", cursor: "pointer" }}
                                  onClick={() => {
                                    openViewAll[index] = !openViewAll[index];
                                    setUpdate(update + 1);
                                  }}
                                >
                                  View {!openViewAll[index] ? "All" : "Less"}
                                </IonLabel>
                              </IonRow>
                              {/* <IonRow> */}
                              {Object.keys(getClient.submissionsList).map(
                                (elem: any, index2: number) => {
                                  let ele = getClient.submissionsList[elem];
                                  console.log(getClient.update);
                                  // if(getClient.status == "UGC" && !getClient.update){
                                  //   if(!campaignLoading)
                                  //   {
                                  //     setCampaignLoading(true);
                                  //     getSubmissionList(getClient.id, index);
                                  //   }
                                  //   return (<Loading/>)
                                  // }
                                  if (openViewAll[index] || index2 < 2)
                                    return (<IonRow key={index2}>
                                      <IonCol>

                                        <IonRow>
                                          <IonCard
                                            class="submissionCard"
                                          // style={{ width: "100%", marginLeft: '0px', borderRadius: '4px' ,boxShadow: 'none', border: '1px solid #E0EAF5'}}
                                          >
                                            <IonCardContent
                                              style={{ padding: " 10px 5px" }}
                                            >
                                              <IonGrid
                                                style={{
                                                  paddingLeft: 0,
                                                  paddingBottom: 0,
                                                  paddingTop: 0,
                                                }}
                                              >
                                                <IonRow>
                                                  <IonCol
                                                    style={{
                                                      paddingLeft: 0,
                                                      paddingBottom: 0,
                                                      paddingTop: 0,
                                                      marginRight: 10,
                                                      maxWidth: "100px",
                                                      minWidth: "100px"
                                                    }}
                                                  >
                                                    <img
                                                      src={
                                                        ele[0]
                                                          .ambassador_img ==
                                                          "" ||
                                                          ele[0]
                                                            .ambassador_img ==
                                                          undefined ||
                                                          ele[0]
                                                            .ambassador_img ==
                                                          null
                                                          ? defaultImage
                                                          : ele[0]
                                                            .ambassador_img
                                                      }
                                                      style={{
                                                        height: "100px",
                                                        objectFit: "cover",
                                                        // margin: "auto",
                                                        width: "100px"
                                                      }}
                                                    />
                                                  </IonCol>
                                                  <IonCol
                                                    style={{ padding: 0 }}
                                                  >
                                                    <IonRow style={{}}>
                                                      <IonCol
                                                        style={{
                                                          padding: 0,
                                                          color: "#2E77AE",
                                                          display: "flex", alignItems: "center"
                                                        }}
                                                      >
                                                        <IonLabel
                                                          style={{
                                                            fontSize: "1rem",
                                                          }}
                                                        >
                                                          {
                                                            ele[0]
                                                              .ambassador_name
                                                          }
                                                        </IonLabel>
                                                      </IonCol>
                                                      <IonCol class="ion-text-end">
                                                        <IonLabel style={{
                                                          fontSize: "0.8rem",
                                                        }}>
                                                          Lifetime RPs&nbsp;&nbsp;<span>{ele[0].lifetime_points}</span>
                                                        </IonLabel>
                                                      </IonCol>
                                                    </IonRow>
                                                    <IonRow>
                                                      <IonCol
                                                        size="10"
                                                        style={{
                                                          // border:
                                                          //   "1px solid #E0EAF5",
                                                        }}
                                                      >
                                                        <BiLink size="20" />
                                                        &nbsp;&nbsp;&nbsp;
                                                        <a target="_blank" href={ele[0]
                                                          .task_completion_link} style={{ color: '#8B8B8B' }}>
                                                          {
                                                            ele[0]
                                                              .task_completion_link
                                                          }</a>
                                                      </IonCol>
                                                      <IonCol class="ion-text-end">
                                                        <AiOutlineEye style={{ cursor: "pointer" }} size={25} onClick={() => {
                                                          setPlatform(getClient.platform);
                                                          setTaskCompletionLink(ele[0].task_completion_link)
                                                          setShowPostPopover(true);
                                                        }} />
                                                      </IonCol>
                                                    </IonRow>
                                                    <IonRow
                                                      style={{
                                                        marginTop: "10px",
                                                        fontSize: "1rem",
                                                        fontWeight: 500,
                                                      }}
                                                    >
                                                      <IonCol>
                                                        <IonRow style={{}}>
                                                          {ele[0].task_completion_status ==
                                                            TaskStatus.APPROVED ||
                                                            ele[0].task_completion_status ==
                                                            TaskStatus.PENDING ||
                                                            ele[0].task_completion_status ==
                                                            TaskStatus.INPROCESS ? (
                                                            <IonButton
                                                              color="success"
                                                              class="accept-btn"
                                                              style={{ height: 20 }}
                                                              disabled={ele[0]
                                                                .task_completion_status ==
                                                                TaskStatus.APPROVED}
                                                              onClick={() => {
                                                                if (
                                                                  ele[0]
                                                                    .task_completion_status !=
                                                                  TaskStatus.APPROVED
                                                                ) {
                                                                  updateAmbassadorStatus(
                                                                    ele[0]
                                                                      .ambassador_program_id,
                                                                    ele[0].ambassador_id,
                                                                    getClient.id,
                                                                    ele[0]
                                                                      .ambassador_custom_campaign_task_id,
                                                                    2,
                                                                    ""
                                                                  );
                                                                }
                                                              }}
                                                            >
                                                              {" "}
                                                              <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                x="0px"
                                                                y="0px"
                                                                width="10"
                                                                height="10"
                                                                viewBox="0 0 48 48"
                                                                style={{
                                                                  fill: "#000000",
                                                                  marginRight: 5,
                                                                }}
                                                              >
                                                                <path
                                                                  fill="#43A047"
                                                                  d="M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z"
                                                                ></path>
                                                              </svg>
                                                              {ele[0]
                                                                .task_completion_status ==
                                                                TaskStatus.APPROVED
                                                                ? "Accepted"
                                                                : "Accept"}
                                                            </IonButton>
                                                          ) : undefined}{ele[0].task_completion_status ==
                                                            TaskStatus.REJECTED ? undefined :
                                                            <IonLabel>
                                                              &nbsp;&nbsp;&nbsp;
                                                            </IonLabel>}
                                                          {ele[0].task_completion_status ==
                                                            TaskStatus.REJECTED ||
                                                            ele[0].task_completion_status ==
                                                            TaskStatus.PENDING ||
                                                            ele[0].task_completion_status ==
                                                            TaskStatus.INPROCESS ? (
                                                            <IonButton
                                                              color="danger"
                                                              style={{ height: 20 }}
                                                              class="reject-btn"
                                                              disabled={ele[0]
                                                                .task_completion_status ==
                                                                TaskStatus.REJECTED}
                                                              onClick={() => {
                                                                if (
                                                                  ele[0]
                                                                    .task_completion_status !=
                                                                  TaskStatus.REJECTED
                                                                ) {
                                                                  setSelectedTask(ele[0]);
                                                                  setSelectedClient(getClient.id)
                                                                  setCheckReject(true);
                                                                  // updateAmbassadorStatus(
                                                                  //   ele[0]
                                                                  //     .ambassador_program_id,
                                                                  //   ele[0].ambassador_id,
                                                                  //   getClient.id,
                                                                  //   ele[0]
                                                                  //     .ambassador_custom_campaign_task_id,
                                                                  //   3
                                                                  // );
                                                                }
                                                              }}
                                                            >
                                                              <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                x="0px"
                                                                y="0px"
                                                                width="10"
                                                                height="10"
                                                                viewBox="0 0 48 48"
                                                                style={{
                                                                  fill: "#000000",
                                                                  marginRight: 5,
                                                                }}
                                                              >
                                                                <path
                                                                  fill="#F44336"
                                                                  d="M21.5 4.5H26.501V43.5H21.5z"
                                                                  transform="rotate(45.001 24 24)"
                                                                ></path>
                                                                <path
                                                                  fill="#F44336"
                                                                  d="M21.5 4.5H26.5V43.501H21.5z"
                                                                  transform="rotate(135.008 24 24)"
                                                                ></path>
                                                              </svg>
                                                              {ele[0]
                                                                .task_completion_status ==
                                                                TaskStatus.REJECTED
                                                                ? "Rejected"
                                                                : "Reject"}
                                                            </IonButton>
                                                          ) : undefined}
                                                        </IonRow>
                                                      </IonCol>
                                                      <IonCol
                                                        class="ion-text-end"
                                                        style={{
                                                          fontSize: "0.8rem",
                                                          color: "#2E77AE",
                                                          display: "flex", alignItems: "center", justifyContent: "flex-end"
                                                        }}
                                                      >
                                                        {new Date(
                                                          ele[0].updatedAt
                                                        ).toDateString()}
                                                      </IonCol>
                                                    </IonRow>
                                                  </IonCol>
                                                </IonRow>
                                              </IonGrid>
                                            </IonCardContent>
                                          </IonCard>
                                        </IonRow>
                                      </IonCol>
                                    </IonRow>);
                                  //               return (
                                  //                 // <IonRow key={index2}>
                                  //                 <IonCol>
                                  //                   <IonRow style={{ }}>
                                  //                     {ele[0].task_completion_status ==
                                  //                       TaskStatus.APPROVED ||
                                  //                     ele[0].task_completion_status ==
                                  //                       TaskStatus.PENDING ||
                                  //                     ele[0].task_completion_status ==
                                  //                       TaskStatus.INPROCESS ? (
                                  //                       <IonButton
                                  //                         color="success"
                                  //                         class="accept-btn"
                                  //                         disabled={ele[0]
                                  //                           .task_completion_status ==
                                  //                         TaskStatus.APPROVED}
                                  //                         onClick={() => {
                                  //                           if (
                                  //                             ele[0]
                                  //                               .task_completion_status !=
                                  //                             TaskStatus.APPROVED
                                  //                           ) {
                                  //                             updateAmbassadorStatus(
                                  //                               ele[0]
                                  //                                 .ambassador_program_id,
                                  //                               ele[0].ambassador_id,
                                  //                               getClient.id,
                                  //                               ele[0]
                                  //                                 .ambassador_custom_campaign_task_id,
                                  //                               2
                                  //                             );
                                  //                           }
                                  //                         }}
                                  //                       >
                                  //                         {" "}
                                  //                         <svg
                                  //                           xmlns="http://www.w3.org/2000/svg"
                                  //                           x="0px"
                                  //                           y="0px"
                                  //                           width="10"
                                  //                           height="10"
                                  //                           viewBox="0 0 48 48"
                                  //                           style={{
                                  //                             fill: "#000000",
                                  //                             marginRight: 5,
                                  //                           }}
                                  //                         >
                                  //                           <path
                                  //                             fill="#43A047"
                                  //                             d="M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z"
                                  //                           ></path>
                                  //                         </svg>
                                  //                         {ele[0]
                                  //                           .task_completion_status ==
                                  //                         TaskStatus.APPROVED
                                  //                           ? "Accepted"
                                  //                           : "Accept"}
                                  //                       </IonButton>
                                  //                     ) : undefined}
                                  //                     {ele[0].task_completion_status ==
                                  //                       TaskStatus.REJECTED?undefined:
                                  //                     <IonLabel>
                                  //                       &nbsp;&nbsp;&nbsp;
                                  //                     </IonLabel>}
                                  //                     {ele[0].task_completion_status ==
                                  //                       TaskStatus.REJECTED ||
                                  //                     ele[0].task_completion_status ==
                                  //                       TaskStatus.PENDING ||
                                  //                     ele[0].task_completion_status ==
                                  //                       TaskStatus.INPROCESS ? (
                                  //                       <IonButton
                                  //                         color="danger"
                                  //                         class="reject-btn"
                                  //                         disabled={ele[0]
                                  //                           .task_completion_status ==
                                  //                         TaskStatus.REJECTED}
                                  //                         onClick={() => {
                                  //                           if (
                                  //                             ele[0]
                                  //                               .task_completion_status !=
                                  //                             TaskStatus.REJECTED
                                  //                           ) {
                                  //                             updateAmbassadorStatus(
                                  //                               ele[0]
                                  //                                 .ambassador_program_id,
                                  //                               ele[0].ambassador_id,
                                  //                               getClient.id,
                                  //                               ele[0]
                                  //                                 .ambassador_custom_campaign_task_id,
                                  //                               3
                                  //                             );
                                  //                           }
                                  //                         }}
                                  //                       >
                                  //                         <svg
                                  //                           xmlns="http://www.w3.org/2000/svg"
                                  //                           x="0px"
                                  //                           y="0px"
                                  //                           width="10"
                                  //                           height="10"
                                  //                           viewBox="0 0 48 48"
                                  //                           style={{
                                  //                             fill: "#000000",
                                  //                             marginRight: 5,
                                  //                           }}
                                  //                         >
                                  //                           <path
                                  //                             fill="#F44336"
                                  //                             d="M21.5 4.5H26.501V43.5H21.5z"
                                  //                             transform="rotate(45.001 24 24)"
                                  //                           ></path>
                                  //                           <path
                                  //                             fill="#F44336"
                                  //                             d="M21.5 4.5H26.5V43.501H21.5z"
                                  //                             transform="rotate(135.008 24 24)"
                                  //                           ></path>
                                  //                         </svg>
                                  //                         {ele[0]
                                  //                           .task_completion_status ==
                                  //                         TaskStatus.REJECTED
                                  //                           ? "Rejected"
                                  //                           : "Reject"}
                                  //                       </IonButton>
                                  //                     ) : undefined}
                                  //                   </IonRow>
                                  //                   <IonRow>
                                  //                     {/* <IonCard style={{ width: "100%" }}>
                                  //   <IonCardContent style={{ padding: 0 }}>
                                  //     <IonGrid
                                  //       style={{
                                  //         paddingLeft: 0,
                                  //         paddingBottom: 0,
                                  //         paddingTop: 0,
                                  //       }}
                                  //     >
                                  //       <IonRow>
                                  //         <IonCol
                                  //           size="1.5"
                                  //           style={{
                                  //             paddingLeft: 0,
                                  //             paddingBottom: 0,
                                  //             paddingTop: 0,
                                  //             marginRight: 10,
                                  //           }}
                                  //         > */}

                                  //                     {/* </IonCol>
                                  //         <IonCol style={{ padding: 0 }}>
                                  //           <IonRow style={{  }}>
                                  //             <IonCol style={{ padding: 0,color: "#2E77AE" }}>
                                  //               <IonLabel style={{ fontSize: 20 }}>
                                  //                 {ele.ambassador_name}
                                  //               </IonLabel>
                                  //             </IonCol>

                                  //           </IonRow>
                                  //           <IonRow>
                                  //             <IonCol size="10" style={{border: "1px solid #E0EAF5"}}><BiLink size="20"/>&nbsp;&nbsp;&nbsp;{ele.content ?? ""}</IonCol>
                                  //           </IonRow>
                                  //           <IonRow
                                  //             style={{

                                  //               fontSize: 12,
                                  //               fontWeight: 500,
                                  //             }}
                                  //           >
                                  //             <IonCol>
                                  //               <IonLabel>Name.......</IonLabel>
                                  //             </IonCol>
                                  //             <IonCol
                                  //               class="ion-text-end"
                                  //               style={{ fontSize: 12,color: "#2E77AE", }}
                                  //             >
                                  //               {(new Date(ele.updatedAt)).toDateString()}
                                  //             </IonCol>
                                  //           </IonRow>
                                  //         </IonCol>
                                  //       </IonRow>
                                  //     </IonGrid>
                                  //   </IonCardContent>
                                  // </IonCard> */}
                                  //                   </IonRow>
                                  //                 </IonCol>
                                  //                 // </IonRow>
                                  //               );
                                }
                              )}
                              {/* </IonRow> */}
                            </IonGrid>
                          </IonCard>
                        </IonRow>
                      )
                    ) : (
                      <IonRow key={index}>
                        <IonCard
                          style={{
                            width: "100%",
                            height: 140,
                            minWidth: "625px",
                            borderRadius: 16,
                            boxShadow: "0px 1px 4px rgba(46, 119, 174, 0.2)",
                            background: "rgba(190, 212, 230, 0.1)",
                          }}
                        >
                          <IonCardContent style={{ paddingTop: '0px', paddingLeft: '0px' }}>
                            <IonGrid
                              style={{
                                paddingLeft: 0,
                                paddingBottom: 0,
                                paddingTop: 0,
                              }}
                            >
                              <IonRow>
                                <IonCol
                                  style={{
                                    paddingLeft: 0,
                                    paddingBottom: 0,
                                    paddingTop: 0,
                                    marginRight: 10, width: 160, minWidth: 150, maxWidth: 160
                                  }}
                                >
                                  <img
                                    src={
                                      getClient.campaign_img == "" ||
                                        getClient.campaign_img == undefined ||
                                        getClient.campaign_img == null
                                        ? defaultImage
                                        : getClient.campaign_img
                                    }
                                    style={{ height: 140, width: 160, minWidth: 150, objectFit: 'cover' }}
                                  />
                                </IonCol>
                                <IonCol style={{ paddingTop: '5px' }}>
                                  <IonRow style={{ color: "#2E77AE" }}>
                                    <IonCol style={{ paddingLeft: "0px" }}>
                                      <IonLabel
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "1.1rem",
                                          cursor: "pointer"
                                        }}
                                        onClick={() => {
                                          if (previousOpenIndex != -1) {
                                            openCampign[previousOpenIndex] =
                                              false;
                                          }
                                          setPreviousOpenIndex(index);
                                          openCampign[index] = true;
                                          setUpdate(update + 1);
                                        }}
                                      >
                                        {getClient.title
                                          .substring(0, 1)
                                          .toUpperCase() +
                                          getClient.title.substring(1)}
                                      </IonLabel>
                                    </IonCol>
                                    <IonCol class="ion-text-end">
                                      <BsInfoCircle
                                        size="20"
                                        style={{ marginRight: 10, cursor: "pointer" }}
                                        onClick={() => {
                                          if (previousOpenIndex != -1) {
                                            openCampign[previousOpenIndex] =
                                              false;
                                          }
                                          setPreviousOpenIndex(index);
                                          openCampign[index] = true;
                                          setUpdate(update + 1);
                                        }}
                                      ></BsInfoCircle>

                                      <AiOutlineMore size="20" style={{ cursor: "pointer" }} id={"selectionDot" + index.toString()} onClick={() => {
                                        setClientDetails(getClient);
                                        setOpen(index);
                                        setShowSeectionPopover(true);
                                      }} />
                                    </IonCol>
                                  </IonRow>
                                  <IonRow>
                                    <IonLabel
                                      style={{
                                        // fontWeight: 400,
                                        background: " #2E77AE",
                                        borderRadius: "8px",
                                        color: "white",
                                      }}
                                    >
                                      &nbsp;&nbsp;
                                      {getClient.automatic == 0
                                        ? "Manual"
                                        : "Auto"}
                                      &nbsp;&nbsp;
                                    </IonLabel>
                                    &nbsp;&nbsp;
                                    <IonLabel
                                      style={{
                                        background: " #2E77AE",
                                        borderRadius: "8px",
                                        color: "white"
                                      }}
                                    >
                                      &nbsp;&nbsp;{getClient.status == "Social" ? "Engagement" : getClient.status}&nbsp;&nbsp;
                                    </IonLabel>
                                    {getClient.platform == SocialCampaignPlatform.Twitter ?
                                      <>&nbsp;&nbsp;
                                        <IonLabel
                                          style={{
                                            background: " #2E77AE",
                                            borderRadius: "8px",
                                            color: "white"
                                          }}
                                        >
                                          &nbsp;&nbsp;{"Twitter"}&nbsp;&nbsp;
                                        </IonLabel></> :
                                      getClient.platform == SocialCampaignPlatform.Instagram ? <>&nbsp;&nbsp;
                                        <IonLabel
                                          style={{
                                            background: " #2E77AE",
                                            borderRadius: "8px",
                                            color: "white"
                                          }}
                                        >
                                          &nbsp;&nbsp;{"Instagram"}&nbsp;&nbsp;
                                        </IonLabel></> :
                                        null}
                                  </IonRow>
                                  <IonRow style={{ paddingTop: "5px" }}>
                                    <IonLabel
                                      style={{
                                        fontWeight: "bold",
                                        paddingLeft: 5,
                                        marginBottom: 10,
                                      }}
                                    >
                                      RP {getClient.campaign_reward_points}
                                    </IonLabel>
                                  </IonRow>
                                  <IonRow
                                    style={{
                                      color: "#2E77AE",
                                      fontSize: "1rem",
                                      fontWeight: 500,
                                      display: "flex",
                                    }}
                                  >
                                    <IonCol style={{ display: "flex", alignItems: "center" }}>
                                      <BsPeople></BsPeople>&nbsp;&nbsp;
                                      {getClient.ambassador_enrolled}
                                    </IonCol>
                                    <IonCol style={{ display: "flex", alignItems: "center" }}>
                                      <BsClipboardCheck></BsClipboardCheck>&nbsp;&nbsp;

                                      {
                                        Object.keys(getClient.submissionsList)
                                          .length
                                      }
                                    </IonCol>
                                    {/* <IonCol></IonCol> */}
                                    <IonCol
                                      class="ion-text-end"
                                      style={{ fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "flex-end" }}
                                    >
                                      {reverse(getClient.start_date.substring(
                                        0,
                                        10
                                      ))}

                                      -{" "}
                                      {reverse(getClient.end_date.substring(
                                        0,
                                        10
                                      ))}
                                    </IonCol>
                                  </IonRow>
                                </IonCol>
                              </IonRow>
                            </IonGrid>
                          </IonCardContent>
                        </IonCard>
                      </IonRow>
                    );
                  }
                })}
              </IonCol>
              <IonCol></IonCol>
            </IonGrid>
          )}
        </IonCol>
        <IonCol class="reportsRight">
          <IonGrid style={{ minWidth: "250px" }}>
            <IonRow class="reportsCalendarHead">Calendar</IonRow>
            <IonRow class="reportsCalendar">
              <IonCard class="calendarCard">
                <IonCardContent class="calendarContent">
                  <Calendar
                    minDate={new Date(new Date().setDate(date.getDate() - 19000))}
                    maxDate={new Date(new Date().setDate(date.getDate() + 5000))}
                    selectRange
                    onChange={(val: any) => {
                      setRangeStart(val[0]);
                      setRangeEnd(val[1]);
                    }}
                    defaultValue={[range_start, range_end]}
                  />
                </IonCardContent>
              </IonCard>
            </IonRow>
            {topCamp && topCamp.length > 0 ?
              (
                <>
                  <IonRow >
                    <IonCol class="topPerformerHead">
                      Top Campaigns
                    </IonCol>
                    {/* <IonCol size="3" class="topPerformerView">
                            <a href="/userleaderboard" style={{ color: "#1D7D81" }}>View All</a>
                        </IonCol> */}
                  </IonRow>
                  <IonRow>
                    <IonGrid style={{ paddingLeft: "0px" }}>

                      {topCamp.map((camp) => {
                        return (
                          <IonRow>
                            <IonCard class="reportsPerformerCard">
                              <IonCardContent class="reportsPerformerCardContent">
                                <IonGrid>
                                  <IonRow>
                                    <IonCol class="performanceCardImgWrapper">
                                      <img src={isStringEmpty(camp.campaign_img) ? defaultImage : camp.campaign_img} className="ClientLeaderboardImage" />
                                    </IonCol>
                                    <IonCol class="campaignReportsTop">
                                      <span className="performerName">
                                        {camp.title}
                                      </span>
                                      <span className="performerName campaignReportEff">
                                        {Math.ceil(camp.Efficiency * 100)}%
                                      </span>
                                    </IonCol>
                                  </IonRow>
                                </IonGrid>
                              </IonCardContent>
                            </IonCard>
                          </IonRow>
                        );
                      })}


                    </IonGrid>
                  </IonRow></>)
              : null}
          </IonGrid>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ClientCampaignTab;
