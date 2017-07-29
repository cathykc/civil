const TriggerWords = ['topic', 'point'];

const NLP = {
    /*
    Use the current list of topics to determine which topic the content belongs
    to.
    Use the text analysis API.
    */
    determineTopic: function(content, topicList) {
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
    },

    /*
    Check a sentence for trigger words.
    Trigger words are words that invoke navigation to a different topic or the
    creation of a new topic.
    sentence: a string
    */
    checkForTriggerWordsInSentence: function(sentence) {
        let result = {};
        let curIndices; // indices at which the current word is found
        let curIndex; // the current index in the sentence we are scanning
        let indexFound; // the index of the word within the sentence
        for (var i = 0; i < TriggerWords.length; i++) {
            curIndex = 0;
            curIndices = [];
            // Find all the indices at which TriggerWords[i] is found.
            while (curIndex < sentence.length) {
                indexFound = sentence.slice(curIndex).search(TriggerWords[i]);
                if (indexFound > -1) {
                    curIndex += indexFound;
                    curIndices.push(curIndex);
                    curIndex += 1;
                } else {
                    break;
                }
            }
            result[TriggerWords[i]] = curIndices;
        }

        return result;
    }
}

module.exports = NLP;
