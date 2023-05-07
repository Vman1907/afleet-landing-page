import "../Styles/ClientCampaign.css";

import {
    IonAlert,
    IonButton,
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonGrid,
    IonIcon,
    IonImg,
    IonItem,
    IonPopover,
    IonRow,
    IonSegment,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { LoginMetadata } from "../Models/LoginMetadata";
import defaultImage from "./../../Assets/Images/defaultImage.svg";
import createClientService from "../Services/createClientService";
import { BsInfoCircle } from "react-icons/bs";
import CampaignReportCampaign from "../Models/CampaignReportCampaign";
import { isStringEmpty } from "../../Util/BasicUtilityFunctions";
interface CampaignReportTabProps {
    loginMetadata: LoginMetadata;
    option: number;
    getData: () => void;
    totalUGC: number;
    totalCustom: number;
    totalSocial: number;
    totalPoints: number;
    getCampData: (campaignType: number) => void;
    campPoints: number;
    camp: number;
    accept: number;
    pending: number;
    topCamp: CampaignReportCampaign[];
}

const CampaignReportTab: React.FC<CampaignReportTabProps> = ({
    loginMetadata,
    option,
    getData,
    totalUGC,
    totalCustom,
    totalSocial,
    totalPoints,
    getCampData,
    campPoints,
    camp,
    accept,
    pending,
    topCamp,
}) => {
    useEffect(() => {
        getData();
        getCampData(option);
    }, [option])
    if (option == 4) {

        return (
            <IonGrid>
                <IonRow>
                    <IonCol size="8">
                        <IonRow>
                            <IonCard class="campaignReportsCard">
                                <IonCardContent style={{ padding: "20px 40px" }}>
                                    <IonRow class="campaignReportsRP">
                                        RP Allotted &nbsp;{totalPoints}
                                    </IonRow>
                                    <IonRow class="campaignReportsTotal">
                                        Total Campaigns &nbsp;&nbsp;<span style={{ fontSize: "2rem" }}>{totalCustom + totalSocial + totalUGC}</span>
                                    </IonRow>
                                </IonCardContent>
                            </IonCard>
                        </IonRow>
                        <IonRow style={{ width: "100%" }}>
                            <IonCol style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                                <IonCard class="campaginReportsCard1">
                                    <IonCardContent style={{ padding: "20px 40px" }}>
                                        <IonRow class="campaignReportType">
                                            Custom Campaigns
                                        </IonRow>
                                        <IonRow class="campaignReportTypeCount">
                                            {totalCustom}
                                        </IonRow>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                                <IonCard class="campaginReportsCard1">
                                    <IonCardContent style={{ padding: "20px 40px" }}>
                                        <IonRow class="campaignReportType">
                                            UGC Campaigns
                                        </IonRow>
                                        <IonRow class="campaignReportTypeCount">
                                            {totalUGC}
                                        </IonRow>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                                <IonCard class="campaginReportsCard1">
                                    <IonCardContent style={{ padding: "20px 40px" }}>
                                        <IonRow class="campaignReportType">
                                            Social Campaigns
                                        </IonRow>
                                        <IonRow class="campaignReportTypeCount">
                                            {totalSocial}
                                        </IonRow>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                    <IonCol size="4">
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

                    </IonCol>
                </IonRow>
            </IonGrid>
        );
    }
    let campaignType = "";
    if (option == 2) {
        campaignType = "UGC";
    }
    else if (option == 0) {
        campaignType = "Custom";
    }
    else if (option == 1) {
        campaignType = "Social";
    }

    return (
        <IonGrid>
            <IonRow>
                <IonCol size="8">
                    <IonRow>
                        <IonCard class="campaignTypeReportsCard">
                            <IonCardContent style={{ padding: "20px 40px" }}>
                                <IonRow class="campaignReportsRP">
                                    RP Allotted &nbsp;{campPoints}
                                </IonRow>
                                <IonRow class="campaignReportsTotal">
                                    Total {campaignType} Campaigns &nbsp;&nbsp;<span style={{ fontSize: "2rem" }}>{camp}</span>
                                </IonRow>
                            </IonCardContent>
                        </IonCard>
                    </IonRow>
                    <IonRow>
                        <IonCol style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                            <IonCard class="campaginReportsCard1">
                                <IonCardContent style={{ padding: "20px 40px" }}>
                                    <IonRow class="campaignReportType">
                                        Submissions Received
                                    </IonRow>
                                    <IonRow class="campaignReportTypeCount">
                                        {pending}
                                    </IonRow>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                        <IonCol style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                            <IonCard class="campaginReportsCard1">
                                <IonCardContent style={{ padding: "20px 40px" }}>
                                    <IonRow class="campaignReportType">
                                        Submissions Approved
                                    </IonRow>
                                    <IonRow class="campaignReportTypeCount">
                                        {accept}
                                    </IonRow>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                        <IonCol style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                            <IonCard class="campaginReportsCard1 ">
                                <IonCardContent style={{ padding: "20px 40px" }}>
                                    {/* <IonRow class="campaignReportType">
                                        Efficiency Rate &nbsp;<BsInfoCircle title="Efficiency=(Submissions Approved * 100)/(Submissions Received)" style={{ cursor: "pointer" }} />
                                    </IonRow> */}
                                    <div className="campaignReportType">
                                        <span style={{ color: "black", marginRight: "2px" }}>Efficiency</span>
                                        <span className="tooltip1">
                                            <span><BsInfoCircle style={{ cursor: "pointer" }} /></span>
                                            <span className="tooltiptext2">
                                                <div style={{ borderBottom: "1px solid white" }}>
                                                    Submissions Approved * 100</div>
                                                <div>Submissions Received</div>
                                            </span>
                                        </span>
                                    </div>
                                    <IonRow class="campaignReportTypeCount">
                                        {isNaN(Math.round((accept / (pending)) * 100)) ? 0 : (Math.round((accept / (pending)) * 100))}%
                                    </IonRow>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol size="4">
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
                </IonCol>

            </IonRow>
        </IonGrid>
    );
};

export default CampaignReportTab;
