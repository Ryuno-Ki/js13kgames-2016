module.exports = (grunt) =>
    grunt.initConfig
        babel:
            options:
                sourceMap: true
                presets: ['babel-preset-es2015']
            spec:
                files:
                    'spec/car.spec.js': 'spec/car.spec.es6.js'
                    'spec/crossroad.spec.js': 'spec/crossroad.spec.es6.js'
                    'spec/street.spec.js': 'spec/street.spec.es6.js'
                    'spec/trafficLight.spec.js': 'spec/trafficLight.spec.es6.js'

        coffee:
            compile:
                files:
                    'transpiled/app.js': 'js/app.js'
                    'transpiled/car.js': 'js/car.js'
                    'transpiled/crossroad.js': 'js/crossroad.js'
                    'transpiled/street.js': 'js/street.js'
                    'transpiled/trafficLight.js': 'js/trafficLight.js'

        coffeelint:
            dist: ['js/*.js']

        compress:
            app:
                options:
                    archive: 'game.zip'
                files: [{
                    expand: true
                    src: [
                        'index.html'
                        'dist/*.js'
                    ]
                    dest: '/'
                }]

        jshint:
            files: ['spec/*spec.es6.js']
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
                    global: true
                    it: true
                    require: true

        maxFilesize:
            app:
                options:
                    maxBytes: 13312
                src: ['game.zip']

        'mocha-chai-sinon':
            test:
                options:
                    ui: 'bdd'
                    reporter: 'dot'
                src: ['spec/*.spec.js']

        processhtml:
            options:
                data:
                    variable: '42'
            dist:
                files:
                    'target.html': 'index.html'

        uglify:
            build:
                options:
                    mangleProperties: false
                    preserveComments: false
                    reserveDOMProperties: true
                    screwIE8: true
                    sourceMap: true
                    compress:
                        dead_code: true
                        drop_console: false
                        global_defs:
                            'require': undefined
                        unused: true
                files:
                    'dist/app.min.js': ['transpiled/app.js']
                    'dist/car.min.js': ['transpiled/car.js']
                    'dist/crossroad.min.js': ['transpiled/crossroad.js']
                    'dist/street.min.js': ['transpiled/street.js']
                    'dist/trafficLight.min.js': ['transpiled/trafficLight.js']

        watch:
            files: ['js/*.js', 'spec/*.es6.js']
            tasks: ['coffee', 'babel', 'coffeelint', 'jshint', 'uglify', 'test']

    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-compress'
    grunt.loadNpmTasks 'grunt-contrib-jshint'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-babel'
    grunt.loadNpmTasks 'grunt-coffeelint'
    grunt.loadNpmTasks 'grunt-max-filesize'
    grunt.loadNpmTasks 'grunt-mocha-chai-sinon'
    grunt.loadNpmTasks 'grunt-notify'
    grunt.loadNpmTasks 'grunt-processhtml'

    grunt.registerTask 'default', ['coffee', 'coffeelint', 'jshint', 'uglify', 'compress', 'maxFilesize']
    grunt.registerTask 'test', ['mocha-chai-sinon']
