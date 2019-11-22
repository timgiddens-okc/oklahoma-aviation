var previousScroll = 0;

$(document).ready(function(){
	
	$(".slideshow").bxSlider({
		touchEnabled: false,
		controls: false,
		auto: true,
		adaptiveHeight: true
	});
	
	$(".hamburger").on("click", function(e){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$("#mobile-nav").removeClass("active");
		} else {
			$("#mobile-nav").addClass("active");
			$(this).addClass("active");
		}
	});
	
	$("#mobile-nav").on("mouseleave", function(){
		$("#mobile-nav").removeClass("active");
		$(".hamburger").removeClass("active");
	});
	
	if($(window).width() <= 640){
		if($(document).scrollTop() > 97){
			$("header").addClass("scrolling");
		}
	}
	
	$(".more").on("click", function(e){
		e.preventDefault();
		var bio = $(this).parent().find('.hidden-bio');
		var thisButton = $(this);
		$(".more").not(thisButton).text("More");
		$(".hidden-bio").not(bio).slideUp(300);
		if(thisButton.text() == "More"){
			bio.slideDown(300);
			thisButton.text("Less");
		} else {
			bio.slideUp(300);
			thisButton.text("More");
		}
	});
	
	$(".course-nav a").on("click", function(e){
		e.preventDefault();
		if(!$(this).hasClass("active")){
			$(".course-nav a.active").removeClass("active");
			$(this).addClass("active");
			var targetElement = $(this).attr("href");
			$(".course-category").not(targetElement).slideUp(300);
			$(targetElement).slideDown(300);
		}
	});
	
	$(".plane .details").on("click", function(e){
		e.preventDefault();
		if($(this).hasClass("active")){
			$(".plane .details.active").removeClass("active");
		} else {
			$(".plane .details.active").removeClass("active");
			$(this).addClass("active");
		}
	});

	$(document).on("mouseleave", ".plane .details.active", function(){
		$(".plane .details.active").removeClass("active");
	});
	
	//
	//
	//
	// Scrolling Animations
	//
	//
	//
	
	// Set up variables to get beginning position and get trigger elements
	var scrollTriggers 		= document.getElementsByClassName('-animation-trigger'),
			windowStartHeight = $(window).outerHeight(),
			winWidth 					= $(window).outerWidth(),
			scroll 						= $(window).scrollTop();
	
	// Adjust variables when window resizes
	window.onresize = function() {
		windowStartHeight = $(window).outerHeight();
	}		
			
	// Checks to make some triggers exist
	if (scrollTriggers.length > 0) {
		
		// Set the height of the trigger that an element needs to be at to get triggered
		var triggerHeight = windowStartHeight + scroll - (windowStartHeight * .3);
		$(scrollTriggers).each(function() {
			
			// Return x/y position of trigger element
			var pos = getPosition(this);
			
			// Checks element height against current trigger
			if (pos.y < triggerHeight) {
				
				// Triggers animations
				$(this).removeClass('-animation-trigger').removeClass('split-fade-container').trigger("classChange");
			}
		});
		
	}
			
	//
	// Functions that will make the scroll animations happen
	// 	
	
	// Checks position of triggers and triggers them if needed
	function scrollAnimationCheck() {
		
		// Get current window position
		var scrollTop = $(window).scrollTop();
		
		// Checks to make some triggers exist
		if (scrollTriggers.length > 0) {
			
			// Set the height of the trigger that an element needs to be at to get triggered
			var triggerHeight = windowStartHeight + scrollTop - (windowStartHeight * .3);
			$(scrollTriggers).each(function() {
				
				// Return x/y position of trigger element
				var pos = getPosition(this);
				
				// Checks element height against current trigger
				if (pos.y < triggerHeight) {
					
					// Triggers animations
					$(this).removeClass('-animation-trigger').trigger("classChange");
				}
			});
			
		}
		
		trigger = false;
	}
	
	// Gets the position of any element even if that element is not on the base level
	function getPosition(element) {
		
			// Set up variables
	    var xPosition = 0,
	    		yPosition = 0;
			
			// Loops through parent elements until there is no parent element.
	    while(element) {
		    
		    	// Get offset of element relative to current parent then add it to running total
	        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
	        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
	        
	        // Once offsets have been grabbed and added set the element as the next parent element
	        element = element.offsetParent;
	    }
			
			// Return added up totals
	    return { x: xPosition, y: yPosition };
	}
	
	// Run trigger check on load
	scrollAnimationCheck();
	
	var scrolled = false;
	
	// When scroll happens change variable - more effecient thatn running animation check, allows for more motion with less lag
	window.onscroll = function() {
		scrolled = true;
	}
	
	// Set up interval to check on variable that is changed by scrolling
	setInterval( function() {
		if (scrolled) { 
			// If scolling has happened, triggers animation check and sets scrolling back to false
			scrollAnimationCheck();
			scrolled = false;
		}
	}, 50);
	
	
});

$(window).scroll(function(){
	$("#mobile-nav").removeClass("active");
	
	if($(window).width() <= 640){
		var currentScroll = $(document).scrollTop();
		if(currentScroll > 97){
			$("header").addClass("scrolling");
			if(currentScroll > previousScroll){
				$("header").removeClass("active");
			} else {
				$("header").addClass("active");
			}
		} else {
			$("header").removeClass("scrolling");
		}
		previousScroll = currentScroll;
	}
});