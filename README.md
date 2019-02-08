# Angular Hateoas

[![Gitter](https://badges.gitter.im/salte-io/salte-angular-hateoas.svg)](https://gitter.im/salte-io/salte-angular-hateoas?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Travis][travis-ci-image]][travis-ci-url]
[![Coveralls][coveralls-image]][coveralls-url]

[![Commitizen friendly][commitizen-image]][commitizen-url]
[![semantic-release][semantic-release-image]][semantic-release-url]
[![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]

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
- **`config`:** Optional configuration object **(identical to [$http's config][http-config])**

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

The MIT License

Copyright (c) 2016 Salte. https://www.salte.io

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

[npm-version-image]: http://img.shields.io/npm/v/salte-angular-hateoas.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/salte-angular-hateoas.svg?style=flat
[npm-url]: https://npmjs.org/package/salte-angular-hateoas

[travis-ci-image]: https://img.shields.io/travis/com/salte-io/salte-angular-hateoas/master.svg?style=flat
[travis-ci-url]: https://travis-ci.com/salte-io/salte-angular-hateoas

[coveralls-image]: https://img.shields.io/coveralls/salte-io/salte-angular-hateoas/master.svg
[coveralls-url]: https://coveralls.io/github/salte-io/salte-angular-hateoas

[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/

[semantic-release-url]: https://github.com/semantic-release/semantic-release
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

[greenkeeper-url]: https://greenkeeper.io
[greenkeeper-image]: https://badges.greenkeeper.io/salte-io/salte-angular-hateoas.svg

[http-config]: https://docs.angularjs.org/api/ng/service/$http
