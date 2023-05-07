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
  IonAlert,
  IonContent,
  IonDatetime,
  IonModal,
  IonTextarea,
} from "@ionic/react";
import line from "../../../Assets/Images/Line.png";
import moment from "moment";
import rewardCreate from "../../../Assets/Images/RewardCreationTemp.svg"
import { close } from "ionicons/icons";
import ClientRewards from "../../Models/ClientRewards";
import { LoginMetadata } from "../../Models/LoginMetadata";
import Loading from "../Loading";
import { useState } from "react";
import { ImageExtensions } from "../../../Admin/Constants/ImageUploadConstant";
import { FileResponse } from "../../../Admin/Models/FileResponse";
import { FileService } from "../../../Admin/Services/ImageUploadService";
import ImageUploadLoading from "../../../Admin/components/ImageUploadLoading";
import { convertToLocale } from "../../../Util/BasicUtilityFunctions";
interface RewardPopoverProps {
  showPopover: boolean;
  setShowPopover: (value: boolean) => void;
  clientReward: ClientRewards;
  setClientRewards: (value: ClientRewards) => void;
  isLoading: boolean;
  newRewardMode: boolean;
  createNewReward: () => void;
  UpdateReward: () => void;
  loginMetadata: LoginMetadata;
}

const RewardPopover: React.FC<RewardPopoverProps> = ({
  showPopover,
  setShowPopover,
  clientReward,
  setClientRewards,
  isLoading,
  newRewardMode,
  createNewReward,
  UpdateReward,
  loginMetadata,
}) => {
  const [update, setUpdate] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [alert, setAlert] = useState(false);
  let result = clientReward.expiry_date
  if (clientReward.expiry_date) {
    const date = clientReward.expiry_date.substring(
      0,
      10
    );

    const [year, month, day] = date.split('-');
    result = [day, month, year].join('-');
  }

  const upload = (event: any) => {
    if (
      !event ||
      !event.target ||
      !event.target.files ||
      event.target.files.length === 0
    ) {
      return;
    }
    if (event.target.files[0].size <= "524288") {
      setIsUploading(true);

      let file = event.target.files[0] as File;
      FileService.UploadFile(loginMetadata, file, file.name).then(
        (fileResponse: any) => {
          console.log(fileResponse);
          clientReward.reward_img = fileResponse.Location;
          setIsUploading(false);
        }
      );
    }
    else {
      setAlert(true);
    }
  };
  return (
    <IonRow>
      <IonModal
        isOpen={showModal}
        className="modelDesign"
        onDidDismiss={() => {
          setShowModal(false);
        }}
      >
        <IonContent className="contentDesign2">
          <IonDatetime
            className="contentDesign"
            minuteValues="0,15,30,45"
            showDefaultButtons={true}
            min={moment(new Date()).format()}
            max={moment(new Date(new Date().setFullYear(new Date().getFullYear() + 1))).format()}
            value={clientReward.expiry_date}
            onIonChange={(ev) => {
              (clientReward.expiry_date = convertToLocale(
                ev.detail.value!
              ))
            }
            }
          ></IonDatetime>
        </IonContent>
      </IonModal>
      <IonPopover
        isOpen={showPopover}
        onDidDismiss={() => {
          setShowPopover(false);
          setClientRewards(new ClientRewards());
        }}
        // class="ClientRewardsPopover PopOverBorderRadiusAdjustment"
        id="ClientRewardsPopover"
      >
        {isLoading ? (
          <Loading />
        ) : (
          <IonContent scrollX={true} scrollY={true}>
            <IonGrid class="programManagementPopOverGrid scrolling1">
              <IonRow class="ClientRewardsPopoverCloseButton">
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
                <IonSegment mode="md" class="AdminPopTitle">{newRewardMode ? "Create Reward" : "Update Reward"}</IonSegment>
              </IonRow>
              <form onSubmit={newRewardMode ? createNewReward : UpdateReward}>
                <IonRow>
                  <IonAlert
                    isOpen={alert}
                    message="Image size should be less than 512KB"
                    onDidDismiss={() => {
                      setAlert(false);
                    }}
                    backdropDismiss={true}
                  ></IonAlert>
                  <IonCol size="6">
                    <IonRow class="AdminName">Name&nbsp;<span style={{ "color": "red" }}>*</span></IonRow>
                    <IonRow>
                      <IonCol>
                        <IonInput
                          value={clientReward.title}
                          class="NameInput"
                          placeholder="Title"
                          onIonChange={(e) => {
                            clientReward.title = e.detail.value ? e.detail.value : "";
                            setUpdate(update + 1);
                          }}
                          required={true}
                        ></IonInput>
                        <IonImg src={line} class="lineSize" />
                      </IonCol>
                    </IonRow>

                    <IonRow class="AdminName">RP&nbsp;<span style={{ "color": "red" }}>*</span></IonRow>
                    <IonRow>
                      <IonCol>
                        <IonInput
                          value={clientReward.points}
                          placeholder="Points"
                          class="NameInput NumberInput"
                          type="number"
                          min="0"
                          onIonChange={(e) => {
                            clientReward.points = e.detail.value
                              ? e.detail.value
                              : "0";
                            setUpdate(update + 1);

                          }}
                          required={true}
                        ></IonInput>
                        <IonImg src={line} class="lineSize" />
                      </IonCol>
                    </IonRow>
                    <IonRow class="AdminName">Description&nbsp;<span style={{ "color": "red" }}>*</span></IonRow>
                    <IonRow>
                      <IonCol>
                        <IonTextarea
                          placeholder="Description"
                          autoGrow={true}
                          class="Textarea"
                          value={clientReward.description}
                          onIonChange={(e) => {
                            clientReward.description = e.detail.value ? e.detail.value : "";
                            setUpdate(update + 1);
                          }}
                          rows={1}
                          required={true}
                          maxlength={250}

                        ></IonTextarea>
                        {/* <IonInput
                          value={clientReward.description}
                          placeholder="Description"
                          class="NameInput"
                          onIonChange={(e) => {
                            clientReward.description = e.detail.value
                              ? e.detail.value
                              : "";
                            setUpdate(update + 1);
                          }}
                          required={true}
                        ></IonInput> */}
                        <IonImg src={line} class="lineSize" />
                      </IonCol>
                    </IonRow>
                    <IonRow class="AdminName"><IonCol>Expiry Date</IonCol> </IonRow>
                    <IonRow>
                      <IonCol>
                        <IonInput
                          value={result == "--" ? "" : result}
                          placeholder="None if left empty"
                          class="NameInput"
                          onClick={() => { setShowModal(true); }}
                          style={{
                            marginHorizontal: 4,
                            paddingLeft: 8,
                            fontWeight: "bold",
                          }}
                        ></IonInput>
                        <IonImg src={line} class="lineSize" />
                      </IonCol>

                    </IonRow>
                    <IonRow class="AdminName"><IonCol>Reward Claim Limit</IonCol> </IonRow>

                    <IonRow>
                      <IonCol>
                        <IonInput
                          value={clientReward.cap == "0" ? "" : clientReward.cap}
                          placeholder="Unlimited if left empty"
                          class="NameInput NumberInput"
                          onIonChange={(e) => {
                            clientReward.cap = e.detail.value
                              ? e.detail.value
                              : "";
                          }}
                          min="1"
                          type="number"
                        ></IonInput>
                        <IonImg src={line} class="lineSize" />
                      </IonCol>

                    </IonRow>
                  </IonCol>
                  <IonCol size="0.5"></IonCol>
                  <IonCol size="5.5">
                    <IonRow class="borderset2">
                      <IonGrid style={{ height: 300, width: 255 }}>
                        {!isUploading && clientReward.reward_img == "" ?
                          <IonSegment mode="md" class="uploadButtonSegemnt">
                            <IonButton fill="outline">
                              <input
                                id="rewardImage"
                                hidden
                                type="file"
                                name="file"
                                data-max-size="2048"
                                accept={ImageExtensions}
                                onChange={(e) => { upload(e) }}
                              />
                              <label
                                className="labelForIMageUpload"
                                htmlFor="rewardImage"
                                title="Click to upload Image"
                              >
                                {" "}
                                &nbsp;&nbsp;
                              </label>
                              Select Image
                            </IonButton>
                          </IonSegment> :
                          isUploading ? <IonSegment mode="md">
                            <IonImg
                              src={rewardCreate}
                            />
                            <ImageUploadLoading />
                          </IonSegment> : <IonSegment mode="md"><IonImg class="rewardUploadedImage" src={clientReward.reward_img} />
                            <input
                              id="rewardImage2"
                              hidden
                              type="file"
                              name="file"
                              data-max-size="2048"
                              accept={ImageExtensions}
                              onChange={(e) => { upload(e) }}
                            />
                            <label
                              className="labelForIMageUpload2"
                              htmlFor="rewardImage2"
                            >{" "}
                              &nbsp;&nbsp;
                            </label>
                          </IonSegment>
                        }
                      </IonGrid>
                    </IonRow>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonSegment mode="md">
                    <IonButton
                      fill="outline"
                      class="ClientRewardsButton2"
                      expand="full"
                      disabled={isUploading}
                      // onClick={newRewardMode ? createNewReward : UpdateReward}
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
    </IonRow>
  );
};
export default RewardPopover;
