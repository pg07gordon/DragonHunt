/*
* Menu Class for Dragon Hunter
* (C) 2016 Gordon Niemann, All rights reserved
* Important, Please note that: MEOW!
* Note: This file controls the interfaces, user interactions, menus, game stats and conditions
*/

function Interface()
{
	var local = {
					turn: 		0,
					win:		70,	//Actually, this is turns left to Losing... 
					miss: 		0,
					hits: 		0,
					found: 		0,
					message: 	"Good Hunting!"
				};

	this.InterfaceInit = function(incomingDragons, soundEffects) 		// Main file Init (used first please)
	{
		
		local.dragons 		= incomingDragons.DragonGetter();			// Dragon Array (Life, Name, Size)
		
		local.dragonsObj	= incomingDragons;							// Full Dragon Object
		
		local.soundEffects 	= soundEffects;								// Sound Effects
		
		return local.dragons;
	};
	
	
	this.MenuStartGame = function()	// Startmenu Start Game and Bio
	{
		$(function() 
		{
			$( "#start-button" ).button().click(function( ) { local.soundEffects.gong.play(); });
			
			local.SwitchMenus('#start-button','#main-menu', '#sp-game');
			local.UpdateStats(); 
		});
		
		$( "#bio-button" ).button().click(function( ) 
		{ 
			local.soundEffects.button.play();
			$('body').fadeOut(1500);
			setTimeout(function() { document.location.href='bio.html' }, 1500);
			
		});
	}
	
	this.TheInteractor = function(gridArray) 	// Checks a HTML Cell for dragons and takes action based on the result
	{
		$('.cell').click(function()
		{
			if (local.turn < local.win) 				// to prevent over clicks!
			{
				if (local.found < local.dragons.length) // to prevent over clicks!
					{
					var arrayCell = gridArray[ $(this).data('row') ] [ $(this).data('col') ];
					var id = $(this).attr('id')
					
					if (arrayCell == id && (!$(this).hasClass("miss"))) 				// Only effects grid elements that are “untouched” and HTML element ID is not equal to a dragons location in the grid array
					{
						local.turn++;
						local.soundEffects.bang.play();
						local.CellUpdate(id,"miss");
						local.miss++;
						local.UpdateStats();
						local.WinLoseTest();
						return false;
					}
					else if (arrayCell.slice(0, 1) ==  "~" && (!$(this).hasClass("hit"))) // Only effects grid elements that are “untouched” and HTML element ID this is equal to a dragons location in the grid array
					{
						local.turn++;
						local.soundEffects.bang.play();
						local.soundEffects.screem.play();
						local.CellUpdate(id,"hit");
						local.hits++;
						if (local.dragonsObj.KillChecker(arrayCell))
							{
							local.found++;
							local.soundEffects.hello.play();
							local.message = "You Found " + arrayCell.slice(7,100) + "!!!";
							}
						local.UpdateStats();
						local.DragonExposer(arrayCell, id);
						local.WinLoseTest();
						return arrayCell;
					}
				};
			};
		});
	};
	
	local.SwitchMenus = function(buttonClicked, currentMenu, NewMenu) // Menu Switcher (Now with more fade!)
	{
		$(buttonClicked).on('click', function()
		{
			$(currentMenu).fadeOut(1500);
			setTimeout(function() { $(currentMenu).addClass('hide');  	}, 1500);
			setTimeout(function() { $(NewMenu).fadeIn(1500);  			}, 1500);
			setTimeout(function() { $(NewMenu).removeClass('hide') 		}, 1500);
		});
	};
	
	local.PlayAgain  = function() //Simple Game Reload Function
	{
		$(function() 
		{
			$( "#reload-button" ).button().click(function( ) 
			{
				$('#game-msg').fadeOut(1500);
				local.soundEffects.button.play();
				setTimeout(function() { location.reload() }, 1500);
				
			});
		});
	};
	
	local.CellUpdate = function(id, status) // Updates CSS cell information and turns the turn counter
	{
		$( '#' + id ).addClass(status);
		$( '#' + id ).removeClass('untouched');
		$( '#' + id ).removeClass('cloud-A');
		$( '#' + id ).removeClass('cloud-B');
		$( '#' + id ).removeClass('cloud-C');
		$( '#' + id ).addClass('explosion');
		setTimeout(function() { $( '#' + id ).removeClass('explosion'); }, 500);	// Fireworks ani on cell clicks
	};
	
	local.UpdateStats = function() // Updates game stats
	{
		$("#turn").html("Turn: " + local.turn);
		$("#remaining").html("Remaining Turns: " +  (local.win - local.turn));
		$("#hits").html("Hits: " + local.hits);
		$("#miss").html("Misses : " + local.miss);
		$("#found").html(local.found + " found of " + local.dragons.length);
		$("#message").html(local.message);
	};
	
	local.WinLoseTest  = function() // Sets and displays the Win/Lose Parts of the game
	{
		if (local.found == local.dragons.length)
			{
			local.soundEffects.cheer.play();
			local.SwitchMenus('#player-map','#sp-game', '#game-msg');
			$( "#game-msg" ).append( "<h1>Congratulations you won!</h1><h3>I knew you could do it</h3>" );
			local.PlayAgain();
			}
		else if (local.turn > local.win -1)
			{
			local.soundEffects.thunder.play();
			local.soundEffects.rain.play();
			local.SwitchMenus('#player-map','#sp-game', '#game-msg');
			$( "#game-msg" ).append( "<h1>Im sorry but you lost this round...</h1><h3>Maybe next time</h3>" );
			local.PlayAgain();
			}
	};
	
	local.dragonAddClass = function(css, id) // Simple Function to add CSS code after a small delay
	{
		setTimeout(function() { $( '#' + id ).addClass( css ); }, 500);
	};
	
	local.DragonExposer = function(dragon, id) // Shows the hidden dragons
	{
		var dName 		= dragon.slice(7,100);
		var dLocation 	= dragon.slice(1,2);
		var vSwitch 	= dragon.slice(3,4);
		var hSwitch 	= dragon.slice(5,6);
		var dSize		= local.dragonsObj.DragonSizeFinder(dName) - 1;

		if (vSwitch == 1) 		// Vertical Dragons 
		{
			if (dLocation == 0)
				local.dragonAddClass('v-dragon-head', id);
			if (dLocation > 0 && dLocation < dSize)
				local.dragonAddClass('v-dragon-body', id);
			if (dLocation == dSize)
				local.dragonAddClass('v-dragon-tail', id);
		}
		else					// Horizontal Dragons (Opposite order)
		{
			if (dLocation == 0)
				local.dragonAddClass('h-dragon-tail', id);
			if (dLocation > 0 && dLocation < dSize)
				local.dragonAddClass('h-dragon-body', id);
			if (dLocation == dSize)
				local.dragonAddClass('h-dragon-head', id);
		};
	};
};