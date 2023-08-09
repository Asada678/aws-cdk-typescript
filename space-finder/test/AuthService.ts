import { type CognitoUser } from "@aws-amplify/auth";
import { Amplify, Auth } from "aws-amplify";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const awsRegion = "ap-northeast-1";

Amplify.configure({
  Auth: {
    region: awsRegion,
    userPoolId: "ap-northeast-1_WOb5qNeC7",
    userPoolWebClientId: "46etr5vm7rhl1tstan2lrkm9r1",
    identityPoolId: "ap-northeast-1:4c6b4a06-9a32-452b-a3ce-a8f4a3240da5",
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
});

export class AuthService {
  public async login(username: string, password: string) {
    const result = (await Auth.signIn(username, password)) as CognitoUser;
    return result;
  }

  public async generateTemporaryCredentials(user: CognitoUser) {
    const jwtToken = user.getSignInUserSession().getIdToken().getJwtToken();
    const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/ap-northeast-1_WOb5qNeC7`;
    const cognitoIdentity = new CognitoIdentityClient({
      credentials: fromCognitoIdentityPool({
        identityPoolId: "ap-northeast-1:4c6b4a06-9a32-452b-a3ce-a8f4a3240da5",
        logins: {
          [cognitoIdentityPool]: jwtToken,
        },
      }),
    });
    const credentials = await cognitoIdentity.config.credentials();
    return credentials;
  }
}
