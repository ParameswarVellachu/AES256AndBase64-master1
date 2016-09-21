	var pauseActivityVal = false; 
    window.onload = function () {
        if (canvasSupported()) {
		    document.getElementById("divpart0").style.display = "none";
		   				document.getElementById("divpart1").style.display = "block"; 
		           }else{
		   document.getElementById("divpart0").style.display = "block";
		   document.getElementById("divpart1").style.display = "none";
		}
    };

function reshowdiv(){
   
	var cnt = 0; 
		for(var i=1; i<=cnt; i++){ 
			$('#divpart'+i).hide();
			$('#divpartold'+i).attr('style','display : none'); 
		}
		$('#divpart'+(cnt)).hide();
		$('#divpartold'+cnt).attr('style','display : none'); 
			$('#proceed'+(cnt)).click();
}
        
    function canvasSupported() {
        var canvas = document.createElement('canvas');
        return (canvas.getContext && canvas.getContext('2d'));
    }
	
	function pauseActivity() {
		if($("#buttonPause").attr('value') == 'Pause') {
			console.log("entering pause block");
			pauseActivityVal = true;	
			$("#buttonPause").attr('value', 'continue');
			idpause = '';
			nextpause = '';
			previouspause = '';
		} else {
			console.log("entering continue block");
			pauseActivityVal = false;	
			$("#buttonPause").attr('value', 'Pause');
			idpause = $('#idhidden').val();
			nextpause =	$('#nexthidden').val();
			previouspause = $('#previoushidden').val();
			ShowNext(parseInt(idpause),nextpause,previouspause);
		}
	}



	$(document).ready(function() {
		$('input[name="proceed"]').hide();
	});
	$('input[name="proceed"]').hide();
	function playCurrAudio(divid){
		//$("#"+divid).get(0).play();
	}
	
	function introEnd(id){
					console.log("start "+ id);
					$("#screen_transdiv"+id).hide();
					console.log("end");
					if($('#canvas_'+id).length>0){ console.log("Inside Canvas"); start(id); } 
	}

	function showtfvalue(id,next){
	var previous = 'tfparam';
		var inputval = $('#tflist'+id).val();
		var list = inputval.split(',');
		var tfanswer = $('#tfanswer'+id).val();
		
		var strselect = tfanswer.split(',');
		var found = true;
		for (var i=0; i<list.length; ++i) {
			$('#'+list[i]+'true'+'tfval').hide();
			$('#'+list[i]+'false'+'tfval').hide();
			var selectedval =  list[i]+'true';
			console.log("showtfvalueselectedval :: "+selectedval);
			if ($.inArray(selectedval, strselect) !== -1) {
				$('#'+selectedval+'tfval').attr("src","../resources/user/images/tick_icon_color.png");
				$('#'+selectedval+'tfval').show();
			} else {
				selectedval =  list[i]+'false';
				$('#'+selectedval+'tfval').attr("src","../resources/user/images/tick_icon_color.png");
				$('#'+selectedval+'tfval').show();
			};
		  
		}
		
		if(found===true) { 
			setTimeout(function() { ShowNext(id,next,previous); }, 3000);
			console.log("called next 2 :: ");
		}
			
	}
	
	function validatetfvalue(id,next){
					
					var questioncount = 0;
					var answercount = 0;
					var total = 0;
					var inputval = $('#tflist'+id).val();
					var list = inputval.split(',');
					var tfanswer = $('#tfanswer'+id).val();
					console.log("tfanswer :: "+tfanswer);
					var strselect = tfanswer.split(',');
					var found = true;
					for (var i=0; i<list.length; ++i) {
						var selectedvals =  $('input[name=tfval'+list[i]+']:checked').val();
						console.log("selectedval :: "+selectedvals);
						if(typeof selectedvals == 'undefined'){
							$("#resdiv"+id).css("background-color","#db3436");
							$("#resdiv"+id).html("<h4> Choose True or False to Answer  </h4>");
							return false;
						} 
					}
					for (var i=0; i<list.length; ++i) { 
						questioncount = questioncount+1; 
						var selectedval =  $('input[name=tfval'+list[i]+']:checked').val();
						console.log("selectedval :: "+selectedval);
						if ($.inArray(selectedval, strselect) !== -1) { 
							answercount = answercount+1; 
							console.log('match!');
							$('#'+selectedval+'tfval').attr("src","../resources/user/images/tick_icon_color.png");
							$('#'+selectedval+'tfval').show();
							$("#rightcount").val(answercount);
						} else {
							found = false;
							$('#'+selectedval+'tfval').attr("src","../resources/user/images/times_icon_color.png");
							$('#'+selectedval+'tfval').show();
						};
					  
					}
					
					if(found===true) { 
						console.log("called next :: ");
						$("#resdiv"+id).css("background-color","#00a651");
						$("#resdiv"+id).html("<h4>Excellent</h4>");
						var previous = 'tfparam';
						setTimeout(function() { ShowNext(id,next,previous); }, 3000);
					}else{
						$('#tfsubmit'+id).hide();
						$('#tfshow'+id).show();
						$("#resdiv"+id).css("background-color","#db3436");
						$("#resdiv"+id).html("<h4>you have chosen "+answercount+" right answer,out of "+questioncount+" questions.</h4>");
						total = questioncount - answercount;
						$("#wrongcount").val(total)
						
					}
				}

