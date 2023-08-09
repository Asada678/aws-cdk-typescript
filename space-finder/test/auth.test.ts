import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import { AuthService } from "./AuthService";

async function testAuth() {
  const service = new AuthService();
  const loginResult = await service.login("zaq", "zaq1ZAQ!");
  // console.log("loginResult: ", loginResult);
  // console.log(loginResult.getSignInUserSession().getIdToken().getJwtToken());

  const credentials = await service.generateTemporaryCredentials(loginResult);
  // console.log("credentials: ", credentials);
  const buckets = await listBuckets(credentials);
  console.log("buckets: ", buckets);
}

async function listBuckets(credentials: any) {
  const client = new S3Client({
    credentials,
  });
  const command = new ListBucketsCommand({});
  const result = await client.send(command);
  return result;
}

testAuth();
