pipeline {
  agent any

  environment {
    SSH_QA_SERVER = credentials('QA_SSH_CREDS')
    QA_SERVER_IP = '13.233.212.129'
    DIR_PATH = '/home/ubuntu/NodeJs-Api'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    // stage('Build') {
    //   steps {
    //     sh 'npm install'
    //   }
    // }

    stage('Deploy') {
      steps {
        sshagent(['${SSH_QA_SERVER}']) {
          sh 'ssh -o StrictHostKeyChecking=no ubuntu@${QA_SERVER_IP} "sudo su && cd ${DIR_PATH} && git pull && npm install && pm2 restart ecosystem.config.js"'
        }
      }
    }
  }
}
