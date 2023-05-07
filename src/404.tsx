import { IonContent, IonGrid, IonImg, IonPage, IonRow, IonSegment } from "@ionic/react";
import error from './Assets/Images/error.png';

const NotFound: React.FC = () => {
    return(
        <IonPage>
            <IonContent>
                <IonGrid>
                <IonRow>
                <IonSegment mode="md">
                  <IonImg className="errorImg" src={error}></IonImg>
                </IonSegment>
              </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}
export default NotFound;