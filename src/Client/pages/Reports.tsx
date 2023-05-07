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
import Chart from 'react-google-charts'
import Calendar from 'react-calendar';
import "../Styles/ClientReports.css"
import defaultImage from "../../Assets/Images/campaignDeafult.png";
import Image from "../../Assets/Images/Ellipse.svg";
import Trophy from "../../Assets/Images/Vector.png";
import { convertToLocale, isStringEmpty, lowerCase } from "../../Util/BasicUtilityFunctions";
import { LoginMetadata } from "../Models/LoginMetadata";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import ClientReportsService from "../Services/ClientReportsService";
import { leaderboardResponse, performerResponse } from "../Models/Leaderboard";
import ProgramDetails from "../../Ambassador/Models/ProgramDetails";
import { Leaderboard } from "../../Ambassador/Models/Leaderboard";
import moment from "moment";
interface ReportsProps {
    loginMetadata: LoginMetadata;
    loginfunction: (value: LoginMetadata | null) => void;
}

const Reports: React.FC<ReportsProps> = ({
    loginMetadata,
    loginfunction,
}) => {
    const LineDataInitial: any = [
        ['x', 'Custom', 'Social', 'UGC'],
    ]
    const [searchText, setSearchText] = useState("");
    const [performers, setPerformers] = useState<performerResponse>(new performerResponse());
    const [date, setDate] = useState(new Date());
    const [points, setPoints] = useState(-1);
    const [campaigns, setCampaigns] = useState(-1);
    const [amb, setAmb] = useState(-1);
    const [range_end, setRangeEnd] = useState(new Date());
    const [range_start, setRangeStart] = useState(new Date((new Date().setDate((range_end.getDate() - 90)))));
    const [LineData, setLineData] = useState<any>()

    useEffect(() => {
        document.title = "User Reports - Afleet"
        // val.push(arr)


        getReportPerformerData();
        getReportRewardData(range_start, range_end);
        getReportOverAllData(range_start, range_end);
        getReportGraphData(range_start, range_end);
    }, []);

    const getReportPerformerData = () => {
        ClientReportsService.GetReportPerformer(loginMetadata).then((resp) => {
            setPerformers(resp);
        })
    }
    const getReportRewardData = (start_date: any, end_date: any) => {
        ClientReportsService.GetReportReward(loginMetadata, moment(start_date).format("YYYY-MM-DD").toString(), moment(end_date).format("YYYY-MM-DD").toString()).then((resp) => {
            setPoints(resp.total_points);
        })
    }
    const getReportOverAllData = (start_date: any, end_date: any) => {
        ClientReportsService.GetReportOverall(loginMetadata, moment(start_date).format("YYYY-MM-DD").toString(), moment(end_date).format("YYYY-MM-DD").toString()).then((resp) => {
            setCampaigns(resp.total_campaign);
            setAmb(resp.amb_enrolled);
        })
    }

    const getReportGraphData = async (start_date: any, end_date: any) => {
        await ClientReportsService.GetReportGraph(loginMetadata, moment(start_date).format("YYYY-MM-DD").toString(), moment(end_date).format("YYYY-MM-DD").toString()).then((resp) => {
            let arr = LineDataInitial
            for (const element of resp) {
                const ar = element
                arr.push(ar)
            };
            console.log(arr)
            setLineData(arr)
        })
    }

    const LineChartOptions = {
        vAxis: { minValue: 0 },
        series: {
            0: { curveType: 'function' },
            1: { curveType: 'function' },
            2: { curveType: 'function' },
        },
    }
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
                            <IonRow class="reportsHead">
                                Overall Performance Report
                            </IonRow>
                            <IonRow class="reportsSubHead">
                                Hi, welcome to Performance Report dashboard
                            </IonRow>
                            <IonRow>
                                <IonCol style={{ minHeight: "700px", paddingLeft: "0px" }}>
                                    <IonGrid style={{ paddingLeft: "0px" }}>
                                        <IonRow>
                                            <IonCard class="reportsWelcomeCard">
                                                <IonCardContent>
                                                    <IonGrid class="reportsWelcomeGrid">
                                                        <IonRow class="reportsWelcomeFirst">
                                                            Hi, {loginMetadata.first_name + " " + loginMetadata.last_name}
                                                        </IonRow>
                                                        <IonRow class="reportsWelcomeSecond">

                                                            Welcome to Reports
                                                        </IonRow>
                                                        <IonRow class="reportsWelcomeThird">
                                                            Project activity will be updated here.
                                                        </IonRow>
                                                    </IonGrid>
                                                </IonCardContent>
                                            </IonCard>
                                        </IonRow>
                                        <IonRow>
                                            <IonCard class="reportsPerformanceCard">
                                                <IonCardContent class="reportsPerformanceCardContent">
                                                    <IonRow class="performanceCardHeading">Overall Performance Report</IonRow>
                                                    <IonRow>
                                                        <IonCard class="performanceCard">
                                                            <IonCardContent class="performanceCardContent">
                                                                <IonGrid >
                                                                    <IonRow >
                                                                        {/* <IonCol class="performanceCardContent performanceImg">

                                                                        </IonCol> */}
                                                                        <IonCol class=" performanceTitle">
                                                                            <span className="reportsImg"><img src={Image} /></span>
                                                                            <span>Total Campaigns Launched</span>
                                                                        </IonCol>
                                                                        <IonCol class="performancePoints">
                                                                            <IonCard class="performanceCardReport">
                                                                                <IonCardContent class="performanceImg">
                                                                                    {campaigns}
                                                                                </IonCardContent>
                                                                            </IonCard>
                                                                        </IonCol>
                                                                    </IonRow>
                                                                </IonGrid>
                                                            </IonCardContent>
                                                        </IonCard>
                                                    </IonRow>
                                                    <IonRow>
                                                        <IonCard class="performanceCard">
                                                            <IonCardContent class="performanceCardContent">
                                                                <IonGrid >
                                                                    <IonRow >
                                                                        <IonCol class=" performanceTitle">
                                                                            <span className="reportsImg"><img src={Image} /></span>
                                                                            <span>Total Ambassador Enrolled</span>
                                                                        </IonCol>
                                                                        <IonCol class="performancePoints">
                                                                            <IonCard class="performanceCardReport">
                                                                                <IonCardContent class="performanceImg">
                                                                                    {amb}
                                                                                </IonCardContent>
                                                                            </IonCard>
                                                                        </IonCol>
                                                                    </IonRow>
                                                                </IonGrid>
                                                            </IonCardContent>
                                                        </IonCard>
                                                    </IonRow>
                                                </IonCardContent>
                                            </IonCard>
                                        </IonRow>
                                        <IonRow>
                                            <IonCard class="reportsGraphCard">
                                                <IonCardContent>
                                                    <IonRow class="reportsGraphCardHeader">
                                                        Campaign Report
                                                    </IonRow>
                                                    <IonRow>


                                                        <Chart
                                                            width={'100%'}
                                                            height={'300px'}
                                                            chartType="LineChart"
                                                            data={LineData}
                                                            options={LineChartOptions}
                                                        // rootProps={{ 'data-testid': '2' }}
                                                        />
                                                    </IonRow>
                                                </IonCardContent>
                                            </IonCard>
                                            <IonCard class="reportsRewardCard">
                                                <IonCardContent>
                                                    <IonRow>
                                                        <IonCol size="8">
                                                            <IonRow class="rewardCardHeader">
                                                                REWARDS
                                                            </IonRow>
                                                            <IonRow>
                                                                <IonCard class="rewardsCard">
                                                                    <IonCardContent class="rewardsCardContent">
                                                                        <IonGrid>
                                                                            <IonRow class="rewardsTrophy">
                                                                                <img src={Trophy}></img>
                                                                            </IonRow>
                                                                            <IonRow class="rewardsRP">
                                                                                RP&nbsp;{points ? points : 0}
                                                                            </IonRow>
                                                                            <IonRow class="rewardsTotal">
                                                                                Total Rewards
                                                                            </IonRow>
                                                                        </IonGrid>
                                                                    </IonCardContent>
                                                                </IonCard>
                                                            </IonRow>
                                                        </IonCol>
                                                        <IonCol size="4">
                                                            <Link to="/userrewards">
                                                                <IonRow class="rewardViewAll">
                                                                    View All
                                                                </IonRow>
                                                            </Link>
                                                            <IonRow>
                                                                <IonCard class="rewardsPlusCard">
                                                                    <IonCardContent class="rewardCardPlus">
                                                                        <span className="rewardPlus">
                                                                            +
                                                                        </span>
                                                                    </IonCardContent>
                                                                </IonCard>
                                                            </IonRow>
                                                        </IonCol>
                                                    </IonRow>
                                                </IonCardContent>
                                            </IonCard>
                                        </IonRow>
                                    </IonGrid>

                                </IonCol>

                                <IonCol class="reportsRight">
                                    <IonGrid style={{ minWidth: "250px" }}>
                                        <IonRow class="reportsCalendarHead">
                                            Calendar
                                        </IonRow>
                                        <IonRow class="reportsCalendar">
                                            <IonCard class="calendarCard">
                                                <IonCardContent class="calendarContent">
                                                    <Calendar
                                                        minDate={new Date((new Date().setDate((date.getDate() - 90))))}
                                                        maxDate={new Date()}
                                                        selectRange
                                                        onChange={(val: any) => { setRangeStart(val[0]); setRangeEnd(val[1]); getReportRewardData(val[0], val[1]); getReportOverAllData(val[0], val[1]); getReportGraphData(val[0], val[1]) }}
                                                        defaultValue={[range_start, range_end]}
                                                    />
                                                </IonCardContent>
                                            </IonCard>

                                        </IonRow>
                                        <IonRow >
                                            <IonCol size="9" class="topPerformerHead">
                                                Top 5 Performer
                                            </IonCol>
                                            <IonCol size="3" class="topPerformerView">
                                                <a href="/userleaderboard" style={{ color: "#1D7D81" }}>View All</a>
                                            </IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonGrid style={{ paddingLeft: "0px" }}>



                                                {performers.performerList.map((performer: Leaderboard) => {
                                                    return (
                                                        <IonRow>
                                                            <IonCard class="reportsPerformerCard">
                                                                <IonCardContent class="reportsPerformerCardContent">
                                                                    <IonGrid>
                                                                        <IonRow>
                                                                            <IonCol class="performanceCardImgWrapper">
                                                                                <img src={isStringEmpty(performer.image) ? isStringEmpty(performer.ambassador_img) ? defaultImage : performer.ambassador_img : performer.image} className="ClientLeaderboardImage" />
                                                                            </IonCol>
                                                                            <IonCol>
                                                                                <IonRow class="performerName">
                                                                                    {performer.title}
                                                                                </IonRow>
                                                                                <IonRow class="performerRP">
                                                                                    Lifetime RP &nbsp;{performer.lifetime_points}
                                                                                </IonRow>
                                                                            </IonCol>
                                                                        </IonRow>
                                                                    </IonGrid>
                                                                </IonCardContent>
                                                            </IonCard>
                                                        </IonRow>
                                                    );
                                                })}


                                            </IonGrid>
                                        </IonRow>
                                    </IonGrid>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCardContent>
                </IonContent>
            </IonCard>
        </IonPage >
    );
}

export default Reports