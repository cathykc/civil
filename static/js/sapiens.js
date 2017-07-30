// A sentence can be of one element element type
const ELEMENT_TYPE = {
  CLAIM: "claim",
  EVIDENCE: "evidence",
  REFUTATION: "refutation",
  DISAGREE: "disagree",
  AGREE: "agree",
  UNKNOWN: "unknown",
};

// Mapping of ELEMENT_TYPE to a list of matching subject/predicate pairs
const PREDICATES = {
  [ELEMENT_TYPE.CLAIM]: [
    ['i', 'believe'],
    ['i', 'think'],
    ['i', 'contend'],
    ['my point', 'is']
  ],
  [ELEMENT_TYPE.EVIDENCE]: [
    ['the evidence', 'shows'],
    ['study', 'shows'],
    ['the research', 'suggests'],
    ['studies', 'show'],
    ['researchers', 'say']
  ],
  [ELEMENT_TYPE.AGREE]: [
    ['i', 'agree'],
  ],
  [ELEMENT_TYPE.DISAGREE]: [
    ['i', 'disagree'],
  ],
  [ELEMENT_TYPE.REFUTATION]: [
    ['that', 'is', 'false'],
  ]
};

// Wrapper around Plasticity Sapiens language engine
const Sapiens = {
  analyzeSentence: function(text, callback) {
    const API_ROOT_URL = "https://sapien-language-engine.api.plasticity.ai/?text=";
    const url = API_ROOT_URL + encodeURIComponent(text);

    if (text) {
      $.ajax({
        url: url,
        type: "GET",
        success: (data) => {
          const parsedData = this._parseContent(data);
          callback(parsedData);
        },
        failure: function(error) {
        }
      });
    }
  },

  // Use PREDICATES to match an ELEMENT_TYPE
  _parseContent: function(data) {
    for (var i = 0; i < data.length; i++) {
      const sentenceGroup = data[i];
      for (var j = 0; j < sentenceGroup.alternatives.length; j++) {
        const alternative = sentenceGroup.alternatives[j];
        const sentence = alternative.sentence;
        for (var k = 0; k < alternative.relations.length; k++) {
          const relation = alternative.relations[k];
          const subject = relation.subject;
          const subjectEntity = subject.entity.toLowerCase();
          const predicate = relation.predicate;
          const predicateVerb = predicate.verb.toLowerCase();
          const object = relation.object;
          var objectEntity;
          if (object && object.type === "entity") {
            objectEntity = object.entity;
          }

          for (var key in PREDICATES) {
            const matches = PREDICATES[key];
            for (var z in matches) {
              const match = matches[z];
              const matchAgainst = [subjectEntity, predicateVerb];
              if (objectEntity && match.length > 2) {
                matchAgainst.push(objectEntity);
              }

              if (this._arraysEqual(match, matchAgainst)) {
                // Found match
                return this._extendWithData({
                  type: key,
                }, relation, sentence);
              }
            }
          }
        }
      }
    }
    // Found no matching element_type
    return {
      type: ELEMENT_TYPE.UNKNOWN,
    };
  },

  _extendWithData: function(data, relation, sentence) {
    if (data.type === ELEMENT_TYPE.CLAIM) {
      const predicate = relation.predicate.verb;
      const startIndex = sentence.indexOf(predicate) + predicate.length;
      var claim = sentence.substr(startIndex).trim();
      data.claim = claim;
    } else if (data.type === ELEMENT_TYPE.EVIDENCE) {
      const predicate = relation.predicate.verb;
      const startIndex = sentence.indexOf(predicate) + predicate.length;
      var evidence = sentence.substr(startIndex).trim();
      data.evidence = evidence;
    } 

    return data;
  },

  _arraysEqual: function(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  },

};

// console.log("Beginning of Sapiens test");

// const sentence = "the study shows that people should be doing things.";
// Sapiens.analyzeSentence(sentence);

// console.log("End of Sapiens test");

