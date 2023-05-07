import { IonAlert, IonButton, IonCardSubtitle, IonCol, IonContent, IonFooter, IonGrid, IonIcon, IonImg, IonInput, IonItemDivider, IonPopover, IonRow, IonSegment, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react"
import { closeOutline, list, text } from "ionicons/icons";
import defaultImage from "../../../Assets/Images/campaignDeafult.png";
import { convertToUTC } from "../../../Util/BasicUtilityFunctions";
import { useState } from "react";
import { LoginMetadata } from "../../Models/LoginMetadata";
import AmbassdorInviteDetails from "../../Models/AmbassdorInviteDetails";
interface AmbassadorInviteProps {
    loginMetadata: LoginMetadata;
    showPopover: boolean
    setShowPopover: (value: boolean) => void;
    ambassadorDetails: AmbassdorInviteDetails
    setInvite: (value: boolean) => void;
}

const AmbassadorInvite: React.FC<AmbassadorInviteProps> = (
    {
        loginMetadata,
        showPopover,
        setShowPopover,
        ambassadorDetails,
        setInvite,
    }

) => {
    const onDidDismiss = () => {
        setShowPopover(false);
    }

    return (
        <IonPopover
            isOpen={showPopover}
            backdropDismiss={true}
            onDidDismiss={onDidDismiss}
            id="popover-bottom4"
        >
            <IonContent >
                <IonGrid >
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
                                ambassadorDetails.ambassador_img
                                    ? ambassadorDetails.ambassador_img != ""
                                        ? ambassadorDetails.ambassador_img
                                        : defaultImage
                                    : defaultImage

                            } className="cardPic3 cardPic1" />

                        </IonCol>
                        <IonCol class="rewardTitleWrap">
                            <IonRow class="taskViewTitle">{ambassadorDetails.first_name + " " + ambassadorDetails.last_name}</IonRow>

                        </IonCol>
                    </IonRow>
                    <IonItemDivider style={{ marginBottom: "20px" }}></IonItemDivider>

                    {ambassadorDetails.about ? <IonRow><IonCol size='1'></IonCol><IonCol>About:&nbsp;&nbsp;<span className="rewardDetails">{ambassadorDetails.about}</span></IonCol></IonRow> : null}
                    {ambassadorDetails.url ? <IonRow><IonCol size='1'></IonCol><IonCol>URL:&nbsp;&nbsp;<span className="rewardDetails"><a href={ambassadorDetails.url}>Click Here</a></span></IonCol></IonRow> : null}
                    <IonRow><IonCol size='1'></IonCol><IonCol>Industry:&nbsp;&nbsp;<span className="rewardDetails">{ambassadorDetails.industry}</span></IonCol></IonRow>
                    <IonRow><IonCol size='1'></IonCol><IonCol>Country:&nbsp;&nbsp;<span className="rewardDetails">{ambassadorDetails.country}</span></IonCol></IonRow>


                </IonGrid>

            </IonContent>
            <IonFooter>
                <IonCol size='1' class="ion-text-end" >
                </IonCol>
                <IonCol size="10" class="justify-content-end">
                    <IonSegment mode="md">
                        <IonButton
                            expand="block" fill="outline" class="cardButton1"
                            onClick={() => {
                                setInvite(true);
                            }}>Invite Now</IonButton>
                    </IonSegment>
                </IonCol>

            </IonFooter>
        </IonPopover >
    )
}

export default AmbassadorInvite;