import { Fn, Stack, StackProps } from "aws-cdk-lib";
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class PhotosHandlerStack extends Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const targetBucket = Fn.importValue("photos-bucket");

    new LambdaFunction(this, "PhotosHandler", {
      runtime: Runtime.NODEJS_16_X,
      handler: "index.handler",
      code: Code.fromInline(`
      exports.handler = async (event) => {
        console.log("hello!: " + process.env.TARGET_BUCKET)
      };
    `),
      environment: {
        TARGET_BUCKET: targetBucket,
      },
    });
  }
}
