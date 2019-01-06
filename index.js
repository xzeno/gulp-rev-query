var through = require('through2');

module.exports = function(ver) {
    var ver = ver || 'ver'
    // convert a-xxxxxxxx.css to a.css?ver=xxxxxxxx
    function hashToQuery(file) {
        var content = new String(file.contents);
        content = content.replace(/(\-(\w+))([\.\w]+)/g, function($, $1, $2, $3) {
            return $3 + '?' + ver + '=' + $2;
        })
        .replace(/\n[\s]+\"/g, '\n  "/');
        file.contents = new Buffer(content);
        file.ver = ver;
        return file;
    }
    return through.obj(function(file, encoding, callback) {
        callback(null, hashToQuery(file));
    });
};
