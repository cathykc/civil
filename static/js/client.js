// Processing the transcript and updating the argument

/* The state of the argument.
Properties:
- rootTopic: a dummy Topic object at the root of the topic tree
- currentTopic: pointer to the currently discussed Topic node
- topicNamesToNodes: mapping of topic names to topic nodes from the whole tree
- topicList: an array of all topics
*/
class ArgumentState {
    constructor() {
        this.rootTopic = new Topic("don't display me on ui!", null);
        this.currentTopic = this.rootTopic;
        this.topicNamesToNodes = {}; // mapping name -> topic node
        this.topicList = []; // list of ALL topics, regardless of depth
        this.collapse_triggers = false;
        this.currentSpeakerId = 0;
    }
}

// A topic within the argument.
// Properties:
// childrenList: nested children topics
// content: list of [speakerID, string] tuples
// info : tuple of [speakerID, topic intro string]
var Topic = (() => {
    var nextId = 0;
    return function Topic(name, info, parent) {
        this.childrenList = [];
        this.content = []; // right now is both children and current
        this.id = nextId++;
        this.name = name;
        this.info = info;
        this.parent = parent;
    }
})();

const state = new ArgumentState();
// var currentSpeakerId = 0;
const updateHelper = {};

// Given a sentence and the current speaker, update the tree accordingly.
function processSentence(sentence) {
    const trigger = NLP.checkTriggerWords(sentence, state.collapse_triggers);

    if (trigger.type === TRIGGER_TYPES.BEGIN_DEBATE) {
        beginDebate(window.currentSpeakerId);
    } else if (trigger.type === TRIGGER_TYPES.GO_TO_TOPIC) {
        if (state.collapse_triggers) {
            searchOrCreateTopic(trigger.term, window.currentSpeakerId, sentence);
        } else {
            handleGoTo(trigger.term);
        }
    } else if (trigger.type === TRIGGER_TYPES.NEW_TOPIC) {
        handleCreateSameLevel(trigger.term, window.currentSpeakerId, sentence);
    } else if (trigger.type === TRIGGER_TYPES.NEW_TOPIC_NESTED) {
        handleCreateNested(trigger.term, window.currentSpeakerId, sentence);
    } else if (trigger.type === TRIGGER_TYPES.NEXT_TOPIC) {
        handleNextTopic();
    } else {
        appendTextToCurrentNode(sentence, window.currentSpeakerId);
    }

    updateHelper.updateConversation(state);
}

function beginDebate(speakerId) {
}

function appendTextToCurrentNode(text, speakerId) {
  const newContent = {
    speaker: speakerId,
    text: text,
    sapiensFlag: true,
    func: Sapiens.analyzeSentence,
    };
  state.currentTopic.content.push(newContent);
  updateHelper.updateConversation(state);
}

function handleGoTo(name) {
    // name: string that represents a topic, such as "health effects"
    const options = {
        shouldSort: true,
        includeScore: true,
        threshold: 1.0, // may want to vary this
        keys: ['name'],
    };

    const fuse = new Fuse(state.topicList, options);
    const result = fuse.search(name);
    // set the current topic
    state.currentTopic = state.topicNamesToNodes[result[0].item.name];
}

function searchOrCreateTopic(name, speakerId, sentence) {
    // search for given topic
    // if it's not in the tree, create it as a topic with at the same
    // level as current topic
    const options = {
        shouldSort: true,
        includeScore: true,
        threshold: 1.0, // may want to vary this
        distance: 100,
        keys: ['name'],
    };

    const fuse = new Fuse(state.topicList, options);
    const result = fuse.search(name);
    console.log('Search result with query: ' + name);
    console.log(result);
    if (result.length == 0 || result[0].score > 0.2) {
        // no useful results found, create a new topic node
        handleCreateSameLevel(name, speakerId, sentence);
    } else {
        // an accurate result was found, go to that node
        state.currentTopic = state.topicNamesToNodes[result[0].item.name];
    }

}

function handleNextTopic() {
    // move to the next topic
    // based on chronological order of when topics were added
    const curIndex = state.topicList.findIndex((el) => {
        return state.currentTopic === el;
    });
    if (curIndex < state.topicList.length - 1) {
        // only move onto the next topic if there is a next topic
        state.currentTopic = state.topicList[curIndex + 1];
    }
}

function handleCreateNested(topicName, speakerId, sentence) {
    // TODO: this function should receive intro as an argument
    const newTopic = new Topic(topicName, [speakerId, sentence], state.currentTopic);
    // push the new topic into the tree

    // horrible code i know
    if(state.currentTopic.parent !== undefined) {
        if (state.currentTopic.parent.parent !== undefined) {
            if (state.currentTopic.parent.parent.parent === undefined) {
                state.currentTopic.parent.childrenList.push(newTopic);
            } else {
                state.currentTopic.childrenList.push(newTopic);
            }
        }
        else {
            state.currentTopic.childrenList.push(newTopic);
        }
    } else {
        state.currentTopic.childrenList.push(newTopic);
    }

    // add the topic to the list and set it as current
    handleAddTopic(newTopic);
}

function handleCreateSameLevel(topicName, speakerId, sentence) {

    // this is a hacky mchackface
    if (state.currentTopic.parent == null) {
      handleCreateNested(topicName, speakerId, sentence);
      return;
    }

    // TODO: this function should receive intro as an argument
    const newTopic = new Topic(topicName, [speakerId, sentence], state.currentTopic.parent);
    // push the new topic into the tree
    state.currentTopic.parent.childrenList.push(newTopic);
    // add the topic to the list and set it as current
    handleAddTopic(newTopic);

}

function handleAddTopic(newTopic) {
    // add the topic to mapping of names -> topics
    // set the topic as the current topic
    state.topicList.push(newTopic);
    state.topicNamesToNodes[newTopic.name] = newTopic;
    state.currentTopic = newTopic;
}

// Fills `state` with a sample for testing.
function sampleState() {
    // use the handlers for filling in the state
    const funcs = [
        () => processSentence("lets talk about career decisions", 0),
        () => processSentence("lets talk about importance of school", 1),
        () => processSentence("go to career", 0),
        () => processSentence("subtopic is software engineering", 0),
        () => processSentence("I believe the minimum education requirement for computer software engineering jobs is usually a bachelor's degree, the step is to complete your degree program.", 0),
        () => processSentence("I disagree coding conventions are a set of guidelines for a specific programming language that recommend programming style, practices, and methods for each aspect of a program written in that language", 1),
        () => processSentence("go to career", 1),
        () => processSentence("Studies show 15% of people do whatever they want", 1),
        () => processSentence("go to school", 0),
        () => processSentence("Attending college provides opportunities for graduates which are not as widespread to those who have not received a higher education", 0),
        () => processSentence("subtopic of homework", 1),
        () => processSentence("Does not improve academic performance among children and may improve academic skills among older students", 1),
        () => processSentence("I believe that it creates stress for students and their parents and reduces the amount of time that students could spend outdoors, exercising, playing sports, working, sleeping or in other activities", 1),
        () => processSentence("The evidence shows that more than half of students get paid more.", 1),
    ];
    var cur = 0;
    function runUITests() {
        if (cur < funcs.length) {
            funcs[cur]();
            cur += 1;
        }
    }
    setInterval(runUITests, 1000);
}

$(document).ready(function() {
    document.body.onkeyup = function(e) {
        if(e.keyCode == 39){
            window.currentSpeakerId = (window.currentSpeakerId === 1) ? 0 : 1;
        }
    }
});
