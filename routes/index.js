
const index = app=>{
	function logging (req,res,next){
		let usr = null;
		if(req.session.user){
			usr = "(Authenticated User)";
		}else{
			usr = "(Non-Authenticated User)";
		}
		
		console.log("["+(new Date().toUTCString())+"] "+ req.method+" "+req.originalUrl+" "+usr);
		next();
	}
	app.use(logging);
	app.get("*",(req,res)=>{
		res.status(404).send("Page not Found");;
	});
}


module.exports = index;