document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('activate').addEventListener('click', () => {
        let active = true;
        chrome.storage.sync.set({ active });

        document.getElementById('activate').classList.add("active");
        document.getElementById('de-activate').classList.remove("active");
    });

    document.getElementById('de-activate').addEventListener('click', () => {
        let active = false;
        chrome.storage.sync.set({ active });

        document.getElementById('de-activate').classList.add("active");
        document.getElementById('activate').classList.remove("active");
    });

    document.getElementById('refresh').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.update(undefined, { url: tabs[0].url });
        });




        //createSiteList();




    });

    document.getElementById('add-site').addEventListener('click', () => {
        chrome.storage.sync.get("blockedSites", (sitesData) => {
            let newSite = document.getElementById('site-inp').value;
            let blockedSites = sitesData.blockedSites;

            document.getElementById('site-inp').value = "";
            chrome.storage.sync.set({ "blockedSites": blockedSites.push(newSite) });

        });

    });

    document.getElementById('donate').addEventListener('click', () => {
        window.open('https://opencollective.com/', '_blank')
    });

    document.getElementById('suggestions').addEventListener('click', () => {
        window.open('https://github.com/Kcorb0/', '_blank')
    });

});

async function createSiteList() {
    chrome.storage.sync.get('blockedSites', (data) => {
        let sites = data.blockedSites;

        sites.forEach((site, idx) => {
            let para = document.createElement("p");
            let node = document.createTextNode(`${(idx + 1)}. ${site}`);

            para.appendChild(node);

            element = document.getElementById('sites-cont');

            element.appendChild(para);

        });
    });
}