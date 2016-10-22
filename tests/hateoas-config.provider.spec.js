import hateoasConfig from '../src/hateoas-config/hateoas-config.module.js';

describe('hateoas-config', () => {
    let $hateoasConfigProvider, $hateoasConfig;
    beforeEach(angular.mock.module(hateoasConfig, (_$hateoasConfigProvider_) => {
        $hateoasConfigProvider = _$hateoasConfigProvider_;
    }));
    beforeEach(angular.mock.inject((_$hateoasConfig_) => {
        $hateoasConfig = _$hateoasConfig_;
    }));

    describe('function(setConfig)', () => {
        it('should support setting the config object', () => {
            $hateoasConfigProvider.setConfig({
                keys: 'turtles'
            });

            expect($hateoasConfig.getConfig()).toEqual({
                keys: 'turtles'
            });
        });
    });

    describe('function(setLinksKey)', () => {
        it('should support setting the links key', () => {
            $hateoasConfigProvider.setLinksKey('turtles');

            expect($hateoasConfig.getConfig().keys.links).toEqual('turtles');
            expect($hateoasConfig.getLinksKey()).toEqual('turtles');
        });
    });

    describe('function(setEmbeddedKey)', () => {
        it('should support setting the embedded key', () => {
            $hateoasConfigProvider.setEmbeddedKey('turtles');

            expect($hateoasConfig.getConfig().keys.embedded).toEqual('turtles');
            expect($hateoasConfig.getEmbeddedKey()).toEqual('turtles');
        });
    });

    describe('function(setReadOnly)', () => {
        it('should support setting the readonly flag', () => {
            $hateoasConfigProvider.setReadOnly('turtles');

            expect($hateoasConfig.getConfig().readonly).toEqual('turtles');
            expect($hateoasConfig.getReadOnly()).toEqual('turtles');
        });
    });

    describe('class($hateoasConfig)', () => {
        describe('function(getConfig)', () => {
            it('should set defaults', () => {
                expect($hateoasConfig.getConfig()).toEqual({
                    keys: {
                        links: '_links',
                        embedded: '_embedded'
                    },
                    readonly: true
                });
                expect($hateoasConfig.getLinksKey()).toEqual('_links');
                expect($hateoasConfig.getEmbeddedKey()).toEqual('_embedded');
                expect($hateoasConfig.getReadOnly()).toEqual(true);
            });
        });
    });
});
