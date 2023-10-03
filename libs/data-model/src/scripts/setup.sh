#!/bin/bash

CONTAINER_ID=$(docker ps --all --quiet --filter "name=ems_services_dynamodb" | head -n 1)
CONTAINER_STATUS=$(docker inspect --format "{{json .State.Status }}" $CONTAINER_ID)
until [ $CONTAINER_STATUS == '"running"' ]
do
  echo "Waiting for ems_services_dynamodb container to start..."
  sleep 1
done