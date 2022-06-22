document.addEventListener('DOMContentLoaded', function () {


    // Button actions
    document.getElementById('activate').addEventListener('click', () => {
        let active = true;
        chrome.storage.local.set({ active });
        document.getElementById('de-activate').classList.add("active");
        document.getElementById('activate').classList.remove("active");
    });

    document.getElementById('de-activate').addEventListener('click', () => {
        let active = false;
        chrome.storage.local.set({ active });
        document.getElementById('activate').classList.add("active");
        document.getElementById('de-activate').classList.remove("active");
    });

    // Refresh Button, refresh page on click
    document.getElementById('refresh').addEventListener('click', () => {
        refreshPage()
    });

    // Adds a new site to the sites list element
    document.getElementById('add-site').addEventListener('click', () => {
        chrome.storage.local.get("blockedSites", (sitesData) => {
            let newSite = document.getElementById('site-inp').value;
            let blockedSites = sitesData.blockedSites;

            if (newSite !== "") {
                document.getElementById('site-inp').value = "";
                blockedSites.push(newSite.toLowerCase());
                chrome.storage.local.set({ "blockedSites": blockedSites });
            }
            refreshSitesList();
            createSiteList();
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
    chrome.storage.local.get('blockedSites', (data) => {
        let sites = data.blockedSites;

        sites.forEach(async (site, idx) => {

            // <div><P>1. examplesite.com<p/><button>X<button/><div/>

            let siteDiv = document.createElement("div");
            let sitePara = document.createElement("p");
            let textNode = document.createTextNode(`${site}`);
            let delButton = document.createElement("button");

            sitePara.appendChild(textNode);
            delButton.innerHTML = "X";

            sitePara.classList.add("site-name-txt");
            delButton.classList.add("del-site-btn");
            //delButton.setAttribute("id", `del-btn-${idx}`);

            siteDiv.append(sitePara);
            siteDiv.append(delButton);

            container = document.getElementById("site-items");
            container.appendChild(siteDiv);

            await delButton.addEventListener('click', () => {
                chrome.storage.local.get("blockedSites", (sitesData) => {
                    let blockedSites = sitesData.blockedSites;
                    blockedSites.splice(idx, 1);
                    chrome.storage.local.set({ "blockedSites": blockedSites });
                });
                siteDiv.remove();
            });
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
    chrome.storage.local.get("active", (status) => {

        if (status.active == true) {
            document.getElementById('de-activate').classList.add("active");
            document.getElementById('activate').classList.remove("active");
        } else {
            document.getElementById('activate').classList.add("active");
            document.getElementById('de-activate').classList.remove("active");
        }
    });
}

function removeSite(idx) {
    chrome.storage.local.get("blockedSites", (sitesData) => {
        let blockedSites = sitesData.blockedSites;
        blockedSites.splice(idx, 1);
        chrome.storage.local.set({ "blockedSites": blockedSites });
    });
}

function refreshSitesList() {
    let sitesList = document.getElementById("site-items");
    sitesList.innerHTML = "";
}