chrome.runtime.onInstalled.addListener(() => {

    let active = false;
    let blockedSites = ["facebook.com"];
    let hardBlockedSites = ["just-eat.co.uk", "grosvenorcasinos.com"]

    chrome.storage.local.set({ active });
    chrome.storage.local.set({ blockedSites });
    chrome.storage.local.set({ hardBlockedSites })

    console.log(`                                                   
                                                        
    _/_/_/_/_/    _/_/    _/      _/  _/_/_/_/  _/  _/      _/   
         _/    _/    _/  _/_/    _/  _/            _/_/    _/    
      _/      _/    _/  _/  _/  _/  _/_/_/    _/  _/  _/  _/     
   _/        _/    _/  _/    _/_/  _/        _/  _/    _/_/      
_/_/_/_/_/    _/_/    _/      _/  _/_/_/_/  _/  _/      _/                                            

                    Welcome to ZoneIn!
`);

    console.log(`Extension status: ${active}`);
    console.log(`Soft Blocked Sites: ${blockedSites}`);
    console.log(`Hard Blocked Sites: ${hardBlockedSites}`);
});

chrome.tabs.onUpdated.addListener(() => {
    chrome.storage.local.get("active", (data) => {

        let status = data.active;
        let redirectUrl = 'https://kcorb0.github.io/ZoneIn-SiteBlocker/';

        console.log(`Status ${status}`);

        if (status === true) {
            chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
                let currentUrl = tabs[0].url;

                chrome.storage.local.get("blockedSites", (sitesData) => {

                    let sites = sitesData.blockedSites;

                    console.log(sites);

                    sites.forEach((site) => {
                        if (currentUrl.includes(site)) {
                            console.log(site);
                            chrome.tabs.update(undefined, { url: redirectUrl });
                        }
                    });
                });
            });
        }

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        let currentUrl = tabs[0].url;

        chrome.storage.local.get("hardBlockedSites", (sitesData) => {

            let sites = sitesData.hardBlockedSites;

            console.log(sites);

            sites.forEach((site) => {
                if (currentUrl.includes(site)) {
                    console.log(site);
                    chrome.tabs.update(undefined, { url: redirectUrl });
                }
            });
        });
    });

    });
});