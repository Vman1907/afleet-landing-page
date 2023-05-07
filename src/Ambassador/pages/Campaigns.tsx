import {
  IonCard,
  IonCardContent,
  IonContent,
  IonGrid,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { useEffect, useState } from "react";
import TopComponent from "../Components/TopComponent";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import "../styles/AmbassadorCampaign.css";
import CampaignCard from "../Components/CampaignCard";
import queryString from "query-string";


import CampaignDetails from "../Models/CampaignDetails";
import ProgramManagementService from "../Services/ProgramManagementService";
import { CampaignStatus } from "../Constants/AmbassadorEnums"
import AmbassadorSocialMediaService from "../Services/AmbassadorSocialMediaService";
import { StorageService } from "../../Services/StorageService";
import { lowerCase } from "../../Util/BasicUtilityFunctions";
interface CampaignsProps {
  loginMetadata: LoginMetadata;
  loginfunction: (value: LoginMetadata | null) => void;
}

const Campaigns: React.FC<CampaignsProps> = ({
  loginMetadata,
  loginfunction,
}) => {
  const [first, setFirst] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [campaignList, setCampaignList] = useState<CampaignDetails[]>([]);
  useEffect(() => {
    document.title = "Campaign - Afleet"
    GetCampaignslist(true);
    (async () => {
      const { oauth_token, oauth_verifier } = queryString.parse(window.location.search);
      const accessToken = await StorageService.Get("oauth_access_token");
      if (oauth_token && oauth_verifier && !accessToken) {
        try {
          const SS_oauth_token = await StorageService.Get("oauth_token");
          if (oauth_token != SS_oauth_token) {
            console.log("Token Mismatched.");
          }
          const SS_oauth_token_secret = await StorageService.Get("oauth_token_secret");
          AmbassadorSocialMediaService.accessToken(loginMetadata, SS_oauth_token, SS_oauth_token_secret, oauth_verifier);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, []);
  const GetCampaignslist = (forceRefresh: boolean) => {
    ProgramManagementService.GetCampaignsList(loginMetadata, forceRefresh)
      .then((resp: any) => {
        console.log(resp)
        if (resp != null) {
          setCampaignList(resp.campaignList);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <IonPage>
      <IonCard class="backgroundAdjustment" style={{ background: "#E5E5E5" }}>
        <IonContent scrollX={true} scrollY={true}>
          <TopComponent
            loginMetadata={loginMetadata}
            searchText={searchText}
            setSearchText={setSearchText}
            loginfunction={loginfunction}
          />
          <IonCardContent class="marginForContent">
            <IonGrid className="scrolling">
              <IonRow class="dashboardName">Campaigns</IonRow>
              <IonSegment mode="md"
                onIonChange={(e) => { }
                }
                value={first.toString()}
                class="AmbassdorRewardsTab "
              >
                <IonSegmentButton
                  value="0"
                  onClick={() => {
                    setFirst(0);
                  }}
                  defaultChecked={first.toString() == '0'}
                  class="AmbassdorSegmentButton"
                >
                  <IonLabel>Available Campaigns</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton
                  value="1"
                  onClick={() => {
                    setFirst(1);
                  }}
                  class="AmbassdorSegmentButton"
                >
                  <IonLabel>Completed Campaigns</IonLabel>
                </IonSegmentButton>
              </IonSegment>
              <IonRow>
                {campaignList.length > 0 ?
                  (<>{campaignList.map((campaign: CampaignDetails, index: number) => {
                    if (campaign.completion_status === CampaignStatus.COMPLETED && first === 1) {
                      if (lowerCase(
                        campaign.title
                      ).includes(lowerCase(searchText))) {
                        return (
                          <CampaignCard
                            loginMetadata={loginMetadata}
                            campaignDetails={campaign}
                            status="completed"
                            GetCampaignslist={GetCampaignslist}
                          />
                        );
                      }
                    }
                    else if (campaign.completion_status != CampaignStatus.COMPLETED && first === 0) {
                      if (lowerCase(
                        campaign.title
                      ).includes(lowerCase(searchText))) {
                        return (
                          <CampaignCard
                            loginMetadata={loginMetadata}
                            campaignDetails={campaign}
                            status="available"
                            GetCampaignslist={GetCampaignslist}

                          />
                        );
                      }
                    }
                  }
                  )}</>)
                  : <IonRow style={{ display: "flex", justifyContent: "center", marginTop: "200px", width: "100%", fontSize: "1.3rem" }}>
                    <div>No new campaigns available. Please check back later</div>
                  </IonRow>}

              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonContent>
      </IonCard>
    </IonPage >
  );
};

export default Campaigns;
