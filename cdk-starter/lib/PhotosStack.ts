import { Stack, StackProps } from "aws-cdk-lib";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class PhotosStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const myBucket = new Bucket(this, "PhotosBucket", {
      bucketName: "photosbucket-asadatomoya01",
    });

    (myBucket.node.defaultChild as CfnBucket).overrideLogicalId('PhotosBucket923asadatomoya')
    // create a new resource
    // delete the old one
  }
}
