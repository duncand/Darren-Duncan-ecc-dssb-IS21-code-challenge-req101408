# BCGOV-APPINV - Local Deployment and Testing

This document consists of multiple parts; for a directory to all of the
parts, see [Overview](../README.md).

This part of the document explains how to install and run BCGOV-APPINV on a local
developer machine, which is also a basis that they can develop it further.

It also talks about how to run the automated tests locally.

These instructions assume a modern UNIX-like shell environment, like one
would have with a modern Linux or Apple MacOS system.  If you are using a
Microsoft Windows system, some alterations may be necessary.

## Installation

### Git

You are recommended to have Git <https://git-scm.com> installed on your
local machine, as a means to get the project source code, although you can
also download it without using that.

On MacOS, Apple provides Git as part of its devtools; you can cause it to
be installed by trying to run "git" in the Terminal which is initially a
shim and then you approve the Apple devtools install.

### Homebrew

The Homebrew <https://brew.sh> package manager for MacOS is used to install
other prerequisites such as Node.js, so Homebrew has to be installed first
to do that.

### Prerequisite - Node.js

You should have Node.js <https://nodejs.org> installed.
A common way to do so is using your operating system's package manager,
or with Homebrew <https://brew.sh> in the case of MacOS.

This will provide the `npm` (Node Package Manager) utility and other tools
you would use for most setup or runtime tasks afterwards.

### Project Source Code

Obtain the latest source code for this project from its current repository.
You can use a `git` client to clone/pull it, or GitHub can privide a zip file.

All shell command sequences given here to setup or run BCGOV-APPINV itself assume
your starting current working directory is the root level of your clone of
this project's source folder, unless otherwise stated.

### Node Package Manager

Before the first run of the BCGOV-APPINV-DBMS server, in a shell session, first
`cd` into the `bcgov-appinv-dbms` folder and run the following command, which
will fetch/install the server's additional JavaScript library dependencies:

```
    npm install
```

Before the first run of the BCGOV-APPINV-WEBAPP server, in a shell session, first
`cd` into the `bcgov-appinv-webapp` folder and run the following command, which
will fetch/install the server's additional JavaScript library dependencies:

```
    npm install
```

### Data File

BCGOV-APPINV-DBMS uses a JSON-formatted plain text file to keep its application
data in.  You need to supply such a valid file in a file system location of
your choice and tell the application where it is.

An example data file `data_seed_for_copying.json` is provided in the
`bcgov-appinv-dbms` folder of the project.  You should not specify this file
itself as your data file, but you can specify a duplicate of it.

If you want to use an "empty" data file, then you just need one that
defines an empty JSON array, so its entire content is just `[]`.

The following instructions assume you named your data file `data.json` and
located it in the same `bcgov-appinv-dbms` folder.

## Running the Servers

### BCGOV-APPINV-DBMS

To start the BCGOV-APPINV-DBMS server, in a shell session, first `cd` into the
`bcgov-appinv-dbms` folder and run either of the following commands,
adjusting for your choices of host or port data file path:

```
    HOST=localhost PORT=3000 DATA_FILE_PATH=data.json npm run start:dev
```

Or:

```
    npm run build
    HOST=localhost PORT=3000 DATA_FILE_PATH=data.json npm run start:prod
```

The first option of 1 command is easier when one is actively developing
this project.  The server is running in a mode that watches for changes to
the source code files, automatically reloads them if it sees any changed,
and provides some helpful diagnostics when some problems occur.

The second option of 2 commands is better for a production or
production-like situation.  The first command only needs to be run when
there are changes made to the project.  The second command will run the
server produced by the first command and will not auto-reload on changes.

Any environment variable can be set inline like shown here,
or by setting it in a `.env` file.

You are required to explicitly give the path of the data file as a safety
measure, so the server isn't going and making changes to any file except
what you specify.

If you do not explicitly set `DATA_FILE_PATH`, then the API will return a
503 response for every API call that would have needed to use the file.

The actual specified data file doesn't need to exist until the actual times
that API invocations are made of the server.  The server will re-read the
file for every API call, and validate that it is present and is a well
formed set of product records, and the API will return a 503 response if it
isn't without attempting to alter or create the file.  Assuming it is
valid, and the API invocation is also valid, any API invocation that is
a create/modify/remove request will rewrite the file.  You can manually
edit the file between API calls, including to fix it if it is damaged.

We assume only a single instance of BCGOV-APPINV-DBMS is running at a time for
any given data file, and that the server serializes handling of API calls;
it is not designed to handle concurrent access of multiple instances or
API calls to the same data file at once; data loss may occur in that case.

The `HOST` and `PORT` determine what the BCGOV-APPINV-DBMS server will listen on;
if either is not specified it will default to `127.0.0.1` (`localhost`) and
`80` respectively.

To stop the server, hit CTRL-C in the same shell session.

### BCGOV-APPINV-WEBAPP

To start the BCGOV-APPINV-WEBAPP server, in a shell session, first `cd` into the
`bcgov-appinv-webapp` folder and run either of the following commands,
adjusting for your choices of host or port:

```
    REACT_APP_DBMS_HOST=localhost REACT_APP_DBMS_PORT=3000 PORT=8080 npm start
```

Or:

```
    REACT_APP_DBMS_HOST=localhost REACT_APP_DBMS_PORT=3000 npm run build
    PORT=8080 npm run serve
```

The first option of 1 command is easier when one is actively developing
this project.  The server is running in a mode that watches for changes to
the source code files, automatically reloads them if it sees any changed,
and provides some helpful diagnostics when some problems occur.

The second option of 2 commands is better for a production or
production-like situation.  The first command only needs to be run when
there are changes made to the project.  The second command will run the
server produced by the first command and will not auto-reload on changes.

Any environment variable can be set inline like shown here,
or by setting it in a `.env` file.

The BCGOV-APPINV-WEBAPP server will listen on localhost port 8080, or whatever
alternate `PORT` you choose.  Make sure its not the same as BCGOV-APPINV-DBMS.

BCGOV-APPINV-WEBAPP will invoke BCGOV-APPINV-DBMS using the latter's location specified by
`REACT_APP_DBMS_HOST` and `REACT_APP_DBMS_PORT`.

To stop the server, hit CTRL-C in the same shell session.

## Using the BCGOV-APPINV Application

Visit <http://localhost:8080> in a web browser while both servers are
running to actually use the application as a regular end user.

Visit <http://localhost:3000/api/api-docs> to view the REST API
documentation or try out invoking it directly.

## Running the Automated Tests

Each of BCGOV-APPINV-DBMS and BCGOV-APPINV-WEBAPP includes an automated test suite.

The following assumes that `npm install` has been run, but that the
applications are not currently running.

### BCGOV-APPINV-DBMS

To run the BCGOV-APPINV-DBMS automated tests, in a shell session, first `cd` into
the `bcgov-appinv-dbms` folder and run any or all of the following options...

For unit tests:

```
DATA_FILE_PATH=data.json npm run test
```

For end-to-end tests:

```
DATA_FILE_PATH=data.json npm run test:e2e
```

For test coverage:

```
DATA_FILE_PATH=data.json npm run test:cov
```

You should see the output of the tests in the terminal.

### BCGOV-APPINV-WEBAPP

To run the BCGOV-APPINV-WEBAPP automated tests, in a shell session, first `cd` into
the `bcgov-appinv-webapp` folder and run the following:

```
npm test
```
