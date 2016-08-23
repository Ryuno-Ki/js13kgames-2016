module.exports = (grunt) =>
    grunt.initConfig
        babel:
            options:
                sourceMap: true
                presets: ['babel-preset-es2015']
            dist:
                files:
                    'dist/app.js': 'js/game.js'

        jshint:
            files: ['js/*.js', 'spec/*.js']
            options:
                browser: true
                devel: true
                curly: true
                eqnull: true
                eqeqeq: true
                es5: true
                expr: true
                undef: true
                globals:
                    describe: true
                    expect: true
                    it: true

        'mocha-chai-sinon':
            test:
                options:
                    ui: 'bdd'
                    reporter: 'dot'
                src: ['spec/*.js']

        watch:
            files: ['<%= jshint.files %>']
            tasks: ['jshint']

    grunt.loadNpmTasks 'grunt-contrib-jshint'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-babel'
    grunt.loadNpmTasks 'grunt-mocha-chai-sinon'

    grunt.registerTask 'default', ['babel', 'jshint']
    grunt.registerTask 'test', ['mocha-chai-sinon']
