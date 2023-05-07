import {
  IonAlert,
  IonButton,
  IonCard,
  IonCol,
  IonGrid,
  IonImg,
  IonInput,
  IonLabel,
  IonRow,
  IonThumbnail,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import ProgramManagementService from "../Services/ProgramManagementService";
import defaultImage from "../../Assets/Images/defaultImage.svg";
import reward from "../../Assets/Images/reward1.svg";
import speakerPhone from "../../Assets/Images/SpeakerPhone.svg";
import "../styles/AmbassadorSettings.css";
import line from "../../Assets/Images/Line.png";
import ProgramDetails from "../Models/ProgramDetails";
import { countryList } from "../../Util/CountryNamesModel";
import Select from "react-select";
import { isStringEmpty } from "../../Util/BasicUtilityFunctions";
import ImageUpload from "./ImageUpload";
import { MdOutlineStars } from "react-icons/md";
import { BsMegaphone } from "react-icons/bs";
import instagram from "./../../Assets/Images/instagram.svg";
import linkedin from "./../../Assets/Images/linkedin.svg";
import twitter from "./../../Assets/Images/Twitter.svg";

interface PersonalSettingsTabProps {
  loginMetadata: LoginMetadata;
  searchText: string;
  programDetails: ProgramDetails;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  setProgramDetails: (value: ProgramDetails) => void;
  setChange: (value: string) => void;
  setChange1: (value: string) => void;
}

const PersonalSettingsTab: React.FC<PersonalSettingsTabProps> = ({
  loginMetadata,
  programDetails,
  loginfunction,
  searchText,
  setProgramDetails,
  setChange,
  setChange1,
}) => {
  const [countCampaigns, setCountCampaigns] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [editPersonal, setEditPersonal] = useState(true);
  const [editLinks, setEditLink] = useState(true);
  const [editSocial, setEditSocial] = useState(true);
  const [editImage, setImage] = useState(true);
  const [countryList1, setCountryList] = useState<any[]>([]);
  const countryList2: any[] = [];

  let name = programDetails.title;
  let country = programDetails.mailing_country;
  let address = programDetails.mailing_address;
  let city = programDetails.mailing_city;
  let state = programDetails.mailing_state;
  let about = programDetails.description;
  let twitterLink = programDetails.twitter_link;
  let instagramLink = programDetails.instagram_link;
  let linkedInLink = programDetails.linkedin_link;
  useEffect(() => {
    countryList.forEach((country) => {
      countryList2.push({
        value: country,
        label: country,
      });
    });
    setCountryList(countryList2);
    GetParticipatedCampaignCount(false);
  }, []);

  const GetParticipatedCampaignCount = (forceRefresh: boolean) => {
    ProgramManagementService.GetParticipatedCampaignsCount(
      loginMetadata,
      forceRefresh
    )
      .then((resp: any) => {
        if (resp != null) setCountCampaigns(resp.count);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const UpdateAmbassadorProgram = async (forceRefresh: boolean) => {
    await ProgramManagementService.UpdateAmbassadorProgram(
      loginMetadata,
      forceRefresh,
      programDetails
    )
      .then((resp: any) => { loginMetadata.ambassadorProgramImg = programDetails.ambassador_program_img; setChange(programDetails.ambassador_program_img); loginMetadata.title = programDetails.title; setChange1(programDetails.title) })
      .catch((e) => {

        console.log(e);
      });
  };

  const setFilePath = (value: string) => {
    programDetails.ambassador_program_img = value;
  }
  const [isUploading, setIsUploading] = useState<boolean>(false);
  return (
    <IonGrid>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => {
          setShowAlert(false);
          loginfunction(loginMetadata);
        }}
        message="Details Updated"
      />
      <IonRow>
        <IonCard class="settingsCard">
          <IonGrid>
            <IonRow >
              <IonCol class="imageCol2" style={{
                minWidth: "60px",
                maxWidth: "100px",
              }}>
                <IonThumbnail class="cardPic">
                  <ImageUpload
                    setImage={setImage}
                    loginMetadata={loginMetadata}
                    ChangeFilePath={setFilePath}
                    filePath={programDetails.ambassador_program_img}
                    ambImg={programDetails.ambassador_img}
                    id="clientProfilePicture"
                    filePathForUploading={"ambassador/ambassador" + loginMetadata.programId.toString() + "/program/"}
                    isUploading={isUploading}
                    setIsUploading={setIsUploading}
                  />
                </IonThumbnail>
              </IonCol>
              <IonCol >
                <IonRow>
                  <IonLabel class="labelHead">{programDetails.title}</IonLabel>
                </IonRow>
                <IonRow>
                  <IonLabel>{programDetails.email}</IonLabel>
                </IonRow>
                <IonRow class="pointRow">
                  <IonCol size="1">
                    <IonRow>
                      <MdOutlineStars size={25} color='#2E77AE' />
                      {/* <IonImg src={reward} /> */}
                    </IonRow>
                  </IonCol>
                  <IonCol size="3">
                    <IonRow class="labelHead">
                      {programDetails.total_points}
                    </IonRow>
                    RP
                  </IonCol>
                  <IonCol size="1">
                    <IonRow>
                      <BsMegaphone size={25} color='#2E77AE' />
                      {/* <IonImg src={speakerPhone} /> */}
                    </IonRow>
                  </IonCol>
                  <IonCol size="6">
                    <IonRow class="labelHead">{countCampaigns}</IonRow>
                    <IonRow>Total Participated Campaigns</IonRow>
                  </IonCol>
                </IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
      </IonRow>
      <IonRow class="dashboardNameSettings">
        Personal Details
        <IonButton
          fill="clear"
          class="editButton"
          onClick={() => {
            setEditPersonal(false);
          }}
        >
          edit
        </IonButton>
      </IonRow>
      <IonRow>
        <IonCol class="AdminName" size="4">
          Name
        </IonCol>
        <IonCol class="AdminName" size="4">
          Country
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="4">
          <IonInput
            disabled={editPersonal}
            placeholder="Name"
            class="NameInput"
            value={name}
            onIonChange={(e) => {
              name = e.detail.value ? e.detail.value : "";
            }}
          ></IonInput>
          <IonImg src={line} class="lineSize" />
        </IonCol>
        <IonCol size="4">
          <IonRow>
            <Select
              isDisabled={editPersonal}
              placeholder={country}
              options={countryList1}
              onChange={(e) => {
                country = e.value;
              }}
              className="filterSelect"
            />
          </IonRow>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol class="AdminName" size="4">
          About
        </IonCol>
      </IonRow>
      <IonRow class="aboutRowSize">
        <IonCol size="8">
          <IonInput
            disabled={editPersonal}
            placeholder="About"
            class="NameInput"
            value={programDetails.description}
            onIonChange={(e) => {
              about = e.detail.value ? e.detail.value : "";
            }}
            maxlength={250}
          ></IonInput>
          <IonImg src={line} class="lineSize" />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol class="AdminName" size="4">
          Address
        </IonCol>
        <IonCol class="AdminName" size="4">
          City
        </IonCol>
        <IonCol class="AdminName" size="4">
          State
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="4">
          <IonInput
            disabled={editPersonal}
            placeholder="Address"
            class="NameInput"
            value={address}
            onIonChange={(e) => {
              address = e.detail.value ? e.detail.value : "";
            }}
          ></IonInput>
          <IonImg src={line} class="lineSize" />
        </IonCol>
        <IonCol size="4">
          <IonInput
            disabled={editPersonal}
            placeholder="City"
            class="NameInput"
            value={city}
            onIonChange={(e) => {
              city = e.detail.value ? e.detail.value : "";
            }}
          ></IonInput>
          <IonImg src={line} class="lineSize" />
        </IonCol>
        <IonCol size="4">
          <IonInput
            disabled={editPersonal}
            placeholder="State"
            class="NameInput"
            value={state}
            onIonChange={(e) => {
              state = e.detail.value ? e.detail.value : "";
            }}
          ></IonInput>
          <IonImg src={line} class="lineSize" />
        </IonCol>
      </IonRow>
      {/* <IonRow class="dashboardNameSettings">
        Links
        <IonButton
          fill="clear"
          class="editButton"
          onClick={() => setEditLink(false)}
        >
          edit
        </IonButton>
      </IonRow>
      <IonRow>
        <IonCol class="AdminName" size="3">
          Twitter Link
        </IonCol>
        <IonCol class="AdminName" size="3">
          LinkedIn Link
        </IonCol>
        <IonCol class="AdminName" size="3">
          Instagram Link
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="3">
          <IonInput
            disabled={editLinks}
            placeholder="Twitter"
            class="NameInput"
            value={programDetails.twitter_link}
            onIonChange={(e) => {}}
          ></IonInput>
          <IonImg src={line} class="lineSize" />
        </IonCol>
        <IonCol size="3">
          <IonInput
            disabled={editLinks}
            placeholder="LinkedIn"
            class="NameInput"
            value={programDetails.website_link}
            onIonChange={(e) => {}}
          ></IonInput>
          <IonImg src={line} />
        </IonCol>
        <IonCol size="3">
          <IonInput
            disabled={editLinks}
            placeholder="Instagram"
            class="NameInput"
            value={programDetails.instagram_link}
            onIonChange={(e) => {}}
          ></IonInput>
          <IonImg src={line} />
        </IonCol>
      </IonRow> */}
      <IonRow class="dashboardNameSettings">
        Social media links
        <IonButton
          fill="clear"
          class="editButton"
          onClick={() => setEditSocial(false)}
        >
          edit
        </IonButton>
      </IonRow>
      <IonRow>
        <IonCol size="3">
          <IonRow>
            <IonCol size="1" class="linkCol">
              <FaTwitter className="linkIcons" />
            </IonCol>
            <IonCol>
              <IonInput
                disabled={editSocial}
                placeholder="Twitter"
                class="NameInput"
                value={twitterLink}
                onIonChange={(e) => {
                  twitterLink = e.detail.value ? e.detail.value : "";
                }}
                type="url"
              ></IonInput>
              <IonImg src={line} class="lineSize" />
            </IonCol>
          </IonRow>
        </IonCol>
        <IonCol size="3">
          <IonRow>
            <IonCol size="1" class="linkCol">
              <FaLinkedinIn className="linkIcons" />
            </IonCol>
            <IonCol>
              <IonInput
                disabled={editSocial}
                placeholder="LinkedIn"
                class="NameInput"
                value={linkedInLink}
                onIonChange={(e) => {
                  linkedInLink = e.detail.value ? e.detail.value : "";
                }}
                type="url"
              ></IonInput>
              <IonImg src={line} />
            </IonCol>
          </IonRow>
        </IonCol>
        <IonCol size="3">
          <IonRow>
            <IonCol size="1" class="linkCol">
              <FaInstagram className="linkIcons" />
            </IonCol>
            <IonCol>
              <IonInput
                disabled={editSocial}
                placeholder="Instagram"
                class="NameInput"
                value={instagramLink}
                onIonChange={(e) => {
                  instagramLink = e.detail.value ? e.detail.value : "";
                }}
                type="url"
              ></IonInput>
              <IonImg src={line} />
            </IonCol>
          </IonRow>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="5"></IonCol>
        <IonCol>
          <IonButton
            hidden={editLinks && editPersonal && editSocial && editImage}
            fill="clear"
            class="AdminManagementButton2 commonButton backButton"
            onClick={() => {
              setEditLink(true);
              setImage(true);
              setEditPersonal(true);
              setEditSocial(true);
              loginfunction(loginMetadata);
            }}
          >
            Back
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton
            hidden={editLinks && editPersonal && editSocial && editImage}
            fill="outline"
            class="AdminManagementButton2 commonButton"
            // expand="block"
            onClick={() => {
              programDetails.title = name;
              programDetails.mailing_country = country;
              programDetails.mailing_address = address;
              programDetails.mailing_city = city;
              programDetails.mailing_state = state;
              programDetails.description = about;
              programDetails.twitter_link = twitterLink;
              programDetails.linkedin_link = linkedInLink;
              programDetails.instagram_link = instagramLink;
              UpdateAmbassadorProgram(false);
              setEditLink(true);
              setImage(true);
              setEditPersonal(true);
              setEditSocial(true);
              setShowAlert(true);
            }}
          >
            Save
          </IonButton>
        </IonCol>
        <IonCol size="4"></IonCol>
      </IonRow>
    </IonGrid>
  );
};
export default PersonalSettingsTab;
