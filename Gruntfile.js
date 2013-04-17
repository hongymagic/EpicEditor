'use strict';

var path        = require('path');
var lrSnippet   = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var folderMount = function folderMount (connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    files: {
      all:        ['src/**/*.js'],
      editor:     ['src/editor.js'],
      selection:  ['src/selection.js'],

      tests:      ['test/**/*.js']
    },

    copy: {
      main: {
        files: [
          {
            expand: true,
            src: 'src/editor.js',
            dest: 'epiceditor/js/',
            rename: function (dest) {
              return path.join(dest, 'epiceditor.js');
            }
          },
          { expand: true, cwd: 'src/', src: 'selection.js', dest: 'epiceditor/js/' }
        ]
      }
    },

    uglify: {
      dist: {
        files: {
          'epiceditor/js/epiceditor.min.js': '<%= files.editor %>',
          'epiceditor/js/selection.min.js': '<%= files.selection %>'
        }
      }
    },

    jshint: {
      options: grunt.file.readJSON('.jshintrc'),
      all: '<%= files.all %>'
    },

    connect: {
      livereload: {
        options: {
          port: 8888,
          base: '.',
          middleware: function (connect, options) {
            return [lrSnippet, folderMount(connect, options.base)];
          }
        }
      },
    },

    livereload: {
      port: 35729
    },

    regarde: {
      js: {
        files: ['Gruntfile.js', 'src/**/*.js'],
        tasks: ['jshint', 'copy', 'uglify', 'livereload']
      },
      css: {
        files: '**/*.css',
        tasks: ['livereload']
      },
      html: {
        files: '**/*.html',
        tasks: ['livereload']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-regarde');

  grunt.registerTask('default', ['jshint', 'copy', 'uglify']);
  grunt.registerTask('server',  ['livereload-start', 'connect', 'regarde']);
};