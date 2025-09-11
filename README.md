# Welcome Bot

A comprehensive GitHub App that welcomes contributors, celebrates community engagement, and fosters a friendly repository environment with customized messages for multiple GitHub events.

## Features

The welcome bot responds to the following GitHub events:

### 🔥 Core Contribution Events

#### Issues Opened
When someone opens a new issue, the bot posts a welcoming comment:
> Hello @username! 👋
>
> Thanks for opening an issue in **repository-name**. A team member will be with you shortly.
> Welcome to our project and community! 🎉

#### Pull Requests Opened  
When someone submits a new pull request, the bot posts a welcoming comment:
> Hello @username! 👋
>
> Thank you for submitting a pull request to **repository-name**! Our team will review your changes soon.
> We're excited to have your contribution. Welcome aboard! 🚀

#### Issues Assigned
When someone gets assigned to an issue, the bot posts an encouraging comment:
> Hello @username! 👋
>
> You've been assigned to work on this issue in **repository-name**. 
> Thank you for taking this on - we're excited to see your contribution! 🎯
>
> If you have any questions or need clarification, feel free to ask. Welcome to the team! 🚀

### 🏠 Repository Events

#### Repository Created
When a new repository is created, the bot creates a welcome issue:
> Hello @username! 👋
>
> Congratulations on creating a new repository: **repository-name**!
> We're thrilled to see your project start its journey. If you need any help getting started, feel free to ask.
> Welcome to the GitHub community! 🌟

*Note: This also covers imported repositories, as GitHub typically fires "repository.created" events for newly imported repositories.*

#### Repository Starred ⭐
When someone stars the repository, the bot creates a thank you issue:
> Hello @username! 👋
>
> Thank you so much for starring **repository-name**! ⭐
> Your support means a lot to us and helps our project grow.
> We're thrilled to have you as part of our community! 🎉

#### Repository Forked 🍴
When someone forks the repository, the bot creates a welcome issue:
> Hello @username! 👋
>
> Thank you for forking **repository-name**! 🍴
> We're excited to see what you'll build with it. Feel free to contribute back if you make improvements!
> Welcome to our community of contributors! 🚀

#### Repository Watched 👀
When someone starts watching the repository, the bot creates a thank you issue:
> Hello @username! 👋
>
> Thank you for watching **repository-name**! 👀
> We're excited to have you following our project updates and progress.
> Stay tuned for exciting developments! 🚀

### 🎉 Community & Team Events

#### Team Member Added
When a new collaborator is added to the repository, the bot creates a welcome issue:
> Hello @username! 👋
>
> Welcome to the **repository-name** team! 🎉
> We're thrilled to have you as a collaborator on this project.
>
> As a team member, you now have enhanced access to help maintain and improve our repository. 
> Thank you for joining us - we look forward to working together! 🚀
>
> Feel free to introduce yourself and let us know how you'd like to contribute!

#### Release Published 🚀
When a new release is published, the bot creates an announcement issue:
> Hello everyone! 👋
>
> We're excited to announce that **release-name** has been released for **repository-name**! 🎉
>
> ## What's New
> [Release notes if available]
>
> Thank you to all contributors and community members who made this release possible! 🚀

#### Milestone Completed 🏆
When a milestone is completed, the bot creates a celebration issue:
> Hello everyone! 👋
>
> We've completed the **milestone-name** milestone in **repository-name**! 🏆
>
> ## Achievement Stats
> - Issues completed: X
> - Total issues: Y  
> - Completion: Z%
>
> Thank you to everyone who contributed to reaching this milestone! 🎉

## Deployment

This bot is designed to be deployed on Vercel as a serverless function. The `vercel.json` configuration file handles the deployment setup.

## Environment Variables

Set these environment variables for the GitHub App:
- `APP_ID`: Your GitHub App ID
- `PRIVATE_KEY`: Your GitHub App private key (base64 encoded)
- `WEBHOOK_SECRET`: Your webhook secret
