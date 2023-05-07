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
import TopComponent from "../Components/TopComponent";
import defaultImage from "../../Assets/Images/campaignDeafult.png";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import ResourceDetailsList from "../Models/ResourceDetailsList";
import { Browser } from "@capacitor/browser";
import ResourceManagementService from "../Services/ResourceManagement";

interface ResourcesProps {
    name: string;
    loginMetadata: LoginMetadata;
    loginfunction: (loginMetadata: LoginMetadata | null) => void;
}
const Resources: React.FC<ResourcesProps> = ({
    name,
    loginMetadata,
    loginfunction,
}) => {
    const [searchText, setSearchText] = useState("");
    const [resourceList, setResourceList] = useState<ResourceDetailsList>(new ResourceDetailsList());
    useEffect(() => {
        document.title = "Resources  - Afleet";
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
                                Ambassador Resources
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
                                                    // style={{height: 130 , width: 248, objectFit: 'cover'}}
                                                    className='resourceImageStyle'
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
                                            {/* <IonSegment> */}
                                            <IonButton fill="clear" className="resourceViewButton" onClick={() => { Browser.open({ url: ele.link_to_resource }) }}>
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

export default Resources;
