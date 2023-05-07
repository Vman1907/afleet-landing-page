import { IonSpinner } from "@ionic/react";

interface ContainerProps {}

const ImageUploadLoading: React.FC<ContainerProps> = () => {
  return <IonSpinner name="lines" class="imageUploadSpin" />;
};

export default ImageUploadLoading;
