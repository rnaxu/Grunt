/* ----------------------------------------------------------------------
 * Grunt
 *
 * 開発開始手順
 * $ npm install
 * $ grunt
 *
 * 開発watch,connectコマンド
 * $ grunt w
 *
 ---------------------------------------------------------------------- */

module.exports = function (grunt) {

  // manage
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    // sprite
    sprite: 'grunt-spritesmith'
  });


  // process
  grunt.initConfig({

    path: {
      src: 'src/',
      dist: 'dist/',
      tmp: 'tmp/',
      html_src: 'src/hbs/',
      scss_src: 'src/scss/',
      js_src: 'src/js/',
      img_src: 'src/img/',
      sprite_src: 'src/sprite/'
    },

    pkg: grunt.file.readJSON('package.json'),

    clean: ['<%= path.tmp %>', '<%= path.dist %>'],


    /* html */
    assemble: {
      options: {
        layoutdir: '<%= path.html_src %>layouts/',
        partials: '<%= path.html_src %>partials/*.hbs',
        prettify: {
          indent: 4,
          unformatted: ['br', 'strong', 'span', 'a', 'sub', 'sup', 'b', 'i', 'u']
        },
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= path.html_src %>pages',
          src: '**/*.hbs',
          dest: '<%= path.dist %>'
        }]
      }
    },


    /* css */
    sprite: {
      // spriteファイルの数だけタスクを記述
      all: {
        src: '<%= path.sprite_src %>*.png',
        dest: '<%= path.dist %>img/sprite.png',
        imgPath: '../img/sprite.png',
        destCss: '<%= path.scss_src %>module/_sprite.scss',
        padding: 5
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compact',
          sourcemap: 'none',
          noCache: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= path.scss_src %>',
            src: ['*.scss'],
            dest: '<%= path.tmp %>css',
            ext: '.css'
          }
        ]
      },
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 7', 'ie 8', 'ie 9']
      },
      file: {
        src: '<%= path.tmp %>css/*.css'
      }
    },

    csscomb: {
      app: {
        expand: true,
        cwd: '<%= path.tmp %>css',
        src: ['*.css'],
        dest: '<%= path.tmp %>css',
      }
    },

    csso: {
      app: {
        expand: true,
        cwd: '<%= path.tmp %>css',
        src: ['*.css'],
        dest: '<%= path.dist %>css',
        options: {
          restructure: false
        }
      }
    },


    /* js */
    concat: {
      all: {
        src: ['<%= path.js_src %>*.js'],
        dest: '<%= path.tmp %>js/all.js'
      }
    },

    uglify: {
      options: {
        compress: {
          drop_console: false
        },
        sourceMap: true
      },
      app: {
        files: {
          '<%= path.dist %>js/all.js': '<%= path.tmp %>js/all.js'
        }
      }
    },


    /* img */
    imagemin: {
      noraml: {
        files: [{
          expand: true,
          cwd: '<%= path.img_src %>',
          src: ['**/*.{png,jpg}'],
          dest: '<%= path.dist %>img/'
        }]
      }
    },


    watch: {
      html: {
        files: ['**/*.hbs'],
        tasks: ['build:html']
      },
      css: {
        files: ['**/*.scss'],
        tasks: ['build:css'],
      },
      js: {
        files: ['**/*.js'],
        tasks: ['build:js']
      },
      img: {
        files: ['**/*.{png,jpg}'],
        tasks: ['build:img']
      },
      options: {
        livereload: true
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: 'dist'
        }
      }
    }

  });


  grunt.registerTask('build:html', ['assemble']);
  grunt.registerTask('build:css', ['sprite', 'sass', 'autoprefixer', 'csscomb', 'csso']);
  grunt.registerTask('build:js', ['concat', 'uglify']);
  grunt.registerTask('build:img', ['imagemin']);
  grunt.registerTask('build', ['clean', 'build:html', 'build:css', 'build:js', 'build:img']);
  //grunt.registerTask('styleguide', ['build', 'styledocco']);
  grunt.registerTask('default', ['build']);
  grunt.registerTask('w', ['connect', 'watch']);
};