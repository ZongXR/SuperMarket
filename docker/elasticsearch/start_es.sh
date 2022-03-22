#!/bin/bash
docker network create --driver bridge --subnet 192.168.0.0/16 --gateway 192.168.0.1 net-es
