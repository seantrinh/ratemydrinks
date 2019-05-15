//for adding comments dynamically to the post page



$(function() {
	$('#comment_form').on('submit', function(e) { //use on if jQuery 1.7+
        e.preventDefault();  //prevent form from submitting
	var content = $('#comment_form').serializeArray();
	$.ajax({
    		url:content[1].value+"/"+content[0].value,
    		type: 'put',
    		success: function(result) {
    			var content = $('#comment_form').serializeArray();
                var usr = $('#nav_userName').text().split(" ")[1]
        		$('.comments_unordered_list').append("<li>"+usr+": "+content[0].value+"</li>");
                $('#comment_form')[0].reset();
    		}
	});
    });	
});
