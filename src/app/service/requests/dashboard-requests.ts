import { Component, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import K from 'src/app/constants/index';
import { NetworkService } from 'src/app/service/network.service';
import Request from 'src/app/service/requests';
@Injectable({
    providedIn: 'root'
})
export class DashboardRequests extends Request {
    constructor(@Inject('params') private params: any) {
        super(params);
    }

    static getUniqueStyleandDescription(personId: string, languageId: string) {
        return new Request(
            K.NETWORK.URL.GET_UNIQUE_STYLE_AND_DESCRIPTION +
                '/' +
                personId +
                '/' +
                languageId,
            K.NETWORK.METHOD.GET
        );
    }

    static getSubscriptionFeatures(accountId: string) {
        return new Request(
            K.NETWORK.URL.GET_SUBSCRIPTION_FEATURES + '/' + accountId,
            K.NETWORK.METHOD.GET
        );
    }

    static getBDNADashboardSetting(
        selfRegistrationId: string,
        accountId: string
    ) {
        return new Request(
            K.NETWORK.URL.GET_BDNA_DASHBOARD_SETTING +
                '/' +
                selfRegistrationId +
                '/' +
                accountId,
            K.NETWORK.METHOD.GET
        );
    }

    static getFDNADashboardSetting(
        selfRegistrationId: string,
        accountId: string
    ) {
        return new Request(
            K.NETWORK.URL.GET_FDNA_DASHBOARD_SETTING +
                '/' +
                selfRegistrationId +
                '/' +
                accountId,
            K.NETWORK.METHOD.GET
        );
    }

    static getPerformanceGuide(personId: string, languageId: string) {
        return new Request(
            K.NETWORK.URL.GET_PERFORMANCE_GUIDE +
                '/' +
                personId +
                '/' +
                languageId,
            K.NETWORK.METHOD.GET
        );
    }

    static getVideoUrl(personId: string) {
        return new Request(
            K.NETWORK.URL.GET_VIDEO_URL + '/' + personId,
            K.NETWORK.METHOD.GET
        );
    }

    static getBDNA5Scores(personId: string, languageId: string) {
        return new Request(
            K.NETWORK.URL.GET_BDNA5_SCORE + '/' + personId + '/' + languageId,
            K.NETWORK.METHOD.GET
        );
    }

    static getFDNA5Scores(personId: string, languageId: string) {
        return new Request(
            K.NETWORK.URL.GET_FDNA5_SCORE + '/' + personId + '/' + languageId,
            K.NETWORK.METHOD.GET
        );
    }

    static getMarketMoodArray(
        personId: string,
        portfolioValue: string,
        date: string
    ) {
        return new Request(
            K.NETWORK.URL.GET_MARKET_MOOD_ARRAY +
                '/' +
                personId +
                '/' +
                portfolioValue +
                '/' +
                date,
            K.NETWORK.METHOD.GET
        );
    }

    static getBehavioralBiases(personId: string, languageId: string) {
        return new Request(
            K.NETWORK.URL.GET_BEHAVIORAL_BIASES +
                '/' +
                personId +
                '/' +
                languageId,
            K.NETWORK.METHOD.GET
        );
    }

    static getFDNAFinancialPlanningInsights(
        personId: string,
        languageId: string
    ) {
        return new Request(
            K.NETWORK.URL.GET_FDNA_FINANCIAL_PLANNING_INSIGHTS +
                '/' +
                personId +
                '/' +
                languageId,
            K.NETWORK.METHOD.GET
        );
    }

    static getRiskAllocation(personId: string) {
        return new Request(
            K.NETWORK.URL.GET_RISK_ALLOCATION + '/' + personId,
            K.NETWORK.METHOD.GET
        );
    }

    static getCustomReportName(accountId: any, reportId: any) {
        return new Request(
            K.NETWORK.URL.GET_CUSTOM_REPORT + '/' + accountId + '/' + reportId,
            K.NETWORK.METHOD.GET
        );
    }

    static changeAccountPassword(credentials: any) {
        return new Request(
            K.NETWORK.URL.CHANGE_ACCOUNT_PASSWORD,
            K.NETWORK.METHOD.POST,
            credentials
        );
    }

    static changeInvestorPassword(credentials: any) {
        return new Request(
            K.NETWORK.URL.CHANGE_INVESTOR_PASSWORD,
            K.NETWORK.METHOD.POST,
            credentials
        );
    }

    static getCareerInsights(personId: any) {
        return new Request(
            K.NETWORK.URL.GET_CAREERS_INSIGHTS + '/' + personId,
            K.NETWORK.METHOD.GET
        );
    }

    static getBDNAUniqueStyleVideoLinks() {
        const request = new Request(
            '',
            K.NETWORK.METHOD.GET,
            undefined,
            true,
            {}
        );
        request.url = `${K.NETWORK.URL.AZURE_TABLE_API}/BDNAUniqueStyleVideoLinks${K.NETWORK.URL.AZURE_SHARED_ACCESS_KEY}`;
        request.headers = request.headers.delete('Authorization');
        return request;
    }

    static getFDNAUniqueStyleVideoLinks() {
        const request = new Request(
            '',
            K.NETWORK.METHOD.GET,
            undefined,
            true,
            {}
        );
        request.url = `${K.NETWORK.URL.AZURE_TABLE_API}/FDNAUniqueStyleVideoLinks${K.NETWORK.URL.AZURE_SHARED_ACCESS_KEY}`;
        request.headers = request.headers.delete('Authorization');
        return request;
    }

    static getTScore(personId: string) {
        return new Request(
            K.NETWORK.URL.GET_TSCORE + '/' + personId,
            K.NETWORK.METHOD.GET
        );
    }

    static getFactorRelationship() {
        const request = new Request(
            '',
            K.NETWORK.METHOD.GET,
            undefined,
            true,
            {}
        );
        request.url = `${K.NETWORK.URL.AZURE_TABLE_API}/FactorRelationshipTable${K.NETWORK.URL.AZURE_SHARED_ACCESS_KEY}`;
        request.headers = request.headers.delete('Authorization');
        return request;
    }

    static getCoachingReportTraitsData() {
        const request = new Request(
            '',
            K.NETWORK.METHOD.GET,
            undefined,
            true,
            {}
        );
        request.url = `${K.NETWORK.URL.AZURE_TABLE_API}/CoachingReportTraitsTableV1${K.NETWORK.URL.AZURE_SHARED_ACCESS_KEY}`;
        request.headers = request.headers.delete('Authorization');
        return request;
    }
}
