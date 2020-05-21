const encoder= new TextEncoder()
const greetText=encoder.encode('Hello World');


await Deno.writeFile('greet.txt',greetText);
