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
  } from "@ionic/react";
  import line from "../../../Assets/Images/Line.png"
  import { close } from 'ionicons/icons';
  interface RecruitPopoverProps {
    showPopover: boolean;
    setShowPopover: (value: boolean) => void;
    nameInput:string;
    emailInput:string;
    email1Input:string;
  }
  
  const RecruitPopover: React.FC<RecruitPopoverProps> = ({
    showPopover,
    setShowPopover,
    nameInput,
    emailInput,
    email1Input
  }) => {
    
    return (
        <IonPopover isOpen={showPopover} onDidDismiss={() => { setShowPopover(false) }} class="ClientRewardsPopover3">
        <IonGrid class='programManagementPopOverGrid'>
            <IonRow class='ClientRewardsPopoverCloseButton'>
                <IonIcon md={close} class="iconSize" size="large" onClick={() => { setShowPopover(false) }}></IonIcon>
            </IonRow>
            
            <IonRow>
                <IonSegment mode="md" class="AdminPopTitle">
                    Create Recruit Form
                </IonSegment></IonRow>
            <IonRow class="AdminName2">
                Name
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonInput value={nameInput} class="NameInputz" placeholder="Name" >
                    </IonInput>
                    <IonImg src={line} class="lineSize2" />
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonRow class="AdminName2">
                        Email
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonInput value={emailInput} placeholder="email" class="NameInputz">
                            </IonInput>
                            <IonImg src={line} class="lineSize2" />
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol>
                    <IonRow class="AdminName2">
                        Email
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonInput value={email1Input} placeholder="Email" class="NameInputz">
                            </IonInput><IonImg src={line} class="lineSize2" />
                        </IonCol>
                    </IonRow>
                </IonCol>
            </IonRow>
            <IonRow class="borderset">
                <IonGrid>

                </IonGrid>
            </IonRow>
            <IonRow>
                <IonSegment mode="md" >
                    <IonButton fill="outline" class='ClientRewardsButton2' expand="full">
                        Confirm
                    </IonButton>
                </IonSegment>
            </IonRow>
        </IonGrid>
    </IonPopover>
    );
  };
  export default RecruitPopover;
  