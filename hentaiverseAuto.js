// ==UserScript==
// @name      hentaiverse自动战斗
// @namespace https://greasyfork.org/zh-CN/scripts/22809-hentaiverse%E8%87%AA%E5%8A%A8%E6%88%98%E6%96%97
// @match     http://hentaiverse.org/?s=Battle&ss=ar*
// @match     http://hentaiverse.org/?s=Battle&ss=gr*
// @match     http://hentaiverse.org/?s=Battle&ss=iw*
// @author    duskray
// @version   V0.0.1
// @require   http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// ==/UserScript==

var monster = $('#monsterpane').find('.btm1');
var btnContinue = $('#ckey_continue');
var buff = [];
var stopFlag = false;

if (monster.length === 0) {
  return;
}

document.addEventListener('keydown', function (e) {
  if(e.keyCode==32){
    stopFlag = true;
  }
});

setTimeout(function(){
  //if (btnContinue.length > 0 && /continue/.test(btnContinue.attr('src')) && !stopFlag) {
  if (btnContinue.length > 0 && btnContinue.attr('src') && !stopFlag) {
    btnContinue.click();
    //console.log('战斗胜利');
  } else {
    $('#mainpane .bte').eq(0).find('img').each(function(i, v) {
      buff.push($(v).attr('src'));
    });

    var HP = parseInt(Number($('.stuffbox.csp .cwbdv .cwb2').eq(0).css('width').replace(/px/g, ''))/120*100);
    var MP = parseInt(Number($('.stuffbox.csp .cwbdv .cwb2').eq(1).css('width').replace(/px/g, ''))/120*100);
    var SP = parseInt(Number($('.stuffbox.csp .cwbdv .cwb2').eq(2).css('width').replace(/px/g, ''))/120*100);
    var OC = parseInt(Number($('.stuffbox.csp .cwbdv .cwb2').eq(3).css('width').replace(/px/g, ''))/120*100);
    var btnSpirit = $('#ckey_spirit');
    var spiritFlag = btnSpirit.attr('src') == '/y/battle/spirit_a.png';
    var hasGem = $('#leftpane>.btp>img').length > 0;
    //使用宝石
    if (hasGem) {
      $('#ckey_items').click();
      $('#ikey_p').click();
    }
    //if(buff.indexOf('/y/e/absorb.png') < 0) {
    //   useSkill(12);
    //}
    //引导精通
    if (buff.indexOf('/y/e/channeling.png') >= 0) {
      if (buff.indexOf('/y/e/heartseeker.png') >= 0) {
        useSkill(11);
      }
      useSkill(9);
    }
    if (HP < 40 && !stopFlag) {
      if (MP < 20) {
        return false;
      }
      if (!spiritFlag && SP > 0 && OC > 50) {
        btnSpirit.click();
      }
      useSkill(16);
      //attact();
    } else if (HP < 70 && buff.indexOf('/y/e/regen.png') < 0 && !stopFlag) {
      if (!spiritFlag && SP > 0 && OC > 45) {
        btnSpirit.click();
      }
      useSkill(15);
      //attact();
    } else {
      if (spiritFlag && SP < 70) {
        btnSpirit.click();
      }
      attact();
    }
  }
}, 500);

function useSkill(index) {
  $('#qb' + index).click();
  //console.log('技能' + index);
}

function attact() {
  if (stopFlag) {
    return;
  }
  var OC = parseInt(Number($('.stuffbox.csp .cwbdv .cwb2').eq(3).css('width').replace(/px/g, ''))/120*100);
  monster.each(function(i, v) {
    var self = $(v);
    if (self.css('opacity') != '0.3' && !stopFlag) {
      if(buff.indexOf('/y/e/regen.png') >= 0) {
        if(buff.indexOf('/y/e/chain2.png') >= 0) {
            $('#qb3').click();
        }
          if(buff.indexOf('/y/e/chain1.png') >= 0) {
              $('#qb2').click();
          }
          if (OC == 100) {
              $('#qb1').click();
              //console.log('战技');
          }
      }
      self.click();
      //console.log('攻击');
      return false;
    }
  });
}
