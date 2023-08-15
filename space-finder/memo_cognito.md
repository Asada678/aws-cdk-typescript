# Understanding AWS Cognito

1. User pools
   1. Stores user data
   2. Basic authentication solution - JWT tokens
2. Identity pools
   1. Fine grained access control - a user assumes an identity
   2. Can directly call AWS SDK commands

## verify user

`aws cognito-idp admin-set-user-password --user-pool-id ap-northeast-1_WOb5qNeC7 --username username --password password --permanent`
