# my-migration-sql

![Latest release](https://badgen.net/github/release/DenisFerrero/my-migration-sql)
![Latest tag](https://badgen.net/github/tag/DenisFerrero/my-migration-sql)
![Created](https://badges.pufler.dev/created/DenisFerrero/my-migration-sql)
![Updated](https://badges.pufler.dev/updated/DenisFerrero/my-migration-sql)
![License](https://badgen.net/github/license/DenisFerrero/my-migration-sql)
![NPM Version](https://badgen.net/npm/v/my-migration-sql)


## Table of content
- [Installation](#installation)
- [Basic](#basic)
- [Options](#options)
  - [Costructor](#costructor)
  - [Methods](#methods)
- [Other information](#other-information)
- [Migration generate tool](#migration-generate-tool)
- [Issues and Feature](#issues-and-feature)
- [Contributors](#contributors)


## Installation

[NodeJS](https://nodejs.org/) module to automatically load migrations and other queries using [MySQL](https://github.com/mysqljs/mysql) node instance
Install NodeJS from the [official website](https://nodejs.org/en/download/) by downloading the version based on your O/S
Then in your project workspace console run this command
```sh
npm install my-migration-sql
```
You'll install the package

## Basic
```js
const { migrations } = require('my-migration-sql');

let Migration = new migrations({
  Connection: MySQLConnection,
  saveOptions: {
    type: 'mysql',

  },
  path: 'migrations'
});

Migration.up();
```
This code'll use a MySQL instance to load all the migrations files in the folder called *migrations* using up method and save the migrated ones in a table in MySQL

## Options 
### Costructor
#### my-migration-sql

| Option                   | Type              | Explanation              |
|---------------------------|----------------------------|--------------------------|
| ``Connection``            | ``MySQL instance``             |Instance of MySQL using [createConnection method](https://github.com/mysqljs/mysql/blob/master/Readme.md#establishing-connections)|
| ``path``                  | ``String``                           |Path to the migration folder, can be helpful using [Node Path](https://www.npmjs.com/package/path)                          |
| ``saveOptions``               | ``saveOptions instance`` or ``object``|Options used to manage (save or remove) already migrated files|

#### saveOptions
| Option              | Type               | Explanation        |
|---------------------|--------------------|--------------------|
| ``type``            | ``String``         | Type of saving method of migrated files.Available type:<ul><li>``'mysql'``</li></ul>Default: ``'mysql'``|
| ``Connection``      | ``MySQL instance`` | Same instance of MySQL from the migrations, used to make queries to the database|
| ``table_meta``      | ``String``         | **only ``mysql`` type**, assign custom name to the table where saving migrations.<br>Default: ``'mysql-meta'``

### Methods
#### my-migration-sql
| Method      | Return type | Accepted parameter                          | What does it do?                                                                                                                                                                             |
|-------------|-------------|---------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ``up``      | ``Promise`` | ``migration_name`` or ``[migration_names]`` | Execute and load migration_name or migration_names present in the migration path to the database and save the changes. If none migration_name used the method'll load all pending migrations  |
| ``down``    | *none*      | ``migration_name``                          | Downgrade and unload migration_name or migration_names present in the database. If none migration_name used the method'll unload all migrations (TODO)                                       |
| ``pending`` | *none*      | *none*                                      | Get the migrations that are still not loaded to the database                                                                                                                                 |

#### saveOptions
| Method               | Return type | Accepted parameter | What does it do?                                            |
|----------------------|-------------|--------------------|-------------------------------------------------------------|
| ``getAllMigrated``   | ``Promise`` | *none*             | Return all migrated files to the database                   |
| ``load``             | *none*      | ``migration_name``     | Save the *migration_name* as migrated to the storage option |
| ``unload``           | *none*      | ``migration_name``     | Remove the *migration_name* from the storage option         |
| ``isValid``          | ``Boolean`` | *none*             | Return true if the storageOption is valid to operate                 |

## Migration generate tool
It's also available a tool that can generate a new migration file, by running
```sh
node node_modules/my-migration-sql/src/generateMigration.js
```
you'll create a new migration file called *default_name* in the folder *migrations*.
To customize the options of the file you can use add some args to the command
| Args                | What does?          |
|---------------------|---------------------|
| ``name``            | Customize the name of the migration. Default: 'default_name' |
| ``path``            | Customize the path where save the migration. Default: 'migrations' |

#### For example:

```sh
node node_modules/my-migration-sql/src/generateMigration.js --name=ExampleName --path=./example/test_migration 
```

Create a new migration called ExampleName and save into the folder ./example/test_migration

This is just a demo for this feature because it would be much better have a much cleaner command to run.

**IMPORTANT** Due to the requirement of *node_modules* folder if you have a [dockerized application](https://www.docker.com/) you have to run
``` npm install ``` anyway to run the use command

**REMEMBER** For now in the ``down`` and in the ``up`` variable is just allowed use a `String` to declare the query

## Other information

[![https://nodei.co/npm/my-migration-sql.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/my-migration-sql.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/my-migration-sql)

<a href="https://www.buymeacoffee.com/DenisFerrero" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

## Issues and Feature

If you have an idea for a new feature or you found a bug please report it in the [issues section](https://github.com/DenisFerrero/my-migration-sql/issues) 

## Contributors
![Contributors](https://contrib.rocks/image?repo=DenisFerrero/my-migration-sql)