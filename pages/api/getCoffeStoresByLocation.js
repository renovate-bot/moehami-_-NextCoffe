import { fetchCoffeeStores } from "../../lib/coffee-stores";

const  getCoffeStoresByLocation = async(req, res)=>{

try {
  const {latLong, limit}=req.query
  const response =  await fetchCoffeeStores(latLong, limit);
  res.status(200)
  res.json(response)
} catch(error) {
  console.error('errrrrrrr')
  res.status(500)
  res.json({message: 'wrong shode',error})
}

}

export default getCoffeStoresByLocation