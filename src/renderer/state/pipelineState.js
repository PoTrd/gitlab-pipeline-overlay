// src/renderer/state/pipelineState.js

export class PipelineState {
    #pipelines = [];
    #subscribers = [];

    get pipelines() {
        return this.#pipelines;
    }

    subscribe(fn) {
        this.#subscribers.push(fn);
    }

    setPipelines(newPipelines) {
        this.#pipelines = newPipelines;
        this.#notify();
    }

    addPipelines(newOnes) {
        const unique = newOnes.filter(newPipe =>
        !this.#pipelines.some(p => p.id === newPipe.id)
        );

    this.#pipelines = [...this.#pipelines, ...unique].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    this.#notify();
    }

    removePipeline(id) {
        this.#pipelines = this.#pipelines.filter(p => p.id !== id);
        this.#notify();
    }

    #notify() {
        this.#subscribers.forEach(fn => fn(this.#pipelines));
    }
}

// class pipelinesState {
//     constructor() {
//         this.pipelines = [];
//     }

//     setPipelines(newPipelines) {
//         this.pipelines = newPipelines;
//     }

//     removePipeline(id) {
//         this.pipelines = this.pipelines.filter(p => p.id !== id);
//     }
// }

// module.exports = { pipelinesState };