import { type CognitoUser } from "@aws-amplify/auth";
import { Amplify, Auth } from "aws-amplify";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const awsRegion = "ap-northeast-1";

Amplify.configure({
  Auth: {
    region: awsRegion,
    userPoolId: "ap-northeast-1_YObRNjDL5",
    userPoolWebClientId: "24flj2h28bqc59v1a7pvqtes2e",
    identityPoolId: "ap-northeast-1:48bf9444-f203-43df-a7e4-fe3752207a02",
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
    const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/ap-northeast-1_YObRNjDL5`;
    const cognitoIdentity = new CognitoIdentityClient({
      credentials: fromCognitoIdentityPool({
        identityPoolId: "ap-northeast-1:48bf9444-f203-43df-a7e4-fe3752207a02",
        logins: {
          [cognitoIdentityPool]: jwtToken,
        },
      }),
    });
    const credentials = await cognitoIdentity.config.credentials();
    return credentials;
  }
}
