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
const updateHelper = {};

// Given a sentence and the current speaker, update the tree accordingly.
function processSentence(sentence, speakerId) {
    const trigger = NLP.checkTriggerWords(sentence);
    console.log('trigger:');
    console.log(trigger);

    // const analysis = Sapiens.analyzeSentence(sentence);
    // console.log('analysis:');
    // console.log(analysis);

    if (trigger.type === TRIGGER_TYPES.BEGIN_DEBATE) {
        beginDebate(speakerId);
    } else if (trigger.type === TRIGGER_TYPES.GO_TO_TOPIC) {
        handleGoTo(trigger.term);
    } else if (trigger.type === TRIGGER_TYPES.NEW_TOPIC) {
        handleCreateSameLevel(trigger.term, speakerId);
    } else if (trigger.type === TRIGGER_TYPES.NEW_TOPIC_NESTED) {
        handleCreateNested(trigger.term, speakerId);
    } else if (trigger.type === TRIGGER_TYPES.NEXT_TOPIC) {
        handleNextTopic();
    } else {
        appendTextToCurrentNode(sentence, speakerId);
    }

    updateHelper.updateConversation(state);
}

function beginDebate(speakerId) {
    console.log('Begin the debate!');
}

function appendTextToCurrentNode(text, speakerId) {
  state.currentTopic.content.push([speakerId, text]);
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
    console.log("FUZZY SEARCH RESULT");
    console.log(result);
    // set the current topic
    state.currentTopic = state.topicNamesToNodes[result[0].item.name];
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

/* Find a node with the highest matching score
TODO(kasrakoushan): probably not needed tbh
*/
function bfsScore(root, name) {
    // bfs that finds the max score
    let current = {node: root, score: 1};
    let best = current;
    for (child in root.childrenList) {
        current = bfs(child, name);
        if (current.score > best.score) {
            best = current;
        }
    }
    return best;
}

/* Find a node with the given name (return null if none)
TODO(kasrakoushan): probably not needed tbh
*/
function bfs(root, name) {
    let current = root;
    // check if current node matches
    if (current.name == name) {
        return current;
    }
    // check if children nodes match
    for (child in current.childrenList) {
        current = bfs(child, name);
        if (current !== null) {
            return current;
        }
    }
    return null;
}

function handleCreateNested(topicName, speakerId) {
    // TODO: this function should receive intro as an argument
    const newTopic = new Topic(topicName, [speakerId, "TOPIC INTRO??"], state.currentTopic);
    // push the new topic into the tree
    state.currentTopic.childrenList.push(newTopic);
    // add the topic to the list and set it as current
    handleAddTopic(newTopic);
}

function handleCreateSameLevel(topicName, speakerId) {
    // TODO: this function should receive intro as an argument
    console.log("creating new topic on the same level");
    const newTopic = new Topic(topicName, [speakerId, "TOPIC INTRO??"], state.currentTopic.parent);
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
    handleCreateNested("health", 0);
    handleCreateSameLevel("externality", 1);
    handleGoTo("health");
    handleCreateNested("cognitive health", 0);
    processSentence("smoking makes you dumb", 0);
    processSentence("no it makes you smart", 1);
    handleCreateSameLevel("respiratory health", 0);
    processSentence("smoking makes it hard to breathe", 0);
    processSentence("you literally have to breathe to smoke", 1);
}
