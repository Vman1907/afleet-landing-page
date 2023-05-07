import {
  IonGrid,
  IonRow,
} from "@ionic/react";
import { lowerCase } from "../../Util/BasicUtilityFunctions";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import CampaignDetails from "../Models/CampaignDetails";
import CampaignCard from "./CampaignCard";

interface AmbassadorCampaignTabProps {
  loginMetadata: LoginMetadata;
  searchText: string;
  campaignList: CampaignDetails[];
  status: string;
  GetCampaignslist: (value: boolean) => void;
}

const AmbassadorCampaignTab: React.FC<AmbassadorCampaignTabProps> = ({
  searchText,
  loginMetadata,
  campaignList,
  status,
  GetCampaignslist,
}) => {

  return (
    <IonGrid>
      <IonRow>
        {campaignList.length > 0 ?
          (<>{campaignList.map((campaign: CampaignDetails, index: number) => {
            if (lowerCase(
              campaign.title
            ).includes(lowerCase(searchText))) {
              return (
                <CampaignCard
                  loginMetadata={loginMetadata}
                  campaignDetails={campaign}
                  status={status}
                  GetCampaignslist={GetCampaignslist}
                />
              );
            }
          })}</>) : <IonRow style={{ display: "flex", justifyContent: "center", marginTop: "100px", width: "100%", fontSize: "1.2rem" }}>
            <div>No campaigns available. Please check back later</div>
          </IonRow>}

      </IonRow>
    </IonGrid>
  );
};
export default AmbassadorCampaignTab;
