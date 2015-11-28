module.exports = function(config) {
    config.set({
        instrumenters: {
            isparta: require('isparta')
        },
        instrumenter: {
            'src/*.js': 'isparta'
        },
        browsers: ['PhantomJS'],
        frameworks: ['jasmine', 'commonjs'],
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/**/*.js',
            'test/**/*.js'
        ],
        preprocessors: {
            'src/**/*.js': ['babel', 'sourcemap', 'coverage', 'commonjs'],
            'test/**/*.js': ['babel']
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            dir: 'coverage',
            reporters: [
                { type: 'text' },
                { type: 'lcovonly', subdir: '.', file: 'lcov.txt' }
            ]
        }
    });
};
