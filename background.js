chrome.runtime.onInstalled.addListener(() => {

    let active = false;
    let blockedSites = ["twitter.com"]

    chrome.storage.local.set({ active });
    chrome.storage.local.set({ blockedSites });

    console.log(`Extension status: ${active}`);
});

chrome.tabs.onUpdated.addListener(() => {
    chrome.storage.local.get("active", (data) => {

        let status = data.active;
        let redirectUrl = 'https://www.google.co.uk';

        console.log(`Status ${status}`)

        if (status === true) {
            chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
                let currentUrl = tabs[0].url;

                chrome.storage.local.get("blockedSites", (sitesData) => {

                    let sites = sitesData.blockedSites

                    console.log(sites)

                    sites.forEach((site) => {
                        if (currentUrl.includes(site)) {
                            console.log(site)
                            chrome.tabs.update(undefined, { url: redirectUrl });
                        }
                    });
                });
            });
        }
    });
});