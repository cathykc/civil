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

// function handleGoTo(name) {
//     // name: string that represents a topic, such as "health effects"
//     const options = {
//         shouldSort: true,
//         includeScore: true,
//         threshold: 1.0, // may want to vary this
//         keys: ['name'],
//     };
//
//     const fuse = new Fuse(state.topicList, options);
//     const result = fuse.search(name);
//     // set the current topic
//     state.currentTopic = state.topicNamesToNodes[result[0].item.name];
// }


const NLP = {
    /* Check for the trigger words in the given sentence
    */
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
