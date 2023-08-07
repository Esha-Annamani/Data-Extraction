const nlp = require('compromise');

const extractData = (content, importantData) => {
    const idRegex = /\b[a-zA-Z0-9][0-9]{4}\b/g;
    const phoneRegex = /(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?/g;
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const dateRegex = /\b\d{1,2}[-/]\d{1,2}[-/]\d{4}\b/g;
    const nameRegex = /\b[A-Z][a-zA-Z]* [A-Z][a-zA-Z]*\b|\b[A-Z][a-zA-Z]*\b/g;

    const idMatch = content.match(idRegex);
    if (idMatch) {
        idMatch.forEach(element => {
            importantData.ids.push(element);
        });
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
    
    const nameMatches = content.match(nameRegex);
    if (nameMatches) {
        nameMatches.forEach(async(element) => {
            const doc = nlp(element);
            const isCountry = doc.places().length > 0;
            if (!doc.has('(A|An|The)')){
                if (isCountry) {
                    importantData.countryNames.push(element);
                } else {
                    importantData.personNames.push(element);
                }
            }
           
        })  
}
}

module.exports = {
    extractData
}