/*
* Dragon Hunter Starter
* (C) 2016 Gordon Niemann, All rights reserved
* Important, Please note that: MEOW!
* Note: Master Program init and run script.
*/

var Game = (function() 
		{
			function GameSingleton() 
			{
				var local = {};
				
				this.init = function()
				{
					local.DragonWings 	= new Dragons();
					local.UserInterface = new Interface();
					local.DragonSounds	= new Sound();
					local.PlayerMap 	= new Map();
					local.grideSize		= 10;			// If Increased, Width size must be changed in CSS!!
				};
				
				this.run = function()
				{
					local.soundEffects	=	local.DragonSounds.SoundInit();												// Returns an array of usable sound effects and starts the music
					local.allDragons 	=	local.DragonWings.DragonsInit(); 											// Full Dragon Data (Array)
					local.chosenDragons =	local.UserInterface.InterfaceInit(local.DragonWings, local.soundEffects);  	// Loads Master Interface scripts using Full Dragon Data
					local.gridArray 	= 	local.PlayerMap.MapInit(local.chosenDragons, local.grideSize);				// Builds the HTML and Array Grids
					
					local.UserInterface.TheInteractor(local.gridArray);			// Allows Visual Manipulation of the game map and updates interface stats
					local.UserInterface.MenuStartGame();						// Main Menu Game Start
				};
			};
			return new GameSingleton();
		})();

$(document).ready( function() // Starts everything
	{
		Game.init();
		Game.run();
	});