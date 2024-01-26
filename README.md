# Nest Typescript Firestore Starter

`npm i`

## GCP CLI

1. Install gcloud: <https://cloud.google.com/sdk/docs/install>
2. Run `gcloud auth login` and sign in with your browser

## Firestore

### GCP Setup

1. Enable Firestore for your gcp project. Use Native mode
2. Create a collection (subsequent ones can be created via code)
3. Add your `projectId` to the `defaultOptions` in `src/firestore/firestore.module.ts`

### Create dev service account

1. Go to <https://console.cloud.google.com/iam-admin/serviceaccounts>, and hit `Create Service Account`
2. Set your service account name & to Service account ID to `<your name>-dev`
3. For `Select a role` choose `Basic -> Owner`
4. Select Done

### Download your credentials

1. After your service account is created, select `Actions -> Manage Keys` (on this page <https://console.cloud.google.com/iam-admin/serviceaccounts>)
2. Hit `Add Key -> Create new key -> JSON`
3. Your credentials will have downloaded. Rename them to `.devcredentials.json` and move to the root of this repo

## Start

Run `yarn start`

## Docker

### Install

1. Install Docker Desktop
2. Run `gcloud auth configure-docker`

### GCP

1. `Container Registry -> Enable`

### Extension

First install the Docker VSCode extension (Recommended)

### Building the image

1. Right click `Dockerfile` in repo root. Select `Build Image...`
2. Name the image: `gcr.io/<project-name>/<image-name>:latest`

### Pushing the image

1. Go to Docker extension tab
2. Right click on`Images -> gcr.io/<project-name>/<image-name> -> latest`, then `Push`

### Deploying

1. Go to Cloud Run: <https://console.cloud.google.com/run>
2. Create new service, and select your latest image when deploying
