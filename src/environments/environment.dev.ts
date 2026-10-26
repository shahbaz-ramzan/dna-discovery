// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    base_url:
        'https://devapimanagementenvironment.azure-api.net/dev-private-api/',
    no_auth_url:
        'https://devapimanagementenvironment.azure-api.net/token-less-api/',
    hosting_url: 'https://devdiscovery.dnabehavior.com/',

    SignIn:
        'https://dnabehaviorB2C.b2clogin.com/dnabehaviorB2C.onmicrosoft.com/B2C_1_SignIn',
    SignUp:
        'https://dnabehaviorB2C.b2clogin.com/dnabehaviorB2C.onmicrosoft.com/B2C_1_SignUp',
    authorityDomain: 'dnabehaviorB2C.b2clogin.com',
    endpoint: 'https://devapimanagementenvironment.azure-api.net/',
    client_id: '8a1c1481-bd6b-4179-9183-1b98d886c58d',
    mixpanelToken: '16fb9df04f459bcf33c41f024c475df0',
    scope:
        'https://dnabehaviorB2C.onmicrosoft.com/8a1c1481-bd6b-4179-9183-1b98d886c58d/user.read',
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
