## IoT-driven-Smart-Fleetman-Management

Smart Fleet Management is a micro services based system which can be deployed in a environment and can be used to track the position coordinates, temperature, pressure readings in any automobile or moving vehicle. The Temperature, Pressure and Position (GPS) sensors installed in any vehicle can be used to transmit data to the system deployed in local premises/cloud.

## SMART ASPECTS OF THE FLEETMAN MANAGMENT SYSTEM

>> The system is developed based on a micro-services architecture making it fault tolerant and scalable.

>> As its a micro-service based system, it is Programming language independent. Some of the backend microservices were developed on Java and NodeJS and the frontend was on Angular.

>> The employment of messaging queues like ( RabbitMQ, ActiveMQ(Optional)) for Asychronous communication make the system Fault resistant.

>> The microservice system is based on REST APIs making it super flexible. The system is coupled with a Angular Web Front (Angular). The data from the backend is transmitted to frontend via application layer protocols like HTTP(REST APIs) and WebSockets.

>> The Hardware Segment packs a Temperature Sensor(DHT11), Motion Sensor(PIR), Pressure Readings(Simulated) and GPS readings (positions simulated). There has been different        application layers protocols employed in our system. MQTT protocol ( TCP protocol on Transport level) has been employed to transmit valeus from PIR sensors to our system whereas COAP (UDP protocol on Transport level) is used to transmit values from Temperature/Pressure sensors to the system. THe Postion readings are transmitted using HTTP (via REST APIs, TCP on transport level). The motion sensor was connected to ESP8266 chip which inturn was connected via Wifi ( physcial level protocol). The Temperature/Pressure sensors were connected to Raspberry Pi (3b+).The pi was connected to Wifi ( on physical layer basics) and acted as IoT gateway where all the data from PIR, Temp and Pressure sensors were aggrevated. 

>> The ELK stack was employed as a part of log tracking.

>> Each microservice was independent and containerized using Docker.

>> Implementation of central Spring cloud externalized configuration management. Implementation of Reverse Proxy (nginx) from the Webapp end, Zuul gateway (Ribbon Load Balancer) acting as a single point of contact of backend requests, Eureka Discovery Service ( which acts a registry where all micro services register), JWT AUthentication, Feign client/ Fallback and Hystrix Ciruit breaker.


## SDLC PHASE OF FLEETMAN MANAGEMENT SYSTEM

### REQUIREMENT ANALYSIS AND PLANNING 

<div align="center">
<Image src="images/Userstory.JPG" class="center" style="width:50%">
</div>
  
  
<div align="center">
<Image src="images/IMG_20201024_231649.jpg" class="center" style="width:50%">
</div>
  

The requirements were formulated to form different user stories and usecase diagrams as a part of this phase.

### SYSTEM DESIGN

<div align="center">
<Image src="images/SequenceDiagram.JPG" class="center" style="width:50%">
</div>

<div align="center">
<Image src="images/ClassDiagram.JPG" class="center" style="width:50%">
</div>

The system was developed as a cloud ready microservices setup. The system employs fault tolerant techniques like Asynchronous communication and High Availability-Scalable techniques like the implmentation of Load Balancer, Circuit breakers, database hosted in cloud. The sequence diagram and class diagram of some of the usecases are listed below.


<b>The system has both Hardware part and Software part.</b> 

The hardware part possesses a Raspberry Pi which acts a IoT Gateway. We have all the sensor data coming to Raspberry Pi from the edge sensors connected in the vehicle. The PIR sensor connected to ESP8266 chip publishes to Raspberry Pi over MQTT protocol where the Pi acts as the broker. The Pi further transfers this motion data to AWS IoT things ( using AWS SDKs) over MQTT protocol making it a fault resilient system as the data is sent to AWS IoT thing where AWS IoT acts as MQTT broker. Also the QoS of MQTT is set as 1 so that active transfer of messages happen and no data is lost within the broker. 

Similarly the pressure/temperature data from DHT11 sensors is transfered to the correponding microservice over CoAP protocol. The dedicated microservice( ms name is Coap in the repo) designed for accumulation of sensor data has been designed in NodeJS where a MQTT client configured to receive motion from AWS broker is designed. Also the Coap server configured as a part of this service receives termperature/pressure from the CoAP client running in Raspberry Pi.

The Tempertaure/ Pressure and Motion data is transffered to Front end web application over WebSocket connection. The Websocket server running as a prt of backend microservice  obtains all the sensor data and transfers it to WebSocket client running in the frontend and eventually this data will be published on the frontend. 

The position data have been simulated with a Springboot microservice named PosSimulator. The data generated in position simulator microservice is transffered to Rabbit MQ as a part of Fault tolerant mechanism. The Position Tracker is another microservice which fetches data from RabbitMQ and sends this data to frontend over REST APIs. 

The other microservice VehiclDetails is a springboot microservice which is used to check the name of the vehicle that is being currentl tracked. It communicates with the above Position Tracker microservice and finds out the vehicle that is being tracked. 

