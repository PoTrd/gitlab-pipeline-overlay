export async function fetchRunningPipelines() {
    if (window.env && window.env.USE_MOCK === 'true') {
        const data = await fetch('./services/mock-pipelines.json').then(r => r.json());
        return data;
    }

    const res = await fetch(`${window.env.GITLAB_URL}/api/v4/projects/${window.env.GITLAB_PROJECT_ID}/pipelines?status=running`, {
        headers: { 'PRIVATE-TOKEN': window.env.GITLAB_TOKEN },
    });

    if (!res.ok) {
        throw new Error(`Erreur API GitLab: ${res.status}`);
    }

    return res.json();
}
