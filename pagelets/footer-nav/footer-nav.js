// navigation.js
// Displays main menu
define(['pagelet', 'underscore', 'fs', 'path', 'module', 'conf', 'handlebars'], function(Pagelet, _, fs, path, module, conf, Handlebars) {
    Handlebars.registerHelper('link', function(text, url) {
        text = Handlebars.Utils.escapeExpression(text);
        url  = Handlebars.Utils.escapeExpression(url);

        var result = '<a href="' + url + '">' + text + '</a>';

        return new Handlebars.SafeString(result);
    });

    Handlebars.registerHelper('listInline', function(items, options) {
        var out = '<ul class="inline-list right">';

        for(var i = 0, l = items.length; i < l; i++) {
            out = out + '<li class="font12">' + options.fn(items[i]) + '</li>';
        }

        return out + '</ul>';
    });

    var pagelet = new Pagelet;

    return _.extend(pagelet, {
        moduleUri: module.uri,
        run: function (display, request) {
            var _this = this;

            fs.readFile(path.join(_this.dir, _this.dirName + conf.file.extensions.template), 'utf8', function (err, data) {
                if (err) {
                    console.log('Could not read ' + _this.dir + ' pagelet.');
                    display();
                }
                else{
                    var template = Handlebars.compile(data),
                        menuFile = path.join(conf.root_dir, path.dirname(_this.moduleUri), 'data');

                    requirejs([menuFile], function(menus) {
                        var activeMenus = _.map(menus, function (link) {
                            var activeLink = _.clone(link);

                            if (request.url == activeLink.href) {
                                activeLink.active = true;
                            }

                            return activeLink;
                        });

                        display(template({menus: activeMenus}));
                    });
                }
            });
        }
    });
});