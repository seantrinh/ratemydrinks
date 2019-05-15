//for adding comments dynamically to the post page



$(function() {
	$('#comment_form').on('submit', function(e) { //use on if jQuery 1.7+
        e.preventDefault();  //prevent form from submitting
	var content = $('#comment_form').serializeArray();
	$.ajax({
    		url:content[1].value+"/"+content[0].value,
    		type: 'put',
    		success: function(result) {
                console.log(result);
    			var content = $('#comment_form').serializeArray();
                var usr = $('#nav_userName').text().split(" ")[1]
        		$('.comments_unordered_list').append("<li id = \"id_"+result.comment_id+"\">"+usr+": "+content[0].value+"<button type = \"button\" onClick = \"delete_comment('"+result.comment_id+"')\">Delete</button></li>");
                $('#comment_form')[0].reset();
    		}
	});
    });	
});

function delete_comment(comment_id){
    $.ajax({
            url:"comment/"+comment_id,
            type: 'delete',
            success: function(result) {
                $("#id_"+result.comment_id).remove();
                
            }
    });
     

}