// Processing the transcript and updating the argument

// The state of the argument.
// Properties:
// topicList: array of Topic objects
// Methods:
// constructor()
class ArgumentState {
    constructor() {
        this.rootTopic = new Topic("don't display me on ui!", null);
        this.currentTopic = this.rootTopic;
    }
}

// A topic within the argument.
// Properties:
// childrenList: nested children topics
// content: list of [speakerID, string] tuples
// intro : tuple of [speakerID, topic intro string]
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
const topicList = []; // mapping of names -> topics
const topicNamesToNodes = {};

// Given a sentence and the current speaker, update the tree accordingly.
function processSentence(sentence, speakerId) {
    const trigger = NLP.checkTriggerWords(sentence);
    console.log('trigger:');
    console.log(trigger);

    if (trigger.type === TRIGGER_TYPES.BEGIN_DEBATE) {
        beginDebate(speakerId);
    } else if (trigger.type === TRIGGER_TYPES.GO_TO_TOPIC) {
        handleGoTo(trigger.term);
    } else if (trigger.type === TRIGGER_TYPES.NEW_TOPIC) {
        handleCreateSameLevel(trigger.term);
    } else if (trigger.type === TRIGGER_TYPES.NEXT_TOPIC) {
        handleCreateNested(trigger.term);
    } else {
        appendTextToCurrentNode(sentence, speakerId);
    }
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
        threshold: 0.6, // may want to vary this
        keys: ['name'],
    };

    const fuse = new Fuse(topicList, options);
    const result = fuse.search(name);
    console.log(result);
    // set the current topic
    state.currentTopic = topicNamesToNodes[result[0].item.name];
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

function handleCreateNested(topicName) {
    const newTopic = new Topic(topicName, currentTopic);
    state.currentTopic.childrenList.push(newTopic);
    handleAddTopic(newTopic);
}

function handleCreateSameLevel(topicName) {
    new Topic(topicName, currentTopic);
    state.currentTopic.parent.childrenList.push(newTopic);
    handleAddTopic(newTopic);

}

function handleAddTopic(newTopic) {
    // add the topic to mapping of names -> topics
    topicList.push({name: newTopic.name, topic: newTopic});
    topicNamesToNodes[newTopic.name] = newTopic;
}

// Fills `state` with a sample for testing.
function sampleState() {
  var healthTopic = new Topic("health", [0, "ldskgls health"], state.rootTopic);
  var externalityTopic = new Topic("externality", [1, "gdkslgkd externality"], state.rootTopic);

  var cognitiveHealthSubTopic = new Topic("cognitive health", [0, "ldskgls cognitive health"], healthTopic);
  var respiratoryHealthSubTopic = new Topic("respiratory health", [0, "fdasfadsfa respiratory health"], healthTopic);
  healthTopic.childrenList = [cognitiveHealthSubTopic, respiratoryHealthSubTopic];
  cognitiveHealthSubTopic.content = [[0, "smoking makes you dumb"], [1, "no it makes you smart"]]
  respiratoryHealthSubTopic.content = [[0, "smoking makes it hard to breathe"], [1, "you literally have to breathe to smoke"]]

  state.rootTopic.childrenList = [healthTopic, externalityTopic];
  state.currentTopic = cognitiveHealthSubTopic;
}
