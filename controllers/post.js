define(['baseController', 'module'], function(BaseController, module) {
    return BaseController.override({
		title: function(request) {
            var words, title = '';

            if (request.url.indexOf('index.php') > -1) {
                switch (request.params[1]) {
                    case '6': words = 'accommodation'; break;
                    case '44': words = 'location'; break;
                    case '36': words = 'tours-around-kyrgyzstan'; break;
                    case '1':
                    default: words = 'contacts';
                }
                request.params = [request.url, '/' + words];
            }
            else{
                words = request.url.slice(1);
            }

            words = words.split('-');

            words.forEach(function (word) {
                if (word.length > 0) {
                    title += ' ' + word.charAt(0).toUpperCase() + word.slice(1);
                }
            });

            return title.slice(1) + ' - Radison Guesthouse in Kyrgyzstan!';
        },
        moduleId: module.id,
        layout: 'front-page',
        css: ['front-page.less', 'front-page2.less'],
        pagelets: [
            {
                name: 'content',
                options: {
                    layout: 'post',
                    contents: []
                },
                // these sub-pagelets are run AFTER this pagelet has finished rendering
                // its contents
                pagelets: [
                    {name: 'navigation'},
                    {name: 'ga'},
                    {name: 'footer-nav'}
                ]
            }
        ]
	});
});