#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Function to run gcloud commands within a Docker container
gcloud-docker() {
	echo "run gcloud with arg: $@"
	docker run -it -v ${PWD}:/workspace -v gcloud-config:/root/.config/gcloud -w /workspace gcr.io/google.com/cloudsdktool/google-cloud-cli gcloud "$@"
}

gcloud-docker "$@"