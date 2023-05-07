import { HttpRequestMethods } from "../Admin/Constants/ServiceConstants";
import { StorageService } from "./StorageService";
import { Event } from "../Admin/components/Tracker";

export async function APICallerPost<Resp, Req>(
  url: string,
  body: Req,
  loginMetadata: any,
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
  loginMetadata: any,
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
  loginMetadata: any,
  image: any,
  details: any,
  key: string
): Promise<Resp> {
  let formData = new FormData();
  formData.append("image", image);
  delete details.id;
  console.log(details);
  // var adminData = Object.assign({}, loginMetadata);
  formData.append(key,JSON.stringify(details));
  // formData.append("Bucket", fileDirectory);
  // formData.append("fileName", fileName);

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
export async function PostFormData2<Resp>(
  url: string,
  loginMetadata: any,
  image: any,
): Promise<Resp> {
  let formData = new FormData();
  formData.append("image", image);
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

  export async function APICallerGet<Resp, Req>(
    url: string,
    body: Req,
    loginMetadata: any,
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
          return CallGet<Resp, Req>(
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
      return CallGet<Resp, Req>(
        url,
        body,
        loginMetadata,
        cacheKey,
        cacheExpiry,
        updateCache
      );
    }
  }

  async function CallGet<Resp, Req>(
    url: string,
    body: Req,
    loginMetadata: any,
    cacheKey: string,
    cacheExpiry: number,
    updateCache: boolean
  ): Promise<Resp> {
    const options = {
      method: HttpRequestMethods.GET,
      headers: {
        Authorization: loginMetadata.tokenString,
      },
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
    export async function APICallerDel<Resp, Req>(
      url: string,
      body: Req,
      loginMetadata: any,
      key: string
    ): Promise<Resp> {
        Event("API Call","Call",key)
        return CallDel<Resp, Req>(
          url,
          body,
          loginMetadata,
        );
    }
    async function CallDel<Resp, Req>(
      url: string,
      body: Req,
      loginMetadata: any,
    ): Promise<Resp> {
      const options = {
        method: HttpRequestMethods.DELETE,
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
              resolve(data);
          })
          .catch((error) => reject(error));
      });
    }

    export async function APICallerPut<Resp, Req>(
      url: string,
      body: Req,
      loginMetadata: any,
      key: string
    ): Promise<Resp> {
        Event("API Call","Call",key)
        return CallPut<Resp, Req>(
          url,
          body,
          loginMetadata,
        );
    }
    async function CallPut<Resp, Req>(
      url: string,
      body: Req,
      loginMetadata: any,
    ): Promise<Resp> {
      const options = {
        method: HttpRequestMethods.PUT,
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
              resolve(data);
          })
          .catch((error) => reject(error));
      });
    }