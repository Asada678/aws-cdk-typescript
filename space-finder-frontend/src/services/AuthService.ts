import { type CognitoUser } from "@aws-amplify/auth";
import { Amplify, Auth } from "aws-amplify";
// import { AuthStack } from "../../../space-finder/outputs.json";

const awsRegion = "ap-northeast-1";

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: awsRegion,
    userPoolId: "ap-northeast-1_WOb5qNeC7",
    userPoolWebClientId: "46etr5vm7rhl1tstan2lrkm9r1",
    identityPoolId: "ap-northeast-1:4c6b4a06-9a32-452b-a3ce-a8f4a3240da5",
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
});

export class AuthService {
  private user: CognitoUser | undefined;

  public async login(username: string, password: string): Promise<object | undefined> {
    try {
      this.user = (await Auth.signIn(username, password)) as CognitoUser;
      return this.user;
    } catch (error) {
      console.error("error: ", error);
      return undefined;
    }
  }

  public getUserName() {
    return this.user?.getUsername();
  }
}
