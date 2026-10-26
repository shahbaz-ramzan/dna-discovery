// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    base_url:
        'https://apimsandboxenvironment.azure-api.net/sandbox-private-api/',
    hosting_url: 'https://sandboxdiscovery.dnabehavior.com/',
    no_auth_url:
        'https://apimsandboxenvironment.azure-api.net/private-no-auth/',

    SignIn:
        'https://sandboxdnabehavior.b2clogin.com/sandboxdnabehavior.onmicrosoft.com/B2C_1_SignIn',
    SignUp:
        'https://sandboxdnabehavior.b2clogin.com/sandboxdnabehavior.onmicrosoft.com/B2C_1_SignUp',
    authorityDomain: 'sandboxdnabehavior.b2clogin.com',
    endpoint: 'https://apimsandboxenvironment.azure-api.net/',
    client_id: '2f4f928c-9f8b-45f9-a1f6-0467b51900b2',
    mixpanelToken: '034436ef9c59bb73e7367087feb8643e',
    scope:
        'https://sandboxdnabehavior.onmicrosoft.com/2f4f928c-9f8b-45f9-a1f6-0467b51900b2/user.read',
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
