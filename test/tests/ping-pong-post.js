/*
 * Copyright 2011 eBay Software Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var express = require('express'),
    fs = require('fs'),
    util = require('util');

exports.setup = function (cb) {
    var server = express.createServer(function (req, res) {
        var data = '';
        req.on('data', function(chunk) {
            data += chunk;
        });
        req.on('end', function() {
            res.send(data);
        });
    });

    server.listen(80126, function () {
        cb({server:server});
    });
}


exports.tearDown = function(cb, ctx){
    ctx.server.close();
    cb();
}

exports.test = function (test, err, result) {
    if (err) {
        console.log(err.stack || util.inspect(err, false, null));
        test.fail('got error');
    }
    else {
        test.deepEqual(result.body, { val:{ postPayload:{ ItemID:'abcd', UserID:'xyz' } } });
    }
}

