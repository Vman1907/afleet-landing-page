import { IonCard, IonGrid, IonRow, IonCol, IonLabel, IonSegment } from '@ionic/react'
import React from 'react'
import PackageDetails from '../Models/PackageDetails'
interface DashboardPackageCardProps{
    packageDetail: PackageDetails
}
const DashboardPackageCard: React.FC<DashboardPackageCardProps> = ({
    packageDetail
}) => {
  return (
    <IonCard  class="packageDetailsCard">
                <IonGrid>
                  <IonRow>
                    <IonCol class="packageNameText">
                      {/* Package Name */}{packageDetail.title}
                      {/* <IonLabel class="numDays">| 20Days</IonLabel> */}
                      <IonLabel class="status">
                        &nbsp;&nbsp;Active&nbsp;&nbsp;
                      </IonLabel>
                    </IonCol>
                    <IonCol class="ion-text-end boxContent2">$&nbsp;{packageDetail.price}</IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="8">
                      {packageDetail.description}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol >
                      <IonCard class="BoxSizing">
                        <IonSegment mode="md" class="numberSize">{packageDetail.ambassador_count}</IonSegment>
                        <IonRow class="boxContent ion-text-center">
                          Allowed Ambassador
                        </IonRow>
                      </IonCard>
                    </IonCol>
                    <IonCol >
                      <IonCard class="BoxSizing">
                        <IonSegment mode="md" class="numberSize">{packageDetail.allowed_managers}</IonSegment>
                        <IonRow class="boxContent ion-text-center">
                          Allowed Managers
                        </IonRow>
                      </IonCard>
                    </IonCol>
                    <IonCol >
                      <IonCard class="BoxSizing">
                        <IonSegment mode="md" class="numberSize">{packageDetail.allowed_campaign}</IonSegment>
                        <IonRow class="boxContent ion-text-center">
                          Allowed Campaigns
                        </IonRow>
                      </IonCard>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCard>
  )
}
export default DashboardPackageCard