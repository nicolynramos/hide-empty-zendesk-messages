# 🧼 Hide Empty Zendesk Messages (Playvox Script)

This Tampermonkey userscript hides empty Zendesk messages from view when you're reviewing interactions in Playvox.

### ✨ What It Does
Some messages imported from Zendesk into Playvox are technically "present" but contain no actual content — just blank lines, system comments, or hidden metadata.  
This script hides those messages from view so you can focus only on the ones that actually contain text or media.

It also:
- **Automatically unhides** those messages when the "Show events" toggle is turned on (so you don’t miss anything important)
- Skips hiding messages that include attachments or images

---

### 🧠 Requirements

- ✅ Tampermonkey installed in your browser  
  ([Chrome](https://tampermonkey.net/?ext=dhdg&browser=chrome) / [Firefox](https://tampermonkey.net/?ext=dhdg&browser=firefox) / [Edge](https://tampermonkey.net/?ext=dhdg&browser=edge))
- ✅ You use [Playvox](https://www.playvox.com/) to review Zendesk interactions

---

### 🚀 Installation

1. Make sure [Tampermonkey](https://tampermonkey.net/) is installed and enabled in your browser
2. Click the link below to install the script:

👉 [Install Script via Raw GitHub](https://raw.githubusercontent.com/nicolynramos/hide-empty-zendesk-messages/main/hide-empty-messages.user.js)

3. When prompted by Tampermonkey, click **Install**
4. Reload Playvox — the script will run automatically on relevant pages
