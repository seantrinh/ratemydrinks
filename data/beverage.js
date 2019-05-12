/* Beverage module */
const beverageData = require('./collections').beverage;
const ObjectId = require('mongodb').ObjectID;

/**
 * Beverage Structure:
 * {
 * 
 *  type: string,
 *  subtype: string,
 *  tastes: Array,
 *  name: string,
 *  company: string,
 *  rating: float,
 *  ratingCount: int
 *  
 * }
 * 
 */

/**
 * Return a beverage object given a beverage id.
 * 
 * @param beverageId (string or ObjectId): the ID of the requested beverage
 * 
 * @throws if beverageId is not provided, or if no beverage exists with the provided ID. 
 * 
 * @return the Beverage object corresponding to the given ID.
 */
const getBeverageById = async (beverageId) => {
  if (!beverageId) {
    throw "Beverages: Must provide a Beverage ID.";
  } 
  if (typeof beverageId === 'string') {
    beverageId = ObjectId(beverageId);
  }
  const beverages = await beverageData();
  const result = await beverages.findOne({_id: beverageId});
  if (!result) {
    throw `Beverages: No beverage with ID ${beverageId}.`
  }
  return result;
}

/**
 * Return a beverage object given a beverage name.
 * 
 * @param beverageName (string): the ID of the requested beverage
 * 
 * @throws if beverageName is not provided, or if no beverage exists with the provided name. 
 * 
 * @return the Beverage object corresponding to the given name.
 */
const getBeverageByName = async (beverageName) => {
  if (!beverageName) {
    throw "Beverages: Must provide a Beverage name.";
  } 

  const beverages = await beverageData();
  const result = await beverages.findOne({name: beverageName});

  if (!result) {
    throw `Beverages: No beverage with name ${beverageName}.`
  }

  return result;
}



/**
 * Create a new Beverage with the given type, subtype, tastes, name, and company.
 * rating is set to 0.0 automatically, and ratingCount is set to 0.
 * 
 * @param type (string): The beverage type.
 * @param subtype (string): The beverage subtype.
 * @param tastes (string list): An array of beverage tastes (strings).
 * @param name (string): The name of the beverage -- must be unique to all existing beverages.
 * @param company (string): The name of the company that produces the beverage.
 * 
 * @throws if there is some MongoDB error in inserting to the beverage DB
 * 
 * @return The ID of the inserted beverage if the insertion is successful, otherwise null.
 */
const createBeverage = async (type, subtype, tastes, name, company) => {
  if (!type || !subtype || !tastes || !name || !company) {
    throw "Beverages: Must provide 5 valid arguments: type, subtype, tastes, name, company";
  }

  if (typeof type !== 'string' || typeof subtype !== 'string' || !Array.isArray(tastes) || typeof name !== 'string' || typeof company !== 'string') {
      throw "Beverages: Types must follow structure: {type, subtype, name, company} : string; {tastes} : string list";
  }

  const beverages = await beverageData();
  const exisitngBeverage = await beverages.findOne({name: name});

  if (exisitngBeverage !== null) {
    // Beverage with given name already exists.
    return null;
  }

  // Beverage does not already exist.
  const newBeverage = {
    type: type,
    subtype: subtype,
    tastes: tastes,
    name: name,
    company: company,
    rating: 0.0,
    ratingCount: 0
  };

  const insertInfo = await beverages.insertOne(newBeverage);
  if (insertInfo === 0) {
    throw "Beverages: Beverage could not be inserted.";
  }
  return insertInfo.insertedId;
}


/**
 * Finds all beverages that correspond to search parameters. (Matches >= for ratings).
 * 
 * @param searchJSON (JSON): the search JSON passed from the user's query
 * 
 * @throws if searchJSON is not passed, or if it is not an object
 * 
 * @return The Array of all matched beverages
 */
const search = async (searchJSON) => {
  if (!searchJSON) {
    throw "Beverages: A valid searchJson must be provided.";
  }

  if (typeof searchJSON !== 'object') {
    throw "Beverages: searchJSON must be an object";
  }
  console.log('before')
  console.log(searchJSON);

  // Remove all undefined fields.
  Object.keys(searchJSON).forEach(key => 
    (searchJSON[key] === undefined 
      || searchJSON[key] === ''
      || JSON.stringify(searchJSON[key]) === '[]'
      || JSON.stringify(searchJSON[key]) === '[""]'
      || searchJSON[key] === NaN)
    && delete searchJSON[key]);

  if (searchJSON.tastes) {
    searchJSON.tastes = { $in: searchJSON.tastes };
  }

  // Setup greater than filter if rating is set
  if (searchJSON.rating) {
    searchJSON.rating =  { $gte: searchJSON.rating };
  }
  else {
    searchJSON.rating =  { $gte: 0 };
  }
  console.log('after')
  console.log(searchJSON);

  const beverages = await beverageData();
  const matchCursor = await beverages.find(searchJSON, true);

  return matchCursor.toArray();
}

/**
 * Updates the rating of the beverage with the given name.
 * 
 * @param name (string): The name of the beverage
 * @param rating (number): The rating the user gave this beverage
 * 
 * @throws If name or rating are undefined or have invalid types.
 * 
 * @return The new rating if the beverage exists, -1 otherwise.
 */
const updateBeverageRating = async (name, rating) => {
  if (!name || !rating) {
    throw "Beverages: Must provide a beverage name and a rating.";
  }

  if (typeof name != 'string' || typeof rating != 'number') {
    throw "Beverages: Name must be of type string, rating of type number.";
  }

  try {

    let beverage = await getBeverageByName(name);
    const newCount = (rating > 0) ? beverage.ratingCount + 1 : beverage.ratingCount - 1;
    const newRating = ((beverage.rating * beverage.ratingCount) + rating) / newCount;

    const beverages = await beverageData();
    
    const updatedInfo = await beverages.updateOne(
      {name: name}, 
      {
        $set: {
          ratingCount: newCount,
          rating: newRating
        }
      }
    );

    if (updatedInfo.nModified === 0) {
      throw `Beverages: Drink with name ${name} did not have its rating updated.`;
    }
    return newRating;

  } catch(e) {
    console.log(e);
    return -1;
  }

}

const getAllBeverages = async () => {
  const beverages = await beverageData();
  let ret = beverages.find({}).toArray();
  return ret;  
}

module.exports = {
  createBeverage,
  getBeverageById,
  getBeverageByName,
  updateBeverageRating,
  search,
  getAllBeverages
};
