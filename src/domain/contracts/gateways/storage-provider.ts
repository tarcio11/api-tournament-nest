export abstract class StorageProviderAbstract {
  abstract saveFile: (user_id: string, file: Express.Multer.File) => Promise<string>;
}
