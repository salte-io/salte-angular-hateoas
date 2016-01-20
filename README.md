# Angular Hateoas
[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Travis][travis-ci-image]][travis-ci-url]
[![Coveralls][coveralls-image]][coveralls-url]

[![David Dependencies][david-dev-dependencies-image]][david-dev-dependencies-url]

The simple way to consume HATEOAS enabled REST APIs with AngularJS

## Installation

```
$ npm install salte-angular-hateoas
```

## Usage
Enabling HATEOAS support is as simple as adding a dependency on `salte-angular-hateoas` to your application and pushing an interceptor.

**NOTE: This will ONLY convert objects that return with the, "application/hal+json", Content-Type**
```javascript
var app = angular.module('app', ['salte-angular-hateoas']);

app.config(function($httpProvider) {
    // This will only intercept requests
    $httpProvider.interceptors.push('hateoasInterceptor');
});
```

## API
### `$get(key, [config])`
- **`key`:** The link key
- **`config`:** Optional configuration object **(identical to [$http's config][http-config])**

Returns a $http GET request for the designated link
```javascript
$http.get('/api/some-hateoas-endpoint').then(function(data) {
    data.$get('self').then(function(self) {
        // This will return the resulting GET of the self link.
    });
});
```
### `$post(key, data, [config])`
- **`key`:** The link key
- **`data`:** Request content
- **`config`:** Optional configuration object **(identical to [$http's config][http-config])**

Returns a $http POST request for the designated link
```javascript
$http.get('/api/some-hateoas-endpoint').then(function(data) {
    data.$post('self', data).then(function(self) {
        // This will send a POST to the self link with a request body containing the data object.
    });
});
```
### `$put(key, data, [config])`
- **`key`:** The link key
- **`data`:** Request content
- **`config`:** Optional configuration object **(identical to [$http's config][http-config])**

Returns a $http PUT request for the designated link
```javascript
$http.get('/api/some-hateoas-endpoint').then(function(data) {
    data.$put('self', data).then(function(self) {
        // This will send a PUT to the self link with a request body containing the data object.
    });
});
```
### `$patch(key, data, [config])`
- **`key`:** The link key
- **`data`:** Request content
- **`config`:** Optional configuration object ****(identical to [$http's config][http-config])****

Returns a $http PATCH request for the designated link
```javascript
$http.get('/api/some-hateoas-endpoint').then(function(data) {
    data.$patch('self', data).then(function(self) {
        // This will send a PATCH to the self link with a request body containing the data object.
    });
});
```
### `$delete(key, [config])`
- **`key`:** The link key
- **`config`:** Optional configuration object **(identical to [$http's config][http-config])**

Returns a $http DELETE request for the designated link
```javascript
$http.get('/api/some-hateoas-endpoint').then(function(data) {
    data.$delete('self', { data: data }).then(function(self) {
        // This will send a DELETE to the self link with a request body containing the data object.
    });
});
```
### `$embedded(key)`
- **`key`:** refers to the embedded key

Returns a promise which resolves to an embedded object.
```javascript
$http.get('/api/some-hateoas-endpoint').then(function(data) {
    data.$embedded('list').then(function(list) {
        // This will return the resulting embedded object with the key list.
    });
});
```
### `$link(key)`
- **`key`:** The link key

Returns a promise which resolves to a link.
```javascript
$http.get('/api/some-hateoas-endpoint').then(function(data) {
    data.$link('self').then(function(self) {
        // This will return the resulting href of the self link.
    });
});
```

## config

### Setting the `links` key
```javascript
app.config(function($hateoasConfigProvider) {
    $hateoasConfigProvider.setLinksKey('related');
});
```
### Setting the `embedded` key
```javascript
app.config(function($hateoasConfigProvider) {
    $hateoasConfigProvider.setEmbeddedKey('content');
});
```
### Disabling `readonly` mode
```javascript
app.config(function($hateoasConfigProvider) {
    $hateoasConfigProvider.setReadOnly(false);
});
```

## License
[MIT](https://github.com/salte-io/salte-angular-hateoas/blob/master/LICENSE)

[npm-version-image]: http://img.shields.io/npm/v/salte-angular-hateoas.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/salte-angular-hateoas.svg?style=flat
[npm-url]: https://npmjs.org/package/salte-angular-hateoas

[travis-ci-image]: https://img.shields.io/travis/salte-io/salte-angular-hateoas.svg?style=flat
[travis-ci-url]: https://travis-ci.org/salte-io/salte-angular-hateoas

[coveralls-image]: https://img.shields.io/coveralls/salte-io/salte-angular-hateoas/master.svg
[coveralls-url]: https://coveralls.io/github/salte-io/salte-angular-hateoas

[david-dev-dependencies-image]: https://img.shields.io/david/dev/salte-io/salte-angular-hateoas.svg
[david-dev-dependencies-url]: https://david-dm.org/salte-io/salte-angular-hateoas#info=devDependencies

[hateoas]: https://spring.io/understanding/HATEOAS
[http-config]: https://docs.angularjs.org/api/ng/service/$http
