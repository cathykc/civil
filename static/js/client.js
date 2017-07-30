// Processing the transcript and updating the argument
import NLP from './nlp';

/* The state of the argument.
Properties:
- topicList: array of Topic objects
- recentWords: array of strings
Methods:
 - constructor()
 - addTopic(topic)
*/
class ArgumentState {
    constructor() {
        this.topicList = [];
        this.recentWords = [];
        this.currentSpeakerId = 0; // 0 or 1
        this.currentTopic = 0;
    }

    /* Navigate to a given topic by index.
    */
    navigateToTopic(topicIndex) {
        this.currentTopic = topicIndex;
    }

    /* Add an element to the curent subtopic.
    */
    addElement(content) {
        const topic = this.topicList[this.currentTopic];
        const subTopic = topic.subTopicList[topic.currentSubTopic];
        subTopic.push(content);
    }
}

/* A topic within the argument.
Properties:
- subTopicList: array of SubTopic objects
*/
class Topic {
    constructor() {
        this.subTopicList = [];
        this.topicText = null;
        this.topicTriggers = [];
        this.currentSubTopic = -1;
    }
}

/* A subtopic within the argument.
Properties:
- topicElementList: an array of SubTopicElements
*/
class SubTopic {
    constructor() {
        this.topicElementList = [];
        this.subTopicText = null;
        this.subTopicTriggers = [];
    }
}

/* An element belonging to a subtopic.
Properties:
- speakerId: 0 or 1
- content: string (transcription of a user's voice)
*/
class SubTopicElement {
    constructor(content, speakerId) {
        this.speakerId = speakerId;
        this.content = content; // string
    }
}

const state = new ArgumentState();

/* Process the text given.
*/
function processWord(word, speakerId) {
    // process the word
}
