import { useState } from "react";
import defaultImage from "../../Assets/Images/campaignDeafult.png";
import { IonAlert, IonButton, IonIcon, IonImg, IonSegment } from "@ionic/react";
import ImageUploadLoading from "./ImageUploadLoading";
import { isStringEmpty } from "../../Util/BasicUtilityFunctions";
import { LoginMetadata } from "../Models/AmbassadorLoginMetadata";
import { FileService } from "../../Admin/Services/ImageUploadService";
import { ImageExtensions } from "../../Admin/Constants/ImageUploadConstant";
import { addOutline } from "ionicons/icons";
import { BiImageAdd } from "react-icons/bi";
interface ImageUploadProps {
  loginMetadata: LoginMetadata;
  ChangeFilePath: (value: string) => void;
  filePath: string;
  id: string;
  ambImg: string;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
  filePathForUploading: string;
  setImage: (value: boolean) => void;
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  loginMetadata,
  ChangeFilePath,
  filePath,
  id,
  isUploading,
  setIsUploading,
  filePathForUploading,
  setImage,
  ambImg
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
          setImage(false);
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
        <IonButton className="fileUploadButton" style={{ margin: "auto", height: "100px", width: "100px" }}>
          {isStringEmpty(ambImg) ? <BiImageAdd style={{ margin: "auto", height: 40, width: 40 }} /> : <img src={ambImg} alt="N/A" style={{ borderRadius: "100%", margin: "auto", height: 100, zIndex: -20, width: 100, maxWidth: "max-content", objectFit: "cover" }} />}
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
        {/* <IonIcon md={addOutline} class="imageIcon1" size="small"></IonIcon> */}
      </IonSegment>
      // </IonImg>
    );
  }
  else if (isUploading) {
    return (
      <IonSegment mode="md">
        <img
          src={isStringEmpty(filePath) ? isStringEmpty(ambImg) ? defaultImage : ambImg : filePath}
          style={{ borderRadius: "100%", margin: "auto", height: 100, width: 100, objectFit: "cover" }}
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
        src={isStringEmpty(filePath) ? isStringEmpty(ambImg) ? defaultImage : ambImg : filePath}
        style={{ borderRadius: "100%", margin: "auto", height: 100, zIndex: -20, width: 100, objectFit: "cover" }}
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
