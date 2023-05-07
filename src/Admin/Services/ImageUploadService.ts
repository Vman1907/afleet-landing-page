import { ImageUploadURL } from "../Constants/AdminConfig";
import { PostFormData2 } from "../../Services/BaseService";

export class FileService {
  public static async UploadFile(
    loginMetadata: any,
    image: File,
    fileName: string,
  ): Promise<any> {
    const result = await PostFormData2<any>(
      ImageUploadURL + "?path=" + fileName,
      loginMetadata,
      image,
    )
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => {
        throw error;
      });
    return result;
  }
}
