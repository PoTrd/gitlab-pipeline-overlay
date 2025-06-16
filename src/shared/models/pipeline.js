class Pipeline {
    constructor(
    id,
    iid,
    project_id,
    sha,
    ref,
    status,
    source,
    created_at,
    updated_at,
    web_url,
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

    static fromApiResponse(data) {
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

module.exports = { Pipeline };