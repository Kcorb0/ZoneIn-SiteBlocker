document.addEventListener('DOMContentLoaded', function () {


    // Button actions
    document.getElementById('activate').addEventListener('click', () => {
        let active = true;
        chrome.storage.sync.set({ active });
        document.getElementById('de-activate').classList.add("active");
        document.getElementById('activate').classList.remove("active");
    });

    document.getElementById('de-activate').addEventListener('click', () => {
        let active = false;
        chrome.storage.sync.set({ active });
        document.getElementById('activate').classList.add("active");
        document.getElementById('de-activate').classList.remove("active");
    });

    // Refresh Button, refresh page on click
    document.getElementById('refresh').addEventListener('click', () => {
        refreshPage()
    });

    document.getElementById('add-site').addEventListener('click', () => {
        chrome.storage.sync.get("blockedSites", (sitesData) => {
            let newSite = document.getElementById('site-inp').value;
            let blockedSites = sitesData.blockedSites;

            document.getElementById('site-inp').value = "";
            blockedSites.push(newSite.toLowerCase());
            chrome.storage.sync.set({ "blockedSites": blockedSites });
        });
    });

    // Donate Button, navigates to open collective
    document.getElementById('donate').addEventListener('click', () => {
        directToSite('https://opencollective.com/');
    });

    // Suggestion Button, navigates to GitHub repo
    document.getElementById('suggestions').addEventListener('click', () => {
        directToSite('https://github.com/Kcorb0/ZoneIn-SiteBlocker');
    });

    // On popup open
    createSiteList();
    activeButtonState();

});

async function createSiteList() {
    chrome.storage.sync.get('blockedSites', (data) => {
        let sites = data.blockedSites;

        sites.forEach((site, idx) => {
            let para = document.createElement("p");
            let textNode = document.createTextNode(`${(idx + 1)}. ${site}`);
            let delButton = document.createElement("button");

            delButton.innerHTML = "X";
            delButton.setAttribute("id", `site-btn${idx + 1}`)

            para.appendChild(textNode);
            para.appendChild(delButton);
            para.setAttribute("id", `site${idx + 1}`)

            element = document.getElementById('sites-cont');
            element.appendChild(para);


        });
    });
}


function refreshPage() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.update(undefined, { url: tabs[0].url });
    });
}

function directToSite(siteUrl) {
    window.open(siteUrl, '_blank');
}

function activeButtonState() {
    chrome.storage.sync.get("active", (status) => {

        if (status.active == true) {
            document.getElementById('de-activate').classList.add("active");
            document.getElementById('activate').classList.remove("active");
        } else {
            document.getElementById('activate').classList.add("active");
            document.getElementById('de-activate').classList.remove("active");
        }
    });
}

function removeSite(listNum) {
    chrome.storage.sync.get("blockedSites", (sitesData) => {
        let blockedSites = sitesData.blockedSites;
        blockedSites.splice(Number(listNum) + 1, 1);
        chrome.storage.sync.set({ "blockedSites": blockedSites });
    });
}