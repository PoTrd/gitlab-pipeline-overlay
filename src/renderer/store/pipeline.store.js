// PipelineStore class definition
class PipelineStore {
    constructor() {
        this.pipelines = [];
    }

    getPipelines() {
        return this.pipelines;
    }

    getPipelinebyId(id) {
        return this.pipelines.find(p => p.id === id);
    }

    setPipelines(pipelinesArray) {
        this.pipelines = Array.isArray(pipelinesArray) ? pipelinesArray : [];
        return this.pipelines;
    }

    removePipeline(id) {
        this.pipelines = this.pipelines.filter(p => p.id !== id);
        return this.pipelines;
    }
}

// Singleton instance for the pipeline store
const pipelineStore = new PipelineStore();

module.exports = pipelineStore;