import { IonAlert, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonImg, IonInput, IonRow } from "@ionic/react";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import ProgramDetails from "../Models/ProgramDetails";
import "../styles/AmbassadorSettings.css";
import line from "../../Assets/Images/Line.png";
import { useState } from "react";
import ProgramManagementService from "../Services/ProgramManagementService";


interface PaymentSettingTabProps {
    loginMetadata: LoginMetadata;
    programDetails: ProgramDetails;
    loginfunction: (loginMetadata: LoginMetadata | null) => void;
    setProgramDetails: (value: ProgramDetails) => void;

}

const PaymentSettingTab: React.FC<PaymentSettingTabProps> = ({
    loginMetadata,
    programDetails,
    loginfunction,
    setProgramDetails,
}) => {
    const [editPayment, setEditPayment] = useState(true);
    const [showAlert, setShowAlert] = useState(false);

    const UpdateAmbassadorProgram = async (forceRefresh: boolean) => {
        await ProgramManagementService.UpdateAmbassadorProgram(
            loginMetadata,
            forceRefresh,
            programDetails
        )
    };
    return (

        <IonCard class="paymentSettingsCard">
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => {
                    setShowAlert(false);
                    loginfunction(loginMetadata);
                }}
                message="Details Updated"
            />
            <form onSubmit={(e) => {
                UpdateAmbassadorProgram(false);
                setEditPayment(true);
                setShowAlert(true);
                e.preventDefault();
            }}>
                <IonGrid>
                    <IonRow class="dashboardNameSettings">
                        <IonCol> Personal Details</IonCol>
                        <IonCol class="ion-text-end"> <IonButton
                            fill="outline"
                            class="editButton"
                            onClick={() => {
                                setEditPayment(false);
                            }}
                        >
                            edit
                        </IonButton></IonCol>
                    </IonRow>
                    <IonRow class="paymentTitleRow">
                        <IonCol class="paymentTitle">Paypal Email</IonCol>
                        <IonCol class="paymentTitle">Web3 Wallet</IonCol>
                    </IonRow>
                    <IonRow class="paymentTitleRow showRow">
                        <IonCol>
                            <IonInput
                                disabled={editPayment}
                                placeholder="Paypal Email"
                                class="NameInput1"
                                value={programDetails.paypal_email}
                                type="email"
                                onIonChange={(e) => {
                                    programDetails.paypal_email = e.detail.value ? e.detail.value : "";
                                }}
                            ></IonInput>
                            <IonImg src={line} class="lineSize" />
                        </IonCol>
                        <IonCol>
                            <IonInput
                                disabled={editPayment}
                                placeholder="Web3 Wallet"
                                class="NameInput1"
                                value={programDetails.crypto_wallet}
                                type="text"
                                pattern="[a-zA-Z0-9\s]+"
                                onIonChange={(e) => {
                                    programDetails.crypto_wallet = e.detail.value ? e.detail.value : "";
                                }}
                            ></IonInput>
                            <IonImg src={line} class="lineSize" />
                        </IonCol>
                    </IonRow>
                    <div className="buttonRow paymentTitleRow showRow">
                        <IonButton
                            hidden={editPayment}
                            fill="outline"
                            class="AdminManagementButton2 commonButton backButton1"
                            onClick={() => {
                                setEditPayment(true);
                                loginfunction(loginMetadata);
                            }}
                        >
                            Back
                        </IonButton>
                        <IonButton
                            hidden={editPayment}
                            fill="outline"
                            class="AdminManagementButton2 commonButton saveButton"
                            // expand="block"
                            type="submit"
                        // onClick={() => {
                        //     UpdateAmbassadorProgram(false);
                        //     setEditPayment(true);
                        //     setShowAlert(true);
                        // }}
                        >
                            Save
                        </IonButton>
                    </div>
                </IonGrid>
            </form>
        </IonCard>
    );
};
export default PaymentSettingTab;