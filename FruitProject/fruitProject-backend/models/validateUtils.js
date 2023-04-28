const validator = require('validator');
const { InvalidInputError } = require('./InvalidInputError');

/**
 * Checks if the inputs are valid and throws an InvalidInputError if not.
 * name must not be empty
 * calories must not be 0 or below
 * vitamin must match the valid letter: A,B,C,D,E,K
 * details must not be empty
 * image must not be empty and format to .png or .jpg
 * @param {String} name 
 * @param {String} vitamin 
 * @param {Integer} calories 
 * @param {String} details 
 * @param {String} image 
 * @returns true if valid, throw an error otherwise
 */
function isValid2(name,vitamin,calories,details,image){
    if(!name || !validator.isAlpha(name)){
        throw new InvalidInputError("Invalid Input: Name is empty");
    }

    if(!details){
        throw new InvalidInputError("Invalid Input: No details provided");
    }

    let imageExtention = image.slice((image.lastIndexOf(".")) + 1);
    if(!image ||  (imageExtention != 'jpg' && imageExtention != 'png')){
        if(!image){
            throw new InvalidInputError("Invalid Input: No image provided");
        }
        throw new InvalidInputError("Invalid Input: image not correct format");
    }

    if(calories <= 0 || isNaN(calories)){
    
        if(calories < 0){
            throw new InvalidInputError("Invalid Input: calories is a negative number");
        }
        throw new InvalidInputError("Invalid Input: calories is not a number");
    }

    if(vitamin == "A" || vitamin == "B" || vitamin == "C" ||
    vitamin == "D" || vitamin == "E" || vitamin == "K"){
        return true;
    }

    throw new InvalidInputError("Invalid Input: Incorrect vitamin type");
}

module.exports = {isValid2};

