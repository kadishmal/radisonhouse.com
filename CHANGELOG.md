# Radison Guesthouse Web App Change Log

## Version 2.0 January 27, 2013

- v2.0: New Radison Guesthouse website based on Pulsr Node.js Web Framework.

# Pulsr Web App Framework Change Log

## Version 0.1.7 January 5, 2013

- New: created imageFileHandler to handle image file requests.
- Test: moved image related tests from fileHandler to imageFileHandler.

## Version 0.1.6 January 5, 2013

- Fix: CSS/LESS files should be served from requested directories not from /less only.
- Fix: favicon icons as well as plain text files from the root directory should be accessible.
- Test: added test cases to fileHandler to request favicon icons.
- Test: add a test lessFileHandler to request CSS files from a different directory.
- Doc: updated docs.
- Com: updated comments.
- Make: added a script to build docs.

## Version 0.1.5 January 2, 2013

- Enh: define allowed mime types as an object instead of an array.
- Enh: Array.indexOf seems to be faster than its RegExp equivalent.
- Enh: allowedDirsRE RegEx should test for full words not substrings.
- Enh: now multiple mime types can be handled by one file handler. Formerly a file handler could handle only a specific file extension.
- Ref: refactored the code.

## Version 0.1.4 December 31, 2012

- New: Gzip and Cache-enable static HTML files.
- Ref: updated comments in *pulsr/gzip.js*.
- Doc: updated docs.
- Com: updated the comment.
- Git: don't track the "assets" directory.

## Version 0.1.3 December 29, 2012

- New: split mqueries.less into two files: MQ min-width:768px and max-width: 767px.
- Enh: when requesting mqueries on iPad serve only min-width:768px MQ. No need to serve mobile-only MQ on iPad.
- Ref: removed headers.js module. No need.
- Test: fixed jsFileHandler test.
- Test: added a new test to fileHandler.

## Version 0.1.2 December 23, 2012

- New: allow access to static files located only in permitted directories.
- Enh: upgraded uglify-js to v2.2.2 from uglify-js2 v2.1.6, requirejs to v2.1.2 from 2.1.1.
- Enh: allow `image/jpeg` mime type.
- Enh: refactored package.json: listed module dependencies in alphabetical order.
- Enh: don't allow directories to be requested. Return 403 Forbidden error.
- Enh: make sure user doesn't try to access restricted areas using "../" relative path.
- Enh: refer to /less directory instead of /css for consistency.
- Test: additional test for RestController.
- Test: added a new fileHandler test.

## Version 0.1.1 December 23, 2012

- New: added a **restController** which users can override to provide their own RESTful APIs.
- New: users can indicate a **default** action for a RestController.
- Enh: renamed a **base** controller to a **baseController**
- Enh: added an `override` function which provides an easy way to override **baseController**.
- Enh: updated a sample **api.js** controller which handles RESTful requests.
- Test: added a test case for RestController.
- Docs: updated docs.

## Version 0.1.0 December 18, 2012

- Enh: retrieve layouts using fileCache as well.
- Test: added a test suit for a base controller.

## Version 0.0.9 December 18, 2012

- New: a fileCache module which caches files stat information. Uses async-cache module.
- New: use fileCache module to get file stat information.
- New: allow users to configure fileCache settings.
- Enh: code refactoring.
- Enh: use app port when in dev environment.
- Test: add "www" subdomain instead of a root domain to Travis script.

## Version 0.0.8 December 18, 2012

- New: use Streams to stream static files instead of reading into memory.
- Test: setup Travis script.
- Test: added jsFileHandler and lessFileHandler tests.
- Doc: added MIT license file.
- Doc: updated README.

## Version 0.0.7 December 15, 2012

- New: initial release.