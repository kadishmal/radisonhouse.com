define(['baseController', 'module'], function(BaseController, module) {
    return BaseController.override({
        title: 'Welcome to Radison Guesthouse in Bishkek, Kyrgyzstan!',
        moduleId: module.id,
        layout: 'front-page',
        css: ['front-page.less', 'front-page2.less'],
        pagelets: [
            {
                name: 'content',
                options: {
                    layout: 'front-page',
                    contents: [
                        'welcome',
                        'accommodation',
                        'tours-around-kyrgyzstan',
                        'wifi-internet',
                        'location'
                    ]
                }
            },
            {name: 'navigation'},
            {name: 'ga'},
            {name: 'footer-nav'}
        ]
    });
});