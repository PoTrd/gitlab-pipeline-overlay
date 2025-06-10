import { Pipeline } from "../models/pipeline";

export interface PipelineState {
    lstPipelines: Pipeline[];
    container: HTMLElement;
    setPipelines(pipelines: Pipeline[]): void;
    removePipeline(id: number): void;
}

export class PipelineStateManager implements PipelineState {
    lstPipelines: Pipeline[] = [];
    container!: HTMLElement;
    init(containerId: string): void {
        this.container = document.getElementById(containerId)!;
        if(!this.container) {
            throw new Error("Container element is not defined");
        }
        this.container.innerHTML = 'Loading pipelines...';
        this.lstPipelines = [];
    }

    setPipelines(pipelines: Pipeline[]): void {
        this.lstPipelines = pipelines;
    }

    removePipeline(id: number): void {
        this.lstPipelines = this.lstPipelines.filter(pipeline => pipeline.id !== id);
    }
}