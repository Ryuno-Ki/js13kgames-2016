module.exports = (grunt) =>
    grunt.initConfig
        babel:
            options:
                sourceMap: true
                presets: ['babel-preset-es2015']
            dist:
                files:
                    'dist/car.js': 'js/car.js'
                    'dist/trafficLight.js': 'js/trafficLight.js'
                    'spec/car.spec.js': 'spec/car.spec.es6.js'
                    'spec/trafficLight.spec.js': 'spec/trafficLight.spec.es6.js'

        jshint:
            files: ['js/*.js', 'spec/*spec.es6.js']
            options:
                browser: true
                devel: true
                curly: true
                eqnull: true
                eqeqeq: true
                esversion: 6
                expr: true
                undef: true
                globals:
                    beforeEach: true
                    describe: true
                    expect: true
                    exports: true
                    it: true
                    require: true

        'mocha-chai-sinon':
            test:
                options:
                    ui: 'bdd'
                    reporter: 'dot'
                src: ['spec/*.spec.js']

        watch:
            files: ['js/*.js', 'spec/*.es6.js']
            tasks: ['babel', 'jshint', 'test']

    grunt.loadNpmTasks 'grunt-contrib-jshint'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-babel'
    grunt.loadNpmTasks 'grunt-mocha-chai-sinon'

    grunt.registerTask 'default', ['babel', 'jshint']
    grunt.registerTask 'test', ['mocha-chai-sinon']
