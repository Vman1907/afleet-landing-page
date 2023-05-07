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
  IonLabel,
} from "@ionic/react";
import Loading from "./Loading";
import { close } from "ionicons/icons";
import temp from "../../Assets/Images/temprary.svg";
import ProgramDetails from "../Models/ProgramDetails";
import line from "../../Assets/Images/Line.png";
import "../Styles/ProgramManagement.css";
import Select, { OptionsOrGroups } from 'react-select';
import PackageClientListResponse from "../Models/PackageClientListResponse";
import { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import { LoginMetadata } from "../Models/LoginMetadata";
import moment from "moment";
import { isStringEmpty, convertToLocale } from "../../Util/BasicUtilityFunctions";
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
interface CreateUpdateProgramProps {
  loginMetadata: LoginMetadata
  showPopoverEditUpdate: boolean;
  setShowPopoverEditUpdate: (value: boolean) => void;
  isLoading: boolean;
  selectedProgram: ProgramDetails;
  newProgramMode: boolean;
  createProgram: () => void;
  updateProgram: () => void;
  packageClientList: PackageClientListResponse;
}

const CreateUpdateProgram: React.FC<CreateUpdateProgramProps> = ({
  loginMetadata,
  showPopoverEditUpdate,
  setShowPopoverEditUpdate,
  isLoading,
  selectedProgram,
  newProgramMode,
  createProgram,
  updateProgram,
  packageClientList,
}) => {
  const [clientOptions, setClientOptions] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [packageOptions, setPackageOptions] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  let clientOption: any[] = [];
  let packageOption: any[] = [];
  useEffect(() => {
    packageClientList.clients.forEach(client => {
      clientOption.push({ value: client.id, label: client.first_name + " " + client.last_name + " (" + client.email + ")" })
    });
    packageClientList.packages.forEach(packageDetail => {
      packageOption.push({ value: packageDetail.id, label: packageDetail.title })
    })
    setClientOptions(clientOption);
    setPackageOptions(packageOption);
  }, [showPopoverEditUpdate]);
  const changeFilePath = (value: string) => {
    selectedProgram.program_img = value;
  }
  const date = selectedProgram.expiry_date.substring(
    0,
    10
  );

  const [year, month, day] = date.split('-');

  const result = [day, month, year].join('-');
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
            value={selectedProgram.expiry_date}
            onIonChange={(ev) => {
              (selectedProgram.expiry_date = convertToLocale(
                ev.detail.value!
              ))
            }
            }
          ></IonDatetime>
        </IonContent>
      </IonModal>
      <IonPopover
        isOpen={showPopoverEditUpdate}
        onDidDismiss={() => {
          setShowPopoverEditUpdate(false);
        }}
        class="ProgramManagementPopoverCreate PopOverBorderRadiusAdjustment"
      >
        {isLoading ? (
          <Loading />
        ) : (
          <IonGrid class="programManagementPopOverGridCreate">
            <IonRow class="AdminManagementPopoverCloseButton ion-text-end">
              <IonIcon
                md={close}
                class="iconSize"
                size="large"
                onClick={() => {
                  setShowPopoverEditUpdate(false);
                }}
              ></IonIcon>
            </IonRow>
            <form onSubmit={newProgramMode ? createProgram : updateProgram}>
              <IonRow>
                <IonSegment mode="md" class="AdminPopTitle1">{newProgramMode ? "Create Program" : "Update Program"}</IonSegment>
              </IonRow>
              <IonRow class="ion-text-center">
                <ImageUpload
                  loginMetadata={loginMetadata}
                  filePath={selectedProgram.program_img}
                  ChangeFilePath={changeFilePath}
                  id={"programImage"}
                  filePathForUploading={"admin/admin" + loginMetadata.id.toString() + "/program/"}
                  isUploading={isUploading}
                  setIsUploading={setIsUploading}
                />
              </IonRow>

              <IonRow>
                <IonCol class="AdminName">
                  Name&nbsp;<span style={{ "color": "red" }}>*</span>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonInput
                    placeholder="Name"
                    class="NameInput"
                    value={selectedProgram.title}
                    onIonChange={(e) => {
                      selectedProgram.title = e.detail.value ? e.detail.value : "";
                    }}
                    required={true}
                  ></IonInput>
                  <IonImg src={line} class="lineSize" />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol class="AdminName">Max Reward&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
                <IonCol class="AdminName">Website</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonInput
                    placeholder="Max Rewards"
                    class="NameInput NumberInput"
                    type="number"

                    value={selectedProgram.max_reward}
                    min="0"
                    onIonChange={(e) => {
                      selectedProgram.max_reward = e.detail.value ? e.detail.value : "";
                    }}
                    required={true}

                  ></IonInput>
                  <IonImg src={line} class="lineSize" />
                </IonCol>
                <IonCol>
                  <IonInput
                    placeholder="Website"
                    class="NameInput"
                    value={selectedProgram.website_link}
                    onIonChange={(e) => {
                      selectedProgram.website_link = e.detail.value ? e.detail.value : "";

                    }}
                    type="url"
                  ></IonInput>
                  <IonImg src={line} />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol class="AdminName">Blog</IonCol>
                <IonCol class="AdminName">Ambassador community link</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonInput
                    placeholder="Blog"
                    class="NameInput"
                    value={selectedProgram.community_group}
                    onIonChange={(e) => {
                      selectedProgram.community_group = e.detail.value ? e.detail.value : "";

                    }}
                    type="url"
                  ></IonInput>
                  <IonImg src={line} class="lineSize" />
                </IonCol>
                <IonCol>
                  <IonInput
                    placeholder="Ambassador community link"
                    class="NameInput"
                    value={selectedProgram.community_channel}
                    onIonChange={(e) => {
                      selectedProgram.community_channel = e.detail.value ? e.detail.value : "";

                    }}
                    type="url"
                  ></IonInput>
                  <IonImg src={line} />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol class="AdminName">About&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
                <IonCol class="AdminName">Expiry Date&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonInput
                    placeholder="About"
                    class="NameInput"
                    value={selectedProgram.description}
                    onIonChange={(e) => {
                      selectedProgram.description = e.detail.value ? e.detail.value : "";
                    }}
                    required={true}
                    maxlength={600}
                  ></IonInput>
                  <IonImg src={line} class="lineSize" />
                </IonCol>
                <IonCol>
                  <IonInput
                    placeholder="Program Expiry"
                    class="NameInput"
                    value={result == "--" ? "" : result}
                    onClick={() => { setShowModal(true); }}
                    style={{
                      marginHorizontal: 4,
                      paddingLeft: 8,
                      fontWeight: "bold",
                    }}
                    required={true}
                  ></IonInput>
                  <IonImg src={line} class="lineSize" />
                </IonCol>
              </IonRow>
              {newProgramMode ?
                <IonRow>
                  <IonCol size="6">
                    <IonRow>
                      <IonCol class="AdminName">Package&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
                    </IonRow>

                    <IonRow class='selectRow'>

                      <Select styles={customStyles} options={packageOptions} className="filterSelectProgramManagement" onChange={(value: any) => {
                        selectedProgram.package_id = value.value;
                      }
                      } />
                    </IonRow>
                  </IonCol>
                  <IonCol size="6">
                    <IonRow>
                      <IonCol class="AdminName">Client&nbsp;<span style={{ "color": "red" }}>*</span></IonCol>
                    </IonRow>

                    <IonRow class='selectRow'>

                      <Select styles={customStyles} options={clientOptions} className="filterSelectProgramManagement" onChange={(value: any) => {
                        selectedProgram.email = value.label.split("(")[1].slice(0, -1);
                        selectedProgram.client_id = value.value;

                      }

                      } />
                    </IonRow>
                  </IonCol>
                </IonRow> : null}
              <IonRow>
                <IonSegment mode="md">
                  <IonButton
                    fill="outline"
                    class="AdminManagementButton2 commonButton"
                    expand="full"
                    disabled={isUploading}
                    // onClick={newProgramMode ? createProgram : updateProgram}
                    type="submit"
                  >
                    Confirm
                  </IonButton>
                </IonSegment>
              </IonRow>
            </form>
          </IonGrid>
        )}
      </IonPopover>
    </IonRow>
  );
};
export default CreateUpdateProgram;
