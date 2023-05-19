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

/**
 * Checks if the inputs are valid and throws an InvalidInputError if not.
 * password must be must at least contain a special character
 * role must either be admin or user
 * @param {String} password 
 * @param {String} role 
 * @returns true if valid, throw an error otherwise
 */
function isValidUser(password, role){
    roles = ['admin', 'user']
    format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if(roles.includes(role)){
        if(format.test(password)){
            return true
            
        }
        else{
            throw new InvalidInputError("Error: Invalid password. Must contain a symbol")
        }
    }
    else{
        throw new InvalidInputError("Error: Invalid role. Must be admin or user")
    }
}

/**
 * Checks if the inputs are valid and throws an InvalidInputError if not.
 * number must not be empty
 * content must not be empty
 * rating must be number bewteen 1 to 5
 * @param {String} title 
 * @param {String} content 
 * @param {String} rating 
 * @returns true if valid, throw an error otherwise
 */
function isValidReview(title, content, rating){
    if(validator.isAscii(title)){
        if(validator.isAscii(content)){
            if(0 <= rating && rating <= 5){
                return true;
            }
            else{
                throw new InvalidInputError("Error: Invalid rating: " + rating);
            }
            
        }
        else{
            throw new InvalidInputError("Error: Invalid content: " + content);
        }
        
    }
    else{
        throw new InvalidInputError("Error: Invalid title: " + title);
    }
    
}
module.exports = {isValid2, isValidUser, isValidReview};

