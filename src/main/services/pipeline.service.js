const fetch = require('node-fetch');

async function fetchPipelines({ url, token, projectId }) {
    const res = await fetch(`${url}/api/v4/projects/${projectId}/pipelines`, {
    headers: { 'PRIVATE-TOKEN': token },
    });
    return res.ok ? await res.json() : [];
}

module.exports = { fetchPipelines };