// index.js (for Vercel)

require("dotenv").config();
const express = require("express");
const { App, createNodeMiddleware } = require("@octokit/app");

// Initialize the GitHub App
const app = new App({
  appId: process.env.APP_ID,
  privateKey: process.env.PRIVATE_KEY,
  webhooks: {
    secret: process.env.WEBHOOK_SECRET,
  },
});

// Webhook Event Handler
app.webhooks.on("issues.opened", async ({ octokit, payload }) => {
  console.log(`Received an issue opened event for #${payload.issue.number}`);

  // Prepare a welcome comment
  const issueComment = octokit.rest.issues.createComment({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    issue_number: payload.issue.number,
    body: `Hello there, @${payload.issue.user.login}! 👋
    
    Thanks for opening this issue. A team member will be with you shortly.
    
    Welcome to the community! 🎉`,
  });

  // Post the comment to the issue
  try {
    await issueComment;
    console.log(`Successfully commented on issue #${payload.issue.number}`);
  } catch (error) {
    console.error("Failed to post comment:", error);
  }
});

// --- Server Setup ---
const server = express();
server.use(createNodeMiddleware(app));

// This makes the server Vercel-compatible
module.exports = server;
    
