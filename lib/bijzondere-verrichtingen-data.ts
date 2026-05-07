/** Eén onderdeel — later uit te breiden met foto’s/illustraties via `imageSrc`. */
export type VerrichtingBodyBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] }
  /** Rendert de YouTube-embed; gebruikt `youtubeId` op hetzelfde item. */
  | { kind: "embed-youtube" };

/** Extra hero-beelden (bij meerdere illustraties, zoals dashboard). */
export type VerrichtingGalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type BijzondereVerrichtingItem = {
  id: string;
  title: string;
  /** Korte intro; ook voor meta description. */
  teaser: string;
  /** Overzichtskaart: `cover` = headervulling; standaard `contain` (o.a. diagrammen). */
  cardImageFit?: "cover" | "contain";
  /** Alleen voor de overzichtskaart (bijv. cover terwijl de detailpagina `imageGallery` gebruikt). */
  cardImageSrc?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Natuurlijke afmetingen van `imageSrc` (voor volledige weergave zonder crop). */
  imageWidth?: number;
  imageHeight?: number;
  /** Meerdere afbeeldingen in de hero (gebruik géén `imageSrc` tegelijk). */
  imageGallery?: VerrichtingGalleryImage[];
  /** YouTube-video-id (bijv. uit watch?v=...) */
  youtubeId?: string;
  body?: VerrichtingBodyBlock[];
};

