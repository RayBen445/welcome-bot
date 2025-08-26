// index.js (Simplified for Vercel)

const { App } = require("@octokit/app");
const { createNodeMiddleware } = require("@octokit/app");

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

// Webhook Event Handler
app.webhooks.on("issues.opened", async ({ octokit, payload }) => {
  console.log(`Received an issue opened event for #${payload.issue.number}`);
  
  const issueComment = octokit.rest.issues.createComment({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    issue_number: payload.issue.number,
    body: `Hello there, @${payload.issue.user.login}! 👋
    
    Thanks for opening this issue. A team member will be with you shortly.
    
    Welcome to the community! 🎉`,
  });

  try {
    await issueComment;
    console.log(`Successfully commented on issue #${payload.issue.number}`);
  } catch (error) {
    console.error("Failed to post comment:", error);
  }
});

// This exports the webhook handler for Vercel to use
module.exports = createNodeMiddleware(app);
