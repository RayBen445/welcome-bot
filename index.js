// index.js (Using ES Module Imports)

import { App } from "@octokit/app";

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

// Handle watch events (when someone watches/subscribes to the repository)
app.webhooks.on("watch.started", async ({ octokit, payload }) => {
  console.log(`Received a watch event for ${payload.repository.name} from ${payload.sender.login}`);
  
  const watchIssue = octokit.rest.issues.create({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    title: `Thanks for watching our repository! 👀`,
    body: `Hello @${payload.sender.login}! 👋

Thank you for watching **${payload.repository.name}**! 👀
We're excited to have you following our project updates and progress.
Stay tuned for exciting developments! 🚀`,
  });

  try {
    await watchIssue;
    console.log(`Successfully created thank you issue for watch from ${payload.sender.login}`);
  } catch (error) {
    console.error("Failed to create watch thank you issue:", error);
  }
});

// Handle release published events
app.webhooks.on("release.published", async ({ octokit, payload }) => {
  console.log(`Received a release published event for ${payload.repository.name}: ${payload.release.tag_name}`);
  
  const releaseIssue = octokit.rest.issues.create({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    title: `🎉 New Release Published: ${payload.release.tag_name}`,
    body: `Hello everyone! 👋

We're excited to announce that **${payload.release.name || payload.release.tag_name}** has been released for **${payload.repository.name}**! 🎉

${payload.release.body ? `## What's New\n${payload.release.body}` : ''}

Thank you to all contributors and community members who made this release possible! 🚀

[Download the release](${payload.release.html_url})`,
  });

  try {
    await releaseIssue;
    console.log(`Successfully created release announcement issue for ${payload.release.tag_name}`);
  } catch (error) {
    console.error("Failed to create release announcement issue:", error);
  }
});

// Handle issue assigned events
app.webhooks.on("issues.assigned", async ({ octokit, payload }) => {
  console.log(`Received an issue assigned event for #${payload.issue.number} to ${payload.assignee.login}`);
  
  const assigneeComment = octokit.rest.issues.createComment({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    issue_number: payload.issue.number,
    body: `Hello @${payload.assignee.login}! 👋

You've been assigned to work on this issue in **${payload.repository.name}**. 
Thank you for taking this on - we're excited to see your contribution! 🎯

If you have any questions or need clarification, feel free to ask. Welcome to the team! 🚀`,
  });

  try {
    await assigneeComment;
    console.log(`Successfully commented on assigned issue #${payload.issue.number}`);
  } catch (error) {
    console.error("Failed to post assignee comment:", error);
  }
});

// Handle team member added events (collaborator added)
app.webhooks.on("member.added", async ({ octokit, payload }) => {
  console.log(`Received a member added event for ${payload.repository.name}: ${payload.member.login}`);
  
  const memberIssue = octokit.rest.issues.create({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    title: `Welcome new team member: @${payload.member.login}! 🎉`,
    body: `Hello @${payload.member.login}! 👋

Welcome to the **${payload.repository.name}** team! 🎉
We're thrilled to have you as a collaborator on this project.

As a team member, you now have enhanced access to help maintain and improve our repository. 
Thank you for joining us - we look forward to working together! 🚀

Feel free to introduce yourself and let us know how you'd like to contribute!`,
  });

  try {
    await memberIssue;
    console.log(`Successfully created welcome issue for new member ${payload.member.login}`);
  } catch (error) {
    console.error("Failed to create member welcome issue:", error);
  }
});

// Handle milestone completed events
app.webhooks.on("milestone.closed", async ({ octokit, payload }) => {
  console.log(`Received a milestone closed event for ${payload.repository.name}: ${payload.milestone.title}`);
  
  const milestoneIssue = octokit.rest.issues.create({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    title: `🏆 Milestone Completed: ${payload.milestone.title}`,
    body: `Hello everyone! 👋

We're excited to announce that we've completed the **${payload.milestone.title}** milestone in **${payload.repository.name}**! 🏆

${payload.milestone.description ? `## Milestone Description\n${payload.milestone.description}\n` : ''}

## Achievement Stats
- **Issues completed:** ${payload.milestone.closed_issues}
- **Total issues:** ${payload.milestone.closed_issues + payload.milestone.open_issues}
- **Completion:** ${Math.round((payload.milestone.closed_issues / (payload.milestone.closed_issues + payload.milestone.open_issues)) * 100)}%

Thank you to everyone who contributed to reaching this milestone! Your hard work and dedication make this project possible. 🎉

Let's keep up the momentum toward our next goals! 🚀`,
  });

  try {
    await milestoneIssue;
    console.log(`Successfully created milestone celebration issue for ${payload.milestone.title}`);
  } catch (error) {
    console.error("Failed to create milestone celebration issue:", error);
  }
});

// Custom webhook handler that doesn't require OAuth
const processWebhook = async (payload, signature, eventType, deliveryId, res) => {
  try {
    await app.webhooks.verifyAndReceive({
      id: deliveryId,
      name: eventType,
      signature: signature,
      payload: payload
    });
    
    res.status(200).json({ 
      message: 'Webhook processed successfully',
      event: eventType,
      deliveryId: deliveryId
    });
  } catch (error) {
    console.error('Webhook verification/processing error:', error);
    if (error.message.includes('signature')) {
      res.status(401).json({ 
        error: 'Unauthorized',
        message: 'Invalid webhook signature'
      });
    } else {
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'Failed to process webhook event'
      });
    }
  }
};

const webhookHandler = async (req, res) => {
  // Handle GET requests with a friendly message
  if (req.method === 'GET') {
    res.status(200).json({
      message: "Welcome Bot is running! 🤖",
      description: "This is a GitHub webhook endpoint. To use this bot, configure it as a webhook URL in your GitHub repository settings.",
      endpoints: {
        webhook: "POST requests to this URL"
      },
      events: [
        "issues.opened",
        "pull_request.opened", 
        "repository.created",
        "star.created",
        "fork",
        "watch.started",
        "release.published",
        "issues.assigned",
        "member.added",
        "milestone.closed"
      ]
    });
    return;
  }

  // Handle POST requests (webhooks)
  if (req.method === 'POST') {
    try {
      // Get the raw body and signature for webhook verification
      const signature = req.headers['x-hub-signature-256'] || req.headers['x-hub-signature'];
      const eventType = req.headers['x-github-event'];
      const deliveryId = req.headers['x-github-delivery'];
      
      if (!signature || !eventType) {
        res.status(400).json({ 
          error: 'Bad Request',
          message: 'Missing required webhook headers'
        });
        return;
      }

      // For Vercel functions, we need to handle the body differently
      let payload;
      if (typeof req.body === 'string') {
        payload = req.body;
      } else if (req.body && typeof req.body === 'object') {
        payload = JSON.stringify(req.body);
      } else {
        // If body is not available, try to read from request
        payload = '';
        req.on('data', chunk => {
          payload += chunk.toString();
        });
        req.on('end', async () => {
          await processWebhook(payload, signature, eventType, deliveryId, res);
        });
        return;
      }
      
      await processWebhook(payload, signature, eventType, deliveryId, res);
    } catch (error) {
      console.error('Webhook processing error:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'Failed to process webhook'
      });
    }
    return;
  }

  // Handle other HTTP methods
  res.status(405).json({ 
    error: 'Method not allowed',
    message: 'Only GET and POST methods are supported'
  });
};

// This exports the webhook handler for Vercel to use
export default webhookHandler;
