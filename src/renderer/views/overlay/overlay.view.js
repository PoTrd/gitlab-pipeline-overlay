// const { PipelineStore } = require('../../store/pipeline.store');
// TODO: Expose PipelineStore via preload and use: const { PipelineStore } = window.PipelineStore;
const { PipelineStore } = window.PipelineStore || {};

const container = document.getElementById('container');
const store = new PipelineStore();

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
            removePipeline(Number(id));
        });
    });
}

function removePipeline(pipelineId) {
    store.removePipeline(pipelineId);
}

async function main() {
    try {
        const lstPipelines = await window.api_pipelines.fetchRunningPipelines();
        await store.setPipelines(lstPipelines);
        renderPipelines(store.getPipelines(), container);
    } catch (e) {
        window.api_debug.error('Fetch error:', e.message);
        container.innerHTML = `<div style="color:red;">Erreur: ${e.message}</div>`;
    }

    setTimeout(main, 10000);
}

window.onload = () => {
    main()
};