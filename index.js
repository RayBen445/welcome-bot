// index.js (Using ES Module Imports)

import { App, createNodeMiddleware } from "@octokit/app";

// Decode the Base64 private key
const privateKey = Buffer.from(process.env.PRIVATE_KEY, "base64").toString("utf8");

// Initialize the GitHub App
const app = new App({
  appId: process.env.APP_ID,
  privateKey: privateKey,
  webhooks: {
    secret: process.env.WEBHOOK_SECRET,
  },
});

// Webhook Event Handlers

// Handle issue opened events
app.webhooks.on("issues.opened", async ({ octokit, payload }) => {
  console.log(`Received an issue opened event for #${payload.issue.number}`);
  
  const issueComment = octokit.rest.issues.createComment({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    issue_number: payload.issue.number,
    body: `Hello @${payload.issue.user.login}! 👋

Thanks for opening an issue in **${payload.repository.name}**. A team member will be with you shortly.
Welcome to our project and community! 🎉`,
  });

  try {
    await issueComment;
    console.log(`Successfully commented on issue #${payload.issue.number}`);
  } catch (error) {
    console.error("Failed to post comment:", error);
  }
});

// Handle pull request opened events
app.webhooks.on("pull_request.opened", async ({ octokit, payload }) => {
  console.log(`Received a pull request opened event for #${payload.pull_request.number}`);
  
  const prComment = octokit.rest.issues.createComment({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    issue_number: payload.pull_request.number,
    body: `Hello @${payload.pull_request.user.login}! 👋

Thank you for submitting a pull request to **${payload.repository.name}**! Our team will review your changes soon.
We're excited to have your contribution. Welcome aboard! 🚀`,
  });

  try {
    await prComment;
    console.log(`Successfully commented on pull request #${payload.pull_request.number}`);
  } catch (error) {
    console.error("Failed to post comment:", error);
  }
});

// Handle repository created events
// Note: This also handles imported repositories, as GitHub typically fires 
// "repository.created" events for newly imported repositories
app.webhooks.on("repository.created", async ({ octokit, payload }) => {
  console.log(`Received a repository created event for ${payload.repository.name}`);
  
  const welcomeIssue = octokit.rest.issues.create({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    title: "Welcome to your new repository! 🌟",
    body: `Hello @${payload.repository.owner.login}! 👋

Congratulations on creating a new repository: **${payload.repository.name}**!
We're thrilled to see your project start its journey. If you need any help getting started, feel free to ask.
Welcome to the GitHub community! 🌟`,
  });

  try {
    await welcomeIssue;
    console.log(`Successfully created welcome issue for repository ${payload.repository.name}`);
  } catch (error) {
    console.error("Failed to create welcome issue:", error);
  }
});

// Handle star events
app.webhooks.on("star.created", async ({ octokit, payload }) => {
  console.log(`Received a star event for ${payload.repository.name} from ${payload.sender.login}`);
  
  const starIssue = octokit.rest.issues.create({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    title: `Thank you for starring our repository! ⭐`,
    body: `Hello @${payload.sender.login}! 👋

Thank you so much for starring **${payload.repository.name}**! ⭐
Your support means a lot to us and helps our project grow.
We're thrilled to have you as part of our community! 🎉`,
  });

  try {
    await starIssue;
    console.log(`Successfully created thank you issue for star from ${payload.sender.login}`);
  } catch (error) {
    console.error("Failed to create star thank you issue:", error);
  }
});

// Handle fork events
app.webhooks.on("fork", async ({ octokit, payload }) => {
  console.log(`Received a fork event for ${payload.repository.name} from ${payload.forkee.owner.login}`);
  
  const forkIssue = octokit.rest.issues.create({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    title: `Thanks for forking our repository! 🍴`,
    body: `Hello @${payload.forkee.owner.login}! 👋

Thank you for forking **${payload.repository.name}**! 🍴
We're excited to see what you'll build with it. Feel free to contribute back if you make improvements!
Welcome to our community of contributors! 🚀`,
  });

  try {
    await forkIssue;
    console.log(`Successfully created thank you issue for fork from ${payload.forkee.owner.login}`);
  } catch (error) {
    console.error("Failed to create fork thank you issue:", error);
  }
});

// This exports the webhook handler for Vercel to use
export default createNodeMiddleware(app);
