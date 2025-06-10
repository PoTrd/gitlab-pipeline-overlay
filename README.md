# GitLab Pipeline Overlay

GPO is an electron application for DevOps. It allows you to view at every time the status of your GitLab pipelines and jobs in a simple and intuitive way.

# How to dev ?

## Install dependencies

```bash
npm install
```

## Add .env file

Create a `.env` file in the root of the project with the following content:

```
GITLAB_API_URL=https://gitlab.example.com/api/v4
GITLAB_API_TOKEN=your_gitlab_api_token
GITLAB_PROJECT_ID=your_gitlab_project_id
```

## Run the application

```bash
npm start
```

or for dev

```bash
npm run dev
```

and then press `ctrl + maj + i` to open the console.
