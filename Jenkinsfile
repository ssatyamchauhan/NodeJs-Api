import hudson.model.*
import hudson.EnvVars
import groovy.json.JsonSlurperClassic
import groovy.json.JsonBuilder
import groovy.json.JsonOutput
import groovy.json.*
import java.net.URL

  pipeline {
    agent any
    environment {
          AWS_ACCOUNT_ID="935402898342"
          AWS_DEFAULT_REGION="ap-south-1"
          FARGATE_CLUSTER_NAME="Cluster-QA"
          SERVICE_NAME="Service-QA"
          TASK_DEFINITION_NAME="Admin_Api"
          DESIRED_COUNT="1"
          IMAGE_REPO_NAME="brant_ford_admin_api"
          IMAGE_TAG="${env.BUILD_ID}"
          REPOSITORY_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
          REGISTRY_CREDENTIALS="AWS_CREDS"
    }

    stages {
          stage('Build Docker image') {
              steps {
                  script {
                      docker.build("${IMAGE_REPO_NAME}:${IMAGE_TAG}")
                  }
              }
          }
          
          stage('Push Docker image to ECR') {
              steps {
                  script {
                      sh("aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com")
                      docker.tag("${IMAGE_REPO_NAME}:${IMAGE_TAG}", "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}")
                      docker.push("${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}")
                  }
              }
          }
          
          stage('Create task definition') {
              steps {
                  script {
                      def taskDefinition = [:]
                      taskDefinition.family = "${IMAGE_REPO_NAME}"
                      taskDefinition.containerDefinitions = [[
                          name: "${IMAGE_REPO_NAME}",
                          image: "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}",
                          cpu: 256,
                          memoryReservation: 512
                      ]]
                      writeFile file: 'taskDefinition.json', text: groovy.json.JsonOutput.toJson(taskDefinition)
                  }
              }
          }
          
        stage('Deploy to Fargate') {
            steps {
                script {
                    def taskDefinition = readJSON(file: 'taskDefinition.json')
                    sh("aws ecs register-task-definition --region ${AWS_DEFAULT_REGION} --cli-input-json '${taskDefinition}'")
                    sh("aws ecs update-service --region ${AWS_DEFAULT_REGION} --cluster ${FARGATE_CLUSTER_NAME} --service ${IMAGE_REPO_NAME} --force-new-deployment")
                }
            }
        }
    }
  }
