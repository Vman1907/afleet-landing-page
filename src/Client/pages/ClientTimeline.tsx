import "../Styles/ClientTimeline.css";

import {
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
} from "@ionic/react";
import { useEffect, useState } from "react";
import { LoginMetadata } from "../Models/LoginMetadata";
import TopComponent from "../Components/TopComponent";
import {
  StreamApp,
  StatusUpdateForm,
  FlatFeed,
  Activity,
  LikeButton,
  CommentField,
  CommentList,
  InfiniteScrollPaginator,
  UserBar,
  CommentItem,
  Textarea,
  NotificationFeed,
} from "react-activity-feed";
import Loading from "../Components/Loading";
import ClientTimelineService from "../Services/ClientTimelineService";
import { capitalizeName, isStringEmpty } from "../../Util/BasicUtilityFunctions";
import { FaComment, FaTrashAlt } from "react-icons/fa";
import ClientProgramService from "../Services/ClientProgramService";
import ProgramDetails from "../../Ambassador/Models/ProgramDetails";
import instagram from "./../../Assets/Images/instagram.svg";
import linkedin from "./../../Assets/Images/linkedin.svg";
import twitter from "./../../Assets/Images/Twitter.svg";
import community from "./../../Assets/Images/community.svg";
import website from "./../../Assets/Images/website.svg";
import temp from "../../Assets/Images/campaignDeafult.png";

