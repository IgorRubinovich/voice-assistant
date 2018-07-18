## Voice-assistant

A tiny wrapper around [say.js](https://github.com/marak/say.js/) to assist with background voice notifications, e.g. during development or monitoring.

The main contributions on top of say.js are:
- Sequentialization: your assistant will speak each next phrase after finishing the previous one
- .log,.warning,.error methods for compatibility with console methods
- transcribing to console (or a custom console-compatible object) so there's no need for duplicate log calls

### Install
	npm install https://github.com/IgorRubinovich/voice-assistant
	
### Usage
	const Assistant = require('voice-assistant');
	
	const assistant = Assistant(opts);
	
Where opts are:
- .name
Set to change the name used in the preset greeting.
- .greeting
A greeting message upon initializion. Set to null to disable.
- .console
Set to a custom console, otherwise 
- .overrideConsole
Set to speak all messages logged to console. Use with care as it might cause too much talking.
- .transcribe
Log messages in text along with reading them out
	
	assistant.getInstalledVoices(_ => {
		assistant.log('Hello world')
		assistant.log("I don't know why you say goodbye")
		assistant.log("I say hello")
		assistant.warn("Starting self distruction initiation protocol countdown.")
		" ".repeat(10).split('').map((_, i) => i + 1).reverse().forEach(i => assistant.log(i));
		assistant.attention("Self distruction initiated.")
		assistant.error("Self distruction module was not available. Try applying a hammer and some physical force instead.")
	})

### License
MIT