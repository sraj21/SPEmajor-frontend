pipeline{
    environment{
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')

	}
    agent any

    stages{
        stage('Git clone'){
            steps{
                git url: 'https://github.com/sraj21/SPEmajor-frontend.git',
                branch : 'master'
            }
        }
            
    
        stage('Build Docker Image') {
              steps {
                sh 'docker build -t sraj21/spemajor-frontend .'
              }
            }
        stage('Login into DockerHub') {
              steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
              }
            }
        stage('Push to DockerHub') {
              steps {
                sh 'docker push sraj21/spemajor-frontend'
              }
            }
        stage('Delete Docker Image from Local'){
                steps {
                    sh 'docker rmi sraj21/spemajor-frontend'
                }
            }
        
        
    }
}