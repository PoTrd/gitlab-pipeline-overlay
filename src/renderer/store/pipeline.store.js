import { EventEmitter } from 'events';

class PipelineStore extends EventEmitter {
    constructor() {
        super();
        this.pipelines = [];
    }

    setPipelines(pipelines) {
        this.pipelines = pipelines;
        this.emit('updated', this.pipelines);
    }

    getPipelines() {
        return this.pipelines;
    }

    onUpdate(callback) {
        this.on('updated', callback);
    }

    offUpdate(callback) {
        this.off('updated', callback);
    }
}

const pipelineStore = new PipelineStore();
export default pipelineStore;
