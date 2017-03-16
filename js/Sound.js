/*
* Sound Class for Dragon Hunter
* (C) 2016 Gordon Niemann, All rights reserved
* Important, Please note that: MEOW!
* Note: This Object contains resources for the games sound systems (Effects and Music)
*/

function Sound()
{	
	var soundEffects = 	{
							bang: 		new buzz.sound( "./sound/fireworksBang.wav"),
							screem: 	new buzz.sound( "./sound/fireworksScreem.wav"),
							button: 	new buzz.sound( "./sound/button.wav"),
							cheer: 		new buzz.sound( "./sound/cheer.wav"),
							gong: 		new buzz.sound( "./sound/gong.wav"),
							thunder: 	new buzz.sound( "./sound/thunder.wav"),
							rain: 		new buzz.sound( "./sound/rain.wav"),
							hello: 		new buzz.sound( "./sound/hello.wav")
						}
	
	this.SoundInit = function() // uses sound BUZZ to play music
	{		
		var music = new buzz.sound("./sound/music.wav", 
		{
			preload: 	true,
			autoplay: 	true,
		    loop: 		true,
		});

		music.play().setVolume(25).setTime(13.006); // Seems to be still load on low value...
		
		return soundEffects;
	};
};