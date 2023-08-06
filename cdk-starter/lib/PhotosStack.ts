import { CfnOutput, Fn, Stack, StackProps } from "aws-cdk-lib";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class PhotosStack extends Stack {
  private stackSuffix: string;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.initializeSuffix();

    const photsBucket = new Bucket(this, "PhotosBucket", {
      bucketName: `photos-bucket-${this.stackSuffix}`,
    });

    new CfnOutput(this, "photos-bucket", {
      value: photsBucket.bucketArn,
      exportName: "photos-bucket",
    });
  }

  private initializeSuffix() {
    const shortStackId = Fn.select(2, Fn.split("/", this.stackId));
    this.stackSuffix = Fn.select(4, Fn.split("-", shortStackId));
  }
}
