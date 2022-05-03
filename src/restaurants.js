import connectDb from "./connectDb.js";

export const addRestaurant = async (req, res) => { //taking a request and sending back the response
    // check if the request is valid
    if(req.body || !req.body.name || !req.body.address) {
        res.status(401).send("Invalid request")
        return
    }
    // going to need to connect to firestore
    const db =  connectDb()
    //prepare the data
    const newRestaurant = {
        name: req.body.name,
        address: req.body.address,
        rating: req.body.rating || 3,
        cusisine: req.body.cusisine || "American",
    }
     //add data to the restaurant collection
    try {
    const doc = await db.collection('restaurants').add(newRestaurant)
    // respond with success
    res.status(201).send("REstaurant created " + doc.id)
    } catch {
    //respond with error 
    res.status(500).send(err)
    }
}

//b.collection('restaurants').add(newRestaurant)
// .then(doc => res.status(201).send("Restaurant Created " + doc.id))
// .catch(err => res.status(500).send(err))

export const getAllRestaurants = async(req, res) => {
    const db = connectDb()
    try {
    const snapshot = await db.collection("restaurants").get()
    const restaurantsArray = snapshot.docs.map(doc => {
        let restaurant = doc.data
        restaurant.id = doc.id
        return restaurant
    })
    res.send(restaurantsArray)
    } catch (err) {
    res.status(500).send(err)
    }
}


