// Processing the transcript and updating the argument
// import NLP from './nlp';

// The state of the argument.
// Properties:
// topicList: array of Topic objects
// Methods:
// constructor()
class ArgumentState {
    constructor() {
        this.rootTopic = new Topic("don't display me on ui!");
        this.currentTopic = this.rootTopic;
    }
}

// A topic within the argument.
// Properties:
// childrenList: nested children topics
// content: list of [speakerID, string] tuples
class Topic {
    constructor(name) {
        this.childrenList = [];
        this.content = [];
        this.name = name;
    }
}

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
  state.currentTopic.childrenList.push(new Topic(topicName));
}

function handleCreateSameLevel(topicName) {

}

// Fills `state` with a sample for testing.
function sampleState() {
  var healthTopic = new Topic("health");
  var externalityTopic = new Topic("externality");

  var cognitiveHealthSubTopic = new Topic("cognitive health");
  var respiratoryHealthSubTopic = new Topic("respiratory health");
  healthTopic.childrenList = [cognitiveHealthSubTopic, respiratoryHealthSubTopic];

  cognitiveHealthSubTopic.content = [[0, "smoking makes you dumb"], [1, "no it makes you smart"]]
  respiratoryHealthSubTopic.content = [[0, "smoking makes it hard to breathe"], [1, "you literally have to breathe to smoke"]]

  externalityTopic.content = [[0, "smoking makes less people want to live in the area"], [1, "I would never live anywhere where I couldn't smoke"]]
  state.rootTopic.childrenList = [healthTopic, externalityTopic];
  state.currentTopic = cognitiveHealthSubTopic;
}
