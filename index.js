const say = require('say');
const _console = global.console;

class VoiceAssistant {
	constructor(opts = {}) {
		opts.name = opts.name || "Voice assistant";
		
		this._console = opts.console || _console;
		
		this._c = {};
		['log','warn','error'].forEach(k => {
			this._c[k] = _console[k].bind(_console);
			if(opts.overrideConsole)			 
				_console[k] = this[k].bind(this)
		})
		
		Object.assign(this, {
			opts : opts,
			say,
			_queue : [],
			speaking : false
		});
		
		
		opts.greeting = typeof opts.greeting == 'undefined' ? [this.opts.name, "activated"] : opts.greeting;
		if(opts.greeting)
			this.log(this.opts.greeting, this.opts.name)
	}
	speak(phrase, voice, speed, kind, cb) {
		phrase = phrase instanceof Array ? phrase.join(" ") : phrase;
		
		this.say && say.speak(phrase, voice, speed, cb); 

		if(!say || this.opts.transcribe) 
			this._c[kind](phrase);
	}
	assistNext () { 
		if(!this._queue.length)
			return;

		this.speaking = true; 
		
		const a = this._queue.pop();
		this.speak(a[0], undefined, undefined, a[1], _ => (this.speaking = false, this.assistNext(this))) 
	}
	_say(a, kind = 'log') {
		a = a instanceof Array ? a : [a];
		a = [a, kind]
		this._queue = [a, ...this._queue]; 
		if(!this.speaking) this.assistNext(); 
	}
	getInstalledVoices(cb) {
		this.say.getInstalledVoices((e,v) => (this._say(["Available voices: ", ...v]), cb && cb(e, v)))
	}
	say(a) 		{ this.log(a); }
	log(a) 		{ this._say(a); }
	warn(a)		{ this._say("Warning: " + a, "warn"); }
	error(a)	{ this._say("Attention, error: " + a, "error"); }
	attention(a){ this._say("Attention: " + a); }

}

module.exports = VoiceAssistant;

if(require.main == module) {
	const assistant = new VoiceAssistant({ transcribe : true, overrideConsole : true });

	assistant.getInstalledVoices(_ => {
		assistant.log('Hello world')
		assistant.log("I don't know why you say goodbye")
		assistant.log("I say hello")
		assistant.warn("Starting self distruction initiation protocol countdown.")
		" ".repeat(10).split('').map((_, i) => i + 1).reverse().forEach(i => assistant.log(i));
		assistant.attention("Self distruction initiated.")
		assistant.error("Self distruction module was not available. Try applying a hammer and some physical force instead.")
	});
}

