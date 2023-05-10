import { Redirect, useParams } from "react-router";
import { LoginMetadata } from "../Models/LoginMetadata";
import Calendars from "./Calendars";
import ClientAccountSetting from "./ClientAccountSetting";
import ClientCampaign from "./ClientCampaign";
import ClientDashboard from "./ClientDashboard";
import ClientLeaderboard from "./ClientLeaderboard";
import ClientManage from "./ClientManage";
import ClientProfileSetting from "./ClientProfileSetting";
import ClientRecruit from "./ClientRecruit";
import ClientResources from "./ClientResources";
import ClientRewards from "./ClientRewards";
import ClientTimeline from "./ClientTimeline";
import Reports from "./Reports";
import ResourceManagement from "./ResourceManagement";
// import ClientManagement from './ClientManagement';
// import AmbassadorManagement from './AmbassadorManagement';
// import PackageManagement from './PackageManagement';
// import ProgramManagement from './ProgramManagement';
interface PageProps {
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  setShowNoProgram: (value: boolean) => void;
  setTimeline: (value: boolean) => void;
  setLeaderboard: (value: boolean) => void;
}
const Page: React.FC<PageProps> = ({
  loginMetadata,
  loginfunction,
  setShowNoProgram,
  setLeaderboard,
  setTimeline,
}) => {
  const { name } = useParams<{ name: string }>();
  console.log(
    "page",
    loginMetadata.package_leaderboard,
    loginMetadata.package_timeline
  );
  if (name == "userdashboard") {
    return (
      <ClientDashboard
        name="userDashboard"
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
        setShowNoProgram={setShowNoProgram}
        setTimeline={setTimeline}
        setLeaderboard={setLeaderboard}
      />
    );
  }

  // else if (name == "ProgramDetails") {
  //   return (
  //     <ClientProgramDetails
  //       loginMetadata={loginMetadata}
  //       loginfunction={loginfunction}
  //     />
  //   );
  // }
  else if (name == "Campaign") {
    return (
      <ClientCampaign
        name="ClientCampaign"
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
      />
    );
  } else if (name == "userrewards") {
    return (
      <ClientRewards
        name="ClientRewards"
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
      />
    );
  } else if (name == "usercalendar") {
    return (
      <Calendars loginMetadata={loginMetadata} loginfunction={loginfunction} />
    );
  } else if (name == "usercommunity") {
    return (
      <ClientTimeline
        name="Timeline"
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
      />
    );
  } else if (name == "userreports") {
    return (
      <Reports loginMetadata={loginMetadata} loginfunction={loginfunction} />
    );
  } else if (name == "userleaderboard") {
    return (
      <ClientLeaderboard
        name="Leaderboard"
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
      />
    );
  } else if (name == "usermanage") {
    return (
      <ClientManage
        name="Manage"
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
      />
    );
  } else if (name == "userrecruit") {
    return (
      <ClientRecruit
        name="Recruit"
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
      />
    );
  } else if (name == "afleetdocs") {
    return (
      <ClientResources
        name="Resources"
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
      />
    );
  } else if (name == "useraccountsetting") {
    return (
      <ClientAccountSetting
        name="AccountSetting"
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
      />
    );
  } else if (name == "userprofilesetting") {
    return (
      <ClientProfileSetting
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
      />
    );
  } else if (name == "userresources") {
    return (
      <ResourceManagement
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
        name={"Resource Management"}
      />
    );
  }
  // else if (name == "MediaSetting") {
  //   return (
  //       <ClientMediaSetting name="MediaSetting" loginMetadata={loginMetadata} loginfunction={loginfunction}/>
  //   );
  // }
  return (
    <Redirect to="/userdashboard" />
    // <ClientDashboard name="Dashboard" />
  );
};

export default Page;