function showSubTabs(tabid,id,jcount,divcount){
			$("video").each(function(){
				$(this).get(0).pause();
			});
			
			$("audio").each(function(){
				$(this).get(0).pause();
			});
			
			$(".tabgroup").each(function(){
				$(this).hide();
			});
			
		if($(".divpart"+id).length>0){	
			
			$(".divpart"+id).show();
			var val = $(".divpart"+id).data("nextid");
			val = val.split(',');  

			console.log("pos ::"+scrollPos);
			
			var widthInPx = ($( window ).width()*35/100);
			var actualWidth = 0;
			console.log("widthInPx::"+widthInPx);
			for(var ijcnt=1;ijcnt<jcount;ijcnt++){
				actualWidth = actualWidth + $('#tabs'+divcount+' .mTabcolor'+ijcnt).outerWidth();
				console.log("actualWidth"+actualWidth);
			}
			var scrollPos = actualWidth;	
			$('.scroll_tab_inner').animate({scrollLeft: scrollPos + 'px'}, 0);	
						
			console.log("divaudiopart"+(divcount)+"00001"+$("#divaudiopart"+((divcount)+"00001")).length);
			
			var jdivcount = (parseInt(val[0])+1);  console.log("div audio part :: "+jdivcount);
			
			if($("#divaudiopart"+((jdivcount)+"00001")).length>0) console.log("in audio trck");
				AudioTrack((jdivcount)+"00001");

		}else{
		 var pagebelongs = 737515; 
		 var newqidval = 737515; 			var icnt = $('#hiddencnt').val();
			var idd =  $('.tabcls-'+id).attr('id'); idd = idd.split("tag");    //var ocnt =idd[1]; var l =parseInt(ocnt)+1;
			var maxwdth = $('#maxwidth').val();
			var maxhght = $('#maxheight').val();
			
		if($('.tabcls-'+id).attr("data-contnt") == "no"){
			$.ajax({
				url : "ajaxtemplates.php",
				method: 'POST',
				data: {
				   qidval: id,
				   icount: idd[1],
				   qid : pagebelongs,
				   newqid : newqidval,
				   maxwidth : maxwdth,
				   maxheight : maxhght,
				}, 
				beforeSend: function(){
					$("#loadingtemppart").show();
				},
				success:function(res){
				if(res !== ''){
					$("#loadingtemppart").hide();   
					$('.tabcls-'+id).html(res);
					$('.tabcls-'+id).attr("data-contnt","yes");
					console.log("divtag is empty");
					showSubTabs(tabid,id,jcount,divcount);
					MathJax.Hub.Typeset();					
				}
			}
		   });
		}else{
			console.log("divtag class tabcls-"+id+" is not empty cant append");
		}

		var lcnt =parseInt(idd[1])+1;
		var cls = $('#divtag'+lcnt).attr('class');
		cls = cls.split('-'); console.log("question id :: "+cls[1]);
		var idq= cls[1];
		if($('.tabcls-'+idq).attr("data-contnt") == "no"){
			$.ajax({
				url : "ajaxtemplates.php",
				method: 'POST',
				data: {
				   qidval: idq,
				   icount: lcnt,
				   qid : pagebelongs,
				   newqid : newqidval,
				   maxwidth : maxwdth,
				   maxheight : maxhght,
				}, 
				beforeSend: function(){
					$("#loadingtemppart").show();
				},
				success:function(res){
					if(res !== ''){
						console.log("content added to div "+idq);

						$("#loadingtemppart").hide();    
						$('.tabcls-'+idq).html(res);
						$('.tabcls-'+idq).attr("data-contnt","yes");
						console.log("divtag is empty");
						MathJax.Hub.Typeset();			
					}
				}
		   });
		}else{
			console.log("divtag class tabcls-"+idq+" is not empty cant append");
		}
	}
}
		
	
		function tabclicked(tabselid,tabid){
			var inputval = $('#tablist'+tabid).val();
			var nexttype = $('#nexttype'+tabid).val();
			var tabcomplete = $('#tabcomplete'+tabid).val();
			
			$('#tabselected'+tabid).val($('#tabselected'+tabid).val()+","+tabselid);
			var tabselectedval = $('#tabselected'+tabid).val();
			console.log("tabselectedval :: "+tabselectedval);
			var strselect = tabselectedval.split(',');
			var list = inputval.split(',');
			var found = false;
			for (var i=0; i<list.length; ++i) {
				if ($.inArray(list[i], strselect) !== -1) {
					console.log('match!');
				} else {
					return false;
				};
			  
			}

			
			$('#tabcomplete'+tabid).val('yes');
		}
		
		
		function TabvideoEnd(id,next) {
			var tabcomplete = $('#tabcomplete'+id).val();
			var previous ='tabvideo';
			if(tabcomplete=="yes") ShowNext(id,next,previous);
		}
	
		function animateDiv(id){
			var x= $('#divtemplate'+(id+1)).data("animatetype");
				if(!(typeof x == "undefined")){
					console.log(x+"::animateDiv called::"+(id+1));
					$('#divtemplate'+(id+1)).removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						$(this).removeClass();
					});
				}
			}
	
	
	
				/*Video start*/
				function videoEnd(id,next) {
					var previous = 'videoparam';
					$('#divpart5555555').hide();
					ShowNext(id,next,previous);
				}
				/*Video start*/
				
				function evalEnd(id,next) {
					var previous = 'evalparam';
					ShowNext(id,next,previous);
				}
				/*Video start*/
				function ShowNext(id,next,previous) {  
				   console.log("id :: "+id);
								   if(next == 'end'){
				    window.location = "next.html";
					return; }
				   					var icntvl = $('#hiddencnt').val();
					icntvl = parseInt(icntvl)+1; 
					$('#hiddencnt').val(icntvl);

								console.log("Next Value"+next);
				console.log("previous value"+previous);
					if(previous != 'dragdropparam' && previous != 'matchparam' && previous != 'fibparam' && previous != 'dropdownparam' && previous != 'dropdowntextparam' && previous != 'jumbledparam' && previous != 'chooseparam' && previous != 'chooseimgparam'){
						var previousval = $('#'+previous).val(); console.log(previousval);
						console.log("previous value"+previousval);
						var rightcount = $('#rightcount').val();
						var wrngcount = $('#wrongcount').val();
						var submitvalid = $('#submitvalid').val();
						$.ajax({
							url : 'selectedvalues.php',
							method: 'POST',
							data: {
							   previousval: previousval,
							   next:next,
							   rightcount:rightcount,
							   wrongcount:wrngcount,
							   currid:	submitvalid
							}
						});
						$('#rightcount').val('');
						$('#wrongcount').val('');
					}
				
					
					 var pagebelongs = 737515;  var newqidval = 737515; 				  
				   
						var icnt = $('#hiddencnt').val(); 
						var maxwdth = $('#maxwidth').val();
						var maxhght = $('#maxheight').val();
						console.log("icnt::"+icnt);

						
				var resizeflag = true;
				
					
										console.log("called");
					console.log("show :: "+(id+1)+" hide :: "+id+"  next temp :: "+next);
					
					var kcnt = parseInt(id)+1; 
					if($('#divtag'+kcnt).attr("data-contnt") == "no"){
						console.log("count :: "+kcnt);
						$('#divtag'+kcnt).attr('data-contnt', 'load');
						LoadNextContent(kcnt,pagebelongs,newqidval,maxwdth,maxhght);
					}
					var kccnt = parseInt(kcnt)+1; 
					if($('#divtag'+kccnt).attr("data-contnt") == "no"){
						console.log("count :: "+kccnt);
						$('#divtag'+kccnt).attr('data-contnt', 'load');
						LoadNextContent(kccnt,pagebelongs,newqidval,maxwdth,maxhght);
					}
					
					if(next == 'end'){
						$("#divpart"+id).hide();
						$("#divpart"+(id+1)).show();
						
						 //endslide('end',737515);
												var obtainscore = $('#choosescore').val();
												//ShowNext('','topicend','topicend');
					}else if(next == 'quiz') {
						$("#divpart"+id).hide();
						$("#divpart"+(id+1)).show(); 
					}else if(next == 'tabs') {
						$("#divpart"+id).hide();
						$("#divpart"+(id+1)).show();
					}else if(next == 'truefalse') {
						$("#divpart"+id).hide();
						$("#divpart"+(id+1)).show();
					}else if(next== 'blank') {
						$("#divpart"+id).hide();
						$("#divpart"+(id+1)).show();
						$("#resdiv"+id).html("");
					}else if(next== 'video') {
					console.log("enters video block");
					console.log(id);
					console.log(id+1);
						$("#divpart"+id).hide();
						$("#divpart"+(id+1)).show();
						if($("#divpartv"+(id+1)).length>0) $("#divpartv"+(id+1)).get(0).play();
											}else if(next== 'audio') {
						console.log("enters audio block"+(id+1));
						$("#divpart"+id).hide();
						$("#divpart"+(id+1)).show();
						console.log("divpart"+id+"::"+(id+1));
						AudioTrack((id+1)+"00001");
					}else if(next == 'tabs') {
						$("#divpart"+id).hide();
						$("#divpart"+(id+1)).show();
					}else if(next == 'truefalse') {
						$("#divpart"+id).hide();
						$("#divpart"+(id+1)).show();
					}else if(next== 'dropdown') {
						$("#divpart"+id).hide();
						$("#divpart"+(id+1)).show();
						$("#resdiv"+id).html("");
						
					}else if(next== 'dragdrop') {
						$("#divpart"+id).hide();
						$("#divpart"+(id+1)).show();
						$("#resdiv"+id).html("");
						dragAndDropInitialize((id+1));
					}else if(next== 'matching') {
						$("#divpart"+id).hide();
						$("#divpart"+(id+1)).show();
												
						resizeflag = false;
						
						$("#resdiv"+id).html("");
					}else if(next == 'chooseTheBestImg') {
						$("#divpart"+id).hide();
						$("#divpart"+(id+1)).show();
					}else if(next == 'imageTab') {
						$("#divpart"+id).hide();
						$("#divpart"+(id+1)).show();
					}else if(next == 'Image_Template') {
							$("#divpart"+id).hide();
							$("#divpart"+(id+1)).show();
							AudioTrack((id+1)+"00001");
					}else if(next == 'jumbledList') {
						$("#divpart"+id).hide();
						$("#divpart"+(id+1)).show();
					}else if(next == 'dragDropText') {
							$("#divpart"+id).hide();
							$("#divpart"+(id+1)).show();
							$('.subbut').show();
							$('.showbut').hide();
					}else if(next == 'evaltemp') {
							$("#divpart"+id).hide();
							$("#divpart"+(id+1)).show();
							AudioTrack((id+1)+"00001");
					}else if(next == 'animation') {
							$("#divpart"+id).hide();
							$("#divpart"+(id+1)).show();
							AudioTrack((id+1)+"00001");
					}else if(next == 'imagecontent') {
							$("#divpart"+id).hide();
							$("#divpart"+(id+1)).show();
							if($("#divaudiopart"+((id+1)+"00001")).length>0) {
								AudioTrack((id+1)+"00001");
							}
							
												}else if(next == 'multiple_block') {
							$("#divpart"+id).hide();
							$("#divpart"+(id+1)).show();
							console.log("multiple block :: #divaudiopart"+((id+1)+"00001"));
							if($("#divaudiopart"+((id+1)+"00001")).length>0) 
								AudioTrack((id+1)+"00001");
					}else if(next == 'left_right_temp') {
							$("#divpart"+id).hide();
							$("#divpart"+(id+1)).show();
							AudioTrack((id+1)+"00001");	
					}else if(next == 'text_template') {
							$("#divpart"+id).hide();
							$("#divpart"+(id+1)).show();
							console.log("text_template :: #divaudiopart"+((id+1)+"00001"));
							if($("#divaudiopart"+((id+1)+"00001")).length>0) 
								AudioTrack((id+1)+"00001");
					}
					
											if(resizeflag) {  fixedPosition();  }  
										if($("#introaudiopart"+(id+1)).length>0) {
						$("#currentplaying").val((id+1));
						$("#currentplayintro").val(1);
						$("#screen_transdiv"+(id+1)).show();
						introAudioTrack((id+1)); 
					}
					
					var tabdivid =id+1; 
					console.log('tabs'+tabdivid);
					if($('#tabs'+tabdivid).length>0) { 
					console.log('tabs avail::'+tabdivid);
						var actualWidth = 0;
						var jcount = parseInt($('#tabs'+tabdivid+' .MainTabSelected').data('tabid'));
						console.log("jcount"+jcount);
						for(var ijcnt=1;ijcnt<jcount;ijcnt++){
							actualWidth = actualWidth + $('#tabs'+tabdivid+' .mTabcolor'+ijcnt).outerWidth();
							console.log("actualWidth"+actualWidth);
						}
						var scrollPos  = actualWidth;
						$('.scroll_tab_inner').animate({scrollLeft: scrollPos + 'px'}, 0);
					}
				

						if($("#divtag"+icnt).length>0){
							 if($('#divtag'+icnt).attr("data-contnt") == "no"){
								$.ajax({
									type:"GET",
									url:"ajaxtemplates.php",
									data :{
										icount: icnt,
										pagebelongsto : pagebelongs,
										params : 'qid=737515&originalqid=737515&total=100&device=&orgpage=&generatehtml=yes',
										pagename : '',
										newqid : newqidval,
										maxwidth : maxwdth,
										maxheight : maxhght,
										}, 
									success:function(res){
											$('#divtag'+icnt).attr("data-contnt","yes");
											$('#divtag'+icnt).html(res);
											MathJax.Hub.Typeset();
									}
								});
							}
						}
				
				}
				
				function LoadNextContent(icnt,pagebelngto,newqd,maxwdth,maxhght){ 
					var cls = $('#divtag'+icnt).attr('class');
					cls = cls.split('-'); console.log("question id in loadnextcontent function :: "+cls[1]);
					var idq= cls[1];
					$.ajax({
						url : "ajaxtemplates.php",
						method: 'POST',
						data: {
						   qidval: idq,
						   icount: icnt,
						   qid : pagebelngto,
						   newqid : newqd,
						   maxwidth : maxwdth,
						   maxheight : maxhght,
						}, 
						success:function(res){
							if(res !== ''){
								$("#loadingtemppart").hide();    
								$('.tabcls-'+idq).html(res);
								$('.tabcls-'+idq).attr("data-contnt","yes");
								console.log("divtag is empty");
								//showSubTabs(tabid,id,jcount,divcount);
								MathJax.Hub.Typeset();			
							}
						}
				   });
				}
				/*Video start*/
				/*Fill in the Blanks start*/
				function fillValidate(id,next){
					$("#fib_Show_Div_"+id).hide(); var previous = 'fibparam';
					var fibNo = document.getElementById('fibNo_'+id).value;
					fibNo++;
					document.getElementById('fibNo_'+id).value = fibNo;
					if(fibNo == 2){
						$("#fib_Show_Div_"+id).show();
						$("#fib_Sub_Div_"+id).hide();
					}	
					var count = document.getElementById('countfib_'+id).value;	
					var right = 0; var wrong = 0;
					var i = 1;
					for(i = 1; i <= count ; i++){
						var opt = document.getElementById('quest1_'+id+'_'+i).value;	
						var ans = document.getElementById('answer1_'+id+'_'+i).value;
						if(opt.toLowerCase() == ans.toLowerCase()){
							$('#divquest'+i+'_'+id).html( "<i class='fa fa-check tick'></i>" );
							right++;
						}else{
							$('#divquest'+i+'_'+id).html( "<i class='fa fa-times times'></i>" );
							wrong++;
							console.log("wrong ans :: "+wrong);
							$('#wrongcount').val(wrong);
						}	
					}console.log("right ans :: "+right);
					$('#totalanswer'+id).val(right);  
					$('#rightcount').val($('#totalanswer'+id).val());
					
					if(fibNo == 1){

						var previousval = $('#'+previous).val(); console.log(previousval);
						var rightcount = $('#rightcount').val();
						var wrngcount = $('#wrongcount').val();
						$.ajax({
							url : 'selectedvalues.php',
							method: 'POST',
							data: {
							   previousval: previousval,
							   next:next,
							   rightcount:rightcount,
							   wrongcount:wrngcount,
							}
						});
						$('#rightcount').val('');
						$('#wrongcount').val('');
					}
					
					
					
					
					if(wrong > 0){
						$("#resdiv"+id).css("background-color","#db3436");
						$("#resdiv"+id).html("<h4>Try Again</h4>");
					}else{
						$("#resdiv"+id).css("background-color","#00a651");
						$("#resdiv"+id).html("<h4>Excellent</h4>"); 
						setTimeout(function(){ShowNext(id,next,previous);},3000);
					}
				}
				function fillShow(id,next){
					//var previous = 'fillshow';
					$("#fib_Sub_Div_"+id).hide();
					var count = document.getElementById('countfib_'+id).value;	
					var i = 1;
					for(i = 1; i <= count ; i++){
						var opt = '';var ans = '';
						$('#divquest'+i+'_'+id).html( "<i class='fa fa-check tick'></i>" );
						var ans = document.getElementById('answer1_'+id+'_'+i).value;
						document.getElementById('quest1_'+id+'_'+i).value = ans;	
					}
						setTimeout(function(){ShowNext(id,next);},3000);
					
				}
				/*Fill in the Blanks start*/
				/*DropDown start*/
				function dropdownValidate(id,next){
				
					var previous = 'dropdownparam';
					$("#drop_Show_Div_"+id).hide();
					var dropNo = document.getElementById('dropNo_'+id).value;
					dropNo++;
					document.getElementById('dropNo_'+id).value = dropNo;
					if(dropNo == 2){
						$("#drop_Show_Div_"+id).show();
						$("#drop_Sub_Div_"+id).hide();
					}	
					var count = document.getElementById('countDrop_'+id).value;	
					var right = 0;							
					var wrong = 0;
					var i = 1;
					for(i = 1; i <= count ; i++){
						var opt = '';var ans = '';
						var opt = document.getElementById('quest_'+id+'_'+i).value;	
						var ans = document.getElementById('answer_'+id+'_'+i).value;
						if(opt == ans){
							$('#divquest'+i+'_'+id).html( "<i class='fa fa-check tick'></i>" );
							right++;
						}else{
							$('#divquest'+i+'_'+id).html( "<i class='fa fa-times times'></i>" );
							wrong++;
							$('#wrongcount').val(wrong);
						}	
					}
					$('#totalanswer'+id).val(right);
					$('#rightcount').val($('#totalanswer'+id).val());
					
					if(dropNo == 1){

						var previousval = $('#'+previous).val(); console.log(previousval);
						var rightcount = $('#rightcount').val();
						var wrngcount = $('#wrongcount').val();
						$.ajax({
							url : 'selectedvalues.php',
							method: 'POST',
							data: {
							   previousval: previousval,
							   next:next,
							   rightcount:rightcount,
							   wrongcount:wrngcount,
							}
						});
						$('#rightcount').val('');
						$('#wrongcount').val('');
					}
					if(wrong > 0){
						$("#resdiv"+id).css("background-color","#db3436");
						$("#resdiv"+id).html("<h4>Try Again</h4>");
					}else if(right == count){
						$("#resdiv"+id).css("background-color","#00a651");
						$("#resdiv"+id).html("<h4>Excellent</h4>");
						setTimeout(function(){ShowNext(id,next,previous);},3000);
					}
				}
				function dropdownShow(id,next){
					var previous = 'dropdownparam';
					$("#drop_Sub_Div_"+id).hide();
					var count = document.getElementById('countDrop_'+id).value;	
					var i = 1;
					for(i = 1; i <= count ; i++){
						var opt = '';var ans = '';
						$('#divquest'+i+'_'+id).html( "<i class='fa fa-check tick'></i>" );
						var ans = document.getElementById('answer_'+id+'_'+i).value;
						 $('#quest_'+id+'_'+i).selectpicker('val', ans);
					}
				
						setTimeout(function(){ShowNext(id,next,previous);},3000);
				}
				/*DropDown start*/
				/*Jumbled validation starts here*/
				function jumbledValidate(id,next){
				
					var jumbledCount =  parseInt($("#jumbledCount_"+id).val())+1;
					$("#jumbledCount_"+id).val(jumbledCount);
					
					var right = 0;							
					var wrong = 0; var previous = 'jumbledparam';
					var orginalOrder = $("#orginalOrder_"+id).val();
					var orginalOrderArray = orginalOrder.split('~#~');
					var i=0;

					$("#sortli_"+id+" li").each(function() {
							var answer = '';
							var answer = $(this).text();
							var tempId = $(this).attr('id');
							if(orginalOrderArray[i] == answer){
								$("#"+tempId).css("background-color","#66FF00");
								right++;
								$('#rightcount').val(right);
							}else{
								$("#"+tempId).css("background-color","#FF6600");
								wrong++;
								$('#wrongcount').val(wrong);
							}
							i++;
					});
					if(jumbledCount == 1){

						var previousval = $('#'+previous).val(); console.log(previousval);
						var rightcount = $('#rightcount').val();
						var wrngcount = $('#wrongcount').val();
						$.ajax({
							url : 'selectedvalues.php',
							method: 'POST',
							data: {
							   previousval: previousval,
							   next:next,
							   rightcount:rightcount,
							   wrongcount:wrngcount,
							}
						});
						$('#rightcount').val('');
						$('#wrongcount').val('');
					}
					if(wrong > 0){
						$("#jumbled_Sub_Div_"+id).hide();
						$("#jumbled_Show_Div_"+id).show();
					}else{
						$("#jumbled_Sub_Div_"+id).show();
						$("#jumbled_Show_Div_"+id).hide();
						$('#totalanswer'+id).val(right);
						setTimeout(function(){ShowNext(id,next,previous);},3000);
					}
				}
				function jumbleReset(id,next){
					$("#jumbled_Sub_Div_"+id).show();
					$("#jumbled_Show_Div_"+id).hide();
					$("#sortli_"+id+" li").each(function() {
						var tempId = $(this).attr('id');
						$("#"+tempId).removeAttr( "style" );
					});
					$("#sortli_"+id+" li").hover("background", "#a6895d");
	
				}
				/*Jumbled validation ends here*/
				/*Choose the correct start*/
				function validate(id,next,explainID) {	
					console.log("validate funct");
					var optselected = $( "input:radio[name=quiz"+id+"]:checked" ).val(); 
					var answser =  $("#answer"+id).val(); var previous = 'chooseparam';
					var expalintopiclink ="";
					var chooseCount =  parseInt($("#chooseCount_"+id).val())+1;
					$("#chooseCount_"+id).val(chooseCount);
					
					if(chooseCount == 1){
						var previousval = $('#'+previous).val(); console.log(previousval);
						var rightcount = 0;
						var wrngcount = 0;
						if(optselected==answser){
							rightcount = 1; wrngcount = 0;
						}else{
							wrngcount = 0; wrngcount = 1;
						}
						
						$.ajax({
							url : 'selectedvalues.php',
							method: 'POST',
							data: {
							   previousval: previousval,
							   next:next,
							   rightcount:rightcount,
							   wrongcount:wrngcount,
							}
						});
						$('#rightcount').val('');
						$('#wrongcount').val('');
					}
					if(explainID!=0) { expalintopiclink = '<span style=\"color:#ffba00;cursor:pointer;\" onclick=\"showExplainTopic('+explainID+','+id+');\">Explain Answer</span>'; } 
					console.log(optselected+"::"+answser);
					$('#totalanswer'+id).val(0);
					if(optselected==answser){
							$('#rightcount').val('1');$('#wrongcount').val('0');
							$("#resdiv"+id).css("background-color","#00a651");
							$("#resdiv"+id).html("<h4>Excellent "+expalintopiclink+"</h4>");
							$('#totalanswer'+id).val(1);
							setTimeout(function(){ShowNext(id,next,previous);},3000);
							
					}else if(optselected==undefined){
						
						$('#wrongcount').val('0');$('#rightcount').val('0');
						$("#resdiv"+id).css("background-color","#db3436");
						$("#resdiv"+id).html("<h4>Please choose the answer </h4>");
					}else{
					
						$('#wrongcount').val('1');$('#rightcount').val('0');
						$("#resdiv"+id).css("background-color","#db3436");
						$("#resdiv"+id).html("<h4>Try Again "+expalintopiclink+"</h4>");
					}
				}
								function showExplainTopic(explainID,id){
					$('#divpart'+id).hide();
					
					document.cookie="currentscore="+$('#choosescore').val()+";expires=Wed, 18 Dec 2023 12:00:00 GMT"
					window.location.replace('http://192.168.100.140/mtutorlive/user_self/commonjs.php?qid='+explainID+'&explain=yes&pqid=737515&originalqid=737515&total=100&device=&orgpage=&generatehtml=yes&divid='+id,'_blank');
				
				}
				function backtohome(){ 
										window.location.replace('http://192.168.100.140/mtutorlive/user_self/commonjs.php?originalqid=737515&total=100&device=&orgpage=&generatehtml=yes&type=normal','_blank');

				}
				
				function revisionvalidate(id,next,explainID) {	
					console.log("revision validate funct");
						var optselected = $( "input:radio[name=quiz"+id+"]:checked" ).val(); 
						var answser =  $("#answer"+id).val(); var previous = 'chooseparam';
						var expalintopiclink ="";
						
						if(optselected==undefined){	

						}else{
						var chooseCount =  parseInt($("#chooseCount_"+id).val())+1;
						$("#chooseCount_"+id).val(chooseCount);
						var submitvalid = $('#submitvalid').val();
						if(chooseCount == 1){
							var previousval = $('#'+previous).val(); 
							var rightcount = 0;
							var wrngcount = 0;
							if(optselected==answser){
								rightcount = 1; wrngcount = 0;
							}else{
								wrngcount = 0; wrngcount = 1;
							}
							
							$.ajax({
								url : 'selectedvalues.php',
								method: 'POST',
								data: {
								   previousval: previousval,
								   next:next,
								   rightcount:rightcount,
								   wrongcount:wrngcount,
								   currid:	submitvalid
								}
							});
							$('#rightcount').val('');
							$('#wrongcount').val('');
						}
						}
						if(explainID!=0) { expalintopiclink = '<span style=\"color:#ffba00;cursor:pointer;\" onclick=\"showExplainTopic('+explainID+','+id+');\">Explain Answer</span>'; } 
						
						$('#totalanswer'+id).val(0); 
						var score = $('#choosescore').val();
						if(score == "") score = 0;
						if(optselected==answser){
								score = parseInt(score) + 4; $('#choosescore').val(parseInt(score));
								$('#rightcount').val('1');$('#wrongcount').val('0');
								$("#resdiv"+id).css("background-color","#00a651");
								$("#chngbutdiv"+id).attr('class', 'row resultexdiv');
								$("#resdiv"+id).html("<h4>Excellent! Your answer is Correct and Your Score is "+score+"/100 "+expalintopiclink+"</h4>");
								$('#quiz'+id).hide();
								$('#proceed'+id).show();
								$('#totalanswer'+id).val(1);
								
						}else if(optselected==undefined){
							$('#wrongcount').val('0');$('#rightcount').val('0');
							$("#resdiv"+id).css("background-color","#db3436");
							$("#resdiv"+id).html("<h4>Please choose the answer</h4>");
						}else{
							$('#wrongcount').val('1');$('#rightcount').val('0');
							$('#choosescore').val(parseInt(score));
							$("#resdiv"+id).css("background-color","#db3436");
							$("#chngbutdiv"+id).attr('class', 'row resulterrdiv');
							
							$("#resdiv"+id).html("<h4>Sorry, Your answer is Wrong. The correct Answer is \""+ $("#dispanswer"+id).html() +"\" and Your Score is "+score+"/100  "+expalintopiclink+" </h4>");
							$('#quiz'+id).hide();
							$('#proceed'+id).show(); 
							$('#totalanswer'+id).val(1);
							
						}
				}
				
				function newvalidate(id,next,explainID) {	
					console.log("revision validate funct");
						var optselected = $( "input:radio[name=quiz"+id+"]:checked" ).val(); 
						var answser =  $("#answer"+id).val(); var previous = 'chooseparam';
						var expalintopiclink ="";
						
						if(optselected==undefined){	

						}else{
						var chooseCount =  parseInt($("#chooseCount_"+id).val())+1;
						$("#chooseCount_"+id).val(chooseCount);
						var submitvalid = $('#submitvalid').val();
						if(chooseCount == 1){
							var previousval = $('#'+previous).val(); 
							var rightcount = 0;
							var wrngcount = 0;
							if(optselected==answser){
								rightcount = 1; wrngcount = 0;
							}else{
								wrngcount = 0; wrngcount = 1;
							}
							
							$.ajax({
								url : 'selectedvalues.php',
								method: 'POST',
								data: {
								   previousval: previousval,
								   next:next,
								   rightcount:rightcount,
								   wrongcount:wrngcount,
								   currid:	submitvalid
								}
							});
							$('#rightcount').val('');
							$('#wrongcount').val('');
						}
						}

						if(explainID!=0) { expalintopiclink = '<span style=\"color:#ffba00;cursor:pointer;\" onclick=\"showExplainTopic('+explainID+','+id+');\">Explain Answer</span>'; } 
						
						$('#totalanswer'+id).val(0); 
						var score = $('#choosescore').val();
						if(score == "") score = 0;
						if(optselected==answser){
								score = parseInt(score) + 4; $('#choosescore').val(parseInt(score));
								$('#rightcount').val('1');$('#wrongcount').val('0');
								$("#resdiv"+id).css("background-color","#00a651");
								$("#chngbutdiv"+id).attr('class', 'row resultexdiv');
								$("#resdiv"+id).html("<h4>Excellent! Your answer is Correct  "+expalintopiclink+"</h4>");
								$('#quiz'+id).hide();
								$('#proceed'+id).show();
								$('#totalanswer'+id).val(1);
								
						}else if(optselected==undefined){
							$('#wrongcount').val('0');$('#rightcount').val('0');
							$("#resdiv"+id).css("background-color","#db3436");
							$("#resdiv"+id).html("<h4>Please choose the answer</h4>");
						}else{
							$('#wrongcount').val('1');$('#rightcount').val('0');
							$('#choosescore').val(parseInt(score));
							$("#resdiv"+id).css("background-color","#db3436");
							$("#chngbutdiv"+id).attr('class', 'row resulterrdiv');
							
							$("#resdiv"+id).html("<h4>Sorry, Your answer is Wrong.  The correct Answer is \""+ $("#dispanswer"+id).html() +"\". "+expalintopiclink+" </h4>");
							$('#quiz'+id).hide();
							$('#proceed'+id).show(); 
							$('#totalanswer'+id).val(1);
							
						}
				}
				
				/*Choose the correctstart*/
				/*Choose the best with images start*/
				function validateChooseTheBestImg(id,next) {	
					var optselected = $( "input:radio[name=quiz"+id+"]:checked" ).val();
					var answser =  $("#answer"+id).val(); var previous = 'chooseimgparam';
					console.log(optselected+"::"+answser);
					$('#totalanswer'+id).val(0);
					
					
					var chooseImgCount =  parseInt($("#chooseImgCount_"+id).val())+1;
					$("#chooseImgCount_"+id).val(chooseImgCount);
					
					if(chooseImgCount == 1){
						var previousval = $('#'+previous).val(); console.log(previousval);
						var rightcount = 0;
						var wrngcount = 0;
						if(optselected==answser){
							rightcount = 1; wrngcount = 0;
						}else{
							wrngcount = 0; wrngcount = 1;
						}
						
						$.ajax({
							url : 'selectedvalues.php',
							method: 'POST',
							data: {
							   previousval: previousval,
							   next:next,
							   rightcount:rightcount,
							   wrongcount:wrngcount,
							}
						});
						$('#rightcount').val('');
						$('#wrongcount').val('');
					}
					if(optselected==answser){
							$('#rightcount').val('1');$('#wrongcount').val('0');
							$("#resdiv"+id).css("background-color","#00a651");
							$("#resdiv"+id).html("<h4>Excellent</h4>");
							$('#totalanswer'+id).val(1);
							setTimeout(function(){ShowNext(id,next,previous);},3000);
							
					}else if(optselected==undefined){
						$('#wrongcount').val('0');$('#rightcount').val('0');
						$("#resdiv"+id).css("background-color","#db3436");
						$("#resdiv"+id).html("<h4>Please choose the answer</h4>");
					}else{
						$('#wrongcount').val('1');$('#rightcount').val('0');
						$("#resdiv"+id).css("background-color","#db3436");
						$("#resdiv"+id).html("<h4>Try Again</h4>");
					}
				}
				/*Choose the best with images ends*/
				/*Drag & Drop start*/
				function dragdropValidate(id,next,sec1,sec2) {	
					var i = 1 ;var j = 1;var right1 = 0;var right2 = 0; var previous = 'dragdropparam';
					var countDragDrop =  parseInt($("#countDragDrop_"+id).val())+1;
					$("#countDragDrop_"+id).val(countDragDrop);
					if(countDragDrop == 2){
						$("#dvSource_"+id+" img").remove();
						$("#dvDest_"+id+" img").remove();
						$("#dvDest_"+id).empty();
						$("#dvDest1_"+id).empty();
						$("#section1"+id+" input").each(function() {
							var tempid = $(this).attr('id');
							var tempsrc = $(this).attr('value');
							$("#dvDest_"+id).prepend('<img id="'+tempid+'" src="'+tempsrc+'" />');
						});
						
						$("#dvDest1_"+id+" img").remove();
						$("#section2"+id+" input").each(function() {
							var tempid = $(this).attr('id');
							var tempsrc = $(this).attr('value');
							$("#dvDest1_"+id).prepend('<img id="'+tempid+'" src="'+tempsrc+'" />');
						});
						
						setTimeout(function(){ShowNext(id,next,previous);},3000);
						
					}
					
					var sec1Arr = new Array();
					var filesec1Arr = new Array();
					$("#dvDest_"+id+" img").each(function() {
							var answer = '';
							var answer = $(this).attr('src');
							for(i=1;i<sec1;i++){
								var org_ans = '';
								var org_ans = document.getElementById('answer_'+id+'_1_'+i).value;
								var tempanswer = answer.replace(/^.*[\\\/]/, '')
								var temporg_ans = org_ans.replace(/^.*[\\\/]/, '')
								if(tempanswer == temporg_ans){
									sec1Arr.push(org_ans);
									filesec1Arr.push(temporg_ans);
									right1++;
								}
							}
							
					});

					$("#dvDest_"+id+" img").each(function() {
							var dest1id = $(this).attr('id');
							var dest1src = $(this).attr('src');
							dest1src = dest1src.replace(/^.*[\\\/]/, '')
							if(jQuery.inArray(dest1src, filesec1Arr) !== -1){
								$("#"+dest1id).css("border","2px none");
							}else{
								$("#"+dest1id).css("border","2px solid red");
							}
					});
					
					var sec2Arr = new Array();
					var filesec2Arr = new Array();
					$("#dvDest1_"+id+" img").each(function() {
							var answer1 = '';
							var answer1 = $(this).attr('src');
							for(j=1;j<sec2;j++){
								var org_ans1 = '';
								var org_ans1 = document.getElementById('answer_'+id+'_2_'+j).value;
								var tempanswer1 = answer1.replace(/^.*[\\\/]/, '')
								var temporg_ans1 = org_ans1.replace(/^.*[\\\/]/, '')
								if(tempanswer1 == temporg_ans1){
									sec2Arr.push(org_ans1);
									filesec2Arr.push(temporg_ans1);
									right2++;
								}
							}
					});
					
					
					$("#dvDest1_"+id+" img").each(function() {
							var dest2id = $(this).attr('id');
							var dest2src = $(this).attr('src');
							dest2src = dest2src.replace(/^.*[\\\/]/, '')
							if(jQuery.inArray(dest2src, filesec2Arr) !== -1){
								$("#"+dest2id).css("border","2px none");
							}else{
								$("#"+dest2id).css("border","2px solid red");
							}
					}); 
					var right = right1 + right2;
					$('#rightcount').val(right);
					var total = $('#total_img_count_'+id).val();
					var wrng = total-right; 
					$('#wrongcount').val(wrng);

					if(countDragDrop == 1){

						var previousval = $('#'+previous).val(); console.log(previousval);
						var rightcount = $('#rightcount').val();
						var wrngcount = $('#wrongcount').val();
						$.ajax({
							url : 'selectedvalues.php',
							method: 'POST',
							data: {
							   previousval: previousval,
							   next:next,
							   rightcount:rightcount,
							   wrongcount:wrngcount,
							}
						});
						$('#rightcount').val('');
						$('#wrongcount').val('');
					}
					if(((sec1-1) == right1) && ((sec2-1) == right2)) {
						
							$("#dragdrop_Show_Div_"+id).hide();
							$("#dragdrop_Sub_Div_"+id).show();
							$("#resdiv"+id).css("background-color","#00a651");
							$("#resdiv"+id).html("<h4>Excellent</h4>");
							$("#draggedImage").val('');
							setTimeout(function(){ShowNext(id,next,previous);},3000);
					}else{
	
						$("#dragdrop_Show_Div_"+id).show();
						$("#dragdrop_Sub_Div_"+id).hide();
					
						$("#resdivshow"+id).css("background-color","#db3436");
						$("#resdivshow"+id).html("<h4>Incorrect Answers</h4>");
					}
					$('#totalanswer'+id).val(right);
				
				}
				/*Drag & Drop ends*/
				/*Match the following start*/
				function findPos(obj) {
					var curLeft = curTop = 0;
					if (obj.offsetParent) {
						do {
							curLeft += obj.offsetLeft;
							curTop += obj.offsetTop;
						} while (obj = obj.offsetParent);
					}
					return {x:curLeft, y:curTop};
				}
				function getCenter(obj){
					centerdg = findPos(obj);
					cx = (centerdg.x - offsetX) + (obj.offsetWidth / 2);
					cy = (centerdg.y - offsetY) + (obj.offsetHeight / 2);
				
					return {x:cx, y:cy};
				}

				function setpos(id,dtype) {
					console.log(id);
					console.log(document.getElementById(id));
					if(document.getElementById(id) != null){
						var ps = getPosition(document.getElementById(id));
						position.push({
							x1: ps.x1,
							y1: ps.y1,
							x2: ps.x2,
							y2: ps.y2,
							src: id,
							dtype: dtype
						});
					}
				}
				
				function getPosition(obj)
				{
					centerdg = findPos(obj);
					
					var cx1 = (centerdg.x - offsetX);
					var cy1 = (centerdg.y - offsetY);
							
					var cx2 = (centerdg.x - offsetX) + (obj.offsetWidth );
					var cy2 = (centerdg.y - offsetY) + (obj.offsetHeight );
					return {x1:cx1, y1:cy1, x2:cx2, y2:cy2};
				}

				var startX, startY, mouseX, mouseY;
				var isDown = false;
				var canvas,ctx,canvasOffset,offsetX,offsetY,centerdg,centerdp ;
				var lines = [];
				var position = [];
				var currentDragger;
				
				function start(id) {
					//debugger;
					console.log("start match the following");
					lines = [];
					position = [];
					var totalQesCount = $("#total_qes_count_"+id).val();
					canvas = document.getElementById("canvas_"+id);

					ctx = canvas.getContext("2d");
					canvasOffset = $("#canvas_"+id).offset();
					offsetX = canvasOffset.left;
					offsetY = canvasOffset.top;
					console.log($("#divpartold"+id).width());
					console.log(document.getElementById("divpartold"+id).style.width);
					canvas.width = $("#divpartold"+id).width();
					canvas.height = $("#divpartold"+id).height();
					
					ctx.strokeStyle = "white";
					ctx.lineWidth = 4;
					var a =1;
					for(a=1 ; a<=totalQesCount; a++ ){
						setpos("dragger"+a+"_"+id,"drag");
						setpos("drop"+a+"_"+id,"drop");
					}
					
					$("#canvas_"+id).on("mousedown",function (e) {
						handleAndroidMouseDown(e);
					});
					$("#canvas_"+id).on("mouseout",function (e) {
						handleAndroidMouseUp(e);
					});
					$("#canvas_"+id).on("mouseup",function (e) {
						handleAndroidMouseUp(e);
					});
					$("#canvas_"+id).mousemove(function (e) {
						handleAndroidMouseMove(e);
					});
					try {
						$("#canvas_"+id).on("touchstart",function (e) {
							handleAndroidMouseDown(e);
						});
						$("#canvas_"+id).on("touchmove",function (e) {
							handleAndroidMouseMove(e);
						});
						$("#canvas_"+id).on("touchend",function (e) {
							handleAndroidMouseUp(e);
						});
					
					} catch(err) {console.log("no touch move" + err.message);}
				}
				function handleAndroidMouseDown(e) {
					e.preventDefault();
					console.log("down");
					if (isDown) {
						return;
					}
					var x = null;
					var y = null;
					try {
						x = e.originalEvent.changedTouches[0].pageX;
						y = e.originalEvent.changedTouches[0].pageY;
					} catch(err) {}
					if(x == null ) { 
						x= e.clientX;
						y = e.clientY;
					}
					mouseX = parseInt(x - offsetX);
					mouseY = parseInt(y - offsetY);
					for (var i = 0; i < position.length; i++) {
						if(position[i].dtype != "drag")
							continue;
						if(mouseX > position[i].x1 && mouseY > position[i].y1 && mouseX < position[i].x2 && mouseY < position[i].y2)
						{
							startX = mouseX;
							startY = mouseY;
							isDown = true;
							currentDragger = position[i].src;				
							position.splice(i,1);
						}
					}
				}
				
				function handleAndroidMouseUp(e) {	
					e.preventDefault();
					
					if (!isDown) {
						return;
					}
					var dstid = null;
					var x = null;
					var y = null;
					try {
						x = e.originalEvent.changedTouches[0].pageX;
						y = e.originalEvent.changedTouches[0].pageY;
					} catch(err) {}
					if(x == null ) { 
						x= e.clientX;
						y = e.clientY;
					}
					
					mouseX = parseInt(x - offsetX);
					mouseY = parseInt(y - offsetY);
					var ok =false;
					for (var i = 0; i < position.length; i++) {
						if(position[i].dtype != "drop")
							continue;
						if(mouseX > position[i].x1 && mouseY > position[i].y1 && mouseX < position[i].x2 && mouseY < position[i].y2)
						{
							ok =true;
							startX = mouseX;
							startY = mouseY;
							dstid = position[i].src;
							position.splice(i,1);
							break;
						}
					}	
					if(!ok)
						return;
					srcid = currentDragger;		
					if(typeof srcid == "undefined" || typeof dstid == "undefined" || srcid == "" || dstid == "" || srcid == null || dstid == null )
					{
						return;
					}
					
					var centersrc = getCenter(document.getElementById(currentDragger));
					var centerdst = getCenter(document.getElementById(dstid));
					
					startX = centersrc.x;
					startY = centersrc.y;
					mouseX = centerdst.x;
					mouseY = centerdst.y;
					drawLines(mouseX,mouseY);
					
					// Put your mouseup stuff here
					isDown = false;
					lines.push({
						x1: startX,
						y1: startY,
						x2: mouseX,
						y2: mouseY,
						src: srcid,
						dst : dstid
					});
					currentDragger = "";
				}

				function handleAndroidMouseMove(e) {
					e.preventDefault();
					
					if (!isDown) {
						return;
					}		
					var x = null;
					var y = null;
					try {
						x = e.originalEvent.changedTouches[0].pageX;
						y = e.originalEvent.changedTouches[0].pageY;
					} catch(err) {}
					if(x == null ) { 
						x= e.clientX;
						y = e.clientY;
					}
					
					mouseX = parseInt(x - offsetX);
					mouseY = parseInt(y - offsetY);
					console.log("moving x : "+x + " y : "+y);
					
					drawLines(mouseX, mouseY);
				}
				function removeevent(){
					console.log("Event removed");
				}
				function drawLines(toX, toY) {
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					for (var i = 0; i < lines.length; i++) {
						drawLine(lines[i]);
						console.log(lines[i].src + " pointing to "+ lines[i].dst);
						$("#results").html(lines[i].src + " pointing to "+ lines[i].dst+"<br>");
					}
					
					drawLine({
						x1: startX,
						y1: startY,
						x2: mouseX,
						y2: mouseY
					});
				}
				
				function drawTheImage(img, opacity) {
					ctx.globalAlpha = opacity;
					ctx.drawImage(img, 0, 0);
					ctx.globalAlpha = 1.00;
				}
				function drawLine(line) {
					ctx.beginPath();
					ctx.moveTo(line.x1, line.y1);
					ctx.lineTo(line.x2, line.y2);
					ctx.stroke();
				}
				
				/*function allowDrop(ev) {
					ev.preventDefault();
				}
				function drag(ev) {
					//start(); // dont call this function while drag
					ev.dataTransfer.setData("text", ev.target.id);
				}
				function drop(ev) {
					debugger;
					ev.preventDefault();
					var data = ev.dataTransfer.getData("text");
					ev.target.innerHTML ="";
					ev.target.appendChild(document.getElementById(data));
				}*/
				
				function showresults(id,next){
					var countMatch =  parseInt($("#countMatching_"+id).val())+1;
					$("#countMatching_"+id).val(countMatch);
					var previous = 'matchparam';
					if(countMatch > 1){
						ctx.clearRect(0, 0, canvas.width, canvas.height);
						for (var i = 0; i < lines.length; i++) {
							var tempval = lines[i].src.split('dragger');
							var tempvalId = tempval[1].split('_'+id);
							tempvalId = tempvalId[0];
							var answer = $("#ans_match_"+(tempvalId)+"_"+id).val();
							var org_answer = $("#"+lines[i].dst+"_ans").val();
							if(answer == org_answer){
								ctx.beginPath();
								ctx.moveTo(lines[i].x1, lines[i].y1);
								ctx.lineTo(lines[i].x2, lines[i].y2);
								ctx.strokeStyle = "green";
								ctx.stroke();
								right++;
							}else{
								
								for (var j = 0; j < lines.length; j++) {
									var org_answer1 = $("#"+lines[j].dst+"_ans").val();
									if(answer == org_answer1){
										ctx.beginPath();
										ctx.moveTo(lines[i].x1, lines[i].y1);
										ctx.lineTo(lines[j].x2, lines[j].y2);
										ctx.strokeStyle = "green";
										ctx.stroke();
									}
								}
								
							}
						}
						$("#showresdiv"+id).css("background-color","#666666 ");
						$("#showresdiv"+id).html("<h4>Check the above answer</h4>");
						setTimeout(function(){ShowNext(id,next,previous);},3000);
					}else{

						var j=1;var right = 0;var wrong = 0;
						ctx.clearRect(0, 0, canvas.width, canvas.height);
						
						for (var i = 0; i < lines.length; i++) {
							var tempval = lines[i].src.split('dragger');
							var tempvalId = tempval[1].split('_'+id);
							tempvalId = tempvalId[0];
							var answer =   document.getElementById("ans_match_"+tempvalId+"_"+id).value;
							var org_answer = document.getElementById(lines[i].dst+"_ans").value;
							if(answer == org_answer){
								ctx.beginPath();
								ctx.moveTo(lines[i].x1, lines[i].y1);
								ctx.lineTo(lines[i].x2, lines[i].y2);
								ctx.strokeStyle = "green";
								ctx.stroke();
								right++;
							}else{
							
								ctx.beginPath();
								ctx.moveTo(lines[i].x1, lines[i].y1);
								ctx.lineTo(lines[i].x2, lines[i].y2);
								ctx.strokeStyle = "red";
								ctx.stroke();
								wrong++;
							}
							j++;
						}
						$('#totalanswer'+id).val(right);
						$('#rightcount').val($('#totalanswer'+id).val());
						$('#wrongcount').val(wrong);

						
						var previousval = $('#'+previous).val(); console.log(previousval);
						console.log("previous value"+previous);
						var rightcount = $('#rightcount').val();
						var wrngcount = $('#wrongcount').val();
						$.ajax({
							url : 'selectedvalues.php',
							method: 'POST',
							data: {
							   previousval: previousval,
							   next:next,
							   rightcount:rightcount,
							   wrongcount:wrngcount,
							}
						});
						$('#rightcount').val('');
						$('#wrongcount').val('');
						if(lines.length == 0){
							$("#countMatching_"+id).val(0);
							$("#resdiv"+id).css("background-color","#db3436");
							$("#resdiv"+id).html("<h4>Try again</h4>");
							return false;
						}else if(wrong > 0){
							$("#match_Show_Div_"+id).show();
							$("#match_Sub_Div_"+id).hide();
							$("#showresdiv"+id).css("background-color","#db3436");
							$("#showresdiv"+id).html("<h4>Incorrect answers</h4>");
						}else if(right == lines.length){
							$("#resdiv"+id).css("background-color","#00a651");
							$("#resdiv"+id).html("<h4>Excellent</h4>");
							setTimeout(function(){ShowNext(id,next,previous);},3000);
						}
					}
				}
				/*Match the following end*/	
