import angular from 'angular';
import $hateoasConfig from './hateoas-config.provider';

const module = angular.module('core.services.hateoas-config', []);

module.provider('$hateoasConfig', $hateoasConfig);

export default module.name;
