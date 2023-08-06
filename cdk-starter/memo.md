# course memo
cdk —version

mkdir sample-name
cd sample-name

cdk init —language=typescript
cdk bootstrap
cdk deploy
cdk synth （only create template）

## CDK constructs
* L1 (use for new services)
* L2 (most common, many defaults)
* L3 (combine multiple type resources)

cdk list
cdk diff
cdk doctor
cdk deploy --parameters duration=8

## Why the need for multiple stacks?
* Some stacks may contain sensitive info
* Some stacks may take a lot of time for deployment or deletion
*  Resources get big and the need organization

How to organize stacks?
