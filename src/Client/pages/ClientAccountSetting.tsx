// import './ExploreContainer.css';

import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonPopover,
  IonRow,
  IonSegment,
  IonText,
  IonTitle,
} from "@ionic/react";
import { useEffect, useState } from "react";
import TopComponent from "../Components/TopComponent";
import { LoginMetadata } from "../Models/LoginMetadata";
import { ManagePackageDetail, ManagePaymentDetail, ManageProgramDetail } from "../Models/Manage";
import { menuController } from "@ionic/core";
import { AmbassadorManageDetail } from "../Models/AmbassadorManageDetail";
import { BsCheck, BsPatchCheck } from "react-icons/bs";
import { MdDownloading, MdOutlineError } from "react-icons/md";
import { AmbassdorCampaignResponse } from "../Models/AmbassdorCampaignResponse";
import { convertToLocale, convertToUTC } from "../../Util/BasicUtilityFunctions";
import {
  GetAllPackageDetails,
  GetAllPaymentDetail,
} from "../Constants/ClientConfig";
import { deflateSync } from "zlib";
import moment from "moment";
import ClientAccountSettingService from "../Services/ClientAccountSettingService";

interface ClientDashboardProps {
  name: string;
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}

const ClientAccountSetting: React.FC<ClientDashboardProps> = ({
  name,
  loginMetadata,
  loginfunction,
}) => {
  interface pieChartModel {
    name: string;
    value: Number;
  }
  const programObj = {
    id: -1,
    expiry_date: "",
    checkout_page: "",
    package_id: -1
  }
  const [showPopover, setShowPopover] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [formResponseList, setFormResponseList] = useState<
    ManagePaymentDetail[]
  >([]);
  const [packageList, setPackageList] = useState<ManagePackageDetail[]>([]);
  const [programDetail, setProgramDetail] = useState<ManageProgramDetail>(programObj);
  const [programPrice, setProgramPrice] = useState<number>(0);
  // const [programExp, setProgramExp] = useState<string>("");
  // const [programCheckout, setProgramCheckout] = useState<string>("");
  // const [programPackageId, setProgramPackageId] = useState<number>(-1);

  let currDateString = new Date().toUTCString();
  let currDate = new Date(currDateString);
  currDate.setDate(currDate.getDate() + 10);
  let exp_date = new Date(programDetail.expiry_date);


  useEffect(() => {
    document.title = "User Account Setting - Afleet"
    // setIsLoading(true);
    console.log("In useEffect");
    if (loginMetadata.program_id == null || loginMetadata.program_id == -1) {
      setShowPopover(true);
      console.log("program id ==> ", loginMetadata.program_id);
    } else {
      let dateStr = new Date().toUTCString();
      currDate = new Date(dateStr);
      currDate.setDate(currDate.getDate() + 10);
      exp_date = new Date(programDetail.expiry_date);

      const PackageDetail = new Promise((resolve, reject) => {
        resolve(
          ClientAccountSettingService.getPackagetDetail(loginMetadata)
        )
      });

      const ProgramPaymentDetail = new Promise((resolve, reject) => {
        resolve(
          ClientAccountSettingService.getPaymentDetail(loginMetadata)
        )
      });
      Promise.all([ProgramPaymentDetail, PackageDetail]).then((values: any) => {
        console.log("cosnoling promise value", values);
        values[1].packageDetailList.map((item: any, index: any) => {
          console.log("hi", values[0].programDetail[0].package_id);
          if (item.id == values[0].programDetail[0].package_id) {
            setProgramPrice(item.price);
          }
        });
        setFormResponseList(values[0].paymentDetailList);
        setProgramDetail(values[0].programDetail[0]);
        setPackageList(values[1].packageDetailList);
      });
      console.log("in else ----------");
    }

    // setIsLoading(false);
  }, []);

  const reverse = (str: string) => {
    const date = str;

    const [year, month, day] = date.split('-');

    const result = [day, month, year].join('-');

    return result;
  }

  console.log("METADATA", loginMetadata);
  return (
    <IonPage>
      <IonCard class="backgroundAdjustment" style={{ background: "#E5E5E5" }}>
        <IonContent scrollX={true} scrollY={true}>
          <TopComponent
            loginMetadata={loginMetadata}
            loginfunction={loginfunction}
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <IonCardContent class="marginForContent">
            <IonGrid class="scrolling">
              <IonRow class="ClientRewardsHeader">
                <IonCol class="ClientRewardsSubHead">Account Setting</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonCard style={{ minWidth: "250px" }}>
                    <IonCardContent>
                      <IonRow>
                        <IonCol class="ion-text-start">
                          <IonCardTitle>Payment Method</IonCardTitle>
                        </IonCol>
                      </IonRow>
                      <IonCard>
                        <IonCardContent>
                          <IonRow>
                            <IonText>
                              <b>Program Name</b>:- {loginMetadata.program_name}
                            </IonText>
                          </IonRow>
                          <IonRow>
                            <IonText>
                              <b>Program Expiry Date</b>:-{" "}
                              {moment(convertToLocale(programDetail.expiry_date)).format("Do MMM YYYY")}
                            </IonText>
                          </IonRow>
                          <IonRow>
                            <IonText><b>Program Price</b>:- ${programPrice}</IonText>
                          </IonRow>
                        </IonCardContent>
                      </IonCard>
                      <IonRow>
                        <IonCol class="ion-text-start">
                          <IonCardTitle>Current Plan</IonCardTitle>
                        </IonCol>
                      </IonRow>
                      {packageList.map((item, index) => {
                        // if(item.id===loginMetadata.package_id){
                        //   setProgramPrice(parseInt(item.price));
                        // }
                        if (programDetail.package_id === item.id)
                          return (
                            <IonCard
                              style={{
                                backgroundColor:
                                  programDetail.package_id === item.id
                                    ? "#d8eeff"
                                    : "none",
                              }}
                            >
                              <IonCardContent>
                                <IonRow>
                                  <IonCol size="11">
                                    <IonCardTitle>
                                      {item.title} ${item.price}
                                    </IonCardTitle>
                                    <IonCardSubtitle>
                                      Run your ambassador program with help of
                                      Afleet...easily
                                    </IonCardSubtitle>
                                  </IonCol>
                                  <IonCol size="1">
                                    <BsPatchCheck
                                      size="20"
                                      style={{ margin: "25%" }}
                                    />
                                  </IonCol>
                                </IonRow>
                              </IonCardContent>
                            </IonCard>
                          );
                      })}
                      <IonRow>
                        {currDate >= exp_date ? (
                          <IonButton
                            onClick={() => {
                              window.open(
                                programDetail.checkout_page,
                                "noopener,noreferrer"
                              );
                            }}
                            color="success"
                            size="default"
                          >
                            Pay Now
                          </IonButton>
                        ) : (
                          <IonButton disabled color="success" size="default">
                            Pay Now
                          </IonButton>
                        )}
                      </IonRow>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard style={{ minWidth: "250px" }}>
                    <IonCardContent>
                      <IonRow>
                        <IonCol class="ion-text-start">
                          <IonCardTitle>Available Plans</IonCardTitle>
                        </IonCol>
                      </IonRow>
                      <IonGrid style={{height: 290}}>
                        <IonContent>
                      {packageList.map((item, index) => {
                        // if(item.id===loginMetadata.package_id){
                        //   setProgramPrice(parseInt(item.price));
                        // }
                        if (programDetail.package_id !== item.id && item.price>programPrice)
                          return (
                            <IonCard
                              style={{
                                backgroundColor:
                                  programDetail.package_id === item.id
                                    ? "#FFF6E9"
                                    : "none",
                              }}
                            >
                              <IonCardContent>
                                <IonRow>
                                  <IonCol>
                                    <IonCardTitle>
                                      {item.title} ${item.price}
                                    </IonCardTitle>
                                    <IonCardSubtitle>
                                      {item.description.length > 65 ? item.description.substring(0,65) + " ...":item.description}
                                    </IonCardSubtitle>
                                  </IonCol>
                                  <IonCol class="ion-text-end">
                                  <IonButton
                            onClick={() => {
                              window.open(
                                item.checkout_page,
                                "noopener,noreferrer"
                              );
                            }}
                            color="success"
                            size="default"
                          >
                            Upgrade
                          </IonButton>
                                  </IonCol>
                                </IonRow>
                              </IonCardContent>
                            </IonCard>
                          );
                      })}</IonContent></IonGrid>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
              <IonGrid>
                <IonRow class="ClientRewardsHead">
                  <IonCol class="ClientRewardsSubHead">Account Settings</IonCol>
                </IonRow>

                <IonGrid className="recruit-amb">
                  <IonRow class="ClientCampaignTitle">
                    <IonCol
                      class="ClientCampaignContent ion-text-start "
                    >
                      Invoice
                    </IonCol>
                    <IonCol
                      class="ClientCampaignContent ion-text-start "
                    >
                      Date
                    </IonCol>
                    <IonCol
                      class="ClientCampaignContent ion-text-start "
                    >
                      Status
                    </IonCol>
                    <IonCol
                      class="ClientCampaignContent ion-text-start "
                    >
                      Amount
                    </IonCol>
                    <IonCol
                      class="ClientCampaignContent ion-text-start "
                    ></IonCol>
                  </IonRow>

                  {formResponseList.map((formData, index: number) => {
                    return (
                      // <IonGrid key={formData.id}>
                      <IonRow class="ClientLeaderboardRow">
                        <IonCol
                          class="ClientLeaderboardDetail ion-text-start"
                        >
                          {formData.invoice_id}
                        </IonCol>
                        <IonCol
                          class="ClientLeaderboardDetail ion-text-start"
                        >
                          {reverse(formData.createdAt.slice(0, -14))}
                        </IonCol>
                        <IonCol
                          class="ClientLeaderboardDetail ion-text-start"
                        >
                          {formData.status === "Success" ? (
                            <IonBadge
                              style={{
                                backgroundColor: "#C3FADC",
                                color: "#25D67A",
                              }}
                            >
                              {" "}
                              <BsCheck /> Paid
                            </IonBadge>
                          ) : (
                            <IonBadge color="danger"> <MdOutlineError /> Failed</IonBadge>
                          )}
                        </IonCol>
                        <IonCol
                          class="ClientLeaderboardDetail ion-text-start"
                        >
                          ${programPrice}
                        </IonCol>
                        <IonCol
                          class="ClientLeaderboardDetail ion-text-start"
                        >
                          {formData.status === "Success" && <MdDownloading
                            size="20"
                            onClick={() => {
                              window.open(
                                formData.invoice_link,
                                "_blank",
                                "noopener,noreferrer"
                              );
                            }}
                          />}
                        </IonCol>
                      </IonRow>
                    );
                  })}
                </IonGrid>
              </IonGrid>
            </IonGrid>
          </IonCardContent>
        </IonContent>
      </IonCard>
    </IonPage>
  );
};

export default ClientAccountSetting;
