document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#submit').addEventListener('click', async () => {
    const config = {
      url: document.querySelector('#url').value,
      token: document.querySelector('#token').value,
      projectId: document.querySelector('#projectId').value,
    };
    await window.api.saveConfig(config);
    location.reload();
  });
});