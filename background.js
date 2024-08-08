chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: extractEmailsFromContentScript
    }, (results) => {
      if (results && results[0] && results[0].result) {
        const emails = results[0].result;
        console.log('Extracted Emails:', emails);
        alert(`Emails: ${emails.join(', ')}`);
      }
    });
  });
  
  function extractEmailsFromContentScript() {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const bodyText = document.body.innerText;
    const emails = bodyText.match(emailRegex) || [];
    return [...new Set(emails)]; // Remove duplicates
  }
  