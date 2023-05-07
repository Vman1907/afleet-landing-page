import { Storage } from "@ionic/storage";

export class StorageService {
  private static _storage: Storage | null = null;

  constructor() {}

  private static async GetStore() {
    if (!this._storage && this._storage !== null) {
      return this._storage;
    }

    const store = new Storage();
    this._storage = await store.create();

    return this._storage;
  }

  public static async Set(key: string, value: any, expiry: number) {
    var expiryTime = Date.now() + expiry * 1000;
    await (await this.GetStore()).set(key, value);
    await (await this.GetStore()).set(this.expiryKey(key), expiryTime);
  }

  public static async Get(key: string) {
    var expiry = await (await this.GetStore()).get(this.expiryKey(key));
    if (!expiry) {
      return null;
    }

    if (expiry > Date.now()) {
      return await (await this.GetStore()).get(key);
    }

    return null;
  }

  public static async Remove(key: string) {
    return await (await this.GetStore()).remove(key);
  }

  public static async Clear() {
    return await (await this.GetStore()).clear();
  }

  private static expiryKey(key: string) {
    return key + "Expiry";
  }

  public static async Logout(role: string) {
    sessionStorage.removeItem("page");
    (await (await this.GetStore()).keys()).map(async (key: string) => {
      if (key.toLowerCase().includes(role.toLowerCase())) {
        await this.Remove(key);
      }
    });
  }
}
