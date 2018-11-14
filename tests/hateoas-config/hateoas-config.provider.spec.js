import hateoasConfig from '../../src/hateoas-config/hateoas-config.module.js';
import { expect } from 'chai';

describe('hateoas-config', () => {
  let $hateoasConfigProvider, $hateoasConfig;
  beforeEach(angular.mock.module(hateoasConfig, (_$hateoasConfigProvider_) => {
    $hateoasConfigProvider = _$hateoasConfigProvider_;
  }));
  beforeEach(angular.mock.inject.strictDi(true));
  beforeEach(angular.mock.inject((_$hateoasConfig_) => {
    $hateoasConfig = _$hateoasConfig_;
  }));

  describe('function(setConfig)', () => {
    it('should support setting the config object', () => {
      $hateoasConfigProvider.setConfig({
        keys: 'turtles'
      });

      expect($hateoasConfig.getConfig()).to.deep.equal({
        keys: 'turtles'
      });
    });
  });

  describe('function(setLinksKey)', () => {
    it('should support setting the links key', () => {
      $hateoasConfigProvider.setLinksKey('turtles');

      expect($hateoasConfig.getConfig().keys.links).to.deep.equal('turtles');
      expect($hateoasConfig.getLinksKey()).to.deep.equal('turtles');
    });
  });

  describe('function(setEmbeddedKey)', () => {
    it('should support setting the embedded key', () => {
      $hateoasConfigProvider.setEmbeddedKey('turtles');

      expect($hateoasConfig.getConfig().keys.embedded).to.deep.equal('turtles');
      expect($hateoasConfig.getEmbeddedKey()).to.deep.equal('turtles');
    });
  });

  describe('function(setReadOnly)', () => {
    it('should support setting the readonly flag', () => {
      $hateoasConfigProvider.setReadOnly('turtles');

      expect($hateoasConfig.getConfig().readonly).to.deep.equal('turtles');
      expect($hateoasConfig.getReadOnly()).to.deep.equal('turtles');
    });
  });

  describe('class($hateoasConfig)', () => {
    describe('function(getConfig)', () => {
      it('should set defaults', () => {
        expect($hateoasConfig.getConfig()).to.deep.equal({
          keys: {
            links: '_links',
            embedded: '_embedded'
          },
          readonly: true
        });
        expect($hateoasConfig.getLinksKey()).to.deep.equal('_links');
        expect($hateoasConfig.getEmbeddedKey()).to.deep.equal('_embedded');
        expect($hateoasConfig.getReadOnly()).to.deep.equal(true);
      });
    });
  });
});
