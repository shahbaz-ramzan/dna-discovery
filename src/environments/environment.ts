// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    base_url: 'https://apimuatenvironment.azure-api.net/qa-private-api/',
    no_auth_url: 'https://apimuatenvironment.azure-api.net/private-no-auth/',
    hosting_url: 'https://qadiscovery.dnabehavior.com/',

    SignIn:
        'https://qadnabehavior.b2clogin.com/qadnabehavior.onmicrosoft.com/B2C_1_SignIn',
    SignUp:
        'https://qadnabehavior.b2clogin.com/qadnabehavior.onmicrosoft.com/B2C_1_SignUp',
    authorityDomain: 'qadnabehavior.b2clogin.com',
    endpoint: 'https://apimuatenvironment.azure-api.net/',
    client_id: 'f1d76d95-10bc-4b5b-8409-33130c1d1418',
    mixpanelToken: '16fb9df04f459bcf33c41f024c475df0',
    scope:
        'https://qadnabehavior.onmicrosoft.com/f1d76d95-10bc-4b5b-8409-33130c1d1418/user.read',
    timeout: 30000,
    azureTableUrl: 'https://sauatenvironment.table.core.windows.net',
    azureSharedAccessKey:
        '<AZURE_SAS_TOKEN>'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
