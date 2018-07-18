## Voice-assistant

A wrapper around [say](say) to assist with background voice notifications, e.g. during development or monitoring.

### Install
	npm install https://github.com/IgorRubinovich/voice-assistant
	
### Usage
	const Assistant = require('voice-assistant');
	
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