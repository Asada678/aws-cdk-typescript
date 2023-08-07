import { type CognitoUser } from "@aws-amplify/auth";
import { Amplify, Auth } from "aws-amplify";

const awsRegion = "ap-northeast-1";

Amplify.configure({
  Auth: {
    region: awsRegion,
    userPoolId: "ap-northeast-1_WOb5qNeC7",
    userPoolWebClientId: "46etr5vm7rhl1tstan2lrkm9r1",
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
});

export class AuthService {
  public async login(username: string, password: string) {
    const result = (await Auth.signIn(username, password)) as CognitoUser;
    return result;
  }
}
