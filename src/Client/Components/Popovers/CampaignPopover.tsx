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
    IonFooter,
    IonCheckbox,
    IonTextarea,
} from "@ionic/react";
import { close } from "ionicons/icons";
import buzz from "../../../Assets/Images/buzz.png";
import defaultImage from "../../../Assets/Images/RewardCreationTemp.svg";
import moment from "moment";
import { useEffect, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoWarningOutline } from "react-icons/io5";
import { convertToLocale, isStringEmpty } from "../../../Util/BasicUtilityFunctions";
import { CampaignTaskResponse } from "../../Models/CampaignTask";
import uploadImg from "../../../Assets/Images/UploadImg.svg";
import { FileService } from "../../../Admin/Services/ImageUploadService";
import { LoginMetadata } from "../../Models/LoginMetadata";
import { ImageExtensions } from "../../../Admin/Constants/ImageUploadConstant";
import ImageUploadLoading from "../../../Admin/components/ImageUploadLoading";
import { SocialCampaignPlatform, SocialCampaignTaskType } from "../../Constants/CampaignStatusConstant";
import { socialList } from "../../Models/socialList";
import createClientService from "../../Services/createClientService";
import { TwitterTweetEmbed } from "react-twitter-embed";

interface CampaignPopoverProps {
    showPopover: boolean;
    setShowPopover: (value: boolean) => void;
    campaignData: CampaignTaskResponse;
    loginMetadata: LoginMetadata;
    customTask: socialList[];
    newcampaign: boolean;
    setCampaignURL: (value: string) => void;
    setGuidelines: (value: string) => void;
    campaignURL: string;
    Guidelines: string;
    setTask1: (value: boolean) => void;
    setTask2: (value: boolean) => void;
    setTask3: (value: boolean) => void;
    task1: boolean;
    task2: boolean;
    task3: boolean;
    option: number;
    GetAllPackage: (option: number) => void;
    setIsLoading: (value: boolean) => void;
}

