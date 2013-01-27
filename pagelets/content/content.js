// content.js
// Displays the page main content
define(['pagelet', 'underscore', 'fs', 'path', 'module', 'conf'], function(Pagelet, _, fs, path, module, conf) {
    var pagelet = new Pagelet;

    return _.extend(pagelet, {
        moduleUri: module.uri,
        run: function (display, request) {
            var layoutPath = path.join(conf.dir.pagelets, this.dirName, 'layouts', this.options.layout),
                // if there are no contents specifically set to be displayed
                // then check the request URL if a specific content URL is being
                // requested.
                contents = this.options.contents.length ? this.options.contents : request.params.slice(1);

            requirejs([layoutPath], function (layout) {
                layout.render(contents, display);
            });
        }
    });
});