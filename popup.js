function activeBlocker() {

    let active = true;

    chrome.storage.sync.set({ active })
}

// Every second, run activeBlocker

document.addEventListener('DOMContentLoaded', function () {

    document.querySelector('#activate').addEventListener('click', activeBlocker);

});