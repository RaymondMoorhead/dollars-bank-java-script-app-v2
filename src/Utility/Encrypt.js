// this is a one-way encryption method, meant for passwords and
// similar data where all you need to know is if a new encrypted
// string compares exactly with the old one
function encrypt(toEncrypt, key) {
    return Jumble(stringToHash(toEncrypt), key);
}

// JUMBLER METHODS

// javascript doesn't come with a seed-able random number generator,
// so I had to search externally and found some suitable replacements

const RAND_VARIATION = 20;

function Jumble(str, key) {
    // set up rand
    var seed = xmur3([str, key].join(""));
    var rand = mulberry32(seed());

    // jumble string
    var result = [];
    for(var i = 0; i < str.length; ++i)
        // add to the existing character...
        result.push(String.fromCharCode((str.charCodeAt(i) +
            // ...multiplied by 1 or -1...
            (((Math.floor(rand() * 2) * 2) - 1) *
            // ...a random number between 0 and RAND_VARIATION
            Math.floor(rand() * RAND_VARIATION)))));
    
    return result.join("");
}

// externally provided, sources:
//                                  https://github.com/bryc/code/blob/master/jshash/PRNGs.md
//                                  https://github.com/aappleby/smhasher/wiki/MurmurHash3
function xmur3(str) {
    for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
    return function() {
        h = Math.imul(h ^ (h >>> 16), 2246822507);
        h = Math.imul(h ^ (h >>> 13), 3266489909);
        return (h ^= (h >>> 16)) >>> 0;
    }
}

// externally provided, original source: https://gist.github.com/tommyettinger/46a874533244883189143505d203312c
function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
}

// HASH METHODS

// Javascript doesn't do mixed types well, so these
// need to be the ascii value and not the represented
// character
const LOWEST_VAL_CHAR = 32;     // ' ';
const HIGHEST_VAL_CHAR = 126;   //'~';
const HASH_INDICES = [ '4', 's', 'n', 'V', '1', '3', 'O', '2', 'C', 'U', '|',
                    '?', 'R', '*', 'y', 'Z', 'P', '=', ' ', 'X', '>', 'c', 'e',
                    'F', 't', '7', 'S', '/', 'm', '"', '5', '9', 'G', 'f', '!',
                    'K', '%', 'l', '#', 'Y', 'E', 'W', '`', 'q', '$', 'd', 'H',
                    'b', 'i', 'v', '}', '.', 'Q', 'T', 'k', 'z', 'o', 'r', 'A',
                    'B', 'w', '+', ';', 'p', '\'', 'J', ']', 'M', 'g', '[', '0',
                    'L', ',', '{', '-', '^', '~', 'u', '8', '@', 'I', '(', ':',
                    '&', '6', 'x', ')', 'D', '\\', '<', 'h', '_', 'a', 'N', 'j' ];

function stringToHash(str) {
    var result = [];
    for(var i = 0; i < str.length; ++i)
        result.push(toHash(str.charCodeAt(i)));
    return result.join("");
}

function toHash(c) {
    if(c < LOWEST_VAL_CHAR)
        return String.fromCharCode(c + HIGHEST_VAL_CHAR);
    else if(c > HIGHEST_VAL_CHAR)
        return String.fromCharCode(c + HIGHEST_VAL_CHAR + LOWEST_VAL_CHAR);
    else
        return HASH_INDICES[c - LOWEST_VAL_CHAR];
}

// EXPORT
module.exports = encrypt;