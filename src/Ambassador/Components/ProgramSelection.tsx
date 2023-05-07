import {
  IonImg,
  IonButton,
  IonPopover,

  IonList,
  IonRadio,
  IonRadioGroup,

  IonCard,

  IonCardContent,
  IonItem,

  IonFooter,
  IonContent,

  IonSearchbar,
  IonCardTitle,
  IonRow,
  IonGrid,
} from "@ionic/react";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import { useEffect, useState } from "react";
import temp from "../../Assets/Images/campaignDeafult.png";
import ProgramManagementService from "../Services/ProgramManagementService";
import ProgramDetail from "../Models/ProgramDetails";
import ProgramDetailsResponse from "../Models/ProgramListResponse";
import Loading from "./Loading";
import "../styles/SelectProgram.css";
import { StorageService } from "../../Services/StorageService";
import { Redirect } from "react-router";
import Login from "../pages/Login";
import defaultImage from "../../Assets/Images/defaultImage.svg"
import { convertToLocale, isStringEmpty } from "../../Util/BasicUtilityFunctions";
interface ProgramSelectionProps {
  loginMetadata: LoginMetadata;
  showPopover: boolean;
  setShowPopover: (value: boolean) => void;
  GetCampaignslist: (value: boolean) => void;
  GetProgramDetails: (value: boolean) => void;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  setShowNoProgram: (value: boolean) => void;
  setTimeline: (value: boolean) => void;
  setLeaderboard: (value: boolean) => void;
  setAmbReward: (value: boolean) => void;
  getAmbassadorProgramDetails: () => void;
}

const ProgramSelection: React.FC<ProgramSelectionProps> = ({
  showPopover,
  loginMetadata,
  setShowPopover,
  GetCampaignslist,
  GetProgramDetails,
  loginfunction,
  setShowNoProgram,
  setLeaderboard, setTimeline,
  setAmbReward,
  getAmbassadorProgramDetails,
}) => {
  const [programDetails, setProgramDetails] = useState(new ProgramDetailsResponse());
  const [searchText, setSearchText] = useState("");
  const [program, setProgram] = useState(new ProgramDetail());
  const [isLoading, setIsLoading] = useState(true);
  const [expiredProgram, setExpiredProgram] = useState(false);
  const [selected, setSelected] = useState<number>(0);
  const GetAllProgram = (forceRefresh: boolean) => {
    setIsLoading(true);
    ProgramManagementService.GetProgramList(loginMetadata, forceRefresh)
      .then((resp: any) => {
        if (resp.programList.length == 0) {
          StorageService.Logout("Ambassador");
          loginfunction(new LoginMetadata("-1"));
          setShowNoProgram(true);
        }
        else if (resp != null) {
          console.log(resp);
          setProgramDetails(resp);
          setProgram(resp.programList[0]);
          loginfunction(loginMetadata)
        }

        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    GetAllProgram(false);
  }, [])
  if (isLoading)
    return <Loading />
  return (
    <IonPopover
      isOpen={showPopover}
      onDidDismiss={() => {
        if (expiredProgram) {
          StorageService.Logout("Ambassador");
          loginfunction(new LoginMetadata("-1"));
          setShowNoProgram(true)
        } else {
          loginfunction(loginMetadata);
        }
      }}
      id="programSelection"
      class="popoverProps PopOverBorderRadiusAdjustment "
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
              {programDetails.programList.map(
                (progDetails: ProgramDetail, index: number) => {
                  return (
                    <IonCard class="cardSize" key={index} onClick={() => setProgram(programDetails.programList[index])}>
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
                            {progDetails.program_title}
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
        <IonItem class="ButtonSegment" lines="none" routerLink="/ambassador">

          <IonButton
            class="ConfirmButton"

            onClick={() => {
              if (isStringEmpty(program.expiry_date) || convertToLocale(program.expiry_date) < convertToLocale(new Date().toDateString())) {
                setExpiredProgram(true);
                setShowPopover(false);
              } else {
                loginMetadata.amb_reward = program.amb_reward;
                loginMetadata.ambassadorProgramId = program.id;
                loginMetadata.programId = program.program_id;
                setShowPopover(false);
                GetCampaignslist(true);
                getAmbassadorProgramDetails();
                GetProgramDetails(false);
                loginfunction(loginMetadata);
                setTimeline(program.timeline ? true : false);
                setLeaderboard(program.leaderboard ? true : false);
                setAmbReward(program.amb_reward);
                loginMetadata.package_leaderboard = program.leaderboard;
                loginMetadata.package_timeline = program.timeline;
                loginMetadata.programImg = program.program_img;
                loginMetadata.ambassadorProgramImg = program.ambassador_program_img;
                loginMetadata.title = program.title;
                loginMetadata.programName = program.program_title;
                loginMetadata.programEmail = program.program_email;
                loginMetadata.ambassador_img = program.ambassador_img
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
