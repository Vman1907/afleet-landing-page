import { Browser } from "@capacitor/browser";
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { lowerCase } from "../../Util/BasicUtilityFunctions";
import defaultImage from "../../Assets/Images/campaignDeafult.png";
import CreateResource from "../components/CreateUpdateResource";
import Loading from "../components/Loading";
import "./../Styles/AdminResources.css";
import TopComponent from "../components/TopComponent";
import { GetResourcesURL } from "../Constants/AdminConfig";
import { LoginMetadata } from "../Models/LoginMetadata";
import { close } from "ionicons/icons";
import ResourceDetails from "../Models/ResourceDetails";
import ResourceDetailsList from "../Models/ResourceDetailsList";
import ResourceManagementService from "../Services/ResourceManagementService";

interface ResourceManagementProps {
  name: string;
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}
const ResourceManagement: React.FC<ResourceManagementProps> = ({
  name,
  loginMetadata,
  loginfunction,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const [selectedResource, setSelectedResource] = useState(
    new ResourceDetails()
  );
  const [resourcesList, setResourcesList] = useState<ResourceDetailsList>(
    new ResourceDetailsList()
  );
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  useEffect(() => {
    getResources();
  }, []);
  const createResource = async () => {
    setIsLoading(true);
    await ResourceManagementService.createResource(
      loginMetadata,
      selectedResource
    )
      .catch((error) => {
        setAlertMessage("Unable to create resource");
        setShowAlert(true);
        setIsLoading(false);
        getResources();
      })
      .then((resp) => {
        setShowPopover(false);
        setAlertMessage("Resource Created Successfully");
        setShowAlert(true);
        setIsLoading(false);
      });

  };
  const getResources = async () => {
    setIsLoading(true);
    await ResourceManagementService.getResources(loginMetadata)
      .then((resp) => {
        setResourcesList(resp);
      })
      .catch((error) => {
        setAlertMessage("Unable to fetch Resources");
        setShowAlert(true);
      });
    setIsLoading(false);
  };
  const deleteResource = async () => {
    setIsLoading(true);
    await ResourceManagementService.deleteResource(
      loginMetadata,
      selectedResource.id
    )
      .then((response) => {
        setAlertMessage("Resource Deleted Successfully");
        setShowAlert(true);
        getResources();
      })
      .catch((error) => {
        setAlertMessage("Unable to delete the Resource. Please try again");
        setShowAlert(true);
        setIsLoading(false);
      });
  };
  return (
    <IonPage>
      <IonCard class="backgroundAdjustment" style={{ background: "#E5E5E5" }}>
        <CreateResource
          showPopover={showPopover}
          setShowPopover={setShowPopover}
          loginMetadata={loginMetadata}
          isLoading={isLoading}
          selectedResource={selectedResource}
          createResource={createResource}
        />
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => {
            setAlertMessage("");
            setShowAlert(false);
          }}
          message={alertMessage}
        />
        <IonAlert
          isOpen={showDeleteAlert}
          message="Are you sure You want to delete this Resource"
          onDidDismiss={() => {
            setShowDeleteAlert(false);
          }}
          buttons={[
            { text: "Cancel", role: "cancel" },
            {
              text: "Yes",
              handler: () => {
                deleteResource();
              },
            },
          ]}
        />
        <IonContent scrollX={true} scrollY={true}>
          <TopComponent
            loginMetadata={loginMetadata}
            searchText={searchText}
            setSearchText={setSearchText}
            loginfunction={loginfunction}
          />

          <IonCardContent class="marginForContent">
            {isLoading ? (
              <Loading />
            ) : (
              <IonGrid class="scrolling">
                <IonRow class="AdminManagementHead">
                  <IonCol class="AdminManagementSubHead">
                    Resource Management
                  </IonCol>
                  <IonCol class="ion-text-end">
                    <IonButton
                      class="AdminManagementButton commonButton"
                      fill="outline"
                      onClick={() => {
                        setSelectedResource(new ResourceDetails());
                        setShowPopover(true);
                      }}
                    >
                      + Create Resource
                    </IonButton>
                  </IonCol>
                </IonRow>
                <IonRow class="cardRow">
                  {resourcesList.detailsList.map((ele, ind) => {
                    return (
                      <IonCard
                        key={ind}
                        class='cardStyle'
                      >
                        {/* <IonRow class="AdminManagementPopoverCloseButton ion-text-end">
                            <IonIcon
                              md={close}
                              class="iconSize"
                              size="large"
                              onClick={() => {
                                setSelectedResource(ele);
                                setShowDeleteAlert(true);
                              }}
                            ></IonIcon>
                          </IonRow> */}
                        <IonSegment>
                          <img
                            src={ele.image_url != "" && ele.image_url != null ? ele.image_url : defaultImage}
                            // style={{ padding: ele.image_url != "" && ele.image_url!= null ? 10 : 28, maxHeight: 175 }}
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
            )}
          </IonCardContent>
        </IonContent>
      </IonCard>
    </IonPage>
  );
};

export default ResourceManagement;