/** Alle bijzondere verrichtingen onder één overzicht (zelfde volgorde als eerder per thema). */
export const BIJZONDERE_VERRICHTING_ITEMS: BijzondereVerrichtingItem[] = [
  {
    id: "turbo-rotonde-utrecht",
    title: "Benaderen van de Turbo-rotonde (Utrecht)",
    teaser:
      "Turbo-rotondes in Utrecht: vaste stroken, veiliger rijden en betere doorstroming. Zo benader je de rotonde en wanneer geef je richting aan?",
    cardImageFit: "cover",
    imageSrc: "/verrichtingen/cover-turborotonde.jpg",
    imageAlt: "Turbo-rotonde met duidelijke rijstrookvoering in Utrecht",
    imageWidth: 1024,
    imageHeight: 559,
    youtubeId: "QSOi-t29CdU",
    body: [
      {
        kind: "p",
        text: "Turbo-rotondes zijn ontworpen om het verkeer veiliger en efficiënter te laten verlopen. In tegenstelling tot traditionele rotondes hebben turbo-rotondes meerdere rijstroken die specifiek naar verschillende afritten leiden. Dit voorkomt weven en vermindert de kans op ongelukken. Turbo-rotondes worden steeds populairder in Nederland. Ze zorgen voor een betere doorstroming van verkeer en verhogen de veiligheid door duidelijke rijstrookscheidingen.",
      },
      {
        kind: "p",
        text: "Maar hoe benader je een turbo-rotonde correct en wanneer geef je richting aan?",
      },
      { kind: "h2", text: "Wat is een turbo-rotonde?" },
      {
        kind: "p",
        text: "Een turbo-rotonde heeft meerdere rijstroken met vaste rijrichtingen. Voordat je de rotonde oprijdt, kies je al de juiste rijstrook. Door de verhoogde rijstrookscheidingen is wisselen op de rotonde niet meer mogelijk, wat de kans op ongelukken vermindert.",
      },
      { kind: "h2", text: "Hoe benader je een turbo-rotonde?" },
      {
        kind: "ul",
        items: [
          "Vroegtijdig voorsorteren – Kijk ruim van tevoren naar de borden en wegmarkeringen. Deze geven duidelijk aan welke rijstrook je moet nemen voor de gewenste afslag.",
          "Juiste rijstrook kiezen – Kies op basis van je bestemming de juiste strook: rechtdoor of rechtsaf neem je de rechter rijstrook; linksaf of keren doe je via de linker rijstrook.",
          "Snelheid aanpassen – Nader de rotonde rustig en pas je snelheid aan op het overige verkeer.",
        ],
      },
      { kind: "h2", text: "Wanneer geef je richting aan?" },
      {
        kind: "ul",
        items: [
          "Bij het oprijden: Richting geven is hier niet verplicht, tenzij je direct de eerste afslag neemt.",
          "Bij het afslaan: Geef richting aan zodra je de afslag voor jouw gewenste uitrit voorbij bent. Dit helpt andere weggebruikers anticiperen op jouw actie.",
          "Bij het verlaten van de rotonde: Altijd richting naar rechts aangeven als je de rotonde verlaat.",
        ],
      },
      { kind: "h2", text: "Video: turbo-rotonde in de praktijk" },
      { kind: "embed-youtube" },
      {
        kind: "p",
        text: "Turbo-rotondes worden steeds populairder in Utrecht. Ze zorgen voor een betere doorstroming van verkeer en verhogen de veiligheid door duidelijke rijstrookscheidingen.",
      },
      { kind: "h2", text: "Veelgemaakte fouten" },
      {
        kind: "ul",
        items: [
          "Te laat voorsorteren – Dit kan tot gevaarlijke situaties leiden, omdat wisselen van rijstrook op de rotonde niet mogelijk is.",
          "Geen richting geven bij verlaten – Dit zorgt voor verwarring en kan leiden tot misverstanden met andere weggebruikers.",
        ],
      },
      {
        kind: "p",
        text: "Turbo-rotondes zijn ontworpen om de verkeersveiligheid te vergroten, maar een correcte benadering en duidelijke communicatie (richting aangeven) zijn essentieel om de doorstroming soepel te laten verlopen. Door alert en voorspelbaar te rijden, dragen we allemaal bij aan veilig verkeer.",
      },
    ],
  },
  {
    id: "vak-vooruit-links",
    title: "Vak vooruit parkeren (links)",
    teaser:
      "Tijdens het examen kom je aanrijden en krijg je de opdracht om vooruit links in een parkeervak te parkeren — met kijken, richting aangeven en precies insturen en terugsturen.",
    cardImageFit: "cover",
    imageSrc: "/verrichtingen/cover-vakvooruitparkerenlinks.jpg",
    imageAlt: "Vooruit naar links inparkeren in een parkeervak",
    imageWidth: 1024,
    imageHeight: 559,
    body: [
      {
        kind: "p",
        text: "Je komt aanrijden en krijgt de opdracht om vooruit in een vak te parkeren.",
      },
      { kind: "h2", text: "Kijken en richting aangeven" },
      {
        kind: "p",
        text: "Afhankelijk van aan welke kant je wilt parkeren (links of rechts) moet je eerst kijken in de binnenspiegel, buitenspiegel en over je schouder.",
      },
      {
        kind: "p",
        text: "Daarna geef je richting aan. Probeer goed voor te sorteren zodat je een wijde bocht kunt maken om het vak in te rijden.",
      },
      {
        kind: "p",
        text: "Rol heel rustig in de eerste versnelling zodat je de tijd hebt om het instuurmoment op te zoeken — en natuurlijk ook om je heen te kijken.",
      },
      { kind: "h2", text: "Het instuurmoment (naar links)" },
      {
        kind: "p",
        text: "Zodra je de eerste lijn van het parkeervak parallel recht op je buitenspiegel ziet, begin je met maximaal insturen.",
      },
      { kind: "h2", text: "Het terugstuurmoment" },
      {
        kind: "p",
        text: "Op het moment dat je auto bijna recht staat, stuur je terug zodat de wielen weer recht komen te staan.",
      },
    ],
  },
  {
    id: "achteruit-in-vak",
    title: "Achteruit in een vak inparkeren",
    teaser:
      "Stappenplan met herkenningspunten: positioneren langs het derde vak, langzaam achteruit met slippende koppeling en op het juiste moment insturen en terugsturen.",
    cardImageFit: "cover",
    imageSrc: "/verrichtingen/cover-achteruitinparkeren.jpg",
    imageAlt: "Achteruit in een parkeervak inparkeren",
    imageWidth: 1024,
    imageHeight: 559,
    body: [
      { kind: "h2", text: "Vak achteruit inparkeren – stappenplan met herkenningspunten" },
      { kind: "h3", text: "Positioneren voor het vak" },
      {
        kind: "p",
        text: "Kijk eerst goed om je heen en geef richting naar rechts aan voordat je stopt, op ongeveer 70 meter afstand.",
      },
      {
        kind: "p",
        text: "Rij langzaam langs het parkeervak waarin je achteruit wilt inparkeren en stop ter hoogte van het derde vak na het vak waarin je wilt parkeren. Het vak waarin je wilt parkeren telt dus niet mee; begin te tellen vanaf dat vak.",
      },
      {
        kind: "p",
        text: "Zorg ervoor dat jouw auto ongeveer één meter afstand houdt van de geparkeerde auto’s (of de parkeervakken) aan jouw rechterkant.",
      },
      { kind: "h3", text: "Eerste herkenningspunt" },
      {
        kind: "p",
        text: "Na het stoppen mag je de richtingaanwijzer uitzetten en de achteruitversnelling inschakelen. Rij nu heel langzaam achteruit met behulp van de slippende koppeling (ongeveer 1 km/u), tot je het eerste herkenningspunt bereikt: wanneer het deurkozijn ter hoogte is van de helft van het tweede vak, stuur dan vlot naar rechts in terwijl je langzaam achteruit blijft rijden.",
      },
      {
        kind: "p",
        text: "Kijk tussendoor goed om je heen en in de spiegels om het overige verkeer in de gaten te houden. Stop indien nodig op tijd om anderen voor te laten gaan. De auto zal nu in een bocht het vak indraaien.",
      },
      { kind: "h3", text: "Tweede herkenningspunt" },
      {
        kind: "p",
        text: "Blijf langzaam achteruitrijden en let goed op de voorzijde (neus) van de auto. Zodra je merkt dat de neus van de auto recht voor het vak staat — dus dat de auto recht in het vak staat — draai je het stuur ongeveer anderhalve slag terug naar links (of volledig terug naar de neutrale stand als je volledig had ingestuurd), zodat de wielen weer recht staan.",
      },
      {
        kind: "p",
        text: "Blijf langzaam achteruitrijden tot je helemaal in het vak staat. Controleer of je netjes in het midden van het vak en recht geparkeerd staat. Indien nodig kun je corrigeren door een klein stukje vooruit of achteruit te rijden.",
      },
    ],
  },
  {
    id: "fileparkeren",
    title: "Fileparkeren",
    teaser:
      "Parallel inparkeren: voorbereiden met spiegels en richting, eerste en tweede herkenningspunt, en zo recht afstellen tussen twee auto’s.",
    imageSrc: "/verrichtingen/fileparkeren.jpg",
    imageAlt: "Fileparkeren tussen twee geparkeerde auto’s",
    imageWidth: 223,
    imageHeight: 300,
    youtubeId: "iY17XLkcJ0Y",
    body: [
      { kind: "h2", text: "Voorbereiding" },
      {
        kind: "ul",
        items: [
          "Kijk eerst om je heen met binnenspiegel, rechter buitenspiegel en over je rechterschouder, en zet de rechter richtingaanwijzer aan op ongeveer 70 m voor het stoppen.",
          "Controleer de omgeving goed (spiegels en dode hoek).",
          "Rij langzaam naast de geparkeerde auto tot je ongeveer 30–50 cm stopafstand tot die auto hebt. Zorg dat jouw auto recht staat.",
        ],
      },
      { kind: "h2", text: "Eerste herkenningspunt (start van indraaien)" },
      {
        kind: "p",
        text: "Rij langzaam achteruit met ongeveer 1 km/u tot de rugleuning van jouw achterbank — denkbeeldige lijn — gelijk staat met de achterlichten van de geparkeerde auto. Stop daar kort en controleer opnieuw de omgeving.",
      },
      {
        kind: "p",
        text: "Begin nu met volledig naar rechts sturen en rij langzaam achteruit tot het tweede herkenningspunt. Kijk tussendoor om je heen; stop indien nodig op tijd voor overige verkeer.",
      },
      { kind: "h2", text: "Tweede herkenningspunt (terugsturen)" },
      {
        kind: "ul",
        items: [
          "Zodra je met de rechterbuitenspiegel ongeveer 30 cm voorbij de bumper van de geparkeerde auto bent, stop je kort.",
          "Stuur nu terug naar links (volledig) om je auto recht in het parkeervak te draaien.",
          "Kijk tijdig in je linker buitenspiegel; indien nodig stop je op tijd om anderen voor te laten gaan.",
          "Blijf langzaam achteruitrijden terwijl je links blijft sturen.",
        ],
      },
      { kind: "h2", text: "Auto recht zetten" },
      {
        kind: "p",
        text: "Zodra je auto recht in het vak staat en parallel is aan de stoeprand, stuur je het stuur weer recht.",
      },
      {
        kind: "p",
        text: "Corrigeer indien nodig een klein beetje vooruit of achteruit zodat je netjes in het midden van het vak staat en voldoende ruimte voor- en achter je hebt.",
      },
      { kind: "h2", text: "Video: fileparkeren" },
      { kind: "embed-youtube" },
    ],
  },
  {
    id: "keren-op-de-weg",
    title: "Keren op de weg",
    teaser:
      "Met de auto keren door vooruit tegen de stoep te sturen, achteruit te rijden en weer naar links uit te lijnen — rustig tempo en veel om je heen kijken.",
    imageSrc: "/verrichtingen/kerenopdeweg.gif",
    imageAlt: "Animation: keren op de weg tussen stoepranden",
    imageWidth: 300,
    imageHeight: 264,
    youtubeId: "kzudzYizVu0",
    body: [
      {
        kind: "ul",
        items: [
          "Auto in de eerste versnelling zetten.",
          "Scan rondom de auto en verleen voorrang indien een andere weggebruiker aankomt.",
          "Laat de koppeling rustig opkomen tot het aangrijpingspunt en houd deze vast.",
          "Heel langzaam rijden, snel naar links sturen en veel rondom de auto kijken.",
          "Bij het snijpunt (rechts onder in de voorruit) snel naar rechts sturen totdat dit niet verder kan of totdat je de stoeprand zachtjes raakt.",
          "In de achteruitversnelling zetten en rondom de auto kijken.",
          "Achteruit rijden (eventueel doorsturen) en veel kijken totdat de voorkant duidelijk naar links uitwijkt; daarna snel en volledig naar links sturen.",
        ],
      },
      { kind: "h2", text: "Video: keren op de weg" },
      { kind: "embed-youtube" },
    ],
  },
  {
    id: "keren-halve-draai",
    title: "Keren door middel van een halve draai",
    teaser:
      "Ruimte en verkeersborden controleren, netjes tegen de stoeprand stoppen, veilige stap-vooruit en vlot naar links doorsturen in één draai — zonder droogsturen.",
    imageSrc: "/verrichtingen/kerenhalvedraai.jpg",
    imageAlt: "Keren met een halve draai op krappe ruimte",
    imageWidth: 600,
    imageHeight: 627,
    youtubeId: "xoEj0t_HQos",
    body: [
      {
        kind: "p",
        text: "Allereerst kijk je of je wel kunt en mag keren — let dus op de ruimte en op verkeersborden.",
      },
      {
        kind: "p",
        text: "Zoals bij andere bijzondere verrichtingen stop je langs de trottoirband op circa 15 cm afstand aan de rechterzijde.",
      },
      {
        kind: "p",
        text: "Het stoppen doe je door vooraf te kijken: binnenspiegel – voor je – rechter buitenspiegel – over de rechterschouder — en daarna de richtingaanwijzer naar rechts te zetten.",
      },
      {
        kind: "p",
        text: "Nadat je gestopt bent, zet je de auto in de eerste versnelling.",
      },
      {
        kind: "p",
        text: "Kijk vervolgens: binnenspiegel – voor je – linker buitenspiegel – over je linkerschouder – rechter buitenspiegel – over je rechterschouder.",
      },
      {
        kind: "p",
        text: "Als er geen verkeer aankomt, rijd je een paar meter recht vooruit met slippende koppeling, zodat je stapvoets kunt rijden.",
      },
      {
        kind: "p",
        text: "Blijf tussendoor om je heen kijken: binnenspiegel – voor je – linker buitenspiegel – linkerschouder – rechter buitenspiegel – rechterschouder.",
      },
      {
        kind: "p",
        text: "Vervolgens stuur je vlot naar links en maximaal. Je moet je auto in één draai keren — nooit droogsturen!",
      },
      {
        kind: "p",
        text: "Bij het wegrijden nog even linker buitenspiegel en over je linkerschouder — er kan altijd een weggebruiker je voorbij willen.",
      },
      {
        kind: "p",
        text: "Als laatste pas je de nazicht-methode toe: binnenspiegel – rechter buitenspiegel – linker buitenspiegel.",
      },
      { kind: "h2", text: "Video: keren door middel van een halve draai" },
      { kind: "embed-youtube" },
    ],
  },
  {
    id: "bocht-achteruit-keren",
    title: "Bocht achteruit keren",
    teaser:
      "Achteruit een scherpe hoek volgen: halverwege naar rechts pakken met halve slagen en op tijd terugsturen richting de stoeprand.",
    imageSrc: "/verrichtingen/bochtachteruitkeren.gif",
    imageAlt: "Animation: een bocht achteruit keren",
    imageWidth: 221,
    imageHeight: 300,
    youtubeId: "xNv8w6-P3vc",
    body: [
      {
        kind: "p",
        text: "Kijk rondom de auto en verleen voorrang als een andere weggebruiker aankomt.",
      },
      {
        kind: "p",
        text: "Als de bocht uit je rechterspiegel verdwijnt: een halve slag sturen, kijken… opnieuw een halve slag sturen. Daarna op gevoel de rest van de bocht volgen — en veel blijven kijken!",
      },
      {
        kind: "p",
        text: 'Wanneer de bocht "gerond" is, het stuur twee slagen (tweemaal overpakken) terug naar links draaien wanneer de achterkant van de auto ongeveer 20 cm bij de stoeprand vandaan is.',
      },
      { kind: "h2", text: "Video: bocht achteruit keren" },
      { kind: "embed-youtube" },
    ],
  },
  {
    id: "recht-achteruit",
    title: "Recht achteruit",
    teaser:
      "Stap voor stap achteruit in een rechte lijn: koppel op het aangrijpingspunt weinig corrigerend sturen en de stoeprand in de buitenspiegel op circa 20 cm houden.",
    imageSrc: "/verrichtingen/cover-rechtachteruit.png",
    imageAlt: "Achteruit in een rechte lijn langs de stoeprand",
    imageWidth: 1536,
    imageHeight: 1024,
    youtubeId: "3GIA4S6yuSQ",
    body: [
      {
        kind: "ul",
        items: [
          "Scan rondom de auto en verleen voorrang als een andere weggebruiker aankomt.",
          "Langzaam rijden: houd de koppeling op het aangrijpingspunt.",
          "Veel om je heen kijken; let via de rechter buitenspiegel op de stoeprand.",
          "Weinig stuurcorrecties: houd de stoeprand ongeveer op 20 cm afstand.",
        ],
      },
      { kind: "h2", text: "Video: recht achteruit" },
      { kind: "embed-youtube" },
    ],
  },
  {
    id: "hellingproef",
    title: "Hellingproef",
    teaser:
      "Gestopt op een helling wegrijden zonder terug te rollen: koppeling en gas op het punt, voorrang laten gaan rem los en gesteund wegrijden.",
    imageSrc: "/verrichtingen/cover-hellingproef.png",
    imageAlt: "Auto op helling langs de stoeprand — hellingproef",
    imageWidth: 1536,
    imageHeight: 1024,
    youtubeId: "jt7ypsK0AAE",
    body: [
      {
        kind: "ul",
        items: [
          "Auto in de eerste versnelling zetten.",
          "Scan rondom de auto en verleen voorrang als een andere weggebruiker aankomt.",
          "Koppel op laten komen tot de motor vooruit wil — hou de koppeling vooral vast op het aangrijpingspunt.",
          "Binnenspiegel, buitenspiegel en linkerschouder kijken; geef richting aan naar links.",
          "Laat de handrem zakken of de voetrem los (koppel blijft op het punt).",
          "Iets meer gas geven — ongeveer 1200 toeren.",
          "Koppel daarna geleidelijk verder laten opkomen en wegrijden met de koppeling op het aangrijpingspunt.",
        ],
      },
      { kind: "h2", text: "Video: hellingproef" },
      { kind: "embed-youtube" },
    ],
  },
  {
    id: "dashboard",
    title: "Dashboard",
    teaser:
      "Waarschuwingslampjes en bedieningsknappen kennen: de examinator kan tijdens een toets of examen inhoudelijke vragen over het dashboard en de techniek stellen.",
    cardImageSrc: "/verrichtingen/cover-dashboard.png",
    imageGallery: [
      {
        src: "/verrichtingen/dashboard1.webp",
        alt: "Dashboard met teller-, waarschuwingssymbolen en stuurkolomknoppen",
        width: 768,
        height: 981,
      },
      {
        src: "/verrichtingen/dashboard2.gif",
        alt: "Overzicht bedienings- en contourlampjes rond het stuur",
        width: 300,
        height: 265,
      },
    ],
    youtubeId: "psnrylr6nx0",
    body: [
      {
        kind: "p",
        text: "Bij diverse toetsen en eventueel het examen kan de examinator vragen over de auto stellen. Daarbij zijn de controlelampjes en de bedieningsknoppen in het dashboard belangrijk.",
      },
      {
        kind: "p",
        text: "Bij de intro staan foto’s van het dashboard ter referentie. Hieronder vind je een video voor extra uitleg. Technische vragen over het motorcompartiment zijn ook mogelijk — zie de pagina Motorcompartiment.",
      },
      { kind: "h2", text: "Video: dashboard en cockpit" },
      { kind: "embed-youtube" },
    ],
  },
  {
    id: "motor-controle",
    title: "Motorcompartiment",
    teaser:
      "Video en beeld over het motorcompartiment ter voorbereiding op vragen tijdens een toets (oliepeilstok, koelvloeistof enz.).",
    imageSrc: "/verrichtingen/cover-motorcompartimet.png",
    imageAlt: "Open motorkap, motorcompartiment voor examenvragen",
    imageWidth: 1536,
    imageHeight: 1024,
    youtubeId: "--mbTku7p98",
    body: [
      {
        kind: "p",
        text: "De examinator kan vragen naar onderdelen onder de motorkap. Met onderstaande video en afbeelding bereid je je voor op wat gangbaar gevraagd wordt.",
      },
      { kind: "h2", text: "Video: motorcompartiment" },
      { kind: "embed-youtube" },
    ],
  },
  {
    id: "bandencontrole",
    title: "Bandencontrole",
    teaser:
      "Voor een TTT of praktijkexamen: verkennende vragen over je auto ontspannen houden. Profiel, spanning, ventielkap en beschadigingen — wat je wilt weten over banden.",
    imageSrc: "/verrichtingen/cover-bandecontrole.png",
    imageAlt: "Inspectie van autobanden en velg voor het examengesprek",
    imageWidth: 1536,
    imageHeight: 1024,
    body: [
      {
        kind: "p",
        text: "Voor een tussentijdse toets of praktijkexamen bij het CBR stelt de examinator vrijwel altijd een aantal controlerende vragen over de auto — vooral om het gesprek te openen en spanning te halen uit het begin. Als je vrijwel niets kunt aanwijzen, voelt zo’n onderdeel juist tegenstrijdig nerveus. Bij Rijschool Vlam daarom deze praktische uitleg, zodat je zelf alle antwoorden weet óf kunt inschatten.",
      },
      { kind: "h2", text: "Bandencontrole" },
      {
        kind: "p",
        text: "Als automobilist ben je verplicht je auto veilig te houden en in goede conditie — de banden horen daar uiteraard ook bij.",
      },
      {
        kind: "p",
        text: "Eens per maand controleer je het volgende:",
      },
      {
        kind: "ul",
        items: [
          "Profeldiepte — zomerbanden minimaal 1,6 mm; winterbanden minimaal 4 mm wordt sterk aanbevolen.",
          "Bandenspanning — zoals bij max. belading in het instructieboekje aangegeven.",
          "Aanwezigheid van het ventieldopje.",
          "Beschadigingen — ongelijke slijtage (hapslijtage).",
        ],
      },
      { kind: "h2", text: "Hoe en waarom?" },
      {
        kind: "p",
        text: "Deze vier punten zijn belangrijk voor jouw veiligheid, maar ook voor milieu en brandstofverbruik als iets daarvan niet klopt.",
      },
      { kind: "h2", text: "Bandenspanning" },
      {
        kind: "p",
        text: "Bandenspanning die niet klopt leidt tot extra slijtage, slechtere wegligging en te hoog verbruik. Je kunt spanning vaak nabij trekken bij een tankstation — de apparaten verschillen per locatie.",
      },
      {
        kind: "p",
        text: "De juiste spanning hangt af van jouw auto en staat altijd in het instructieboekje, gewoonlijk in bar (vaak tussen 2 en 3). Er zit ook meestal een sticker in een deurstijl of bij het brandstofklepje.",
      },
      { kind: "h2", text: "Profieldiepte" },
      {
        kind: "p",
        text: "Profiel voert bij regen water tussen band en rijdek weg. Bij te zwak profiel niet goed genoeg: wettelijk minimum is 1,6 mm. In het loopvlak liggen kleine indicators op dat niveau — loopt gelijk ermee uit, dan is tijd voor vervanging. Bij winterbanden zoek je naar voorkeur 4 mm of meer voor echte wintersituaties.",
      },
      { kind: "h2", text: "Beschadigingen" },
      {
        kind: "p",
        text: "Een stoeprand of een scherp voorwerp kan banden beschadigen. Bekijk daarom ook de zijkanten. Zo ontstaan zwakkere plekken die onder hoge temperatuur en snelheid tot een klapband kunnen leiden. Inspecteer loopvlak en flanken daarom regelmatig.",
      },
    ],
  },
];

export function getBijzondereVerrichtingBySlug(
  slug: string,
): BijzondereVerrichtingItem | undefined {
  return BIJZONDERE_VERRICHTING_ITEMS.find((item) => item.id === slug);
}
