'use strict';

describe('Unit: hateoasInterceptor', () => {
    var hateoasInterceptor, $httpBackend, $http, $rootScope, data;
    var headers = { 'Content-Type': 'application/hal+json' };
    beforeEach(module('salte-angular-hateoas'));
    beforeEach(inject((_hateoasInterceptor_, _$httpBackend_, _$http_, _$rootScope_) => {
        hateoasInterceptor = _hateoasInterceptor_;
        $httpBackend = _$httpBackend_;
        $http = _$http_;
        $rootScope = _$rootScope_;
    }));

    it('should be defined', () => {
        expect(hateoasInterceptor).toBeDefined();
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
                expect(data).toBeDefined();
                expect(data.$get).toBeDefined();
            });

            it('should not support embedded via $get', () => {
                data.$get('locationList').catch((error) => {
                    expect(error).toBeDefined();
                });
                $rootScope.$apply();
            });

            it('should support embedded', () => {
                data.$embedded('locationList').then((locationList) => {
                    expect(locationList).toBeDefined();
                    expect(locationList[0]).toBeDefined();
                    expect(locationList[0].$get).toBeDefined();
                });
                $rootScope.$apply();
            });

            it('should support links', () => {
                data.$get('self').then(hateoasInterceptor.response).then((location) => {
                    expect(location).toBeDefined();
                    expect(location.$get).toBeDefined();
                    expect(location).toEqual(data);
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
                expect(data).toBeDefined();
                expect(data.$get).toBeDefined();
            });

            it('should support embedded', () => {
                data.$get('location').then((location) => {
                    expect(location).toBeDefined();
                    expect(location.$get).toBeDefined();
                });
                $rootScope.$apply();
            });

            it('should support links', () => {
                data.$get('self').then(hateoasInterceptor.response).then((locations) => {
                    expect(locations).toBeDefined();
                    expect(locations.$get).toBeDefined();
                    expect(locations).toEqual(data);
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
                expect(data).toBeDefined();
                expect(data.$get).toBeDefined();
            });

            it('should not support embedded', () => {
                data.$get('location').catch((error) => expect(error).toBeDefined());
                $rootScope.$apply();
            });

            it('should support links', () => {
                data.$get('self').then(hateoasInterceptor.response).then((locations) => {
                    expect(locations).toBeDefined();
                    expect(locations.$get).toBeDefined();
                    expect(locations).toEqual(data);
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
                expect(data).toBeDefined();
                expect(data.$get).toBeDefined();
            });

            it('should not support embedded', () => {
                data.$get('location').catch((error) => expect(error).toBeDefined());
                $rootScope.$apply();
            });

            it('should support links', () => {
                data.$get('self').then(hateoasInterceptor.response).then((locations) => {
                    expect(locations).toBeDefined();
                    expect(locations.$get).toBeDefined();
                    expect(locations).toEqual(data);
                });
                $httpBackend.flush();
            });
        });
    });
});
