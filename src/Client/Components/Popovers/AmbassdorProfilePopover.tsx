import {
  IonRow,
  IonCol,
  IonImg,
  IonButton,
  IonGrid,
  IonIcon,
  IonPopover,
  IonCheckbox,
  IonContent,
  IonAvatar,
} from "@ionic/react";
import Delete from "../../../Assets/Images/Delete.png";
import { close } from "ionicons/icons";
import phone from "../../../Assets/Images/Phone.png";
import mail from "../../../Assets/Images/Mail.png";
import { menuController } from "@ionic/core";
import temp from "../../../Assets/Images/campaignDeafult.png";
import { AmbassadorManageDetail } from "../../Models/AmbassadorManageDetail";
import { useEffect, useState } from "react";
import ClientAmbassadorService from "../../Services/ClienAmbassadorService";
import { LoginMetadata } from "../../Models/LoginMetadata";
import AmbassadorProgramDetails from "../../Models/AmbassadorProgramsDetails";
import { AmbassadorProgram } from "../../Models/AmbassadorProgram";
import { AiOutlineAim, AiOutlineDownload, AiOutlineEdit, AiOutlineMail } from "react-icons/ai";
import { IoTrashBin, IoTrashOutline } from "react-icons/io5";
import "../../Styles/ClientManage.css";
import { AmbassdorCampaignSchema, AmbassdorSchema } from "../../Constants/ExcelFileSchema";
import { GenericExcelWriter, SelectiveExcelWriter } from "../../../Util/ExcelWriter";
import CampaignforProgram from "../../Models/CampaignforProgram";
import { isStringEmpty } from "../../../Util/BasicUtilityFunctions";
interface AmbassdorProfilePopoverProps {
  showPopover: boolean;
  setShowPopover: (value: boolean) => void;
  nameInput: string;
  emailInput: string;
  email1Input: string;
  showPopover2: boolean;
  setShowPopover2: (value: boolean) => void;
  tempList: AmbassadorProgram;
  loginMetadata: LoginMetadata;
  getData: () => any;
  setShowRPpop: (value: boolean) => void;
}

