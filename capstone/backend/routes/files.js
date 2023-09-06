// https://github.com/aws/aws-sdk-js-v3/blob/main/clients/client-s3/test/e2e/S3.ispec.ts
import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import path from "path";
import express from "express";
import multer from "multer";
import generateRandomHash from "../utils/generateRandomHash.js";
import camelcaseKeys from "camelcase-keys";

const { S3_BUCKET_REGION, S3_BUCKET, S3_BUCKET_ENDPOINT } = process.env;

const s3 = new S3Client({
  endpoint: S3_BUCKET_ENDPOINT,
  region: S3_BUCKET_REGION,
});

const upload = multer({
  storage: multer.memoryStorage(),
});

const filesRouter = express.Router();

filesRouter.post("/", upload.single("file"), async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const extension = path.extname(file.originalname);
  const basename = path.basename(file.originalname, extension);
  const uniqueBasename = `${basename}.${generateRandomHash()}`;
  const uniqueFilename = `${uniqueBasename}${extension}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: uniqueFilename,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  res.status(201).send({
    key: uniqueFilename,
    url: `https://${S3_BUCKET}.s3.${S3_BUCKET_REGION}.backblazeb2.com/${uniqueFilename}`,
  });
});

filesRouter.get("/", async (req, res) => {
  const response = await s3.send(
    new ListObjectsCommand({
      Bucket: S3_BUCKET,
    })
  );

  const files = response.Contents.map(camelcaseKeys);

  res.send(files);
});

filesRouter.get("/:key", async (req, res) => {
  const response = await s3.send(
    new GetObjectCommand({
      Bucket: S3_BUCKET,
      Key: req.params.key,
    })
  );

  res.send({
    acceptRanges: response.AcceptRanges,
    lastModified: response.LastModified,
    contentLgneth: response.ContentLgneth,
    eTag: response.ETag,
    versionId: response.VersionId,
    contentType: response.ContentType,
    metadata: response.Metadata,
  });
});

export default filesRouter;
