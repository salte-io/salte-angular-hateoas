import salteAngularHateoas from '../../src/salte-angular-hateoas.module.js';
import { expect } from 'chai';

describe('hateoas-interceptor', () => {
    let hateoasInterceptor, $httpBackend, $http, $rootScope, data;
    const headers = { 'Content-Type': 'application/hal+json' };
    beforeEach(angular.mock.module(salteAngularHateoas));
    beforeEach(angular.mock.inject.strictDi(true));
    beforeEach(angular.mock.inject((_hateoasInterceptor_, _$httpBackend_, _$http_, _$rootScope_) => {
        hateoasInterceptor = _hateoasInterceptor_;
        $httpBackend = _$httpBackend_;
        $http = _$http_;
        $rootScope = _$rootScope_;
    }));

    it('should be defined', () => {
        expect(hateoasInterceptor).to.not.be.undefined;
    });

    describe('Function: TransformHalResponse', () => {
        describe('Scenario: Embedded List', () => {
            beforeEach(() => {
                $httpBackend.whenGET('/api/locations').respond(200, {
                    '_embedded': {
                        'locationList': [{
                            'locationId': 1,
                            '_links': {
                                'self': {
                                    'href': '/api/locations/1'
                                }
                            }
                        }]
                    },
                    '_links': {
                        'self': {
                            'href': '/api/locations'
                        }
                    }
                }, headers);
                $http.get('/api/locations').then(hateoasInterceptor.response).then((response) => data = response);
                $httpBackend.flush();
            });

            it('should be defined', () => {
                expect(data).to.not.be.undefined;
                expect(data.$get).to.not.be.undefined;
            });

            it('should not support embedded via $get', () => {
                data.$get('locationList').catch((error) => {
                    expect(error).to.not.be.undefined;
                });
                $rootScope.$apply();
            });

            it('should support embedded', () => {
                data.$embedded('locationList').then((locationList) => {
                    expect(locationList).to.not.be.undefined;
                    expect(locationList[0]).to.not.be.undefined;
                    expect(locationList[0].$get).to.not.be.undefined;
                });
                $rootScope.$apply();
            });

            it('should support links', () => {
                data.$get('self').then(hateoasInterceptor.response).then((location) => {
                    expect(location).to.not.be.undefined;
                    expect(location.$get).to.not.be.undefined;
                    expect(location).to.deep.equal(data);
                });
                $httpBackend.flush();
            });
        });

        describe('Scenario: Embedded Object', () => {
            beforeEach(() => {
                $httpBackend.whenGET('/api/locations').respond(200, {
                    '_embedded': {
                        'location': {
                            'locationId': 1,
                            '_links': { 'self': { 'href': '/api/locations/1' } }
                        }
                    },
                    '_links': { 'self': { 'href': '/api/locations' } }
                }, headers);
                $http.get('/api/locations').then(hateoasInterceptor.response).then((response) => data = response);
                $httpBackend.flush();
            });

            it('should be defined', () => {
                expect(data).to.not.be.undefined;
                expect(data.$get).to.not.be.undefined;
            });

            it('should support embedded', () => {
                data.$embedded('location').then((location) => {
                    expect(location).to.not.be.undefined;
                    expect(location.$get).to.not.be.undefined;
                });
                $rootScope.$apply();
            });

            it('should support links', () => {
                data.$get('self').then(hateoasInterceptor.response).then((locations) => {
                    expect(locations).to.not.be.undefined;
                    expect(locations.$get).to.not.be.undefined;
                    expect(locations).to.deep.equal(data);
                });
                $httpBackend.flush();
            });
        });

        describe('Scenario: Solo List', () => {
            beforeEach(() => {
                $httpBackend.whenGET('/api/locations').respond(200, {
                    'locationList': {
                        'locationId': 1,
                        '_links': { 'self': { 'href': '/api/locations/1' } }
                    },
                    '_links': { 'self': { 'href': '/api/locations' } }
                }, headers);
                $http.get('/api/locations').then(hateoasInterceptor.response).then((response) => data = response);
                $httpBackend.flush();
            });

            it('should be defined', () => {
                expect(data).to.not.be.undefined;
                expect(data.$get).to.not.be.undefined;
            });

            it('should not support embedded', () => {
                data.$get('location').catch((error) => expect(error).to.not.be.undefined);
                $rootScope.$apply();
            });

            it('should support links', () => {
                data.$get('self').then(hateoasInterceptor.response).then((locations) => {
                    expect(locations).to.not.be.undefined;
                    expect(locations.$get).to.not.be.undefined;
                    expect(locations).to.deep.equal(data);
                });
                $httpBackend.flush();
            });
        });

        describe('Scenario: Solo Object', () => {
            beforeEach(() => {
                $httpBackend.whenGET('/api/locations/1').respond(200, {
                    'locationId': 1,
                    '_links': { 'self': { 'href': '/api/locations/1' } }
                }, headers);
                $http.get('/api/locations/1').then(hateoasInterceptor.response).then((response) => data = response);
                $httpBackend.flush();
            });

            it('should be defined', () => {
                expect(data).to.not.be.undefined;
                expect(data.$get).to.not.be.undefined;
            });

            it('should not support embedded', () => {
                data.$get('location').catch((error) => expect(error).to.not.be.undefined);
                $rootScope.$apply();
            });

            it('should support links', () => {
                data.$get('self').then(hateoasInterceptor.response).then((locations) => {
                    expect(locations).to.not.be.undefined;
                    expect(locations.$get).to.not.be.undefined;
                    expect(locations).to.deep.equal(data);
                });
                $httpBackend.flush();
            });
        });
    });
});