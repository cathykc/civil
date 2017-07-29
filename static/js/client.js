// Processing the transcript and updating the argument
import {NLP, contentTypes} from './nlp.js';

/* The state of the argument
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
    }

    addElement(content) {
        const topicIndex = NLP.determineTopic(content, this.topicList);
        if (topicIndex) {
            this.addElementToTopic(content, topicIndex);
        }
        else {
            // create a new topic, add that topic
            const newTopic = Topic();
            this.topicList.push(newTopic);
        }
    }

    addElementToTopic(element, topicIndex) {
        this.topicList[topicIndex].push(element);
    }
}

/* A topic within the argument
Properties:
- elementList: array of TopicElement objects
*/
class Topic {
    constructor() {
        this.elementList = [];
        this.topicText = null;
        this.topicTriggers = [];
    }
}

/* An element belonging to a topic
Properties:
- type: CLAIM, EVIDENCE, or REBUTTAL
- speakerId: 0 or 1
- content: string (transcription of a user's voice)
*/
class TopicElement {
    constructor(content, speakerId) {
        this.type = NLP.determineContentType(content);
        this.speakerId = speakerId;
        this.content = content; // string
    }
}

const state = ArgumentState();

function processSentence(sentence, speakerId) {
    // process the sentence
    const element = TopicElement(sentence, speakerId);

}
