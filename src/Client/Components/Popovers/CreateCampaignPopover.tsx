import {
  IonRow,
  IonCol,
  IonImg,
  IonButton,
  IonGrid,
  IonIcon,
  IonInput,
  IonPopover,
  IonSegment,
  IonContent,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonModal,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonAlert,
} from "@ionic/react";
import defaultImage from "../../../Assets/Images/RewardCreationTemp.svg";
import { close } from "ionicons/icons";
import buzz from "../../../Assets/Images/buzz.png";
import dot from "../../../Assets/Images/dot.png";
import lineVertical from "../../../Assets/Images/lineVertical.png";
import line from "../../../Assets/Images/Line1.png";
import createClientService from "../../Services/createClientService";
import { menuController } from "@ionic/core";
import { socialList } from "../../Models/socialList";
import { LoginMetadata } from "../../Models/LoginMetadata";
import { useState } from "react";
import { CampaignTaskResponse } from "../../Models/CampaignTask";
import { FileService } from "../../../Admin/Services/ImageUploadService";
import ImageUploadLoading from "../../../Admin/components/ImageUploadLoading";
import { ImageExtensions } from "../../../Admin/Constants/ImageUploadConstant";
import { convertToLocale, isStringEmpty } from "../../../Util/BasicUtilityFunctions";
import moment from "moment";
import { SocialCampaignPlatform, SocialCampaignTaskType } from "../../Constants/CampaignStatusConstant";
import { IoWarningOutline } from "react-icons/io5";
interface CreateCampaignPopoverProps {
  loginMetadata: LoginMetadata;
  showPopover: boolean;
  showPopover2: boolean;
  showPopover3: boolean;
  setShowPopover: (value: boolean) => void;
  setShowPopover2: (value: boolean) => void;
  setShowPopover3: (value: boolean) => void;
  pop1: boolean;
  pop2: boolean;
  pop3: boolean;
  pop4: boolean;
  pop5: boolean;
  pop6: boolean;
  setPop1: (value: boolean) => void;
  setPop2: (value: boolean) => void;
  setPop3: (value: boolean) => void;
  setPop4: (value: boolean) => void;
  setPop5: (value: boolean) => void;
  setPop6: (value: boolean) => void;
  campaignData: CampaignTaskResponse;
  setCampaignData: (value: CampaignTaskResponse) => void;
  setUpdate: (value: number) => void;
  update: number;
  Taskpop1: boolean;
  Taskpop2: boolean;
  Taskpop3: boolean;
  newcampaign: boolean;
  setTaskPop1: (value: boolean) => void;
  setTaskPop2: (value: boolean) => void;
  setTaskPop3: (value: boolean) => void;
  customTask: socialList[];
  option: number;
  GetAllPackage: (option: number) => void;
  checkEdit: boolean;
}

