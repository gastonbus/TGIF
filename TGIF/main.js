//JavaScript String Functions

//Excercise 1
//Forma primitiva de resolverlo (para buscar la logica a utilizar dentro de la funcion):
/*var number = 123456;
var invertedNumber1, invertedNumber2, invertedNumber3, invertedNumber4, invertedNumber5;
console.log(number);

invertedNumber1 = number.toString();
console.log("toString: " + invertedNumber1);

invertedNumber2 = invertedNumber1.split("");
console.log("split: " + invertedNumber2);

invertedNumber3 = invertedNumber2.reverse();
console.log("reverse: " + invertedNumber3);

invertedNumber4 = invertedNumber3.join("");
console.log("join: " + invertedNumber4);

invertedNumber5 = parseInt(invertedNumber4);
console.log(invertedNumber5);
*/

//Resolucion con código limpio
function reverseNumber(number){
    let invertedNumber;
    invertedNumber = parseInt(number.toString().split("").reverse().join(""));
    
    return invertedNumber;
}

console.log("Ejercicio 1: " + reverseNumber(123456));


//-------------------------------------------------------------
//Excercise 2
function orderedString(string){
    let orderedString = string.split("").sort().join("");

    return orderedString;
}

console.log("Ejercicio 2: " + orderedString("patagonia"));


//-------------------------------------------------------------
//Excercise 3
function camelCase(string){
    let stringArray = string.split(" ");
    for (let i = 0; i < stringArray.length; i++) {
        stringArray[i] = stringArray[i].charAt(0).toUpperCase() + stringArray[i].slice(1);
    }

    return stringArray.join(" ");
}

console.log("Ejercicio 3: " + camelCase("me conto un pajarito que carlos juega muy bien a la pelota"));


//-------------------------------------------------------------
//Excercise 4
function findLongestWord(string){
    let stringArray = string.split(" ");
    let longestWord = stringArray[0];
    
    for (let i = 0; i < stringArray.length; i++) {
        if (stringArray[i].length > longestWord.length) {
            longestWord = stringArray[i];
        }
    }

    return longestWord;
}

console.log("Ejercicio 4: " + findLongestWord("Estoy practicando un ejercicio que es la natacion"));