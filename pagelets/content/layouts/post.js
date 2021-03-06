// post.js
// This layout displays single post contents on a page.
// Intended for the use to display specific articles.
define(['fs', 'path', 'conf', 'async', 'marked'], function(fs, path, conf, async, marked) {
    return {
        render: function (contents, display) {
            var output = '';

            if (contents.length) {
                // prepare the page (grid) for all contents.
                // Each content should have its own place on the page.
                output +=
                    '<div class="row">' +
                        '<article class="mobile-four columns" id="content-' + contents[0] + '"></article>' +
                    '</div>';

                for (var i = 1; i < contents.length; i += 2) {
                    output +=
                        '<div class="row">' +
                            '<div class="six columns" id="content-' + contents[i] + '"></div>' +
                            '<div class="six columns" id="content-' + (i + 1 < contents.length ? contents[i + 1] : '') + '"></div>' +
                        '</div>';
                }

                output =
                    '<script>' +
                        'document.getElementById("content").innerHTML = \'' + output + '\';' +
                    '</script>';

                display(output, true);

                function renderContent(content, done) {
                    var contentPath = path.join(conf.dir.contents, content + conf.file.extensions.markdown);

                    fs.readFile(contentPath, 'utf8', function (err, data) {
                        if (err) {
                            console.log('Could not read ' + contentPath + ' content.');
                        }
                        else{
                            var containerID = 'content-' + content,
                                contentID = containerID + '-body';

                            // now need to trim the content to display only the excerpt of it.
                            var match = data.match(/<a[^>]+class="[^"]*more[^"]*"[^>]*>[^<]+<\/a>/);

                            if (match) {
                                var ix = data.indexOf(match[0]);

                                // remove the "Read more" button
                                data = data.substring(0, ix) + data.substring(ix + match[0].length);
                            }

                            data = '<div class="hide" id="'+ contentID +'">' + marked(data) + '</div>' +
                                '<script>' +
                                    'var contentBody = document.getElementById("'+ contentID +'");' +
                                    'document.getElementById("' + containerID + '").innerHTML = ' +
                                        'contentBody.innerHTML;' +
                                    'contentBody.parentNode.removeChild(contentBody);' +
                                '</script>';

                            display(data, true);
                        }
                        done();
                    });
                }

                async.forEach(contents, renderContent, function (err) {
                    display();
                });
            }
            else{
                display();
            }
        }
    };
});