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
  });


  // process
  grunt.initConfig({

    path: {
      src: 'src/',
      tmp: 'tmp/',
      dist: 'dist/',
      hbs_src: 'src/hbs/',
      scss_src: 'src/scss/',
      js_src: 'src/js/',
      img_src: 'src/img/'
    },

    pkg: grunt.file.readJSON('package.json'),

    clean: ['<%= path.tmp %>', '<%= path.dist %>'],


    /* html */
    assemble: {
      options: {
        layoutdir: '<%= path.hbs_src %>layouts/',
        partials: ['<%= path.hbs_src %>partials/**/*.hbs'],
        data: ['<%= path.hbs_src %>data/**/*.yml'],
        helpers: ['handlebars-helper-prettify'],
        prettify: {
          indent: 4
        }
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= path.hbs_src %>pages/',
          src: ['**/*.hbs'],
          dest: '<%= path.dist %>'
        }]
      }
    },


    /* css */
    sass: {
      options: {
        style: 'compact',
        sourcemap: 'none',
        noCache: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= path.scss_src %>',
          src: ['**/*.scss'],
          dest: '<%= path.tmp %>css/',
          ext: '.css'
        }]
      },
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 7', 'ie 8', 'ie 9']
      },
      _005: {
        src: '<%= path.tmp %>css/**/*.css'
      }
    },

    csscomb: {
      _005: {
        expand: true,
        cwd: '<%= path.tmp %>css/',
        src: ['**/*.css'],
        dest: '<%= path.tmp %>css/'
      },
      source006: {
        expand: true,
        cwd: '<%= path.src %>',
        src: ['006/**/*.css'],
        dest: '<%= path.tmp %>'
      }
    },

    csso: {
      options: {
        restructure: false
      },
      _005: {
        expand: true,
        cwd: '<%= path.tmp %>css/',
        src: ['**/*.css'],
        dest: '<%= path.tmp %>css/',
      },
      source006: {
        expand: true,
        cwd: '<%= path.tmp %>',
        src: ['006/**/*.css'],
        dest: '<%= path.tmp %>'
      }
    },


    /* js */
    // 生成したいファイルの数だけタスクを記述
    concat: {
      options : {
        sourceMap :true
      },
      _005: {
        src: ['<%= path.js_src %>*.js'],
        dest: '<%= path.tmp %>js/all.js'
      },
      pc: {
        src: ['<%= path.js_src %>hage.js', '<%= path.js_src %>hoge.js'],
        dest: '<%= path.tmp %>006/js/all.js'
      },
      sp: {
        src: ['<%= path.js_src %>*.js'],
        dest: '<%= path.tmp %>006/s/js/all.js'
      }
    },

    // 生成したいファイルの数だけタスクを記述
    uglify: {
      options: {
        sourceMap : true,
        sourceMapIncludeSources : true
      },
      _005: {
        options: {
          sourceMapIn : ['<%= path.tmp %>js/all.js.map']
        },
        files: {
          '<%= path.tmp %>js/all.js': ['<%= path.tmp %>js/all.js']
        }
      },
      pc: {
        options: {
          sourceMapIn : ['<%= path.tmp %>006/js/all.js.map']
        },
        files: {
          '<%= path.tmp %>006/js/all.js': ['<%= path.tmp %>006/js/all.js']
        }
      },
      sp: {
        options: {
          sourceMapIn : ['<%= path.tmp %>006/s/js/all.js.map']
        },
        files: {
          '<%= path.tmp %>006/s/js/all.js': ['<%= path.tmp %>006/s/js/all.js']
        }
      }
    },


    copy: {
      /* img */
      img: {
        expand: true,
        cwd: '<%= path.img_src %>',
        src: ['**/*.{png,jpg}'],
        dest: '<%= path.dist %>'
      },
      /* css,jsをそれぞれのディレクトリにコピー */
      css_js_005: {
        expand: true,
        cwd: '<%= path.tmp %>',
        src: ['css/all.css', 'js/all.js', 'js/all.js.map'],
        dest: '<%= path.dist %>005/s'
      },
      css_js_007: {
        expand: true,
        cwd: '<%= path.tmp %>006/',
        src: ['**/css/all.css', '**/js/all.js', '**/js/all.js.map'],
        dest: '<%= path.dist %>007/'
      },
      css_js_008: {
        expand: true,
        cwd: '<%= path.tmp %>006/',
        src: ['css/all.css', 'js/all.js', 'js/all.js.map'],
        dest: '<%= path.dist %>008/'
      },
    },


    watch: {
      html: {
        files: ['src/**/*.{hbs,yml}'],
        tasks: ['build:html']
      },
      css: {
        files: ['src/**/*.{css,scss}'],
        tasks: ['build:css'],
      },
      js: {
        files: ['src/**/*.js'],
        tasks: ['build:js']
      },
      options: {
        livereload: true
      }
    },

    connect: {
      server: {
        options: {
          port: 1108,
          base: 'dist/'
        }
      }
    }

  });


  grunt.registerTask('build:html', ['assemble']);
  grunt.registerTask('build:css', ['sass', 'autoprefixer', 'csscomb', 'csso']);
  grunt.registerTask('build:js', ['concat', 'uglify']);
  //grunt.registerTask('build:img', ['copy:img']);
  grunt.registerTask('build', ['clean', 'build:html', 'build:css', 'build:js', 'copy']);
  grunt.registerTask('default', ['build']);
  grunt.registerTask('w', ['connect', 'watch']);
};
