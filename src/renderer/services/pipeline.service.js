import { Logger } from './logging.service.js';
import { PipelineState } from '../state/pipelineState.js';

const state = new PipelineState();

// Fusionne les pipelines et met à jour ceux disparus du fetch (ex: terminés)
export async function mergePipeline(existingLst, incomingLst) {
    const existingIds = new Set(existingLst.map(p => p.id));
    const incomingIds = new Set(incomingLst.map(p => p.id));
    const merged = [...incomingLst];

    // Pipelines qui étaient dans l'existant mais plus dans le fetch (probablement terminés)
    const missingIds = existingLst.filter(p => !incomingIds.has(p.id)).map(p => p.id);

    // On fetch leur statut à jour
    const updatedPipelines = await Promise.all(
        missingIds.map(async id => {
            try {
                return await fetchPipeline(id);
            } catch (e) {
                Logger.warn(`Impossible de mettre à jour le pipeline ${id}: ${e.message}`);
                // On garde l'ancien pipeline si erreur
                return existingLst.find(p => p.id === id);
            }
        })
    );

    // On ajoute les pipelines mis à jour à la liste fusionnée
    merged.push(...updatedPipelines);
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
    const merged = await mergePipeline(existing, data);
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
