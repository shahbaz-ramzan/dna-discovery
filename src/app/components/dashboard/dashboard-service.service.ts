import { Injectable } from '@angular/core';
import K from 'src/app/constants';
import { NetworkService } from 'src/app/service/network.service';
import { DashboardRequests } from 'src/app/service/requests/dashboard-requests';

@Injectable({
    providedIn: 'root'
})
export class DashboardServiceService {
    constructor(private networkService: NetworkService) {}

    // ======== API Calls ==============

    getUniqueStyleandDescription(personId: string, languageId: string) {
        return this.networkService.httpCall(
            DashboardRequests.getUniqueStyleandDescription(personId, languageId)
        );
    }

    getSubscriptionFeatures(accountId: string) {
        return this.networkService.httpCall(
            DashboardRequests.getSubscriptionFeatures(accountId)
        );
    }

    getBDNADashboardSetting(selfRegistrationId: string, accountId: string) {
        return this.networkService.httpCall(
            DashboardRequests.getBDNADashboardSetting(
                selfRegistrationId,
                accountId
            )
        );
    }

    getFDNADashboardSetting(selfRegistrationId: string, accountId: string) {
        return this.networkService.httpCall(
            DashboardRequests.getFDNADashboardSetting(
                selfRegistrationId,
                accountId
            )
        );
    }

    getPerformanceGuide(personId: string, languageId: string) {
        return this.networkService.httpCall(
            DashboardRequests.getPerformanceGuide(personId, languageId)
        );
    }

    getVideoUrl(personId: string) {
        return this.networkService.httpCall(
            DashboardRequests.getVideoUrl(personId)
        );
    }

    getBDNA5Scores(personId: string, languageId: string) {
        return this.networkService.httpCall(
            DashboardRequests.getBDNA5Scores(personId, languageId)
        );
    }

    getFDNA5Scores(personId: string, languageId: string) {
        return this.networkService.httpCall(
            DashboardRequests.getFDNA5Scores(personId, languageId)
        );
    }

    getMarketMoodArray(personId: string, portfolioValue: string, date: string) {
        return this.networkService.httpCall(
            DashboardRequests.getMarketMoodArray(personId, portfolioValue, date)
        );
    }

    getBehavioralBiases(personId: string, languageId: string) {
        return this.networkService.httpCall(
            DashboardRequests.getBehavioralBiases(personId, languageId)
        );
    }

    getFDNAFinancialPlanningInsights(personId: string, languageId: string) {
        return this.networkService.httpCall(
            DashboardRequests.getFDNAFinancialPlanningInsights(
                personId,
                languageId
            )
        );
    }

    getRiskAllocation(personId: string) {
        return this.networkService.httpCall(
            DashboardRequests.getRiskAllocation(personId)
        );
    }

    getCustomReportNameCall(payload: any) {
        return this.networkService.httpCall(
            DashboardRequests.getCustomReportName(
                payload.accountId,
                payload.reportId
            )
        );
    }

    changeAccountPassword(credentials: any) {
        return this.networkService.httpCall(
            DashboardRequests.changeAccountPassword(credentials)
        );
    }

    changeInvestorPassword(credentials: any) {
        return this.networkService.httpCall(
            DashboardRequests.changeInvestorPassword(credentials)
        );
    }

    getCareerInsightsCall(personId: any) {
        return this.networkService.httpCall(
            DashboardRequests.getCareerInsights(personId)
        );
    }

    getBDNAUniqueStyleVideoLinks() {
        return this.networkService.httpCall(
            DashboardRequests.getBDNAUniqueStyleVideoLinks()
        );
    }

    getFDNAUniqueStyleVideoLinks() {
        return this.networkService.httpCall(
            DashboardRequests.getFDNAUniqueStyleVideoLinks()
        );
    }

    getTScore(personId: string) {
        return this.networkService.httpCall(
            DashboardRequests.getTScore(personId)
        );
    }

    getFactorRelationship() {
        return this.networkService.httpCall(
            DashboardRequests.getFactorRelationship()
        );
    }

    getCoachingReportTraitsData() {
        return this.networkService.httpCall(
            DashboardRequests.getCoachingReportTraitsData()
        );
    }

    // ======== Miscellaneous functions ==============

    parseFDNAandBDNAObjects(insightsRawData: any) {
        const insights: any[] = [];
        Object.keys(insightsRawData ?? []).forEach((ins: any) => {
            if (typeof insightsRawData[ins] === 'object') {
                const splittedTitle = ins.split(/(?=[A-Z])/).join(' ');
                const normalizedTitle =
                    splittedTitle.charAt(0).toUpperCase() +
                    splittedTitle.slice(1);
                const insObject = {
                    key: ins,
                    title: normalizedTitle,
                    ...insightsRawData[ins]
                };
                insights.push(insObject);
            }
        });

        return insights;
    }

    parseBehaviorBiasesList(behavioralBiases: any) {
        let biasesList: any[] = [];

        Object.keys(behavioralBiases ?? []).forEach((bIndex: any) => {
            if (typeof behavioralBiases[bIndex] === 'object')
                biasesList.push(behavioralBiases[bIndex]);
        });
        biasesList.sort((a: any, b: any) => b.population - a.population);
        return biasesList;
    }

    removeBoldTagFromMoodData(mood: any) {
        return mood?.map((moodData: any) => {
            return {
                heading: moodData.heading.replace(/<b>|<\/b>/g, ''),
                description: moodData.description
            };
        });
    }

    toDataURL(url: any, callback: any) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                const base64Image = reader.result
                    ?.toString()
                    .replace('application/octet-stream', 'image/jpeg');
                callback(base64Image);
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }
}
