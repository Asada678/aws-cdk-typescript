import { AuthService } from "./AuthService";

async function testAuth() {
  const service = new AuthService();
  const loginResult = await service.login("zaq", "zaq1ZAQ!");
  console.log("loginResult: ", loginResult);
  console.log(loginResult.getSignInUserSession().getIdToken().getJwtToken());
}

testAuth();
