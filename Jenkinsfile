pipeline {
    agent any

    stages {
        stage('Hello') {
            steps {
                sh 'sonar-scanner -Dsonar.projectKey=share-your-experience -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.token=sqp_3b96deb7444886a165ec71f3e8dfa2c412ec1b14'
            }
        }
    }
}