const AmbassdorProfilePopover: React.FC<AmbassdorProfilePopoverProps> = ({
  showPopover,
  setShowPopover,
  emailInput,
  email1Input,
  showPopover2,
  setShowPopover2,
  tempList,
  loginMetadata,
  getData,
  setShowRPpop,
}) => {
  const openMenu = async () => {
    await menuController.open();
  }

  const flatAmbassadorList = (element: AmbassadorProgram) => {
    let flatList: any[] = [];
    if (element.campaignList && element.campaignList.length) {
      element.campaignList.forEach((campaign: CampaignforProgram) => {
        let ambassador: any = {};
        ambassador["ambassador_title"] = element.ambassador_title
        ambassador['description'] = element.description
        ambassador['crypto_wallet'] = element.crypto_wallet
        ambassador['paypal_email'] = element.paypal_email
        ambassador['instagram_link'] = element.instagram_link
        ambassador['twitter_link'] = element.twitter_link
        ambassador['linkedin_link'] = element.linkedin_link
        ambassador['website_link'] = element.website_link
        ambassador["ambassador_program_img"] = element.ambassador_program_img;
        ambassador["email"] = element.email;
        ambassador["total_points"] = element.total_points;
        ambassador["lifetime_points"] = element.lifetime_points;
        ambassador["mailing_address"] = element.mailing_address;
        ambassador["mailing_city"] = element.mailing_city;
        ambassador["mailing_state"] = element.mailing_state;
        ambassador["mailing_country"] = element.mailing_country;
        ambassador["title"] = campaign.title;
        ambassador["campaign_img"] = campaign.campaign_img;
        ambassador["archeived"] = campaign.archeived;
        ambassador["completion_status"] = campaign.completion_status;
        ambassador["points"] = campaign.points;
        flatList.push(ambassador)
      })
    }
    else {
      let ambassador: any = {};
      ambassador["ambassador_title"] = element.ambassador_title
      ambassador['description'] = element.description
      ambassador['crypto_wallet'] = element.crypto_wallet
      ambassador['paypal_email'] = element.paypal_email
      ambassador['instagram_link'] = element.instagram_link
      ambassador['twitter_link'] = element.twitter_link
      ambassador['linkedin_link'] = element.linkedin_link
      ambassador['website_link'] = element.website_link
      ambassador["ambassador_program_img"] = element.ambassador_program_img;
      ambassador["email"] = element.email;
      ambassador["total_points"] = element.total_points;
      ambassador["lifetime_points"] = element.lifetime_points;
      ambassador["mailing_address"] = element.mailing_address;
      ambassador["mailing_city"] = element.mailing_city;
      ambassador["mailing_state"] = element.mailing_state;
      ambassador["mailing_country"] = element.mailing_country;
      flatList.push(ambassador)
    }
    return flatList
  };
  useEffect(() => {
    setAllChecked(false);
    setCountChecked(0);
    for (
      var i = 0;
      i < tempList.campaignList.length;
      i++
    ) {
      checked[i] = false;
    }
  }, []);
  const [allChecked, setAllChecked] = useState(false);
  const [countChecked, setCountChecked] = useState(0);

  const [checked, setChecked] = useState<boolean[]>([]);
  return (
    <IonPopover
      isOpen={showPopover2}
      id="popover-bottom2"
      backdropDismiss={true}
      onDidDismiss={() => {
        setShowPopover2(false); setAllChecked(false);
        setCountChecked(0);
        for (
          var i = 0;
          i < tempList.campaignList.length;
          i++
        ) {
          checked[i] = false;
        }
      }}
    >
      <IonContent>
        <IonRow>
          <IonIcon
            md={close}
            class="iconSize setCross"
            size="large"
            style={{ marginTop: "10px" }}
            onClick={() => {
              setShowPopover2(false);
              setAllChecked(false);
              setCountChecked(0);
              for (
                var i = 0;
                i < tempList.campaignList.length;
                i++
              ) {
                checked[i] = false;
              }
            }}
          ></IonIcon>
        </IonRow>
        <IonRow class="popTitle">Ambassador Profile</IonRow>
        <IonRow style={{ display: "flex", justifyContent: "center" }}>
          <img src={isStringEmpty(tempList.ambassador_program_img)
            ? isStringEmpty(tempList.ambassador_img)
              ? temp
              : tempList.ambassador_img :
            tempList.ambassador_program_img} className="popPersonImage" />
        </IonRow>
        <IonRow class="popName">{tempList.ambassador_title}</IonRow>
        <IonRow class="popName2">{tempList.mailing_country}</IonRow>
        <IonRow class="popName3">Total RP -&nbsp;{tempList.total_points}</IonRow>
        <IonRow class="popName3">Lifetime RP -&nbsp;{tempList.lifetime_points}</IonRow>
        <IonRow class="popButton">
          <IonCol class="buttonPopover">
            <IonButton
              class="ClientManageButton"
              fill="outline"
              onClick={() => {
                openMenu();
                GenericExcelWriter(
                  flatAmbassadorList(tempList),
                  AmbassdorCampaignSchema,
                  "Ambassador_Campaigns"
                );
              }}
            >
              <AiOutlineDownload /> &nbsp;Download
            </IonButton>
          </IonCol>
          <IonCol class="buttonPopover">
            <IonButton
              class="ClientManageButton"
              fill="outline"
              onClick={() => {
                setShowRPpop(true)
              }}
            >
              Offer Bonus RP
            </IonButton>
          </IonCol>
          <IonCol class="buttonPopover">
            <IonButton
              class="ClientManageButton"
              fill="outline"
              onClick={() => {
                setShowPopover(true);
                openMenu();
              }}
            >
              <IoTrashOutline /> &nbsp; Delete
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow class="ClientAmbassadorTitle">
          {/* <IonCol size="1" class="ClientAmbassadorContent ion-text-center">
            <IonCheckbox mode ="md" class="ClientAmbassdorCheckBox"
              checked={(countChecked == tempList.campaignList.length) ? true : false}

              onIonChange={(e) => {
                setAllChecked(e.detail.checked);
                if (e.detail.checked) {
                  for (
                    var i = 0;
                    i < tempList.campaignList.length;
                    i++
                  ) {
                    checked[i] = true;
                  }
                  setCountChecked(
                    tempList.campaignList.length
                  );
                } else {
                  for (
                    var i = 0;
                    i < tempList.campaignList.length;
                    i++
                  ) {
                    checked[i] = false;
                  }
                  setCountChecked(0);
                }
              }}></IonCheckbox>
          </IonCol> */}
          <IonCol class="ClientAmbassadorContent ion-text-center" size="5">
            Campaign Name
          </IonCol>
          <IonCol class="ClientAmbassadorContent ion-text-center" size="3">
            RP
          </IonCol>
          <IonCol class="ClientAmbassadorContent"
            size="2"></IonCol>
        </IonRow>
        <IonGrid >
          {tempList.campaignList.map((data, index) => {
            return (

              <IonRow >
                {/* <IonCol size="1" class="ClientAmbassadorContent ion-text-center">
                  <IonCheckbox mode ="md"
                    class="ClientAmbassdorCheckBox"
                    disabled={allChecked}
                    checked={checked[index]}
                    style={{ marginLeft: 20 }}
                    onIonChange={(e) => {
                      if (e.detail.checked) {
                        checked[index] = true;
                        var count = 0;
                        checked.forEach((value) => {
                          if (value) count++;
                        });
                        console.log(count);
                        setCountChecked(count);
                      } else {
                        checked[index] = false;
                        var count = 0;
                        checked.forEach((value) => {
                          if (value) count++;
                        });
                        setCountChecked(count);
                      }
                    }}></IonCheckbox>
                </IonCol> */}
                <IonCol class="ClientAmbassadorManagementDetail ImageColumn" >
                  <img src={data.campaign_img
                    ? data.campaign_img
                    : temp}
                    className="campaignImage"
                  />
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                  {data.title}
                </IonCol>
                <IonCol class="ClientAmbassadorManagementDetail ion-text-center" >
                  {data.points}
                </IonCol>
                <IonCol class="ClientAmbassadorManagementDetail ion-text-center" size="2"
                  onClick={async () => {
                    await ClientAmbassadorService.DeleteAmbassadorProgramCampaign(loginMetadata, data.custom_camp_id, tempList.ambssador_program_id);
                    await getData();
                    setShowPopover2(false);
                  }}
                >
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
export default AmbassdorProfilePopover;
