require('dotenv').config();

module.exports = {
    gitlabUrl: process.env.GITLAB_URL || 'http://gitlab.com',
    gitlabToken: process.env.GITLAB_TOKEN,
    gitlabProjectId: process.env.GITLAB_PROJECT_ID || 1
};