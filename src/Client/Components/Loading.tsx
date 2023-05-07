import { IonSpinner } from "@ionic/react";

interface ContainerProps {}

const Loading: React.FC<ContainerProps> = () => {
  return <IonSpinner name="lines" class="spin" />;
};

export default Loading;
