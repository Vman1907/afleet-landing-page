import {
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonGrid,
    IonIcon,
    IonImg,
    IonPage,
    IonRow,
    IonThumbnail,
} from "@ionic/react";
import { useEffect, useState } from "react";
import TopComponent from "../Components/TopComponent";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import "../styles/AmbassadorCampaign.css";
import Calendar from 'react-calendar';
import "../styles/CalendarStyles.css"
import { chevronForwardOutline, ellipse } from "ionicons/icons";
import "../styles/AmbassadorCalendar.css"
import CampaignDetails from "../Models/CampaignDetails";
import ProgramManagementService from "../Services/ProgramManagementService";
import defaultImage from "../../Assets/Images/campaignDeafult.png";
import moment from "moment";
import { Link } from "react-router-dom";
import { convertToLocale, lowerCase } from "../../Util/BasicUtilityFunctions";
interface CalendarsProps {
    loginMetadata: LoginMetadata;
    loginfunction: (value: LoginMetadata | null) => void;
}

const Calendars: React.FC<CalendarsProps> = ({
    loginMetadata,
    loginfunction,
}) => {
    const [searchText, setSearchText] = useState("");
    const [range_start, setRangeStart] = useState(new Date());
    const [range_end, setRangeEnd] = useState(new Date((new Date().setDate((range_start.getDate() + 7)))));
    const [campaignList, setCampaignList] = useState<CampaignDetails[]>([]);
    useEffect(() => {
        document.title = "Calendar - Afleet"
        GetCampaignslist(range_start, range_end);
    }, []);
    const GetCampaignslist = (range_start: any, range_end: any) => {
        ProgramManagementService.GetCampaignsListCalendar(loginMetadata, moment(range_start).format("YYYY-MM-DD").toString(), moment(range_end).format("YYYY-MM-DD").toString())
            .then((resp: any) => {
                console.log(resp)
                if (resp != null) {
                    setCampaignList(resp.campaignList);
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
                        searchText={searchText}
                        setSearchText={setSearchText}
                        loginfunction={loginfunction}
                    />
                    <IonCardContent class="marginForContent">
                        <IonGrid class="scrolling">
                            <IonRow class="dashboardName">Calendar</IonRow>
                            <IonRow>
                                <IonCol size="8.5" style={{ minHeight: "700px" }}>
                                    <Calendar
                                        className={"Calendar"}
                                        selectRange
                                        onChange={(val: any) => { setRangeStart(val[0]); setRangeEnd(val[1]); GetCampaignslist(val[0], val[1]) }}
                                        defaultValue={[range_start, range_end]}
                                    />
                                </IonCol>

                                <IonCol size="3.5">
                                    <IonGrid style={{ minWidth: "250px" }}>
                                        <IonRow class="upcoming">
                                            Campaigns

                                        </IonRow>
                                        {campaignList.length > 0 ? (<>
                                            {campaignList.map((campaign: CampaignDetails) => {
                                                if (lowerCase(
                                                    campaign.title
                                                ).includes(lowerCase(searchText))) {
                                                    return (
                                                        <IonRow>
                                                            <IonCard class="card">
                                                                <IonCardContent class="campaignList">
                                                                    <IonGrid>
                                                                        <IonRow>
                                                                            <IonCol size="11">
                                                                                <IonRow>
                                                                                    <IonCol size="1">
                                                                                        <IonIcon
                                                                                            icon={ellipse}
                                                                                            class="dot"
                                                                                        ></IonIcon>
                                                                                    </IonCol>
                                                                                    <IonCol size="11" class="period">
                                                                                        {moment(convertToLocale(campaign.start_date)).format("Do MMM")} to{" "}
                                                                                        {moment(convertToLocale(campaign.end_date)).format("Do MMM")}
                                                                                    </IonCol>
                                                                                </IonRow>
                                                                                <IonRow>
                                                                                    <IonCol style={{ minWidth: "45px", maxWidth: "50px" }}>
                                                                                        <IonThumbnail>
                                                                                            <img
                                                                                                src={campaign.campaign_img
                                                                                                    ? campaign.campaign_img != ""
                                                                                                        ? campaign.campaign_img
                                                                                                        : defaultImage
                                                                                                    : defaultImage}
                                                                                                className="calendarCampaign"
                                                                                            />
                                                                                        </IonThumbnail>
                                                                                    </IonCol>
                                                                                    <IonCol>
                                                                                        <IonRow class="campaign">
                                                                                            {campaign.title}
                                                                                        </IonRow>
                                                                                        <IonRow class="referral">
                                                                                            {campaign.status}
                                                                                        </IonRow>
                                                                                    </IonCol>
                                                                                </IonRow>
                                                                            </IonCol>
                                                                            <IonCol size="1" class="calenderButton">
                                                                                <Link to="/Campaign" >
                                                                                    <IonIcon
                                                                                        icon={chevronForwardOutline}
                                                                                        size="medium"
                                                                                        class="icon"
                                                                                    />
                                                                                </Link>
                                                                            </IonCol>
                                                                        </IonRow>
                                                                    </IonGrid>
                                                                </IonCardContent>
                                                            </IonCard>
                                                        </IonRow>
                                                    );
                                                }
                                            }
                                            )}
                                        </>) : <IonRow style={{ display: "flex", justifyContent: "center", marginTop: "200px" }}>
                                            <div>No Campaigns Available</div>
                                        </IonRow>}

                                    </IonGrid>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCardContent>
                </IonContent>
            </IonCard>
        </IonPage>
    );
}

export default Calendars 