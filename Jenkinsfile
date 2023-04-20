def COLOR_MAP = [
    'SUCCESS': 'good', 
    'FAILURE': 'danger',
]

def url = 'https://czft.qa.webcluesstaging.com/'

pipeline {
    agent any
	  environment {     
       DOCKERHUB_CREDENTIALS= credentials('registry.webcluesinfotech.com-credentials')  
         }    
       stages {
          stage('Checkout Code') {
              steps {
                  checkout scm
               }
            }
          stage('Cloning Git'){
            steps {
              git([url: 'https://github.com/CodezerosDev/admin-panel-front-end-nextjs.git', branch: 'development', credentialsId: 'Codezerosdev-git'])

                  }
             }		  
          stage("Create Docker Image"){
            steps {
              sh 'docker build -t registry.webcluesinfotech.com/admin-pannel-cz-frontend:$BUILD_NUMBER .'
		      	  sh 'docker image tag registry.webcluesinfotech.com/admin-pannel-cz-frontend:$BUILD_NUMBER registry.webcluesinfotech.com/admin-pannel-cz-frontend:latest '
			        echo 'Build Image Completed'
                }
		         }
		      stage("Login in Dokcer Registry"){
            steps{
	      sh 'docker logout'
              sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login  registry.webcluesinfotech.com -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			        echo 'Login Completed'
               }
		        }  
		      stage('Push Image to Docker Hub') {         
            steps{                            
	          sh 'docker push registry.webcluesinfotech.com/admin-pannel-cz-frontend:$BUILD_NUMBER'                
			      sh 'docker push registry.webcluesinfotech.com/admin-pannel-cz-frontend:latest'
		              sh 'docker logout'
			      echo 'Push Image Completed'  
		    
               }           
            }      
		      stage("Update the image on Kubernetes Deployment"){
            steps{
              sshagent(credentials: ['wdcs-bastion']) {
                  sh '''
                      [ -d ~/.ssh ] || mkdir ~/.ssh && chmod 0700 ~/.ssh
                      ssh-keyscan -t rsa,dsa 43.204.64.131 >> ~/.ssh/known_hosts
                      ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no ubuntu@43.204.64.131 'kubectl rollout restart deployment admin-pannel-cz-frontend-deploy'
                      '''
                   }   
               }   
            }

        }
	  
	  post {
            always {
                slackSend(
                    channel: '#tools-jenkins', 
                    message:"Build: *${currentBuild.result}:* JOB ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL} \n Web-Site URL: ${url}",
                    color: COLOR_MAP[currentBuild.result],
                    )

                emailext(
                    subject: "Build Succeded: ${JOB_NAME}-Build# ${BUILD_NUMBER} ${currentBuild.result}", 
                    body: "${currentBuild.result}: ${BUILD_URL}", 
                    attachLog: true, 
                    compressLog: true, 
                    replyTo: 'majaz@webcluesinfotech.com', 
                    to: 'saurabh.kadam@webcluesinfotech.com,soham.jadiya@codezeros.com'
                    ) 
            }
        }
}
