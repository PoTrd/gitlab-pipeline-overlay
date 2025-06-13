import { fetchRunningPipelines } from './services/pipeline.service.js';
import { PipelineState } from './state/pipelineState.js';

const container = document.getElementById('container');
const state = new PipelineState();

state.subscribe(pipelines => renderPipelines(pipelines, container, handleDelete));

function renderPipelines(pipelines, container, onDelete) {
    if (!container) return;

    container.innerHTML = pipelines.length === 0
    ? '<div>Aucun pipeline en cours.</div>'
    : pipelines.map(p => `
        <div class="pipeline">
            <a href="${p.web_url}" target="_blank">
                #${p.id} - ${p.ref}
            </a>
            <button class="delete-btn" data-id="${p.id}">X</button>
        </div>
        `).join('');

    container.querySelectorAll('.delete-btn').forEach(button => {
        const id = Number(button.getAttribute('data-id'));
        button.addEventListener('click', () => onDelete(id));
    });
}

async function poll() {
    try {
        const incoming = await fetchRunningPipelines();
        const existing = state.pipelines;
        const merged = [...existing];
        const existingIds = new Set(existing.map(p => p.id));
        incoming.forEach(p => {
            if (!existingIds.has(p.id)) {
                merged.push(p);
            }
        });
        state.setPipelines(merged);
    } catch (e) {
        console.error('Fetch error:', e.message);
        container.innerHTML = `<div style="color:red;">Erreur: ${e.message}</div>`;
    }

    setTimeout(poll, 10000);
}

function handleDelete(id) {
    state.removePipeline(id);
}

window.onload = () => {
    poll();
};