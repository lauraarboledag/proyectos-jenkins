pipeline{
    agent any

    stages{

        stage('Clonar el repositorio'){

             steps {
                git branch: 'main', credentialsId: 'git-jenkins', url: 'https://github.com/lauraarboledag/proyectos-jenkins.git'
            }

        }

        stage('Contruir imagen en Docker'){
            steps {
                withCredentials([
                    String(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
            ]){
                  docker.build('backend-proyecto-micro:v1', '--build-arg MONGO_URI=${MONGO_URI}' .)
            }
            }
        }

        stage('Desplegar contenedores Docker'){
            steps{

                Script {
                    withCredentials([
                    String(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
            ]){
                 sh """
                 sed '$s|{MONGO_URI}|${MONGO_URI}|g' docker-compose.yml -> docker-compose-update
                    docker-compose -f docker-compose-update.yml up -d
                 """
            }
                
                }

            }

        }

    }
}