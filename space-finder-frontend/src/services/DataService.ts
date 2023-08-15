import { AuthService } from "./AuthService";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DataStack, ApiStack } from "../../../space-finder/outputs.json";

const spacesUrl = ApiStack.SpacesApiEndpoint36C4F3B6 + "spaces";

export class DataService {
  private authService: AuthService;
  private s3Client: S3Client | undefined;
  private awsRegion = "ap-northeast-1";

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public async createSpace(name: string, location: string, photo?: File) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const space = {} as any;
    space.name = name;
    space.location = location;
    if (photo) {
      const uploadUrl = await this.uploadPubicFile(photo);
      space.photoUrl = uploadUrl;
    }
    const postResult = await fetch(spacesUrl, {
      method: "POST",
      body: JSON.stringify(space),
      headers: {
        Authorization: this.authService.jwtToken!,
      },
    });
    const postResultJSON = await postResult.json();

    return postResultJSON.id;
  }

  private async uploadPubicFile(file: File) {
    const credentials = await this.authService.getTemporaryCredentials();
    if (!this.s3Client) {
      this.s3Client = new S3Client({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        credentials: credentials as any,
        region: this.awsRegion,
      });
    }
    const command = new PutObjectCommand({
      Bucket: DataStack.SpaceFinderPhotosBucketName,
      Key: file.name,
      ACL: "public-read",
      Body: file,
    });
    await this.s3Client.send(command);

    return `https://${command.input.Bucket}.s3.${this.awsRegion}.amazonaws.com/${command.input.Key}`;
  }

  public isAuthorized() {
    return true;
  }
}
