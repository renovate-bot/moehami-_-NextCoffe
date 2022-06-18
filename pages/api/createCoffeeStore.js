var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_API_BASE
);

const table = base('coffee-stores');

console.log(table);
const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const findCoffeeStoreRecord = await table.select({
        filterByFormula: `id="1"`,
      }).firstPage();

      if (findCoffeeStoreRecord.length !== 0) {
        const records = findCoffeeStoreRecord.map((record) => {
          return {
            ...record.fields,
          };
        });
        res.json(records);
      } else {
        const createRecords = await table.create([
          {
            fields: {
              id: '1',
              name: 'my',
              address: 'my addres',
              neighbourhood: 'our',
              voting: 200,
              imgUrl: 'http://ggg.com',
            },
          },
        ]);
        res.json({ message: 'create a record', records: createRecords });
      }
    } catch (err) {
      console.error('error finding store');
      console.error(err);
      res.status(500);
      res.json({ message: 'error finding store', err });
    }
  }
};
export default createCoffeeStore;
