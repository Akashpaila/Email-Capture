function extractEmails() {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const bodyText = document.body.innerText;
    const emails = bodyText.match(emailRegex) || [];
    return [...new Set(emails)]; // Remove duplicates
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extractEmails") {
      const emails = extractEmails();
      sendResponse({ emails });
    }
  });
  