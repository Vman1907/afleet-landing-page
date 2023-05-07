

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
} from "@ionic/react";

import { useEffect, useState } from "react";

import TopComponent from "../Components/TopComponent";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import Loading from "../Components/Loading";
import defaultImage from "../../Assets/Images/campaignDeafult.png";
import { isStringEmpty } from "../../Util/BasicUtilityFunctions";
import { GetAmbassadorProgramDetailsUrl } from "../Constants/AmbassadorConfig";
import ProgramDetails from "../Models/ProgramDetails";
import defaultImg from '../../Assets/Images/campaignDeafult.png'
import { AiOutlineEdit, AiOutlineInstagram } from "react-icons/ai";
import ProgramManagementService from "../Services/ProgramManagementService";
import ResourceManagementService from "../Services/ResourceManagement";
import ResourceDetailsList from "../Models/ResourceDetailsList";
import { BsGlobe, BsLinkedin, BsTwitter } from "react-icons/bs";
import { Browser } from "@capacitor/browser";
interface AmbassadorProgramDetailsProps {
  name: string;
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  setShowNoProgram: (value: boolean) => void;
}

const AmbassadorProgramDetails: React.FC<AmbassadorProgramDetailsProps> = ({
  name,
  loginMetadata,
  loginfunction,
  setShowNoProgram,
}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [programDetailsList, setProgramDetailsList] = useState<ProgramDetails>(new ProgramDetails);
  const [resourceList, setResourceList] = useState<ResourceDetailsList>(new ResourceDetailsList());
  const getAmbassadorProgramDetails = () => {
    ProgramManagementService.GetAmbassadorProgram(loginMetadata).then((data) => {
      console.log("Ambassdor Program Details", data)
      setProgramDetailsList(data);
      // console.log("FORM RESPONSES")
      // console.log(data);
    });
    // const requestOptions = {
    //   method: 'POST',
    //   loginMetadata: loginMetadata,
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     'ambassadorId': loginMetadata.id,
    //     'programId': loginMetadata.programId
    //   })
    // };

    // fetch(GetAmbassadorProgramDetailsUrl, requestOptions)
    //   .then(response => response.json())
    //   .then((data) => {
    //     console.log("Ambassdor Program Details", data)
    //     setProgramDetailsList(data);
    //     // console.log("FORM RESPONSES")
    //     // console.log(data);
    //   });
  }


  useEffect(() => {
    document.title = "Program Details - Afleet"
    setIsLoading(false);
    getAmbassadorProgramDetails();
    getResources();

  }, []);
  const getResources = () => {
    ResourceManagementService.getResourcesForAmbassador(loginMetadata).then((result) => {
      setResourceList(result);
    }).catch((error => {
      console.log("Error: ");
      console.log(error.message);
    }))
  }
  if (isLoading) return <Loading />;
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
            <IonGrid>
              {programDetailsList ?

                <IonGrid class="scrolling">
                  <IonCard class="dashboardCard1">

                    <IonRow class="ion-padding" className="amb-programList profileHeader">
                      <IonCol style={{
                        minWidth: "60px",
                        maxWidth: "100px",
                      }}> <img
                        style={{

                          borderRadius: "100%",
                          height: "80px",
                          width: "80px",
                        }}
                        src={isStringEmpty(programDetailsList.program_img) ? defaultImg : programDetailsList.program_img} alt=""></img></IonCol><IonCol>
                        <IonRow class="ion-text-start"
                          className="text-bold"
                          style={{ fontSize: "2rem", textTransform: "capitalize" }}>

                          {programDetailsList.title}
                        </IonRow>
                        <IonRow>
                          {programDetailsList.email}
                        </IonRow>
                      </IonCol>

                    </IonRow>
                    <IonRow>
                      <IonCol class="ion-text-start">
                        <IonCol>
                          <IonCol><AiOutlineInstagram color='#2E77AE' /></IonCol>
                          <IonCol>Instagram:</IonCol>
                        </IonCol>
                        <IonCol className="text-bold" >
                          {isStringEmpty(programDetailsList.instagram_link) ? "N/A" : <a href={programDetailsList.instagram_link}>{programDetailsList.instagram_link}</a>}

                        </IonCol>

                      </IonCol>
                      <IonCol class="ion-text-start">
                        <IonCol>
                          <IonCol><BsTwitter color='#2E77AE' /></IonCol>
                          <IonCol>Twitter:</IonCol>
                        </IonCol>
                        <IonCol className="text-bold" >
                          {isStringEmpty(programDetailsList.twitter_link) ? "N/A" : <a href={programDetailsList.twitter_link}>{programDetailsList.twitter_link}</a>}

                        </IonCol>
                      </IonCol>
                      <IonCol class="ion-text-start">
                        <IonCol>
                          <IonCol><BsLinkedin color='#2E77AE' /></IonCol>
                          <IonCol>Linkedin:</IonCol>
                        </IonCol>
                        <IonCol className="text-bold" >
                          {isStringEmpty(programDetailsList.linkedin_link) ? "N/A" : <a href={programDetailsList.linkedin_link}>{programDetailsList.linkedin_link}</a>}

                        </IonCol>
                      </IonCol>


                    </IonRow>
                    <IonRow>
                      <IonCol size="4" class="ion-text-start">
                        <IonCol>
                          <IonCol>
                            <BsGlobe color='#2E77AE' />
                          </IonCol>
                          <IonCol>

                            Community Link:
                          </IonCol>
                        </IonCol>
                        <IonCol className="text-bold">
                          {isStringEmpty(programDetailsList.community_channel) ? "N/A" : <a href={programDetailsList.community_channel}>{programDetailsList.community_channel}</a>}

                        </IonCol>

                      </IonCol>
                      <IonCol size="4" class="ion-text-start">
                        <IonCol>
                          <IonCol>
                            <BsGlobe color='#2E77AE' />
                          </IonCol>
                          <IonCol>

                            Website Link:
                          </IonCol>
                        </IonCol>
                        <IonCol className="text-bold">
                          {isStringEmpty(programDetailsList.website_link) ? "N/A" : <a href={programDetailsList.website_link}>{programDetailsList.website_link}</a>}

                        </IonCol>

                      </IonCol>

                    </IonRow>

                    <IonRow className="amb-programList" class="ion-padding">
                      <IonCol > About : {programDetailsList.description} </IonCol>
                    </IonRow>
                  </IonCard>
                </IonGrid>

                :
                <></>
              }
            </IonGrid>
          </IonCardContent>

        </IonContent>
      </IonCard>
    </IonPage>
  );
};

export default AmbassadorProgramDetails;