In this project we use plethora of netflix libraries to handle our MicroService Architecture. 

We have created a Service Regsitry which in turn acts as a phonebook for our microservices. Each microservice registers itself with the service registry and tells the regsitry where it lives and perphases uses the other metadata of the regsitered micro service. We use Eureka service regsitry which is open source regsitry from Netflix.

APart from Eureka Regsitry we also a gateway from Netflix named as Zuul API Gateway. The Zuul Api gateway will be the outer single point of communication between the WebInterface. All the reuqets heading to this gateway is further routed to their respective microservices through their regsitred service name in the Eureka Regsitry. The Zuul API gateway also comes with inbuilt Load Balancer named Ribbon which makes sure that the request is evenly diverted to different instances of a microservice ( if multiple instances of same microservice exists) thus making sure that the load is evenly distribuyted acroos all microservices.

Also as a part of fault tolerant mechanism, I have employed best Spring cloud practices like employigng Feign CLient and Hystric callback fucntions. When feign client running as a part of a microservice contacts the other microservice, and if there is some error or if the ciruit is opem, the Hystrix Fallabck method is executed thus avoiding exceptions.  Also the usage of Netflixs ciruit breaker makes sire that the failing calls to a microservice is monitored and if the calls susbsequently fails then the ciruit is left open making the callaback method to be executed successfully. Hystrix is smart enough to identify if the other microservice is back to action. Once back, then the circuit is closed and the connection to the microservice is reestablished again successfully.

We have also built a microservice named MRCConfigService which is a spring cloud config server. It help for externalized configuration management in a distributed system. With this config serrver we have a central place to manage external properties for applications. The central place can be a localised path or a git repository. We have used a git repo since we will be deploying this system in AWS and K8S cluster and a git repo would be more handy. Before pushing the configuration to git rep, all the sensitive credentials were encrypted using Assymteric Encryption methodology. 

The users microservice handled all the user processes. The JWT authentication was setup for each logged in user a JWT token was generated. This token was used further to authenitcated for a specific duration. 

The WebApp microservice is an Angualr service ( based on Typescript). This angular frontend was coupled with backend via the REST API.The Angular webapp had different views like Signup, Login, Pressure/Temeprature/Motion and Position Tracker view. The Position tracker page displays the exact location of the vehicle in the google map.


For tracking the logs of the complete system, we had implmented an ELK stack. The logstash which is a server side data processing pipleine access the logs from different multole micro service anfd ingests into a storage location called Elastic search. The elastic search is also used for smart accessibility of the data. Kibaan is an additional data vitualization layer which enables to track logs as charts and tables.

### DEPLOYMENT AND THE ENVIRONMENT

The system was deployed in local environment (locally  and in Kubernetes clustyer) and AWS Cloud platforms to check its reliability and performance. 

Intially the complete system was deployed in local environemnt or on premises as dockerized containers. All the microservices were dockerized and run in local environment. THere were docker containers for possimulator, rabbitmq, positontracker, anguyalr webapp, registryservice, configservr, logstash, elastic, kibana and Coap service. AWS Mysql was always preffered as database for avoiding further discrepancies. Once deployed in the local envoironment, the system was subjected to few basic test cases and testing protocols like unit testing , performance testing and end to end testing , fucntional testing. Once tested the system was ready to be deployed in AWS cloud. Certain prerequistes were accomplished befdre deplying the system to the AWS cloud. 

>> First all of the microservice code setup was pushed to thei corresponding repositories.

Next we had used Ansible as our configuration Management tools to push configuration to the corresponding systems and trigger the run. Jenkins was the source automation server that was preffered to run Ansible playbools as a part of CI/CD pipelines.

#### Different Strategeis adopted in AWS to build a fault tolerant, performacne oriented and resilient system

As a first step, using Ansible we rolled out a new EC2 instance with elastic ip (static public ip). Inside this EC2 instance we run a Rabbit MQ  docker container. The security groups and network is configured accordingly so that the Rabbit mq running inside docker container is accessible across the elastic ip across the respective port.

Next for the Spring cloud config server, we developed a Ansible playbook that it rolls out a new EC2 instance with autoscaling group and launch configuration. We intend to create 2 instacnes of COnfigurtaion server service for the smooth performance of the system. ALso we create a elastic laod balancer (Application load balancer) which can be accesed by its dns name. The  elastic load balancer inturn balances the incoming requests to the different instances.

Similarly we create a EC2 instance running dokcer container of eureka registry using ansible playbook and bounded to static ip. This same pattern applied to remaining microservices. 

Also we intend to run logstash containers in every microservice EC2 instances to accumulate the log data. We them run another EC2 instance with Elasticsearch and Kibana that is bounded to every logstash containers in all EC2 instances.

The database hasnt been changed since we were already using AWS MySQL db. 

