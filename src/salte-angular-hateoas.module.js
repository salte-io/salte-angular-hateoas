import hateoasInterceptor from './hateoas-interceptor/hateoas-interceptor.module.js';
import hateoasConfig from './hateoas-config/hateoas-config.module.js';

const module = angular.module('salte-angular-hateoas', [
    hateoasInterceptor,
    hateoasConfig
]);

export default module.name;
