const { client } = require('./sanityClient.js');

const clearData = async () => {
  try {
    // Znajdź dokument teamPage
    const existingDoc = await client.fetch('*[_type == "teamPage"][0]');

    if (existingDoc) {
      // Jeśli dokument istnieje, wyczyść tablice graczy
      await client
        .patch(existingDoc._id)
        .set({
          goalkeepers: [],
          defenders: [],
          forwards: [],
        })
        .commit();

      console.log('Successfully cleared team data');
    } else {
      console.log('No team page document found to clear');
    }
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

clearData();
