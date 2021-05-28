module.exports = {
    port: process.env.PORT || 3000,
    path_static: './cite',
    MIME_TYPES: {
        html: 'text/html; charset=UTF-8',
        css: 'text/css',
        js: 'application/javascript',
        png: 'image/png',
        jpg: 'image/jpeg',
        mp4: 'video/mp4'
    }
}