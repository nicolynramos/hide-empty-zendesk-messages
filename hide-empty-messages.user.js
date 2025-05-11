// ==UserScript==
// @name         Playvox – Hide Empty Messages
// @namespace    http://tampermonkey.net/
// @version      4.0
// @description  Hides <qms-interaction-message> with no content or attachments, after page fully loads.
// @match        *://*.playvox.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    function deepQuerySelectorAll(selector, root = document) {
        const results = [];

        function search(node) {
            if (!node) return;

            if (node.querySelectorAll) {
                results.push(...node.querySelectorAll(selector));
            }

            Array.from(node.children).forEach(child => {
                if (child.shadowRoot) search(child.shadowRoot);
                search(child);
            });
        }

        search(root);
        return results;
    }

    function isMessageEmpty(root) {
        try {
            const shadow = root.shadowRoot;
            if (!shadow) return false;

            const content = shadow.querySelector('.qms-interaction-message__content');
            const attachments = shadow.querySelector('qms-interaction-attachments');

            if (!content) return false;

            const cleanedHTML = content.innerHTML
                .replace(/<!--[\s\S]*?-->/g, '')// Remove Lit comments
                .replace(/<br\s*\/?>/gi, '')// Remove <br>
                .replace(/&nbsp;/gi, '')// Remove non-breaking space
                .replace(/\s+/g, '')// Remove whitespace
                .trim();

            const text = content.textContent.trim();

            let hasRealAttachment = false;
            if (attachments && attachments.shadowRoot) {
                const visibleNodes = attachments.shadowRoot.querySelectorAll('img, video, a, div');
                hasRealAttachment = visibleNodes.length > 0;
            }

            return text === '' && cleanedHTML === '' && !hasRealAttachment;
        } catch {
            return false;
        }
    }

    function updateMessageVisibility(root) {
        const isEmpty = isMessageEmpty(root);
        const detailVisible = root.hasAttribute('is-detail-visible');
        root.style.display = isEmpty && !detailVisible ? 'none' : '';
    }

    function processMessages() {
        const messages = deepQuerySelectorAll('qms-interaction-message');
        messages.forEach(root => {
            updateMessageVisibility(root);

            if (!root.hasAttribute('data-qms-watched')) {
                new MutationObserver(() => updateMessageVisibility(root)).observe(root, { attributes: true });
                root.setAttribute('data-qms-watched', 'true');
            }
        });
    }

    setTimeout(() => {
        processMessages();
        new MutationObserver(() => setTimeout(processMessages, 300)).observe(document.body, {
            childList: true,
            subtree: true
        });
    }, 3000);
})();
