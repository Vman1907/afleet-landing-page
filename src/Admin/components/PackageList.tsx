import {
    IonPopover,
    IonGrid,
    IonRow,
    IonIcon,
    IonCol,
    IonImg,
    IonLabel,
    IonSegment,
    IonButton,
    IonContent,
    IonItem,
    IonSearchbar,
    IonRadioGroup,
    IonList,
    IonFooter,
    IonCard,
    IonCardContent,
    IonRadio,
    IonCardTitle,
    IonAlert,
} from "@ionic/react";
import { close } from "ionicons/icons";
import temp from "../../Assets/Images/campaignDeafult.png";
import ProgramDetails from "../Models/ProgramDetails";
import rewardVector from "../../Assets/Images/rewardVector.svg";
import websiteVector from "../../Assets/Images/websiteVector.svg";
import { isStringEmpty } from "../../Util/BasicUtilityFunctions";
import { useEffect, useState } from "react";
import PackageListResponse from "../Models/PackageListResponse";
import PackageDetails from "../Models/PackageDetails";
import ProgramManagementService from "../Services/ProgramManagementService";
import { LoginMetadata } from "../Models/LoginMetadata";

interface PackageListProps {
    showPopover: boolean;
    setShowPopover: (value: boolean) => void;
    setShowConfirmAlert: (value: boolean) => void;
    packageDetailsList: PackageListResponse;
    packag: PackageDetails;
    setPackage: (value: PackageDetails) => void;
    program: ProgramDetails;
    loginMetadata: LoginMetadata;
    ChangePackage: () => void;
}

const PackageList: React.FC<PackageListProps> = ({
    showPopover,
    setShowPopover,
    setShowConfirmAlert,
    packageDetailsList,
    packag,
    setPackage,
    program,
    loginMetadata,
    ChangePackage,
}) => {
    const [searchText, setSearchText] = useState("");

    const [selected, setSelected] = useState<number>(0);
    return (
        <IonPopover
            isOpen={showPopover}
            onDidDismiss={() => {
                setShowPopover(false)
                setSelected(0)
            }}
            id="programSelection"
            class="popoverProps PopOverBorderRadiusAdjustment "
            backdropDismiss={true}
        >
            <IonContent scrollX={true} scrollY={true} class="contentSize">

                <IonGrid class="scrolling">
                    <IonRow class="listHead">&nbsp;&nbsp; Packages</IonRow>

                    <IonItem lines="none" className="searchDesign searchHeader">
                        <IonSearchbar mode="md"
                            class="searchBar1"
                            value={searchText}
                            onIonChange={(e) => {
                                setSearchText(e.detail.value ? e.detail.value : "");
                            }}
                        ></IonSearchbar>
                    </IonItem>
                    <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)} >
                        {packageDetailsList.PackageList.map(
                            (PackageList: PackageDetails, index: number) => {
                                if (
                                    PackageList.title
                                        .toLowerCase()
                                        .includes(searchText.toLowerCase())
                                ) {
                                    return (
                                        <IonCard class="cardSize" key={index} onClick={() => setPackage(packageDetailsList.PackageList[index])}>
                                            <IonCardContent>
                                                <IonItem>
                                                    <IonRadio
                                                        value={index}
                                                        slot="start"
                                                    ></IonRadio>
                                                    <IonGrid>
                                                        <IonRow>
                                                            <IonCol>{PackageList.title}</IonCol>
                                                            <IonCol class='ion-text-end'>$ {PackageList.price}</IonCol>
                                                        </IonRow>
                                                    </IonGrid>
                                                </IonItem>
                                            </IonCardContent>
                                        </IonCard>
                                    );
                                }
                            }
                        )}
                    </IonRadioGroup>
                </IonGrid>
            </IonContent>
            <IonFooter class="ButtonFooter">
                <IonItem class="ButtonSegment" lines="none" >

                    <IonButton
                        class="ConfirmButton"

                        onClick={() => { setShowConfirmAlert(true); setShowPopover(false) }}
                    >
                        Confirm
                    </IonButton>
                </IonItem>
            </IonFooter>
        </IonPopover>
    );
};
export default PackageList;
