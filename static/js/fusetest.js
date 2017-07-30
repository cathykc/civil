const COMMANDS_LIST = [
    {
        command: 'go_to_topic',
        triggers: [
            'go on to',
            'move on to',
            'go to the topic of',
            'start discussing',
            'go back to',
            'talk about',
            'discuss',
        ]
    },
    {
        command: 'new_topic_nested',
        triggers: [
            'within this topic let\'s discuss',
            'discuss subtopic',
            'talk about subtopic',
            'talk about subtopic of',
        ]
    },
    {
        command: 'next_topic',
        triggers: [
            'begin with the first topic',
            'next topic',
        ]
    }
];


const COMMANDS_OPTIONS = {
    shouldSort: true,
    includeScore: true,
    threshold: 1.0, // may want to vary this
    distance: 100,
    keys: ['triggers'],
};

const fuse = new Fuse(COMMANDS_LIST, COMMANDS_OPTIONS);
