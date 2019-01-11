/*
 * grunt-sharepoint-list
 * https://github.com/bekoelu/grunt-sharepoint-list
 *
 * Copyright (c) 2019 Koen Luyten
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    sharepoint_list: {
      options: {
        username: '***',
        password: '***',
        ntlm_domain: '***',
      },
      newItem: {
        options: {
          list: 'yourSharepointList',
          base: 'https://yourCompany/depict',
          listitem: {
            __metadata : {
              type: 'SP.Data.yourSharepointlistItem'
            },
            Project_x0020_NameId: 0, // 0 none, 5 ERP - Horizon
            Application_x0020_NameId: 0, // 0 none, 7 Horizon Outlook Add-In
            Title: 'new release title', // release title
            Release_x0020_Date: grunt.template.today('dd/mm/yyyy'),
            VersionNumber: '1.0.0', // pkg Json ?
            ReleaseNotes: 'all info about the release' // release notes 
          }
        }
      },
    },

  });

  grunt.loadTasks('tasks');
  grunt.registerTask('default', ['sharepoint_list']);
};
