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

    document.getElementById('add-site').addEventListener('click', () => {
        chrome.storage.local.get("blockedSites", (sitesData) => {
            let newSite = document.getElementById('site-inp').value;
            let blockedSites = sitesData.blockedSites;

            document.getElementById('site-inp').value = "";
            blockedSites.push(newSite.toLowerCase());
            chrome.storage.local.set({ "blockedSites": blockedSites });
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

function createSiteList() {
    chrome.storage.local.get('blockedSites', (data) => {
        let sites = data.blockedSites;

        sites.forEach((site, idx) => {

            // <div><P>1. examplesite.com<p/><button>X<button/><div/>

            let siteDiv = document.createElement("div");
            let sitePara = document.createElement("p");
            let textNode = document.createTextNode(`${(idx + 1)}. ${site}`);
            let delButton = document.createElement("button");

            sitePara.appendChild(textNode);
            delButton.innerHTML = "X";

            sitePara.classList.add("site-name-txt");
            delButton.classList.add("del-site-btn");

            delButton.setAttribute("id", `del-btn-${idx}`);

            siteDiv.append(sitePara);
            siteDiv.append(delButton);

            container = document.getElementById('sites-cont');
            container.appendChild(siteDiv);

            document.getElementById(`del-btn-${idx}`).addEventListener('click', (idx) => {
                chrome.storage.local.get("blockedSites", (sitesData) => {
                    let blockedSites = sitesData.blockedSites;

                    // Figure out how to get idx to delete at index
                    blockedSites.splice(idx, 1);
                    alert(idx)
                    chrome.storage.local.set({ "blockedSites": blockedSites });
                });
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

function removeSite(listNum) {
    chrome.storage.local.get("blockedSites", (sitesData) => {
        let blockedSites = sitesData.blockedSites;
        blockedSites.splice(listNum, 1);
        chrome.storage.local.set({ "blockedSites": blockedSites });
    });
}

function alertTest() {
    alert('button was clicked');
}