interface Credentials {
  apiKey: string;
  appId: string;
  token: string;
  userId: string;
}
interface ClientTimelineProps {
  name: string;
  loginMetadata: LoginMetadata;
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
}
const ClientTimeline: React.FC<ClientTimelineProps> = ({
  name,
  loginMetadata,
  loginfunction,
}) => {
  const [searchText, setSearchText] = useState("");
  const [credentials, setCredentials] = useState<Credentials>({
    apiKey: "",
    appId: "",
    token: "",
    userId: ""
  });
  const [programDetailsList, setProgramDetailsList] = useState<ProgramDetails>(new ProgramDetails);
  const [activityId, setActivityId] = useState("");
  const [activity, setActivity] = useState({});
  const [showDeletePopover, setDeletePopover] = useState(false);
  const [selectedId, setSelectedId] = useState<String>("");

  const deleteCurrentUser = () => {
    ClientTimelineService.DeleteUser(loginMetadata).then((data) => {
      console.log("User Deleted");
      const newCred: Credentials = {
        apiKey: credentials.apiKey,
        appId: credentials.appId,
        token: "",
        userId: ""
      };
      setCredentials(newCred);
    });

    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     'authorization': loginMetadata.tokenString,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     'clientId': loginMetadata.clientId,
    //     'programId': loginMetadata.program_id,
    //     'user_name': loginMetadata.first_name + "-" + loginMetadata.last_name,
    //     'email': loginMetadata.emailId,
    //     'role': "client"
    //   })
    // };

    // fetch(GetClientTimeLineUrl + "/deleteCurrentUser", requestOptions)
    //   .then(response => response.json())
    //   .then((data) => {
    //     console.log("User Deleted");
    //     const newCred: Credentials = {
    //       'apiKey': credentials.apiKey,
    //       'appId': credentials.appId,
    //       'token': ""
    //     }
    //     setCredentials(newCred);
    //   });
  };

  const getClientUserToken = () => {
    ClientTimelineService.GetClientToken(loginMetadata).then((data) => {
      const result: Credentials = {
        apiKey: data.apiKey,
        appId: data.appId,
        token: data.token,
        userId: data.userId
      };
      setCredentials(result);
      // setUserToken((data.token).toString());
    });
    // console.log("--------need token--------")
    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     'authorization': loginMetadata.tokenString,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     'clientId': loginMetadata.clientId,
    //     'programId': loginMetadata.program_id,
    //     'user_name': loginMetadata.first_name + "-" + loginMetadata.last_name,
    //     'email': loginMetadata.emailId,
    //     'role': "client"
    //   })
    // };

    // fetch(GetClientTimeLineUrl + "/getUserToken", requestOptions)
    //   .then(response => response.json())
    //   .then((data) => {
    //     console.log("TOKEN : ", data.token);
    //     const result: Credentials = {
    //       'apiKey': data.apiKey,
    //       'appId': data.appId,
    //       'token': data.token
    //     }
    //     setCredentials(result);
    //     // setUserToken((data.token).toString());

    //   });
  };
  const randomGen = () => {
    const min = 1;
    const max = 100;
    const time = Date.now();
    return time.toString() + (min + Math.random() * (max - min)).toString();
  };

  const onRemoveActivity = (activityId: any, activity: any) => {
    ClientTimelineService.RemoveActivity(
      loginMetadata,
      activityId,
      activity
    ).then((result) => {
      const newCred: Credentials = {
        apiKey: credentials.apiKey,
        appId: credentials.appId,
        token: "",
        userId: ""
      };
      setCredentials(newCred);
      setTimeout(() => getClientUserToken(), 10);
    });
  };
  const getClientProgramDetails = () => {
    ClientProgramService.ClientProgram(loginMetadata).then((data) => {
      setProgramDetailsList(data);
    });
  }
  let group = "user"
  useEffect(() => {
    document.title = "User Timeline - Afleet";
    if (credentials.token === "") getClientUserToken();
    getClientProgramDetails();
  }, []);

  const commentRename = (comment: any) => {
    if (comment.user.data.name == "Unknown") {
      comment.user.data.name = capitalizeName(comment.user_id.split("-")[0]);
    } else {
      comment.user.data.name = capitalizeName(comment.user.data.name);
    }
    return comment;
  };

  return credentials.token === "" ? (
    <IonPage>
      <IonCard class="backgroundAdjustment" style={{ background: "#E5E5E5" }}>
        <IonContent>
          <Loading />
        </IonContent>
      </IonCard>
    </IonPage>
  ) : (
    <IonPage>
      <IonCard class="backgroundAdjustment" style={{ background: "#E5E5E5" }}>
        <IonContent>
          {/* {console.log(credentials)} */}
          <IonPopover
            isOpen={showDeletePopover}
            onDidDismiss={() => setDeletePopover(false)}
            className="delete-popover-comp"
          >
            <p
              style={{
                maxWidth: "5rem",
                maxHeight: "5rem",
              }}
              className="delete-popover"
              onClick={() => {
                onRemoveActivity(activityId, activity);
                setDeletePopover(false);
              }}
            >
              CONFIRM
            </p>
          </IonPopover>
          <TopComponent
            loginMetadata={loginMetadata}
            loginfunction={loginfunction}
            searchText={searchText}
            setSearchText={setSearchText}
          />

          <IonCardContent class="marginForContent">
            <IonGrid className="scrolling">
              <IonRow class="dashboardName">Community</IonRow>
              <IonGrid className="timeline-size">
                {/* <IonButton
          onClick={() => {
              console.log("Deleteting Current User...")
              deleteCurrentUser();
              
            }}
        >Delete User</IonButton> */}
                <StreamApp
                  apiKey={credentials.apiKey}
                  appId={credentials.appId}
                  token={credentials.token}
                >

                  <IonRow>
                    <IonCol style={{ minWidth: "400px" }}>
                      {/* <div className="wrapper box">
                  <NewActivitiesNotification
                    adds={[{}, {}]}
                    deletes={["", ""]}
                    labelFunction={({ count }) =>
                      `You have ${count} unread ${count > 1 ? 'messages' : 'message'}`
                    }
                  />
                </div> */}
                      <StatusUpdateForm
                        Header="Create Post"
                        modifyActivityData={(data) => ({
                          ...data,
                          foreign_id: "client:activity" + randomGen(),
                        })}
                        Textarea={(props) => (
                          <Textarea {...props} placeholder="Type Here..." rows={3} />
                        )}
                        emojiI18n={{
                          search: "Type here to search...",
                          categories: { recent: "Recent Emojis" },
                        }}
                      />
                      <IonRow style={{ fontSize: "1.5rem" }}>All Posts</IonRow>
                      <div style={{ height: "100" }}>
                        {/* <FlatFeed feedGroup="user" notify/> */}
                        <FlatFeed
                          notify
                          feedGroup="user"
                          options={{
                            limit: 1000,
                            withOwnChildren: true,
                            withRecentReactions: true,

                          }}
                          Paginator={InfiniteScrollPaginator}
                          Activity={(props: any) => {
                            if (props.activity.verb == "post")
                              return <Activity
                                {...props}
                                Header={
                                  <div style={{ padding: "3%" }}>
                                    {/* <img src=''/> */}
                                    <UserBar
                                      username={
                                        Object(props.activity.actor).data.name ==
                                          "Unknown"
                                          ? capitalizeName(
                                            Object(
                                              props.activity.actor
                                            ).id.split("-")[0]
                                          )
                                          : capitalizeName(
                                            Object(props.activity.actor).data
                                              .name
                                          )
                                      }
                                      subtitle={
                                        Object(props.activity.actor).id.split(
                                          "-"
                                        )[3] == "client"
                                          ? "Admin"
                                          : undefined
                                      }
                                      timestamp={props.activity.time}
                                    // style={Object(props.activity.actor).data.role != "ambassador" ? {background:'	#00BFFF'} : undefined}
                                    />
                                    <IonRow
                                      class="lineForTimeline"
                                      style={{
                                        marginTop:
                                          Object(props.activity.actor).id.split(
                                            "-"
                                          )[3] == "client"
                                            ? 8
                                            : 0,
                                      }}
                                    ></IonRow>
                                  </div>
                                }
                                Footer={() => (
                                  <div style={{ padding: "3% 3% 0% 3%" }}>
                                    <IonRow
                                      class="lineForTimeline"
                                      style={{ marginBottom: 5 }}
                                    ></IonRow>
                                    <IonRow
                                      style={{ padding: "0px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                                    >
                                      <span>
                                        <LikeButton {...props} targetFeeds={["user:" + credentials.userId]} />
                                      </span>
                                      <span
                                        onClick={() => {
                                          if (props.activity.id === selectedId) {
                                            setSelectedId("");
                                          } else {
                                            setSelectedId(props.activity.id);
                                          }
                                        }}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <FaComment style={{ color: "rgb(122, 130, 135)" }} />&nbsp;&nbsp;{props.activity.reaction_counts.comment ?? ""}
                                        <IonLabel >&nbsp;&nbsp;Comments</IonLabel>
                                      </span>
                                      <span style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          // console.log(props.activity.actor);
                                          setActivityId(props.activity.id);
                                          setActivity(props.activity);
                                          setDeletePopover(true);
                                        }}
                                      >
                                        <FaTrashAlt
                                          color="rgb(122, 130, 135)"
                                        // className="delete-btn"

                                        />
                                        <IonLabel>&nbsp;&nbsp;Delete</IonLabel>
                                      </span>
                                    </IonRow>
                                    {props.activity.id == selectedId ? (
                                      <CommentField activity={props.activity} targetFeeds={["user:" + credentials.userId]} />
                                    ) : undefined}
                                    {props.activity.id == selectedId ? (
                                      <CommentList
                                        CommentItem={({ comment }) => (
                                          <CommentItem
                                            comment={commentRename(comment)}
                                          />
                                        )}
                                        activityId={props.activity.id}
                                      />
                                    ) : undefined}
                                  </div>
                                )}
                              />
                            else {
                              return <div />
                            }
                          }}
                        />
                      </div>
                    </IonCol>
                    <IonCol class="timelineRight">
                      <IonRow>
                        <div className="timelineProgramCard">
                          <IonRow>
                            <img src={isStringEmpty(programDetailsList.program_img) ? temp : programDetailsList.program_img} className="timelineProgramImg" />
                          </IonRow>
                          <div style={{ padding: "20px" }}>
                            <IonRow style={{ fontSize: "1.25rem", fontWeight: "550" }}>{programDetailsList.title}</IonRow>
                            <IonRow style={{ fontSize: "0.8rem", fontWeight: "400" }}>{programDetailsList.description}</IonRow>
                            <IonRow style={{ fontSize: "0.75rem", color: "#A8A6AC", fontWeight: "400" }}>{programDetailsList.email}</IonRow>
                            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-evenly" }}>
                              {programDetailsList.instagram_link ? <a href={programDetailsList.instagram_link} target="_blank"><img src={instagram} /></a> : null}
                              {programDetailsList.twitter_link ? <a href={programDetailsList.twitter_link} target="_blank"><img src={twitter} /></a> : null}
                              {programDetailsList.linkedin_link ? <a href={programDetailsList.linkedin_link} target="_blank"><img src={linkedin} /></a> : null}
                              {programDetailsList.community_channel ? <a href={programDetailsList.community_channel} target="_blank"><img src={community} /></a> : null}
                              {programDetailsList.website_link ? <a href={programDetailsList.website_link} target="_blank"><img src={website} /></a> : null}
                            </div>
                          </div>

                        </div>
                      </IonRow>
                      <IonRow style={{ height: 50 }}></IonRow>
                      <IonRow>
                        <div className="timelineProgramCard">
                          <IonRow className="LatestUpdateText">Latest Updates</IonRow>
                          <NotificationFeed notify={true} feedGroup="user" Group={(props: any) => {
                            // console.log(props.activityGroup.object.actor?.id + "    " + credentials.userId)
                            if (props.activityGroup.verb == "post") {
                              return (
                                <IonRow class="notificationActivity"><b>{props.activityGroup.actor?.id == credentials.userId ? "You" : props.activityGroup.actor.data.name == "Unknown" ? capitalizeName(props.activityGroup.actor.id.split("-")[0]) : capitalizeName(props.activityGroup.actor.data.name)}</b>&nbsp;shared a new post</IonRow>
                              );
                            } else if (props.activityGroup.verb == "like" && props.activityGroup.object.actor?.id == credentials.userId) {
                              return (
                                <IonRow class="notificationActivity"><b>{props.activityGroup.actor.data.name == "Unknown" ? capitalizeName(props.activityGroup.actor.id.split("-")[0]) : capitalizeName(props.activityGroup.actor.data.name)}</b>&nbsp;liked your post</IonRow>
                              );
                            } else if (props.activityGroup.verb == "comment" && props.activityGroup.object.actor?.id == credentials.userId) {
                              return (
                                <IonRow class="notificationActivity"><b>{props.activityGroup.actor.data.name == "Unknown" ? capitalizeName(props.activityGroup.actor.id.split("-")[0]) : capitalizeName(props.activityGroup.actor.data.name)}</b>&nbsp;commented on your post</IonRow>
                              );
                            } else {
                              return (
                                <div />
                              );
                            }
                          }
                          } /></div>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                </StreamApp>
              </IonGrid>
            </IonGrid>
          </IonCardContent>
        </IonContent>
      </IonCard>
    </IonPage >
  );
};

export default ClientTimeline;
