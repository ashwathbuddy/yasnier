# Complete Infra documentation

## Prerrequisites

- Amazon Route53 Domain
- Amazon Certificate Manager cert for the domain

## Route53 & ACM

### Certificate

1. create certificate for ectios.eu & \*.ectios.eu
2. Selected N. Virginia region????? --> is this needed??
3. create CNAME register in DNS

### Troubleshoting

- Verify DNS register exists and is correctly setup (using the name of the certificate)

```bash
dig _28070b47df2bce79a0995d3facc7c6f9.ectios.eu.

dig +short _28070b47df2bce79a0995d3facc7c6f9.ectios.eu.

```

if no answer, DNS has not propagated the certificate.

###  References

- <https://www.youtube.com/watch?v=jzouO_G9mxU>

## Create stack

```
aws cloudformation deploy --template-file template.yml --stack-name ems-app --parameter-overrides BaseUrl=ectios.eu AppUrl=ems.ectios.eu AcmCertArn=arn:aws:acm:us-east-1:058603534851:certificate/aaa1ca20-7920-43f3-a77b-d5d76658b0e3
```

Get the CloudFront DistributionId and S3 bucket by running the following command

```bash
aws cloudformation describe-stacks --stack-name aws-ng-demo --query "Stacks[0].Outputs[?OutputKey==`DistributionId` || OutputKey==`AppBucket`]"
```

## Deploy code

Added a script in package.json to:

1. Builds the angular app for production
2. Syncs the built app to your S3 bucket
3. Creates a CloudFront invalidation so that edge locations would get the latest build. (remove a file from CloudFront edge caches before it expires)

```json
{
    "deploy": "ng build --prod --aot
        && aws s3 sync dist/demo-app s3://{AppBucket}
        && aws cloudfront create-invalidation --distribution-id {DistributionId} --paths /"
}
```

Update /web-app/package.json/scripts/deploy Replace {AppBucket} & {DistributionId} with your stack outputs

## Deploy the App

Run the following command from the /web-app directory
npm run deploy

```bash
npm run deploy
```

## Cleanup

Cleaning everything up is even easier than putting it up. There is no reason to pay for environments that are not in use!

The following commands will delete your bucket contents and then delete the stack.

```bash
aws s3 rm s3://{AppBucket} --recursive
aws cloudformation delete-stack --stack-name ems-app
```

Note
: Replace {AppBucket} with your stack output