function callnext(){
console.log("callnext");
var currid = $('#currentplaying').val(); console.log("callnext"+currid);
var curridintro = $('#currentplayintro').val(); 
	if(curridintro == 1)
	{ console.log("intro audio playing :: #introaudiopart"+currid);
		$('#currentplayintro').val(0);
		$("#introaudiopart"+currid).click();
		console.log("clicked :: introaudiopart"+currid);
	}
	else{
			$("#divaudiopart"+currid).click();
			console.log("clicked :: divaudiopart"+currid);
		}
	
	console.log("clicked :: divaudiopart"+currid);
}	

function firstAudioStart1(){
	if($("#audio0").length>0) {

	$("#audio0").get(0).play();
		console.log("started");
		$('#currentplaying').val('100001');
	}

}

function firstAudioStart(){
	if($("#audio0").length>0) {

	
	$(".tabgroup").each(function(){
		var val = $(this).css('display');
		console.log("display attr :: "+val);
		if(val == 'block'){
			var id = $(".tabgroup").attr('id');
			console.log("div id :: "+id);
			var audioid = $('#'+id+' > audio').attr('id');
			console.log("audio id :: "+audioid);
			var splitval = audioid.split('part'); console.log("splitted values :: "+splitval);
			if(splitval[0] != "introaudio"){
				$('#currentplaying').val(splitval[1]);
			}else{
				$('#currentplayintro').val('1');
				$('#currentplaying').val(splitval[1]);
			}
		}
	}) ;
	
	$("#audio0").get(0).play();
		console.log("started");
	}
	
	 var pagebelongs = 737515; var alogin = '';
	 var pgename = '';
	 var newqidval = 737515; 	var icnt = $('#hiddencnt').val();
	var maxwdth = $('#maxwidth').val();
	var maxhght = $('#maxheight').val();
	 $.ajax({
		type:"GET",
		url:'ajaxtemplates.php',
		data :{
			icount: icnt,
			pagebelongsto : pagebelongs,
			params : 'qid=737515&originalqid=737515&total=100&device=&orgpage=&generatehtml=yes',
			pagename : '',
			newqid : newqidval,
			maxwidth : maxwdth,
			maxheight : maxhght,
		}, 
		success:function(res){
			if($('#divtag'+icnt).attr("data-contnt") == "no"){
				$('#divtag'+icnt).html(res);
				$('#divtag'+icnt).attr('data-contnt', 'yes');
				MathJax.Hub.Typeset();
			}
			
		}
	}); 
	
}

