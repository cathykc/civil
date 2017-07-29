export class NLP {
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
