const { Pipeline } = require('../models/pipeline');
require('dotenv').config();

async function fetchJsonData({ url, token, endpoint }) {
    const res = await fetch(`${url}/api/v4/${endpoint}`, {
        headers: { 'PRIVATE-TOKEN': token },
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch ${endpoint}: ${res.status} ${res.statusText} - ${errorText}`);
    }
    return res.json();
}

async function fetchPipelines({ url, token, projectId }) {
    const data = await fetchJsonData({ url, token, endpoint: `projects/${projectId}/pipelines` });
    if (!Array.isArray(data)) {
        throw new Error('Unexpected response format: expected an array of pipelines');
    }
    return data.map(Pipeline.fromApiResponse);
}

async function fetchRunningPipelines({ url, token, projectId }) {
    if(process.env.NODE_ENV === 'development' && process.env.MOCK_DATA === 'true') {
        const data = require("../models/mock-pipelines.json");
        return data.map(Pipeline.fromApiResponse);
    }
    const data = await fetchJsonData({ url, token, endpoint: `projects/${projectId}/pipelines?status=running` });
    if (!Array.isArray(data)) {
        throw new Error('Unexpected response format: expected an array of pipelines');
    }
    return data.map(Pipeline.fromApiResponse);
}

async function fetchPipeline({ url, token, projectId }, pipelineId) {
    const data = await fetchJsonData({ url, token, endpoint: `projects/${projectId}/pipelines/${pipelineId}` });
    return Pipeline.fromApiResponse(data);
}

module.exports = { fetchPipelines, fetchRunningPipelines, fetchPipeline };
