import hateoasInterceptor from './hateoas-interceptor.service';

const module = angular.module('core.services.hateoas-interceptor', []).service('hateoasInterceptor', hateoasInterceptor);

export default module.name;
