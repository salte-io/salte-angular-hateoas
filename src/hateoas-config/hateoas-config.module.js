import $hateoasConfig from './hateoas-config.provider';

const module = angular.module('core.services.hateoas-config', []).provider('$hateoasConfig', $hateoasConfig);

export default module.name;
