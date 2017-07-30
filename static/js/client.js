// Processing the transcript and updating the argument
import NLP from './nlp';

// The state of the argument.
// Properties:
// topicList: array of Topic objects
// Methods:
// constructor()
class ArgumentState {
    constructor() {
        this.topicList = [];
    }
}

// A topic within the argument.
// Properties:
// childrenList: nested children topics
// content: list of [speakerID, string] tuples
class Topic {
    constructor() {
        this.childrenList = [];
        this.content = [];
    }
}

const state = new ArgumentState();

// Given a sentence and the current speaker, update the tree accordingly.
function processSentence(sentence, speakerId) {
    // process the sentence
}

// Fills `state` with a sample for testing.
function sampleState() {
  var healthTopic = new Topic();
  var externalityTopic = new Topic();

  var cognitiveHealthSubTopic = new Topic();
  var respiratoryHealthSubTopic = new Topic();
  healthTopic.childrenList = [cognitiveHealthSubTopic, respiratoryHealthSubTopic];

  cognitiveHealthSubTopic.content = [[0, "smoking makes you dumb"], [1, "no it makes you smart"]]
  respiratoryHealthSubTopic.content = [[0, "smoking makes it hard to breathe"], [1, "you literally have to breathe to smoke"]]

  externalityTopic.content = [[0, "smoking makes less people want to live in the area"], [1, "I would never live anywhere where I couldn't smoke"]]
  state.topicList = [healthTopic, externalityTopic];
}
