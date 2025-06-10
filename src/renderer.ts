import { Pipeline } from "./shared/models/pipeline";
import { PipelineStateManager } from "./shared/state/pipelineState";

const { gitlabUrl, gitlabToken, gitlabProjectId } = require('../lib/config');

const pipelinesState = new PipelineStateManager();

// Fetch pipelines from GitLab API
async function fetchPipelines() {
    try {
        const res = await fetch(`${gitlabUrl}/api/v4/projects/${gitlabProjectId}/pipelines?status=running`, {
            headers: { 'PRIVATE-TOKEN': gitlabToken }
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        // Mock data for demonstration
        const data = [
            {
                id: 29528,
                iid: 7915,
                project_id: 70,
                sha: "6fb92fb5059b3fa77dc6cd33df6689f6ee7ed38b",
                ref: "Correction_IHM_RC3.0.0",
                status: "running",
                source: "push",
                created_at: "2025-06-10T11:38:48.038Z",
                updated_at: "2025-06-10T11:38:50.771Z",
                web_url: "http://192.168.249.38/web/myScore/-/pipelines/29528",
            },
            {
                id: 29527,
                iid: 7914,
                project_id: 70,
                sha: "e1cd920cc3b86d40c2f2d5559174db78462440a0",
                ref: "RC2.4.6",
                status: "running",
                source: "push",
                created_at: "2025-06-10T11:35:41.741Z",
                updated_at: "2025-06-10T11:35:43.519Z",
                web_url: "http://192.168.249.38/web/myScore/-/pipelines/29527",
            }
        ];

        const pipelines = data.map(pipelineData => Pipeline.fromJSON(pipelineData));
        updatePipelineState(pipelines);
        renderPipelines();
    } catch (error) {
        console.error(`Error fetching pipelines: ${error}`);
        if (pipelinesState.container) {
            pipelinesState.container.textContent = `Error: ${error}`;
        }
    }

    setTimeout(fetchPipelines, 10000);
}

// Update the state with new pipeline data
function updatePipelineState(lstOfNewPipelines: Pipeline[]) {
    const uniquePipelines = lstOfNewPipelines.filter(pipeline =>
        !pipelinesState.lstPipelines.some(existingPipeline => existingPipeline.id === pipeline.id)
    );

    const combinedPipelines = [...pipelinesState.lstPipelines, ...uniquePipelines];
    combinedPipelines.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    pipelinesState.setPipelines(combinedPipelines);
}

// Render pipelines to the DOM
function renderPipelines() {
    if (!pipelinesState.container) return;

    if (pipelinesState.lstPipelines.length === 0) {
        pipelinesState.container.innerHTML = 'No running pipelines found.';
        return;
    }

    pipelinesState.container.innerHTML = pipelinesState.lstPipelines.map(pipeline =>
        createPipelineElement(pipeline)
    ).join('');

    attachDeleteEventListeners();
}

// Create HTML for a single pipeline
function createPipelineElement(pipeline: Pipeline) {
    return `
        <div class="pipeline">
            <a href="${pipeline.web_url}" target="_blank">
                Pipeline ${pipeline.id} (${pipeline.ref})
            </a>
            <button class="delete-btn" data-id="${pipeline.id}">X</button>
        </div>
    `;
}

// Attach event listeners to delete buttons
function attachDeleteEventListeners() {
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            const target = event.currentTarget as HTMLButtonElement;
            const id = Number(target.getAttribute('data-id'));
            pipelinesState.removePipeline(id);
            renderPipelines();
        });
    });
}

// Add debugging logs to verify initialization and rendering
console.log('Initializing application...');

// Initialize the application
function init() {
    console.log('Application initialized');
    pipelinesState.init('container');
    console.log('Pipeline state initialized');
    fetchPipelines();
}

// Start the application
window.onload = init;
