const program = require('commander');
const default_password_length = 14;
const min_password_length = 8;
const min_number_specials = 1;
const min_number_digits = 1;
const min_number_uppercases = 1;
const parameters = {
    password_length: parseInt(program.length) || default_password_length,
    uppercase: parseInt(program.uppercase) || min_number_uppercases,
    digits: parseInt(program.digits) || min_number_digits,
    special: parseInt(program.special) || min_number_specials
};
program
    .version('0.0.1')
    .option('-u, --uppercase <value>', 'number of uppercase characters')
    .option('-d, --digits <value>', 'number of digits')
    .option('-s, --special <value>', 'number of special characters')
    .option('-l, --password_length <value>', 'password length')
    .parse(process.argv);

const possible_combinations = {
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    special: [".",",", "/", "-&", "?", "$", "#", "@", "!", "*", "<>"],
    upper_case: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ],
    lower_case: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
};

const possible_characters = {
    numbers: 'numbers',
    special: 'special',
    upper_case: 'upper_case',
    lower_case: 'lower_case'
};

const random_character = (type_characters, number_characters) => {
    let result = [];
    for (let i = 0; i < number_characters; i++) {
        result.push(
            possible_combinations[type_characters][
                Math.floor(Math.random() * type_characters.length)
            ]
        );
    }
    return result;
};

const input_validation = ({ password_length,  special, uppercase, digits }) => {
    const sum_additional_params =  uppercase + special + digits;
    if (password_length < min_password_length) {
        return (`error : minimal password length is ${min_password_length} characters`);
    } else if (password_length < sum_additional_params) {
        return (` error : password length cannot be less than  ${sum_additional_params}`);
    }
};

const shuffle_combinations = function  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
   return a;
};

const PasswordGenerator = options => {
    try {
        input_validation(options);
        const lowercase =
            options.password_length -
            (options.digits + options.special + options.uppercase);

        const result = shuffle_combinations([
            ...random_character(possible_characters.numbers, options.digits),
            ...random_character(possible_characters.special, options.special),
            ...random_character(possible_characters.upper_case, options.uppercase),
            ...random_character(possible_characters.lower_case, lowercase)
        ]).join("");

        console.log(result);
    } catch (err) {
        console.error("error:", err.message);
    }
};

PasswordGenerator(parameters);
