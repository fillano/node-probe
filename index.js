var temp = require('./temp');
module.exports = {
    start: function() {
        var ret = '';
        temp.render({start:true}, function(err, data) {if(!err) ret += data;});
        return ret;
    },
    end: function() {
        var ret = '';
        temp.render({end:true}, function(err, data) {if(!err) ret += data;});
        return ret;
    },
    body: function(target, title, partial) {
        var ret = '';
        function cb(err, data) {
            if(!err) {
                ret += data;
            }
        }
        if(!partial) {
            temp.render({"start":true}, cb);
        }
        temp.render({"head": process.version}, cb);
        var tmp = [];
        for(var i in target) {
            (function(name, value) {
                //tmp.push({"name":name,"value":value+''});
                var str = '';
                switch(typeof value) {
                    case 'function':
                        str += value;
                        break;
                    case 'object':
                        try {
                            var tmp1 = JSON.stringify(value).replace(/,"/g, ',\n  "');
                            str += (tmp1.indexOf('[')===0? 'array:\n':'object:\n') + tmp1;
                        } catch(e) {
                            str += 'object';
                        }
                        break;
                    case 'number':
                        str += 'number: ' + value;
                        break;
                    case 'string':
                        str += 'string: ' + value;
                        break;
                    case 'null':
                        str += 'null';
                        break;
                    case 'undefined':
                        str += 'undefined';
                        break;
                    case 'NaN':
                        str += 'NaN';
                        break;
                    case 'boolean':
                        str += 'boolean: ' + value;
                        break;
                    default:
                        break;
                }
                tmp.push({"name":name,"value":str});
            })(i, target[i]);
        }
        temp.render({"title": title, "body": tmp}, cb);
        temp.render({"footer": true}, cb);
        if(!partial) {
            temp.render({"end":true}, cb);
        }
        return ret;
    },
};
