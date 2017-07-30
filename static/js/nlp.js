const TriggerWords = ['topic', 'point'];

const TRIGGER_TYPES = {
    BEGIN_DEBATE: "begin_debate",
    GO_TO_TOPIC: "go_to_topic",
    NEW_TOPIC: "new_topic",
    NEW_TOPIC_NESTED: "new_topic_nested",
    NEXT_TOPIC: "next_topic",
    NO_TRIGGER: "no_trigger",
}

const TRIGGER_WORDS = {
    [TRIGGER_TYPES.BEGIN_DEBATE]: [
        // 'let\'s begin',
        // 'let\'s start',
        // 'let us now begin',
    ],
    [TRIGGER_TYPES.GO_TO_TOPIC]: [
        'go on to',
        'go onto',
        'goto',
        'go to',
        'move on to',
        'go to the topic of',
    ],
    [TRIGGER_TYPES.NEW_TOPIC_NESTED]: [
        'subtopic',
    ],
    [TRIGGER_TYPES.NEW_TOPIC]: [
        'start',
        'talk about',
        'new topic',
        'another topic'
    ],
    [TRIGGER_TYPES.NEXT_TOPIC]: [
        'begin with the first topic',
        'next topic',
    ],
};

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
    },

    checkTriggerWords: function(sentence) {
        const sentenceLower = sentence.toLowerCase();
        for(var key in TRIGGER_WORDS) {
            const matches = TRIGGER_WORDS[key];
            for(var i = 0; i < matches.length; i++) {
                if (sentenceLower.includes(matches[i])) {
                    // Parse out important content
                    var term;
                    if (key === TRIGGER_TYPES.GO_TO_TOPIC) {
                        const startIndex = sentence.indexOf(matches[i]) + matches[i].length;
                        term = sentence.substr(startIndex);
                    } else if (key === TRIGGER_TYPES.NEW_TOPIC) {
                        const startIndex = sentence.indexOf(matches[i]) + matches[i].length;
                        term = sentence.substr(startIndex);
                    } else if (key === TRIGGER_TYPES.NEW_TOPIC_NESTED) {
                        const startIndex = sentence.indexOf(matches[i]) + matches[i].length;
                        term = sentence.substr(startIndex);
                    }

                    return {
                        type: key,
                        term: term ? term.trim() : null,
                    }
                }
            }
        }

        return {
            type: TRIGGER_TYPES.NO_TRIGGER,
        };
    },
}
