const extractData = (content, importantData) => {
    const idRegex = /\bID:\s*(\d+)\b/g;
    const phoneRegex = /(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?/g;
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const dateRegex = /\b\d{1,2}[-/]\d{1,2}[-/]\d{4}\b/g;

    const idMatch = content.match(idRegex);
    if (idMatch) {
        const id = idMatch[1];
        importantData.ids.push(id);
    }

    const phoneMatches = content.match(phoneRegex);
    if (phoneMatches) {
        const phoneNumber = phoneMatches[0];
        importantData.phoneNumbers.push(phoneNumber);
    }

    const emailMatches = content.match(emailRegex);
    if (emailMatches) {
        const email = emailMatches[0];
        importantData.emails.push(email);
    }
}

module.exports = {
    extractData
}