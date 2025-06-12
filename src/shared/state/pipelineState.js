class pipelinesState {
    constructor() {
        this.pipelines = [];
    }

    setPipelines(newPipelines) {
        this.pipelines = newPipelines;
    }

    removePipeline(id) {
        this.pipelines = this.pipelines.filter(p => p.id !== id);
    }
}

module.exports = { pipelinesState };