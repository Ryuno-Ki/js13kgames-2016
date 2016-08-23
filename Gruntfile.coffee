module.exports = (grunt) =>
    grunt.initConfig
        jshint:
            files: ['js/*.js', 'spec/*.js']
            options:
                globals:
                    jQuery: true

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
    grunt.loadNpmTasks 'grunt-mocha-chai-sinon'

    grunt.registerTask 'default', ['jshint']
    grunt.registerTask 'test', ['mocha-chai-sinon']
