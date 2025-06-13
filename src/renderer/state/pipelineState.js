export class PipelineState {
    #pipelines = [];

    getPipelines() {
        return this.#pipelines;
    }

    setPipelines(pipelinesArray) {
        this.#pipelines = pipelinesArray;
    }

    removePipeline(id) {
        this.#pipelines = this.#pipelines.filter(p => p.id !== id);
    }
}