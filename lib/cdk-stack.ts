import { Stack, StackProps, Aws } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const assetsBucket = new Bucket(this, 'assetsBucket', {
      bucketName: `general-bucket-${Aws.ACCOUNT_ID}-${Aws.REGION}`,
      encryption: BucketEncryption.S3_MANAGED,
      publicReadAccess: false
    })

    const zone = HostedZone.fromLookup(this, 'MainHostedZone', {
      domainName: 'planthub.academy'
    });

    const record = new ARecord(this, 'lightsailRecord', {
      target: RecordTarget.fromIpAddresses('3.12.230.208'), // this is lightsail instance public IP 
      zone
    })
  }
}
