FROM ubuntu:latest
LABEL authors="ductienvu"

WORKDIR /

ENTRYPOINT ["top", "-b"]