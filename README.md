# my-migration-sql


![Latest release](https://badgen.net/github/release/DenisFerrero/my-migration-sql)
![Latest tag](https://badgen.net/github/tag/DenisFerrero/my-migration-sql)
![CI Badge](https://badgen.net/github/status/DenisFerrero/my-migration-sql/master/ci)
![Created](https://badges.pufler.dev/created/DenisFerrero/my-migration-sql)
![Updated](https://badges.pufler.dev/updated/DenisFerrero/my-migration-sql)
![License](https://badgen.net/github/license/DenisFerrero/my-migration-sql)
![NPM Version](https://badgen.net/npm/v/my-migration-sql)


## Table of content
- [Install](#installation)
- [Basic](#basic)
- [Constructor options](#constructor-options)
  - [my-migration-sql](#my-migration-sql)
  - [saveOptions](#saveoptions)
- [Methods](#methods)
  - [my-migration-sql](#my-migration-sql)
  - [saveOptions](#saveOptions)
- [Other information](#other-information)


## Installation

[NodeJS](https://nodejs.org/) module to automatically load migration and other queries using [MySQL](https://github.com/mysqljs/mysql) node instance
Install NodeJS from the [official website](https://nodejs.org/en/download/) by dowloading the version based on your O/S
Then in your project workspace console run
```sh
npm install my-migration-sql
```
This command'll install the package

## Basic
```js
const { migrations } = require('my-migration-sql');

let migrations = new Migration({
  Connection: MySQLConnection,
  saveOptions: {
    type: 'mysql',

  },
  path: 'migrations'
});

migrations.up();
```
This code'll use a MySQL instance to load all the migrations files in the folder called *migrations* and save the migrated ones in a table in MySQL

## Constructor options 
- ### my-migration-sql

| Option                   | Type              | Explanation              |
|---------------------------|----------------------------|--------------------------|
| ``Connection``            | ``MySQL instance``             |Instance of MySQL using [createConnection method](https://github.com/mysqljs/mysql/blob/master/Readme.md#establishing-connections)|
| ``path``                  | ``String``                           |Path to the migration folder, can be helpful using [NodeJS path lib](https://www.npmjs.com/package/path)                          |
| ``saveOptions``               | ``saveOptions instance`` or ``object``|Options used to manage (save or remove) already migrated files|

- ### saveOptions
| Option              | Type               | Explanation        |
|---------------------|--------------------|--------------------|
| ``type``            | ``String``         | Type of saving method of migrated files.Available type:<ul><li>``'mysql'``</li></ul>Default: ``'mysql'``|
| ``Connection``      | ``MySQL instance`` | Same instance of MySQL of the migrations, used to make queries to the database|
| ``table_meta``      | ``String``         | if used ``mysql`` type assign custom name to the table where saving migrations.<br>Default: ``'mysql-meta'``

## Methods

- ### my-migration-sql
| Method      | Return type | Accepted parameter                          | What does it do?                                                                                                                                                                             |
|-------------|-------------|---------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ``up``      | ``Promise`` | ``migration_name`` or ``[migration_names]`` | Execute and load migration_name or migration_names present in the migration path to the database and save the changes. If none migration_name used the method'll load all pending migration  |
| ``down``    | *none*      | ``migration_name``                          | Downgrade and unload migration_name or migration_names present in the database. If none migration_name used the method'll unload all migrations (TODO)                                       |
| ``pending`` | *none*      | *none*                                      | Get the migrations that are still not loaded to the database                                                                                                                                 |

- ### saveOptions
| Method               | Return type | Accepted parameter | What does it do?                                            |
|----------------------|-------------|--------------------|-------------------------------------------------------------|
| ``getAllMigrated``   | ``Promise`` | *none*             | Return all migrated files to the database                   |
| ``load``             | *none*      | ``migration_name``     | Save the *migration_name* as migrated to the storage option |
| ``unload``           | *none*      | ``migration_name``     | Remove the *migration_name* from the storage option         |
| ``isValid``          | ``Boolean`` | *none*             | Return if the storageOption is valid or not                 |


## Other information

[![https://nodei.co/npm/my-migration-sql.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/my-migration-sql.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/my-migration-sql)

### Contributors
![Contributors](https://contrib.rocks/image?repo=DenisFerrero/my-migration-sql)