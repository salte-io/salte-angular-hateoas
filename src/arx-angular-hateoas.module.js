import hateoasInterceptor from './hateoas-interceptor/hateoas-interceptor.module.js';
import hateoasConfig from './hateoas-config/hateoas-config.module.js';

angular.module('arx-angular-hateoas', [
    hateoasInterceptor,
    hateoasConfig
]);
