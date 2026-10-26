// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: true,
    base_url: 'https://apimprodenvironment.azure-api.net/prod-private-api/',
    hosting_url: 'https://discovery.dnabehavior.com/',
    no_auth_url: 'https://apimprodenvironment.azure-api.net/private-no-auth/',

    SignIn:
        'https://proddnabehavior.b2clogin.com/proddnabehavior.onmicrosoft.com/B2C_1_SignIn',
    SignUp:
        'https://proddnabehavior.b2clogin.com/proddnabehavior.onmicrosoft.com/B2C_1_SignUp',
    authorityDomain: 'proddnabehavior.b2clogin.com',
    endpoint: 'https://apimprodenvironment.azure-api.net/',
    client_id: 'a90700f2-c540-41c1-90b7-278170352b41',
    mixpanelToken: '034436ef9c59bb73e7367087feb8643e',
    scope:
        'https://proddnabehavior.onmicrosoft.com/a90700f2-c540-41c1-90b7-278170352b41/user.read',
    timeout: 30000,
    azureTableUrl: 'https://saproddnabehavior.table.core.windows.net',
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
