import { fetchRunningPipelines } from './services/pipeline.service.js';
import { PipelineState } from './state/pipelineState.js';
import { Logger } from './services/logging.service.js';

const container = document.getElementById('container');
const state = new PipelineState();

function renderPipelines(pipelines, container) {
    if (!container) return;

    container.innerHTML = pipelines.length === 0
    ? '<div>Aucun pipeline en cours.</div>'
    : pipelines.map(p => `
        <div class="pipeline">
            <a href="${p.web_url}" target="_blank">
                #${p.ref} -- ${p.status}
            </a>
            <button class="delete-btn" data-id="${p.id}">X</button>
        </div>
        `).join('');

    container.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = btn.getAttribute('data-id');
            state.removePipeline(Number(id));
            renderPipelines(state.getPipelines(), container);
        });
    });
}

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
            p.status = 'missing';
        }
    });

    return merged;
}

async function main() {
    try {
        const data = await fetchRunningPipelines();
        Logger.info('Pipelines fetched:', data.length);
        const existing = state.getPipelines();
        const merged = mergePipeline(existing, data);
        state.setPipelines(merged);
        renderPipelines(merged, container);
    } catch (e) {
        Logger.error('Fetch error:', e.message);
        container.innerHTML = `<div style="color:red;">Erreur: ${e.message}</div>`;
    }

    setTimeout(main, 10000);
}

window.onload = () => {
    main();
};