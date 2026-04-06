// background.js — Manifest V3 Service Worker
// Registers dynamic blocking rules on extension install/update.
// Static rules (rules.json) are loaded automatically by the browser via manifest.json.

const DYNAMIC_AD_DOMAINS = [
    // === Google Ads & Analytics ===
    "doubleclick.net",
    "googlesyndication.com",
    "google-analytics.com",
    "googleadservices.com",
    "googletagservices.com",
    "googletagmanager.com",
    "googleoptimize.com",
    "adservice.google.com",

    // === Facebook / Meta Ads ===
    "connect.facebook.net",
    "creative.ak.fbcdn.net",
    "an.facebook.com",

    // === Analytics & Tracking ===
    "scorecardresearch.com",
    "quantserve.com",
    "chartbeat.com",
    "hotjar.com",
    "mixpanel.com",
    "segment.io",
    "segment.com",
    "fullstory.com",
    "crazyegg.com",
    "mouseflow.com",
    "luckyorange.com",
    "kissmetrics.com",
    "amplitude.com",
    "heap.io",

    // === Ad Networks ===
    "zedo.com",
    "adbrite.com",
    "exponential.com",
    "adnxs.com",              // AppNexus / Xandr
    "adsrvr.org",             // The Trade Desk
    "rubiconproject.com",     // Magnite/Rubicon
    "pubmatic.com",
    "openx.net",
    "openx.com",
    "advertising.com",
    "adtechus.com",
    "smartadserver.com",
    "casalemedia.com",        // Index Exchange
    "indexww.com",
    "criteo.com",
    "criteo.net",
    "taboola.com",
    "outbrain.com",
    "revcontent.com",
    "mgid.com",
    "sharethrough.com",
    "sovrn.com",
    "lijit.com",              // Sovrn
    "triplelift.com",
    "appnexus.com",
    "yieldmo.com",
    "contextweb.com",         // PulsePoint
    "pulsepoint.com",
    "33across.com",
    "spotxchange.com",
    "spotx.tv",
    "teads.tv",
    "yieldlab.net",
    "yieldlab.com",
    "adform.net",
    "adform.com",
    "mediavine.com",
    "adthrive.com",
    "aps.amazon.com",         // Amazon Ads
    "aax.amazon-adsystem.com",
    "amazon-adsystem.com",
    "media.net",

    // === Retargeting & DSPs ===
    "rlcdn.com",              // LiveRamp
    "liveramp.com",
    "turn.com",
    "bluekai.com",
    "demdex.net",             // Adobe Audience Manager
    "mookie1.com",            // Xaxis
    "mathtag.com",            // MediaMath
    "eyeota.net",
    "netseer.com",
    "conversantmedia.com",
    "dotomi.com",

    // === CDN-based ad scripts ===
    "cdn.jsdelivr.net",       // Note: only ad-related paths blocked via rules.json
    "pagead2.googlesyndication.com",

    // === Affiliate / tracking pixels ===
    "clickbank.net",
    "clkbank.com",
    "shareasale.com",
    "commission-junction.com",
    "cj.com",
    "tradedoubler.com",
    "awin1.com",
    "zanox.com",
    "pepperjam.com",

    // === Pop-under / malvertising networks ===
    "popcash.net",
    "popads.net",
    "adcash.com",
    "propellerads.com",
    "trafficjunky.net",
    "exoclick.com",
    "juicyads.com",
    "hilltopads.net",
    "plugrush.com",
];

// Build dynamic rules from the domain list.
// Each domain gets a rule that blocks all requests matching *.domain/*.
function buildRules(domains) {
    return domains.map((domain, index) => ({
        id: index + 1,
        priority: 1,
        action: { type: "block" },
        condition: {
            urlFilter: `||${domain}^`,
            resourceTypes: [
                "main_frame",
                "sub_frame",
                "stylesheet",
                "script",
                "image",
                "font",
                "object",
                "xmlhttprequest",
                "ping",
                "media",
                "websocket",
                "other"
            ]
        }
    }));
}

chrome.runtime.onInstalled.addListener(async () => {
    // Remove all old dynamic rules first to avoid ID conflicts on update.
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const existingIds = existingRules.map(r => r.id);

    await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: existingIds,
        addRules: buildRules(DYNAMIC_AD_DOMAINS)
    });

    console.log(`[Adblocker] Registered ${DYNAMIC_AD_DOMAINS.length} dynamic blocking rules.`);
});
