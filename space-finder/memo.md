# Create a project from scratch

- create folder
- install dependencies
- create Launcher.ts file
- create empty stack
- create cdk.json file
- cdk synth

# NodejsFunction CDK construct

1. Bundles all code with three shaking
2. Compile TS to JS
3. Leaves out AWS-SDK dependencies
4. Completely editable
5. Library: esbuild
   1. Past solution: webpack - slow and hard to configure...

# AWS Lambda architecture

1. create lambda function for each resource
2. create one lambda function for every resource
3. create each lambda function for every resource group

## Debug

`pnpm dlx ts-node test/launcher.ts`
