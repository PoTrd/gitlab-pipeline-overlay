const { gitlabUrl, gitlabToken, gitlabProjectId } = require('../lib/config');

async function fetchPipelines() {
    try {
    const res = await fetch(`${gitlabUrl}/api/v4/projects/${gitlabProjectId}/pipelines?status=running`, {
        headers: { 'PRIVATE-TOKEN': gitlabToken }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const container = document.getElementById('pipelines');
    container.innerHTML = data.length
        ? data.map(p => `<div><a href="${p.web_url}" target="_blank">Pipeline ${p.id} (${p.ref})</a></div>`).join('')
        : 'No running pipelines found.';
    } catch (err) {
        document.getElementById('pipelines').innerText = `Error : ${err.message}`;
    }

    setTimeout(fetchPipelines, 10000);
}

window.onload = fetchPipelines;
