### TableBooker Microservices

#### Installation & Configuration

Each microservice has a config.js. This file specifies a mysql server & port to connect to as well as the port the microservice runs on.

A Makefile exists for each microservice, just run 'make' in each folder to build a docker image for each.

~~~~
for i in {bookings,customers,frontend,owners,restaurants}; do echo $i; cd ./$i; make; cd ..; done
~~~~

#### Running

Using the mysql docker image:
~~~~
docker run --name tablebooker_database -p3306:3306 -e MYSQL_ROOT_PASSWORD=changeme -d mysql:latest

docker run -d --name tablebooker_bookings -p4000:4000 --link="tablebooker_database:mysql" tablebooker/bookings:latest
docker run -d --name tablebooker_customers -p5000:5000 --link="tablebooker_database:mysql" tablebooker/customers:latest
docker run -d --name tablebooker_owners -p6000:6000 --link="tablebooker_database:mysql" tablebooker/owners:latest
docker run -d --name tablebooker_restaurants -p7000:7000 --link="tablebooker_database:mysql" tablebooker/restaurants:latest

docker run -d --name tablebooker_frontent -p8000:8000 \
  --link="tablebooker_bookings:bookings" --link="tablebooker_customers:customers" \
  --link="tablebooker_owners:owners" --link="tablebooker_restaurants:restaurants" \
  tablebooker/frontend:latest
~~~~
