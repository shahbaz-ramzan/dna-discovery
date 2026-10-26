import { environment } from 'src/environments/environment';

const BASE_DNA_API_URL = environment.base_url;
const DNA_TIMEOUT = environment.timeout;
const AZURE_TABLE_URL = environment.azureTableUrl;
const AZURE_SHARED_ACCESS_KEY = environment.azureSharedAccessKey;
const NO_AUTH_API_URL = environment.no_auth_url;

const NetworkConstants = {
    URL: {
        // Base
        BASE_API: BASE_DNA_API_URL,
        NO_AUTH_API: NO_AUTH_API_URL,
        TIMEOUT: DNA_TIMEOUT,
        // Self Registration
        GET_GROUP_SETTINGS: 'Accounts/GetSelfRegistrationLink',
        GET_GROUP_PACKAGE_ACCESS: 'Accounts/GetSubscriptionFeaturesByAccountId',
        SELF_REGISTER_USER: 'Discovery/SelfRegister',
        USER_API_REGISTRATION: 'Accounts/Register',
        AZURE_TABLE_API: AZURE_TABLE_URL,
        AZURE_SHARED_ACCESS_KEY: AZURE_SHARED_ACCESS_KEY,

        //Instructions
        GET_CREDIT_ID: 'Discovery/GetPersonCreditID',
        USER_SCHEDULE_DISCOVERY: 'Discovery/ScheduleDiscovery',
        GET_DISCOVERY_STATUS: 'Discovery/GetDiscoveryStatus',

        //Welcome
        GET_ACCOUNT_DETAILS:
            'Accounts/GetAccountDetailsByAccountIdandSelfregId',
        VALIDATE_REGISTRATION_LINK: 'Discovery/ValidateSelfRegistrationLink',
        GET_SELF_REGISTRATION_DETAILS:
            'Participants/GetParticipantSelfRegistrationDetail',
        EMAIL_OPT_OUT: 'Discovery/UnsubscribeDiscoveryCompletionEmail',
        GET_CUSTOM_WELCOME_DETAIL: 'Accounts/GetAccountCustomWelcomeDetails',

        // Questionnaire
        GET_QUESTIONS_LIST: 'Discovery/GetQuestions',
        GET_QUESTION_ANSWER_STATUS: 'Discovery/GetQuestionAnswer',
        SAVE_QUESTION_ANSWER: 'Discovery/InsertQuestionAnswer',

        // Login
        VALIDATE_DNA_ADMIN_USER: 'FDNAInvestor/ValidateDnabAdminUser',
        FORGOT_PASSWORD: 'FDNAInvestor/SendForgotPassword',

        // == Dashboard =====
        GET_CAREERS_INSIGHTS: 'NaturalBehavior/GetHiringDataArray',
        GET_UNIQUE_STYLE_AND_DESCRIPTION:
            'NaturalBehavior/GetUniqueStyleAndDescription',
        GET_SUBSCRIPTION_FEATURES:
            'Accounts/GetSubscriptionFeaturesByAccountId', // in place of GetPackageAccess
        // GET_REPORTS_DISCOVERY_ID: "GetReportsByDiscoveryID", // Ignore
        GET_BDNA_DASHBOARD_SETTING: 'Discovery/GetBDNADashboardSetting',
        GET_FDNA_DASHBOARD_SETTING: 'Discovery/GetFDNADashboardSetting',
        GET_PERFORMANCE_GUIDE: 'NaturalBehavior/GetPerformanceGuideArray',
        GET_VIDEO_URL: 'Discovery/GetVideoUrl',
        GET_BDNA5_SCORE: 'NaturalBehavior/GetBDNA5Scores',
        GET_BDNA_DESIRED_TALENTS: 'GetBDNADesiredTalents', // NOT FOUND. Only used in talent app - Ryan said ignore this
        // not in talent but in investor app
        GET_FDNA5_SCORE: 'NaturalBehavior/GetFDNA5Scores',
        // GET_FINANCIAL_BEHAVIOR_OVERVIEW: "GetInvestorFinancialBehaviorOverview", // Ignore
        GET_MARKET_MOOD_ARRAY: 'NaturalBehavior/GetMarketMoodArray',
        GET_BEHAVIORAL_BIASES: 'NaturalBehavior/GetBehavioralBiases',
        GET_FDNA_FINANCIAL_PLANNING_INSIGHTS:
            'NaturalBehavior/GetFDNAFinancialPlanningInsights',
        GET_RISK_ALLOCATION: 'NaturalBehavior/GetRiskAllocation',
        CHANGE_ACCOUNT_PASSWORD: 'Account/ChangePassword',
        CHANGE_INVESTOR_PASSWORD: 'FDNAInvestor/ChangePassword',
        GET_CUSTOM_REPORT:
            'CustomReports/GetCustomReportNameListByAccountIdByReportId',

        // Accounts
        GET_SUBSCRIPTION_NAME: 'Accounts/GetSubscriptionFeaturesByAccountId',
        UPDATE_USER_ROLE: 'UserRoles/SaveParticipantAccountUserRole',
        DELETE_USER: 'UserRoles/DeleteUserRoleFromAccount',
        GET_USER_ROLE_TYPES: 'UserRoles/ListUserRoleTypes',
        GET_PARTICIPANTS_DETAIL: 'ParticipantProfile/GetParticipantsDetails',
        GET_USER_ROLE_BY_ACCOUNT: 'UserRoles/ListUserRoleByAccountId',
        GET_LANGUAGE: 'Accounts/GetLanguage',
        GET_PARTICIPANT_LABELS: 'Accounts/GetParticipantLabels',
        GET_USER_LABELS: 'Accounts/GetUserLabels',
        // GET_MARKET_MOOD: "Accounts/GetMarketMoodPercent",
        GET_UNIQUE_STYLE_GRAPH: 'Accounts/GetUniqueStyleCount',
        GET_SELF_REGISTRATION_LINK: 'Accounts/ListSelfRegistrationLink',
        GET_SINGLE_SELF_REGISTRATION_LINK: 'Accounts/GetSelfRegistrationLink',
        // DELETE_SELF_REGISTRATION_LINK: 'Accounts/DeleteSelfRegistrationLink',
        SAVE_SELF_REGISTRATION_LINK: 'Accounts/SaveSelfRegistrationLink',
        // EDIT_SELF_REGISTRATION_LINK: 'Accounts/UpdateSelfRegistrationLink',
        GET_FACILITATORS: 'Accounts/GetFacilitatorByAccount',
        GET_ALL_ACCOUNTS: 'Accounts/GetListOfAccountByPersonId',
        GET_MANAGE_TAGS: 'Tag/GetTags',
        UPSERT_TAG: 'Tag/UpsertTag',
        // DELETE_TAG: 'Tag/DeleteTag',
        UPSERT_ASSOCIATED_TAG_BY_ACCOUNT: 'Tag/UpsertAssociateTagByAccount',
        UPSERT_PARTICIPANT_TO_FACILITATOR_BY_ACCOUNT:
            'Accounts/UpsertParticipanttoFacilitatorByAccount',
        GET_ACCOUNT_COLOR: 'Accounts/GetAccountColor',
        GET_LAST_COMPLETIONS: 'Accounts/Get30DaysDiscoveryCompletionByAccount',
        GET_RECENT_ACTIVITIES: 'Accounts/GetDiscoveryCompletionCountByAccount',

        GET_UPDATE_COLOR: 'Accounts/UpsertColor',
        UPLOAD_PROFILE_PICTURE: 'ParticipantProfile/UploadProfilePicture',
        UPLOAD_ACCOUNT_LOGO: 'CoBranding/UploadAccountLogo',
        GET_SUBSCRIPTION_ACCOUNT: 'Chargify/GetSubscriptionAccount',
        GET_SUBSCRIPTION_DETAILS: 'Chargify/GetSubscriptionUrlDetails',
        EDIT_ACCOUNT_DETAILS: 'Accounts/UpdateAccountDetails',
        // User Analytics.
        // GET_MARKET_MOOD_ARRAY: "NaturalBehavior/GetMarketMoodArray",
        GET_RISK_BEHAVIOR: 'NaturalBehavior/GetRiskAllocation',
        GET_FDNA_SCORE: 'NaturalBehavior/GetFDNA5Scores',
        GET_WORK_STYLE_MATCH: 'ParticipantProfile/GetStyleMatch',
        GET_FINANCIAL_STYLE_MATCH: 'ParticipantProfile/GetStyleMatch',
        GET_TSCORE: 'NaturalBehavior/GetAssessmentResultsArray',
        GET_BEHAVIRAL_BIASES: 'NaturalBehavior/GetBehavioralBiasesArray',
        GET_WORKPLACE_INSIGHT: 'NaturalBehavior/GetBDNAWorkplaceInsightsArray',
        GET_WORK_TALENTS: 'NaturalBehavior/GetBDNA5Scores',
        GET_ENVIRONMENT_KEYS: 'NaturalBehavior/GetPerformanceGuideArray',
        GET_STRONGEST_FACTOR: 'NaturalBehavior/GetAssessmentResultsArray',
        GET_USERS_LIST: 'Participant/SearchParticipantByAccount',
        GET_PROFILE_PICTURE: 'ParticipantProfile/GetProfilePicture',
        GET_MARKET_DATA: 'NaturalBehavior/GetMarketData',
        UPDATE_ACCOUNT_DETAILS: 'Accounts/UpdateAccountDetails',
        // UPDATE_PROFILE: 'User/UpdateClientDetails',
        INVITE_NEW_USERS: '...',
        GET_ACCOUNT_SUBSCRIPTION_DETAILS:
            'Chargify/GetAccountSubscriptionDetails',
        GET_LEGAL_TEXT: 'Accounts/GetLegalText'
    },
    METHOD: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE'
    },
    HEADER: {
        CONTENT_TYPE: 'Content-Type',
        APPLICATION_JSON: 'application/json',
        DEFAULT: (token = '') => ({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
        }),
        NOT_AUTHORIZED: () => ({
            'Content-Type': 'application/json'
        }),
        TYPE: {
            JSON: 'json',
            FILE: 'file',
            FORM_DATA: 'multipart/form-data'
        }
    },
    DEFAULT: {
        ERROR: 'Opps, an error occurred!'
    },
    STATUS_CODE: {
        TIMED_OUT: 0,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        INVALID: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        CONFLICT: 409,
        SERVER_ERROR: 500,
        SERVICE_UNAVAILABLE: 503
    }
};
export default NetworkConstants;
