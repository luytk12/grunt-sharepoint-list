# grunt-sharepoint-list

> add item to sharepoint list

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sharepoint-list --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sharepoint-list');
```

## The "sharepoint_list" task

### Overview
In your project's Gruntfile, add a section named `sharepoint_list` to the data object passed into `grunt.initConfig()`.

```js

grunt.initConfig({
  sharepoint_list: {
      options: {
        username: '', // used user account
        password: '',
        ntlm_domain: '',
      },
      newItem: {
        options: {
          list: '', // sharepoint list to post to
          base: '', // sharepoint base url
          listitem: { // posted list item 
            __metadata : {
              type: 'SP.Data.ApplicationReleaseInfoListItem'
            },
            Project_x0020_NameId: 0,
            Application_x0020_NameId: 0,
            Title: '', 
            Release_x0020_Date: grunt.template.today('dd/mm/yyyy'),
            VersionNumber: '', 
            ReleaseNotes: '' 
          }
        }
      },
  },
});
```

### Options

#### options.username
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

### Usage Examples

```js
  sharepoint_list: {
      options: {
        username: '',
        password: '',
        ntlm_domain: '',
      },
      newItem: {
        options: {
          list: 'ApplicationReleaseInfo',
          base: 'https://together.reynaers.com/depict',
          listitem: {
            __metadata : {
              type: 'SP.Data.ApplicationReleaseInfoListItem'
            },
            Project_x0020_NameId: 0,
            Application_x0020_NameId: 0,
            Title: 'new release title', 
            Release_x0020_Date: grunt.template.today('dd/mm/yyyy'),
            VersionNumber: '1.0.0', 
            ReleaseNotes: 'all info about the release' 
          }
        }
      },
  },
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
