import { Redirect, useParams } from "react-router";
import Campaigns from "../../Ambassador/pages/Campaigns";
import Loading from "../components/Loading";
import { LoginMetadata } from "../Models/LoginMetadata";
import AdminDashboard from "./AdminDashboard";
import AdminManagement from "./AdminManagement";
import AdminRecruit from "./AdminRecruit";
import AmbassadorManagement from "./AmbassadorManagement";
import ClientManagement from "./ClientManagement";
import PackageManagement from "./PackageManagement";
import ProgramManagement from "./ProgramManagement";
import ResourceManagement from "./ResourceManagement";
interface PageProps {
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}
const Page: React.FC<PageProps> = ({ loginMetadata, loginfunction }) => {
  const { name } = useParams<{ name: string }>();
  if (name == "dashboard") {
    return (
      <AdminDashboard
        name="Dashboard"
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
      />
    );
  } else if (name == "programmanagement") {
    return (
      <ProgramManagement
        name="Program Management"
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
      />
    );
  } else if (name == "ambassadormanagement") {
    return (
      <AmbassadorManagement
        name="Ambassador Management"
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
      />
    );
  } else if (name == "adminmanagement") {
    return (
      <AdminManagement
        name="Admin Management"
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
      />
    );
  } else if (name == "clientmanagement") {
    return (
      <ClientManagement
        name="Client Management"
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
      />
    );
  } else if (name == "packagemanagement") {
    return (
      <PackageManagement
        name="Admin Management"
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
      />
    );
  }
  else if (name == "promote") {
    return (
      <AdminRecruit
        name="Admin Recruit"
        loginMetadata={loginMetadata}
        loginfunction={loginfunction} />
    );
  }
  else if (name == "resourcemanagement") {
    return (
      <ResourceManagement
        name="Resource Management"
        loginMetadata={loginMetadata}
        loginfunction={loginfunction} />
    );
  }
  return (
    <Redirect to="/dashboard" />
    // <AdminDashboard name="Dashboard" />
  );
};

export default Page;
