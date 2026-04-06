# Simple Adblocker

A lightweight Google Chrome extension that blocks requests to known advertising, tracking, and analytics domains — giving you a faster, cleaner browsing experience.

Built on Chrome's **Manifest V3** `declarativeNetRequest` API for modern, efficient, and privacy-respecting ad blocking.

---

## How It Works

The extension uses two layers of blocking rules that are evaluated natively by Chrome — no background page, no slow JavaScript interception:

- **Static rules** (`rules.json`) — loaded automatically at install time, covering high-priority ad subdomains.
- **Dynamic rules** (`background.js`) — registered on install via `chrome.declarativeNetRequest.updateDynamicRules()`, covering 80+ ad networks, analytics platforms, DSPs, retargeting services, and affiliate trackers.

Both layers block all resource types: scripts, images, iframes, XHR requests, ping beacons, and more.

---

## Installation

1. Clone this repository or download and unzip the source code.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** using the toggle in the top-right corner.
4. Click **Load unpacked** and select the folder containing the extension files.
5. The extension is now active and blocking ads automatically.

### File Structure

```
simple-adblocker/
├── manifest.json       # Extension config (Manifest V3)
├── background.js       # Service worker — registers dynamic blocking rules
├── rules.json          # Static declarativeNetRequest rules
└── icons/
    ├── ico_16x16.png
    ├── ico_48x48.png
    └── ico_128x128.png
```

---

## Customization

### Adding domains to the block list

1. Open `background.js`.
2. Find the `DYNAMIC_AD_DOMAINS` array near the top of the file.
3. Add your domain as a string — for example:
   ```javascript
   "example-ad-network.com",
   ```
4. Save the file.
5. Go to `chrome://extensions` and click the **refresh icon** on the extension card to reload it.

### Adding fine-grained URL pattern rules

For more specific patterns (e.g. blocking a particular path on a domain rather than the whole domain), add a rule object to `rules.json` following this format:

```json
{
    "id": 11,
    "priority": 1,
    "action": { "type": "block" },
    "condition": {
        "urlFilter": "||example.com/ads/*",
        "resourceTypes": ["script", "image", "xmlhttprequest", "sub_frame", "other"]
    }
}
```

Make sure each rule has a unique `id`. After saving, reload the extension in `chrome://extensions`.

---

## What Gets Blocked

The extension blocks requests to domains across these categories:

| Category | Examples |
|---|---|
| Google Ads | `doubleclick.net`, `googlesyndication.com`, `adservice.google.com` |
| Social Ads | `connect.facebook.net`, `ads.linkedin.com`, `static.ads-twitter.com` |
| Ad Networks | `adnxs.com`, `rubiconproject.com`, `criteo.com`, `pubmatic.com` |
| Native/Content Ads | `taboola.com`, `outbrain.com`, `revcontent.com` |
| Analytics & Tracking | `google-analytics.com`, `hotjar.com`, `mixpanel.com`, `segment.io` |
| Retargeting & DSPs | `adsrvr.org`, `demdex.net`, `bluekai.com`, `liveramp.com` |
| Affiliate Trackers | `shareasale.com`, `cj.com`, `awin1.com` |
| Pop-under Networks | `popads.net`, `propellerads.com`, `exoclick.com` |

---

## Manifest V3 Compatibility

This extension is fully compatible with **Manifest V3**, which is required for all Chrome extensions. Key architectural changes from older V2-style blockers:

- Uses `declarativeNetRequest` instead of the deprecated `webRequestBlocking`
- Runs a **service worker** instead of a persistent background page
- Rules are evaluated by the browser natively — more efficient and more privacy-preserving than intercepting requests in JavaScript

---

## Contributing

Contributions are welcome. If you know of ad domains not currently on the list, encounter a site where ads are getting through, or want to suggest a feature, feel free to open an issue or submit a pull request.

---

## License

Free to use, modify, and distribute. Enjoy ad-free browsing!
