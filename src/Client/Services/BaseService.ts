import { HttpRequestMethods } from "../Constants/ServiceConstants";
import { LoginMetadata } from "../Models/LoginMetadata";
import { StorageService } from "./StorageService";
import { Event } from "../Components/Tracker";

export async function APICallerPost<Resp, Req>(
  url: string,
  body: Req,
  loginMetadata: LoginMetadata,
  cacheKey: string,
  useCache: boolean,
  cacheExpiry: number,
  updateCache: boolean,
  key: string
): Promise<Resp> {
  if (useCache) {
    return StorageService.Get(cacheKey).then((response: Resp) => {
      if (response) {
        return new Promise<Resp>((resolve) => {
          resolve(response);
        });
      } else {
        Event("API Call","Call",key)
        return Call<Resp, Req>(
          url,
          body,
          loginMetadata,
          cacheKey,
          cacheExpiry,
          updateCache
        );
      }
    });
  } else {
    Event("API Call","Call",key)
    return Call<Resp, Req>(
      url,
      body,
      loginMetadata,
      cacheKey,
      cacheExpiry,
      updateCache
    );
  }
}

async function Call<Resp, Req>(
  url: string,
  body: Req,
  loginMetadata: LoginMetadata,
  cacheKey: string,
  cacheExpiry: number,
  updateCache: boolean
): Promise<Resp> {
  const options = {
    method: HttpRequestMethods.POST,
    headers: {
      "Content-Type": "application/json",
      Authorization: loginMetadata.tokenString,
    },
    body: JSON.stringify(body),
  };
  return new Promise<Resp>(function (resolve, reject) {
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        var data = response.json();

        if (updateCache) {
          StorageService.Set(cacheKey, data, cacheExpiry).then(() => {
            resolve(data);
          });
        } else {
          resolve(data);
        }
      })
      .catch((error) => reject(error));
  });
}
export async function PostFormData<Resp>(
  url: string,
  loginMetadata: LoginMetadata,
  file: File,
  fileDirectory: string,
  fileName: string
): Promise<Resp> {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("fileDirectory", fileDirectory);
  formData.append("fileName", fileName);

  const options = {
    method: HttpRequestMethods.POST,
    headers: {
      Authorization: loginMetadata.tokenString,
    },
    body: formData,
  };

  return new Promise<Resp>(function (resolve, reject) {
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        var data = response.json();
        resolve(data);
      })
      .catch((error) => reject(error));
  });


  
}
