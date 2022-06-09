document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('activate').addEventListener('click', () => {
        let active = true;
        chrome.storage.sync.set({ active });
        console.log('activated')
    });

    document.getElementById('de-activate').addEventListener('click', () => {
        let active = false;
        chrome.storage.sync.set({ active });
        console.log('deactivated')
    });

    document.getElementById('refresh').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.update(undefined, { url: tabs[0].url });
        });
    });
});