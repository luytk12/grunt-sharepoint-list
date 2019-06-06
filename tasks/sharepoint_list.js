/*
 * grunt-sharepoint-list
 * https://github.com/bekoelu/grunt-sharepoint-list
 *
 * Copyright (c) 2019 Koen Luyten
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  grunt.registerMultiTask('sharepoint_list', 'add item to sharepoint list', function () {
    var options = this.options({
      username: '',
      password: '',
      ntlm_domain: '',
      base: '',
      list: '',
      headers: {
        'accept': 'application/json;odata=verbose'
      }
    });

    var ntlm = require('request-ntlm-lite');
    var done = this.async();
 
    options.url = `${options.base}/_api/contextinfo`;
    ntlm.post(options, null, function (err, response) {
      if (parseInt(response.statusCode) !== 200) {
        grunt.log.writeln(response.statusCode + ' - ' + response.statusMessage);
      } else if (!err) {
        var body = JSON.parse(response.body).d.GetContextWebInformation;
        options.url = `${options.base}/_api/lists/getbytitle(\'${options.list}\')/items`;
        options.headers["x-requestdigest"] = body.FormDigestValue;
        options.headers["accept"] = "application/json;odata=verbose";
        options.headers["Content-Type"] = "application/json;odata=verbose";
        var json = JSON.stringify(options.listitem);
        ntlm.post(options, json, function (err, response) {
          grunt.log.writeln(response.body);
          grunt.log.writeln('item posted');
          done();
        });
      }
    });

    grunt.log.writeln('finished');
  });
};