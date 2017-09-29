export default class HateoasInterceptor {
  constructor($injector, $q, $hateoasConfig) {
    this.$injector = $injector;
    this.$q = $q;
    this.$hateoasConfig = $hateoasConfig;
    this.response = this.response.bind(this);
  }

  response(response) {
    if (response.headers('Content-Type') === 'application/hal+json') {
      return this.transformHalResponse(response.data);
    }
    return response;
  }

  transformHalResponse(response) {
    if (response.length) {
      angular.forEach(response, this.transformHalResponse.bind(this));
    } else {
      this.$defineHiddenProperty(response, this.$hateoasConfig.getLinksKey(), response[this.$hateoasConfig.getLinksKey()]);
      this.$defineHiddenProperty(response, '$link', (key) => {
        const links = response[this.$hateoasConfig.getLinksKey()];
        return links && links[key] ? this.$q.when(links[key].href) : this.$q.reject('We were unable to find a link that matched the key, ' + key);
      });

      this.$defineHiddenProperty(response, this.$hateoasConfig.getEmbeddedKey(), response[this.$hateoasConfig.getEmbeddedKey()]);
      this.$defineHiddenProperty(response, '$embedded', (key) => {
        const embedded = response[this.$hateoasConfig.getEmbeddedKey()];
        return embedded && embedded[key] ? this.$q.when(this.transformHalResponse(embedded[key])) : this.$q.reject('We were unable to find an embedded value that matched the key, ' + key);
      });

      // NOTE: This delays requiring $http so that we can avoid a circular dependency
      this.$http = this.$http || this.$injector.get('$http');
      const methods = ['get', 'post', 'put', 'patch', 'delete'];
      angular.forEach(methods, (method) => {
        this.$defineHiddenProperty(response, '$' + method, (key, config) => {
          return response.$link(key).then((link) => {
            return this.$http[method](link, config);
          });
        });
      });

      if (this.$hateoasConfig.getReadOnly()) {
        angular.forEach(response, (value, key) => {
          this.$defineProperty(response, key, value);
        });
      }
    }

    return response;
  }

  $defineProperty(object, name, value) {
    Object.defineProperty(object, name, {
      writable: this.$hateoasConfig.getReadOnly(),
      value: value
    });
  }

  $defineHiddenProperty(object, name, value) {
    Object.defineProperty(object, name, {
      configurable: false,
      enumerable: false,
      value: value
    });
  }
}

HateoasInterceptor.$inject = ['$injector', '$q', '$hateoasConfig'];
