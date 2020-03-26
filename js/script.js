(function($){
	'use strict';
	if (!String.prototype.repeat) {
		String.prototype.repeat = function(num){
			return new Array(num + 1).join(this);
		}
	}

	if (!String.prototype.padStart){
		String.prototype.padStart = function(targetLength, padString) {
			targetLength = targetLength >> 0; //truncate if number, or convert non-number to 0;
			padString = String(typeof padString !== 'undefined' ? padString : ' ');
			if (this.length >= targetLength) {
				return String(this);
			} else {
				targetLength = targetLength - this.length;
				if (targetLength > padString.length) {
					padString += padString.repeat(targetLength / padString.length);
				}
				return padString.slice(0, targetLength) + String(this);
			}
		};
	}

	if (!Array.prototype.typeWriter){
		Array.prototype.typeWriter = function(obj) {
			if (this.length <= 0){
				return this;
			}else {
				let cursorPosition = 0,
					tempTypeSpeed = 0,
					HTML = this;
				let typing = setTimeout(function fnc(){
					tempTypeSpeed = (Math.random() * 50) + 25;
					obj.innerHTML+= HTML[cursorPosition].replace('\t'," &emsp; ");
					cursorPosition += 1;
					if (cursorPosition < HTML.length) {
						obj.innerHTML+= '<br />';
						typing = setTimeout(fnc, tempTypeSpeed);
					}else if(cursorPosition == HTML.length){
						obj.classList.remove('cmd');
						obj.classList.add('git');
					}
				},tempTypeSpeed);
			}
		};
	}

	$(function(){
		let fpage = function(){
			if (window.innerHeight > 475){
				$("section").eq(0).css({"height":window.innerHeight+'px'});
				$(".cbox").css("height",window.innerHeight+'px');
			}else {
				$("section").eq(0).css({"height":'475px'});
				$(".cbox").css("height",'475px');
			}
		}
		let ani = function(){
			let pos = $("html").scrollTop(),
			one = ($(window).width() >= 904)? (window.innerHeight / 2) : (window.innerHeight / 4),
			two = ($(window).width() >= 904)? (window.innerHeight / 2) : (window.innerHeight),
			three = $("section:eq(2) > .content").offset().top - ($(window).height() / 2);
			if (pos < one){
				$(".stop").css({"display":"none"});
			}else {
				$(".stop").css({"display":"block"});
			}
			if (pos > one){
				$("section:eq(1) > .part.one > .content").addClass("ani_0");
			}
			if (pos > two){
				$("section:eq(1) > .part.two > .content").addClass("ani_0");
			}
			if (pos > three){
				$("section:eq(2) > .content > h4").addClass("ani_1");
				$("section:eq(2) > .content > h1").addClass("ani_1");
				$("section:eq(2) > .content > .history").addClass("ani_2");
			}
		};
		$(window).scroll(ani);
		$(window).resize(fpage);

		$(".stop").mousedown(function(){
			$("html").animate({
				scrollTop : 0
			},800);
		});

		$.ajax({
			url:"https://res.cloudinary.com/uisaw/image/upload/v1585045532/portfolio/wmap.svg",
			dataType:'text',
			cache:false,
			async:true,
			timeout:3000,
			error: function(request,status,error){
				alert('Error loading SVG\rcode:'+request.status+'\rerror:'+request.responseText);
			},
			success: function(data){
				let svg = data;
				if (svg.length > 0){
					$(".svg-wrap").html(svg);
					$.ajax({
						url:"./info.json",
						dataType:'json',
						cache:false,
						async:true,
						timeout:3000,
						error: function(request,status,error){
							alert('Error loading JSON\rcode:'+request.status+'\rerror:'+request.responseText);
						},
						success : function(data){
							if (typeof data == "object"){
								let sc = data;
								let code = new Array();
								code[0] = "<span class=\"var-hl\">var</span> <span class=\"object-hl\">Title</span> <span class=\"equal-hl\">=</span> <span class=\"value-hl\">\"Hello World\"</span>;";
								code[1] = "<span class=\"var-hl\">const</span> <span class=\"object-hl\">Attitude</span> <span class=\"equal-hl\">=</span> {";
								code[2] = "\t<span class=\"property-hl\">'Think'</span><span class=\"equal-hl\">:</span><span class=\"value-hl\">'PROGRESSIVE</span> <i class=\"fa fa-flask c0\"></i><span class=\"value-hl\">'</span>,";
								code[3] = "\t<span class=\"property-hl\">'Object'</span><span class=\"equal-hl\">:</span><span class=\"value-hl\">'Fun & Enjoy & Reward</span> <i class=\"fa fa-music c2\"></i><span class=\"value-hl\">'</span>,";
								code[4] = "\t<span class=\"property-hl\">'Process'</span><span class=\"equal-hl\">:</span><span class=\"value-hl\">'SMART</span> <i class=\"fa fa-lightbulb-o c1\"></i><span class=\"value-hl\">'</span>";
								code[5] = "};";
								code[6] = "<span class=\"var-hl\">var</span> <span class=\"object-hl\">Kevin</span> <span class=\"equal-hl\">=</span> {";
								code[7] = "\t<span class=\"property-hl\">nick</span><span class=\"equal-hl\">:</span><span class=\"value-hl\">'Rubber band'</span>,";
								code[8] = "\t<span class=\"property-hl\">class</span><span class=\"equal-hl\">:</span><span class=\"value-hl\">'Cleric'</span>,";
								code[9] = "\t<span class=\"property-hl\">race</span><span class=\"equal-hl\">:</span><span class=\"value-hl\">'Human'</span>,";
								code[10] = "\t<span class=\"property-hl\">skill</span><span class=\"equal-hl\">:</span>[<span class=\"value-hl\">'PHP'</span>,<span class=\"value-hl\">'ASP'</span>,<span class=\"value-hl\">'Javascript'</span>,<span class=\"value-hl\">'HTML'</span>,<span class=\"value-hl\">'CSS'</span>,<span class=\"value-hl\">'SQL'</span>,<span class=\"value-hl\">'Etc..'</span>];";
								code[11] = "};<br />";
								code[12]= "<span class=\"ready-hl\">Are you ready for the project?</span> <span class=\"ok-hl\">OK!</span>";

								$.getScript("https://cdn.jsdelivr.net/mojs/latest/mo.min.js",function(){
									let moTimeline,
									moburst1 = new mojs.Burst({parent:$(".fireworks")[0],count:6,left:'0%',top:'40%',radius:{0:60},children:{fill:['#988ADE','#DE8AA0','#8AAEDE','#8ADEAD','#DEC58A','#8AD1DE'],duration:1300,easing:mojs.easing.bezier(0.1,1,0.3,1)}}),
									moburst2 = new mojs.Burst({parent:$(".fireworks")[0],left:'90%',top:'20%',count:14,radius:{0:120},children:{fill:['#988ADE','#DE8AA0','#8AAEDE','#8ADEAD','#DEC58A','#8AD1DE'],duration:1600,delay:100,easing:mojs.easing.bezier(0.1,1,0.3,1)}}),
									moburst3 = new mojs.Burst({parent:$(".fireworks")[0],left:'70%',top:'70%',count:8,radius:{0:90},children:{fill:['#988ADE','#DE8AA0','#8AAEDE','#8ADEAD','#DEC58A','#8AD1DE'],duration:1500,delay:200,easing:mojs.easing.bezier(0.1,1,0.3,1)}}),
									moburst4 = new mojs.Burst({parent:$(".fireworks")[0],left:'20%',top:'80%',count:14,radius:{0:60},children:{fill:['#988ADE','#DE8AA0','#8AAEDE','#8ADEAD','#DEC58A','#8AD1DE'],duration:2000,delay:300,easing:mojs.easing.bezier(0.1,1,0.3,1)}}),
									moburst5 = new mojs.Burst({parent:$(".fireworks")[0],count:12,left:'80%',top:'50%',radius:{0:60},children:{fill:['#988ADE','#DE8AA0','#8AAEDE','#8ADEAD','#DEC58A','#8AD1DE'],duration:1400,delay:400,easing:mojs.easing.bezier(0.1,1,0.3,1)}});									

									$("body > div").remove(); //mojs bug
									moTimeline = new mojs.Timeline();
									moTimeline.add(moburst1, moburst2, moburst3, moburst4, moburst5);

									if ($(".svg-wrap > #wmap").length){
										$("body").removeClass("hide").addClass("ready");
										ani();
										code.typeWriter($(".code")[0]);
										moTimeline.replay();

										$(".svg-wrap").css("visibility","visible");
										let svg = new Walkway({
											selector: '#wmap',
											easing: 'easeInOutQuint',
											duration: 2000,
											easing: function (t) {
												return t * t;
											}
										}).draw();

										$.when($(".continue").animate({
											opacity:1
										},800,function(){
											$(".continue").css({"cursor":"pointer"});
											$(".continue").mousedown(function(){
												$("html").animate({
													scrollTop : $("section:eq(1)").offset().top
												},800);
											});
										})).then(function(){
											$.when($.each(sc,function(key,val){
												let tag;
												tag = '<div class="book">';
												tag+= '<div class="cover">';
												tag+= '<div class="content ' + val.path + '">';
												tag+= '<img src="https://res.cloudinary.com/uisaw/image/upload/v' + val.ver + '/portfolio/' + val.path + '/cover.png" border="0" alt="' + val.title.replace('<br />',' ') + '" />';
												tag+= '<h2>' + val.title + '</h2>';
												tag+= '</div></div></div>';
												$(".books").append(tag);
											})).then(function(){
												$(".lbg").addClass("none");
												$(".books").removeClass("none");
											});
											$('.books > .book').mousedown(function(){
												let jdata = new Array(),
												cls = $(this).find(".content").attr("class").replace(/content| /g,''),
												obj = null,tobj = this;
												$.each(sc,function(idx,row){
													if (sc[idx].path == cls){
														obj = sc[idx];
														return false;
													}
												});
												for (let i=0;i < parseInt(obj.pages,10);i++){
													let num = i.toString();
													num = num.padStart(obj.part.page[0].length,'0');
													jdata.push({
														'src' : 'https://res.cloudinary.com/uisaw/image/upload/v' + obj.ver + '/portfolio/' + cls + '/' + num + '.jpg',
														'thumb' : 'https://res.cloudinary.com/uisaw/image/upload/v' + obj.ver + '/portfolio/' + cls + '/' + num + '.jpg',
														'subHtml' : '<h4>' + obj.title.replace('<br />',' ') + ' (' + obj.year + ')</h4><p>' + obj.des + '</p>'
													});
												}
												$("html").addClass("hide");
												$(tobj).lightGallery({
													dynamic:true,
													share:false,
													autoplayControls:false,
													download:false,
													dynamicEl:jdata
												});
												$(tobj).on("onBeforeOpen.lg",function(){							
													if ($(".lg-backdrop").length < 0){
														$("body").append('<div class="lg-backdrop in" style="transition-duration: 150ms;"></div>');
													}
												});
												$(tobj).on("onCloseAfter.lg",function(){
													$(tobj).data('lightGallery').destroy(true);
													$("html").removeClass("hide");
												});
											});
										});
									}
								});
							}
						}
					});
				}
			}
		});
	});
})(window.jQuery);