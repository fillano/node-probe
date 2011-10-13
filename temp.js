var start = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/></head><style>table {border: solid 1px black;}\ntr{border: solid 1px black;}\ntd {border: solid 1px black;}\n</style><body>\n';
var head = 'node.js version: {$version}<table border="1" cellspacing="0" cellpadding="3">\n';
var title = '<tr><td colspan="2" style="background-color: #336699; color: white">{$title}</td></tr>\n';
var body = '<tr style="vertical-align:top"><td style="background-color: #aaccee">{$name}</td><td width="90%"><code><pre>{$value}</pre><code></td></tr>\n';
var footer = '</table>\n';
var end = '</body></html>\n';
module.exports = {
    "render": function(obj, cb) {
        var data = '', 
        err = false;
        if(obj.start) {
            data += start;
        }
        if(obj.head) {
            data += head.replace(/\{\$version\}/g, obj.head);
        }
        if(obj.title) {
            data += title.replace(/\{\$title\}/g, obj.title);
        }
        if(obj.body) {
            for(var i=0; i<obj.body.length; i++) {
                var tmp = body.replace(/\{\$name\}/g, obj.body[i].name);
                data += tmp.replace(/\{\$value\}/g, obj.body[i].value);
            }
        }
        if(obj.footer) {
            data += footer;
        }
        if(obj.end) {
            data += end;
        }
        cb(err, data); 
    }
};