We had used multi git organization pipeline feature in Jenkins to trigger the build and deployment. The multi git organization feature would auto reocngnize the Jenkins pipeline file in each microservice repository in the organization anf run the same. Each pipleine file eventually triggered the ansible playbook causing the EC2 instances to be populated and deploy systrem in live.

Initally we created a ansible controller node ( running in manually created aws ec2 instance) and using this node we created another ec2 instance hosting Jenkins Server. This Jenkins server was configured and coupled to our Git repo so that any new commits (configured with hooks) would auto trigger the build process and deployment. 

Most important we even came out with blue-green deployment techniques which is a software engineering technique making chanegs to web,app or database server by swapping alternating production and staging servers. So everytime we commit a new code in Git repo, it auto triggers the Jenkins pipleine and triggers thge build procerss. The build porcess would create a new EC2 instance with new fetaures and tag the new instane as greem. The old running EC2 instance is tagged as blue and eventually deleted. 

We had even used Ansiblke features like ANsible inventory to ssh into ec2 instacmce using their tag names for further instllation and configuration.

Now that we had deployed ourt system in local environment and AWS cloud we were enthralled to deploy our system ina Kuberntes cluster. A local K8S set up waa developed using MiniKube. where we had one master cluster and where we ran our microservices as K8S deployments. The deplyments has muktple instance of pods( our microservice docker containers running). 

Before deplying into k8S we had to push our docker images to docker repository making our k8S deplyment easy. After the docker images were pushed to repository we created different deplyments to get the  container deployed in the local minikube k8s clouster. For testing we had created deployments with 1 replicas of each microservices. We had created Services in minikube cluster to couple to the deployments. All the pods in the deployments were connected using K8S DNS server and we had only connected the front end web app deploymen to a specific nodeport via the service. Using this port and the minikube ip we were able to test the system running in K8S minikube cluster. 

A basic version of this system was tried and deployed in K8S cluster in AWS using KOPS configuration. Different K8S concepts like specific MEmory Request, CPU request for pods were handled for uplifting the overall performance of the system. We had also established horizontal pod scaling concept once the pods health was crtical and the once the requests were overloaded. We also established the concrpt of Readliness and liveness problem to check if the pods was ready enough to accept request from the webend. 

Ingress controllers within the K8S cluster in minikube was established to redirect the request to all the pods as per the domain dns names. This was done as an attempt to use single service via the node port. The same idea was adapted whem the system is deployed in AWS to  reduce the use of multiple load balancers across AWS.

The idea of stateful sets was planned initally so that we have multiple rabbit mq docker containers running across K8S cluster howver this was dropped later.

The deployment of our fleetman system in our k8s cluster(minikube) was automated using Jenkins CI/CD built. THe pipleines was created which in turn triggers the deplyment scripts to deply the K8S deployments into the kubernetes cluster.

### SYSTEM DESIGN BLOCK DIAGRAM

#### AWS CLOUD DEPLOYMENT

<div align="center">
<Image src="images/BLOCKO1.png" class="center" style="width:50%">
</div>
  
 
 #### KUBERNETES MINIKUBE DEPLOYMENT
 
 
<div align="center">
<Image src="images/K8S_MINIKUBE_4.png" class="center" style="width:50%">
</div>
 




### JENKINS CI/CD PIPELINE 

<div align="center">
<Image src="images/fleetman-github-organization.JPG" class="center" style="width:50%">
</div>
  
<div align="center">
<Image src="images/fleetman-postracker-pipeline.JPG" class="center" style="width:50%">
</div>
  
### ELASTIC LOGSTASH KIBANA LOGS 

<div align="center">
<Image src="images/elastic_ms.JPG" class="center" style="width:50%">
</div>
  
  
<div align="center">
<Image src="images/kibana_Micro_MS.JPG" class="center" style="width:50%">
</div>
  
  
### FLEETMAN MANAGEMENT SYSTEM 

  
<div align="center">
<Image src="images/MS1.JPG" class="center" style="width:50%">
</div>
  
  
<div align="center">
<Image src="images/MS3.JPG" class="center" style="width:50%">
</div>
  
<div align="center">
<Image src="images/MS4.JPG" class="center" style="width:50%">
</div>
  
  <div align="center">
<Image src="images/MS5.JPG" class="center" style="width:50%">
</div>
  
    
 <div align="center">
<Image src="images/MS7.JPG" class="center" style="width:50%">
</div>
  

  
  





Regarding the frontend web microservice, the angualr application was deployed in a nginx container which act as a static web server and  Reverse proxy. The K8S deployment of the same fleetman management system is done in another organziation and the link for the same is <a href="https://github.com/fleetmanMS-K8S"> K8S Fleetman management system deployment </a>


The commands used to construct docker images and containers have been put in the <a href="https://github.com/MRC-FLEETMAN-MS-MAIN/AngularWebapp/blob/master/MS_Info.docxtext"> file</a> which can be reffered while deploying and building the system. 













