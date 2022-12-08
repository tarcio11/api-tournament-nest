import { StorageProviderAbstract } from '@/domain/contracts/gateways';
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class StorageProvider implements StorageProviderAbstract {
  async saveFile(user_id: string, file: Express.Multer.File): Promise<any> {
    const s3 = new S3({
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      accessKeyId: process.env.AWS_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    const originalName = file.originalname.split('.');
    const fileExtension = originalName[1];
    const fileName = `${user_id}-${Date.now()}.${fileExtension}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: fileName,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
    };

    await s3.putObject(params).promise();
    return `${process.env.AWS_S3_BUCKET_URL}/${fileName}`;
  }
}
