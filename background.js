chrome.runtime.onInstalled.addListener(() => {

    let active = false;

    chrome.storage.sync.set({ active });
    console.log(`Extension status: ${active}`);
});

chrome.tabs.onUpdated.addListener(() => {
    chrome.storage.sync.get("active", function (data) {

        let status = data.active;
        let redirectUrl = 'https://www.google.co.uk';
        let siteUrls = [
            "twitch.tv",
            "youtube.com",
            "twitter.com",
            "reddit.com",
            "facebook.com",
            "just-eat.co.uk",
            "dominos.co.uk"
        ];

        console.log(`Status ${status}`)

        if (status === true) {
            chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
                let currentUrl = tabs[0].url;

                siteUrls.forEach(function (item) {
                    if (currentUrl.includes(item)) {
                        chrome.tabs.update(undefined, { url: redirectUrl });
                    }
                });
            });
        }
    });
});