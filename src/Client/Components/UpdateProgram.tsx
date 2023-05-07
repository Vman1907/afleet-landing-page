import {
    IonPopover,
    IonGrid,
    IonRow,
    IonIcon,
    IonImg,
    IonSegment,
    IonCol,
    IonInput,
    IonButton,
    IonModal,
    IonContent,
    IonDatetime,
    IonTextarea,
} from "@ionic/react";
import { close } from "ionicons/icons";
import line from "../../Assets/Images/Line.png";
import { useEffect, useState } from "react";
//   import ImageUpload from "./ImageUpload";
import moment from "moment";
import { isStringEmpty, convertToLocale } from "../../Util/BasicUtilityFunctions";
import ProgramDetails from "../../Ambassador/Models/ProgramDetails";
import ImageUpload from "./ImageUpload";
import { LoginMetadata } from "../Models/LoginMetadata";
import Loading from "../../Admin/components/Loading";
const customStyles = {
    control: (base: any, state: any) => ({
        ...base,
        borderColor: state.isSelected ? "#ffad1a" : "hsl(0, 0%, 50%)",
        boxShadow: "none",
        "&:hover": {
            borderColor: "#ffad1a",
        },
    }),
    option: (base: any, state: any) => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        marginTop: 0,

        background: state.isSelected ? "#ffad1a" : "white",
        "&:hover": {
            background: state.isFocused ? "#fcc358" : "white",
        },
    }),
};
interface UpdateProgramProps {
    loginMetadata: LoginMetadata
    showPopover: boolean;
    setShowPopover: (value: boolean) => void;
    selectedProgram: ProgramDetails;
    updateProgram: (value: any) => void;
    isLoading: boolean;
}

