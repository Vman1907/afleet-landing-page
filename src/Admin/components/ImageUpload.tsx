import { useState } from "react";
import { FileResponse } from "../Models/FileResponse";
import { LoginMetadata } from "../Models/LoginMetadata";
import { FileService } from "../Services/ImageUploadService";
import "../Styles/Common.css";
import defaultImage from "../../Assets/Images/campaignDeafult.png";
import { IonAlert, IonButton, IonIcon, IonImg, IonSegment } from "@ionic/react";
import ImageUploadLoading from "./ImageUploadLoading";
import { ImageExtensions } from "../Constants/ImageUploadConstant";
import { isStringEmpty } from "../../Util/BasicUtilityFunctions";
import { addOutline } from "ionicons/icons";
interface ImageUploadProps {
  loginMetadata: LoginMetadata;
  ChangeFilePath: (value: string) => void;
  filePath: string;
  id: string;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
  filePathForUploading: string;
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  loginMetadata,
  ChangeFilePath,
  filePath,
  id,
  isUploading,
  setIsUploading,
  filePathForUploading
}) => {
  console.log(filePath);
  const [alert, setAlert] = useState(false)
  const upload = (event: any) => {
    if (
      !event ||
      !event.target ||
      !event.target.files ||
      event.target.files.length === 0
    ) {
      return;
    }
    if (event.target.files[0].size <= "524288") {
      setIsUploading(true);
      let file = event.target.files[0] as File;
      FileService.UploadFile(loginMetadata, file, filePathForUploading + file.name).then(
        (fileResponse: any) => {
          ChangeFilePath(fileResponse.Location);
          setIsUploading(false);
        }
      );
    }
    else {
      setAlert(true);
    }
    console.log(event)
  };
  if (!isUploading && isStringEmpty(filePath)) {
    return (

      <IonSegment mode="md" class="imageUploadContainer">
        <IonAlert
          isOpen={alert}
          message="Image size should be less than 512KB"
          onDidDismiss={() => {
            setAlert(false);
          }}
          backdropDismiss={true}
        ></IonAlert>
        <IonButton className="fileUploadButton" style={{ height: 50 }}>
          <img src={defaultImage} alt="N/A" style={{ height: 50, width: 50, borderRadius: "100%" }} />
          <input
            id={id + "1"}
            hidden
            type="file"
            name="file"
            // data-max-size="2048"
            accept={ImageExtensions}
            onChange={(e) => upload(e)}
          />
          <label htmlFor={id + "1"} className="inputLabel" title="Click to upload Image"> &nbsp;&nbsp;</label>
        </IonButton>
        <IonIcon md={addOutline} class="imageIcon"></IonIcon>
      </IonSegment>
      // </IonImg>
    );
  }
  else if (isUploading) {
    return (
      <IonSegment mode="md">
        <img
          src={isStringEmpty(filePath) ? defaultImage : filePath}
          style={{ borderRadius: "100%", margin: "auto", height: 50, width: 50 }}
        />
        <ImageUploadLoading />
      </IonSegment>);
  }

  return (
    <IonSegment mode="md" class="imageUploadContainer">
      <IonAlert
        isOpen={alert}
        message="Image size should be less than 512KB"
        onDidDismiss={() => {
          setAlert(false);
        }}
        backdropDismiss={true}
      ></IonAlert>
      <img
        src={isStringEmpty(filePath) ? defaultImage : filePath}
        style={{ borderRadius: "100%", margin: "auto", height: 50, zIndex: -20, width: 50 }}
      />
      <input
        id={id + "2"}
        hidden
        type="file"
        name="file"
        // data-max-size="2048"
        className="inputLabel"
        accept={ImageExtensions}
        onChange={(e) => upload(e)}
      />
      <label htmlFor={id + "2"} className="inputLabel" title="Click to upload Image"> &nbsp;&nbsp;</label>
      <IonIcon md={addOutline} class="imageIcon"></IonIcon>
    </IonSegment>
  );
};
export default ImageUpload;
