function allowDrop(ev) {
					ev.preventDefault();
				}

				function drag(ev) {
					ev.dataTransfer.setData("Text", ev.target.id);
				}
				function drop(ev) {
					ev.preventDefault();
					var data = ev.dataTransfer.getData("Text");
					$('#'+ev.target.id).empty();
					$('#'+ev.target.id).parent().removeAttr("class");
					$('#'+ev.target.id).parent().attr("class","drag_span");
					$('#'+ev.target.id).parent().append($('#'+data));
					$('#'+ev.target.id).remove();
				}
				function enableSubmit(id){
					var county = $('#resdiv'+id+' span').length;
					if(county == 0){$('[name="ddText_submit"]').prop('disabled', false);}
				}
				function dropdownTextValidate(id,next) {
					var count = document.getElementById("countDDText_"+id).value;
					var wrong = 0;var right = 0; var previous ='dropdowntextparam';
					for(var i =1 ; i <= count ; i++){
					console.log("ans_ddText_"+i+"_"+id);
						var answer =  document.getElementById("ans_ddText_"+i+"_"+id).value;
						var cur_answer = $("#quest_"+id+"_"+i+" .drop_span").attr("value");
						if(cur_answer == 'Drag Here'){
							$("#quest_"+id+"_"+i).attr("class","drop_span");
							$("#quest_"+id+"_"+i).css("background","#ff0000");
							wrong++;
						}else if(answer != cur_answer){
							$("#quest_"+id+"_"+i).children().css("background","#ff0000");
							wrong++;
						}else{$("#quest_"+id+"_"+i).children().css("background","#00ff00"); right++;}
					}
					$('#totalanswer'+id).val(right);
					$('#rightcount').val($('#totalanswer'+id).val());
					$('#wrongcount').val(wrong);
					
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

					if(wrong > 0){
						$("#ddText_Show_Div_"+id).show();
						$("#ddText_Sub_Div_"+id).hide();
					}else{
						$("#resdiv"+id).css("background-color","#00a651");
						$("#resdiv"+id).html("<h4>Excellent</h4>");
						setTimeout(function(){ShowNext(id,next,previous);},3000);
					}
				}
				function dropdownTextShow(id,next) {
					var count = document.getElementById("countDDText_"+id).value;
					for(var i =1 ; i <= count ; i++){
						var answer =  document.getElementById("divans_ddText_"+i+"_"+id).innerHTML;
						var data = "<span  class='drog_span'>"+answer+"</span>";
						$('#quest_'+id+'_'+i).empty();
						$('#quest_'+id+'_'+i).append(data);
						$("#quest_"+id+"_"+i).attr("class","drop_span");
						$("#quest_"+id+"_"+i).css("background","#00ff00");
						$("#quest_"+id+"_"+i).children().css("background","#00ff00");
					}
					var previous = 'ddshow';
					setTimeout(function(){ShowNext(id,next,previous);},3000);
				}
									
				function setDraggedImage(draggedImage){ //alert("in cond 1"+draggedImage);
						$("#draggedImage").val('');
						$("#draggedImage").val(draggedImage);
				}
				
				function dragAndDropInitialize(id){ 
					var imgCnt = $("#total_img_count_"+id).val(); 
					for(var j=1; j<= imgCnt; j++){
						$('#'+j).on('click touchstart', function() {
								$("#draggedImage").val(this.src+'~#~'+this.id);
						});
					}
					
					var yum = document.createElement('img');
					//var msie = /*@cc_on!@*/0;

					var links = document.querySelectorAll('img'), el = null;
					for (var i = 0; i < links.length; i++) {
						el = links[i];
					  
						el.setAttribute('draggable', 'true');
						addEvent(el, 'dragstart', function (e) {
						  e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
						  e.dataTransfer.setData('Text', this.id); // required otherwise doesn't work
						});
					 }

					var dest1 = document.querySelector("#dvDest_"+id); 
					var dest2 = document.querySelector("#dvDest1_"+id); 


					addEvent(dest1, 'dragover', function (e) {
						if (e.preventDefault) e.preventDefault(); // allows us to drop
						this.className = 'over';
						e.dataTransfer.dropEffect = 'copy';
						return false;
					});

					// to get IE to work
					addEvent(dest1, 'dragenter', function (e) {
						this.className = 'over';
						return false;
					});

					addEvent(dest1, 'dragleave', function () {
						this.className = '';
					});

					addEvent(dest1, 'drop', function (e) {
						if($("#dvDest_"+id).text() == ' Drop here  '){
							$("#dvDest_"+id).html('');
						}
						var tempVar = $("#draggedImage").val();						
						var tempList = tempVar.split('~#~');
						yum.src = tempList[0];
						yum.id = tempList[1];
						if(e.preventDefault) { e.preventDefault(); }
						if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting...why???
						
						var el = document.getElementById(e.dataTransfer.getData('Text'));

						el.parentNode.removeChild(el);

						dest1.className = '';
						var y = yum.cloneNode(true);
						dest1.appendChild(y);
						document.getElementById(tempList[1]).setAttribute("onmousedown", 'setDraggedImage('+tempList[0]+'~#~'+tempList[1]+')');
						document.getElementById(tempList[1]).setAttribute('draggable', 'true');
						return false;
					});
					
					addEvent(dest2, 'dragover', function (e) {
						if (e.preventDefault) e.preventDefault(); // allows us to drop
						this.className = 'over';
						e.dataTransfer.dropEffect = 'copy';
						return false;
					});

					// to get IE to work
					addEvent(dest2, 'dragenter', function (e) {
						this.className = 'over';
						return false;
					});

					addEvent(dest2, 'dragleave', function () {
						this.className = '';
					});

					addEvent(dest2, 'drop', function (e) {
						if($("#dvDest1_"+id).text() == ' Drop here  '){
							$("#dvDest1_"+id).html('');
						}
						var tempVar = $("#draggedImage").val();						
						var tempList = tempVar.split('~#~');
						yum.src = tempList[0];
						yum.id = tempList[1];
						if(e.preventDefault) { e.preventDefault(); }
						if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting...why???
						
						var el = document.getElementById(e.dataTransfer.getData('Text'));

						el.parentNode.removeChild(el);

						dest2.className = '';
						var y = yum.cloneNode(true);
						dest2.appendChild(y);
						document.getElementById(tempList[1]).setAttribute("onmousedown", 'setDraggedImage('+tempList[0]+'~#~'+tempList[1]+')');
						document.getElementById(tempList[1]).setAttribute('draggable', 'true');
						return false;
					});	
				}