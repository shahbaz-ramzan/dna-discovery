const AppConstants = {
    APP_NAME: 'DNA Behavior',
    APP_NAME_SHORT: 'DNA',

    ACCESS_TOKEN: 'accessToken',
    IS_LOGGED_IN: 'isLoggedIn',

    DATE_FORMAT: 'yyyy-dd-mm',

    // Field lengths
    MAX_NAME: 50,
    DIGITS: '^[0-9]*$',

    INVITE_STATUS_ACCEPTED: 1,
    INVITE_STATUS_AWAITING: 0,

    PACKAGE_ITEM_ID: 1006,

    RANGE_VALUES: [20, 80],

    USER_OBJECT: 'userObject',
    ACCOUNT_OBJECT: 'accountObject',
    PERMISSION_OBJECT: 'permissionObject',
    CREDIT_ID: 'creditId',
    REGISTRATION_ID: 'registrationId',
    // public static ACCOUNT_ID_LOCAL_STORAGE = "1125";

    ACCOUNT_ID: '1125',
    LOGGED_IN_PERSON_ID: 'loggedInPersonId',
    PERSON_ID: 'a016236a-9b36-48b6-b309-53e12c8b1b28',
    LANGUAGE_ID: '22',
    PROFILE_ID: '1',

    ACCOUNT_ID_KEY: 'accountId',

    DEFAULT_PRIMARY_COLOR: '#eead32',
    DEFAULT_SECONDARY_COLOR: '#2e9b64',
    DEFAULT_SECONDARY_COLOR2: '#1a3462',
    TUTORIAL_LINK: 'https://www.youtube.com/watch?v=LSXYz-2RH80',
    USER_NAME: 'userName',
    ENCRYPTION_KEY: '1666613865682', //time in millis
    REPORTS: {
        COMPARISON_REPORT_ID: 1,
        TEAM_REPORT_ID: 2,
        WORK_TALENT_REPORT_ID: 3,
        FINANCIAL_BEHAVIOR_REPORT_ID: 4
    },

    UNIQUE_STYLES: [
        {
            name: 'All',
            value: false
        },
        {
            name: 'Adapter',
            value: false,
            id: 5
        },
        {
            name: 'Initiating',
            value: false,
            id: 6
        },
        {
            name: 'Influencer',
            value: false,
            id: 7
        },
        {
            name: 'Strategist',
            value: false,
            id: 8
        },
        {
            name: 'Engager',
            value: false,
            id: 9
        },
        {
            name: 'Styles Thinker',
            value: false,
            id: 10
        },
        {
            name: 'Community Builder',
            value: false,
            id: 11
        },
        {
            name: 'Relationship Builder',
            value: false,
            id: 12
        },
        {
            name: 'Facilitator',
            value: false,
            id: 13
        },
        {
            name: 'Reflective Thinker',
            value: false,
            id: 14
        }
    ],
    STATUSES: [
        {
            name: 'All',
            value: false
        },
        {
            name: 'Scheduled',
            value: false
        },
        {
            name: 'In Progress',
            value: false
        },
        {
            name: 'Completed',
            value: false
        }
    ],
    COMPLETION_DATES: [
        {
            name: 'Anytime',
            value: false,
            inputId: 'anytime'
        },
        {
            name: 'Past Day',
            value: false,
            inputId: 'pastDay'
        },
        {
            name: 'Past Week',
            value: false,
            inputId: 'pastWeek'
        },
        {
            name: 'Past Month',
            value: false,
            inputId: 'pastMonth'
        },
        {
            name: 'Past Year',
            value: false,
            inputId: 'pastYear'
        },
        {
            name: 'Custom Range',
            value: false,
            inputId: 'customRange'
        }
    ],

    BY_FACTORS: [
        { name1: 'Cooperative', rangeValues: [20, 80], name2: 'Take Charge' },
        { name1: 'Reserved', rangeValues: [20, 80], name2: 'Outgoing' },
        { name1: 'Fast-Paced', rangeValues: [20, 80], name2: 'Patient' },
        { name1: 'Spontaneous', rangeValues: [20, 80], name2: 'Planned' },
        { name1: 'Skeptical', rangeValues: [20, 80], name2: 'Trusting' },
        { name1: 'Content', rangeValues: [20, 80], name2: 'Pioneer' },
        { name1: 'Cautious', rangeValues: [20, 80], name2: 'Risk-Taker' },
        { name1: 'Anchored', rangeValues: [20, 80], name2: 'Creative' }
    ],

    BY_SUB_FACTORS: [
        {
            name1: 'Consensus-seeking',
            rangeValues: [20, 80],
            name2: 'Authoritative'
        },
        {
            name1: 'Group-oriented',
            rangeValues: [20, 80],
            name2: 'Self-reliant'
        },
        { name1: 'Diplomatic', rangeValues: [20, 80], name2: 'Frank' },
        { name1: 'Serious', rangeValues: [20, 80], name2: 'Expressive' },
        { name1: 'Reflective', rangeValues: [20, 80], name2: 'Sociable' },
        { name1: 'Quiet', rangeValues: [20, 80], name2: 'Communicative' },
        { name1: 'Rational', rangeValues: [20, 80], name2: 'Empathetic' },
        {
            name1: 'Task-focused',
            rangeValues: [20, 80],
            name2: 'Encouraging'
        },
        { name1: 'Confronting', rangeValues: [20, 80], name2: 'Accepting' },
        { name1: 'Generalist', rangeValues: [20, 80], name2: 'Accurate' },
        { name1: 'Improviser', rangeValues: [20, 80], name2: 'Scheduled' },
        {
            name1: 'Instinctive',
            rangeValues: [20, 80],
            name2: 'Persistent'
        },
        { name1: 'Controlling', rangeValues: [20, 80], name2: 'Delegator' },
        { name1: 'Suspicious', rangeValues: [20, 80], name2: 'Open' },
        {
            name1: 'Questioning',
            rangeValues: [20, 80],
            name2: 'Approachable'
        },
        { name1: 'Exacting', rangeValues: [20, 80], name2: 'Relaxed' },
        { name1: 'Steady', rangeValues: [20, 80], name2: 'Initiating' },
        { name1: 'Balanced', rangeValues: [20, 80], name2: 'Competitive' },
        { name1: 'Flexible', rangeValues: [20, 80], name2: 'Determined' },
        { name1: 'Careful', rangeValues: [20, 80], name2: 'Bold' },
        { name1: 'Stable', rangeValues: [20, 80], name2: 'Risk Tolerant' },
        {
            name1: 'Experience-based',
            rangeValues: [20, 80],
            name2: 'Original'
        },
        {
            name1: 'Practical',
            rangeValues: [20, 80],
            name2: 'Enterprising'
        },
        { name1: 'Left-brain', rangeValues: [20, 80], name2: 'Right-brain' }
    ],

    FACTOR_KEYS: [
        'commanding5Tscore',
        'people6Tscore',
        'patience7Tscore',
        'structure8Tscore',
        'trust9V2Tscore',
        'pioneering10Tscore',
        'risk11Tscore',
        'creativity12Tscore'
    ],

    SUB_FACTOR_KEYS: [
        'selfReliant14Tscore',
        'frank15Tscore',
        'expressive16Tscore',
        'sociable17Tscore',
        'communicative18Tscore',
        'empathetic19Tscore',
        'encouraging20Tscore',
        'accepting21Tscore',
        'accurate22Tscore',
        'scheduled23Tscore',
        'persistent24Tscore',
        'delegator25Tscore',
        'open26Tscore',
        'approachable27Tscore',
        'relaxed28Tscore',
        'initiating29Tscore',
        'competitive30Tscore',
        'determined31Tscore',
        'bold32Tscore',
        'riskTolerant33Tscore',
        'original34Tscore',
        'enterprising35Tscore',
        'rightBrain36Tscore'
    ],

    LANGUAGES: [
        { id: 22, name: 'English' },
        { id: 1, name: 'Urdu' },
        { id: 2, name: 'Chinese' }
    ],

    REPORT_TYPES: [
        { name: 'Financial' },
        { name: 'Talent' },
        { name: 'Investment' }
    ],
    FACTORS_16_DESCRIPTIONS: {
        Outgoing:
            'Enjoys new ideas, expresses view, uses a networking approach',
        Creative: 'Explores possibilities, innovative, driven by ideas',
        'Take Charge':
            'Definite in approach, visionary in thinking, focused on outcomes',
        'Risk-Taker': 'Venturesome, takes chances, optimistic',
        Spontaneous: 'Free-flowing, high level approach, instinctive',
        Content: 'Easy-going, satisfied, uncomplaining',
        Planned: 'Structured, task focused, analytical in approach',
        Pioneer: 'Sets direction, ambitious, committed to goals',
        Reserved: 'Analyzes, has high propensity to reflect, guarded',
        Anchored:
            'Prefers proven methods, solution driven, focused on execution',
        Patient: 'Sympathetic, relationship-driven, supporting',
        'Fast-Paced': 'Objective, results driven, rational',
        Trusting: 'Receptive, believing, forgiving',
        Cautious: 'Seeks stability, prefers following proven paths',
        Skeptical: 'Questioning, guarded, wary',
        Cooperative: 'Cooperative, flexible in approach, fits in well'
    },

    UNIQUE_STYLE_THUMBNAIL: <any>{
        Facilitator: 'assets/images/facilitator.png',
        Adapter: 'assets/images/adapter.png',
        Strategist: 'assets/images/strategist.png',
        Influencer: 'assets/images/influencer.png',
        'Community Builder': 'assets/images/communityBuilder.png',
        Engager: 'assets/images/engager.png',
        'Stylish Thinker': 'assets/images/stylishThinker.png',
        Initiator: 'assets/images/initiator.png',
        'Reflective Thinker': 'assets/images/refelectiveThinker.png',
        'Relationship Builder': 'assets/images/relationshipBuilder.png'
    },

    BEHAVIORAL_BIASES_VIDEOS: <any>{
        'Mental Accounting': 'https://www.youtube.com/embed/dXTN-6_3ZzM',
        'Over Confidence': 'https://www.youtube.com/embed/YEo-ZAJUQeE',
        'Status Quo Bias': 'https://www.youtube.com/embed/R3GZEnnr110',
        Instinctive: 'https://www.youtube.com/embed/ilMJb_Vqcyc',
        'Pattern Bias': 'https://www.youtube.com/embed/i-7gjDnOe7U',
        'Over Trading': 'https://www.youtube.com/embed/cG07wyIxJTM',
        'Benchmark Focus': 'https://www.youtube.com/embed/o6p_TFuMtfU',
        'Optimism Bias': 'https://www.youtube.com/embed/fp5kmpMcbQo',
        'Disposition Effect': 'https://www.youtube.com/embed/wzAQMhzbjSc',
        Controlling: 'https://www.youtube.com/embed/iCHtow_eTjo',
        'Consolidated View': 'https://www.youtube.com/embed/v-Bm3EdpkFM',
        'Newness Bias': 'https://www.youtube.com/embed/SybRXV6q9pU',
        'Risk Aversion': 'https://www.youtube.com/embed/IOzqI_uxgo8',
        'Herd Follower': 'https://www.youtube.com/embed/ojEoDAb1QCo',
        'Fear of Regret': 'https://www.youtube.com/embed/FjwDh31igVk',
        'Loss Aversion': 'https://www.youtube.com/embed/680TEpQSU5w'
    },

    PERSONS_LIST: [
        {
            personID: '6ee4ef18-2550-4caf-9b5a-15145abf57d4',
            firstName: 'Shweta',
            lastName: 'Chafale',
            uniqueStyle: 'Facilitator',
            accountName: 'DNABehavior',
            profilePictureUrl: ''
        },
        {
            personID: '68b3c5e4-378c-4811-8ed3-7f55c1f71f4c',
            firstName: 'API',
            lastName: 'ReflectiveThinker',
            uniqueStyle: 'Reflective Thinker',
            accountName: 'DNABehavior',
            profilePictureUrl: ''
        },
        {
            personID: '162c9482-cb06-4430-b39e-41103fee24e6',
            firstName: 'API',
            lastName: 'Engager',
            uniqueStyle: 'Engager',
            accountName: 'DNABehavior',
            profilePictureUrl: ''
        },
        {
            personID: '5bc7bc36-6e87-4737-9ee2-e343feb42715',
            firstName: 'API',
            lastName: 'Engager',
            uniqueStyle: 'Engager',
            accountName: 'DNABehavior',
            profilePictureUrl: ''
        },
        {
            personID: '5a174c80-1e38-49ea-94b8-5ce5adad8301',
            firstName: 'API',
            lastName: 'Initiator',
            uniqueStyle: 'Initiator',
            accountName: 'DNABehavior',
            profilePictureUrl: ''
        },
        {
            personID: 'a25a4158-9514-4ddb-973f-95524be7063d',
            firstName: 'API',
            lastName: 'Engager',
            uniqueStyle: 'Engager',
            accountName: 'DNABehavior',
            profilePictureUrl: ''
        },
        {
            personID: 'd5a36a94-9336-439b-930f-f95bf8a0ea93',
            firstName: 'API',
            lastName: 'RelationshipBuilder',
            uniqueStyle: 'Relationship Builder',
            accountName: 'DNABehavior',
            profilePictureUrl: ''
        },
        {
            personID: '66e6f678-c56b-425f-9041-4279909745eb',
            firstName: 'API',
            lastName: 'RelationshipBuilder',
            uniqueStyle: 'Relationship Builder',
            accountName: 'DNABehavior',
            profilePictureUrl: ''
        },
        {
            personID: '237ab7d1-c677-4af7-9cd6-5234f9624420',
            firstName: 'API',
            lastName: 'RelationshipBuilder',
            uniqueStyle: 'Relationship Builder',
            accountName: 'DNABehavior',
            profilePictureUrl: ''
        },
        {
            personID: '4105bf13-3eac-42a6-a2a4-193a02e4d603',
            firstName: 'Abhishek',
            lastName: 'Singh',
            uniqueStyle: 'Facilitator',
            accountName: 'DNABehavior',
            profilePictureUrl: ''
        }
    ]
};

export default AppConstants;
