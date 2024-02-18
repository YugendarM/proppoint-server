const fs = require('fs')

const data = [
    {
      "name": "Alice Williams",
      "age": 52,
      "infant": false,      
      "gender": "Female",
      "diabetes": false,
      "hypertension": true,
      "pregnancy": false,
      "surgery": "Gallbladder Removal"
    },
    {
      "name": "Charlie Brown",
      "age": 31,
      "infant": false,  
      "gender": "Male",
      "diabetes": true,
      "hypertension": false,
      "pregnancy": false,
      "surgery": "Hip Replacement"
    },
    {
      "name": "David Miller",
      "age": 28,
      "infant": false,  
      "gender": "Male",
      "diabetes": false,
      "hypertension": false,
      "pregnancy": false,
      "surgery": false
    },
    {
      "name": "Emily Davis",
      "age": 42,
      "infant": false,  
      "gender": "Female",
      "diabetes": true,
      "hypertension": true,
      "pregnancy": true,
      "surgery": true
    },
    {
      "name": "Grace Wilson",
      "age": 37,
      "infant": false,  
      "gender": "Female",
      "diabetes": false,
      "hypertension": true,
      "pregnancy": false,
      "surgery": true
    },
    {
      "name": "Jane Smith",
      "age": 60,
      "infant": false,  
      "gender": "Female",
      "diabetes": true,
      "hypertension": false,
      "pregnancy": true,
      "surgery": false
    },
    {
      "name": "John Doe",
      "age": 45,
      "infant": false,  
      "gender": "Male",
      "diabetes": false,
      "hypertension": true,
      "pregnancy": false,
      "surgery": false
    },
    {
      "name": "Olivia Hall",
      "age": 0,
      "infant": true,  
      "gender": "Female",
      "diabetes": false,
      "hypertension": false,
      "pregnancy": false,
      "surgery": false
    },
    {
      "name": "Peter Robinson",
      "age": 58,
      "infant": false,  
      "gender": "Male",
      "diabetes": true,
      "hypertension": false,
      "pregnancy": false,
      "surgery": true
    },
    {
      "name": "Bob Johnson",
      "age": 40,
      "infant": false,  
      "gender": "Male",
      "diabetes": false,
      "hypertension": true,
      "pregnancy": false,
      "surgery": true
    }
]

const jsonData = JSON.stringify(data, null, 2)

fs.writeFile('patient.json', jsonData, (err) => {
    if (err) {
        console.error('Error writing JSON file:', err);
    } else {
        console.log('JSON file saved!');
    }
});
  