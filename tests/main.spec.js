const unemployCase = require('../tests/UnemployCase.spec');
const createCase = require('../tests/CreateCase.spec');
(async () => {
    //create case first
    await createCase();

    //then verify case
    await unemployCase();
})