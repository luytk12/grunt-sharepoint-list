module.exports = function (grunt) {
  var nuspecs = grunt.file.expand(["Nuspecs/*.nuspec"]);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: ['pkg'],
        commit: false,
        createTag: false,
        push: false
      }
    },
    shell: {
      buildtest: {
        command: 'ng build --env=test --bh /TestApps/MyAccount/'
      },
      buildprod: {
        command: 'ng build --env=prod --bh /Apps/MyAccount/'
      },
    },
    availabletasks: {
      tasks: {
        options: {
          filter: 'exclude',
          tasks: ['availabletasks', 'default', 'updateversion'],
          showTasks: ['user']
        }
      }
    },
    prompt: {
      sharepoint_list: {
        options: {
          questions: [{
              config: 'username',
              type: 'input',
              message: 'Enter your username?',
              validate: function (value) {
                if (typeof (value) === 'undefined' || !value.length) {
                  return 'Must enter a username';
                }
                return true;
              }
            },
            {
              config: 'password',
              type: 'password',
              message: 'Enter your password:',
            },
            {
              config: 'title',
              type: 'input',
              message: 'Release title:',
              default: 'bugfix release',
              validate: function (value) {
                if (typeof (value) === 'undefined' || !value.length) {
                  return 'Must enter a title';
                }
                return true;
              }
            }, {
              config: 'releasenotes',
              type: 'input',
              message: 'Release notes:',
              default: 'release notes',
              validate: function (value) {
                if (typeof (value) === 'undefined' || !value.length) {
                  return 'Must enter notes';
                }
                return true;
              }
            }
          ],
          then: function (results) {
            grunt.config.set('sharepoint_list.newItem.options.username', results.username);
            grunt.config.set('sharepoint_list.newitem.options.password', results.password);
            grunt.config.set('sharepoint_list.newItem.options.listitem.Title', results.title);
            grunt.config.set('sharepoint_list.newItem.options.listitem.ReleaseNotes', results.releasenotes);
          }
        }
      }
    },
    sharepoint_list: {
      newItem: {
        options: {
          username: '***',
          password: '***',
          ntlm_domain: '***',
          list: 'yourSharepointList',
          base: 'https://yourCompany/depict',
          listitem: {
            __metadata: {
              type: 'SP.Data.ApplicationReleaseInfoListItem'
            },
            Project_x0020_NameId: 1, // 0 none, 1 UserManagement
            Application_x0020_NameId: 3, // 0 none, 3 MyAccount
            // Title: 'release title', // release title
            Release_x0020_Date: grunt.template.today('yyyy-mm-dd'),
            VersionNumber: '<%=pkg.version%>', // pkg Json ?
            //ReleaseNotes: 'fixed save alc check' // release notes
          }
        }
      },
    },
  });

  // Load the plugin that provides the tasks.
  require('load-grunt-tasks')(grunt);

  grunt.loadTasks('tasks');
  // Default task(s).
  grunt.registerTask('default', ['sharepoint_list']);
  grunt.registerTask('releaseInfo', 'write release info ton sharepoint', ['prompt:sharepoint_list', 'sharepoint_list:newItem']);
  grunt.registerTask('version', ['bump']);
  grunt.registerTask('live', ['bump', 'shell:buildprod']);
  grunt.registerTask('test', ['shell:buildtest']);

};
