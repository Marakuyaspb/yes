   const path = require('path');

   module.exports = {
     
     module: {
       rules: [
         {
           test: /.js$/, 
           exclude: /node_modules/,
           use: [
             {
               loader: path.resolve(__dirname, 'loaders/stripShebangLoader.js'), // Adjust path based on your structure
             },
             'babel-loader',
           ],
         },
       ],
     },
    
    
   };
   