const CampaignPopover: React.FC<CampaignPopoverProps> = ({
    showPopover,
    setShowPopover,
    campaignData,
    loginMetadata,
    customTask,
    newcampaign,
    setCampaignURL,
    setGuidelines,
    campaignURL,
    Guidelines,
    setTask1,
    setTask2,
    setTask3,
    task1,
    task2,
    task3,
    GetAllPackage,
    option,
    setIsLoading
}) => {
    const [showPopover2, setShowPopover2] = useState(false);
    const [showPopover3, setShowPopover3] = useState(false);
    const [showPopover4, setShowPopover4] = useState(false);
    const [showPopover5, setShowPopover5] = useState(false);
    const [automatic, setAutomatic] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [alert1, setAlert1] = useState(false);
    const [social, setSocial] = useState(false);
    const [like, setLike] = useState(false);
    const [alert2, setAlert2] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [campaignImg, setCampaignImg] = useState(false);
    const [postImage, setPostImg] = useState("");
    const [postCap, setPostCap] = useState("");

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
            let name = file.name.replace(/[^A-Z0-9]+/ig, "_");
            FileService.UploadFile(loginMetadata, file, name).then(
                (fileResponse: any) => {
                    setPostImg(fileResponse.Location);
                    setIsUploading(false);
                }
            );
        }
        else {
            setAlert1(true);
        }
    };
    const upload1 = (event: any) => {
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
                    campaignData.custom_campaign.campaign_img = fileResponse.Location;
                    setIsUploading(false);
                }
            );
        }
        else {
            setAlert1(true);
        }
    };

    const reverse = (str: string) => {
        const date = str;

        const [year, month, day] = date.split('-');

        const result = [day, month, year].join('-');

        return result;
    }
    return (
        <>
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
            <IonAlert
                isOpen={alert2}
                message={alertMessage}
                onDidDismiss={() => {
                    setAlert2(false);
                    setAlertMessage("");
                }}
                backdropDismiss={true}
            ></IonAlert>
            <IonPopover
                backdropDismiss={false}
                isOpen={showPopover}
                onDidDismiss={() => {
                    setShowPopover(false);
                    setSocial(false);
                    setLike(false);
                }}
                id="campaign-popover1"
            >
                <IonContent >
                    <IonGrid>
                        <IonRow class="campaignPopRow">
                            <IonIcon
                                class="closeIcon"
                                md={close}
                                onClick={() => {
                                    setShowPopover(false);
                                    setSocial(false);
                                    setLike(false);
                                    setTask1(false);
                                    setTask2(false);
                                    setTask3(false);
                                    setCampaignURL("");
                                    setGuidelines("");
                                    setPostCap("");
                                    setPostImg("");
                                }}
                            ></IonIcon>
                        </IonRow>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            if (campaignData.custom_campaign.status != "Social" || (task1 || task2 || task3)) {
                                if (campaignData.custom_campaign.status == "Social") {
                                    if (task1 && task2 && task3) {
                                        campaignData.custom_campaign.task_number = "3";
                                    }
                                    else if ((task1 && task2) || (task1 && task3) || (task2 && task3)) {
                                        campaignData.custom_campaign.task_number = "2";
                                    }
                                    else {
                                        campaignData.custom_campaign.task_number = "1";
                                    }
                                }
                                if (campaignData.custom_campaign.platform == SocialCampaignPlatform.Instagram && loginMetadata.isInstaToken == undefined && campaignData.custom_campaign.status == "Social") {
                                    await createClientService.requestInstaToken(loginMetadata).then((resp) => {
                                        if (resp.status == false && resp.msg == "Token already exist") {
                                            loginMetadata.isInstaToken = true;
                                            setShowPopover(false);
                                            setShowPopover2(true);
                                        }

                                    })
                                }
                                else if (campaignData.custom_campaign.platform == SocialCampaignPlatform.Twitter && loginMetadata.isTwitterToken == undefined && campaignData.custom_campaign.status == "Social") {
                                    await createClientService.requestTwitterToken(loginMetadata).then((resp) => {
                                        if (resp.status == false && resp.msg == "Token already exist") {
                                            loginMetadata.isTwitterToken = true;
                                            setShowPopover(false);
                                            setShowPopover2(true);
                                        }

                                    });
                                }
                                else {
                                    setShowPopover(false);
                                    setShowPopover2(true);
                                }
                            }
                            else {
                                alert("Please select atleast one task");
                            }
                        }}>
                            <IonRow class="campaignName">
                                Campaign Name&nbsp;<span style={{ "color": "red" }}>*</span>
                            </IonRow>
                            <fieldset className="campaignFieldset">
                                <legend className="campaignLegend">Title</legend>
                                <IonInput
                                    placeholder="Campagin Title"
                                    style={{ height: "35px" }}
                                    required
                                    value={campaignData.custom_campaign.title}
                                    onIonChange={(e) => {
                                        campaignData.custom_campaign.title = e.detail.value ? e.detail.value : "";
                                    }}
                                ></IonInput>
                            </fieldset>

                            <IonRow class="campaignName">
                                Campaign Type
                            </IonRow>
                            <IonRow>
                                <IonRadioGroup style={{ display: "flex" }}
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

                                        if (campaignData.custom_campaign.status == "Custom") {
                                            campaignData.custom_campaign.task_number = "1";
                                            campaignData.custom_campaign.platform = -1;
                                        }
                                        else if (campaignData.custom_campaign.status == "UGC") {
                                            campaignData.custom_campaign.task_number = "1";
                                            campaignData.custom_campaign.platform = SocialCampaignPlatform.Twitter
                                        }
                                        else {
                                            campaignData.custom_campaign.automatic = 1;
                                            campaignData.custom_campaign.platform = SocialCampaignPlatform.Twitter
                                        }
                                    }}
                                >
                                    <IonItem lines="none">
                                        <IonRadio
                                            slot="start"
                                            value="Custom"
                                            class="radioColor1"
                                            disabled={!newcampaign}
                                            onClick={() => {
                                                setSocial(false);
                                                setLike(false);
                                                setTask1(false);
                                                setTask2(false);
                                                setTask3(false);
                                            }}
                                        />
                                        <IonLabel class="campaignRadioLabel">Custom</IonLabel>
                                    </IonItem>
                                    <IonItem lines="none">
                                        <IonRadio
                                            slot="start"
                                            value="Social"
                                            class="radioColor1"
                                            onClick={() => {
                                                setSocial(true);
                                                setLike(true);
                                            }}
                                            disabled={true}
                                        />
                                        <IonLabel class="campaignRadioLabel">Engagement</IonLabel>
                                    </IonItem>
                                    <IonItem lines="none">
                                        <IonRadio
                                            slot="start"
                                            value="UGC"
                                            class="radioColor1"
                                            disabled={!newcampaign}
                                            onClick={() => {
                                                setSocial(true);
                                                setLike(false);
                                                setTask1(false);
                                                setTask2(false);
                                                setTask3(false);
                                            }}
                                        />
                                        <IonLabel class="campaignRadioLabel">UGC</IonLabel>
                                    </IonItem>
                                </IonRadioGroup>
                            </IonRow>
                            {social || campaignData.custom_campaign.status != "Custom" ? <IonRow>
                                <IonRadioGroup style={{ display: "flex" }}
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
                                    }}
                                >
                                    <IonItem lines="none">
                                        <IonRadio
                                            slot="start"
                                            value={SocialCampaignPlatform.Twitter}
                                            class="radioColor1"
                                            disabled={!newcampaign}
                                        />
                                        <IonLabel>Twitter</IonLabel>
                                    </IonItem>
                                    <IonItem lines="none">
                                        <IonRadio
                                            slot="start"
                                            value={SocialCampaignPlatform.Instagram}
                                            class="radioColor1"
                                            disabled={!newcampaign || campaignData.custom_campaign.status == "Social"}
                                        />
                                        <IonLabel>Instagram</IonLabel>
                                    </IonItem>
                                    {/* <IonItem lines="none">
                                        <IonRadio
                                            slot="start"
                                            value={SocialCampaignPlatform.Youtube}
                                            class="radioColor1"
                                            disabled={true}
                                        />
                                        <IonLabel>Youtube</IonLabel>
                                    </IonItem> */}
                                </IonRadioGroup>
                            </IonRow> : null}
                            {like || campaignData.custom_campaign.status == "Social" ? <IonRow>
                                <IonItem lines="none">
                                    <IonCheckbox mode="md"
                                        class="CampaignCheckBox"
                                        checked={task1}
                                        disabled={!newcampaign}
                                        onIonChange={(e) => {
                                            setTask1(e.detail.checked)
                                        }}
                                    ></IonCheckbox>
                                    <IonLabel>Like</IonLabel>
                                </IonItem>
                                <IonItem lines="none">
                                    <IonCheckbox mode="md"
                                        class="CampaignCheckBox"
                                        checked={task2}
                                        disabled={!newcampaign}
                                        onIonChange={(e) => {
                                            setTask2(e.detail.checked)
                                        }}
                                    ></IonCheckbox>
                                    <IonLabel >Share</IonLabel>
                                </IonItem>
                                <IonItem lines="none">
                                    <IonCheckbox mode="md"
                                        class="CampaignCheckBox"
                                        checked={task3}
                                        disabled={!newcampaign}
                                        onIonChange={(e) => {
                                            setTask3(e.detail.checked)
                                        }}
                                    ></IonCheckbox>
                                    <IonLabel>Comment</IonLabel>
                                </IonItem>
                            </IonRow> : null}
                            {campaignData.custom_campaign.status == "Custom" ? <>
                                <IonRow class="campaignName" style={{ marginTop: "10px" }}>
                                    Campaign Link
                                </IonRow>
                                <fieldset className="campaignFieldset">
                                    <legend className="campaignLegend">Upload URL</legend>
                                    <IonInput
                                        placeholder="https://afleet.io/"
                                        style={{ height: "35px" }}
                                        type="url"
                                        value={campaignURL}
                                        onIonChange={(e) => {
                                            e.detail.value ? setCampaignURL(e.detail.value) : setCampaignURL("");
                                        }}
                                    ></IonInput>
                                </fieldset></> : null
                            }

                            <footer>
                                <IonRow class="campaignPopRow" style={{ marginRight: "20px" }}>
                                    <IonButton class="campaignButton" type="submit">
                                        1/{campaignData.custom_campaign.status != "Social" ? "3" : "4"} Next
                                    </IonButton>
                                </IonRow>
                            </footer>
                        </form>
                    </IonGrid>
                </IonContent>
            </IonPopover>
            <IonPopover
                isOpen={showPopover2}
                backdropDismiss={false}
                onDidDismiss={() => {
                    setShowPopover2(false);
                    setSocial(false);
                    setLike(false);
                }}
                id="campaign-popover"
            >
                <IonContent >
                    <IonGrid>
                        <IonRow class="campaignPopRow">
                            <IonIcon
                                class="closeIcon"
                                md={close}
                                onClick={() => {
                                    setShowPopover2(false);
                                    setSocial(false);
                                    setLike(false);
                                    setTask1(false);
                                    setTask2(false);
                                    setTask3(false);
                                    setCampaignURL("");
                                    setGuidelines("");
                                    setPostCap("");
                                    setPostImg("");
                                }}
                            ></IonIcon>
                        </IonRow>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            setShowPopover2(false);
                            setShowPopover3(true);
                        }}>
                            <IonRow class="campaignName">
                                Campaign Completion Style
                            </IonRow>

                            <IonRow>
                                <IonRadioGroup style={{ display: "flex" }}
                                    value={campaignData.custom_campaign.automatic == 1 ? "Automatic" :
                                        "Manual"}
                                    onIonChange={(e) => {
                                        campaignData.custom_campaign.automatic =
                                            e.detail.value == "Manual"
                                                ? 0
                                                : 1;
                                    }}
                                >
                                    <IonItem lines="none">
                                        <IonRadio
                                            slot="start"
                                            value="Manual"
                                            class="radioColor1"
                                            disabled={campaignData.custom_campaign.status == "Social" ? true : false}
                                            onClick={() => {
                                                setAutomatic(false);
                                            }}
                                        />
                                        <IonLabel class="campaignRadioLabel">Manual</IonLabel>
                                    </IonItem>
                                    <IonItem lines="none">
                                        <IonRadio
                                            slot="start"
                                            value="Automatic"
                                            class="radioColor1"
                                            disabled={campaignData.custom_campaign.status == "Social" ? true : false}
                                            onClick={() => {
                                                setAutomatic(true);
                                            }}
                                        />
                                        <IonLabel class="campaignRadioLabel">Automatic</IonLabel>
                                    </IonItem>
                                </IonRadioGroup>
                            </IonRow>
                            {automatic || campaignData.custom_campaign.automatic == 1 ? <IonRow class="warningWrapper">
                                <span className="warning"><IoWarningOutline /> WARNING:</span><span>Best when you trust your ambassadors and they know what they are doing. Also, note that as soon as they submit their work, the RP will automatically be assigned. Only use it when you know what you are doing.</span>
                            </IonRow> : <IonRow class="warningWrapper">Verify ambassador submissions manually and choose to accept or ask for resubmission. Best for quality check.</IonRow>}
                            <IonRow class="campaignName" style={{ marginTop: "20px" }}>
                                Schedule Campaign&nbsp;<span style={{ "color": "red" }}>*</span>
                            </IonRow>
                            <fieldset className="campaignFieldset">
                                <legend className="campaignLegend">Campaign will start on</legend>
                                <IonRow class="campaignDurationRow">
                                    <IonInput
                                        onClick={() => {
                                            setShowModal(true);
                                        }}
                                        required
                                        placeholder="dd-mm-yyyy"
                                        value={reverse(campaignData.custom_campaign.start_date.substring(
                                            0,
                                            10
                                        )) == "--" ? "" : reverse(campaignData.custom_campaign.start_date.substring(
                                            0,
                                            10
                                        ))}
                                    >

                                    </IonInput>
                                    <span style={{ marginRight: "40px" }}>at</span>
                                    <IonInput
                                        required
                                        onClick={() => {
                                            setShowModal(true);
                                        }}
                                        placeholder="00:00:00"
                                        value={campaignData.custom_campaign.start_date.substring(
                                            11,
                                            19
                                        )}
                                    >

                                    </IonInput>
                                    <AiOutlineCalendar style={{ cursor: "pointer", marginRight: "10px" }} onClick={() => {
                                        setShowModal(true);
                                    }} />
                                </IonRow>
                            </fieldset>
                            <fieldset className="campaignFieldset">
                                <legend className="campaignLegend">Campaign will end on</legend>
                                <IonRow class="campaignDurationRow">
                                    <IonInput
                                        required
                                        onClick={() => {
                                            setShowModal2(true);
                                        }}
                                        value={reverse(campaignData.custom_campaign.end_date.substring(
                                            0,
                                            10
                                        )) == "--" ? "" : reverse(campaignData.custom_campaign.end_date.substring(
                                            0,
                                            10
                                        ))}
                                        placeholder="dd-mm-yyyy"
                                    >

                                    </IonInput>
                                    <span style={{ marginRight: "40px" }}>at</span>
                                    <IonInput
                                        required
                                        onClick={() => {
                                            setShowModal2(true);
                                        }}
                                        placeholder="00:00:00"
                                        value={campaignData.custom_campaign.end_date.substring(
                                            11,
                                            19
                                        )}
                                    >

                                    </IonInput>
                                    <AiOutlineCalendar style={{ cursor: "pointer", marginRight: "10px" }} onClick={() => {
                                        setShowModal2(true);
                                    }} />
                                </IonRow>
                            </fieldset>
                            <IonRow class="campaignName" style={{ marginTop: "10px" }}>
                                Campaign RP&nbsp;<span style={{ "color": "red" }}>*</span>
                            </IonRow>
                            <fieldset className="campaignFieldset">
                                <legend className="campaignLegend">Reward Points</legend>
                                <IonInput
                                    required
                                    type="number"
                                    class="NumberInput"
                                    placeholder="0"
                                    min={0}
                                    style={{ height: "35px" }}
                                    value={campaignData.custom_campaign.points}
                                    onIonChange={(e) => {
                                        campaignData.custom_campaign.points = e.detail.value ? e.detail.value : "0";
                                    }}
                                ></IonInput>
                            </fieldset>
                            <footer>
                                <IonRow style={{ marginRight: "20px", justifyContent: "space-between" }}>
                                    <IonButton class="campaignBackButton" onClick={() => {
                                        setShowPopover2(false);
                                        setShowPopover(true);
                                    }}>
                                        Back
                                    </IonButton>
                                    <IonButton class="campaignButton" type="submit">
                                        2/{campaignData.custom_campaign.status != "Social" ? "3" : "4"} Next
                                    </IonButton>
                                </IonRow>
                            </footer>
                        </form>
                    </IonGrid>
                </IonContent>
            </IonPopover>

            <IonPopover
                isOpen={showPopover3}
                backdropDismiss={false}
                onDidDismiss={() => {
                    setShowPopover3(false);
                    setSocial(false);
                    setLike(false);
                }}
                id="campaign-popover"
            >
                <IonContent >
                    <IonGrid>
                        <IonRow class="campaignPopRow">
                            <IonIcon
                                class="closeIcon"
                                md={close}
                                onClick={() => {
                                    setShowPopover3(false);
                                    setSocial(false);
                                    setLike(false);
                                    setTask1(false);
                                    setTask2(false);
                                    setTask3(false);
                                    setGuidelines("");
                                    setCampaignURL("");
                                    setPostCap("");
                                    setPostImg("");
                                }}
                            ></IonIcon>
                        </IonRow>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if (campaignData.custom_campaign.status != "Social") {
                                customTask[0].link = campaignURL;
                                customTask[0].description = Guidelines;
                                if (newcampaign) {
                                    campaignData.custom_task.push(customTask[0]);
                                }
                                setShowPopover3(false);
                                setShowPopover4(true);
                            }
                            else {
                                setShowPopover3(false);
                                setShowPopover5(true);
                            }
                        }}>
                            <IonRow class="campaignName">
                                Campaign Image
                            </IonRow>
                            <fieldset className="campaignFieldset">
                                <legend className="campaignLegend">Upload Image</legend>

                                {!isUploading &&
                                    campaignData.custom_campaign.campaign_img == "" ? (
                                    <IonSegment mode="md" >
                                        <IonAlert
                                            isOpen={alert1}
                                            message="Image size should be less than 512KB"
                                            onDidDismiss={() => {
                                                setAlert1(false);
                                            }}
                                            backdropDismiss={true}
                                        ></IonAlert>
                                        <IonButton class="campaignImgButton">
                                            <input
                                                id="campaignImage"
                                                hidden
                                                type="file"
                                                name="file"
                                                data-max-size="2048"
                                                accept={ImageExtensions}
                                                onChange={async (e) => {
                                                    await upload1(e);
                                                }}
                                            />
                                            <label
                                                className="campaignImgLabel"
                                                title="Click to upload Image"
                                                htmlFor="campaignImage"
                                            >
                                                <img src={uploadImg} />
                                            </label>

                                        </IonButton>
                                    </IonSegment>
                                ) : isUploading ? (
                                    <IonSegment mode="md">
                                        <IonImg src={defaultImage} class="uplaodingImg" />
                                        <ImageUploadLoading />
                                    </IonSegment>
                                ) : (
                                    <IonSegment mode="md">
                                        <IonAlert
                                            isOpen={alert1}
                                            message="Image size should be less than 512KB"
                                            onDidDismiss={() => {
                                                setAlert1(false);
                                            }}
                                            backdropDismiss={true}
                                        ></IonAlert>
                                        <IonImg
                                            class="uplaodingImg"
                                            src={campaignData.custom_campaign.campaign_img}
                                        />
                                        <input
                                            id="campaignImage2"
                                            hidden
                                            type="file"
                                            name="file"
                                            data-max-size="2048"
                                            accept={ImageExtensions}
                                            onChange={async (e) => {

                                                await upload1(e);
                                            }}
                                        />
                                        <label
                                            title="Click to upload Image"
                                            className="labelForIMageUpload2"
                                            htmlFor="campaignImage2"
                                        >
                                            {" "}
                                            &nbsp;&nbsp;
                                        </label>
                                    </IonSegment>
                                )}
                            </fieldset>

                            <IonRow class="campaignName">
                                Campaign Detail
                            </IonRow>
                            <fieldset className="campaignFieldset">
                                <legend className="campaignLegend">Summary</legend>
                                <IonTextarea
                                    value={campaignData.custom_campaign.description}
                                    onIonChange={(e) => {
                                        campaignData.custom_campaign.description = e.detail.value ? e.detail.value : "";
                                    }}
                                    placeholder="Enter Summary (Max Length 100)"
                                    maxlength={100}
                                    rows={2}
                                ></IonTextarea>
                            </fieldset>
                            <fieldset className="campaignFieldset">
                                <legend className="campaignLegend">Guidelines</legend>
                                <IonTextarea
                                    placeholder="Enter Guidelines (Max Length 300)"
                                    maxlength={300}
                                    rows={2}
                                    value={Guidelines}
                                    onIonChange={(e) => {
                                        e.detail.value ? setGuidelines(e.detail.value) : setGuidelines("");
                                    }}
                                ></IonTextarea>
                            </fieldset>
                            <footer>
                                <IonRow style={{ marginRight: "20px", justifyContent: "space-between" }}>
                                    <IonButton class="campaignBackButton" onClick={() => {
                                        setShowPopover3(false);
                                        setShowPopover2(true);
                                    }} disabled={isUploading}>
                                        Back
                                    </IonButton>
                                    <IonButton class="campaignButton" type="submit" disabled={isUploading}>
                                        3/{campaignData.custom_campaign.status != "Social" ? "3" : "4"} Next
                                    </IonButton>
                                </IonRow>
                            </footer>
                        </form>
                    </IonGrid>
                </IonContent>
            </IonPopover>
            <IonPopover
                isOpen={showPopover5}
                backdropDismiss={false}
                onDidDismiss={() => {
                    setShowPopover5(false);
                    setSocial(false);
                    setLike(false);
                }}
                id="campaign-popover"
            >
                <IonContent >
                    <IonGrid>
                        <IonRow class="campaignPopRow">
                            <IonIcon
                                class="closeIcon"
                                md={close}
                                onClick={() => {
                                    setShowPopover5(false);
                                    setSocial(false);
                                    setLike(false);
                                    setTask1(false);
                                    setTask2(false);
                                    setTask3(false);
                                    setGuidelines("");
                                    setCampaignURL("");
                                    setPostCap("");
                                    setPostImg("");
                                }}
                            ></IonIcon>
                        </IonRow>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if (postImage == "") {
                                setAlertMessage("Please Upload Post Image");
                                setAlert2(true);
                            }
                            else {
                                if (campaignData.custom_campaign.status == "UGC") {
                                    customTask[0].description = Guidelines;
                                    if (newcampaign) {
                                        campaignData.custom_task.push(customTask[0]);
                                    }
                                }
                                else {
                                    if (task1) {
                                        customTask[0].description = Guidelines;
                                        customTask[0].task_type = SocialCampaignTaskType.Like;
                                        if (newcampaign) {
                                            campaignData.custom_task.push(customTask[0]);
                                        }
                                    }
                                    if (task2) {
                                        if (task1) {
                                            customTask[1].description = Guidelines;
                                            customTask[1].task_type = SocialCampaignTaskType.Share;
                                            if (newcampaign) {
                                                campaignData.custom_task.push(customTask[1]);
                                            }
                                        }
                                        else {
                                            customTask[0].description = Guidelines;
                                            customTask[0].task_type = SocialCampaignTaskType.Share;
                                            if (newcampaign) {
                                                campaignData.custom_task.push(customTask[0]);
                                            }
                                        }
                                    }
                                    if (task3) {
                                        if (task1 && task2) {
                                            customTask[2].description = Guidelines;
                                            customTask[2].task_type = SocialCampaignTaskType.Comment;
                                            if (newcampaign) {
                                                campaignData.custom_task.push(customTask[2]);
                                            }
                                        }
                                        else if (task1 || task2) {
                                            customTask[1].description = Guidelines;
                                            customTask[1].task_type = SocialCampaignTaskType.Comment;
                                            if (newcampaign) {
                                                campaignData.custom_task.push(customTask[1]);
                                            }
                                        }
                                        else {
                                            customTask[0].description = Guidelines;
                                            customTask[0].task_type = SocialCampaignTaskType.Comment;
                                            if (newcampaign) {
                                                campaignData.custom_task.push(customTask[0]);
                                            }
                                        }
                                    }
                                }
                                setShowPopover5(false);
                                setShowPopover4(true);
                            }
                        }}>
                            {newcampaign ? <><IonRow class="campaignName">
                                Post Image&nbsp;<span style={{ "color": "red" }}>*</span>
                            </IonRow>
                            <fieldset className="campaignFieldset">
                                <legend className="campaignLegend">Upload Image</legend>
                                {!isUploading &&
                                    postImage == "" ? (
                                    <IonSegment mode="md" >
                                        <IonAlert
                                            isOpen={alert1}
                                            message="Image size should be less than 512KB"
                                            onDidDismiss={() => {
                                                setAlert1(false);
                                            }}
                                            backdropDismiss={true}
                                        ></IonAlert>
                                        <IonButton class="campaignImgButton">
                                            <input
                                                id="postImage"
                                                hidden
                                                type="file"
                                                name="file"
                                                data-max-size="2048"
                                                accept={ImageExtensions}
                                                onChange={async (e) => {
                                                    await upload(e);
                                                }}
                                                disabled={!newcampaign}
                                            />
                                            <label
                                                className="campaignImgLabel"
                                                title="Click to upload Image"
                                                htmlFor="postImage"
                                            >
                                                <img src={uploadImg} />
                                            </label>

                                        </IonButton>
                                    </IonSegment>
                                ) : isUploading ? (
                                    <IonSegment mode="md">
                                        <IonImg src={defaultImage} class="uplaodingImg" />
                                        <ImageUploadLoading />
                                    </IonSegment>
                                ) : (
                                    <IonSegment mode="md">
                                        <IonAlert
                                            isOpen={alert1}
                                            message="Image size should be less than 512KB"
                                            onDidDismiss={() => {
                                                setAlert1(false);
                                            }}
                                            backdropDismiss={true}
                                        ></IonAlert>
                                        <IonImg
                                            class="uplaodingImg"
                                            src={postImage}
                                        />
                                        <input
                                            id="postImage2"
                                            hidden
                                            type="file"
                                            name="file"
                                            disabled={!newcampaign}
                                            data-max-size="2048"
                                            accept={ImageExtensions}
                                            onChange={async (e) => {
                                                await upload(e);
                                            }}
                                        />
                                        <label
                                            title="Click to upload Image"
                                            className="labelForIMageUpload2"
                                            htmlFor="postImage2"
                                        >
                                            {" "}
                                            &nbsp;&nbsp;
                                        </label>
                                    </IonSegment>
                                )}
                            </fieldset>

                            <IonRow class="campaignName">
                                Post Caption&nbsp;<span style={{ "color": "red" }}>*</span>
                            </IonRow>
                            <fieldset className="campaignFieldset">
                                <legend className="campaignLegend">Caption</legend>
                                <IonTextarea
                                    value={postCap}
                                    onIonChange={(e) => {
                                        e.detail.value ? setPostCap(e.detail.value) : setPostCap("");
                                    }}
                                    required
                                    disabled={!newcampaign}
                                    placeholder="Enter Caption"
                                    rows={4}
                                ></IonTextarea>
                            </fieldset></>:<><IonRow class="campaignName">
                                Post&nbsp;<span style={{ "color": "red" }}>*</span>
                            </IonRow>
                            <IonSegment>
                            {campaignData.custom_campaign.platform ==
                  SocialCampaignPlatform.Instagram ? (
                  <iframe
                    src={
                        customTask[0].link ==
                        "" ||
                        customTask[0].link ==
                        undefined ||
                        customTask[0].link ==
                        null
                        ? defaultImage
                        : customTask[0].link.split(
                          "?"
                        )[0] +
                        (customTask[0].link.split(
                          "?"
                        )[0][
                            customTask[0].link.split(
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
                ) : campaignData.custom_campaign.platform ==
                  SocialCampaignPlatform.Twitter ? (customTask[0] && customTask[0].link ?
                  <TwitterTweetEmbed
                    tweetId={
                        customTask[0].link
                        .split("?")[0]
                        .split("/")[
                            customTask[0].link
                        .split("?")[0]
                        .split("/").length - 1
                      ]
                    }
                  />:undefined
                ) : undefined}
                            </IonSegment>
                            </>}
                            <footer>
                                <IonRow style={{ marginRight: "20px", justifyContent: "space-between" }}>
                                    <IonButton class="campaignBackButton" onClick={() => {
                                        setShowPopover5(false);
                                        setShowPopover3(true);
                                    }} disabled={isUploading}>
                                        Back
                                    </IonButton>
                                    <IonButton class="campaignButton" type="submit" disabled={isUploading}>
                                        4/{campaignData.custom_campaign.status == "Custom" ? "3" : "4"} Next
                                    </IonButton>
                                </IonRow>
                            </footer>
                        </form>
                    </IonGrid>
                </IonContent>
            </IonPopover>

            <IonPopover
                isOpen={showPopover4}
                class="finalPop"
                backdropDismiss={false}
                onDidDismiss={() => {
                    setShowPopover4(false);
                    setSocial(false);
                    setLike(false);
                }}
            >
                <IonRow class="ClientCampaignPopoverCloseButton">

                    <IonIcon
                        md={close}
                        class="iconSize"
                        size="large"
                        onClick={() => {
                            setShowPopover4(false);
                            setSocial(false);
                            setLike(false); setTask1(false);
                            setTask2(false);
                            setTask3(false);
                            setCampaignURL("");
                            setGuidelines("");
                            setPostCap("");
                            setPostImg("");
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
                            setShowPopover4(false);
                            setSocial(false);
                            setLike(false);
                            setTask1(false);
                            setTask2(false);
                            setTask3(false);
                            setCampaignURL("");
                            setGuidelines("");
                            setPostCap("");
                            setPostImg("");
                            setIsLoading(true);
                            campaignData.custom_campaign.program_id =
                                loginMetadata.program_id;
                            newcampaign ?
                                await createClientService.CreateCampaign(
                                    campaignData,
                                    loginMetadata,
                                    postCap,
                                    postImage,
                                ).then((resp) => {
                                    setAlertMessage(resp.msg);
                                    setAlert2(true);
                                    setIsLoading(false);
                                })
                                : await createClientService.UpdateCampaign(
                                    campaignData,
                                    loginMetadata
                                ).then((resp) => {
                                    setAlertMessage(resp.msg);
                                    setAlert2(true);
                                });

                            GetAllPackage(option);
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
                            setShowPopover4(false);
                            setSocial(false);
                            setLike(false);
                            setTask1(false);
                            setTask2(false);
                            setTask3(false);
                            setCampaignURL("");
                            setPostCap("");
                            setPostImg("");
                        }}
                    >
                        Cancel
                    </IonButton>
                </IonSegment>
            </IonPopover>
        </>
    );
}

export default CampaignPopover;