const CreateCampaignPopover: React.FC<CreateCampaignPopoverProps> = ({
  loginMetadata,
  showPopover,
  showPopover2,
  showPopover3,
  setShowPopover,
  setShowPopover2,
  setShowPopover3,
  pop1,
  pop2,
  pop3,
  pop4,
  pop5,
  pop6,
  setPop1,
  setPop2,
  setPop3,
  setPop4,
  setPop5,
  setPop6,
  campaignData,
  setCampaignData,
  setUpdate,
  update,
  Taskpop1,
  Taskpop2,
  Taskpop3,
  newcampaign,
  setTaskPop1,
  setTaskPop2,
  setTaskPop3,
  customTask,
  option,
  GetAllPackage,
  checkEdit,
}) => {
  const openMenu = async () => {
    await menuController.open();
  };
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [social, setSocial] = useState(false);
  const [automatic, setAutomatic] = useState(false);
  const [UGC, setUGC] = useState(false);
  const [content1, setContent1] = useState(false);
  const [content2, setContent2] = useState(false);
  const [content3, setContent3] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alert1, setAlert1] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const reverse = (str: string) => {
    const date = str;

    const [year, month, day] = date.split('-');

    const result = [day, month, year].join('-');

    return result;
  }
  const upload = (event: any) => {
    if (
      !event ||
      !event.target ||
      !event.target.files ||
      event.target.files.length === 0
    ) {
      return;
    }
    if (event.target.files[0].size <= "524288") {

      setIsUploading(true);

      let file = event.target.files[0] as File;
      FileService.UploadFile(loginMetadata, file, file.name).then(
        (fileResponse: any) => {
          console.log(fileResponse);
          campaignData.custom_campaign.campaign_img = fileResponse.Location;
          setIsUploading(false);
        }
      );
    }
    else {
      setAlert(true);
    }
  };
  let taskNumber = "0";

  return (
    <span>

      <IonModal
        isOpen={showModal}
        className="modelDesign"
        onDidDismiss={() => {
          setShowModal(false);
        }}
      >
        <IonContent className="contentDesign2">
          <IonDatetime
            className="contentDesign"
            minuteValues="0,15,30,45"
            max={isStringEmpty(campaignData.custom_campaign.end_date) ? moment(new Date(new Date().setFullYear(new Date().getFullYear() + 1))).format() : campaignData.custom_campaign.end_date}
            value={campaignData.custom_campaign.start_date}
            showDefaultButtons={true}
            onIonChange={(ev) => {
              (campaignData.custom_campaign.start_date = convertToLocale(
                ev.detail.value!
              ))
            }
            }
          ></IonDatetime>
        </IonContent>
      </IonModal>
      <IonModal
        isOpen={showModal2}
        onDidDismiss={() => {
          setShowModal2(false);
        }}
        className="modelDesign"
      >
        <IonContent className="contentDesign2">
          <IonDatetime
            className="contentDesign"
            minuteValues="0,15,30,45"
            showDefaultButtons={true}
            min={isStringEmpty(campaignData.custom_campaign.start_date) ? moment(new Date()).format() : campaignData.custom_campaign.start_date}
            value={campaignData.custom_campaign.end_date}
            onIonChange={(ev) => {
              (campaignData.custom_campaign.end_date = convertToLocale(
                ev.detail.value!
              ))
            }
            }
          ></IonDatetime>
        </IonContent>
      </IonModal>

      <IonPopover
        id="popover-bottom"
        isOpen={showPopover}
        backdropDismiss={false}
        onDidDismiss={() => {
          setShowPopover(false);
        }}
      >
        <IonRow class="ClientCampaignPopoverCloseButton">
          <IonIcon
            md={close}
            class="iconSize"
            size="large"
            onClick={() => {
              setShowPopover(false);
              setPop1(false);
              setPop2(true);
              setPop3(true);
              setPop4(true);
              setPop5(true);
              setCampaignData(new CampaignTaskResponse());
              if (newcampaign) {
                setSocial(false);
                setAutomatic(false);
                setUGC(false);
              }
            }}
          ></IonIcon>
        </IonRow>
        <IonRow class="popTitle">{newcampaign ? "Create Campaign" : "Edit Campaign"}</IonRow>
        <form onSubmit={(e) => {
          setShowPopover(true);
          openMenu();
          setPop1(false);
          setPop2(true);
          setPop3(true);
          setPop4(true);
          setPop5(true);
          setPop6(true);
          setShowPopover(false);
          setShowPopover2(true);
          e.preventDefault();
        }}>
          <IonContent>
            <IonItem disabled={pop1} className="" lines="none">
              <IonGrid>
                <IonRow className="CampaignTitle">
                  <IonImg src={dot} class="imageDot" />
                  Campaign Name&nbsp;<span style={{ "color": "red" }}>*</span>
                </IonRow>

                <IonRow>
                  <IonCol size="0.3" class="popOverContent">
                    <IonImg src={lineVertical} class="verticalLine" />
                  </IonCol>
                  <IonCol class="ion-item-start">
                    <IonItem class="inputPopOver" lines="none">
                      <IonGrid>
                        <IonRow>
                          <IonInput
                            value={campaignData.custom_campaign.title}
                            placeholder="Title"
                            class="inputPopover1"
                            onIonChange={(e) => {
                              campaignData.custom_campaign.title = e.detail.value
                                ? e.detail.value
                                : "";
                              setUpdate(update + 1);
                            }}
                          // required={true}
                          />
                        </IonRow>
                        <IonRow>
                          <IonImg src={line} class="horizontalLine" />
                        </IonRow>
                      </IonGrid>
                    </IonItem>

                    <IonRow>
                      <IonButton
                        fill="outline"
                        class="ClientRewardsButton4"
                        expand="full"
                        onClick={() => {
                          setShowPopover(true);
                          openMenu();
                          setPop1(true);
                          setPop2(false);
                        }}
                      >
                        Next
                      </IonButton>
                    </IonRow>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
            <IonItem disabled={pop2} className="" lines="none">
              <IonGrid>
                <IonRow className="CampaignTitle1">
                  <IonImg src={dot} class="imageDot" />
                  Campaign Completion style&nbsp;<span style={{ "color": "red" }}>*</span>
                </IonRow>

                <IonRow>
                  <IonCol size="0.3" class="popOverContent">
                    <IonImg src={lineVertical} class="verticalLine" />
                  </IonCol>
                  <IonCol class="ion-item-start">
                    <IonItem class="inputPopOver" lines="none">
                      <IonGrid>
                        <IonRadioGroup
                          value={campaignData.custom_campaign.automatic == 1 ? "Automatic" :
                            "Manual"}
                          onIonChange={(e) => {
                            campaignData.custom_campaign.automatic =
                              e.detail.value == "Manual"
                                ? 0
                                : 1;
                          }}
                        >
                          <IonRow >
                            <IonCol class="radioButton">
                              <IonItem lines="none">
                                <IonRadio
                                  disabled={!newcampaign}
                                  onClick={() => { setAutomatic(false) }}
                                  slot="start"
                                  value="Manual"
                                  class="radioColor"
                                />
                                <IonLabel>Manual</IonLabel>
                              </IonItem>
                            </IonCol>
                            <IonCol class="radioButton">
                              <IonItem lines="none">
                                <IonRadio
                                  disabled={!newcampaign}
                                  onClick={() => { setAutomatic(true) }}
                                  slot="start"
                                  value="Automatic"
                                  class="radioColor"
                                />
                                <IonLabel>Automatic</IonLabel>
                              </IonItem>
                            </IonCol>
                          </IonRow>
                        </IonRadioGroup>
                      </IonGrid>
                    </IonItem>
                    {automatic || campaignData.custom_campaign.automatic == 1 ? <IonRow class="warningWrapper">
                      <span className="warning"><IoWarningOutline /> WARNING:</span><span>Best when you trust your ambassadors and they know what they are doing. Also, note that as soon as they submit their work, the RP will automatically be assigned. Only use it when you know what you are doing.</span>
                    </IonRow> : <IonRow class="warningWrapper">Verify ambassador submissions manually and choose to accept or ask for resubmission. Best for quality check.</IonRow>}

                    <IonRow>
                      <IonButton
                        fill="outline"
                        class="ClientRewardsButton4"
                        expand="full"
                        onClick={() => {
                          setShowPopover(true);
                          openMenu();
                          setPop2(true);
                          setPop3(false);
                        }}
                      >
                        Next
                      </IonButton>
                      <IonButton
                        fill="outline"
                        class="ClientRewardsButton4"
                        expand="full"
                        onClick={() => {
                          setShowPopover(true);
                          openMenu();
                          setPop2(true);
                          setPop1(false);
                        }}
                      >
                        Back
                      </IonButton>
                    </IonRow>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
            <IonItem disabled={pop3} className="" lines="none">
              <IonGrid>
                <IonRow className="CampaignTitle1">
                  <IonImg src={dot} class="imageDot" />
                  Schedule Campaign&nbsp;<span style={{ "color": "red" }}>*</span>
                </IonRow>

                <IonRow>
                  <IonCol size="0.3" class="popOverContent">
                    <IonImg src={lineVertical} class="verticalLine" />
                  </IonCol>
                  <IonCol class="ion-item-start">
                    <IonItem class="inputPopOver" lines="none">
                      <IonGrid>
                        <IonRow>
                          The Campaign will start on{" "}
                          <IonRow
                            className="inputUnderline"
                            style={{
                              marginHorizontal: 4,
                              paddingLeft: 8,
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              setShowModal(true);
                            }}
                          >
                            {reverse(campaignData.custom_campaign.start_date.substring(
                              0,
                              10
                            )) == "--" ? "" : reverse(campaignData.custom_campaign.start_date.substring(
                              0,
                              10
                            ))}
                          </IonRow>{" "}
                          at{"  "}
                          <IonRow
                            className="inputUnderline"
                            onClick={() => {
                              setShowModal(true);
                            }}
                            style={{
                              marginHorizontal: 4,
                              paddingLeft: 8,
                              fontWeight: "bold",
                            }}
                          >
                            {campaignData.custom_campaign.start_date.substring(
                              11,
                              19
                            )}
                          </IonRow>
                          and end on{" "}
                          <IonRow
                            className="inputUnderline"
                            onClick={() => {
                              setShowModal2(true);
                            }}
                            style={{
                              marginHorizontal: 4,
                              paddingLeft: 8,
                              fontWeight: "bold",
                            }}
                          >
                            {reverse(campaignData.custom_campaign.end_date.substring(
                              0,
                              10
                            )) == "--" ? "" : reverse(campaignData.custom_campaign.end_date.substring(
                              0,
                              10
                            ))}
                          </IonRow>{" "}
                          at{" "}
                          <IonRow
                            className="inputUnderline"
                            onClick={() => {
                              setShowModal2(true);
                            }}
                            style={{
                              marginHorizontal: 4,
                              paddingLeft: 8,
                              fontWeight: "bold",
                            }}
                          >
                            {campaignData.custom_campaign.end_date.substring(
                              11,
                              19
                            )}
                          </IonRow>
                        </IonRow>
                      </IonGrid>
                    </IonItem>

                    <IonRow>
                      <IonButton
                        fill="outline"
                        class="ClientRewardsButton4"
                        expand="full"
                        onClick={() => {
                          setShowPopover(true);
                          openMenu();
                          setPop3(true);
                          setPop4(false);
                        }}
                      >
                        Next
                      </IonButton>
                      <IonButton
                        fill="outline"
                        class="ClientRewardsButton4"
                        expand="full"
                        onClick={() => {
                          setShowPopover(true);
                          openMenu();
                          setPop3(true);
                          setPop2(false);
                        }}
                      >
                        Back
                      </IonButton>
                    </IonRow>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
            <IonItem disabled={pop4} className="" lines="none">
              <IonGrid>
                <IonRow className="CampaignTitle1">
                  <IonImg src={dot} class="imageDot" />
                  Task and Rewards&nbsp;<span style={{ "color": "red" }}>*</span>
                </IonRow>

                <IonRow>
                  <IonCol size="0.3" class="popOverContent">
                    <IonImg src={lineVertical} class="verticalLine" />
                  </IonCol>
                  <IonCol class="ion-item-start">
                    <IonItem class="inputPopOver" lines="none">
                      <IonGrid>
                        <IonRow>
                          The Campaign will have &nbsp;
                          {/* <IonRow class="selectStyle"> */}
                          <IonSelect
                            class="SelectionStyle3"
                            interface="popover"
                            value={campaignData.custom_campaign.task_number}
                            placeholder=""
                            disabled={!newcampaign}
                            onIonChange={(e) => {
                              campaignData.custom_campaign.task_number = e
                                .detail.value
                                ? e.detail.value
                                : "1";
                              setUpdate(update + 1);
                            }}
                          >
                            <IonSelectOption value="1">1</IonSelectOption>
                            <IonSelectOption value="2">2</IonSelectOption>
                            <IonSelectOption value="3">3</IonSelectOption>
                          </IonSelect>
                          {/* </IonRow> */}
                          &nbsp; task. Carrying &nbsp;
                          <IonRow>
                            <IonInput
                              value={campaignData.custom_campaign.points}
                              placeholder=""
                              style={{ paddingBottom: "0!important" }}
                              class="inputPopover1 inputUnderline rewardsSpace"
                              onIonChange={(e) => {
                                campaignData.custom_campaign.points = e.detail
                                  .value
                                  ? e.detail.value
                                  : "0";
                                setUpdate(update + 1);
                              }}
                            // required={true}
                            />
                          </IonRow>
                          &nbsp;RP.
                        </IonRow>
                      </IonGrid>
                    </IonItem>

                    <IonRow>
                      <IonButton
                        fill="outline"
                        class="ClientRewardsButton4"
                        expand="full"
                        onClick={() => {
                          setShowPopover(true);
                          openMenu();
                          setPop4(true);
                          setPop5(false);
                          campaignData.custom_campaign.start_date = campaignData.custom_campaign.start_date
                          // campaignData.custom_campaign.start_date.concat(
                          //   // " " + popoverTime
                          // );
                        }}
                      >
                        Next
                      </IonButton>
                      <IonButton
                        fill="outline"
                        class="ClientRewardsButton4"
                        expand="full"
                        onClick={() => {
                          setShowPopover(true);
                          openMenu();
                          setPop4(true);
                          setPop3(false);

                        }}
                      >
                        Back
                      </IonButton>
                    </IonRow>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
            <IonItem disabled={pop5} className="" lines="none">
              <IonGrid>
                <IonRow className="CampaignTitle1">
                  <IonImg src={dot} class="imageDot" />
                  Campaign Image
                </IonRow>
                <IonRow>
                  <IonCol size="0.3" class="popOverContent">
                    <IonImg src={lineVertical} class="verticalLine" />
                  </IonCol>
                  <IonCol class="ion-item-start">
                    <IonItem class="inputPopOver" lines="none">
                      <IonRow class="borderset2">
                        <IonGrid style={{ height: 300, width: 255 }}>
                          {!isUploading &&
                            campaignData.custom_campaign.campaign_img == "" ? (
                            <IonSegment mode="md" class="uploadButtonSegemnt">
                              <IonAlert
                                isOpen={alert}
                                message="Image size should be less than 512KB"
                                onDidDismiss={() => {
                                  setAlert(false);
                                }}
                                backdropDismiss={true}
                              ></IonAlert>
                              <IonButton fill="outline">
                                <input
                                  id="rewardImage"
                                  hidden
                                  type="file"
                                  name="file"
                                  data-max-size="2048"
                                  accept={ImageExtensions}
                                  onChange={(e) => {
                                    upload(e);
                                  }}
                                />
                                <label
                                  className="labelForIMageUpload"
                                  htmlFor="rewardImage"
                                  title="Click to upload Image"
                                >
                                  {" "}
                                  &nbsp;&nbsp;
                                </label>
                                Select Image
                              </IonButton>
                            </IonSegment>
                          ) : isUploading ? (
                            <IonSegment mode="md">
                              <IonImg src={defaultImage} />
                              <ImageUploadLoading />
                            </IonSegment>
                          ) : (
                            <IonSegment mode="md">
                              <IonImg
                                class="rewardUploadedImage"
                                src={campaignData.custom_campaign.campaign_img}
                              />
                              <input
                                id="rewardImage2"
                                hidden
                                type="file"
                                name="file"
                                data-max-size="2048"
                                accept={ImageExtensions}
                                onChange={(e) => {
                                  upload(e);
                                }}
                              />
                              <label
                                className="labelForIMageUpload2"
                                htmlFor="rewardImage2"
                              >
                                {" "}
                                &nbsp;&nbsp;
                              </label>
                            </IonSegment>
                          )}
                        </IonGrid>
                      </IonRow>
                    </IonItem>
                    <IonRow>
                      <IonButton
                        fill="outline"
                        class="ClientRewardsButton4"
                        expand="full"
                        onClick={() => {
                          setShowPopover(true);
                          openMenu();
                          setPop5(true);
                          setPop6(false);
                        }}
                      >
                        Next
                      </IonButton>
                      <IonButton
                        fill="outline"
                        class="ClientRewardsButton4"
                        expand="full"
                        onClick={() => {
                          setShowPopover(true);
                          openMenu();
                          setPop5(true);
                          setPop4(false);
                        }}
                      >
                        Back
                      </IonButton>
                    </IonRow>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>

            <IonItem disabled={pop6} className="" lines="none">
              <IonGrid>
                <IonRow className="CampaignTitle1">
                  <IonImg src={dot} class="imageDot" />
                  Campaign Type & Summary&nbsp;<span style={{ "color": "red" }}>*</span>
                </IonRow>

                <IonRow>
                  <IonCol size="0.3" class="popOverContent">
                    <IonImg src={lineVertical} class="verticalLine" />
                  </IonCol>
                  <IonCol class="ion-item-start">
                    <IonItem class="inputPopOver" lines="none">
                      <IonGrid>
                        <IonRow>Campaign Type:</IonRow>
                        <IonRadioGroup
                          value={campaignData.custom_campaign.status == "Referal" ? "Referal" :
                            campaignData.custom_campaign.status == "Social" ? "Social" :
                              campaignData.custom_campaign.status == "UGC" ? "UGC" : "Custom"}
                          onIonChange={(e) => {
                            campaignData.custom_campaign.status =
                              e.detail.value == "Custom"
                                ? "Custom"
                                : e.detail.value == "Social"
                                  ? "Social"
                                  : e.detail.value == "UGC" ?
                                    "UGC"
                                    : "Referal";
                            setUpdate(update + 1);
                            // debugger;
                            if (e.detail.value == "Social") {
                              campaignData.custom_campaign.platform = SocialCampaignPlatform.Twitter
                              if (campaignData.custom_campaign.task_number == "1") {
                                customTask[0].task_type = SocialCampaignTaskType.Follow
                              }
                              else if (campaignData.custom_campaign.task_number == "2") {

                                customTask[0].task_type = SocialCampaignTaskType.Follow
                                customTask[1].task_type = SocialCampaignTaskType.Follow
                              }
                              else {

                                customTask[0].task_type = SocialCampaignTaskType.Follow
                                customTask[1].task_type = SocialCampaignTaskType.Follow
                                customTask[2].task_type = SocialCampaignTaskType.Follow
                              }
                            }
                            if (e.detail.value == "UGC") {
                              if (campaignData.custom_campaign.task_number == "1") {
                                customTask[0].option = 0
                              }
                              else if (campaignData.custom_campaign.task_number == "2") {

                                customTask[0].option = 0
                                customTask[1].option = 0
                              }
                              else {

                                customTask[0].option = 0
                                customTask[1].option = 0
                                customTask[2].option = 0
                              }

                            }
                          }}
                        >
                          <IonRow >
                            {/* <IonCol class="radioButton">
                              <IonItem lines="none">
                                <IonRadio
                                  disabled={true}
                                  slot="start"
                                  value="Referal"
                                  class="radioColor"
                                />
                                <IonLabel>Referal</IonLabel>
                              </IonItem>
                            </IonCol> */}
                            <IonCol class="radioButton">
                              <IonItem lines="none">
                                <IonRadio
                                  onClick={() => { setSocial(false); setUGC(false) }}
                                  disabled={!newcampaign}

                                  slot="start"
                                  value="Custom"
                                  class="radioColor"
                                />
                                <IonLabel>Custom</IonLabel>
                              </IonItem>
                            </IonCol>
                            <IonCol class="radioButton">
                              <IonItem lines="none">
                                <IonRadio
                                  onClick={() => { setSocial(true); setUGC(false) }}
                                  disabled={!newcampaign}
                                  slot="start"
                                  value="Social"
                                  class="radioColor"
                                />
                                <IonLabel>Social</IonLabel>
                              </IonItem>
                            </IonCol>
                            <IonCol class="radioButton">
                              <IonItem lines="none">
                                <IonRadio
                                  onClick={() => { setSocial(false); setUGC(true) }}
                                  disabled={!newcampaign}
                                  slot="start"
                                  value="UGC"
                                  class="radioColor"
                                />
                                <IonLabel>UGC</IonLabel>
                              </IonItem>
                            </IonCol>
                          </IonRow>
                        </IonRadioGroup>

                        {social || campaignData.custom_campaign.status == "Social" ?
                          <IonRadioGroup

                            value={campaignData.custom_campaign.platform == SocialCampaignPlatform.Youtube ? SocialCampaignPlatform.Youtube :
                              campaignData.custom_campaign.platform == SocialCampaignPlatform.Twitter ? SocialCampaignPlatform.Twitter :
                                SocialCampaignPlatform.Instagram}
                            onIonChange={(e) => {
                              campaignData.custom_campaign.platform =
                                e.detail.value == SocialCampaignPlatform.Youtube
                                  ? SocialCampaignPlatform.Youtube
                                  : e.detail.value == SocialCampaignPlatform.Twitter
                                    ? SocialCampaignPlatform.Twitter
                                    : SocialCampaignPlatform.Instagram;
                              setUpdate(update + 1);
                            }}
                          >
                            <IonRow >
                              <IonCol class="radioButton">
                                <IonItem lines="none"
                                >
                                  <IonRadio
                                    disabled={true}
                                    defaultChecked={newcampaign}
                                    slot="start"
                                    value={SocialCampaignPlatform.Youtube}
                                    class="radioColor"
                                  />
                                  <IonLabel>Youtube</IonLabel>
                                </IonItem>
                              </IonCol>
                              <IonCol class="radioButton">
                                <IonItem lines="none">
                                  <IonRadio
                                    disabled={!newcampaign}
                                    slot="start"
                                    value={SocialCampaignPlatform.Twitter}
                                    class="radioColor"
                                  />
                                  <IonLabel>Twitter</IonLabel>
                                </IonItem>
                              </IonCol>
                              <IonCol class="radioButton">
                                <IonItem lines="none">
                                  <IonRadio
                                    disabled={true}
                                    slot="start"
                                    value={SocialCampaignPlatform.Instagram}
                                    class="radioColor"
                                  />
                                  <IonLabel>Instagram</IonLabel>
                                </IonItem>
                              </IonCol>
                            </IonRow>
                          </IonRadioGroup>
                          : <></>}
                        <IonItem class="inputPopOver" lines="none">
                          <IonGrid>
                            <IonRow>
                              <IonInput
                                value={campaignData.custom_campaign.description}
                                placeholder="Summary(Optional)"
                                class="inputPopover1 "
                                onIonChange={(e) => {
                                  campaignData.custom_campaign.description = e
                                    .detail.value
                                    ? e.detail.value
                                    : "";
                                  setUpdate(update + 1);
                                }}
                              />
                            </IonRow>
                            <IonRow>
                              <IonImg src={line} class="horizontalLine" />
                            </IonRow>
                          </IonGrid>
                        </IonItem>
                      </IonGrid>
                    </IonItem>

                    <IonRow>
                      <IonButton
                        fill="outline"
                        class="ClientRewardsButton4"
                        expand="full"
                        // onClick={() => {
                        //   setShowPopover(true);
                        //   openMenu();
                        //   setPop1(false);
                        //   setPop2(true);
                        //   setPop3(true);
                        //   setPop4(true);
                        //   setPop5(true);
                        //   setShowPopover(false);
                        //   setShowPopover2(true);
                        // }}
                        type="submit"
                      >
                        Next
                      </IonButton>
                      <IonButton
                        fill="outline"
                        class="ClientRewardsButton4"
                        expand="full"
                        onClick={() => {
                          setShowPopover(true);
                          openMenu();
                          setPop5(false);
                          setPop6(true);
                        }}
                      >
                        Back
                      </IonButton>
                    </IonRow>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          </IonContent>
        </form>
      </IonPopover>
      <IonPopover
        id="popover-bottom"
        isOpen={showPopover2}
        backdropDismiss={false}
        onDidDismiss={() => {
          setShowPopover2(false);
        }}
      >
        <IonRow class="ClientCampaignPopoverCloseButton">
          <IonIcon
            md={close}
            class="iconSize"
            size="large"
            onClick={() => {
              setShowPopover2(false);
              setTaskPop1(false);
              setTaskPop2(true);
              setTaskPop3(true);
              if (newcampaign) {
                setSocial(false);
                setUGC(false);
                setAutomatic(false);
                setContent1(false);
                setContent2(false);
                setContent3(false);
              }
              // setTaskPop4(true);
            }}
          ></IonIcon>
        </IonRow>
        <IonRow class="popTitle">{newcampaign ? "Create Task" : "Update Task"}</IonRow>
        <IonContent>
          <IonItem disabled={Taskpop1} className="" lines="none">
            <IonGrid>
              <IonRow className="CampaignTitle">
                <IonImg src={dot} class="imageDot" />
                Task 1
              </IonRow>

              <IonRow>
                <IonCol size="0.3" class="popOverContent">
                  <IonImg src={lineVertical} class="verticalLine2" />
                </IonCol>
                <IonCol class="ion-item-start">
                  <IonItem class="inputPopOver" lines="none">
                    <IonGrid>
                      <IonRow>
                        <IonInput
                          value={customTask[0] ? customTask[0].title : ""}
                          placeholder="Enter Task Name"
                          class="inputPopover1"
                          onIonChange={(e) => {
                            customTask[0].title = e.detail.value ? e.detail.value : "";
                            setUpdate(update + 1);
                          }}
                        />
                      </IonRow>
                      <IonRow>
                        <IonImg src={line} class="horizontalLine" />
                      </IonRow>
                    </IonGrid>
                  </IonItem>
                  <IonItem class="inputPopOver" lines="none">
                    <IonGrid>
                      <IonRow>
                        <IonInput
                          value={customTask[0] ? customTask[0].description : ""}
                          placeholder="Enter Task Summary"
                          class="inputPopover1"
                          onIonChange={(e) => {
                            customTask[0].description = e.detail.value
                              ? e.detail.value
                              : "";
                            setUpdate(update + 1);
                          }}
                        />
                      </IonRow>
                      <IonRow>
                        <IonImg src={line} class="horizontalLine" />
                      </IonRow>
                    </IonGrid>
                  </IonItem>
                  <IonItem class="inputPopOver" lines="none">
                    <IonGrid>
                      <IonRow>
                        <IonInput
                          value={customTask[0] ? customTask[0].link : ""}
                          placeholder="Link"
                          class="inputPopover1"
                          onIonChange={(e) => {
                            customTask[0].link = e.detail.value ? e.detail.value : "";
                            setUpdate(update + 1);
                          }}
                        />
                      </IonRow>
                      <IonRow>
                        <IonImg src={line} class="horizontalLine" />
                      </IonRow>
                    </IonGrid>
                  </IonItem>



                  {social || campaignData.custom_campaign.status == "Social" ?

                    <IonRadioGroup

                      value={
                        customTask[0] ? customTask[0].task_type == SocialCampaignTaskType.Like ?
                          SocialCampaignTaskType.Like : customTask[0].task_type == SocialCampaignTaskType.Share ? SocialCampaignTaskType.Share :
                            customTask[0].task_type == SocialCampaignTaskType.Comment ? SocialCampaignTaskType.Comment :
                              SocialCampaignTaskType.Follow : ""}
                      onIonChange={(e) => {

                        customTask[0].task_type =
                          e.detail.value == SocialCampaignTaskType.Like
                            ? SocialCampaignTaskType.Like
                            : e.detail.value == SocialCampaignTaskType.Share
                              ? SocialCampaignTaskType.Share
                              : e.detail.value == SocialCampaignTaskType.Comment
                                ? SocialCampaignTaskType.Comment
                                : SocialCampaignTaskType.Follow;
                        setUpdate(update + 1);
                      }}
                    >
                      <IonRow >
                        <IonCol class="radioButton" size="6">
                          <IonItem lines="none"
                          >
                            <IonRadio
                              slot="start"
                              value={SocialCampaignTaskType.Like}
                              class="radioColor"
                            />
                            <IonLabel>Like</IonLabel>
                          </IonItem>
                        </IonCol>
                        <IonCol class="radioButton" size="6">
                          <IonItem lines="none">
                            <IonRadio
                              slot="start"
                              value={SocialCampaignTaskType.Share}
                              class="radioColor"
                            />
                            <IonLabel>Share</IonLabel>
                          </IonItem>
                        </IonCol>
                        <IonCol class="radioButton" size="6">
                          <IonItem lines="none">
                            <IonRadio

                              slot="start"
                              value={SocialCampaignTaskType.Follow}
                              class="radioColor"
                            />
                            <IonLabel>Follow</IonLabel>
                          </IonItem>
                        </IonCol>
                        <IonCol class="radioButton" size="6">
                          <IonItem lines="none">
                            <IonRadio
                              slot="start"
                              value={SocialCampaignTaskType.Comment}
                              class="radioColor"
                            />
                            <IonLabel>Comment</IonLabel>
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    </IonRadioGroup>
                    : <></>}

                  {UGC || campaignData.custom_campaign.status == "UGC" ?
                    (<IonGrid>
                      <IonRadioGroup
                        value={customTask[0] ? customTask[0].option == 0 ? "Content" :
                          "Publish" : null}
                        onIonChange={(e) => {
                          customTask[0].option =
                            e.detail.value == "Content"
                              ? 0
                              : 1;
                        }}
                      >
                        <IonRow >
                          <IonCol class="radioButton">
                            <IonItem lines="none">
                              <IonRadio
                                disabled={!newcampaign}
                                onClick={() => { setContent1(false) }}
                                slot="start"
                                value="Content"
                                class="radioColor"
                              />
                              <IonLabel>Collect content</IonLabel>
                            </IonItem>
                          </IonCol>
                          <IonCol class="radioButton">
                            <IonItem lines="none">
                              <IonRadio
                                disabled={!newcampaign}
                                onClick={() => { setContent1(true) }}
                                slot="start"
                                value="Publish"
                                class="radioColor"
                              />
                              <IonLabel>Publish and share links</IonLabel>
                            </IonItem>
                          </IonCol>
                        </IonRow>
                      </IonRadioGroup>
                      {content1 || customTask[0].option == 1 ? <IonRow class="warningWrapper">
                        Creators own content. Best for organic reach
                      </IonRow> : <IonRow class="warningWrapper">
                        You own the copyright, Best for reusing content for your own publishing and ads
                      </IonRow>}
                    </IonGrid>)

                    : null}

                  <IonRow>
                    {campaignData.custom_campaign.task_number == "1" ? (
                      <IonButton
                        fill="outline"
                        class="ClientRewardsButton4"
                        expand="full"
                        onClick={() => {
                          openMenu();
                          setTaskPop1(true);
                          setTaskPop2(false);
                          if (newcampaign)
                            campaignData.custom_task.push(customTask[0]);
                          setShowPopover2(false);
                          setShowPopover3(true);
                        }}
                      >
                        Next
                      </IonButton>
                    ) : (
                      <IonButton
                        fill="outline"
                        class="ClientRewardsButton4"
                        expand="full"
                        onClick={() => {
                          openMenu();
                          setTaskPop1(true);
                          setTaskPop2(false);
                          // if (newcampaign)
                          //   campaignData.custom_task.push(customTask[0]);
                        }}
                      >
                        Next
                      </IonButton>
                    )}
                  </IonRow>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
          {campaignData.custom_campaign.task_number == "2" ||
            campaignData.custom_campaign.task_number == "3" ? (
            <IonItem disabled={Taskpop2} className="" lines="none">
              <IonGrid>
                <IonRow className="CampaignTitle1">
                  <IonImg src={dot} class="imageDot" />
                  Task 2
                </IonRow>

                <IonRow>
                  <IonCol size="0.3" class="popOverContent">
                    <IonImg src={lineVertical} class="verticalLine2" />
                  </IonCol>
                  <IonCol class="ion-item-start">
                    <IonItem class="inputPopOver" lines="none">
                      <IonGrid>
                        <IonRow>
                          <IonInput
                            value={customTask[1] ? customTask[1].title : ""}
                            placeholder="Enter Task Name"
                            class="inputPopover1"
                            onIonChange={(e) => {
                              customTask[1].title = e.detail.value
                                ? e.detail.value
                                : "";
                              setUpdate(update + 1);
                            }}
                          />
                        </IonRow>
                        <IonRow>
                          <IonImg src={line} class="horizontalLine" />
                        </IonRow>
                      </IonGrid>
                    </IonItem>
                    <IonItem class="inputPopOver" lines="none">
                      <IonGrid>
                        <IonRow>
                          <IonInput
                            value={customTask[1] ? customTask[1].description : ""}
                            placeholder="Enter Task Summary"
                            class="inputPopover1"
                            onIonChange={(e) => {
                              customTask[1].description = e.detail.value
                                ? e.detail.value
                                : "";
                              setUpdate(update + 1);
                            }}
                          />
                        </IonRow>
                        <IonRow>
                          <IonImg src={line} class="horizontalLine" />
                        </IonRow>
                      </IonGrid>
                    </IonItem>
                    <IonItem class="inputPopOver" lines="none">
                      <IonGrid>
                        <IonRow>
                          <IonInput
                            value={customTask[1] ? customTask[1].link : ""}
                            placeholder="Link"
                            class="inputPopover1"
                            onIonChange={(e) => {
                              customTask[1].link = e.detail.value
                                ? e.detail.value
                                : "";
                              setUpdate(update + 1);
                            }}
                          />
                        </IonRow>
                        <IonRow>
                          <IonImg src={line} class="horizontalLine" />
                        </IonRow>
                      </IonGrid>
                    </IonItem>

                    {social || campaignData.custom_campaign.status == "Social" ?
                      <IonRadioGroup

                        value={customTask[1] ? customTask[1].task_type == SocialCampaignTaskType.Like ?
                          SocialCampaignTaskType.Like : customTask[1].task_type == SocialCampaignTaskType.Share ? SocialCampaignTaskType.Share :
                            customTask[1].task_type == SocialCampaignTaskType.Comment ? SocialCampaignTaskType.Comment :
                              SocialCampaignTaskType.Follow : ""}
                        onIonChange={(e) => {
                          customTask[1].task_type =
                            e.detail.value == SocialCampaignTaskType.Like
                              ? SocialCampaignTaskType.Like
                              : e.detail.value == SocialCampaignTaskType.Share
                                ? SocialCampaignTaskType.Share
                                : e.detail.value == SocialCampaignTaskType.Comment
                                  ? SocialCampaignTaskType.Comment
                                  : SocialCampaignTaskType.Follow;
                        }}
                      >
                        <IonRow >
                          <IonCol class="radioButton" size="6">
                            <IonItem lines="none"
                            >
                              <IonRadio
                                slot="start"
                                value={SocialCampaignTaskType.Like}
                                class="radioColor"
                              />
                              <IonLabel>Like</IonLabel>
                            </IonItem>
                          </IonCol>
                          <IonCol class="radioButton" size="6">
                            <IonItem lines="none">
                              <IonRadio
                                slot="start"
                                value={SocialCampaignTaskType.Share}
                                class="radioColor"
                              />
                              <IonLabel>Share</IonLabel>
                            </IonItem>
                          </IonCol>
                          <IonCol class="radioButton" size="6">
                            <IonItem lines="none">
                              <IonRadio

                                slot="start"
                                value={SocialCampaignTaskType.Follow}
                                class="radioColor"
                              />
                              <IonLabel>Follow</IonLabel>
                            </IonItem>
                          </IonCol>
                          <IonCol class="radioButton" size="6">
                            <IonItem lines="none">
                              <IonRadio
                                slot="start"
                                value={SocialCampaignTaskType.Comment}
                                class="radioColor"
                              />
                              <IonLabel>Comment</IonLabel>
                            </IonItem>
                          </IonCol>
                        </IonRow>
                      </IonRadioGroup>
                      : <></>}

                    {UGC || campaignData.custom_campaign.status == "UGC" ?
                      (<IonGrid>
                        <IonRadioGroup
                          value={customTask[1] ? customTask[1].option == 0 ? "Content" :
                            "Publish" : null}
                          onIonChange={(e) => {
                            customTask[1].option =
                              e.detail.value == "Content"
                                ? 0
                                : 1;
                          }}
                        >
                          <IonRow >
                            <IonCol class="radioButton">
                              <IonItem lines="none">
                                <IonRadio
                                  disabled={!newcampaign}
                                  onClick={() => { setContent2(false) }}
                                  slot="start"
                                  value="Content"
                                  class="radioColor"
                                />
                                <IonLabel>Collect content</IonLabel>
                              </IonItem>
                            </IonCol>
                            <IonCol class="radioButton">
                              <IonItem lines="none">
                                <IonRadio
                                  disabled={!newcampaign}
                                  onClick={() => { setContent2(true) }}
                                  slot="start"
                                  value="Publish"
                                  class="radioColor"
                                />
                                <IonLabel>Publish and share links</IonLabel>
                              </IonItem>
                            </IonCol>
                          </IonRow>
                        </IonRadioGroup>
                        {content2 || customTask[1].option == 1 ? <IonRow class="warningWrapper">
                          Creators own content. Best for organic reach
                        </IonRow> : <IonRow class="warningWrapper">
                          You own the copyright, Best for reusing content for your own publishing and ads
                        </IonRow>}
                      </IonGrid>)

                      : null}

                    <IonRow>
                      {campaignData.custom_campaign.task_number == "2" ? (
                        <IonButton
                          fill="outline"
                          class="ClientRewardsButton4"
                          expand="full"
                          onClick={() => {
                            setShowPopover2(false);
                            setShowPopover3(true);
                            if (newcampaign) {
                              campaignData.custom_task.push(customTask[0]);
                              campaignData.custom_task.push(customTask[1]);
                            }
                          }}
                        >
                          Next
                        </IonButton>
                      ) : (
                        <IonButton
                          fill="outline"
                          class="ClientRewardsButton4"
                          expand="full"
                          onClick={() => {
                            openMenu();
                            setTaskPop2(true);
                            setTaskPop3(false);
                            // if (newcampaign){
                            //   campaignData.custom_task.push(customTask[1]);
                            //   campaignData.custom_task.push(customTask[0]);
                            // }
                          }}
                        >
                          Next
                        </IonButton>
                      )}
                      <IonButton
                        fill="outline"
                        class="ClientRewardsButton4"
                        expand="full"
                        onClick={() => {
                          setTaskPop2(true);
                          setTaskPop1(false);
                          // if (newcampaign)
                          //   campaignData.custom_task.push(customTask[1]);
                        }}
                      >
                        Back
                      </IonButton>
                    </IonRow>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          ) : null}
          {campaignData.custom_campaign.task_number == "3" ? (
            <IonItem disabled={Taskpop3} className="" lines="none">
              <IonGrid>
                <IonRow className="CampaignTitle1">
                  <IonImg src={dot} class="imageDot" />
                  Task 3
                </IonRow>

                <IonRow>
                  <IonCol size="0.3" class="popOverContent">
                    <IonImg src={lineVertical} class="verticalLine2" />
                  </IonCol>
                  <IonCol class="ion-item-start">
                    <IonItem class="inputPopOver" lines="none">
                      <IonGrid>
                        <IonRow>
                          <IonInput
                            value={customTask[2] ? customTask[2].title : ""}
                            placeholder="Enter Task Name"
                            class="inputPopover1"
                            onIonChange={(e) => {
                              customTask[2].title = e.detail.value
                                ? e.detail.value
                                : "";
                              setUpdate(update + 1);
                            }}
                          />
                        </IonRow>
                        <IonRow>
                          <IonImg src={line} class="horizontalLine" />
                        </IonRow>
                      </IonGrid>
                    </IonItem>
                    <IonItem class="inputPopOver" lines="none">
                      <IonGrid>
                        <IonRow>
                          <IonInput
                            value={customTask[2] ? customTask[2].description : ""}
                            placeholder="Enter Task Summary"
                            class="inputPopover1"
                            onIonChange={(e) => {
                              customTask[2].description = e.detail.value
                                ? e.detail.value
                                : "";
                              setUpdate(update + 1);
                            }}
                          />
                        </IonRow>
                        <IonRow>
                          <IonImg src={line} class="horizontalLine" />
                        </IonRow>
                      </IonGrid>
                    </IonItem>
                    <IonItem class="inputPopOver" lines="none">
                      <IonGrid>
                        <IonRow>
                          <IonInput
                            value={customTask[2] ? customTask[2].link : ""}
                            placeholder="Link"
                            class="inputPopover1"
                            onIonChange={(e) => {
                              customTask[2].link = e.detail.value
                                ? e.detail.value
                                : "";
                              setUpdate(update + 1);
                            }}
                          />
                        </IonRow>
                        <IonRow>
                          <IonImg src={line} class="horizontalLine" />
                        </IonRow>
                      </IonGrid>
                    </IonItem>

                    {social || campaignData.custom_campaign.status == "Social" ?
                      <IonRadioGroup

                        value={customTask[2] ? customTask[2].task_type == SocialCampaignTaskType.Like ?
                          SocialCampaignTaskType.Like : customTask[2].task_type == SocialCampaignTaskType.Share ? SocialCampaignTaskType.Share :
                            customTask[2].task_type == SocialCampaignTaskType.Comment ? SocialCampaignTaskType.Comment :
                              SocialCampaignTaskType.Follow : ""}
                        onIonChange={(e) => {
                          customTask[2].task_type =
                            e.detail.value == SocialCampaignTaskType.Like
                              ? SocialCampaignTaskType.Like
                              : e.detail.value == SocialCampaignTaskType.Share
                                ? SocialCampaignTaskType.Share
                                : e.detail.value == SocialCampaignTaskType.Comment
                                  ? SocialCampaignTaskType.Comment
                                  : SocialCampaignTaskType.Follow;
                        }}
                      >
                        <IonRow >
                          <IonCol class="radioButton" size="6">
                            <IonItem lines="none"
                            >
                              <IonRadio
                                slot="start"
                                value={SocialCampaignTaskType.Like}
                                class="radioColor"
                              />
                              <IonLabel>Like</IonLabel>
                            </IonItem>
                          </IonCol>
                          <IonCol class="radioButton" size="6">
                            <IonItem lines="none">
                              <IonRadio
                                slot="start"
                                value={SocialCampaignTaskType.Share}
                                class="radioColor"
                              />
                              <IonLabel>Share</IonLabel>
                            </IonItem>
                          </IonCol>
                          <IonCol class="radioButton" size="6">
                            <IonItem lines="none">
                              <IonRadio

                                slot="start"
                                value={SocialCampaignTaskType.Follow}
                                class="radioColor"
                              />
                              <IonLabel>Follow</IonLabel>
                            </IonItem>
                          </IonCol>
                          <IonCol class="radioButton" size="6">
                            <IonItem lines="none">
                              <IonRadio
                                slot="start"
                                value={SocialCampaignTaskType.Comment}
                                class="radioColor"
                              />
                              <IonLabel>Comment</IonLabel>
                            </IonItem>
                          </IonCol>
                        </IonRow>
                      </IonRadioGroup>
                      : <></>}
                    {UGC || campaignData.custom_campaign.status == "UGC" ?
                      (<IonGrid>
                        <IonRadioGroup
                          value={customTask[2] ? customTask[2].option == 0 ? "Content" :
                            "Publish" : null}
                          onIonChange={(e) => {
                            customTask[0].option =
                              e.detail.value == "Content"
                                ? 0
                                : 1;
                          }}
                        >
                          <IonRow >
                            <IonCol class="radioButton">
                              <IonItem lines="none">
                                <IonRadio
                                  disabled={!newcampaign}
                                  onClick={() => { setContent3(false) }}
                                  slot="start"
                                  value="Content"
                                  class="radioColor"
                                />
                                <IonLabel>Collect content</IonLabel>
                              </IonItem>
                            </IonCol>
                            <IonCol class="radioButton">
                              <IonItem lines="none">
                                <IonRadio
                                  disabled={!newcampaign}
                                  onClick={() => { setContent3(true) }}
                                  slot="start"
                                  value="Publish"
                                  class="radioColor"
                                />
                                <IonLabel>Publish and share links</IonLabel>
                              </IonItem>
                            </IonCol>
                          </IonRow>
                        </IonRadioGroup>
                        {content3 || customTask[2].option == 1 ? <IonRow class="warningWrapper">
                          Creators own content. Best for organic reach
                        </IonRow> : <IonRow class="warningWrapper">
                          You own the copyright, Best for reusing content for your own publishing and ads
                        </IonRow>}
                      </IonGrid>)

                      : null}
                    <IonRow>
                      <IonButton
                        fill="outline"
                        class="ClientRewardsButton4"
                        expand="full"
                        onClick={() => {
                          openMenu();
                          setShowPopover2(false);
                          setShowPopover3(true);
                          setTaskPop1(false);
                          if (newcampaign) {
                            campaignData.custom_task.push(customTask[0]);
                            campaignData.custom_task.push(customTask[1]);
                            campaignData.custom_task.push(customTask[2]);
                          }
                        }}
                      >
                        Next
                      </IonButton>
                      <IonButton
                        fill="outline"
                        class="ClientRewardsButton4"
                        expand="full"
                        onClick={() => {
                          setTaskPop3(true);
                          setTaskPop2(false);
                          // if (newcampaign)
                          //   campaignData.custom_task.push(customTask[2]);
                        }}
                      >
                        Back
                      </IonButton>
                    </IonRow>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          ) : null}
        </IonContent>
      </IonPopover>
      <IonAlert
        isOpen={alert1}
        message={alertMessage}
        onDidDismiss={() => {
          setAlert1(false);
          setAlertMessage("");
        }}
        backdropDismiss={true}
      ></IonAlert>
      <IonPopover
        isOpen={showPopover3}
        class="finalPop"
        backdropDismiss={false}
        onDidDismiss={() => {
          setShowPopover3(false);
        }}
      >
        <IonRow class="ClientCampaignPopoverCloseButton">

          <IonIcon
            md={close}
            class="iconSize"
            size="large"
            onClick={() => {
              setShowPopover3(false);
              setShowPopover(false);
              setPop1(false);
              setPop2(true);
              setPop3(true);
              setPop4(true);
              setTaskPop1(false);
              setTaskPop2(true);
              setTaskPop3(true);
              if (newcampaign) {
                setSocial(false);
                setAutomatic(false);
                setUGC(false);
                setContent1(false);
                setContent2(false);
                setContent3(false);
              }
            }}
          ></IonIcon>
        </IonRow>

        <IonSegment mode="md">
          <IonImg src={buzz} />
        </IonSegment>
        <IonSegment mode="md" class="finalText">
          Are you sure? This campaign is
        </IonSegment>
        <IonSegment mode="md" class="finalText">going live...</IonSegment>

        <IonSegment mode="md">

          <IonButton
            fill="solid"
            class="finalButton"
            onClick={async () => {
              campaignData.custom_campaign.program_id =
                loginMetadata.program_id;
              setShowPopover(false);
              setShowPopover3(false);
              openMenu();
              {
                // checkEdit
                //   ? await createClientService.UpdateCampaign(
                //     campaignData,
                //     loginMetadata
                //   )
                //   : await createClientService.CreateCampaign(
                //     campaignData,
                //     loginMetadata
                //   ).then((resp) => {
                //     setAlertMessage(resp.msg);
                //     setAlert1(true);
                //   });
              }
              setPop1(false);
              setPop2(true);
              setPop3(true);
              setPop4(true);
              setPop5(true);
              setTaskPop1(false);
              setTaskPop2(true);
              setTaskPop3(true);
              GetAllPackage(option);
              if (newcampaign) {
                setSocial(false);
                setAutomatic(false);
              }
            }}
          >
            Confirm
          </IonButton>
        </IonSegment>
        <IonSegment mode="md">
          <IonButton
            class="finalCancelButton"
            fill="outline"
            onClick={() => {
              setShowPopover3(false);
              setShowPopover(false);
              setPop1(false);
              setPop2(true);
              setPop3(true);
              setPop4(true);
              setPop5(true);
              openMenu();
              setCampaignData(new CampaignTaskResponse());
              setTaskPop1(false);
              setTaskPop2(true);
              setTaskPop3(true);
              if (newcampaign) {
                setSocial(false);
                setAutomatic(false);
              }
            }}
          >
            Cancel
          </IonButton>
        </IonSegment>
      </IonPopover>
    </span >
  );
};

export default CreateCampaignPopover;
