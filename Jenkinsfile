pipeline {
    agent { label 'ezenity-node' }

    environment {
        NODE_ENV = 'production'
        BUILD_DIR = 'build'
        DEPLOY_PATH = '/var/www/html' // Path where the site is served
    }

    stages {
        stage('Preparation') {
            steps {
                echo 'Preparing workspace...'
                // Clean up workspace and check out the latest code
                cleanWs()
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Installing project dependencies...'
                // Install Node.js dependencies using npm
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                echo 'Building the project...'
                // Build the project
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                // Run tests with npm
                sh 'npm test'
                // Optionally archive test results if you generate any reports
                junit '**/test-results/*.xml' // Adjust the path based on your setup
            }
        }
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying application...'
                script {
                    sh '''
                    echo 'Stopping Nginx to deploy new files...'
                    sudo systemctl stop nginx
                    
                    echo 'Clearing old files...'
                    sudo rm -rf ${DEPLOY_PATH}/*
                    
                    echo 'Copying new build files to ${DEPLOY_PATH}...'
                    sudo cp -r ${BUILD_DIR}/* ${DEPLOY_PATH}/
                    
                    echo 'Starting Nginx...'
                    sudo systemctl start nginx
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'Build and deployment succeeded!'
        }
        failure {
            echo 'Build or deployment failed. Check the logs for more details.'
        }
    }
}
