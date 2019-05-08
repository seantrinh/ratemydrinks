//beverage modules
modules.export = {
	async createBeverage(type, subtype, tastes, rating, name, company) {
		//check cookie, if user
		// rating - float, initialize to 0
		// make name unique
		// initialize count of number of ratings to 0
	},
	async updateRating(name, newRating) {
		//update rating and increment count
	},
	async search(list_of_params) {
                //given a list of search params such as
                //      min_num_stars
                //      type of drink
                //      name of drink
                //      etc.
                //find a list of length x of drinks that
                //match those search results
                // return beverage name
        }  
}
