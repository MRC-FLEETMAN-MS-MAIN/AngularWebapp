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

### REQUIREMENT ANALYSIS

The requirements were formulated to form different user stories and usecase diagrams as a part of this phase.

### SYSTEM DESIGN

The system was developed as a cloud ready microservices setup. The system employs fault tolerant techniques like Asynchronous communication and High Availability-Scalable techniques like the implmentation of Load Balancer, Circuit breakers, database hosted in cloud. The sequence diagram and class diagram of some of the usecases are listed below.


The system has both Hardware part and Software part. 

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

As a first step, Using Ansible we rolled out a new EC2 instance with elastic i[ (static public 