function introAudioTrack(div){ 
	console.log("introAudioTrack :: "+div);  
	var aname = $("#introaudiopart"+div+" > source").attr("src"); 
	var audiotagid = "audio0";
	var Mp3Me= document.getElementById("audio0");
	Mp3Me.children[0].src = aname;
	Mp3Me.load();
	if($('#firstStart').css('display') != "none"){
		$('#firstStart').click(function(){	
			$('#firstStart').hide();$('#firstStart1').hide();
			$('.mask').hide();
			$("#"+audiotagid).get(0).play();  console.log("intro divid :: "+div);
			$('#currentplaying').val(div);
			$('#currentplayintro').val(1);
		});
	}else{
		$("#"+audiotagid).get(0).play();  console.log("intro divid :: "+div);
		$('#currentplaying').val(div);
		$('#currentplayintro').val(1);
	}
}
			
function AudioTrack(div){ 
	console.log("AudioTrack :: "+div);  
	var aname = $("#divaudiopart"+div+" > source").attr("src"); 
	var audiotagid = "audio0";
	var Mp3Me= document.getElementById("audio0");
	Mp3Me.children[0].src = aname;
    	Mp3Me.load();
	if($('#firstStart').css('display') != "none"){
		$('#firstStart').click(function(){	
			$('#firstStart').hide(); $('#firstStart1').hide();
			$('.mask').hide();
			$("#"+audiotagid).get(0).play();  console.log("divid :: "+div);
			$('#currentplaying').val(div);
		});
	}else{
		$("#"+audiotagid).get(0).play();  console.log("divid :: "+div);
		$('#currentplaying').val(div);
	}

}
function audioEnd(id,next,divaudioid,type) {
	console.log("called :: "+id); 
		if(next== 'audio') {
		
				if($("#divtemplate"+((id+1))).length>0){	
									
					$("#divtemplate"+((id+1))).fadeIn(3000);
					if($("#divaudiopart"+(id+1)).length>0) { 
						
						AudioTrack((id+1));
					}else{
						//audioEnd((id+1),next);
					}
				}
			fixedPosition(); 	
			animateDiv(id);			
		}else if(next== 'audioend') {
		
			
						if($("#divpart"+(divaudioid+1)).length>0) { 
				$("#divpart"+(divaudioid)).hide();
				$("#divpart"+(divaudioid+1)).fadeIn(3000); 
				$("#divtemplate"+((divaudioid+1)+"00001")).fadeIn(3000);
				AudioTrack((divaudioid+1)+"00001");
			}
						
			fixedPosition(); 		}else {
			console.log("type :: "+type);
			ShowNext(divaudioid,next,type);
		}
}

function endslide(module,pagebelongsto){
var submitvalid = $('#submitvalid').val();
		$.ajax({
			url : 'selectedvalues.php',
			method: 'POST',
			data: {
				slide: module,
				reqqid: pagebelongsto,
				currid:	submitvalid
			},
			success:function(res){ 
				$('#details').html(res);
			}
		});
	}
			
				
	//menu
	var $ = jQuery.noConflict();
		
		function activator(name){ 
			$('#'+name).animate({'bottom':'0px'},500);
			$('#'+name).css('display','block');
		}
		
		function boxclose(name){ 
			$('#'+name).animate({'bottom':'-43px','display':'none'},500);
			$('#'+name).css('display','none');	
		}
		
		$(document).ready(function(){
		
		//Hide (Collapse) the toggle containers on load
		$(".toggle_container").hide(); 
		
		//Switch the "Open" and "Close" state per click then slide up/down (depending on open/close state)
		$(".trigger").click(function(){
			$(this).toggleClass("active").next().slideToggle("slow");
			return false; //Prevent the browser jump to the link anchor
		});
		
		});
	