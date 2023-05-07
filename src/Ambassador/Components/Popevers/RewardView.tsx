import { IonAlert, IonButton, IonCardSubtitle, IonCol, IonContent, IonFooter, IonGrid, IonIcon, IonImg, IonInput, IonItemDivider, IonPopover, IonRow, IonSegment, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react"
import { closeOutline, list, text } from "ionicons/icons";
import "../../styles/AmbassadorCampaign.css";
import { LoginMetadata } from "../../Models/AmbassadorLoginMetadata";
import defaultImage from "../../../Assets/Images/campaignDeafult.png";
import { convertToUTC } from "../../../Util/BasicUtilityFunctions";
import { useState } from "react";
import AmbaddsorRewardsModel from "../../Models/AmbaddsorRewardsModel";
interface RewardViewProps {
    loginMetadata: LoginMetadata;
    showPopover: boolean
    setShowPopover: (value: boolean) => void;
    rewardDetails: AmbaddsorRewardsModel
}

const RewardView: React.FC<RewardViewProps> = (
    {
        loginMetadata,
        showPopover,
        setShowPopover,
        rewardDetails,
    }

) => {
    const onDidDismiss = () => {
        setShowPopover(false);
    }

    let result = rewardDetails.expiry_date
    if (rewardDetails.expiry_date) {
        const date = rewardDetails.expiry_date.substring(
            0,
            10
        );

        const [year, month, day] = date.split('-');
        result = [day, month, year].join('-');
    }

    return (
        <IonPopover
            isOpen={showPopover}
            backdropDismiss={true}
            onDidDismiss={onDidDismiss}
            id="popover-bottom4"
        >
            <IonContent scrollX={true} scrollY={true}>
                <IonGrid class="scrolling">
                    <IonRow class="justify-content-end">
                        <IonIcon
                            icon={closeOutline}
                            class="setCross1 iconsize1"
                            size="large"
                            onClick={() => {
                                setShowPopover(false);
                            }}
                        ></IonIcon>
                    </IonRow>
                    <IonRow class="taskHeading">
                        <IonCol style={{
                            minWidth: "60px",
                            maxWidth: "80px",
                            marginRight: "10px"
                        }}>

                            <img src={
                                rewardDetails.reward_img
                                    ? rewardDetails.reward_img != ""
                                        ? rewardDetails.reward_img
                                        : defaultImage
                                    : defaultImage

                            } className="cardPic3 cardPic1" />

                        </IonCol>
                        <IonCol class="rewardTitleWrap">
                            <IonRow class="taskViewTitle">{rewardDetails.title}</IonRow>

                        </IonCol>
                    </IonRow>
                    <IonItemDivider style={{ marginBottom: "20px" }}></IonItemDivider>

                    <IonRow><IonCol size='1'></IonCol><IonCol>Description:&nbsp;&nbsp;<span className="rewardDetails">{rewardDetails.description}</span></IonCol></IonRow>
                    <IonRow><IonCol size='1'></IonCol><IonCol>RP:&nbsp;&nbsp;<span className="rewardDetails">{rewardDetails.points}</span></IonCol></IonRow>
                    <IonRow><IonCol size='1'></IonCol><IonCol>Reward Claim Limit:&nbsp;&nbsp;<span className="rewardDetails">{rewardDetails.cap != 0 ? rewardDetails.cap : "Unlimited"}</span></IonCol></IonRow>
                    <IonRow><IonCol size='1'></IonCol><IonCol>Expiry Date:&nbsp;&nbsp;<span className="rewardDetails">{rewardDetails.expiry_date ? result : "None"}</span></IonCol></IonRow>


                </IonGrid>

            </IonContent>

        </IonPopover >
    )
}

export default RewardView;