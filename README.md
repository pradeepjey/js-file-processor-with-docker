# Javascript + Docker File processor with ramdom objects volume and Bind mounts

This application setup help to process a docker volume with random variables of alphabetical strings, real numbers, integers and alphanumerics. Store the porcessed inputs along with variable/object type to a file using docker Bind mounts and exposed to docker host machine 

# Application Requirements

The application needs to be a minimum version of listed below.

1. Docker 27.4.0 


## Quick start

```bash
# select a repo from github

# download the example or clone the repo from github
git clone https://github.com/pradeepjey/js-file-processor-with-docker.git

# change directory
cd file-processor

# Build docker image
docker build -t file-processor .

# Run docker image with attached volume 'random-objects' and bind mount of data
docker run -v random-objects:/data -v $(pwd)/data:/app/data:rw file-processor

```
