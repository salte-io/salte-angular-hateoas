import angular from 'angular';
import hateoasInterceptor from './hateoas-interceptor.service';

const module = angular.module('core.services.hateoas-interceptor', []);

module.service('hateoasInterceptor', hateoasInterceptor);

export default module.name;
