(function($){

	/**
	 * Copyright 2012, Digital Fusion
	 * Licensed under the MIT license.
	 * http://teamdf.com/jquery-plugins/license/
	 *
	 * @author Sam Sehnert
	 * @desc A small plugin that checks whether elements are within
	 *		 the user visible viewport of a web browser.
	 *		 only accounts for vertical position, not horizontal.
	 */
	$.fn.visible = function(partial){
		
	    var $t				= $(this),
	    	$w				= $(window),
	    	viewTop			= $w.scrollTop(),
	    	viewBottom		= viewTop + $w.height(),
	    	_top			= 0,
	    	_bottom			= 0,
	    	compareTop		= partial === true ? _bottom : _top,
	    	compareBottom	= partial === true ? _top : _bottom;
		
		return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
    };
    
})(jQuery);

//var zoom = 1;
function resizes(zoom)
{
	zoom = zoom - 0.01;
	//console.log("zoom"+zoom);
//console.log("resize called::"+zoom);
	if(zoom==1 || zoom==2) {
		//console.log("resize called");
	}
document.getElementById("viewport").setAttribute("content",'initial-scale='+zoom+', user-scalable=yes');
//console.log("visu=ible"+$("#ender").visible());
	if(!$("#ender").visible())
	{
		if(zoom < 0.1) 
		{
			return;
		}
		
		setTimeout(function() { resizes(zoom); }, 1);
	}
	
	return true;
	
}

$(window).ready(function(){
	var h = document.documentElement.clientHeight;
						var p = $( "#fixheightDiv" ).offset().top;
						if(p<h){
							setTimeout(resizes(2),100);
						}else{
							setTimeout(resizes(1),100);
						}
													
});
