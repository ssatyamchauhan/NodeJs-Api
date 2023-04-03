pipeline {
  agent any
  environment {
        AWS_ACCOUNT_ID="935402898342"
        AWS_DEFAULT_REGION="ap-south-1"
        CLUSTER_NAME="Cluster-QA"
        SERVICE_NAME="Service-QA"
        TASK_DEFINITION_NAME="Admin_Api"
        DESIRED_COUNT="1"
        IMAGE_REPO_NAME="brant_ford_admin_api"
        IMAGE_TAG="${env.BUILD_ID}"
        REPOSITORY_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
        REGISTRY_CREDENTIALS="AWS_CREDS"
  }

  // stages {
  //   stage('Clone From Repo') {
  //     steps {
  //       checkout scm
  //     }
  //   }

  //   stage('Build Docker') {
  //     steps {
  //       sh 'npm install'
  //     }
  //   }

  //   stage('Deploy') {
  //     steps {
  //       sshagent(['${SSH_QA_SERVER}']) {
  //         sh 'ssh -o StrictHostKeyChecking=no ubuntu@${QA_SERVER_IP} "sudo su && cd ${DIR_PATH} && git pull && npm install && pm2 restart ecosystem.config.js"'
  //       }
  //     }
  //   }
  // }
}
