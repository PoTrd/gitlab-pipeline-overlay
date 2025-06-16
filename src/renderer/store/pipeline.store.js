// class PipelineStore {
//     constructor() {
//         this.pipelines = [];
//     }
//
//     setPipelines(pipelines) {
//         this.pipelines = pipelines;
//         this.emit('updated', this.pipelines);
//     }
//
//     getPipelines() {
//         return this.pipelines;
//     }
//
//     removePipelineById(id) {
//         this.pipelines = this.pipelines.filter(p => p.id !== id);
//         this.emit('updated', this.pipelines);
//         return this.pipelines;
//     }
//
//     onUpdate(callback) {
//         this.on('updated', callback);
//     }
//
// }
//
// const pipelineStore = new PipelineStore();
// export default pipelineStore;

class PipelineStore {
    #pipelines;
    
    constructor() {
        console.debug('PipelineStore initialized');
        this.#pipelines = [];
    }

    getPipelines() {
        return this.#pipelines;
    }

    setPipelines(pipelinesArray) {
        console.debug('Setting pipelines:', pipelinesArray);
        this.#pipelines = pipelinesArray;
        console.log('Pipelines set to', pipelinesArray);
    }

    removePipeline(id) {
        this.#pipelines = this.#pipelines.filter(p => p.id !== id);
    }
}

module.exports = { PipelineStore };