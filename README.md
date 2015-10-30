# ga: deconstructed

My attempt at documenting the [Google Analytics](https://developers.google.com/analytics/devguides/collection/analyticsjs/) (`analytics.js`) website tracker to better understanding how it works. In particular I wanted to know what it sends, how it sends it and where it sends it to.

This is a **work-in-progress**, which means this likely won't compile. You don't want to use this in production, much less development.

I would welcome anyone that wants to help to submit a pull request with any corrections or additions.

This is purely for **educational** purposes to pickup some interesting tips and tricks by reviewing the source code.

### todo

I need help understanding the following fields or parameters as there is no mention of them in the Google Anayltics [protocol v1](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters) documentation.

Below is a table of the fields and protocols that seem to be undocumented. I've added my thoughts (guesses) next to each. Open a [ticket](https://github.com/Dreyer/ga/issues/new) and provide some further input to explain them.

| fieldName | protocolName |  |
|--------------|--------------|-----------------------------------------------------|
| | `um` | |
|  `usage` | `_u` | Usage, but usage of what? |
| | `_oot` | Opt-out parameter |
| | `_rlt` | Rate-limit or quota |
| | `_br` | User sampling factor? There is some user sampling algorthim but no idea how it works. |
| `devIdTask` | `did` | Developer IDs? |
| `adSenseId` | | AdSense, for what? Related to `window.gaGlobal.hid` |
| `hitPayload` | | |
| `currencyCode` | `cu` | No mention of usage in protocol documentation. |
| `sessionGroup` | `sg` | Related to `sessionControl` but no mention in documentation. |
| `queueTime` | `qt` | |
| | `_s` | |
| | `_utmht` | Time of last hit being sent to Google Analytics. |
| | `_hc` | Hit counter for each time data is sent to Google Analytics. |
| | `_ti` | |
| | `_to` | |
| `storage` | | Only set to `cookie` but what are the other options? `localStorage`? |
| `transportUrl` | | |
| | `_r` | Related in some way to DoubleClick. |

