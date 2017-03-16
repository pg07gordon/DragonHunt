/*
* Dragon (Ship) Class for Dragon Hunter
* (C) 2016 Gordon Niemann, All rights reserved
* Important, Please note that: MEOW!
* Notes: This file holds information on the games dragons and dragon getters, name, & size.
*/

function Dragons()
{
	var local = {};
	
	this.DragonsInit = function()
	{
			local.DragonsArrayMaker(8);
			
			local.dragons[0] [0] = "5";			// Life
			local.dragons[0] [1] = "Puffy";		// Name
			local.dragons[0] [2] = "5";			// Size
			
			local.dragons[1] [0] = "4";
			local.dragons[1] [1] = "Falkor";
			local.dragons[1] [2] = "4";
			
			local.dragons[2] [0] = "2";
			local.dragons[2] [1] = "Sneaky";
			local.dragons[2] [2] = "2";
			
			local.dragons[3] [0] = "3";
			local.dragons[3] [1] = "Nightshade";
			local.dragons[3] [2] = "3";
			
			local.dragons[4] [0] = "4";
			local.dragons[4] [1] = "Ridley";
			local.dragons[4] [2] = "4";
			
			local.dragons[5] [0] = "2";
			local.dragons[5] [1] = "Toothless";
			local.dragons[5] [2] = "2";
			
			local.dragons[6] [0] = "4";
			local.dragons[6] [1] = "Haku";
			local.dragons[6] [2] = "4";
			
			local.dragons[7] [0] = "6";
			local.dragons[7] [1] = "Natsunomeryu";
			local.dragons[7] [2] = "6";

	};
	
	this.DragonGetter= function() // Simple Getter
	{
		return local.dragons;
	};

	local.DragonsArrayMaker = function(size) // Makes Multidimensional Arrays (Arrays in Arrays)
	{	
		local.dragons = new Array (size);
		for (i = 0; i < local.dragons.length; ++i)
			local.dragons [i] = new Array (1);
	};
	
	this.KillChecker = function(arrayCell) // checks for killed dragons, using grid array value
	{
		var draongName = arrayCell.slice(7, 100);
		
		for( var i = 0; i < local.dragons.length; i++ )
			if (draongName == local.dragons[i][1])
				{
				local.dragons[i][0] -= 1;
				if (local.dragons[i][0] <= 0)
					{
					return true;
					};
				};
	};
	
	this.DragonSizeFinder = function(Name) // Finds the size of a given dragon by name
	{
		for( var i = 0; i < local.dragons.length; i++ )
			if (Name == local.dragons[i][1])
				{
					return local.dragons[i][2];
				};
	};
	
};