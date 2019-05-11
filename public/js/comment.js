//for adding comments dynamically to the post page
const comments = require("../../data/comments");
function addComment() {
	//addComment(user, pid, content)
	const content = document.getElementById("content").value;
	let new_li = document.createElement("li");
	if (content) {
		let text_node = document.createTextNode(content);
		new_li.appendChild(text_node);
		new_li.setAttribute("class","comment");
	
		document.getElementById("comments").appendChild(new_li);
	} else {
		alert("Please add content to your comment!");
	}
}

$(function() {
	$('#comment_form').on('submit', function(e) { //use on if jQuery 1.7+
        e.preventDefault();  //prevent form from submitting
	var content = $('#comment_form').serialize();
	$.ajax({
    		url: 'comment/'+content,
    		type: 'PUT',
    		success: function(result) {
        		// Do something with the result
			this.addComment();
    		}
	});
    });	
});