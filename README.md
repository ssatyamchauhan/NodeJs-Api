#!/bin/bash

# Build the Docker image
docker build -t your-image-name .

# Tag the Docker image for Amazon ECR
docker tag your-image-name:latest your-ecr-repository-url/your-image-name:latest

# Log in to Amazon ECR using the AWS CLI
$(aws ecr get-login --no-include-email)

# Push the Docker image to Amazon ECR
docker push your-ecr-repository-url/your-image-name:latest


First, create an Amazon Elastic Container Registry (ECR) repository to store your Docker image. To do this, navigate to the Amazon ECR console, and click on the "Create repository" button. Give your repository a name and click "Create repository."

Next, create a Jenkins instance in AWS. You can do this by launching an EC2 instance and installing Jenkins on it, or by using the AWS managed Jenkins service, AWS CodeStar.

Configure the Jenkins instance to use the Amazon ECR repository you created earlier. To do this, go to your Jenkins dashboard, click on "Manage Jenkins," and then click on "Configure System." Scroll down to the "Cloud" section, and click on "Add a new cloud." Select "Amazon EC2 Container Service" as the cloud provider, and enter your AWS access key and secret key. Click on "Test Connection" to ensure that Jenkins can connect to AWS.

Set up a Jenkins job to build and push your Docker image to the Amazon ECR repository. In Jenkins, click on "New Item" to create a new job. Select "Freestyle project," give your job a name, and click "OK." Under the "Source Code Management" section, select the Git repository that contains your Dockerfile. Under the "Build" section, add a build step to build your Docker image using the Dockerfile, and another build step to push the image to the Amazon ECR repository.

Create a task definition for your Fargate service. In the Amazon ECS console, click on "Task Definitions," and then click on "Create new Task Definition." Give your task definition a name and select "Fargate" as the launch type. Configure the memory and CPU settings for your task, and add a container to your task definition, specifying the Docker image and port mapping.

Create a service for your Fargate task. In the Amazon ECS console, click on "Clusters," and then click on the cluster where you want to deploy your Fargate service. Click on the "Create Service" button, and enter the name and number of tasks for your service. Select your Fargate task definition, and configure your load balancer settings, if applicable.

Finally, deploy your Fargate service. In Jenkins, trigger the job you created earlier to build and push your Docker image to the Amazon ECR repository. Once the image is pushed, the Amazon ECS service will automatically update to use the new version of the container. You can monitor the deployment progress in the Amazon ECS console.
