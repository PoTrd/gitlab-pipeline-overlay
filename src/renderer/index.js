import { fetchAndStorePipelines, getStoredPipelines, removePipeline } from './services/pipeline.service.js';
import { Logger } from './services/logging.service.js';

const container = document.getElementById('container');

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
            const updated = removePipeline(Number(id));
            renderPipelines(updated, container);
        });
    });
}

async function main() {
    try {
        const merged = await fetchAndStorePipelines();
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