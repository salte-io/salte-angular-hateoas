import angular from 'angular';
import { expect } from 'chai';

import mocks from '../mocks/mocks.js';
import salteAngularHateoas from '../../src/salte-angular-hateoas.module.js';

describe('hateoas-interceptor', () => {
  let $httpBackend, $http, $hateoasConfigProvider;
  const headers = { 'Content-Type': 'application/hal+json' };
  beforeEach(angular.mock.module(salteAngularHateoas, ($httpProvider, _$hateoasConfigProvider_) => {
    $httpProvider.interceptors.push('hateoasInterceptor');
    $hateoasConfigProvider = _$hateoasConfigProvider_;
  }));
  beforeEach(angular.mock.inject.strictDi(true));
  beforeEach(angular.mock.inject((_$httpBackend_, _$http_) => {
    $httpBackend = _$httpBackend_;
    $http = _$http_;
  }));

  describe('interceptor(response)', () => {
    it('should include hal content-types', (done) => {
      $httpBackend.whenGET('/api/locations').respond(200, mocks.embeddedLists, headers);
      $http.get('/api/locations').then((response) => {
        expect(response.$get).to.not.be.undefined;
        done();
      });
      $httpBackend.flush();
    });

    it('should ignore non-hal content-types', (done) => {
      $httpBackend.whenGET('/api/locations').respond(200, {
        'name': 'bob'
      });
      $http.get('/api/locations').then((response) => {
        expect(response.$get).to.be.undefined;
        expect(response.data).to.deep.equal({
          'name': 'bob'
        });
        done();
      });
      $httpBackend.flush();
    });
  });

  describe('link($link)', () => {
    it('should support embedded lists', (done) => {
      $httpBackend.whenGET('/api/locations').respond(200, mocks.embeddedLists, headers);
      $http.get('/api/locations').then((response) => {
        response.$link('self').then((link) => {
          expect(link).to.equal('/api/locations');
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should support an embedded object', (done) => {
      $httpBackend.whenGET('/api/locations').respond(200, mocks.embeddedObject, headers);
      $http.get('/api/locations').then((response) => {
        response.$link('self').then((link) => {
          expect(link).to.equal('/api/locations');
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should support solo lists', (done) => {
      $httpBackend.whenGET('/api/locations').respond(200, mocks.soloLists, headers);
      $http.get('/api/locations').then((response) => {
        response.$link('self').then((link) => {
          expect(link).to.equal('/api/locations');
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should support a solo object', (done) => {
      $httpBackend.whenGET('/api/locations').respond(200, mocks.soloObject, headers);
      $http.get('/api/locations').then((response) => {
        response.$link('self').then((link) => {
          expect(link).to.equal('/api/locations/1');
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should support no links', (done) => {
      $httpBackend.whenGET('/api/locations').respond(200, {
        'name': 'bob'
      }, headers);
      $http.get('/api/locations').then((response) => {
        response.$link('self').catch((error) => {
          expect(error).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });
  });

  describe('link($embedded)', () => {
    it('should support embedded lists', (done) => {
      $httpBackend.whenGET('/api/locations').respond(200, mocks.embeddedLists, headers);
      $http.get('/api/locations').then((response) => {
        response.$embedded('locationList').then((locationList) => {
          expect(locationList).to.not.be.undefined;
          expect(locationList[0]).to.not.be.undefined;
          expect(locationList[0].$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should support an embedded object', (done) => {
      $httpBackend.whenGET('/api/locations').respond(200, mocks.embeddedObject, headers);
      $http.get('/api/locations').then((response) => {
        response.$embedded('location').then((location) => {
          expect(location).to.not.be.undefined;
          expect(location.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should not support solo lists', (done) => {
      $httpBackend.whenGET('/api/locations').respond(200, mocks.soloLists, headers);
      $http.get('/api/locations').then((response) => {
        response.$embedded('location').catch((error) => {
          expect(error).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should not support a solo object', (done) => {
      $httpBackend.whenGET('/api/locations').respond(200, mocks.soloObject, headers);
      $http.get('/api/locations').then((response) => {
        response.$embedded('location').catch((error) => {
          expect(error).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });
  });

  describe('link($get)', () => {
    it('should support embedded lists', (done) => {
      $httpBackend.whenGET('/api/locations').respond(200, mocks.embeddedLists, headers);
      $http.get('/api/locations').then((response) => {
        response.$get('self').then((locationList) => {
          expect(locationList).to.not.be.undefined;
          expect(locationList.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should support an embedded object', (done) => {
      $httpBackend.whenGET('/api/locations').respond(200, mocks.embeddedObject, headers);
      $http.get('/api/locations').then((response) => {
        response.$get('self').then((location) => {
          expect(location).to.not.be.undefined;
          expect(location.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should not support solo lists', (done) => {
      $httpBackend.whenGET('/api/locations').respond(200, mocks.soloLists, headers);
      $http.get('/api/locations').then((response) => {
        response.$get('self').then((location) => {
          expect(location).to.not.be.undefined;
          expect(location.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should not support a solo object', (done) => {
      $httpBackend.whenGET('/api/locations').respond(200, mocks.soloObject, headers);
      $httpBackend.whenGET('/api/locations/1').respond(200, mocks.soloObject, headers);
      $http.get('/api/locations').then((response) => {
        response.$get('self').then((location) => {
          expect(location).to.not.be.undefined;
          expect(location.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });
  });

  describe('link($post)', () => {
    it('should support embedded lists', (done) => {
      $httpBackend.whenPOST('/api/locations').respond(200, mocks.embeddedLists, headers);
      $http.post('/api/locations').then((response) => {
        response.$post('self').then((locationList) => {
          expect(locationList).to.not.be.undefined;
          expect(locationList.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should support an embedded object', (done) => {
      $httpBackend.whenPOST('/api/locations').respond(200, mocks.embeddedObject, headers);
      $http.post('/api/locations').then((response) => {
        response.$post('self').then((location) => {
          expect(location).to.not.be.undefined;
          expect(location.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should not support solo lists', (done) => {
      $httpBackend.whenPOST('/api/locations').respond(200, mocks.soloLists, headers);
      $http.post('/api/locations').then((response) => {
        response.$post('self').then((location) => {
          expect(location).to.not.be.undefined;
          expect(location.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should not support a solo object', (done) => {
      $httpBackend.whenPOST('/api/locations').respond(200, mocks.soloObject, headers);
      $httpBackend.whenPOST('/api/locations/1').respond(200, mocks.soloObject, headers);
      $http.post('/api/locations').then((response) => {
        response.$post('self').then((location) => {
          expect(location).to.not.be.undefined;
          expect(location.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });
  });

  describe('link($put)', () => {
    it('should support embedded lists', (done) => {
      $httpBackend.whenPUT('/api/locations').respond(200, mocks.embeddedLists, headers);
      $http.put('/api/locations').then((response) => {
        response.$put('self').then((locationList) => {
          expect(locationList).to.not.be.undefined;
          expect(locationList.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should support an embedded object', (done) => {
      $httpBackend.whenPUT('/api/locations').respond(200, mocks.embeddedObject, headers);
      $http.put('/api/locations').then((response) => {
        response.$put('self').then((location) => {
          expect(location).to.not.be.undefined;
          expect(location.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should not support solo lists', (done) => {
      $httpBackend.whenPUT('/api/locations').respond(200, mocks.soloLists, headers);
      $http.put('/api/locations').then((response) => {
        response.$put('self').then((location) => {
          expect(location).to.not.be.undefined;
          expect(location.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should not support a solo object', (done) => {
      $httpBackend.whenPUT('/api/locations').respond(200, mocks.soloObject, headers);
      $httpBackend.whenPUT('/api/locations/1').respond(200, mocks.soloObject, headers);
      $http.put('/api/locations').then((response) => {
        response.$put('self').then((location) => {
          expect(location).to.not.be.undefined;
          expect(location.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });
  });

  describe('link($patch)', () => {
    it('should support embedded lists', (done) => {
      $httpBackend.whenPATCH('/api/locations').respond(200, mocks.embeddedLists, headers);
      $http.patch('/api/locations').then((response) => {
        response.$patch('self').then((locationList) => {
          expect(locationList).to.not.be.undefined;
          expect(locationList.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should support an embedded object', (done) => {
      $httpBackend.whenPATCH('/api/locations').respond(200, mocks.embeddedObject, headers);
      $http.patch('/api/locations').then((response) => {
        response.$patch('self').then((location) => {
          expect(location).to.not.be.undefined;
          expect(location.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should not support solo lists', (done) => {
      $httpBackend.whenPATCH('/api/locations').respond(200, mocks.soloLists, headers);
      $http.patch('/api/locations').then((response) => {
        response.$patch('self').then((location) => {
          expect(location).to.not.be.undefined;
          expect(location.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should not support a solo object', (done) => {
      $httpBackend.whenPATCH('/api/locations').respond(200, mocks.soloObject, headers);
      $httpBackend.whenPATCH('/api/locations/1').respond(200, mocks.soloObject, headers);
      $http.patch('/api/locations').then((response) => {
        response.$patch('self').then((location) => {
          expect(location).to.not.be.undefined;
          expect(location.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });
  });

  describe('link($delete)', () => {
    it('should support embedded lists', (done) => {
      $httpBackend.whenDELETE('/api/locations').respond(200, mocks.embeddedLists, headers);
      $http.delete('/api/locations').then((response) => {
        response.$delete('self').then((locationList) => {
          expect(locationList).to.not.be.undefined;
          expect(locationList.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should support an embedded object', (done) => {
      $httpBackend.whenDELETE('/api/locations').respond(200, mocks.embeddedObject, headers);
      $http.delete('/api/locations').then((response) => {
        response.$delete('self').then((location) => {
          expect(location).to.not.be.undefined;
          expect(location.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should not support solo lists', (done) => {
      $httpBackend.whenDELETE('/api/locations').respond(200, mocks.soloLists, headers);
      $http.delete('/api/locations').then((response) => {
        response.$delete('self').then((location) => {
          expect(location).to.not.be.undefined;
          expect(location.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });

    it('should not support a solo object', (done) => {
      $httpBackend.whenDELETE('/api/locations').respond(200, mocks.soloObject, headers);
      $httpBackend.whenDELETE('/api/locations/1').respond(200, mocks.soloObject, headers);
      $http.delete('/api/locations').then((response) => {
        response.$delete('self').then((location) => {
          expect(location).to.not.be.undefined;
          expect(location.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });
  });

  describe('flag(readonly)', () => {
    it('should support an embedded object', (done) => {
      $hateoasConfigProvider.setReadOnly(false);
      $httpBackend.whenPOST('/api/locations').respond(200, mocks.embeddedObject, headers);
      $http.post('/api/locations').then((response) => {
        response.$post('self').then((location) => {
          expect(location).to.not.be.undefined;
          expect(location.$get).to.not.be.undefined;
          done();
        });
      });
      $httpBackend.flush();
    });
  });
});
