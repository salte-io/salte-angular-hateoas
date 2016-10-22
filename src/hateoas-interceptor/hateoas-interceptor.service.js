/* @ngInject */
export default function hateoasInterceptor($hateoasConfig, $q, $injector) {
    const interceptor = this;

    interceptor.response = (response) => {
        if (response.headers('Content-Type') === 'application/hal+json') {
            return interceptor.transformHalResponse(response.data);
        }
        return response;
    };
    let $http;

    interceptor.transformHalResponse = (response) => {
        if (response.length) {
            angular.forEach(response, interceptor.transformHalResponse);
        } else {
            // NOTE: This delays requiring $http so that we can avoid a circular dependency
            $http = $http || $injector.get('$http');

            defineHiddenProperty(response, $hateoasConfig.getLinksKey(), response[$hateoasConfig.getLinksKey()]);
            defineHiddenProperty(response, '$link', (key) => {
                const links = response[$hateoasConfig.getLinksKey()];
                return links && links[key] ? $q.when(links[key].href) : $q.reject('We were unable to find a link that matched the key, ' + key);
            });

            defineHiddenProperty(response, $hateoasConfig.getEmbeddedKey(), response[$hateoasConfig.getEmbeddedKey()]);
            defineHiddenProperty(response, '$embedded', (key) => {
                const embedded = response[$hateoasConfig.getEmbeddedKey()];
                return embedded && embedded[key] ? $q.when(interceptor.transformHalResponse(embedded[key])) : $q.reject('We were unable to find an embedded value that matched the key, ' + key);
            });

            defineHiddenProperty(response, '$get', (key, config) => {
                return response.$link(key).then((link) => {
                    return $http.get(link, config);
                }).catch(() => {
                    return $q.reject('We were unable to find a link that matches the key, ' + key);
                });
            });

            defineHiddenProperty(response, '$post', (key, data, config) => {
                return response.$link(key).then((link) => {
                    return $http.post(link, data, config);
                });
            });

            defineHiddenProperty(response, '$put', (key, data, config) => {
                return response.$link(key).then((link) => {
                    return $http.put(link, data, config);
                });
            });

            defineHiddenProperty(response, '$patch', (key, data, config) => {
                return response.$link(key).then((link) => {
                    return $http.patch(link, data, config);
                });
            });

            defineHiddenProperty(response, '$delete', (key, config) => {
                return response.$link(key).then((link) => {
                    return $http.delete(link, config);
                });
            });

            if ($hateoasConfig.getReadOnly()) {
                angular.forEach(response, (value, key) => {
                    defineProperty(response, key, value);
                });
            }
        }

        return response;
    };

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
