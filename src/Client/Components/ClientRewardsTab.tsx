import '../Styles/ClientRewards.css';
import temp from "../../Assets/Images/temprary.svg"
import Edit from "../../Assets/Images/Edit.png"
import Delete from "../../Assets/Images/Delete.png"
import Three from "../../Assets/Images/three.png"
import line from "../../Assets/Images/Line.png"

import { IonButton, IonCard, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonItemDivider, IonLabel, IonPage, IonPopover, IonRadio, IonRadioGroup, IonRow, IonSearchbar, IonSegment, IonSelect, IonSelectOption } from "@ionic/react";
import { create, createOutline, createSharp } from 'ionicons/icons';
import { useState } from 'react';
import { close } from 'ionicons/icons';
interface ClientRewardsTabProps {
    name: string;
}

const ClientRewardsTab: React.FC<ClientRewardsTabProps> = () => {
    const [showPopover, setShowPopover] = useState(false);
    const [gender, setGender] = useState<string>();
    const [nameInput, setNameInput] = useState("");
    const [emailInput, setemailInput] = useState("");
    const [phoneNumberInput, setPhoneNumberInput] = useState("");
    const [email1Input, setemail1Input] = useState("");
    const [superAdminInput, setSuperAdminInput] = useState("");

    return (
        <IonGrid>
            <IonGrid>
                <IonRow class='ClientRewardsTitle'>
                    <IonCol size='0.8' class='ClientRewardsDetail ion-text-center'><IonCheckbox mode ="md"></IonCheckbox></IonCol>
                    <IonCol class="ClientRewardsContent ion-text-center" size='2.5'>Reward Title</IonCol>
                    <IonCol class="ClientRewardsContent ion-text-center" size="2">Number of points</IonCol>
                    <IonCol class="ClientRewardsContent ion-text-center">Description </IonCol>
                    <IonCol class="ClientRewardsContent ion-text-center">Link</IonCol>
                    <IonCol size="1.5"></IonCol>
                </IonRow>
            </IonGrid>
            <IonGrid>
                <IonRow class='ClientRewardsRow'>
                    <IonCol size='0.9' class='ClientRewardsDetail ion-text-center'><IonCheckbox mode ="md"></IonCheckbox></IonCol>
                        <IonCol class='ClientRewardsDetail ion-text-center' size="2.5">
                            <IonRow>
                                <IonCol size="3">
                                <IonImg src={temp} class="ClientRewardsImage" />
                                </IonCol>
                                 <IonCol class='ClientRewardsDetail ion-text-start' > Shivam Gupta</IonCol>
                            </IonRow>
                        </IonCol>
                    <IonCol class='ClientRewardsDetail ion-text-center' size="2">120 Points</IonCol>
                    <IonCol class='ClientRewardsDetail ion-text-center'>+324 6765 777</IonCol>
                    <IonCol class='ClientRewardsDetail ion-text-center'>Australia </IonCol>
                    <IonCol class='ClientRewardsDetail ion-text-center' size="1.5"> <IonRow><IonImg class="ClientRewardsEdit" src={Edit} /> <IonImg class="ClientRewardsEdit" src={Delete} /></IonRow></IonCol>
                </IonRow>
                <IonRow class="line"></IonRow>
            </IonGrid>
        </IonGrid>
    );
};

export default ClientRewardsTab;
