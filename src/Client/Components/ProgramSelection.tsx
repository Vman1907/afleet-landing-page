import {
  IonImg,
  IonButton,
  IonPopover,
  IonSegment,
  IonList,
  IonRadio,
  IonRadioGroup,
  IonListHeader,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonItem,
  IonLabel,
  IonAvatar,
  IonFooter,
  IonContent,
  IonTitle,
  IonHeader,
  IonSearchbar,
  IonRow,
  IonCol,
  IonCardTitle,
  IonGrid,
} from "@ionic/react";
import { LoginMetadata } from "../Models/LoginMetadata";

import { useEffect, useState } from "react";
import temp from "../../Assets/Images/campaignDeafult.png";
import ClientAmbassadorService from "../Services/ClienAmbassadorService";
import { ProgramDetail, ProgramDetailsResponse } from "../Models/ProgramDetail";
import Loading from "./Loading";
import { StorageService } from "../../Services/StorageService";
import { Redirect } from "react-router";
import Login from "../pages/Login";
import { convertToLocale, isStringEmpty } from "../../Util/BasicUtilityFunctions";
interface ProgramSelectionProps {
  loginMetadata: LoginMetadata;
  showPopover: boolean;
  setShowPopover: (value: boolean) => void;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  setShowNoProgram: (value: boolean) => void;
  getAllCampaignDetails: () => void;
  getAllProgramRewardsDetails: () => void;
  getAmbassadorFormList: () => void;
  setTimeline: (value: boolean) => void;
  setLeaderboard: (value: boolean) => void;
}

const ProgramSelection: React.FC<ProgramSelectionProps> = ({
  showPopover,
  loginMetadata,
  setShowPopover,
  loginfunction,
  setShowNoProgram,
  getAllCampaignDetails,
  getAllProgramRewardsDetails,
  getAmbassadorFormList,
  setTimeline,
  setLeaderboard,
}) => {
  const [programDetails, setProgramDetails] = useState(new ProgramDetailsResponse());
  const [searchText, setSearchText] = useState("");
  const [program, setProgram] = useState(new ProgramDetail());
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<number>(0);
  const [expiredProgram, setExpiredProgram] = useState(false);

  const GetAllProgram = (clientId: number) => {
    setIsLoading(true);
    ClientAmbassadorService.GetAmbassdorProgramDetail(loginMetadata, clientId)
      .then((resp: any) => {
        console.log("asd", resp);
        if (resp.programDetailList.length == 0) {
          StorageService.Logout("Client");
          loginfunction(new LoginMetadata("-1"));
          setShowNoProgram(true);
        }
        if (resp != null) {
          setProgramDetails(resp);
          setProgram(resp.programDetailList[0]);
        }

        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    GetAllProgram(loginMetadata.clientId);
  }, [])

  if (isLoading)
    return <Loading />
  return (
    <IonPopover
      isOpen={showPopover}
      onDidDismiss={() => {
        if (expiredProgram) {
          StorageService.Logout("Client");
          loginfunction(new LoginMetadata("-1"));
          setShowNoProgram(true)
        } else {
          loginfunction(loginMetadata);
        }
      }}
      id="programSelection"
      class="popoverProps PopOverBorderRadiusAdjustment"
      backdropDismiss={false}
    >
      <IonContent scrollX={true} scrollY={true} class="contentSize">
        <IonGrid class="scrolling">

          <IonRow class="listHead">&nbsp;&nbsp; Programs</IonRow>

          <IonItem lines="none" className="searchDesign searchHeader">
            <IonSearchbar mode="md"
              class="searchBar1"
              value={searchText}
              onIonChange={(e) => {
                setSearchText(e.detail.value ? e.detail.value : "");
              }}
            ></IonSearchbar>
          </IonItem>
          <IonList>
            <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)} >
              {programDetails.programDetailList.map(
                (progDetails: ProgramDetail, index: number) => {
                  // console.log(progDetails);
                  return (
                    <IonCard class="cardSize" key={index} onClick={() => setProgram(programDetails.programDetailList[index])}>
                      <IonCardContent>
                        <IonItem lines="none">
                          <IonRadio
                            value={index}
                            slot="start"
                          ></IonRadio>
                          <img
                            src={
                              isStringEmpty(progDetails.program_img)
                                ? temp
                                : progDetails.program_img
                            }
                            className="selectProgramImage"
                            alt="N/A"
                          />
                          <IonCardTitle>
                            {progDetails.title}
                          </IonCardTitle>
                        </IonItem>
                      </IonCardContent>
                    </IonCard>
                  );
                }
              )}
            </IonRadioGroup>
          </IonList>
        </IonGrid>
      </IonContent>
      <IonFooter class="ButtonFooter">
        <IonItem class="ButtonSegment" lines="none">

          <IonButton
            class="ConfirmButton"

            onClick={async () => {
              console.log("Consoling the clicked program", program);
              if (isStringEmpty(program.expiry_date) || convertToLocale(program.expiry_date) < convertToLocale(new Date().toDateString())) {
                setExpiredProgram(true);
                setShowPopover(false);
              } else {
                loginMetadata.program_id = program.id;
                getAllCampaignDetails();
                getAmbassadorFormList();
                loginMetadata.program_name = program.title;
                setShowPopover(false);
                setTimeline(program.timeline ? true : false);
                setLeaderboard(program.leaderboard ? true : false);
                loginMetadata.package_timeline = program.timeline;
                loginMetadata.package_leaderboard = program.leaderboard;
                loginMetadata.mcalendar = program.mcalendar;
                loginMetadata.mleaderboard = program.mleaderboard;
                loginMetadata.mtimeline = program.mtimeline;
                loginMetadata.mrewards = program.mrewards;
                loginMetadata.mcampaign = program.mcampaign;
                loginMetadata.program_img = program.program_img;
                loginMetadata.role = program.role;
                loginMetadata.package_id = program.package_id;
                loginMetadata.invite_ambassadors = program.invite_ambassadors;
                loginMetadata.prog_client_id = program.prog_client_id;
              }
            }}
          >
            Confirm
          </IonButton>
        </IonItem>
      </IonFooter>
    </IonPopover>
  );
};
export default ProgramSelection;
