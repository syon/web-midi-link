var synthlist_g;
//var signal_ele = document.getElementById("msg");

function SynthListCallback(synthlist) {
	synthlist_g = synthlist;
}

function AddSynthList() {
	var sel = document.getElementById("synthsel");
	for (var i = 0; i < synthlist_g.length; ++i) {
		sel.options[i] = new Option(synthlist_g[i].author+":"+synthlist_g[i].name, synthlist_g[i].url);
	}
}

function WebMidiLink() {
	function Synth(win) {
		this.win = win;
		this.notes = new Array();
	}
	this.synth = null;
	this.AddSynth = function(url) {
		this.synth = new Synth(window.open(url, null, "width=900,height=670,scrollbars=yes,resizable=yes"));
	}
	this.DelSynth = function() {
		this.synth.win.close();
	}
	this.NoteOn = function(n, v) {
//		signal_ele.innerText = 'o'
		this.SendMessage("midi,90,"+n.toString(16)+","+v.toString(16));
	}
	this.NoteOff = function(n) {
//		signal_ele.innerText = '.'
		this.SendMessage("midi,80," + n.toString(16) + ",0");
	}
	this.AllOff = function() {
//		signal_ele.innerText = '*'
		this.SendMessage("midi,b0,78,0");
	}
	this.SendMessage=function(s) {
		logWMLMessage(s);
		var em = document.getElementById("errmsg");
		em.innerHTML = (this.synth == null) ? "<- Press Load button before MIDI Input." : "" ;
		this.synth.win.postMessage(s,"*");
	}
}

var wml = new WebMidiLink();

//----------------------------------
function logWMLMessage(sendmsg){
 wmlmsg.innerHTML=wmlmsg.innerHTML+sendmsg+"<br>";
 wmlmsg.scrollTop=wmlmsg.scrollHeight;
}
//----------------------------------

