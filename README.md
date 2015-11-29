# Angular Hateoas
[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Travis][travis-ci-image]][travis-ci-url]
[![Coveralls][coveralls-image]][coveralls-url]

[![David Dependencies][david-dev-dependencies-image]][david-dev-dependencies-url]

The simple way to consume HATEOAS enabled REST APIs with AngularJS

## Installation

```
$ npm install arx-angular-hateoas
```

## Usage
Enabling HATEOAS support is as simple as adding a dependency on `arx-angular-hateoas` to your application and pushing an interceptor.

**NOTE: This will ONLY convert objects that return with the, "application/hal+json", Content-Type**
```javascript
var app = angular.module('app', ['arx-angular-hateoas']);

app.config(function($httpProvider) {
    // This will only intercept requests
    $httpProvider.interceptors.push('hateoasInterceptor');
});
```

## API
### `$get([key] [, options])`
- **`key`:** refers to the link key.
- **`options`:** identical to [http's options][http-options].

Returns a $http GET request for the designated link
```javascript
$http.get('/api/some-hateoas-endpoint').then(function(data) {
    data.$get('self').then(function(self) {
        // This will return the resulting GET of the self link.
    });
});
```
### `$post([key] [, options])`
- **`key`:** refers to the link key.
- **`options`:** identical to [http's options][http-options].

Returns a $http POST request for the designated link
```javascript
$http.get('/api/some-hateoas-endpoint').then(function(data) {
    data.$post('self', { data: data }).then(function(self) {
        // This will send a POST to the self link with a request body containing the data object.
    });
});
```
### `$put([key] [, options])`
- **`key`:** refers to the link key.
- **`options`:** identical to [http's options][http-options].

Returns a $http PUT request for the designated link
```javascript
$http.get('/api/some-hateoas-endpoint').then(function(data) {
    data.$put('self', { data: data }).then(function(self) {
        // This will send a PUT to the self link with a request body containing the data object.
    });
});
```
### `$patch([key] [, options])`
- **`key`:** refers to the link key.
- **`options`:** identical to [http's options][http-options].

Returns a $http PATCH request for the designated link
```javascript
$http.get('/api/some-hateoas-endpoint').then(function(data) {
    data.$patch('self', { data: data }).then(function(self) {
        // This will send a PATCH to the self link with a request body containing the data object.
    });
});
```
### `$delete([key] [, options])`
- **`key`:** refers to the link key.
- **`options`:** identical to [http's options][http-options].

Returns a $http DELETE request for the designated link
```javascript
$http.get('/api/some-hateoas-endpoint').then(function(data) {
    data.$delete('self', { data: data }).then(function(self) {
        // This will send a DELETE to the self link with a request body containing the data object.
    });
});
```
### `$embedded([key])`
- **`key`:** refers to the embedded key.

Returns a promise which resolves to an embedded object.
```javascript
$http.get('/api/some-hateoas-endpoint').then(function(data) {
    data.$embedded('list').then(function(list) {
        // This will return the resulting embedded object with the key list.
    });
});
```
### `$link([key])`

Returns a promise which resolves to a link.
- **`key`:** refers to the link key.

```javascript
$http.get('/api/some-hateoas-endpoint').then(function(data) {
    data.$link('self').then(function(self) {
        // This will return the resulting href of the self link.
    });
});
```

## Options

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
[MIT](https://github.com/arxstudios/arx-angular-hateoas/blob/master/LICENSE)

[npm-version-image]: http://img.shields.io/npm/v/arx-angular-hateoas.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/arx-angular-hateoas.svg?style=flat
[npm-url]: https://npmjs.org/package/arx-angular-hateoas

[travis-ci-image]: https://img.shields.io/travis/arxstudios/arx-angular-hateoas.svg?style=flat
[travis-ci-url]: https://travis-ci.org/arxstudios/arx-angular-hateoas

[coveralls-image]: https://img.shields.io/coveralls/arxstudios/arx-angular-hateoas/master.svg
[coveralls-url]: https://coveralls.io/github/arxstudios/arx-angular-hateoas

[david-dev-dependencies-image]: https://img.shields.io/david/dev/arxstudios/arx-angular-hateoas.svg
[david-dev-dependencies-url]: https://david-dm.org/arxstudios/arx-angular-hateoas#info=devDependencies

[hateoas]: https://spring.io/understanding/HATEOAS
[http-options]: https://docs.angularjs.org/api/ng/service/$http
