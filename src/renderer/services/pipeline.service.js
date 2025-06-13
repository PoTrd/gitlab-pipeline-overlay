import { Logger } from './logging.service.js';
import { PipelineState } from '../state/pipelineState.js';

const state = new PipelineState();

function mergePipeline(existingLst, incomingLst) {
    const existingIds = new Set(existingLst.map(p => p.id));
    const incomingIds = new Set(incomingLst.map(p => p.id));
    const missingPipelines = existingLst.filter(p => !incomingIds.has(p.id));
    const merged = [...existingLst];

    incomingLst.forEach(p => {
        if (existingIds.has(p.id)) {
            const index = merged.findIndex(existing => existing.id === p.id);
            if (index !== -1) {
                merged[index] = p;
                return;
            }
        }
        merged.push(p);
    });

    const missingPipelinesIds = new Set(missingPipelines.map(p => p.id));
    merged.forEach(p => {
        if(missingPipelinesIds.has(p.id)) {
            const updatedPipeline = fetchPipeline(p.id);
            if (updatedPipeline) {
                const index = merged.findIndex(existing => existing.id === p.id);
                if (index !== -1) {
                    merged[index] = updatedPipeline;
                }
            }
        }
    });

    return merged;
}

export async function fetchAndStorePipelines() {
    let data;
    if (window.env && window.env.USE_MOCK === 'true') {
        data = await fetch('./services/mock-pipelines.json').then(r => r.json());
    } else {
        const res = await fetch(`${window.env.GITLAB_URL}/api/v4/projects/${window.env.GITLAB_PROJECT_ID}/pipelines?status=running`, {
            headers: { 'PRIVATE-TOKEN': window.env.GITLAB_TOKEN },
        });
        if (!res.ok) {
            throw new Error(`Erreur API GitLab: ${res.status}`);
        }
        data = await res.json();
    }
    Logger.info('Pipelines fetched:', data.length);
    const existing = state.getPipelines();
    const merged = mergePipeline(existing, data);
    state.setPipelines(merged);
    return merged;
}

export async function fetchPipeline(id) {
    const res = await fetch(`${window.env.GITLAB_URL}/api/v4/projects/${window.env.GITLAB_PROJECT_ID}/pipelines/${id}`, {
        headers: { 'PRIVATE-TOKEN': window.env.GITLAB_TOKEN },
    });
    if (!res.ok) {
        throw new Error(`Erreur API GitLab: ${res.status}`);
    }
    return await res.json();
}

export function getStoredPipelines() {
    return state.getPipelines();
}

export function removePipeline(id) {
    state.removePipeline(id);
    return state.getPipelines();
}
