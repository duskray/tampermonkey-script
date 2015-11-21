// ==UserScript==
// @name         bcydownloader
// @namespace    
// @version      0.1
// @description  download images in bcy.net
// @author       duskray
// @match        http://bcy.net/coser/detail/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

var img = document.querySelectorAll("img.detail_std.detail_clickable");
var div = document.querySelectorAll("div.l-right.posr.publish-btn");
var btn = div[0].cloneNode(true);
btn.className = 'l-right';
btn.style.marginRight = '10px';

var span = btn.getElementsByTagName('SPAN')[0];
span.innerHTML = "获取";

var row = document.querySelectorAll("div.row");
row[0].appendChild(btn);

btn.onclick = function() {
    for(var i = 0; i < img.length; i++) {
        var a = document.createElement('a');
        a.href = img[i].src.replace(/\/w650/, '');
        a.download = ((new Date()).getTime() + '.jpg');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}
