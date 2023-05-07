import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonGrid,
    IonIcon,
    IonLabel,
    IonPage,
    IonPopover,
    IonRow,
    IonSegment,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { LoginMetadata } from "../Models/LoginMetadata";
import TopComponent from "../Components/TopComponent";
import Loading from "../Components/Loading";
import ResourceDetailsList from "../Models/ResourceDetailsList";
import ResourceManagementService from "../Services/ClientResourcesService";
import { Browser } from "@capacitor/browser";
import defaultImage from "../../Assets/Images/campaignDeafult.png";

interface ClientResourcesProps {
    name: string;
    loginMetadata: LoginMetadata;
    loginfunction: (loginMetadata: LoginMetadata | null) => void;
}
const ClientResources: React.FC<ClientResourcesProps> = ({
    name,
    loginMetadata,
    loginfunction,
}) => {
    const [searchText, setSearchText] = useState("");
    const [resourceList, setResourceList] = useState<ResourceDetailsList>(new ResourceDetailsList());
    useEffect(() => {
        document.title = "User Resources - Afleet";
        getResources();
    }, []);
    const getResources = () => {
        ResourceManagementService.getResourcesForClient(loginMetadata).then((result) => {
            setResourceList(result);
        }).catch((error => {
            console.log("Error: ");
            console.log(error.message);
        }))
    }
    return (
        <IonPage>
            <IonCard class="backgroundAdjustment" style={{ background: "#E5E5E5" }}>
                <IonContent>

                    <TopComponent
                        loginMetadata={loginMetadata}
                        loginfunction={loginfunction}
                        searchText={searchText}
                        setSearchText={setSearchText}
                    />

                    <IonCardContent class="marginForContent">
                        <IonGrid className="scrolling">
                            <IonRow class="dashboardName">
                                Afleet Docs
                            </IonRow>
                            <IonRow class="cardRow">
                                {resourceList.detailsList.map((ele, ind) => {
                                    return (
                                        // <IonCol style={{ width: 250, height: 350, margin: 10 }}>
                                        <IonCard
                                            key={ind}
                                            class='cardStyle'
                                        >
                                            <IonSegment>
                                                <img
                                                    src={ele.image_url != "" && ele.image_url != null ? ele.image_url : defaultImage}
                                                    // style={{ padding: ele.image_url != "" && ele.image_url != null ? 10 : 28, maxHeight: 175 }}
                                                    className="resourceImageStyle"
                                                ></img>
                                            </IonSegment>
                                            <IonRow
                                            // onClick={() =>
                                            //   Browser.open({ url: ele.link_to_resource })
                                            // }
                                            >
                                                <a
                                                    href={ele.link_to_resource}
                                                    className="cardTitleStyle"
                                                    target="_blank"
                                                >
                                                    {ele.title}
                                                </a>
                                            </IonRow>
                                            <IonRow>
                                                <IonLabel class="cardDescStyle">
                                                    {ele.description}
                                                </IonLabel>
                                            </IonRow>
                                            {/* <IonSegment style={{    position: 'relative', */}
                                            {/* bottom: '-30px',}}> */}
                                            <IonButton fill="clear" class="resourceViewButton" onClick={() => { Browser.open({ url: ele.link_to_resource }) }}>
                                                View
                                            </IonButton>
                                            {/* </IonSegment> */}
                                        </IonCard>
                                        // </IonCol>
                                    );
                                })}
                            </IonRow>
                        </IonGrid>
                    </IonCardContent>
                </IonContent>
            </IonCard>
        </IonPage >
    );
};

export default ClientResources;
