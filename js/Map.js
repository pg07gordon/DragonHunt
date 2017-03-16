/*
* Map Class for Dragon Hunter
* (C) 2016 Gordon Niemann, All rights reserved
* Important, Please note that: MEOW!
* Note: This Object builds the games Map (Grid) and a mirror 2D array  that includes the dragon/ship placements
*/

function Map()
{
	var local = { };
	
	this.MapInit = function(itemsArray, gridSize) // Master file init, this should be run First!
	{
		local.gridSize 		= gridSize;
		local.itemsArray 	= itemsArray;
		
		local.BuildGameGrid(); // Builds the Grid and makes a mirror grid array
		
		for (var i = 0; i < local.itemsArray.length; i++) // Places each dragon (Ship) in the mirror grid array
			{
				local.ItemPlacement(itemsArray[i] [0],itemsArray[i] [1]); 
			};

		return local.gridArray; // Returns finished Grid array (with placements)
	};
	
	local.gridArrayMaker = function() // Makes Multidimensional Arrays (Arrays in Arrays)
	{	
		local.gridArray = new Array (local.gridSize);
		for (i = 0; i < local.gridArray.length; ++ i)
			local.gridArray [i] = new Array (local.gridSize);
	};
	
	local.BuildGameGrid = function() // Builds the games Grid and a Corresponding array
	{
		local.gridArrayMaker(local.gridSize); // Builds an Array that will Mirror HTML Table Grid
		
		var gridMarkup = "";
		
		$('#player-grid').html('<table id="player-map">'); // Will add </table> Automatically
		
		for (var i=0;i < local.gridSize; i++)
		{
			gridMarkup = '<tr id="row' + i + '">';
						
			for (var j = 0; j < local.gridSize; j++)
			{
				local.gridArray[ i ] [ j ] = ( "R" + i + "C" + j ); // Populates the mirror array

				gridMarkup += 	'<td id="R' + i + 'C' + j + '" ';
				gridMarkup += 	'class="cell untouched ';
				gridMarkup +=	local.Random3Item("cloud-A", "cloud-B", "cloud-C");
				gridMarkup += 	'" data-row="' + i + '"';
				gridMarkup += 	'data-col="' + j + '">';
				gridMarkup += 	'</td>';
			};
			gridMarkup += '</tr>';
			$('#player-map').append( gridMarkup ); // Adds the grid to the HTML
		};
	};
	
	local.RandomBetween = function(min, max) // Generate random numbers "between" Min and Max numbers
	{
		return Math.floor(Math.random() * ((min-max)+1) + max);
	};
	
	local.Random3Item = function(itemA, itemB, itemC) // simple function used to return a random item of 3
	{
		var rand = local.RandomBetween(-1,100);
		if (rand < 34)
			return itemA;
		if (rand < 67)
			return itemB;
		if (rand > 66)
			return itemC;
	};
	
	local.RandomItemPlacer = function(size, name) // Checks randomly for a free spot to place an item based on size (item is the size)
	{
		var canBePlaced = true;
		var alignment = local.RandomBetween(-1,100); // 0-49 for vertical and 50-100 for horizontal
		
		if (alignment >=50) // Vertical
		{
			var verticalLocation 	= local.RandomBetween(-1,((local.gridSize)) - size);
			var horizontalLocaton 	= local.RandomBetween(-1,((local.gridSize )));
			
			canBePlaced = local.CollisionDetector(size,verticalLocation,horizontalLocaton,1,0);
			if (canBePlaced)
				local.ThePlacer(size,verticalLocation,horizontalLocaton,1,0,name)
		}
		else // Horizontal
		{
			var verticalLocation 	= local.RandomBetween(-1,((local.gridSize)));
			var horizontalLocaton 	= local.RandomBetween(-1,((local.gridSize)) - size);

			canBePlaced = local.CollisionDetector(size,verticalLocation,horizontalLocaton,0,1);
			if (canBePlaced)
				local.ThePlacer(size,verticalLocation,horizontalLocaton,0,1,name)
		};
		return canBePlaced; // returns result (bool)
	};
	
	local.CollisionDetector = function(size, verticalLocation, horizontalLocaton, vSwitch, hSwitch) // Returns true if a stop is taken based on the alignment of an object
	{
		var spotFree = true;
		for (var i = 0; i < size; i++)
		{
			var type = local.gridArray[ verticalLocation + ( i * vSwitch ) ] [ horizontalLocaton + ( i * hSwitch ) ];
			type = type.charAt(0);

			if (type == "~") // Designator of an array element (Cell) as a dragon(Ship)  
			{
				spotFree = false;
			};
		};
		return spotFree; // returns result (bool)
	};
	
	local.ThePlacer = function(size, verticalLocation, horizontalLocaton, vSwitch, hSwitch, name) // Places items in the grideArray
	{
		
		for (var i = 0; i < size; i++)
		{
			local.gridArray[ verticalLocation + ( i * vSwitch ) ] [ horizontalLocaton + ( i * hSwitch ) ] = ("~" + i + "_" + vSwitch + "_" + hSwitch + "_" + name); // Default item Layout ~ = Dragon, i=size, H&V switchs and name 
		};
	};
	
	local.ItemPlacement = function(size, name) // Places single items on the map, uses Brute force to complete this task...
	{
		var placementTest = false;
		while(!placementTest)
			{
			placementTest = local.RandomItemPlacer(size, name);
			};
	};
};