const hardhead =function() {
    const INITIAL = 50n * 10n ** 8n;
    var block_height = 1n;
    var sum = 0n;
    var subsidy = INITIAL;

    while (subsidy > 0n) {
        var halvings = block_height/210000n;

        if (halvings >= 64n) {
            subsidy = 0n;
        } else {
            subsidy = INITIAL >> halvings;
        }

        sum += subsidy;
        block_height++;
    }
    return sum * 10n **18n;
};
 module.exports = {hardhead}
