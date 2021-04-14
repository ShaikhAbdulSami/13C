import * as cdk from "@aws-cdk/core"
import * as appSync from "@aws-cdk/aws-appsync"
import * as dynamoDB from "@aws-cdk/aws-dynamodb"
import * as lambda from "@aws-cdk/aws-lambda"
import * as s3 from "@aws-cdk/aws-s3"
import * as s3Deployment from "@aws-cdk/aws-s3-deployment"
import * as cloudfront from "@aws-cdk/aws-cloudfront"
import * as CodePipeline from '@aws-cdk/aws-codepipeline'
import * as CodePipelineAction from '@aws-cdk/aws-codepipeline-actions'
import * as CodeBuild from '@aws-cdk/aws-codebuild'
import { Effect, PolicyStatement, Role, ServicePrincipal } from '@aws-cdk/aws-iam';

export class LollyServerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

        // s3 bucket
        const myBucket = new s3.Bucket(this, "s3Bucket", {
          publicReadAccess: true,
          websiteIndexDocument: "index.html",
          websiteErrorDocument: "404.html",
          versioned: true,
        })
    
        //cloudfront (aws cdn)
        const dist = new cloudfront.CloudFrontWebDistribution(
          this,
          "DistributionWebBucket",
          {
            originConfigs: [
              {
                s3OriginSource: {
                  s3BucketSource: myBucket,
                },
                behaviors: [{ isDefaultBehavior: true }],
              },
            ],
          }
        )
    
        //s3 bucket deployment
        new s3Deployment.BucketDeployment(this, "bucketDeployment", {
          sources: [s3Deployment.Source.asset("../public")],
          destinationBucket: myBucket,
          distribution: dist,
        })
    
        //creating api
        const api = new appSync.GraphqlApi(this, "api", {
          name: "VirtualLolly-appsync-api",
          schema: appSync.Schema.fromAsset("graphql/schema.graphql"),
          authorizationConfig: {
            defaultAuthorization: {
              authorizationType: appSync.AuthorizationType.API_KEY,
              apiKeyConfig: {
                expires: cdk.Expiration.after(cdk.Duration.days(365)),
              },
            },
          },
          xrayEnabled: true,
        })
    
        //this will print graogql url in the terminal
        new cdk.CfnOutput(this, "graphqlApiUrl", {
          value: api.graphqlUrl,
        })
        //this will print graphql key in the terminal
        new cdk.CfnOutput(this, "GraphqlApiKey", {
          value: api.apiKey || "",
        })
    
        //this will print api id in the terminal
        new cdk.CfnOutput(this, "region", {
          value: this.region,
        })
    
        // createing table in dynamodb
        const dynamoTable = new dynamoDB.Table(this, "VirtualLollyTable", {
          billingMode: dynamoDB.BillingMode.PAY_PER_REQUEST,
          //it is like primary key
          partitionKey: {
            name: "link",
            type: dynamoDB.AttributeType.STRING,
          },
        })


        const role = new Role(this, 'LambdaRole', {
          assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
        });
    
        ///Attaching DynamoDb access to policy
        const policy = new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['codepipeline:*', 's3:*', 'lambda:*',"logs:*", "dynamodb:*"],
          resources: ['*']
        });

        //granting IAM permissions to role
        role.addToPolicy(policy);
    
        // lambda contruct
        const LollyLambda = new lambda.Function(this, "lollyHandler", {
          runtime: lambda.Runtime.NODEJS_12_X,
          handler: "main.handler",
          code: lambda.Code.fromAsset("lambda"),
          role: role, 
          memorySize: 1024,
          environment: {
            DYNAMODB_TABLE_NAME: dynamoTable.tableName,
          },
        })
    
        // new lambda function as a datasource
        const lambda_Datasource = api.addLambdaDataSource(
          "lambda_datasource",
          LollyLambda
        )
    
        // Attaching the graphql resolvers
        lambda_Datasource.createResolver({
          typeName: "Query",
          fieldName: "AllLolly",
        })
        lambda_Datasource.createResolver({
          typeName: "Mutation",
          fieldName: "AddLolly",
        })
        lambda_Datasource.createResolver({
          typeName: "Query",
          fieldName: "getLollyByPath",
        })
    
        // giving permission to lambda functions to access dynamoTable using IAM
        dynamoTable.grantFullAccess(LollyLambda)

      //CI/CD PipeLine code

      new cdk.CfnOutput(this, "CloudFrontURL", {
        value: dist.distributionDomainName
      });
  
      // Artifact from source stage
      const sourceOutput = new CodePipeline.Artifact();
  
      // Artifact from build stage
      const S3Output = new CodePipeline.Artifact();
  
      //Code build action, Here you will define a complete build
      const s3Build = new CodeBuild.PipelineProject(this, 's3Build', {
        buildSpec: CodeBuild.BuildSpec.fromObject({
          version: '0.2',
          phases: {
            install: {
              "runtime-versions": {
                "nodejs": 12
              },
              commands: [
                // 'cd stepxx_CI_CD_pipeline_update_frontend',
                // 'cd lollypop',
                'npm i -g gatsby',
                'npm install',
              ],
            },
            build: {
              commands: [
                'gatsby build',
              ],
            },
          },
          artifacts: {
            'base-directory': './public',   ///outputting our generated Gatsby Build files to the public directory
            "files": [
              '**/*'
            ]
          },
        }),
        environment: {
          buildImage: CodeBuild.LinuxBuildImage.STANDARD_3_0,   ///BuildImage version 3 because we are using nodejs environment 12
        },
      });
  
      // const policy = new PolicyStatement();
      // policy.addActions('s3:*');
      // policy.addActions('codepipeline:*');
      // policy.addActions('lambda:*');
      // policy.addResources('*');
  
      // LollyLambda.addToRolePolicy(policy);
  
      ///Define a pipeline
      const pipeline = new CodePipeline.Pipeline(this, 'GatsbyPipeline', {
        crossAccountKeys: false,  //Pipeline construct creates an AWS Key Management Service (AWS KMS) which cost $1/month. this will save your $1.
        restartExecutionOnUpdate: true,  //Indicates whether to rerun the AWS CodePipeline pipeline after you update it.
      });
      
      LollyLambda.addEnvironment("PIPLINE_NAME", pipeline.pipelineName)
      ///Adding stages to pipeline
  
      //First Stage Source
      pipeline.addStage({
        stageName: 'Source',
        actions: [
          new CodePipelineAction.GitHubSourceAction({
            actionName: 'Checkout',
            owner: 'ShaikhAbdulSami',
            repo: "13C",
            oauthToken: cdk.SecretValue.secretsManager('GITHUB_TOKEN'), ///create token on github and save it on aws secret manager
            output: sourceOutput,                                       ///Output will save in the sourceOutput Artifact
            branch: "master",                                           ///Branch of your repo
          }),
        ],
      })
  
      pipeline.addStage({
        stageName: 'Build',
        actions: [
          new CodePipelineAction.CodeBuildAction({
            actionName: 's3Build',
            project: s3Build,
            input: sourceOutput,
            outputs: [S3Output],
          }),
        ],
      })
  
      pipeline.addStage({
        stageName: 'Deploy',
        actions: [
          new CodePipelineAction.S3DeployAction({
            actionName: 's3Build',
            input: S3Output,
            bucket: myBucket,
          }),
        ],
      })
  }
}
