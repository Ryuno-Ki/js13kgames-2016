module.exports = (grunt) =>
    grunt.initConfig
        babel:
            options:
                sourceMap: true
                presets: ['babel-preset-es2015']
            dist:
                plugins: ['transform-es2015-modules-amd']
                files:
                    'dist/car.js': 'js/car.js'
                    'dist/crossroad.js': 'js/crossroad.js'
                    'dist/street.js': 'js/street.js'
                    'dist/trafficLight.js': 'js/trafficLight.js'
            spec:
                files:
                    'spec/car.spec.js': 'spec/car.spec.es6.js'
                    'spec/crossroad.spec.js': 'spec/crossroad.spec.es6.js'
                    'spec/street.spec.js': 'spec/street.spec.es6.js'
                    'spec/trafficLight.spec.js': 'spec/trafficLight.spec.es6.js'

        compress:
            app:
                options:
                    archive: 'dist/game.zip'
                files: [{
                    expand: true
                    src: [
                        'index.html'
                        'dist/*.js'
                    ]
                    dest: '/'
                }]

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
                    define: true
                    describe: true
                    expect: true
                    exports: true
                    it: true
                    require: true

        maxFilesize:
            app:
                options:
                    maxBytes: 13312
                src: ['dist/game.zip']

        'mocha-chai-sinon':
            test:
                options:
                    ui: 'bdd'
                    reporter: 'dot'
                src: ['spec/*.spec.js']

        watch:
            files: ['js/*.js', 'spec/*.es6.js']
            tasks: ['babel', 'jshint', 'test']

    grunt.loadNpmTasks 'grunt-contrib-compress'
    grunt.loadNpmTasks 'grunt-contrib-jshint'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-babel'
    grunt.loadNpmTasks 'grunt-max-filesize'
    grunt.loadNpmTasks 'grunt-mocha-chai-sinon'

    grunt.registerTask 'default', ['babel', 'jshint', 'compress', 'maxFilesize']
    grunt.registerTask 'test', ['mocha-chai-sinon']
