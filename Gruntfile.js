module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dev: {
        options: {
          bundleExec: true,
          style: 'expanded',
          loadPath: ['node_modules', 'sass'],
          lineNumbers: true
        },
        files: [{
          bundleExec: true,
          expand: true,
          cwd: 'sass',
          src: ['*.sass', '*.scss'],
          dest: 'css',
          ext: '.css'
        }]
      }
    },
    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({browsers: ['> 5%', 'last 3 versions', 'Firefox > 20', 'Opera > 12.1', 'ie > 9']}),
          require('cssnano')()
        ]
      },
      dist: {
        src: ['css/*.css', '!css/*.min.css'],
        dest: 'css/style.min.css'
      }
    },
    watch: {
      styles: {
        files: ['sass/**/*.{sass,scss}'],
        tasks: ['sass:dev'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('dev', ['sass:dev']);
  grunt.registerTask('prod', ['sass:dev', 'postcss']);

  grunt.registerTask('default', ['dev']);
};