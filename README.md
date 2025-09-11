# Welcome Bot

A GitHub App that welcomes new contributors and repository creators with friendly, customized messages.

## Features

The welcome bot responds to the following GitHub events:

### Issues Opened
When someone opens a new issue, the bot posts a welcoming comment:
> Hello @username! 👋
>
> Thanks for opening an issue in **repository-name**. A team member will be with you shortly.
> Welcome to our project and community! 🎉

### Pull Requests Opened  
When someone submits a new pull request, the bot posts a welcoming comment:
> Hello @username! 👋
>
> Thank you for submitting a pull request to **repository-name**! Our team will review your changes soon.
> We're excited to have your contribution. Welcome aboard! 🚀

### Repository Created
When a new repository is created, the bot creates a welcome issue:
> Hello @username! 👋
>
> Congratulations on creating a new repository: **repository-name**!
> We're thrilled to see your project start its journey. If you need any help getting started, feel free to ask.
> Welcome to the GitHub community! 🌟

*Note: This also covers imported repositories, as GitHub typically fires "repository.created" events for newly imported repositories.*

## Deployment

This bot is designed to be deployed on Vercel as a serverless function. The `vercel.json` configuration file handles the deployment setup.

## Environment Variables

Set these environment variables for the GitHub App:
- `APP_ID`: Your GitHub App ID
- `PRIVATE_KEY`: Your GitHub App private key (base64 encoded)
- `WEBHOOK_SECRET`: Your webhook secret
