import { Redirect, useParams } from "react-router";
import Campaigns from "../../Ambassador/pages/Campaigns";
import Loading from "../Components/Loading";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import AmbassadorDashboard from "./AmbassadorDashboard";
import AmbassadorLeaderboard from "./AmbassadorLeaderboard";
import AmbassadorProgramDetails from "./AmbassadorProgramDetails";
import Resources from "./AmbassadorResources";
import AmbassadorSettings from "./AmbassadorSettings";
import AmbassadorTimeline from "./AmbassadorTimeline";
import AmbassdorRewards from "./AmbassdorRewards";
import Calendars from "./Calendars";
interface PageProps {
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  setShowNoProgram: (value: boolean) => void;
  setTimeline: (value: boolean) => void;
  setLeaderboard: (value: boolean) => void;
  setAmbReward: (value: boolean) => void;
}
const Page: React.FC<PageProps> = ({ loginMetadata, loginfunction, setShowNoProgram, setLeaderboard, setTimeline, setAmbReward }) => {
  const { name } = useParams<{ name: string }>();
  if (name == "dashboard") {
    return (
      <AmbassadorDashboard
        name="Dashboard"
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
        setShowNoProgram={setShowNoProgram}
        setTimeline={setTimeline}
        setLeaderboard={setLeaderboard}
        setAmbReward={setAmbReward}
      />
    );
  }
  // if (name == "programdetails") {
  //   return (
  //     <AmbassadorProgramDetails
  //       name="Dashboard"
  //       loginMetadata={loginMetadata}
  //       loginfunction={loginfunction}
  //       setShowNoProgram={setShowNoProgram}
  //     />
  //   );
  // }
  if (name == "Campaign") {
    return (
      <Campaigns loginMetadata={loginMetadata} loginfunction={loginfunction} />
    );
  }
  if (name == "settings") {
    return (
      <AmbassadorSettings name="" loginMetadata={loginMetadata} loginfunction={loginfunction} />
    );
  }
  if (name == "rewards") {
    return (
      <AmbassdorRewards
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
      />
    );
  }
  if (name == "leaderboard") {
    return (
      <AmbassadorLeaderboard
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
        name="Leaderboard" />
    );
  }
  if (name == "community") {
    return (
      <AmbassadorTimeline
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
        name="Timeline" />
    );
  }
  if (name == "resources") {
    return (
      <Resources
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
        name="Resources" />
    );
  }
  if (name == "calendar") {
    return (
      <Calendars loginMetadata={loginMetadata} loginfunction={loginfunction} />
    )
  }
  return (
    <Redirect to="/dashboard" />
    // <AdminDashboard name="Dashboard" />
  );
};

export default Page;
