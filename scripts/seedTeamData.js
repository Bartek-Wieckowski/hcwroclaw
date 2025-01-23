const { client } = require('./sanityClient.js');
const { v4: uuidv4 } = require('uuid');

const goalkeepers = [
  {
    _key: uuidv4(),
    _type: 'player',
    firstName: 'John',
    lastName: 'Smith',
    number: 1,
    height: '185',
    weight: '85',
    stickHand: 'left',
    isCaptain: false,
    isAssistantCaptain: false,
  },
  {
    _key: uuidv4(),
    _type: 'player',
    firstName: 'Michael',
    lastName: 'Johnson',
    number: 30,
    height: '188',
    weight: '90',
    stickHand: 'right',
    isCaptain: false,
    isAssistantCaptain: false,
  },
];

const defenders = [
  {
    _key: uuidv4(),
    _type: 'player',
    firstName: 'David',
    lastName: 'Wilson',
    number: 4,
    height: '190',
    weight: '95',
    stickHand: 'left',
    isCaptain: true,
    isAssistantCaptain: false,
  },
  {
    _key: uuidv4(),
    _type: 'player',
    firstName: 'Robert',
    lastName: 'Brown',
    number: 5,
    height: '187',
    weight: '88',
    stickHand: 'right',
    isCaptain: false,
    isAssistantCaptain: true,
  },
  {
    _key: uuidv4(),
    _type: 'player',
    firstName: 'James',
    lastName: 'Davis',
    number: 6,
    height: '186',
    weight: '87',
    stickHand: 'left',
    isCaptain: false,
    isAssistantCaptain: false,
  },
];

const forwards = [
  {
    _key: uuidv4(),
    _type: 'player',
    firstName: 'William',
    lastName: 'Taylor',
    number: 10,
    height: '182',
    weight: '82',
    stickHand: 'right',
    isCaptain: false,
    isAssistantCaptain: false,
  },
  {
    _key: uuidv4(),
    _type: 'player',
    firstName: 'Thomas',
    lastName: 'Anderson',
    number: 11,
    height: '180',
    weight: '80',
    stickHand: 'left',
    isCaptain: false,
    isAssistantCaptain: true,
  },
  {
    _key: uuidv4(),
    _type: 'player',
    firstName: 'Richard',
    lastName: 'Martin',
    number: 14,
    height: '183',
    weight: '83',
    stickHand: 'right',
    isCaptain: false,
    isAssistantCaptain: false,
  },
];

const seedData = async () => {
  try {
    const existingDoc = await client.fetch('*[_type == "teamPage"][0]');

    const document = {
      _type: 'teamPage',
      seo: {
        title: {
          en: 'Team Page',
          pl: 'Strona Drużyny',
        },
        desc: {
          en: 'Meet our team of professional hockey players',
          pl: 'Poznaj naszą drużynę profesjonalnych hokeistów',
        },
      },
      goalkeepers,
      defenders,
      forwards,
    };

    if (existingDoc) {
      await client.patch(existingDoc._id).set(document).commit();
      console.log('Updated team page data');
    } else {
      await client.create(document);
      console.log('Created new team page with data');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();
