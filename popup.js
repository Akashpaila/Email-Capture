document.getElementById('extract-btn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: extractEmailsFromContentScript
      }, (results) => {
        if (results && results[0] && results[0].result) {
          const emails = results[0].result;
          document.getElementById('output').innerText = emails.join('\n');
        }
      });
    });
  });
  
  function extractEmailsFromContentScript() {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const bodyText = document.body.innerText;
    const emails = bodyText.match(emailRegex) || [];
    return [...new Set(emails)]; // Remove duplicates
  }
  