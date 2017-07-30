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
class Topic {
    constructor(name, parent) {
        this.childrenList = [];
        this.content = [];
        this.name = name;
        this.parent = parent;
    }
}

const state = new ArgumentState();

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

}

function handleCreateNested(topicName) {
  state.currentTopic.childrenList.push(new Topic(topicName, currentTopic));
}

function handleCreateSameLevel(topicName) {
  state.currentTopic.parent.childrenList.push(new Topic(topicName, currentTopic));
}

// Fills `state` with a sample for testing.
function sampleState() {
  var healthTopic = new Topic("health", state.rootTopic);
  var externalityTopic = new Topic("externality", state.rootTopic);

  var cognitiveHealthSubTopic = new Topic("cognitive health", healthTopic);
  var respiratoryHealthSubTopic = new Topic("respiratory health", healthTopic);
  healthTopic.childrenList = [cognitiveHealthSubTopic, respiratoryHealthSubTopic];

  cognitiveHealthSubTopic.content = [[0, "smoking makes you dumb"], [1, "no it makes you smart"]]
  respiratoryHealthSubTopic.content = [[0, "smoking makes it hard to breathe"], [1, "you literally have to breathe to smoke"]]

  externalityTopic.content = [[0, "smoking makes less people want to live in the area"], [1, "I would never live anywhere where I couldn't smoke"]]
  state.rootTopic.childrenList = [healthTopic, externalityTopic];
  state.currentTopic = cognitiveHealthSubTopic;
}
