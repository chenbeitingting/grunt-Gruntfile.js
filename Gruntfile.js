module.exports = function(grunt) {
	var sitepath="./";
	// 项目配置(任务配置)
	// 配置Grunt各种模块的参数
	grunt.initConfig({
		jshint: {
			options: {
				eqeqeq: true,
				trailing: true
			},
			files: ['Gruntfile.js', 'static/**/*.js']
		},
		watch: {
			client: {
				files: ['**'],
				options: {
					livereload: true
				}
			}
		},
		//合併
		concat: {
			options: {
			},
			dist: {
				src: ['javascripts/lib/zepto.js','javascripts/lib/touch.js','javascripts/lib/transition.js','javascripts/lib/iscroll-probe.js','javascripts/base.js','javascripts/index.js'],//src文件夹下包括子文件夹下的所有文件
				dest: 'temp/built.js'//合并文件在dist下名为built.js的文件
			},

			css: {
				src: ['stylesheets/**/*.css'],//当前grunt项目中路径下的src/css目录下的所有css文件
				dest: 'temp/all.css'  //生成到grunt项目路径下的dist文件夹下为all.css
			}
		},
		//壓縮js
		uglify: {
            options:{
                compress : {

                }
            },
			build: {
				src: 'temp/built.js',//压缩源文件是之前合并的buildt.js文件
				dest: 'dist/built.min.js'//压缩文件为built.min.js
			}
		},
		//壓縮css
		cssmin: { //css文件压缩
			css: {
				src: 'temp/all.css',//将之前的all.css
				dest: 'dist/all.min.css'  //压缩
			}
		},
		//使用compass編譯css
	/*	compass: {
			sprite: {
				options: {
					sassDir: 'sass',
					specify: 'sass/sprite.scss',
					cssDir : 'styleSheet',
					imagesDir: "sprite"
				}
			}
		},*/
		//指定的文件都会被修改文件名, 文件名前加入 md5 字符串
		rev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 8
			},
			assets: {
				files: [{
					src: [
						'dist/all.min.css',
						'dist/built.min.js'
					]
				}]
			}
		},
		/**
		tindex.html需要标注哪些需要替换
		  <!-- build:css dist/all.min.css -->
	    <link rel="stylesheet" type="text/css" href="stylesheets/lib/transition.css"/>
	    <link rel="stylesheet" type="text/css" href="stylesheets/application.css"/>
	    <!-- endbuild -->
	    <!-- build:js dist/built.min.js -->
	    <script type="text/javascript" src="javascripts/lib/zepto.js"></script>
	    <script type="text/javascript" src="javascripts/lib/touch.js"></script>
	    <script type="text/javascript" src="javascripts/lib/transition.js"></script>
	    <script type="text/javascript" src="javascripts/lib/iscroll-probe.js"></script>
	    <script type="text/javascript" src="javascripts/base.js"></script>
	    <script type="text/javascript" src="javascripts/index.js?v=1.1"></script>
	    <!-- endbuild -->
	    */
		useminPrepare: {
			index:{
				src:'tindex.html',
				dest:'index.html'
			}
		},
		usemin: {
			html: 'index.html',
			options: {
				assetsDirs: ['']
			}
		},
		//清除文件
		clean: ["dist/*.min.*","index.html"],
		//于复制文件或目录的插件。
		copy: {
			main: {
				expand: true,
				src: 'tindex.html',
				dest: '',
				rename: function(dest, src) {
					return 'index.html';
				}
			}
		}
	});

	// 加载插件
	// 从node_modules目录加载模块文件
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-css');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	/*grunt.loadNpmTasks('grunt-contrib-compass');*/
	grunt.loadNpmTasks('grunt-rev');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');
	// 自定义任务
	// 每行registerTask定义一个任务
	grunt.registerTask('live', ['watch']);
	grunt.registerTask('check', ['jshint']);
	grunt.registerTask('build', ['clean','copy:main','concat','uglify','cssmin','rev','usemin']);
	// 加载包含 "uglify" 任务的插件。

	// 默认被执行的任务列表。
	grunt.registerTask('default', ['clean','copy:main','concat','uglify','cssmin','rev','usemin']);
};