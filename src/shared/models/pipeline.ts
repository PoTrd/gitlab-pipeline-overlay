export class Pipeline {
    id: number;
    iid: number;
    project_id: number;
    sha: string;
    ref: string;
    status: string;
    source: string;
    created_at: string;
    updated_at: string;
    web_url: string;

    constructor(
        id: number,
        iid: number,
        project_id: number,
        sha: string,
        ref: string,
        status: string,
        source: string,
        created_at: string,
        updated_at: string,
        web_url: string
    ) {
        this.id = id;
        this.iid = iid;
        this.project_id = project_id;
        this.sha = sha;
        this.ref = ref;
        this.status = status;
        this.source = source;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.web_url = web_url;
    }

    static fromJSON(data: any): Pipeline {
        return new Pipeline(
            data.id,
            data.iid,
            data.project_id,
            data.sha,
            data.ref,
            data.status,
            data.source,
            data.created_at,
            data.updated_at,
            data.web_url
        );
    }
}