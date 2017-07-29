/* An element within a topic can be of three types:
- claim: some statement that expresses a viewpoint
- evidence: fact-based evidence to support a claim
- rebuttal: a refutation of some other claim
*/
export const contentTypes = {
    CLAIM: 'claim',
    EVIDENCE: 'evidence',
    REBUTTAL: 'rebuttal',
}

export class NLP {
    /*
    Determine whether a piece of content is a claim, evidence, or rebuttal
    Use the text analysis API
    */
    determineContentType(text) {
        return contentTypes.CLAIM;
    }

    /*
    Use the current list of topics to determine which topic the content belongs
    to.
    Use the text analysis API.
    */
    determineTopic(content, topicList) {
        // for now, return the last topic
        return topicList.length - 1
        // eventually, return the actual topic
        for (var i = 0; i < topicList.length; i++) {
            // do some text analysis, determine if content matches topic
            if (true) { // check if match
                return i
            }
        }
        // if no match return null
        return null;
    }
}
