// Configuration
const { gitlabUrl, gitlabToken, gitlabProjectId } = require('../lib/config');

// State management
const pipelinesState = {
    pipelines: [],
    container: null,
    init(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Container element not found');
        }
    },
    setPipelines(pipelines) {
        this.pipelines = pipelines;
    },
    removePipeline(id) {
        this.pipelines = this.pipelines.filter(pipeline => pipeline.id !== id);
    }
};

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
                "id": 29528,
                "iid": 7915,
                "project_id": 70,
                "sha": "6fb92fb5059b3fa77dc6cd33df6689f6ee7ed38b",
                "ref": "Correction_IHM_RC3.0.0",
                "status": "running",
                "source": "push",
                "created_at": "2025-06-10T11:38:48.038Z",
                "updated_at": "2025-06-10T11:38:50.771Z",
                "web_url": "http://192.168.249.38/web/myScore/-/pipelines/29528",
                "name": null
            },
            {
                "id": 29527,
                "iid": 7914,
                "project_id": 70,
                "sha": "e1cd920cc3b86d40c2f2d5559174db78462440a0",
                "ref": "RC2.4.6",
                "status": "running",
                "source": "push",
                "created_at": "2025-06-10T11:35:41.741Z",
                "updated_at": "2025-06-10T11:35:43.519Z",
                "web_url": "http://192.168.249.38/web/myScore/-/pipelines/29527",
                "name": null
            }
        ];

        updatePipelineState(data);
        renderPipelines();
    } catch (err) {
        console.error(`Error fetching pipelines: ${err.message}`);
        if (pipelinesState.container) {
            pipelinesState.container.innerText = `Error: ${err.message}`;
        }
    }

    setTimeout(fetchPipelines, 10000);
}

// Update the state with new pipeline data
function updatePipelineState(newPipelines) {
    const uniquePipelines = newPipelines.filter(newPipeline =>
        !pipelinesState.pipelines.some(existingPipeline => existingPipeline.id === newPipeline.id)
    );

    const combinedPipelines = [...pipelinesState.pipelines, ...uniquePipelines];
    combinedPipelines.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    pipelinesState.setPipelines(combinedPipelines);
}

// Render pipelines to the DOM
function renderPipelines() {
    if (!pipelinesState.container) return;

    if (pipelinesState.pipelines.length === 0) {
        pipelinesState.container.innerHTML = 'No running pipelines found.';
        return;
    }

    pipelinesState.container.innerHTML = pipelinesState.pipelines.map(pipeline =>
        createPipelineElement(pipeline)
    ).join('');

    attachDeleteEventListeners();
}

// Create HTML for a single pipeline
function createPipelineElement(pipeline) {
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
        button.addEventListener('click', function() {
            const id = Number(this.getAttribute('data-id'));
            pipelinesState.removePipeline(id);
            renderPipelines();
        });
    });
}

// Initialize the application
function init() {
    pipelinesState.init('container');
    fetchPipelines();
}

// Start the application
window.onload = init;
