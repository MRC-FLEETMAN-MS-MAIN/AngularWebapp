node {
    
    stage('Preparation') { 
      
        git 'https://github.com/MRC-FLEETMAN-MS-MAIN/AngularWebapp'
      
    }
    stage('Build') {
                sh "npm install"
                sh "npm run build"
            
    }
    
     stage('Deploy'){
        
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'awscred', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
    ansiblePlaybook credentialsId: 'sshcred', installation: 'ansible-installation', playbook: 'deploy.yaml'
}
        
       
    }
       
    
    
}
