import { handler } from "../src/services/spaces/handler";

process.env.AWS_REGION = "ap-northeast-1";
process.env.TABLE_NAME = "SpaceTable-0e779e6ed181";

handler(
  {
    httpMethod: "GET",
    queryStringParameters: {
      id: "a3c8b374-76b1-43b0-83a1-d4c31090dc29",
    },
    // body: JSON.stringify({
    //   location: "Boston",
    // }),
  } as any,
  {} as any
);
