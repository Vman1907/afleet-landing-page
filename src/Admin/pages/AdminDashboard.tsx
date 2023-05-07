import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonLabel,
  IonPage,
  IonRow,
} from "@ionic/react";
import {
  PieChart,
  Area,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
} from "recharts";
import "../Styles/AdminDashboard.css";
import { useEffect, useState } from "react";
import { LoginMetadata } from "../Models/LoginMetadata";
import TopComponent from "../components/TopComponent";
import DashboardCount from "../Models/DashboardCount";
import DashboardService from "../Services/DashboardService";
import DashboardPackageCard from "../components/DashboardPackageCard";
import PackageDetails from "../Models/PackageDetails";
import PackageManagementService from "../Services/PackageManagementService";
import PackageListResponse from "../Models/PackageListResponse";
import { lowerCase } from "../../Util/BasicUtilityFunctions";
import Loading from "../components/Loading";
interface AdminDashboardProps {
  name: string;
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const data: any[] | undefined = [];
let totalRevenue = 0;
const AdminDashboard: React.FC<AdminDashboardProps> = ({
  name,
  loginMetadata,
  loginfunction,
}) => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardCount, setDashboardCount] = useState(new DashboardCount());
  const [packageDetailsList, setPackageDetailsList] =
    useState<PackageListResponse>(new PackageListResponse());
  useEffect(() => {
    document.title = "Dashboard - Afleet"
    DashboardService.GetDashboardCount(loginMetadata).then((resp) => {
      console.log(resp);
      setDashboardCount(resp.count);
      data.length = 0;
      let month = new Date().getMonth();
      let i = 0;
      totalRevenue = 0
      while (i < resp.revenue.length) {
        if (month == resp.revenue[i].month - 1) {
          data.push({ month: months[resp.revenue[i].month - 1], revenue: resp.revenue[i].revenue });
          totalRevenue += resp.revenue[i].revenue;
          i++;
        }
        else {
          data.push({ month: months[month], revenue: 0 });
        }
        month = (month + 11) % 12;
        if (data.length == 6) {
          break;
        }
      }
      while (data.length != 6) {
        data.push({ month: months[month], revenue: 0 });
        month = (month + 11) % 12;
      }
      console.log(month);
      data.reverse();
      setIsLoading(false);
    }).catch((e) => {
      console.log(e);
      setIsLoading(false);
    })
  }
    , [])
  const GetAllPackage = (loginMetadata: LoginMetadata) => {

    PackageManagementService.GetPackageList(loginMetadata, false)
      .then((resp) => {
        console.log(resp);
        setPackageDetailsList(resp);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    GetAllPackage(loginMetadata);
  }, []);

  const DashboardCountData = [
    { name: "Admins", value: dashboardCount.admins },
    { name: "Ambassdors", value: dashboardCount.ambassadors },
    { name: "Programs", value: dashboardCount.clients },
  ];
  const COLORS = ["#FA7878", "#1565D8", "#F4BE37"];
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
            {isLoading ? <Loading /> :
              <IonGrid class="scrolling">
                <IonRow class="dashboardName">Dashboard</IonRow>
                <IonRow>
                  <IonCol >
                    <IonCard class="dashboardCard">
                      <IonGrid>
                        <IonRow>
                          <IonCol class="ion-text-start revenueName">
                            Revenue
                          </IonCol>
                          <IonCol class="ion-text-end">Monthly</IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol style={{ height: 250 }}>
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                  top: 5,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                                }}
                              >
                                <defs>
                                  <linearGradient
                                    id="colorUv"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                  >
                                    <stop
                                      offset="50%"
                                      stopColor="#FCCA8080"
                                      stopOpacity={1}
                                    />
                                    <stop
                                      offset="100%"
                                      stopColor="#FFFFFF"
                                      stopOpacity={1}
                                    />
                                  </linearGradient>
                                </defs>

                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area
                                  dot={false}
                                  type="monotone"
                                  dataKey="revenue"
                                  stroke="#FCCA80"
                                  fill="url(#colorUv)"
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </IonCol>
                        </IonRow>
                        <IonRow class="totalRevenueName">Total Revenue</IonRow>
                        <IonRow class="totalRevenueValue">${totalRevenue}</IonRow>
                        {/* <IonRow class="totalRevenueChange">&uarr; 7.00%</IonRow> */}
                      </IonGrid>
                    </IonCard>
                  </IonCol>
                  <IonCol >
                    <IonCard class="dashboardCardPie">
                      <IonGrid>
                        <IonRow>
                          <IonCol class="ion-text-start userTitle">Users</IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol style={{ height: 265 }}>
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart width={400} height={400}>
                                <Pie
                                  data={DashboardCountData}
                                  dataKey="value"
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={70}
                                  outerRadius={90}
                                  fill="#8884d8"
                                  label
                                >
                                  {DashboardCountData.map((entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      stroke="#FCCA80"
                                      fill={COLORS[index % COLORS.length]}
                                    />
                                  ))}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol offset="2" class="ion-text-center userCardText">
                            <IonLabel class="ambassdorDot">&#8226;</IonLabel>
                            &nbsp;&nbsp;Ambassador
                          </IonCol>
                          <IonCol class="ion-text-center userCardText">
                            <IonLabel class="programDot">&#8226;</IonLabel>
                            &nbsp;&nbsp;Programs
                          </IonCol>
                          <IonCol class="ion-text-center userCardText">
                            <IonLabel class="adminDot">&#8226;</IonLabel>
                            &nbsp;&nbsp;Admin
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonCard>
                  </IonCol>
                </IonRow>
                <IonRow class="packageTitle">Package Management</IonRow>
                {packageDetailsList.PackageList && packageDetailsList.PackageList.map((packageDetail: PackageDetails, index: number) => {
                  if (
                    lowerCase(packageDetail.title).includes(lowerCase(searchText)) && packageDetailsList.PackageList[index].status == true
                  ) {
                    return (<IonRow key={index}>
                      <DashboardPackageCard packageDetail={packageDetail} />
                    </IonRow>);
                  }
                })}

              </IonGrid>}
          </IonCardContent>
        </IonContent>
      </IonCard>
    </IonPage>
  );
};

export default AdminDashboard;
