// front-page.js
// This layout displays multiple contents on one page.
// Intended for the use on front pages.
// The first article will be displayed in full length
// on the top of the page taking full width space.
// The rest articles will be trimmed to certain
// number of characters and will have "Read more" like
// button. These articles will be displayed two on one
// row.
define(['fs', 'path', 'conf', 'async', 'marked'], function(fs, path, conf, async, marked) {
    return {
        render: function (contents, display) {
            var output = '';

            if (contents.length) {
                var columns = (contents.length > 2 ? 'six' : 'twelve');
                // Prepare the page (grid) for all contents.
                // Each content should have its own place on the page.
                output +=
                    '<div class="row">' +
                        '<div class="twelve columns" id="content-' + contents[0] + '"></div>' +
                    '</div>';

                if (contents.length > 1) {
                    output +=
                        '<div class="row">' +
                            '<div class="' + columns + ' columns">';
                    // first build up the first column
                    for (var i = 1; i < contents.length; i += 2) {
                        output +=
                            '<div class="row">' +
                                '<div class="twelve columns" id="content-' + contents[i] + '"></div>' +
                            '</div>';
                    }
                    // close the "twelve columns"
                    output += '</div>';
                    // then build up the second column
                    if (contents.length > 2) {
                        output += '<div class="' + columns + ' columns">';

                        for (var i = 2; i < contents.length; i += 2) {
                            output +=
                                '<div class="row">' +
                                    '<div class="twelve columns" id="content-' + contents[i] + '"></div>' +
                                '</div>';
                        }

                        // close the "twelve columns"
                        output += '</div>';
                    }
                    // close the "row"
                    output += '</div>';
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
                                data = data.substring(0, data.indexOf(match[0]) + match[0].length);
                            }

                            data = '<div class="hide chunked" id="'+ contentID +'">' + marked(data) + '</div>' +
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