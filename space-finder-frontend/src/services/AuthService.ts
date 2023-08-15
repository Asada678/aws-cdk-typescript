import { type CognitoUser } from "@aws-amplify/auth";
import { Amplify, Auth } from "aws-amplify";
import { AuthStack } from "../../../space-finder/outputs.json";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const awsRegion = "ap-northeast-1";

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: awsRegion,
    userPoolId: "ap-northeast-1_K2BGlMI3s",
    userPoolWebClientId: "1f7mgjl5a7h8vj8pdtkemc7pv7",
    identityPoolId: "ap-northeast-1:52210c31-fd9a-4531-a800-627344aa1af7",
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
});

export class AuthService {
  private user: CognitoUser | undefined;
  public jwtToken: string | undefined;
  private temporaryCredentials: object | undefined;

  public async login(username: string, password: string): Promise<object | undefined> {
    try {
      this.user = (await Auth.signIn(username, password)) as CognitoUser;
      this.jwtToken = this.user?.getSignInUserSession()?.getIdToken().getJwtToken();
      return this.user;
    } catch (error) {
      console.error("error: ", error);
      return undefined;
    }
  }

  public async getTemporaryCredentials() {
    if (this.temporaryCredentials) {
      return this.temporaryCredentials;
    }
    this.temporaryCredentials = await this.generateTemporaryCredentials();
    return this.temporaryCredentials;
  }

  public getUserName() {
    return this.user?.getUsername();
  }

  private async generateTemporaryCredentials() {
    const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/${AuthStack.SpaceUserPoolId}`;
    const cognitoIdentity = new CognitoIdentityClient({
      credentials: fromCognitoIdentityPool({
        clientConfig: {
          region: awsRegion,
        },
        identityPoolId: AuthStack.SpaceIdentityPoolId,
        logins: {
          [cognitoIdentityPool]: this.jwtToken!,
        },
      }),
    });
    const credentials = await cognitoIdentity.config.credentials();
    return credentials;
  }
}
