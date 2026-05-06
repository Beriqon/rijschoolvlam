export type Review = {
  id: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  author: string;
  /** Bijvoorbeeld wijk of context; optioneel */
  context?: string;
};

export const REVIEWS: Review[] = [
  {
    id: "lucca-de-jong",
    rating: 5,
    text:
      "Fijne lessen, Levent kan alles rustig uitleggen en is prettig om naast je te hebben zitten tijdens het rijden!",
    author: "Lucca de Jong",
  },
  {
    id: "meike-aarnoutse",
    rating: 5,
    text:
      "Ongekend, de rijlessen met Levent!\nLos van dat dit rijmt is het ook waar. Tijdens de rijlessen van 1,5 uur leert hij je niet alleen hoe je een auto laat rijden en stoppen, maar ook hoe je je goed en veilig begeeft in het Utrechtse verkeer, of dat nou is op de hectische Straatweg, in Wittevrouwen tussen de bakfietsen of op het industrieterrein bij het CBR.\nDaarnaast vertelt hij je ook ook tips en tricks voor het praktijkexamen.",
    author: "Meike Aarnoutse",
  },
  {
    id: "femke-wesselingh",
    rating: 5,
    text:
      "Levent is een hele fijne instructeur! Het is altijd gezellig en hij zorgt dat je je heel vertrouwd voelt in de auto!",
    author: "Femke Wesselingh",
  },
  {
    id: "josine-van-staalduinen",
    rating: 5,
    text:
      "Heel fijne rijschool! Vriendelijke docent, ontspannen lessen en je leert veel in één les. Altijd persoonlijke tips en extra aandacht voor de dingen die je nog moeilijk vindt. Veel leerlingen dus soms wat langer wachten op vrije lesdata.",
    author: "Josine van Staalduinen",
  },
  {
    id: "ruben-van-zwol",
    rating: 5,
    text:
      "Ik kan Rijschool Vlam alleen maar aanraden. De lesstijl is aangenaam en je voelt je al snel op je gemak. De instructeur let ook goed op en geeft elke les goede feedback.",
    author: "Ruben van Zwol",
  },
  {
    id: "cato-damen",
    rating: 5,
    text:
      "Ontzettend fijne rijlessen gehad bij Levent! Hij is geduldig en duidelijk. Daarnaast is altijd op tijd geweest en altijd gezellig :)\nZeker een aanrader om hier te lessen!",
    author: "Cato Damen",
  },
  {
    id: "lisa-alberts",
    rating: 5,
    text:
      "Heel fijne rijschool! Levent is super aardig en geduldig en hij blijft rustig, ook als je fouten maakt. Je kunt ook gezellig met hem kletsen, waardoor je je snel op je gemakt voelt. Je mag snel alles zelf doen en Levent bereidt je goed voor",
    author: "Lisa ALberts",
  },
  {
    id: "mattea-duursma",
    rating: 5,
    text:
      "Rijschool vlam is een hele fijne rijschool. Levent is duidelijk en rustig. Ik heb heel veel geleerd, en veel meer vertrouwen gekregen in het rijden.",
    author: "Mattea Duursma",
  },
  {
    id: "lobke-besselink",
    rating: 5,
    text:
      "fijne lessen! levent is rustig en duidelijk in z'n communicatie, wat bijdraagt aan een veilig gevoel in de auto. hij denkt mee en er is veel mogelijk!",
    author: "Lobke Besselink",
  },
  {
    id: "rosalie-ten-boske",
    rating: 5,
    text:
      "Met veel plezier heb ik les bij rijschool vlam. Levent is een hele lieve geduldige kerel die alles rustig uitlegt en je van goede tips voorziet voor je examen. Ik ga straks met veel vertrouwen mijn examen rijden!",
    author: "Rosalie Ten Boske",
  },
  {
    id: "margot-beelen",
    rating: 5,
    text:
      "Ik beveel Rijschool Vlam van harte aan! Levent is gezellig, vriendelijk en rustig. Met lessen van 1,5 uur krijg je echt de tijd om te oefenen en meters te maken.",
    author: "Margot Beelen",
  },
  {
    id: "sander-groot",
    rating: 5,
    text:
      "Levent is een fijne, rustige en begripvolle instructeur waar ik me vanaf de proefles op m'n gemak bij voelde. Ik kijk er iedere keer naar uit om weer achter het stuur te stappen! Na elke les legt hij uit wat er goed ging en waar verbeterpunten liggen, en vertelt hij waar we de volgende les op gaan focussen. Ik raad Rijschool Vlam dus zeker aan!",
    author: "Sander Groot",
  },
  {
    id: "fay-rouffaer",
    rating: 5,
    text:
      "Rijschool Vlam is zeker een aanrader. De lessen zijn heel leerzaam, Levent geeft goede en duidelijke tips en hij is daarnaast ook erg aardig.",
    author: "Fay Rouffaer",
  },
  {
    id: "carlijn-visser",
    rating: 5,
    text:
      "Goede rijschool!! Levent is een ervaren en duidelijke instructeur waarbij je veel leert en je goed voorbereidt op het examen. Zeker een aanrader.",
    author: "Carlijn Visser",
  },
  {
    id: "sawan-frowijn",
    rating: 5,
    text:
      "Bij Rijschool Vlam voelde ik bij de eerste rit mij op mijn gemak en kon ik volledig mezelf zijn. Sinds een aantal lessen zie ik vooruitgang erin komen. Raad deze rijschool zeker voor iedereen aan.",
    author: "Sawan Frowijn",
  },
  {
    id: "thom-bulder",
    rating: 5,
    text:
      "Ik heb altijd fijne rijlessen met Levent. Het is altijd gezellig in de auto en ik leer veel. Het is vooral fijn hoe snel je zelfstandig alle handelingen leert!",
    author: "Thom Bulder",
  },
  {
    id: "suus-eymael",
    rating: 5,
    text:
      "Goede rijles! Je wordt snel veel vaardigheden aangeleerd en leert lekker vlug rijden op de automatische piloot! Ik kan het zeker aanbevelen! En ook gewoon een erg aardige vent!!",
    author: "Suus Eymael",
  },
  {
    id: "annika-dh",
    rating: 5,
    text:
      "Een hele fijne auto en een instructeur die alles weet over het rijden en hoe je je examen haalt, ondertussen behoud hij een prettige (en gezellige) leersfeer.",
    author: "Annika Dh",
  },
  {
    id: "anne-heger",
    rating: 5,
    text:
      "Hele fijne rijlessen. Levent weet veel en is scherp in het verkeer; ik voel me veilig bij hem in de auto. Daarnaast is er altijd ruimte voor gezellig kletsen en grapjes maken samen.",
    author: "Anne Heger",
  },
  {
    id: "lizzy-van-der-hofstad",
    rating: 5,
    text:
      "Aanrader als je een rijschool in Utrecht zoekt. De lessen met Levent zijn super leerzaam en ik heb eindelijk goed leren autorijden!",
    author: "Lizzy van der Hofstad",
  },
  {
    id: "sophie-van-baren",
    rating: 5,
    text:
      "Ik heb al bij meerdere rijscholen gereden, maar bij Levent voel ik me echt op me gemak! Dit maakt dat ik het rijden echt leuk begin te vinden en er dus steeds beter in word:)",
    author: "Sophie van Baren",
  },
  {
    id: "roos-spruijt",
    rating: 5,
    text:
      "Hoewel ik niet met rij school Vlam heb afgereden vanwege een examen wat was gepland bij een rijschool in Den Haag heb ik m super goede ervaringen gehad bij rijschool Vlam. Elke les heb ik hele goede begeleiding gehad van Levent. Super geconcentreerd, fijne manier van feedback terug krijgen en Levent is altijd op tijd:) Ik zal iedereen aanraden te vlammen met Levent!!!",
    author: "Roos Spruijt",
  },
];
