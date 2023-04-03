pipeline {
  agent any

  environment {
        region = "us-east-1"
        docker_repo_uri = "935402898342.dkr.ecr.ap-south-1.amazonaws.com/brant_ford_admin_api"
        task_def_arn = ""
        cluster = ""
        exec_role_arn = ""
  }

  stages {
    stage('Clone From Repo') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker') {
      steps {
        sh 'npm install'
      }
    }

    // stage('Deploy') {
    //   steps {
    //     sshagent(['${SSH_QA_SERVER}']) {
    //       sh 'ssh -o StrictHostKeyChecking=no ubuntu@${QA_SERVER_IP} "sudo su && cd ${DIR_PATH} && git pull && npm install && pm2 restart ecosystem.config.js"'
    //     }
    //   }
    // }
  }
}
