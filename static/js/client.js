// Processing the transcript and updating the argument
// import NLP from './nlp';

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

// Given a sentence and the current speaker, update the tree accordingly.
function processSentence(sentence, speakerId) {
    // process the sentence
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
  var healthTopic = new Topic("health", [0, "ldskgls health"], state.rootTopic);
  var externalityTopic = new Topic("externality", [1, "gdkslgkd externality"], state.rootTopic);

  var healthTopic = new Topic("health", state.rootTopic);
  var externalityTopic = new Topic("externality", state.rootTopic);

  var cognitiveHealthSubTopic = new Topic("cognitive health", [0, "ldskgls cognitive health"], healthTopic);
  var respiratoryHealthSubTopic = new Topic("respiratory health", [0, "fdasfadsfa respiratory health"], healthTopic);
  healthTopic.childrenList = [cognitiveHealthSubTopic, respiratoryHealthSubTopic];
  cognitiveHealthSubTopic.content = [[0, "smoking makes you dumb"], [1, "no it makes you smart"]]
  respiratoryHealthSubTopic.content = [[0, "smoking makes it hard to breathe"], [1, "you literally have to breathe to smoke"]]

  state.rootTopic.childrenList = [healthTopic, externalityTopic];
  state.currentTopic = cognitiveHealthSubTopic;
}
