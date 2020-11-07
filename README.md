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



