const TRIGGER_TYPES = {
    BEGIN_DEBATE: "begin_debate",
    GO_TO_TOPIC: "go_to_topic",
    NEW_TOPIC: "new_topic",
    NEW_TOPIC_NESTED: "new_topic_nested",
    NEXT_TOPIC: "next_topic",
    NO_TRIGGER: "no_trigger",
}

const UNCOLLAPSED_TRIGGER_WORDS = {
    [TRIGGER_TYPES.GO_TO_TOPIC]: [
        'go on to',
        'go onto',
        'goto',
        'go to',
        'move on to',
        'go to the topic of',
        'talking about',
        'move on to the topic of'
    ],
    [TRIGGER_TYPES.NEW_TOPIC_NESTED]: [
        'subtopic is',
        'sub topic is',
        'subtopic of',
        'sub topic of',
        'point is',
    ],
    [TRIGGER_TYPES.NEW_TOPIC]: [
        'start',
        'talk about',
        'new topic',
        'another topic',
        'let\'s discuss',
        'to discuss',
        'also discuss',
        'touch on',
    ],
    [TRIGGER_TYPES.NEXT_TOPIC]: [
        'begin with the first topic',
        'next topic',
    ],
};

// new version - just three commands
const COLLAPSED_TRIGGER_WORDS = {
    [TRIGGER_TYPES.GO_TO_TOPIC]: [
        'go on to',
        'go onto',
        'goto',
        'go to',
        'move on to',
        'moving on to',
        'go to the topic of',
        'talking about',
        'start',
        'talk about',
        'new topic',
        'another topic',
        'another topic is',
        'let\'s discuss',
        'to discuss',
        'also discuss',
        'go back to',
        'going back to',
        'touch on',
    ],
    [TRIGGER_TYPES.NEW_TOPIC_NESTED]: [
        'subtopic is',
        'sub topic is',
        'subtopic of',
        'sub topic of',
        'point is',
    ],
    [TRIGGER_TYPES.NEXT_TOPIC]: [
        'begin with the first topic',
        'next topic',
    ],
};


const NLP = {
    /* Check for the trigger words in the given sentence
    */
    checkTriggerWords: function(sentence, collapsed = false) {
        const TRIGGER_WORDS = (collapsed ? COLLAPSED_TRIGGER_WORDS :
                                UNCOLLAPSED_TRIGGER_WORDS);
        const sentenceLower = sentence.toLowerCase();
        // iterate through the categories of triggers
        for(var key in TRIGGER_WORDS) {
            // the words relevant to this trigger
            const matches = TRIGGER_WORDS[key];
            // search for each such trigger word in the sentence
            for(var i = 0; i < matches.length; i++) {
                if (sentenceLower.includes(matches[i])) {
                    // Find the trigger, return the rest of the string
                    var term;
                    const startIndex = sentence.indexOf(matches[i]) + matches[i].length;
                    term = sentence.substr(startIndex);
                    return {
                        type: key,
                        term: term ? term.trim() : null, // remove whitespaces
                    }
                }
            }
        }

        // if none of the triggers matched, return NO_TRIGGER
        return {
            type: TRIGGER_TYPES.NO_TRIGGER,
        };
    },
}
