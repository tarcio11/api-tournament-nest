export const env = {
  s3: {
    accessKey: process.env.AWS_ACCESS_KEY ?? '',
    secret: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    bucket: process.env.AWS_S3_BUCKET_NAME ?? '',
    region: process.env.AWS_REGION ?? '',
    url: process.env.AWS_S3_BUCKET_URL ?? '',
  },
  port: process.env.PORT ?? 3000,
  jwtSecret: process.env.JWT_SECRET ?? 'jk43h5jk43h5k34',
};
