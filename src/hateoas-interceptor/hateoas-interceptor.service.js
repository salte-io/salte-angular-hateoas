/* @ngInject */
export default function hateoasInterceptor($hateoasConfig, $q, $injector) {
    var interceptor = this;

    interceptor.response = (response) => {
        if (response.headers('Content-Type') === 'application/hal+json') {
            return interceptor.transformHalResponse(response.data);
        }
        return response;
    };
    var $http;

    interceptor.transformHalResponse = (data) => {
        if (data.length) {
            angular.forEach(data, interceptor.transformHalResponse);
        } else {
            // NOTE: This delays requiring $http so that we can avoid a circular dependency
            $http = $http || $injector.get('$http');

            defineHiddenProperty(data, $hateoasConfig.getLinksKey(), data[$hateoasConfig.getLinksKey()]);
            defineHiddenProperty(data, '$link', (key) => {
                var links = data[$hateoasConfig.getLinksKey()];
                return links && links[key] ? $q.when(links[key].href) : $q.reject('We were unable to find a link that matched the key, ' + key);
            });

            defineHiddenProperty(data, $hateoasConfig.getEmbeddedKey(), data[$hateoasConfig.getEmbeddedKey()]);
            defineHiddenProperty(data, '$embedded', (key) => {
                var embedded = data[$hateoasConfig.getEmbeddedKey()];
                return embedded && embedded[key] ? $q.when(embedded[key]) : $q.reject('We were unable to find an embedded value that matched the key, ' + key);
            });

            defineHiddenProperty(data, '$get', (key, config) => {
                return data.$link(key).then((link) => {
                    return $http.get(link, config);
                }, () => {
                    return data.$embedded(key).then(interceptor.transformHalResponse);
                }).catch(() => {
                    return $q.reject('We were unable to find a link or embedded value that matched the key, ' + key);
                });
            });

            defineHiddenProperty(data, '$post', (key, data, config) => {
                return data.$link(key).then((link) => {
                    return $http.post(link, config);
                });
            });

            defineHiddenProperty(data, '$put', (key, data, config) => {
                return data.$link(key).then((link) => {
                    return $http.put(link, config);
                });
            });

            defineHiddenProperty(data, '$patch', (key, data, config) => {
                return data.$link(key).then((link) => {
                    return $http.patch(link, config);
                });
            });

            defineHiddenProperty(data, '$delete', (key, config) => {
                return data.$link(key).then((link) => {
                    return $http.delete(link, config);
                });
            });

            if ($hateoasConfig.getReadOnly()) {
                angular.forEach(data, (value, key) => {
                    defineProperty(data, key, value);
                });
            }
        }

        return data;
    }

    function defineProperty(object, name, value) {
        Object.defineProperty(object, name, {
            writable: $hateoasConfig.getReadOnly(),
            value: value
        });
    }

    function defineHiddenProperty(object, name, value) {
        Object.defineProperty(object, name, {
            configurable: false,
            enumerable: false,
            value: value
        });
    }
}
