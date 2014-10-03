var Quote = function(text, author, rating, totalValue, raters) {
	this.text = text;
	this.author = author || "unknown";
	this.rating = rating || 0;
	this.totalValue = totalValue || 0;
	this.raters = raters || 0;
}


Quote.prototype.render = function() {
	if(this.element) return this.element;
	var rating = $('#temp').clone();
	rating.attr('id', '');
	var that = this;
	this.element = $("<div>");
	this.element
		.addClass("quote-container")
		.append("<i class='fa fa-times-circle delete-btn'></i>")
		.append("<div class='quote-text'>" + this.text 
		+ "</div><div class='quote-author'> ~ " + this.author 
		+ "</div>")
		.append(rating);


	this.element.on('click', '.delete-btn', function() {
		var index = database.indexOf(that);
		var removed = database.splice(index,1)[0];
		deleted.push(removed);
		// that.element.data("order", deleted.indexOf(removed)).css("display", "none");
		that.element.css("display", "none");
	})

	$(".delete-btn").hover(function() {
			$(this).css("color", "#8c2121");
		}, function() {
			$(this).css("color", "black");
		}
	);	


	rating.find(".star").on('click', function() {
		var starValue = parseInt($(this).attr('id'));
		if (that.raters === 0) {
			that.rating = starValue;
			that.totalValue = starValue;
			that.raters = 1;
		}
		else {
			that.raters++;
			that.totalValue = that.totalValue + starValue;
			that.rating = parseFloat(that.totalValue / that.raters);
		}
		var average = $(this).closest(".ratings").find(".average");
		average.removeClass("no-rating");
		var roundedAvg = Math.round((that.rating * 10)/10);
		if(that.raters === 1) {
			average.text(roundedAvg + " stars / " + that.raters + " rating");
		}
		else {
			average.text(roundedAvg + " stars / " + that.raters + " ratings");
		}

		// These lines make it so the person can only vote once 
		$(this).closest(".ratings").css("margin-left", "+=20");
		$(this).closest(".ratings").find("ul").empty().append("<div class='did-rate'>Thanks!</div>");
		

	})

}

var addItem = function(text, author) {
	var item = new Quote(text, author);
	item.render();
	database.push(item);
	$(".current-quotes").append(item.element);
}


/*var render = function(quote) {
	var rating = $('#temp').clone()
	console.log(rating);
	rating.attr('id', '');
	console.log(rating);
	var place = $("<div class='quote-container'><div class='quote-text'>" + quote.text 
		+ "</div><div class='quote-author'> ~ " + quote.author 
		+ "</div>")
	$(".current-quotes").append(place)
	place.append(rating);
}*/

var colorChange = function(item, color) {
	item.css("background-color", color);
};


var deleted = [];
var database = [];
addItem("Fiction is the truth inside the lie.", "Stephen King");
addItem("The best and most beautiful things in the world cannot be seen or even touched-they must be felt with the heart.", "Helen Keller");
addItem("We know what we are, but know not what we may be.", "William Shakespeare");
addItem("I never wanted to be famous. I only wanted to be great.", "Ray Charles");
addItem("Do not take life too seriously. You will never get out of it alive.", "Elbert Hubbard");
addItem("People who think they know everything are great annoyances to those of us who do.", "Issac Asimov");
addItem("Procrastination is the art of keeping up with yesterday.", "Don Marquis");
addItem("Get your facts first, then you can distort them as they please.", "Mark Twain");
addItem("Always remember you are absolutely unique. Just like everyone else.", "Margaret Mead");

$(document).on('ready', function() {

  
	$(".add-quote").on('click', 'button',function() {
		$(this).closest('.container').find('.grayout').fadeToggle();
		// $(this).closest('.container').find('.quote-input').slideToggle();
	})

	$(".quote-input").submit(function(e) {
		e.preventDefault();

		var text = $(this).closest('.quote-input').find('#text').val();
		var author = $(this).closest('.quote-input').find('#author').val();
		
		// if there is content in the text fields add the quote to database
		if (text != "" && author != "") {
			$(this).closest('.grayout').fadeToggle();

			console.log(database);

			addItem(text, author)


		// clears form before it is reopened
			$(this).closest('.quote-input').find('#text').val("");
			$(this).closest('.quote-input').find('#author').val("");
		
		}
	})

	// rating star color change on mouseover & all those below
	$(".star").on('mouseover', function() {
		var list = $(this).closest("ul");
		var place = $(this);
		for (var i = $(this).index(); i >= 0; i--) {
			
			place.find("i").css('color', 'cadetblue');
			place.find(".fa").removeClass("fa-star-o").addClass("fa-star");
			place = place.prev();
		}
	})

	$(".star").on('mouseleave', function() {
		$(".star").find(".fa").css('color', 'black');
		$(".star").find(".fa").removeClass("fa-star").addClass("fa-star-o")
	})


	// enlarge x icon on hover
	$(".x-btn").hover(function() {
			$(this).css("color", "#8c2121");
		}, function() {
			$(this).css("color", "black");
		}
	);	

	$(".undo-btn").hover(function() {
			$(this).css("color", "cadetblue");
		}, function() {
			$(this).css("color", "#a37a47");
		}
	);	

	$(".undo-btn").on("click", function() {
		if(deleted.length !== 0) {
			var undo = deleted.pop();
			undo.element.css("display", "inline-block");
			database.push(undo);
		}
	})



	$(".add-quote").on('mouseover', 'button', function(){
		colorChange($(this), "cadetblue");
	});
	$(".add-quote").on('mouseleave', 'button', function(){
		colorChange($(this), "aliceblue")
	});

	$(".quote-input").on('mouseover', '.submit', function(){
		colorChange($(this), "aliceblue");
	});
	$(".quote-input").on('mouseleave', '.submit', function(){
		colorChange($(this), "white")
	});

	// makes x icon work like cancel button
	$("i").on('click', function(e) {
		e.preventDefault();
		$(this).closest('.grayout').fadeToggle();
		$(this).closest('.quote-input').find('#text').val("");
		$(this).closest('.quote-input').find('#author').val("");
	})


});