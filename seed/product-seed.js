var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/shop-store', {
  useMongoClient: true
});

var products = [
  new Product({
    title: '1953 Chevrolet Corvette',
    description: "The Chevrolet Corvette (C1) is the first generation of the Corvette sports car produced by Chevrolet. It was introduced late in the 1953 model year, and produced through 1962. It is commonly referred to as the solid-axle generation, as the independent rear suspension did not appear until the 1963 Sting Ray. The Corvette was rushed into production for its debut model year to capitalize on the enthusiastic public reaction to the concept vehicle, but expectations for the new model were largely unfulfilled.[2] Reviews were mixed and sales fell far short of expectations through the car's early years. The program was nearly canceled, but Chevrolet would ultimately stay the course.",
    imagePath: 'http://cdn.barrett-jackson.com/staging/carlist/items/Fullsize/Cars/160966/160966_Front_3-4_Web.jpg',
    price: 50000
  }),
  new Product({
    title: 'Jaguar XKSS',
    description: "The Jaguar XKSS is a road-going version of the Jaguar D-Type racing car, initially built 1957 and re-launched in a very small series in 2016.[2] Following Jaguar's withdrawal from competition at the end of the 1956 season, a number of completed and partly completed D-types remained unsold at the Browns Lane factory. In an attempt to recoup some of the investment made in building these unused chassis, and to exploit the lucrative American market for high-performance European sports cars, Sir William Lyons decided to convert a number to road-going specification. Only minor changes were made to the basic D-type structure: the addition of a passenger side door; the removal of the large fin behind the driver; and the removal of the divider between passenger and driver seats. In addition, changes were made for cosmetic, comfort and legal reasons: a full-width, chrome-surrounded windscreen was added; sidescreens were added to both driver and passenger doors; a rudimentary, folding, fabric roof was added for weather protection; chromed bumpers were added front and rear (a styling cue later used on the E-type); XK140 rear light clusters were mounted higher on the wings; and thin chrome strips were added to the edges of the front light fairings.",
    imagePath: 'https://i.pinimg.com/564x/74/98/a7/7498a727ccfb0f2cf53033ee3262c1a0.jpg',
    price: 72000
  }),
  new Product({
    title: '1954 Maserati A6GCS Berlinetta',
    description: "Maserati A6 were a series of grand tourers, racing sports cars and single seaters made by Maserati of Italy between 1947 and 1956. They were titled for Alfieri Maserati (one of the Maserati brothers, founders of Maserati) and for their straight-six engine.[1] The 1.5-litre straight-six was titled A6 TR (Testa Riportata for its detachable cylinder head[2]), and was based on the pre-war Maserati 6CM; 65 bhp (48 kW). It first appeared in the A6 Sport or Tipo 6CS/46, a barchetta prototype, developed by Ernesto Maserati and Alberto Massimino. This became the A6 1500 Pininfarina-designed two-door berlinetta, first shown at the 1947 Salon International de l'Auto in Geneva (59 made) and the spider shown at the 1948 Salone dell'automobile di Torino (2 made). A 2-litre straight-six (120 bhp) was used in the A6 GCS two-seater, «G» denoting Ghisa, cast iron block, and «CS» denoting Corsa & Sports. Also called monofaro, the 580 kg single-seater and cycle-winged racing version first appeared at Modena 1947 by Luigi Villoresi and Alberto Ascari, and won the 1948 Italian Championship by Giovanni Bracco. Fifteen cars were made 1947-1953, of these being two-seaters (630 kg). The A6G were a series of two-door coupe and spyders by Zagato, Pininfarina, Pietro Frua, Ghia, Bertone, Carrozzeria Allemano and Vignale. These had alloy engine blocks.",
    imagePath: 'https://i.pinimg.com/564x/02/17/90/021790216a7eb6e395abe07e46a76ac8.jpg',
    price: 320000
  }),
  new Product({
    title: 'Aston Martin DB2 Bertone Spyder',
    description: "In 1954, the American industrialist, Stanley Harold Wacky Arnolt commissioned the Italian coachbuilder, Bertone, to produce a stunning Spider based on the Aston Martin DB2/4 chassis. In total, eight rolling chassis were supplied to Bertone, Two became drophead coupes, one or two were fixed-head coupes and four (or five) were spiders. This particular car, chassis number 505 was the work of Franco Scaglione. For eight years, Scaglione was chief designer at Bertone and was responsible for both the Arnolt MG and Bristols, plus the Alfa Guilietta Sprint and 1954 BAT 5 Show Car.",
    imagePath: 'https://i.pinimg.com/564x/f9/81/b4/f981b4626eed7d78409a54047b32fe9a.jpg',
    price: 120000
  }),
  new Product({
    title: 'Factory Five 33',
    description: "The Factory Five '33 Hot Rod started from the idea of using our product template on the Hot Rod. The idea was to stay as traditional as possible, but make performance and drivability the focus and package all the parts together to reduce the number of places a guy has to go.",
    imagePath: 'https://i.pinimg.com/564x/50/c4/47/50c447cf25ad1db035105d364434a600.jpg',
    price: 32555
  }),
  new Product({
    title: '1970 Mercedes-Benz 280SL',
    description: "All models were equipped with an inline-six cylinder engine with multi-port fuel injection. The bonnet, trunk lid, door skins and tonneau cover were made of aluminum to reduce weight. The comparatively short and wide chassis, combined with an excellent suspension, powerful brakes and radial tires gave the W 113 superb handling for its time. The styling of the front, with its characteristic upright Bosch fishbowl headlights and simple chrome grille, dominated by the large three-pointed star in the nose panel, paid homage to the then already legendary 300 SL roadster.",
    imagePath: 'https://i.pinimg.com/564x/43/01/00/430100cd0fe89f6b6b0ed3272d5ebd0d.jpg',
    price: 75000
  }),
  new Product({
    title: '1965 Ford Mustang Convertible',
    description: "Find new and used 1965 Ford Mustang Classics for sale by classic car dealers and private sellers near you",
    imagePath: 'https://i.pinimg.com/564x/bb/9a/9c/bb9a9cc8e5f6e9f75dfdf1192e787e8d.jpg',
    price: 111000
  }),
  new Product({
    title: 'opel manta gte',
    description: "opel manta gte",
    imagePath: 'https://i.pinimg.com/564x/aa/93/66/aa9366e9502ae286b47fa978466e4243.jpg',
    price: 50000
  })
];

var done = 0;

products.forEach(function(product) {
  product.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('meow');
    }
    done++;
    if (done === products.length) {
      
      mongoose.disconnect();
    }
  });
});
