import { IonCheckbox, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonPopover, IonRow, IonSegment } from "@ionic/react";
import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { LoginMetadata } from "../Models/LoginMetadata";
import "../Styles/ClientManage.css";
import temp from "../../Assets/Images/campaignDeafult.png";
import { AmbassadorProgram } from "../Models/AmbassadorProgram";
import { close } from "ionicons/icons";
import ClientAmbassadorService from "../Services/ClienAmbassadorService";

interface ClientAmbassadorCampaignProps {
    loginMetadata: LoginMetadata;
    tempList: AmbassadorProgram;
    setShowPopover3: (value: boolean) => void;
    showPopover3: boolean;
    getData: () => any;
}

const ClientAmbassadorCampaign: React.FC<ClientAmbassadorCampaignProps> = ({
    loginMetadata,
    tempList,
    setShowPopover3,
    showPopover3,
    getData,
}) => {
    const [checked1, setChecked1] = useState<boolean[]>([]);
    const [countChecked1, setCountChecked1] = useState(0);
    return (
        <IonPopover
            id="popover-bottom5"
            isOpen={showPopover3}
            onDidDismiss={() => {
                setShowPopover3(false);
                setCountChecked1(0);
                for (
                    var i = 0;
                    i < tempList.campaignList.length;
                    i++
                ) {
                    checked1[i] = false;
                }
            }}
            backdropDismiss={true}
        >
            <IonContent>
                <IonRow class="campaignRow ion-text-center">
                    <IonCol size="2">
                        <IonIcon
                            md={close}
                            class="iconSize1"
                            size="large"
                            onClick={() => {
                                setShowPopover3(false);
                                setCountChecked1(0);
                                for (
                                    var i = 0;
                                    i < tempList.campaignList.length;
                                    i++
                                ) {
                                    checked1[i] = false;
                                }

                            }}
                        ></IonIcon>
                    </IonCol>
                    <IonCol class="campaignSelected">
                        {/* {countChecked1} &nbsp;item Selected */}
                        Campaign Details
                    </IonCol>
                </IonRow>
                <IonGrid>
                    {tempList.campaignList.map((data, index) => {
                        return (
                            <IonRow >
                                {/* <IonCol size="2" class="campaignCheckbox">
                                    <IonCheckbox mode ="md"
                                        class="ClientAmbassdorCheckBox"
                                        checked={checked1[index]}

                                        onIonChange={(e) => {
                                            if (e.detail.checked) {
                                                checked1[index] = true;
                                                var count = 0;
                                                checked1.forEach((value) => {
                                                    if (value) count++;
                                                });
                                                console.log(count);
                                                setCountChecked1(count);
                                            } else {
                                                checked1[index] = false;
                                                var count = 0;
                                                checked1.forEach((value) => {
                                                    if (value) count++;
                                                });
                                                setCountChecked1(count);
                                            }
                                        }}
                                    >

                                    </IonCheckbox>
                                </IonCol> */}
                                <IonCol class="campaignImgCol">
                                    <img className="campaignImg" src={data.campaign_img
                                        ? data.campaign_img
                                        : temp} />
                                </IonCol>
                                <IonCol class="campaignTitle">
                                    <IonSegment mode="md" class="campaignDetails">
                                        {data.title}
                                    </IonSegment>
                                    <IonSegment mode="md" class="campaignDetails">
                                        Custom
                                    </IonSegment>
                                </IonCol>
                                <IonCol size="2" class="campaignTrash"
                                    onClick={async () => {
                                        await ClientAmbassadorService.DeleteAmbassadorProgramCampaign(loginMetadata, data.custom_camp_id, tempList.ambssador_program_id);
                                        await getData();
                                        setShowPopover3(false);
                                    }}>
                                    <IoTrashOutline />
                                </IonCol>
                                <IonRow class="line"></IonRow>
                            </IonRow>
                        );

                    })}
                </IonGrid>
            </IonContent>
        </IonPopover>
    );
};
export default ClientAmbassadorCampaign;