const UpdateProgram: React.FC<UpdateProgramProps> = ({
    loginMetadata,
    showPopover,
    setShowPopover,
    selectedProgram,
    updateProgram,
    isLoading,
}) => {
    const [showModal, setShowModal] = useState(false);
    const [update, setUpdate] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const changeFilePath = (value: string) => {
        selectedProgram.program_img = value;
        setUpdate(update + 1);
    }
    const date = selectedProgram.expiry_date.substring(
        0,
        10
    );

    const [year, month, day] = date.split('-');

    const result = [day, month, year].join('-');
    return (


        <IonPopover
            isOpen={showPopover}
            onDidDismiss={() => {
                setShowPopover(false);
            }}
            // class="ProgramManagementPopoverCreate PopOverBorderRadiusAdjustment"
            id="updateProgramPopover"
        >
            {isLoading ? (
                <Loading />
            ) : (
                <IonContent scrollX={true} scrollY={true}>
                    <IonGrid class="programManagementPopOverGridCreate scrolling1">
                        <IonRow class="AdminManagementPopoverCloseButton ion-text-end">
                            <IonIcon
                                md={close}
                                class="iconSize"
                                size="large"
                                onClick={() => {
                                    setShowPopover(false);
                                }}
                            ></IonIcon>
                        </IonRow>


                        <IonRow>
                            <IonSegment mode="md" class="AdminPopTitle1">Update Program</IonSegment>
                        </IonRow>
                        <IonRow class="ion-text-center" >
                            <ImageUpload
                                loginMetadata={loginMetadata}
                                filePath={selectedProgram.program_img}
                                ChangeFilePath={changeFilePath}
                                id={"programImage"}
                                filePathForUploading={"admin/admin" + loginMetadata.clientId.toString() + "/program/"}
                                isUploading={isUploading}
                                setIsUploading={setIsUploading}
                            />
                        </IonRow>
                        <form onSubmit={(e) => {
                            updateProgram(e)
                            e.preventDefault();
                        }
                        }>
                            <IonRow>
                                <IonCol class="AdminName">Name&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonInput
                                        placeholder="Name"
                                        class="NameInput"
                                        value={selectedProgram.title}
                                        onIonChange={(e) => {
                                            selectedProgram.title = e.detail.value ? e.detail.value : "";
                                            setUpdate(update + 1);
                                        }}
                                        required={true}
                                    ></IonInput>
                                    <IonImg src={line} class="lineSize" />
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol class="AdminName">Website</IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonInput
                                        placeholder="Website"
                                        class="NameInput"
                                        value={selectedProgram.website_link}
                                        onIonChange={(e) => {
                                            selectedProgram.website_link = e.detail.value ? e.detail.value : "";
                                            setUpdate(update + 1);
                                        }}
                                        type="url"
                                    ></IonInput>
                                    <IonImg src={line} />
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol class="AdminName">Community link</IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonInput
                                        placeholder="Community link"
                                        class="NameInput"
                                        value={selectedProgram.community_channel}
                                        onIonChange={(e) => {
                                            selectedProgram.community_channel = e.detail.value ? e.detail.value : "";
                                            setUpdate(update + 1);
                                        }}
                                        type="url"
                                    ></IonInput>
                                    <IonImg src={line} />
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol class="AdminName">About&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>

                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    {/* <IonInput
                                        placeholder="About"
                                        class="NameInput"
                                        value={selectedProgram.description}
                                        onIonChange={(e) => {
                                            selectedProgram.description = e.detail.value ? e.detail.value : "";
                                            setUpdate(update + 1);
                                        }}
                                        required={true}
                                    ></IonInput> */}
                                    <IonTextarea
                                        placeholder="About"
                                        autoGrow={true}
                                        class="Textarea"
                                        value={selectedProgram.description}
                                        onIonChange={(e) => {
                                            selectedProgram.description = e.detail.value ? e.detail.value : "";
                                            setUpdate(update + 1);
                                        }}
                                        rows={1}
                                        required={true}
                                        maxlength={600}

                                    ></IonTextarea>
                                    <IonImg src={line} class="lineSize" />
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol class="AdminName">Instagram</IonCol>
                                <IonCol class="AdminName">LinkedIn</IonCol>
                                <IonCol class="AdminName">Twitter</IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonInput
                                        placeholder="Instagram"
                                        class="NameInput"
                                        value={selectedProgram.instagram_link}
                                        onIonChange={(e) => {
                                            selectedProgram.instagram_link = e.detail.value ? e.detail.value : "";
                                            setUpdate(update + 1);
                                        }}
                                        type="url"
                                    ></IonInput>
                                    <IonImg src={line} class="lineSize" />
                                </IonCol>
                                <IonCol>
                                    <IonInput
                                        placeholder="LinkedIn"
                                        class="NameInput"
                                        value={selectedProgram.linkedin_link}
                                        onIonChange={(e) => {
                                            selectedProgram.linkedin_link = e.detail.value ? e.detail.value : "";
                                            setUpdate(update + 1);
                                        }}
                                        type="url"
                                    ></IonInput>
                                    <IonImg src={line} class="lineSize" />
                                </IonCol>
                                <IonCol>
                                    <IonInput
                                        placeholder="Twitter"
                                        class="NameInput"
                                        value={selectedProgram.twitter_link}
                                        onIonChange={(e) => {
                                            selectedProgram.twitter_link = e.detail.value ? e.detail.value : "";
                                            setUpdate(update + 1);
                                        }}
                                        type="url"
                                    ></IonInput>
                                    <IonImg src={line} class="lineSize" />
                                </IonCol>
                            </IonRow>
                            <IonRow> <IonCol class="AdminName">Expiry Date :&nbsp;<span >{result}</span></IonCol> </IonRow>
                            <IonRow>
                                <IonSegment mode="md">
                                    <IonButton
                                        fill="outline"
                                        class="AdminManagementButton2 commonButton"
                                        expand="full"
                                        disabled={isUploading}
                                        // onClick={
                                        //     updateProgram
                                        // }
                                        type="submit"
                                    >
                                        Confirm
                                    </IonButton>
                                </IonSegment>
                            </IonRow>
                        </form>
                    </IonGrid>
                </IonContent>
            )}
        </IonPopover>
    );
};
export default UpdateProgram;
