import { handler } from "../src/services/spaces/handler";

process.env.AWS_REGION = "ap-northeast-1";
process.env.TABLE_NAME = "SpaceTable-0e779e6ed181";

handler(
  {
    httpMethod: "POST",
    body: JSON.stringify({
      location: "Boston",
    }),
  } as any,
  {} as any
);
