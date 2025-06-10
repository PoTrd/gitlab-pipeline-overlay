export class pipelinesState {
    constructor() {
        this.pipelines = [];
        this.container = null;
    }

    init(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with ID ${containerId} not found.`);
        }
    }

    setPipelines(newPipelines) {
        this.pipelines = newPipelines;
        this.render();
    }

    removePipeline(id) {
        this.pipelines = this.pipelines.filter(p => p.id !== id);
        this.render();
    }
}