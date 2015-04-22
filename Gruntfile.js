module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	concat: {
	  options: {
		// define a string to put between each file in the concatenated output
		separator: ';'
	  },
	  dist: {
		// the files to concatenate
		src: ['ws/js-dev/sdi.js'],
		// the location of the resulting JS file
		dest: 'dist/sdi.js'
	  }
	},
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/sdi.js',
        dest: 'dist/sdi.min.js'
      }
    }
  });

  // Load plugins that provides the tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['concat','uglify']);

};