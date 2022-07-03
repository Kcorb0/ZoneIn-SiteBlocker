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
        chrome.storage.local.get(["blockedSites", "hardBlockedSites"], (sitesData) => {
            let newSite = document.getElementById('site-inp').value;
            let blockedSites = sitesData.blockedSites;
            let hardBlockedSites = sitesData.hardBlockedSites;


            if (newSite.slice(0, 2) === "p/") {
                document.getElementById('site-inp').value = "";
                hardBlockedSites.push(newSite.slice(2).toLowerCase());
                chrome.storage.local.set({ "hardBlockedSites": hardBlockedSites })

            } else if (newSite !== "") {
                document.getElementById('site-inp').value = "";
                blockedSites.push(newSite.toLowerCase());
                chrome.storage.local.set({ "blockedSites": blockedSites });
            }
            refreshSitesList();
            createSiteList();
            hCreateSiteList();
        });
    });

    document.getElementById('tab-soft-block').addEventListener('click', () => {
        document.getElementById('tab-soft-block').classList.add("tab-btn-active");
        document.getElementById('tab-hard-block').classList.remove("tab-btn-active");
        document.getElementById('site-items-perm').classList.add("site-items-inactive");
        document.getElementById('site-items').classList.remove("site-items-inactive");
    });

    document.getElementById('tab-hard-block').addEventListener('click', () => {
        document.getElementById('tab-hard-block').classList.add("tab-btn-active");
        document.getElementById('tab-soft-block').classList.remove("tab-btn-active");
        document.getElementById('site-items').classList.add("site-items-inactive");
        document.getElementById('site-items-perm').classList.remove("site-items-inactive");
    });

    // Donate Button, navigates to open collective
    document.getElementById('donate').addEventListener('click', () => {
        directToSite('https://www.patreon.com/techmage?fan_landing=true');
    });

    // Suggestion Button, navigates to GitHub repo
    document.getElementById('suggestions').addEventListener('click', () => {
        directToSite('https://github.com/Kcorb0/ZoneIn-SiteBlocker');
    });

    document.getElementById('settings').addEventListener('click', () => {
        let url = "./settings.html";
        window.open(url, 'popUpWindow', 'height=100,width=300,right=500,top=500,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes');
    });

    // On popup open
    createSiteList();
    hCreateSiteList()
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
                siteDiv.remove()
            });
        });
    });
}

// Dont use, testing only
async function hCreateSiteList() {
    chrome.storage.local.get('hardBlockedSites', (data) => {
        let sites = data.hardBlockedSites;

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

            container = document.getElementById("site-items-perm");
            container.appendChild(siteDiv);

            await delButton.addEventListener('click', () => {
                chrome.storage.local.get('hardBlockedSites', (sitesData) => {
                    let blockedSites = sitesData.hardBlockedSites;
                    blockedSites.splice(idx, 1);
                    chrome.storage.local.set({ 'hardBlockedSites': blockedSites });
                });
                siteDiv.remove()
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

function refreshSitesList() {
    let sitesList = document.getElementById("site-items");
    let sitesListPerm = document.getElementById("site-items-perm");
    sitesList.innerHTML = "";
    sitesListPerm.innerHTML = "";
}