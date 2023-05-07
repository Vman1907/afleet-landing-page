import {
    IonRow,
    IonCol,
    IonGrid,
    IonPopover,
    IonContent,
    IonCard,
    IonCardContent,
    IonIcon,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import eff from "./../../../Assets/Images/efficiency.png";
import defaultImage from "./../../../Assets/Images/Ellipse.svg";
import defaultImg from "./../../../Assets/Images/campaignDeafult.png";
import { close } from 'ionicons/icons';
import { socialList } from "./../../Models/socialList"
import TaskPopover from "./TaskPopover";
import createClientService from "../../Services/createClientService";
import { LoginMetadata } from "../../Models/LoginMetadata";
import { GetClient } from "../../Models/GetClient";
import { SocialCampaignPlatform } from "../../Constants/CampaignStatusConstant";
import { isStringEmpty } from "../../../Util/BasicUtilityFunctions";
import { BsInfoCircle } from "react-icons/bs";

interface InfoPopover {
    infoPop: boolean;
    setInfoPop: (value: boolean) => void;
    taskPop: boolean
    setTaskPop: (value: boolean) => void;
    loginMetadata: LoginMetadata;
    clientDetail: GetClient;
    setTaskDetails: (value: socialList) => void;
}

const InfoPopover: React.FC<InfoPopover> = ({
    infoPop,
    setInfoPop,
    taskPop,
    setTaskPop,
    loginMetadata,
    clientDetail,
    setTaskDetails
}) => {
    interface pieChartModel {
        name: string, value: Number
    }
    const COLORS = ["#456086", "#F0F3FF"];
    const [efficiencyRate, setEfficiencyRate] = useState<pieChartModel[]>();
    const [amb, setAmb] = useState(0);
    const [success, setSuccess] = useState(0);
    const [pending, setPending] = useState(0);
    const [rate, setRate] = useState(0);
    const [Task, setTask] = useState<socialList[]>([]);
    // const [taskPop, setTaskPop] = useState(false);
    useEffect(() => {
        getRate();
        getTask();
    }, [infoPop])

    const getTask = () => {
        createClientService.GetInfoTask(loginMetadata, clientDetail.id).then((resp) => {
            setTask(resp)
        })
    }
    const getRate = () => {
        createClientService.GetInfoOverall(loginMetadata, clientDetail.id).then((resp) => {
            setAmb(resp.total_amb_enrolled)
            setSuccess(resp.successfull_submission)
            setPending(resp.pending_submission)
            let per;
            if (resp.pending_submission === 0) {
                per = 0;
                setRate(0)
            }
            else {
                const eff = (resp.successfull_submission * 100) / (resp.pending_submission)
                per = eff
                setRate(eff)
            }

            console.log(rate)
            let Data: pieChartModel[] = [

                {
                    name: "EfficiencyRate",
                    value: resp.pending_submission === 0 ? 0 : per
                },
                {
                    name: "Remaining",
                    value: resp.pending_submission === 100 ? 0 : 100 - per
                }
            ];

            setEfficiencyRate(Data);
        })


    }


    return (
        <IonContent>
            <IonPopover
                isOpen={infoPop}
                backdropDismiss={true}
                onDidDismiss={() => {
                    setInfoPop(false)
                }}
                id="infoPopover1"
            >


                <IonRow style={{ justifyContent: "end", paddingTop: "5px" }}>
                    <IonIcon md={close} class="iconSize" size="large" onClick={() => { setInfoPop(false) }}></IonIcon>
                </IonRow>
                <IonRow style={{ padding: "0px 10px 0px 10px" }}>
                    <IonCard class="infoCampaignCard">
                        <IonCardContent style={{ display: "flex" }}>
                            <IonCol>
                                <IonRow class="infoRP">
                                    RP {clientDetail.points}
                                </IonRow>
                                <IonRow className="infoCampaign">{clientDetail.title}</IonRow><IonRow><span className="infoType">{clientDetail.automatic == 1 ? "Automatic" : "Manual"}</span><span className="infoType1" >{clientDetail.status}&nbsp;Campaign{clientDetail.status == "Social" ?
                                    clientDetail.platform == SocialCampaignPlatform.Twitter ? ", Twitter" :
                                        clientDetail.platform == SocialCampaignPlatform.Instagram ? ", Instagram" :
                                            ", Youtube" : null}</span></IonRow>
                                <IonRow class="infoDescription">
                                    {clientDetail.description}
                                </IonRow>
                            </IonCol>
                            <IonCol size="4" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img src={isStringEmpty(clientDetail.campaign_img) ? defaultImg : clientDetail.campaign_img} className="infoCampaignImg" />
                            </IonCol>
                        </IonCardContent>
                    </IonCard>
                </IonRow>
                <IonRow style={{ padding: "0px 10px 10px 10px" }}>
                    <IonCol>
                        <IonCard class="infoTaskCard">
                            <IonCardContent style={{ color: "black", padding: "15px" }}>
                                <IonRow style={{ marginLeft: "10px" }}>Tasks</IonRow>
                                {Task.map((task: socialList, index: number) => {
                                    return (
                                        <IonRow>
                                            <IonCard class="infoTaskCard">
                                                <IonCardContent class="performanceCardContent">
                                                    <IonGrid >
                                                        <IonRow >
                                                            <IonCol class="performanceTitle">
                                                                <span className="infoTaskImg"><img src={defaultImage} /></span>
                                                                <span ><IonRow>{task.title}</IonRow><IonRow style={{ color: "#AEAEAE" }}>Task {index + 1}</IonRow></span>
                                                            </IonCol>
                                                            <IonCol class="performancePoints">
                                                                <IonCard class="performanceCardReport" onClick={() => {
                                                                    setTaskDetails(task)
                                                                    setTaskPop(true);
                                                                }}>
                                                                    <IonCardContent class="performanceImg">
                                                                        View
                                                                    </IonCardContent>
                                                                </IonCard>
                                                            </IonCol>
                                                        </IonRow>
                                                    </IonGrid>
                                                </IonCardContent>
                                            </IonCard>
                                        </IonRow>
                                    );
                                })}

                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                    <IonCol>
                        <IonRow>
                            <IonCol>
                                <IonCard class="infoEnrolled">
                                    <IonCardContent>
                                        <IonRow class="infoEnrollCount">
                                            {amb}
                                        </IonRow>
                                        <IonRow class="infoEnrollText">
                                            Ambassador Enrolled
                                        </IonRow>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol>
                                <IonCard class="infoEnrolled">
                                    <IonCardContent>
                                        <IonRow class="infoEnrollCount">
                                            {success}
                                        </IonRow>
                                        <IonRow class="infoEnrollText">
                                            Successful Submissions
                                        </IonRow>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCard style={{ height: 180, width: "100%" }} class="infoEfficiencyCard">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart width={400} height={400}>
                                        <Pie
                                            data={efficiencyRate}
                                            dataKey="value"
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={75}
                                            fill="#8884d8"
                                        >
                                            <Cell
                                                key={`cell-0`}
                                                fill={COLORS[0]}
                                            />
                                            <Cell
                                                key={`cell-1`}
                                                fill={COLORS[1]}

                                            />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="pieCenter">
                                    <img src={eff} style={{ width: "3vw" }} />
                                    {/* <span style={{ color: "black" }}>Efficiency <BsInfoCircle style={{ cursor: "pointer" }} /></span> */}
                                    <div>
                                        <span style={{ color: "black", marginRight: "2px" }}>Efficiency</span>
                                        <span className="tooltip1">
                                            <span><BsInfoCircle style={{ cursor: "pointer" }} /></span>
                                            <span className="tooltiptext1">
                                                <div style={{ borderBottom: "1px solid white" }}>
                                                    Submissions Approved * 100</div>
                                                <div>Submissions Received</div>
                                            </span>
                                        </span>
                                    </div>
                                    <span className="infoPercent">{pending === 0 ? 0 : Math.ceil(rate)}%</span>
                                </div>
                            </IonCard>

                        </IonRow>
                    </IonCol>
                </IonRow>
            </IonPopover>
        </IonContent>
    );
};

export default InfoPopover;