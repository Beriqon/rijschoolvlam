import { mapCmsBlogPostToDetail, mapCmsBlogPostsToListItems } from "@/lib/cms/map-blog";
import { getBlogPosts, getBlogPostBySlug as getCmsBlogPostBySlug } from "@/lib/cms/queries";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content?: readonly BlogContentNode[];
  imageSrc: string;
  /**
   * `object-position` voor blog cards (`object-cover`).
   * CMS featured images met tekst links: `"left"`.
   */
  coverImageAnchor?: "left" | "center" | "right";
  publishedAt: string; // ISO date
  readTimeMinutes: number;
  tags?: readonly string[];
  /** WordPress HTML body; detailpagina rendert dit i.p.v. `content` nodes. */
  htmlContent?: string;
};

export type BlogContentNode =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "p"; parts: readonly BlogTextPart[] }
  | { type: "ul"; items: readonly BlogListItem[] }
  | { type: "cta"; text: string; href: string };

export type BlogTextPart = string | { type: "a"; text: string; href: string };
export type BlogListItem = string | readonly BlogTextPart[];

export function blogCoverImageAnchorClass(anchor?: BlogPost["coverImageAnchor"]) {
  switch (anchor) {
    case "left":
      return "object-[left_center]";
    case "right":
      return "object-[right_center]";
    default:
      return "object-center";
  }
}

/** Statische backup wanneer het CMS niet bereikbaar is of geen geldige posts teruggeeft. */
export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: "voordelen-van-een-tussentijdse-toets",
    title: "Voordelen van een tussentijdse toets",
    coverImageAnchor: "left",
    excerpt:
      "Een tussentijdse toets bij het CBR is geen verplicht amusement: het is een echte proefrit in examenstijl, met feedback waar je direct mee verder kunt.",
    content: [
      {
        type: "p",
        text: "Het praktijkexamen maakt bijna iedereen wat nerveus. Precies daarom is er de tussentijdse toets: je oefent onder dezelfde tijdsdruk en hetzelfde soort route als straks bij het echte examen — alleen met meer leerwinst achteraf. In dit stuk lees je waarom die toets voor veel leerlingen slim is om in te plannen vóór het grote moment.",
      },
      { type: "h2", text: "Wat houdt een tussentijdse toets in?" },
      {
        type: "p",
        text: "Het is een officiële rit met examinator, vergelijkbaar in opbouw met het praktijkexamen. Zo krijg je een realistisch beeld van wat er gebeurt aan tafel vóór vertrek, tijdens de rit en na afloop. Na de toets krijg je terugkoppeling waar je concreet aan kunt werken. Behaal je jouw bijzondere verrichtingen vlot en veilig volgens de criteria, dan kun je in sommige gevallen een vrijstelling voor die onderdelen krijgen bij je latere examen — minder spanning, zelfde verwachting op de rest van de rit.",
      },
      { type: "h2", text: "Je went aan de examenomgeving" },
      {
        type: "p",
        text: "Wie pas voor het eerst met een examinator meerijdt, heeft naast autorijden ook ‘examenspanning’. Door de rit eerder zo te beleven, weet je beter hoe instructies klinken en hoe rustig je je ruimtes en keuzes kunt uitleggen. Veel mensen beschrijven daarna hun echte examen als bekender en daardoor minder zwaar.",
      },
      { type: "h2", text: "Concrete feedback waar je lessen op aanpast" },
      {
        type: "p",
        text: "In je normale lessen krijg je continu tips van je instructeur; de toets voegt daar het perspectief van de CBR-taal aan toe. Je weet waar je hoofdpunten zitten bij spiegel-/kijkpatronen, voorsorteren, plaats op de weg en verkeersdeelnemers rond fiets en voetgangers. Dat maakt vervolglessen bij Rijschool Vlam nog gerichter.",
      },
      { type: "h2", text: "Extra vertrouwen op de dag zelf" },
      {
        type: "p",
        text: "Het doel van oefenen is niet ‘perfect worden’, maar betrouwbaar zijn onder druk. Een gelukte of leerrijke toets voelt daarom vrijwel altijd als winst — ook als er nog werk aan de winkel is. Je weet waar je staat én hoe het voelt als de formele jurk van het examen aan gaat.",
      },
      {
        type: "p",
        text: "Wil je weten hoe de tussentijdse toets in jouw planning past — en wat dat voor je pakket betekent? Neem gerust contact met ons op.",
      },
      { type: "cta", text: "Bekijk tarieven", href: "/tarieven" },
    ],
    imageSrc: "/blog/voordelentussentijdsetoets.png",
    publishedAt: "2026-05-06",
    readTimeMinutes: 5,
    tags: ["Examen", "CBR"],
  },
  {
    slug: "tips-voor-het-autorijden-in-het-donker",
    title: "Tips voor het autorijden in het donker",
    coverImageAnchor: "left",
    excerpt:
      "Minder zicht en meer lichtprikkels maken ’s nachts rijden anders dan overdag. Praktische tips voor verlichting, zicht, tempo en gedrag voor een veiligere rit.",
    content: [
      {
        type: "p",
        text: "In het donker valt kleur- en contourdetail weg en je ogen hebben meer tijd nodig na harde contrasten, bijvoorbeeld tegenliggers die grootlicht gebruiken of nat asfalt dat licht weerkaatst. Mist en regen maken het nog lastiger. Dat je je eerst onzeker voelt, is eerder regel dan uitzondering — met een paar vaste gewoontes wordt ’s avonds autorijden stuk dragelijker.",
      },
      { type: "h2", text: "Waarom nachtelijke ritten veel vragen van je hersenen" },
      {
        type: "p",
        text: "Overdag lees je de weg ook op kleine aanwijzingen langs de berm; ’s nachts krijg je die minder cadeau en moet je meer halen uit verlichting en wegmarkeringen. Dat vraagt extra concentratie en vermoeit je sneller.",
      },
      { type: "h2", text: "Lichtbron en verlichting" },
      {
        type: "ul",
        items: [
          "Laat koplampen en ruit schoon: vuil breekt het licht en verblind je zelf meer.",
          "Gebruik dimlicht als je anderen niet wilt verblinden; grootlicht alleen waar het mag en veilig kan.",
          "Twijfel je over stand of scheefstand? Bij een werkplaats even laten nakijken is beter dan gokken.",
        ],
      },
      { type: "h2", text: "Gedrag op de weg" },
      {
        type: "ul",
        items: [
          "Neem waar het zicht tegen is iets meer marge op snelheid en volgafstand.",
          "Kijk niet in de kern van tegemoetkomende koplampen; volg waar mogelijk je rechterkantlijn/markering uit je periferie.",
          "Gebruik waar mogelijk de nachtstand van de binnenspiegel om verblinding door licht uit achteren te verminderen.",
        ],
      },
      { type: "h2", text: "Ruit en afleiding" },
      {
        type: "p",
        text: "Strepen op glas worden ’s avonds lasers van tegenlicht. Schoonmakers en werkende ruitenwisservloeistof horen erbij. Houd jezelf vrij van telefoon en andere afleiders: je pupil past al veel aan tussen donker én dashboards en straatverlichting.",
      },
      { type: "h2", text: "Kwetsbare weggebruikers en wilde aanrijdingrisico's" },
      {
        type: "p",
        text: "Voetgangers en fietsers zonder goede lamp of reflectie verschijnen laat op je netvlies. Op kruispunten en zebrapaden daarom nog scherper anticiperen. Op landelijke stroken en ‘wildroutes’ hou je waar nodig extra remruimte: dieren kunnen onverwacht de weg op komen.",
      },
      { type: "h2", text: "Lange rit? Pauze ook ’s avonds" },
      {
        type: "p",
        text: "Vermoeidheid en microslaapjes zijn overdag riskant, maar ’s nachts nóg venijniger door minder houvast aan zichtbakens. Bouw onderbrekingen in. Zie je niet scherp genoeg? Stop veilig eerder dan een minuut te laat.",
      },
      { type: "h2", text: "Ogen op orde" },
      {
        type: "p",
        text: "Bril- of lenssterktes die dagelijks goed zijn, kunnen in laag contrast toch meer moeite geven. Bij twijfel eens bij de opticien langs — dat is niet soft, dat is verkeersveiligheid als je veel in het donker rijdt.",
      },
      {
        type: "p",
        text: "Rijschool Vlam oefent met je waar het kan ook op donkere tijden verkeerspunten waar zicht een rol speelt — vraag je instructeur daar gerust naar tijdens een les.",
      },
      { type: "cta", text: "Stel je vraag", href: "/contact" },
    ],
    imageSrc: "/blog/tipsrijdendonker.png",
    publishedAt: "2026-05-06",
    readTimeMinutes: 7,
    tags: ["Veiligheid", "Tips"],
  },
  {
    slug: "duurzamer-leren-rijden-bespaar-brandstof-en-kosten",
    title:
      "Duurzamer leren rijden: bespaar brandstof en kosten nu deze hard stijgen",
    excerpt:
      "Een rustige, voorspellende rijstijl kost je auto minder energie én onderhoud je portemonnee — en sluit aan bij hoe we nu vaak autorijden (en hoe het straks meer wordt).",
    content: [
      {
        type: "p",
        text: "Duurzaam autorijden is geen zweverig sloganwoord: het gaat om efficiëntere kilometers — minder onnodig optrekken en afremmen, geen overtollige lading aan boord en bandenspanning op peil. Zo hou je benzine-, diesel- of elektriciteitskosten beter onder controle én spare je je remmen en banden mee.",
      },
      { type: "h2", text: "Wat levert het op?" },
      {
        type: "p",
        text: "Rustig accelereren en minder abrupt remmen kan in veel situaties neerkomen op merkbaar minder verbruik — in educatieve bronnen wordt soms een bandbreedte rond circa 10 tot 20 procent genoemd ten opzichte van heel agressief rijgedrag. Je exacte winst hangt af van auto, route en verkeer, maar met hogere brandstofprijzen wordt wat meer rust op het gaspedaal financieel snel interessant.",
      },
      { type: "h2", text: "Zes houvastpunten voor zuinige meters" },
      {
        type: "ul",
        items: [
          "Trek rustig op: geen wedstrijdstart naar de volgende gelimiteerde snelheid.",
          "Schakel tijdig naar een hogere versnelling waar de motor dat rustig kan dragen — lager toerental kan zuiniger zijn. Bij automaat gaat dit grotendeels vanzelf; jij voorkomt onnodige ‘tikjes’ tegen het gaspedaal.",
          "Kijk ver vooruit en laat op tijd het gas hangen bij een naar rood lopende keten verkeer, zodat je minder hoeft af te remmen en weer aan te trekken.",
          "Houd je snelheid waar veilig mogelijk meer gelijkmatig dan constant optrek-remmen.",
          "Houd bandenspanning conform advies (vaak op een sticker in het portier); te zachte banden kosten extra brandstof.",
          "Haal onnodige ballast uit de auto en monteer geen dakdrager die je niet gebruikt: extra gewicht en luchtweerstand kosten energie.",
        ],
      },
      { type: "h2", text: "Elektrisch / automaat tijdens lessen bij Rijschool Vlam" },
      {
        type: "p",
        text: "Steeds vaker kiezen leerlingen voor een automaat of een elektrische lesauto: soepel optrekken, vaak nuttige energieterugwinning bij loslaten gas en geen schakelen, zodat je aandacht naar verkeer en rijtechniek kan. Bij Rijschool Vlam kun je rijlessen volgen in een schakelauto, automaat of elektrische lesauto — afhankelijk van wat bij jouw voorkeur en examen past.",
      },
      { type: "h2", text: "Context: milieu en gewoonte" },
      {
        type: "p",
        text: "Naast brandstof of stroom draagt rustig rijden ook bij aan minder uitstoot en fijnstof door remmen. Hoe vloeiender je in de stad meebeweegt, hoe prettiger vaak ook voor fietsers en voetgangers om je heen.",
      },
      { type: "h2", text: "Conclusie" },
      {
        type: "p",
        text: "Duurzaam hoeft niet ingewikkeld: met voorspellend kijken en rustig gas- en remwerk leer je dat stap voor stap tijdens gewone rijlessen. Wil je daar bewuster op trainen? Dan helpen we je graag.",
      },
      { type: "cta", text: "Schrijf je in", href: "/inschrijven" },
    ],
    imageSrc: "/blog/duurzamerlerenrijden.png",
    publishedAt: "2026-05-06",
    readTimeMinutes: 6,
    tags: ["Tips", "Milieu"],
  },
  {
    slug: "10-veelgemaakte-fouten-tijdens-het-rijexamen",
    title: "10 veelgemaakte fouten tijdens het rijexamen",
    coverImageAnchor: "left",
    excerpt:
      "Het praktijkexamen maakt veel mensen nerveus — en daar sluipen vermijdbare fouten doorheen. Ontdek tien veelvoorkomende uitglijders en hoe je ze voorkomt.",
    content: [
      {
        type: "p",
        text: "Het afrijden bij het CBR is meer dan alleen een half uurtje autorijden: je wordt getoetst op een veilige rijflow en op consistent gedrag onder druk. Spannende momenten zijn normaal; juist daar gaan veel kandidaten de mist in. Hieronder tien fouten die we vaak zien terugkomen bij examens — plus een praktische tegenbeweging per punt.",
      },
      { type: "h2", text: "1. Tempo dat niet bij de situatie past" },
      {
        type: "p",
        text: "Vaak wordt er óf uit angst té voorzichtig gekropen óf uit stress net iets te veel gas gegeven.",
      },
      {
        type: "p",
        text: "Beter: houd je aan de snelheidslimiet en stem je tempo af op het verkeer en het weggedeelte. Zoek een rustige, voorspelbare tussenweg: niet hinderlijk langzaam, maar ook niet opjagen. Bij inhalen geldt: alleen als het past binnen regels én ruimte, met overzicht en tijd.",
      },
      { type: "h2", text: "2. Verkeersborden niet op tijd gezien of niet toegepast" },
      {
        type: "p",
        text: "Een gemiste waarschuwing of een verbod dat je pas laat opmerkt zorgt voor abrupte correcties.",
      },
      {
        type: "p",
        text: "Beter: werk je theoretische kennis naar herkenbare patronen in het rijbewijsstelsel — en scan actief waar borden bij routes en kruispunten staan. Een paar meter eerder remmen door een eerder gezien bord is veel rustiger dan een late reactie.",
      },
      { type: "h2", text: "3. Het weer negeren" },
      {
        type: "p",
        text: "Regen, gladheid of slecht zicht wordt soms met hetzelfde tempo en dezelfde volgafstand aangepakt als bij droog weer.",
      },
      {
        type: "p",
        text: "Beter: verleng je remweg mentaliteit, neem extra afstand en kies pas snelheid waar je zicht en grip goed genoeg zijn. Zet waar nodig geschikte verlichting (dimlicht/mistlicht) en houd je ruit helder voor goed zicht.",
      },
      { type: "h2", text: "4. Te laat remmen" },
      {
        type: "p",
        text: "Wachten tot het laatste moment bij rood licht, een stopstreep of file-einde leidt tot scherpe remmen.",
      },
      {
        type: "p",
        text: "Beter: zie het kruispunt of obstakel eerder aan en laat rustig tempo zakken door gas los te laten voordat je remt. Zo blijven je manoeuvres uitnodigender voor anderen en hou je foutmarge.",
      },
      { type: "h2", text: "5. Zwak kijktechniek" },
      {
        type: "p",
        text: "Ogen die te lang op één punt blijven, weinig spiegels, of géén kruisje-met-ogen richting overstekende weg — dat kost bijzonder veel punten.",
      },
      {
        type: "p",
        text: "Beter: kijk niet ‘theatraal’, maar wel systematisch: ver vooruit + spiegels + dode hoek waar nodig + korte check links/rechts waar kruisen kan. Moet je vaker corrigeren omdat je iets eerder niet had waargenomen, dan is daar je kijktechniek vrijwel altijd deel van de oorzaak.",
      },
      { type: "h2", text: "6. Onhandige plaats op de rijstrook" },
      {
        type: "p",
        text: "Te dicht op geparkeerde auto's of twee wielen naast een fietspad, slap voorsorteren, of bochten strak/snijpend nemen waar ruimte vraag om ruimer.",
      },
      {
        type: "p",
        text: "Beter: hou afstand waar je wordt verwacht ook echt bruikbare ruimte te bewaren voor jezelf én anderen. Voorsorteren op tijd en bochten strak maar netjes zoals geleerd: geen hoofdreis ‘op de automatische spoelmodus’. Veilig gebruik van de beschikbare wegbreedte (mits geen tegenligger hindert en je je keuze kenbaar maakt) hoort daar bij.",
      },
      { type: "h2", text: "7. Bijzondere verrichtingen onder tijdsdruk" },
      {
        type: "p",
        text: "Te hard achteruit, focussen op stap-a-stap recepten zonder naar het echte verkeer te blijven kijken, of corrigerend sturen onder stress.",
      },
      {
        type: "p",
        text: "Beter: stapvoets (of zoals geleerd bij jullie school) rustig werkend bezig blijven. Eén extra streep herstellen is meestal beter dan doorbeuken naar ‘perfect in één beweging’. Houd continu zicht op fietsers, voetgangers en naderende auto’s.",
      },
      { type: "h2", text: "8. ‘Foutloos rijden’ als doel op het examen" },
      {
        type: "p",
        text: "Na een eerste misser volgt soms spanning: hoofd bij de fout blijven hangen in plaats van bij de rit.",
      },
      {
        type: "p",
        text: "Beter: examinatoren zien hoe je over je hele route functioneert. Laat kleine fouten los, herpak je tempo en laat het volgende blok zien hoe je gewoonlijk rijdt. Het herstellen van gedrag ná een afwijking telt ook mee als je niet in paniek blijft hangen.",
      },
      { type: "h2", text: "9. Eigenlijk nog niet rijp ingeschreven staan" },
      {
        type: "p",
        text: "Als de auto nog ‘te groot’ aanvoelt of je vaak twijfelt op standaardelementen — snelheid, keren, kijken — voelt het examen als een berg.",
      },
      {
        type: "p",
        text: "Beter: plan het examen pas als lessen en bijvoorbeeld een tussentijdse check je dat bevestigen. Bij Rijschool Vlam stemmen we je voorbereiding af op wat jij nodig hebt, zodat het examen een logische vervolgstap is in plaats van een loterij.",
      },
      { type: "h2", text: "10. Te weinig afstand en marginale passing" },
      {
        type: "p",
        text: "Krap langs fietsers of geparkeerde rij omdat ‘er net past’ wordt vaak afgewezen; veilig bruikbare ruimte wordt verwacht.",
      },
      {
        type: "p",
        text: "Beter: positioneer jezelf waar je anderen niet knijpt en nog genoeg speling hebt bij een uitwijk of fout van een ander. Richting aangeven, goed spiegel-/schoftwerk en waar nodig kort wachten wegen zwaarder dan ‘ik paste er net langs’.",
      },
      {
        type: "p",
        text: "Kort samengevat: slagen draait om rust, overzicht en voorspelbaar gedrag ónder examendruk — niet om ‘showen’. Sta je op het punt voor je eerste of volgende poging en wil je daar gericht naartoe trainen? Dat doe je bij ons stap voor stap.",
      },
      { type: "cta", text: "Inschrijven", href: "/inschrijven" },
    ],
    imageSrc: "/blog/10foutenrijexamen.jpg",
    publishedAt: "2026-05-06",
    readTimeMinutes: 9,
    tags: ["Examen", "Tips"],
  },
  {
    slug: "zo-blijf-je-gefocust-tijdens-lange-ritten",
    title: "Zo blijf je gefocust tijdens lange ritten",
    excerpt:
      "Lange ritten vermoeien en verlagen je alertheid. Met goede voorbereiding, slimme pauzes, comfort in de auto en gezonde gewoontes kom je frisser en veiliger aan.",
    content: [
      {
        type: "p",
        text: "Uren achter het stuur kost energie. Vermoeidheid maakt je trager in reacties en minder scherp in waarneming — en dat vergroot het risico op ongelukken. Vooral op bekende routes of na een drukke dag merk je niet altijd hoe snel je concentratie wegzakt. Met een paar vaste afspraken voor jezelf blijf je langer alert en rijd je verantwoorder.",
      },
      { type: "h2", text: "Begin uitgerust: voorbereiding vóór vertrek" },
      {
        type: "p",
        text: "Een lange rit begint eigenlijk de avond ervoor. Start je uitgeslapen, dan begint je brein al met een voorsprong. Streef naar voldoende slaap; begin je al moe, dan is slaperigheid onderweg bijna onvermijdelijk.",
      },
      {
        type: "p",
        text: "Bekijk je route even van tevoren: waar zit vaak file, zijn er werkzaamheden, en hoelang duurt het ongeveer? Een kort overzicht vermindert stress en je hoeft minder “live” te puzzelen terwijl je rijdt. Navigatie helpt onderweg, maar vooraf plannen houdt je hoofd rustiger.",
      },
      { type: "h2", text: "Plan vaste pauzes" },
      {
        type: "p",
        text: "Zet elke anderhalf à twee uur een korte stop in je rit. Ook tien minuten uitstappen, benen strekken en frisse lucht maakt je weer scherper. Je doorbloeding gaat omhoog en je ogen krijgen even rust van dezelfde bewegende horizon.",
      },
      {
        type: "ul",
        items: [
          "Drink water; uitdroging maakt je suf.",
          "Een kleine snack (fruit, noten, reep) geeft energie zonder zware vertering.",
          "Koffie of thee mag, maar overdrijf cafeïne niet: te veel kan later juist een dip geven.",
        ],
      },
      { type: "h2", text: "Maak de auto comfortabel" },
      {
        type: "p",
        text: "Een verkeerde zithouding vermoeit je rug en nek en leidt af. Stel stoel, stuur en spiegels zo af dat je ontspannen zit en goed zicht hebt. Te warm in de auto voelt vaak slaperig; liever fris en goed geventileerd dan een oververwarmde cabine.",
      },
      { type: "h2", text: "Blijf actief betrokken bij het rijden" },
      {
        type: "p",
        text: "Een eindeloze rechte baan op cruise control kan je in een soort automatische piloot brengen. Houd je scan actief: spiegels, verkeer ver voor je, zijwegen. Wissel waar veilig en verantwoord van rijstrook of pas je snelheid kort aan — niet om te haasten, maar om je aandacht wakker te houden.",
      },
      {
        type: "p",
        text: "Een praatje met een bijrijder kan de rit breken, maar de weg blijft leidend. Laat gesprekken je blik op het verkeer niet verdringen.",
      },
      { type: "h2", text: "Eten en drinken: licht houden" },
      {
        type: "p",
        text: "Een grote, vette maaltijd vraagt veel van je lijf en nodigt uit tot een dutje. Kies liever voor lichte maaltijden en tussendoortjes. Suikerrijke frisdrank geeft soms even een kick, maar daarna volgt vaak een energiedip. Water en thee zijn voor langere ritten vaak steadier.",
      },
      { type: "h2", text: "Muziek of podcast: met mate" },
      {
        type: "p",
        text: "Een oppeppende playlist of een rustige podcast kan de rit aangenamer maken. Zorg dat het volume en de inhoud je niet van het verkeer wegtrekken. Als je merkt dat je alleen nog naar het geluid luistert en minder naar de weg kijkt, zet het zachter of uit.",
      },
      { type: "h2", text: "Herken signalen van vermoeidheid — en handel" },
      {
        type: "p",
        text: "Zware oogleden, microslaapjes, wiebelen met je hoofd, langzamere reacties of wazig zicht: dat zijn geen “even doorbijten”-momenten. Stop, drink wat, loop een rondje, en als het moet: rust echt uit of slaap even. Aankomen is belangrijk; veilig aankomen is belangrijker.",
      },
      { type: "h2", text: "Hoe Rijschool Vlam hierbij past" },
      {
        type: "p",
        text: "In de lessen bij Rijschool Vlam oefen je ook met langere stukken rijden, vooruitkijken en rustig volhouden — vaardigheden die je later op vakantie of lange trips direct terugziet. Op die manier bouw je niet alleen examenrit-meters, maar ook vertrouwen voor het echte leven op de weg.",
      },
      { type: "h2", text: "Samengevat" },
      {
        type: "p",
        text: "Uitgerust vertrekken, regelmatig pauzeren, comfortabel zitten, licht eten, frisse lucht en alert blijven scannen: dat is de basis. Neem vermoeidheid serieus en geef jezelf de rust die je nodig hebt. Zo blijf je langer scherp en kom je met een veilig gevoel aan.",
      },
      { type: "cta", text: "Neem contact op", href: "/contact" },
    ],
    imageSrc: "/blog/langerittenblog.jpg",
    publishedAt: "2026-05-06",
    readTimeMinutes: 7,
    tags: ["Veiligheid", "Tips"],
  },
  {
    slug: "wat-is-aquaplaning-en-hoe-voorkom-je-het",
    title: "Wat is aquaplaning en hoe voorkom je het?",
    coverImageAnchor: "left",
    excerpt:
      "Aquaplaning kan je ineens grip en controle kosten op nat wegdek. Lees hoe het ontstaat, hoe je het herkent, wat je moet doen en hoe je het risico flink verkleint.",
    content: [
      {
        type: "p",
        text: "Aquaplaning is één van de spannendste momenten die je in de regen kunt meemaken: je auto verliest plots grip doordat er water tussen je band en het wegdek komt. Sturen en remmen reageren dan veel minder (of bijna niet), waardoor het voelt alsof je even “zweeft”. Gelukkig kun je met de juiste gewoontes de kans op aquaplaning kleiner maken — en weet je wat je moet doen als het toch gebeurt.",
      },
      { type: "h2", text: "Wat is aquaplaning precies?" },
      {
        type: "p",
        text: "Bij normaal rijden voert het profiel van je band water af, zodat er contact blijft met het asfalt. Ligt er te veel water op de weg en kan het profiel het niet snel genoeg wegwerken, dan ontstaat er een waterfilm onder de band. Op dat moment verliest de band grip en kan de auto minder goed reageren op sturen, gas en rem.",
      },
      { type: "h2", text: "Hoe ontstaat aquaplaning?" },
      {
        type: "p",
        text: "Aquaplaning hangt bijna altijd samen met een combinatie van omstandigheden. Hoe hoger je snelheid, hoe korter de tijd om water af te voeren en hoe groter het risico.",
      },
      {
        type: "ul",
        items: [
          "Snelheid: bij hogere snelheid wordt water eerder “opgebouwd” onder de band.",
          "Bandenprofiel: banden met weinig profiel voeren minder water af.",
          "Hevige regen of diepe plassen: een grote hoeveelheid water vergroot de kans.",
          "Sporen in het wegdek: in diepe sporen blijft water staan, waardoor je sneller op een waterlaag rijdt.",
          "Bandenspanning: een onjuiste spanning kan de grip op nat wegdek verminderen.",
        ],
      },
      { type: "h2", text: "Hoe herken je aquaplaning?" },
      {
        type: "p",
        text: "Aquaplaning komt vaak onverwacht. Je merkt het bijvoorbeeld doordat het stuur ineens veel lichter aanvoelt en de auto minder direct reageert op je stuurbewegingen. Soms hoor je het motortoerental oplopen zonder dat je echt versnelt. Het gevoel lijkt op kort controleverlies, alsof je auto over het water glijdt.",
      },
      { type: "h2", text: "Wat moet je doen als het gebeurt?" },
      {
        type: "p",
        text: "Blijf rustig. De grootste fout is abrupt remmen of hard sturen. Je doel is: snelheid rustig verminderen zodat de banden weer contact maken met het wegdek.",
      },
      {
        type: "ul",
        items: [
          "Laat het gas geleidelijk los (niet plotseling).",
          "Stuur zo rustig mogelijk en maak geen schokkerige correcties.",
          "Trap bij een handgeschakelde auto de koppeling in, zodat de aandrijving de wielen niet “duwt”.",
          "Kijk waar je naartoe wilt en corrigeer pas duidelijk als je merkt dat de grip terugkomt.",
        ],
      },
      { type: "h2", text: "Hoe voorkom je aquaplaning?" },
      {
        type: "p",
        text: "Helemaal uitsluiten kun je het niet, maar je kunt het risico wél sterk verkleinen met een paar vaste checks en rijgewoontes.",
      },
      {
        type: "ul",
        items: [
          "Controleer je bandenprofiel: wettelijk minimaal 1,6 mm, maar bij nat weer is 3 mm of meer een stuk veiliger.",
          "Pas je snelheid aan bij regen, vooral op snelwegen en in bochten.",
          "Vermijd diepe plassen en sporen waar mogelijk (zonder onverwachte manoeuvres).",
          "Check regelmatig je bandenspanning (ook vóór langere ritten).",
        ],
      },
      { type: "h2", text: "Veilig rijden in de regen: extra tips" },
      {
        type: "p",
        text: "Regen zorgt niet alleen voor aquaplaning-risico, maar ook voor slechter zicht en een langere remweg. Met deze simpele gewoontes maak je rijden in de regen direct veiliger:",
      },
      {
        type: "ul",
        items: [
          "Zet je dimlichten aan zodat je beter zichtbaar bent.",
          "Houd extra volgafstand en anticipeer op remmend verkeer.",
          "Zorg dat ruitenwissers goed werken en vervang ze op tijd.",
          "Houd je ruit schoon en gebruik sproeier/ventilatie om zicht te behouden (ook tegen beslaan).",
          "Is de regen zó heftig dat je zicht onvoldoende is? Verlaag je snelheid en stop desnoods veilig als doorrijden onverantwoord voelt.",
        ],
      },
      { type: "h2", text: "Conclusie" },
      {
        type: "p",
        text: "Aquaplaning is gevaarlijk omdat je tijdelijk grip en controle verliest. Door langzamer te rijden bij regen, je banden op orde te houden en plassen/sporen slim te vermijden, verklein je de kans aanzienlijk. Gebeurt het toch: blijf kalm, laat het gas los en stuur rustig totdat de grip terug is.",
      },
      { type: "cta", text: "Bekijk onze theorieles", href: "/theorieles" },
    ],
    imageSrc: "/blog/aquaplaningblog.png",
    publishedAt: "2026-05-06",
    readTimeMinutes: 6,
    tags: ["Veiligheid", "Tips", "Verkeersregels"],
  },
  {
    slug: "de-belangrijkste-verkeersborden-en-hun-betekenis",
    title: "De belangrijkste verkeersborden en hun betekenis",
    excerpt:
      "Verkeersborden zorgen voor veiligheid en duidelijkheid. Dit zijn de belangrijkste soorten borden (waarschuwing, voorrang, gebod, verbod en informatie) met voorbeelden en tips.",
    content: [
      {
        type: "p",
        text: "Bij Rijschool Vlam merken we dat verkeersborden voor veel beginnende bestuurders best even wennen zijn. Toch zijn ze onmisbaar: ze informeren, waarschuwen en geven aan wat je wel of juist niet mag doen. In dit artikel zetten we de belangrijkste verkeersborden op een rij, zodat jij met meer vertrouwen de weg op gaat.",
      },
      { type: "h2", text: "1. Waarschuwingsborden" },
      {
        type: "p",
        text: "Waarschuwingsborden attenderen je op mogelijke gevaren. Je herkent ze meestal aan de driehoekige vorm met rode rand en een pictogram in het midden.",
      },
      {
        type: "ul",
        items: [
          "Scherpe bocht naar links/rechts: er komt een scherpe bocht aan. Neem gas terug en houd je stuurbewegingen rustig.",
          "Overstekend wild: kans op overstekende dieren (bijv. in landelijke gebieden). Wees extra alert, vooral in de schemering.",
          "Glad wegdek: de weg kan glad zijn door regen, sneeuw of ijs. Houd meer afstand en vermijd abrupte remacties.",
        ],
      },
      { type: "h2", text: "2. Verkeersborden die voorrang regelen" },
      {
        type: "p",
        text: "Deze borden zorgen voor duidelijke afspraken op kruispunten en invoeg-/uitvoegsituaties. Ze helpen om conflicten en ongelukken te voorkomen.",
      },
      {
        type: "ul",
        items: [
          "Stopbord: je moet volledig stoppen (dus écht stilstand) en daarna pas doorrijden als het veilig is.",
          "Voorrang verlenen: je moet verkeer op de kruisende weg voor laten gaan.",
          "Voorrangsweg: je rijdt op een voorrangsweg; verkeer vanaf zijwegen moet jou voorrang geven.",
        ],
      },
      { type: "h2", text: "3. Gebodsborden" },
      {
        type: "p",
        text: "Gebodsborden geven aan wat je verplicht moet doen. Ze zijn meestal rond en blauw met een wit symbool.",
      },
      {
        type: "ul",
        items: [
          "Rechtdoor rijden verplicht: afslaan is niet toegestaan; je volgt de verplichte rijrichting.",
          "Richting volgen: je moet de richting van het bord volgen (bijvoorbeeld links- of rechtsaf).",
          "Minimumsnelheid: je moet minimaal de aangegeven snelheid aanhouden, zolang het veilig en toegestaan is.",
        ],
      },
      { type: "h2", text: "4. Verbodsborden" },
      {
        type: "p",
        text: "Verbodsborden geven beperkingen aan. Je herkent ze vaak aan een rode rand met een wit vlak en een symbool.",
      },
      {
        type: "ul",
        items: [
          "Inrijden verboden: je mag die weg niet inrijden vanaf die kant.",
          "Verboden te parkeren: parkeren is niet toegestaan op die plek (let ook op tijden/onderborden).",
          "Verboden in te halen: inhalen is op dat weggedeelte niet toegestaan.",
        ],
      },
      { type: "h2", text: "5. Informatieborden" },
      {
        type: "p",
        text: "Informatieborden helpen je met oriëntatie en voorzieningen. Ze zijn meestal rechthoekig en blauw met witte tekst of pictogrammen.",
      },
      {
        type: "ul",
        items: [
          "Huisartsenpost: geeft aan waar je een huisartsenpost kunt vinden.",
          "Parkeerplaats: geeft een (aanwezige) parkeervoorziening aan.",
          "Richtingaanwijzers: wijzen je de weg naar plaatsen, wijken of belangrijke routes.",
        ],
      },
      { type: "h2", text: "6. Overige borden die je echt moet kennen" },
      {
        type: "ul",
        items: [
          "Maximumsnelheid: de hoogst toegestane snelheid op dat weggedeelte.",
          "Einde van alle verboden: eerder opgelegde beperkingen (zoals snelheidslimiet/inhaalverbod) gelden vanaf daar niet meer, tenzij anders aangegeven.",
          "Fietsers en voetgangers: borden die aangeven waar je fietsers/voetgangers kunt verwachten of waar paden en oversteekplaatsen zijn.",
        ],
      },
      { type: "h2", text: "Waarom verkeersborden zo belangrijk zijn" },
      {
        type: "p",
        text: "Verkeersborden zijn er niet “voor de vorm”. Ze zorgen voor voorspelbaarheid in het verkeer: iedereen weet wat er verwacht wordt. En dat is precies wat de kans op gevaarlijke situaties verkleint. Daarnaast ben je verplicht borden op te volgen; negeren kan leiden tot boetes en – belangrijker – ongevallen.",
      },
      { type: "h2", text: "Hoe Rijschool Vlam je hierbij helpt" },
      {
        type: "p",
        text: "Tijdens de rijopleiding besteden we veel aandacht aan het herkennen en toepassen van verkeersborden. Niet alleen in de boeken, maar juist op de weg: zodat je leert kijken, plannen en op tijd reageren.",
      },
      { type: "h3", text: "Praktijkgerichte lessen" },
      {
        type: "p",
        text: "Je komt borden pas echt tegen in drukke straten, bij rotondes en op onbekende routes. In onze lessen koppelen we daarom theorie direct aan echte verkeerssituaties.",
      },
      { type: "h3", text: "Theoriecursussen" },
      {
        type: "p",
        text: "Wil je sneller grip krijgen op borden, regels en voorrangssituaties? Met een gerichte theorie-aanpak onthoud je de stof beter en herken je patronen sneller.",
      },
      { type: "h3", text: "Examentraining" },
      {
        type: "p",
        text: "Voor het theorie- én praktijkexamen is het essentieel dat je borden direct herkent en correct toepast. Met examentraining werk je gericht aan snelheid, inzicht en zekerheid.",
      },
      { type: "h2", text: "Conclusie" },
      {
        type: "p",
        text: "Wie verkeersborden begrijpt, rijdt rustiger, veiliger en zelfverzekerder. Door de betekenis van de belangrijkste borden te kennen en ze in de praktijk te herkennen, maak je het verkeer niet alleen makkelijker voor jezelf, maar ook veiliger voor iedereen om je heen.",
      },
      { type: "cta", text: "Bekijk onze theorieles", href: "/theorieles" },
    ],
    imageSrc: "/blog/verkeersbordenblog.png",
    publishedAt: "2026-05-06",
    readTimeMinutes: 6,
    tags: ["Theorie", "Verkeersregels"],
  },
  {
    slug: "ontdek-de-top-5-verkeersuitdagingen-in-utrecht",
    title: "Ontdek de Top 5 verkeersuitdagingen in Utrecht",
    excerpt:
      "Utrecht is levendig — en dat merk je op de weg. Dit zijn 5 veelvoorkomende verkeersuitdagingen (ring, centrum, A28 en meer) plus slimme tips om rustiger en efficiënter te rijden.",
    content: [
      {
        type: "p",
        text: "Utrecht is een van de meest bruisende steden van Nederland. Dat is geweldig voor de sfeer, maar het betekent ook: veel beweging op de weg. Rijd je regelmatig in en rond Utrecht, dan herken je vast momenten waarop alles ineens vastloopt. In deze blog nemen we de top 5 verkeersuitdagingen in Utrecht met je door én geven we praktische tips om slimmer te plannen en relaxter te rijden.",
      },
      { type: "h2", text: "Waarom slim navigeren zoveel verschil maakt" },
      {
        type: "p",
        text: "Slim navigeren is meer dan een route kiezen. Het gaat om timing, vooruitkijken en weten waar het druk kán worden. Met de juiste voorbereiding kun je vaak files, onnodige stress en last-minute beslissingen voorkomen.",
      },
      { type: "h2", text: "1. De Utrechtse Ring (A2, A12 en A27)" },
      {
        type: "p",
        text: "De ring rond Utrecht is berucht tijdens de spits: veel verkeer, veel in- en uitvoegbewegingen en daardoor regelmatig vertraging. Je merkt het vooral op doordeweekse ochtenden en aan het eind van de middag.",
      },
      {
        type: "ul",
        items: [
          "Probeer waar mogelijk buiten de spits te rijden (een half uur eerder/later scheelt vaak al).",
          "Overweeg een alternatieve route via lokale wegen als de ring stil staat.",
          "Check vlak voor vertrek een verkeersapp, zodat je niet “blind” de file in rijdt.",
        ],
      },
      { type: "h2", text: "2. Drukte in het centrum van Utrecht" },
      {
        type: "p",
        text: "Het centrum is mooi, maar ook intens: smalle straten, veel fietsers en voetgangers, bussen, laden/lossen en beperkte parkeerruimte. Een klein moment van twijfel kan hier al snel voor oponthoud zorgen.",
      },
      {
        type: "ul",
        items: [
          "Parkeer liever buiten het centrum en reis het laatste stuk met OV of fiets.",
          "Stel je navigatie zo in dat je drukke tijden en routes vermijdt.",
          "Houd extra rekening met fietsers die sneller kunnen opduiken dan je verwacht.",
        ],
      },
      { type: "h2", text: "3. De A28: drukte richting en langs Utrecht" },
      {
        type: "p",
        text: "De A28 is een belangrijke verbinding en kan op piekmomenten (weekenden, vakantieperiodes, evenementen) extra vol staan. Ook kleine verstoringen kunnen hier snel tot remgolven leiden.",
      },
      {
        type: "ul",
        items: [
          "Wees flexibel met je reistijd, zeker als je geen vaste aankomsttijd hebt.",
          "Gebruik live verkeersinformatie en laat je route zo nodig automatisch herberekenen.",
          "Rijd voorspelbaar: houd afstand en voorkom onnodige remacties (dat helpt ook de doorstroming).",
        ],
      },
      { type: "h2", text: "4. Stationsgebied en grote kruispunten (drukte & rijstrookkeuzes)" },
      {
        type: "p",
        text: "Rond het stationsgebied en grotere kruispunten is het vaak druk en dynamisch. Je krijgt te maken met meerdere rijstroken, bussen, taxi’s, fietsers en veel korte stops. Daardoor is het soms lastig om op tijd de juiste rijstrook te kiezen.",
      },
      {
        type: "ul",
        items: [
          "Kijk vroegtijdig naar borden en voorsorteerstroken — liever te vroeg dan te laat.",
          "Laat je niet opjagen: maak een veilige keuze, ook als je een afslag mist.",
          "Zorg voor rust in je hoofd: focus op één handeling tegelijk (kijken, spiegelen, richting, uitvoeren).",
        ],
      },
      { type: "h2", text: "5. Spitsuren in de stad: veel prikkels en wisselende situaties" },
      {
        type: "p",
        text: "In de spits voelt Utrecht soms als één grote stroom van prikkels. Je moet tegelijk letten op fietsers, oversteekplaatsen, bussen, tijdelijke wegwerkzaamheden en andere bestuurders die haast hebben. Juist dan is kalm en defensief rijden belangrijk.",
      },
      {
        type: "ul",
        items: [
          "Houd meer volgafstand dan je gewend bent; dat geeft je tijd om te reageren.",
          "Anticipeer: scan verder vooruit en let op remlichten en drukte rondom kruisingen.",
          "Kies voor rust: liever iets langzamer en vloeiend dan steeds optrekken en remmen.",
        ],
      },
      { type: "h2", text: "Rijvaardigheid opbouwen in druk verkeer (hoe Rijschool Vlam helpt)" },
      {
        type: "p",
        text: "Druk verkeer is te leren. Bij Rijschool Vlam trainen we niet alleen de basis, maar juist ook het rijden in stedelijke situaties: rustig blijven, vooruitkijken, slimme keuzes maken en veilig meebewegen met de verkeersstroom.",
      },
      { type: "h3", text: "Leer omgaan met verkeersdrukte" },
      {
        type: "p",
        text: "Tijdens rijlessen oefen je hoe je je positie kiest, hoe je soepel invoegt en hoe je het gedrag van anderen beter leert lezen — ook als het druk is.",
      },
      { type: "h3", text: "Verkeersregels toepassen in de praktijk" },
      {
        type: "p",
        text: "Regels kennen is één ding, ze toepassen tussen fietsers, bussen en drukke kruispunten is iets anders. We leggen uit waar je op let en hoe je beslissingen onder tijdsdruk toch veilig houdt.",
      },
      { type: "h3", text: "Oefenen in realistische situaties" },
      {
        type: "p",
        text: "Je leert rijstrookwissels, complexe kruisingen, voorsorteren en het herkennen van druktepatronen door het echt te doen — met begeleiding, feedback en herhaling.",
      },
      { type: "h3", text: "Focus op defensief rijden" },
      {
        type: "p",
        text: "Defensief rijden betekent vooruitdenken en ruimte creëren. Dat geeft jou controle en maakt je rijstijl comfortabeler, zeker in de spits.",
      },
      { type: "h2", text: "Conclusie" },
      {
        type: "p",
        text: "Utrecht blijft een geweldige stad, maar op de weg vraagt het soms om extra planning en rust. Als je weet waar de drukte vaak ontstaat en je rijvaardigheid meegroeit, rijd je een stuk ontspannen(er). Wil je daar gericht mee oefenen? Dan helpen we je graag.",
      },
      { type: "cta", text: "Bekijk onze theorieles", href: "/theorieles" },
    ],
    imageSrc: "/blog/verkeersuitdagingenutrecht.png",
    publishedAt: "2026-05-06",
    readTimeMinutes: 7,
    tags: ["Utrecht", "Tips", "Verkeersregels"],
  },
  {
    slug: "ik-ben-geslaagd-hoe-vraag-ik-mijn-rijbewijs",
    title: "Ik ben geslaagd, hoe vraag ik mijn rijbewijs?",
    excerpt:
      "Rijbewijs aanvragen in Utrecht: wat je nodig hebt, het stappenplan, belangrijke tips en de spoedaanvraag (kosten & ophaaltijden).",
    content: [
      { type: "h2", text: "Het aanvragen van een rijbewijs in Utrecht:" },
      { type: "h2", text: "Rijbewijs aanvragen in Utrecht" },
      {
        type: "p",
        text: "Wil je een rijbewijs aanvragen in Utrecht? Dat kan via de gemeente Utrecht of het wijkservicecentrum Vleuten-De Meern. In sommige gevallen kun je het ook online regelen via de website van de RDW.",
      },
      { type: "h2", text: "Wat heb je nodig?" },
      {
        type: "ul",
        items: [
          "Een geldig identiteitsbewijs (paspoort of ID-kaart)",
          "Een recente pasfoto die voldoet aan de eisen",
          "Eventueel een ingevulde verklaring van geschiktheid (bijvoorbeeld bij medische keuring)",
        ],
      },
      { type: "h2", text: "Stappenplan rijbewijs aanvragen" },
      { type: "h3", text: "Afspraak maken" },
      {
        type: "p",
        parts: [
          "Maak een afspraak bij de gemeente Utrecht of het wijkservicecentrum Vleuten-De Meern via de ",
          {
            type: "a",
            text: "officiële gemeentelijke website",
            href: "https://www.utrecht.nl/",
          },
          ".",
        ],
      },
      { type: "h3", text: "Online aanvraag via RDW (alleen in specifieke gevallen)" },
      {
        type: "p",
        parts: [
          "Voor een verlenging of het toevoegen van een categorie kun je dit soms online regelen via ",
          { type: "a", text: "www.rdw.nl", href: "https://www.rdw.nl/" },
          ", mits je aan de voorwaarden voldoet (zoals een geschikte pasfoto en recente aanvraag).",
        ],
      },
      { type: "h3", text: "Langs bij de gemeente" },
      {
        type: "p",
        text: "Ga op de afgesproken tijd naar het gemeentehuis met je identiteitsbewijs en pasfoto.",
      },
      { type: "h3", text: "Verklaring invullen" },
      {
        type: "p",
        text: "Indien nodig vul je een verklaring in bij de gemeente (bijvoorbeeld voor gezondheidsverklaringen via het CBR).",
      },
      { type: "h3", text: "Betalen" },
      { type: "p", text: "Betaal de kosten voor het rijbewijs tijdens je afspraak." },
      { type: "h3", text: "Rijbewijs ophalen" },
      {
        type: "p",
        text: "Je ontvangt een bericht zodra je rijbewijs klaar is. Kijk op de gemeentelijke website of je hiervoor een aparte afspraak moet maken.",
      },
      { type: "h2", text: "Belangrijke tips" },
      {
        type: "ul",
        items: [
          "Voor een eerste rijbewijs of wijzigingen die niet online kunnen, moet je altijd persoonlijk langs de gemeente.",
          "Vermijd websites die geld vragen voor het maken van afspraken. Maak je afspraak alleen via de officiële website van de gemeente Utrecht.",
          "Houd rekening met een verwerkingstijd van ongeveer 5 werkdagen.",
        ],
      },
      { type: "h2", text: "⚡ Spoedaanvraag rijbewijs: stappen & tijddetails" },
      { type: "h3", text: "Afspraak maken" },
      {
        type: "p",
        parts: [
          "Maak een afspraak via de website van de gemeente Utrecht of het wijkservicecentrum Vleuten-De Meern. Lukt dat niet online op tijd, bel dan naar 14 030 en vraag om spoed. ",
          {
            type: "a",
            text: "Loket digitaal Utrecht",
            href: "https://loket.digitaal.utrecht.nl/nl/products/rijbewijs-aanvragen-of-verlengen?utm_source=chatgpt.com",
          },
        ],
      },
      { type: "h3", text: "Documenten meenemen" },
      {
        type: "ul",
        items: [
          "Geldig identiteitsbewijs (paspoort, ID-kaart of verblijfsvergunning)",
          "Recente pasfoto (max. 6 maanden oud)",
          "Eventueel je oude rijbewijs (bij verlenging)",
          "Pinpas voor betaling.",
        ],
      },
      { type: "h3", text: "Aanvraag & betaling" },
      {
        type: "p",
        text: "Je doet de aanvraag aan de balie. De kosten zijn:",
      },
      {
        type: "ul",
        items: [
          "Normale aanvraag: ± €52,10",
          "Spoedtoeslag: + €39,65 (totaal ≈ €91,75)",
        ],
      },
      { type: "h3", text: "Verklaring invullen" },
      {
        type: "p",
        text: "Vul de nodige verklaring in bij de balie (bijv. bij verlies of medische verklaring).",
      },
      { type: "h3", text: "Ophalen spreekafspraken volgens tijdstip" },
      {
        type: "ul",
        items: [
          "Voor 14:00 uur aanvragen → vaak de volgende werkdag vanaf 12:00 uur ophalen mogelijk",
          "Na 14:00 uur aanvragen → tweede werkdag vanaf 12:00 uur",
        ],
      },
    ],
    imageSrc: "/blog/ikbengeslaagdblog.png",
    publishedAt: "2026-05-06",
    readTimeMinutes: 4,
    tags: ["Rijbewijs"],
  },
  {
    slug: "wat-moet-ik-doen-als-mijn-rijbewijs-is-gestolen-of-verloren",
    title:
      "Wat moet ik doen als mijn rijbewijs is gestolen of als ik hem heb verloren?",
    excerpt:
      "Rijbewijs kwijt of gestolen? Zo meld je de vermissing, vraag je een nieuw rijbewijs aan en weet je wat de wachttijd is.",
    content: [
      {
        type: "p",
        text: "Als je rijbewijs is gestolen of je bent het verloren, volg dan deze stappen:",
      },
      { type: "h2", text: "1. Melden van verlies of diefstal" },
      {
        type: "p",
        text: "Je moet het verlies of de diefstal van je rijbewijs zo snel mogelijk melden. Dit kan op twee manieren:",
      },
      { type: "h3", text: "Online bij de RDW" },
      {
        type: "ul",
        items: [
          [
            "Ga naar ",
            { type: "a", text: "www.rdw.nl", href: "https://www.rdw.nl/" },
            ".",
          ],
          "Zoek op “rijbewijs vermist melden”.",
          "Je logt in met DigiD.",
          "Na de melding wordt je rijbewijs direct ongeldig verklaard.",
        ],
      },
      { type: "h3", text: "Bij de gemeente" },
      {
        type: "ul",
        items: [
          "Je kunt het ook bij de gemeente waar je staat ingeschreven melden.",
          "Bij diefstal kan de gemeente vragen om een proces-verbaal van de politie.",
        ],
      },
      { type: "h2", text: "2. Nieuw rijbewijs aanvragen" },
      {
        type: "p",
        text: "Na de melding kun je meteen een nieuw rijbewijs aanvragen:",
      },
      {
        type: "ul",
        items: [
          "Dit doe je bij de gemeente.",
          "Neem een geldig legitimatiebewijs en een pasfoto mee die voldoet aan de eisen.",
          "Je betaalt ook leges (kosten voor het nieuwe document).",
        ],
      },
      { type: "h2", text: "3. Wachttijd" },
      {
        type: "ul",
        items: [
          "De verwerking duurt meestal 5 werkdagen.",
          "Soms kun je een spoedaanvraag doen; dan heb je het meestal de volgende werkdag.",
        ],
      },
      { type: "h2", text: "Extra tips" },
      {
        type: "ul",
        items: [
          "Bij diefstal: Doe altijd aangifte bij de politie, vooral als je vermoedt dat je gegevens misbruikt kunnen worden.",
          "Als je je rijbewijs weer terugvindt nadat je een nieuwe hebt aangevraagd, is het oude rijbewijs niet meer geldig.",
          "Laat het me weten als je hulp nodig hebt met de links of contactinformatie van jouw gemeente!",
        ],
      },
    ],
    imageSrc: "/blog/rijbewijsverloren.png",
    publishedAt: "2026-05-06",
    readTimeMinutes: 5,
    tags: ["Rijbewijs"],
  },
  {
    slug: "mag-je-straks-met-b-rijbewijs-zwaardere-autos-rijden",
    title: "Mag je straks met B-rijbewijs zwaardere auto’s rijden?",
    excerpt:
      "Vanaf 1 juli 2025 mag je onder voorwaarden met een B-rijbewijs bepaalde zero-emissie voertuigen tot 4.250 kg besturen. Dit zijn de belangrijkste punten en bronnen.",
    content: [
      {
        type: "p",
        text: "Ja, er zijn nieuwe ontwikkelingen betreffende het besturen van zwaardere voertuigen met een B-rijbewijs in Nederland. Vanaf 1 juli 2025 wordt het toegestaan om met een B-rijbewijs elektrische of waterstof aangedreven voertuigen tot 4.250 kg te besturen.",
      },
      { type: "h2", text: "Belangrijke punten" },
      {
        type: "ul",
        items: [
          [
            "Ingangsdatum: De regeling gaat in op 1 juli 2025. (",
            {
              type: "a",
              text: "Koninklijk Nederlands Vervoer",
              href: "https://www.knv.nl/waarschijnlijk-vanaf-1-juli-2025-met-b-rijbewijs-in-zwaarder-elektrisch-voertuig/#utm_source=chatgpt.com",
            },
            ")",
          ],
          [
            "Voertuigtypes: Het betreft uitsluitend zero-emissie voertuigen zoals elektrische of waterstof aangedreven bestelauto’s. (",
            {
              type: "a",
              text: "TTM.nl",
              href: "https://www.ttm.nl/nieuws/nieuwe-vrijstellingsregeling-voor-elektrische-bestelautos-start-1-juli-2023/148584/?utm_source=chatgpt.com",
            },
            ")",
          ],
          [
            "Gewichtsverhoging: De verhoging van de toegestane maximummassa van 3.500 kg naar 4.250 kg compenseert het extra gewicht van de accu’s in elektrische voertuigen. (",
            {
              type: "a",
              text: "Home",
              href: "/brief_van_de_minister_van_i_w_ter.pdf",
            },
            ")",
          ],
          [
            "Verkeersveiligheidscursus: Bestuurders moeten een aanvullende verkeersveiligheidscursus volgen om bewust te worden van de specifieke eigenschappen en risico’s van het rijden met zwaardere voertuigen. (",
            {
              type: "a",
              text: "Rijksoverheid",
              href: "https://www.rijksoverheid.nl/actueel/nieuws/2024/12/18/convenant-zorgt-voor-veiliger-gebruik-van-zware-duurzame-voertuigen-zoals-e-bestelautos?utm_source=chatgpt.com",
            },
            ")",
          ],
          [
            "Deze wijziging is bedoeld om de overstap naar duurzame voertuigen te vergemakkelijken en de inzet van elektrische bestelauto’s in stedelijke gebieden te bevorderen. (",
            {
              type: "a",
              text: "Fleet Mobility",
              href: "https://www.fleet-mobility.nl/fleet-mobility/grijs-beheer/2025/03/eu-richtlijn-aangenomen-e-bestelauto-tot-4-250-kilo-mag-met-b-rijbewijs-worden-bestuurd/?utm_source=chatgpt.com",
            },
            ")",
          ],
        ],
      },
      {
        type: "p",
        text: "Houd er rekening mee dat de exacte invulling van de verkeersveiligheidscursus en eventuele aanvullende voorwaarden nog door de Nederlandse overheid worden vastgesteld. Het is raadzaam om de officiële communicatie van de overheid en relevante instanties in de gaten te houden voor de meest actuele informatie.",
      },
    ],
    imageSrc: "/blog/b-rijbewijszwaar.png",
    publishedAt: "2026-05-06",
    readTimeMinutes: 6,
    tags: ["Regels"],
  },
  {
    slug: "wanneer-komt-het-digitale-rijbewijs",
    title: "Wanneer komt het digitale rijbewijs?",
    excerpt:
      "Het digitale rijbewijs wordt richting eind 2030 in de EU verwacht. Dit is wat het is, hoe het werkt en wat het voor jou betekent.",
    content: [
      {
        type: "p",
        parts: [
          "Het digitale rijbewijs wordt tegen eind 2030 in alle EU-lidstaten, waaronder Nederland, geïntroduceerd. Het digitale rijbewijs wordt naar verwachting vanaf 2030 ingevoerd in Nederland en de rest van de Europese Unie. Dit is het resultaat van een voorlopig akkoord tussen het Europees Parlement en de EU-lidstaten. (",
          {
            type: "a",
            text: "AutoWeek",
            href: "https://www.autoweek.nl/autonieuws/artikel/digitaal-rijbewijs-komt-eraan-pasje-straks-niet-meer-nodig/?utm_source=chatgpt.com",
          },
          ", ",
          {
            type: "a",
            text: "netherlands.representation.ec.europa.eu",
            href: "https://netherlands.representation.ec.europa.eu/nieuws/voorlopig-europees-akkoord-over-nieuwe-rijbewijsregels-zoals-rijbewijs-op-de-smartphone-2025-03-25_nl?utm_source=chatgpt.com",
          },
          ")",
        ],
      },
      { type: "h2", text: "Wat houdt het digitale rijbewijs in?" },
      {
        type: "ul",
        items: [
          [
            "Beschikbaarheid: Vanaf 2030 kun je een digitaal rijbewijs aanvragen, dat je op je smartphone kunt opslaan. (",
            {
              type: "a",
              text: "AutoWeek",
              href: "https://www.autoweek.nl/autonieuws/artikel/zo-gaat-het-nieuwe-digitale-rijbewijs-in-de-praktijk-werken/?utm_source=chatgpt.com",
            },
            ")",
          ],
          [
            "Geldigheid: Het digitale rijbewijs is 15 jaar geldig. Als het ook als identiteitsbewijs wordt gebruikt, zoals in Nederland, is het 10 jaar geldig. (",
            {
              type: "a",
              text: "AutoWeek",
              href: "https://www.autoweek.nl/autonieuws/artikel/digitaal-rijbewijs-komt-eraan-pasje-straks-niet-meer-nodig/?utm_source=chatgpt.com",
            },
            ")",
          ],
          [
            "Aanvraagprocedure: Waarschijnlijk verloopt de aanvraag via DigiD, vergelijkbaar met het huidige proces voor het fysieke rijbewijs. (",
            {
              type: "a",
              text: "AutoWeek",
              href: "https://www.autoweek.nl/autonieuws/artikel/zo-gaat-het-nieuwe-digitale-rijbewijs-in-de-praktijk-werken/?utm_source=chatgpt.com",
            },
            ")",
          ],
          [
            "Digitale portemonnee: Het digitale rijbewijs wordt opgeslagen in een speciale app, de Europese digitale wallet, die momenteel wordt ontwikkeld. (",
            {
              type: "a",
              text: "iBestuur",
              href: "https://ibestuur.nl/digitale-toekomst-eu/financieel/voorlopig-akkoord-over-digitaal-eu-rijbewijs?utm_source=chatgpt.com",
            },
            ")",
          ],
        ],
      },
      { type: "h2", text: "Wat betekent dit voor jou?" },
      {
        type: "ul",
        items: [
          [
            "Vrijwilligheid: Het gebruik van het digitale rijbewijs is vrijwillig; je kunt ook na 2030 een fysiek rijbewijs blijven aanvragen. (",
            {
              type: "a",
              text: "iPhoned",
              href: "https://www.iphoned.nl/nieuws/digitaal-rijbewijs-nederland/?utm_source=chatgpt.com",
            },
            ")",
          ],
          [
            "Privacy: Het digitale rijbewijs biedt meer controle over welke gegevens je deelt, wat de kans op fraude verkleint. (",
            {
              type: "a",
              text: "AutoWeek",
              href: "https://www.autoweek.nl/autonieuws/artikel/zo-gaat-het-nieuwe-digitale-rijbewijs-in-de-praktijk-werken/?utm_source=chatgpt.com",
            },
            ")",
          ],
          [
            "Praktische overwegingen: Bij een lege of verloren telefoon is het aan te raden een fysiek rijbewijs bij je te hebben, aangezien je verplicht bent een geldig identiteitsbewijs te kunnen tonen. (",
            {
              type: "a",
              text: "netherlands.representation.ec.europa.eu",
              href: "https://netherlands.representation.ec.europa.eu/nieuws/voorlopig-europees-akkoord-over-nieuwe-rijbewijsregels-zoals-rijbewijs-op-de-smartphone-2025-03-25_nl?utm_source=chatgpt.com",
            },
            ")",
          ],
        ],
      },
      { type: "h2", text: "Vooruitblik" },
      {
        type: "p",
        parts: [
          "De Nederlandse overheid werkt aan de NL ID-wallet, een digitale portemonnee waarin je straks je rijbewijs en andere officiële documenten kunt opslaan. De eerste versie wordt eind 2026 verwacht. (",
          {
            type: "a",
            text: "Digitale Overheid",
            href: "https://www.digitaleoverheid.nl/nieuws/eerste-versie-nederlandse-publieke-id-wallet-gereed/?utm_source=chatgpt.com",
          },
          ")",
        ],
      },
      {
        type: "p",
        parts: [
          "Kortom, vanaf 2030 kun je kiezen tussen een digitaal of fysiek rijbewijs. Het digitale rijbewijs biedt gemak en extra privacy, maar het is verstandig om altijd een alternatief bij de hand te hebben voor noodgevallen. (",
          {
            type: "a",
            text: "iPhoned",
            href: "https://www.iphoned.nl/nieuws/digitaal-rijbewijs-nederland/?utm_source=chatgpt.com",
          },
          ")",
        ],
      },
    ],
    imageSrc: "/blog/digitaalrijbewijs.png",
    publishedAt: "2026-05-06",
    readTimeMinutes: 4,
    tags: ["Rijbewijs"],
  },
  {
    slug: "omgaan-met-je-faalangst-tijdens-rijlessen-of-rijexamen",
    title: "Omgaan met je faalangst tijdens het rijlessen of rijexamen",
    excerpt:
      "Faalangst tijdens rijlessen of rijexamen? Met deze mentale technieken, ontspanningsoefeningen en praktische tips krijg je meer rust en vertrouwen.",
    content: [
      { type: "h2", text: "Faalangst en rijangst Utrecht" },
      {
        type: "p",
        text: "Faalangst kan een grote hindernis zijn, vooral als je je rijexamen moet afleggen of andere stressvolle situaties onder ogen moet zien. Gelukkig zijn er verschillende strategieën die je kunt gebruiken om beter met faalangst om te gaan. Hier zijn enkele tips:",
      },
      { type: "h2", text: "1. Begrijp je faalangst" },
      { type: "h3", text: "Identificeer de oorzaken" },
      {
        type: "ul",
        items: [
          "Herken Triggers: Probeer te achterhalen wat precies je faalangst veroorzaakt. Is het de angst om te falen voor anderen, de druk om te presteren, of een gebrek aan zelfvertrouwen?",
        ],
      },
      { type: "h3", text: "Begrijp de gevolgen" },
      {
        type: "ul",
        items: [
          "Effecten op je Lichaam: Faalangst kan fysieke symptomen veroorzaken zoals zweten, een snelle hartslag, en gespannen spieren. Het herkennen van deze symptomen kan je helpen ze beter te beheersen.",
        ],
      },
      { type: "h2", text: "2. Mentale technieken" },
      { type: "h3", text: "Positief denken" },
      {
        type: "ul",
        items: [
          "Vervang Negatieve Gedachten: Werk eraan om negatieve gedachten te vervangen door positieve en realistische gedachten. Zeg bijvoorbeeld tegen jezelf: “Ik ben goed voorbereid en ik kan dit.”",
        ],
      },
      { type: "h3", text: "Visualisatie" },
      {
        type: "ul",
        items: [
          "Succes Visualiseren: Visualiseer jezelf in de situatie waarin je succesvol bent. Dit kan helpen om je zelfvertrouwen te vergroten en je geest voor te bereiden op succes.",
        ],
      },
      { type: "h3", text: "Realistische doelen" },
      {
        type: "ul",
        items: [
          "Stel Bereikbare Doelen: Het stellen van kleine, haalbare doelen kan helpen om de druk te verminderen en je zelfvertrouwen op te bouwen naarmate je ze bereikt.",
        ],
      },
      { type: "h2", text: "3. Ontspanningstechnieken" },
      { type: "h3", text: "Ademhalingsoefeningen" },
      {
        type: "ul",
        items: [
          "Diepe Ademhaling: Adem diep in door je neus, houd je adem een paar seconden vast, en adem langzaam uit door je mond. Dit kan helpen om je hartslag te verlagen en je te kalmeren.",
        ],
      },
      { type: "h3", text: "Progressieve spierontspanning" },
      {
        type: "ul",
        items: [
          "Spanning en Ontspanning: Span elke spiergroep in je lichaam aan, houd de spanning een paar seconden vast, en ontspan dan. Werk van je tenen naar je hoofd om volledige ontspanning te bereiken.",
        ],
      },
      { type: "h3", text: "Mindfulness en meditatie" },
      {
        type: "ul",
        items: [
          "In het Moment Blijven: Mindfulness helpt je om in het moment te blijven en je niet te laten meeslepen door angstige gedachten over de toekomst of het verleden.",
        ],
      },
      { type: "h2", text: "4. Praktische voorbereiding" },
      { type: "h3", text: "Goede voorbereiding" },
      {
        type: "ul",
        items: [
          "Oefen Regelmatig: Zorg ervoor dat je goed voorbereid bent op de taak die je angst veroorzaakt. Bijvoorbeeld, als het gaat om je rijexamen, zorg ervoor dat je genoeg rijlessen hebt gehad en dat je je theorie goed kent.",
        ],
      },
      { type: "h3", text: "Proefexamens" },
      {
        type: "ul",
        items: [
          "Simuleer de Situatie: Neem deel aan proefexamens of oefensituaties. Dit helpt je om te wennen aan de omstandigheden en je zenuwen onder controle te houden.",
        ],
      },
      { type: "h2", text: "5. Professionele hulp" },
      { type: "h3", text: "Zoek professionele begeleiding" },
      {
        type: "ul",
        items: [
          "Cognitieve Gedragstherapie (CGT): CGT kan zeer effectief zijn bij het behandelen van faalangst. Een therapeut kan je helpen om negatieve gedachtenpatronen te herkennen en te veranderen.",
        ],
      },
      { type: "h3", text: "Faalangsttrainingen" },
      {
        type: "ul",
        items: [
          "Specifieke Cursussen: Sommige rijscholen en instellingen bieden speciale trainingen aan voor mensen met faalangst. Deze trainingen zijn gericht op het omgaan met angst in specifieke situaties, zoals het rijexamen.",
        ],
      },
      { type: "h2", text: "6. Steun van anderen" },
      { type: "h3", text: "Praat erover" },
      {
        type: "ul",
        items: [
          "Deel je Ervaringen: Praat met vrienden, familie, of andere vertrouwenspersonen over je faalangst. Het delen van je gevoelens kan helpen om de druk te verlichten en kan leiden tot waardevolle steun en advies.",
        ],
      },
      { type: "h3", text: "Ondersteuning van je instructeur" },
      {
        type: "ul",
        items: [
          "Betrek je Rijinstructeur: Als je angst hebt voor je rijexamen, praat dan met je rijinstructeur. Ze kunnen je specifieke tips en ondersteuning bieden om je te helpen je angst te beheersen.",
        ],
      },
      { type: "h2", text: "Tot slot" },
      {
        type: "p",
        text: "Faalangst is een veelvoorkomend probleem, maar met de juiste strategieën kun je leren om ermee om te gaan en je prestaties te verbeteren. Door mentale technieken, ontspanningsoefeningen, praktische voorbereiding, professionele hulp en steun van anderen te combineren, kun je je zelfvertrouwen vergroten en je angst verminderen. Het belangrijkste is om geduldig met jezelf te zijn en te onthouden dat het overwinnen van faalangst een proces is dat tijd kost.",
      },
    ],
    imageSrc: "/blog/faalangst.png",
    publishedAt: "2026-05-06",
    readTimeMinutes: 6,
    tags: ["Examen", "Mentale voorbereiding"],
  },
  {
    slug: "welke-rijles-pakketten-en-welke-prijzen-hoe-maak-je-de-juiste-keuze",
    title: "Welke rijles pakketten en welke prijzen: Hoe maak je de juiste keuze?",
    excerpt:
      "Zo kies je een rijlespakket dat past bij jouw ervaring, budget en planning — inclusief handige aandachtspunten over prijzen en pakketten.",
    content: [
      {
        type: "p",
        text: "Het kiezen van het juiste rijlespakket is een belangrijke stap in je rijopleiding. Het kan je helpen tijd en geld te besparen en ervoor zorgen dat je goed voorbereid bent op je rijexamen. Hier zijn enkele tips en richtlijnen om je te helpen bij het maken van de juiste keuze:",
      },
      { type: "h2", text: "1. Identificeer je behoeften" },
      {
        type: "ul",
        items: [
          "Ervaring: Heb je al enige rijervaring of begin je helemaal vanaf nul? Beginners hebben doorgaans meer lessen nodig dan mensen met enige rijervaring.",
          "Leren in een Automaat of Handgeschakelde Auto: Kies een rijschool die de juiste voertuigen aanbiedt op basis van jouw voorkeur.",
        ],
      },
      { type: "h2", text: "2. Vergelijk verschillende pakketten" },
      {
        type: "p",
        text: "Rijscholen bieden vaak verschillende pakketten aan. Hier zijn enkele veelvoorkomende opties:",
      },
      {
        type: "ul",
        items: [
          "Basis Pakket: Bevat meestal een aantal lessen en een praktijkexamen.",
          "Tussentijdse Toets Pakket: Inclusief een tussentijdse toets en lessen, wat kan helpen bij het voorbereiden op het uiteindelijke examen.",
          "Compleet Pakket: Een uitgebreide optie met veel lessen, een tussentijdse toets en het praktijkexamen.",
          "Spoedcursus Pakket: Voor degenen die snel hun rijbewijs willen halen, vaak intensievere lessen over een kortere periode.",
        ],
      },
      { type: "h2", text: "3. Kosten overwegen" },
      {
        type: "p",
        text: "De prijzen kunnen sterk variëren afhankelijk van de rijschool, het pakket en de regio. Hier zijn enkele prijscategorieën om op te letten:",
      },
      {
        type: "ul",
        items: [
          "Kosten per les: Gemiddeld tussen de €40 en €60 per uur.",
          "Kleine Pakketten: Variëren tussen de €600 en €1200 voor ongeveer 10 tot 20 lessen.",
          "Grote Pakketten: Variëren tussen de €1200 en €2500 voor 30 tot 40 lessen, inclusief examens.",
        ],
      },
      { type: "h2", text: "4. Vraag naar betalingsopties" },
      {
        type: "ul",
        items: [
          "Gespreide Betaling: Sommige rijscholen bieden gespreide betaling aan, wat handig kan zijn als je niet in één keer een groot bedrag wilt betalen.",
          "Kortingen: Informeer of er kortingen zijn voor het boeken van grotere pakketten of voor studenten.",
        ],
      },
      { type: "h2", text: "5. Proefles" },
      {
        type: "ul",
        items: [
          "Proefles Boeken: Boek een proefles om de rijschool, de instructeur en het voertuig te ervaren. Dit helpt je een beter geïnformeerde beslissing te maken.",
          "Eerste Indruk: Let op hoe comfortabel je je voelt met de instructeur en hoe goed de uitleg en begeleiding zijn.",
        ],
      },
      { type: "h2", text: "6. Lees recensies en aanbevelingen" },
      {
        type: "ul",
        items: [
          "Online Reviews: Bekijk online reviews op platforms zoals Google Reviews, Facebook en speciale rijschool beoordelingssites.",
          "Persoonlijke Aanbevelingen: Vraag vrienden, familie en kennissen naar hun ervaringen en aanbevelingen.",
        ],
      },
      { type: "h2", text: "7. Slagingspercentage" },
      {
        type: "p",
        text: "Slagingspercentage: Informeer naar het slagingspercentage van de rijschool. Een hoger slagingspercentage kan een indicatie zijn van de kwaliteit van de lessen en de effectiviteit van de instructeurs.",
      },
      { type: "h2", text: "8. Flexibiliteit en beschikbaarheid" },
      {
        type: "ul",
        items: [
          "Lesuren: Controleer of de rijschool flexibele lesuren aanbiedt die passen bij jouw schema.",
          "Ophaal- en Brengservice: Sommige rijscholen bieden een ophaal- en brengservice aan, wat handig kan zijn als je ver weg woont of een druk schema hebt.",
        ],
      },
      { type: "h2", text: "9. Kwaliteit van de instructeurs" },
      {
        type: "ul",
        items: [
          "Gekwalificeerde Instructeurs: Zorg ervoor dat de instructeurs gecertificeerd en ervaren zijn.",
          "Match: Kijk of je een goede klik hebt met de instructeur, omdat dit belangrijk is voor een effectieve leerervaring.",
        ],
      },
      { type: "h2", text: "Voorbeeld van rijlespakketten en prijzen" },
      {
        type: "p",
        text: "Hier is een hypothetisch voorbeeld van verschillende rijlespakketten en hun prijzen:",
      },
      {
        type: "ul",
        items: [
          "Basispakket (10 lessen + praktijkexamen): €750",
          "Tussentijdse Toets Pakket (20 lessen + tussentijdse toets + praktijkexamen): €1400",
          "Compleet Pakket (30 lessen + tussentijdse toets + praktijkexamen): €2000",
          "Spoedcursus (25 lessen binnen 2 weken + praktijkexamen): €1800",
        ],
      },
      { type: "h2", text: "Conclusie" },
      {
        type: "p",
        text: "Het kiezen van het juiste rijlespakket hangt af van je ervaring, je leerstijl, je budget en je persoonlijke voorkeuren. Door proeflessen te nemen, recensies te lezen en prijzen te vergelijken, kun je een weloverwogen beslissing te maken die je helpt je rijbewijs efficiënt en kosteneffectief te behalen.",
      },
    ],
    imageSrc: "/blog/welkerijlespakket.png",
    publishedAt: "2026-05-06",
    readTimeMinutes: 5,
    tags: ["Tarieven"],
  },
  {
    slug: "het-vernieuwde-theorie-examen-voor-het-b-rijbewijs-vanaf-7-april-2025",
    title: "Het vernieuwde theorie-examen voor het B-rijbewijs vanaf 7 april 2025",
    excerpt:
      "Vanaf 7 april 2025 heeft het CBR een vernieuwd theorie-examen voor het B-rijbewijs. Dit zijn de belangrijkste veranderingen en wat het voor jou betekent.",
    content: [
      {
        type: "p",
        text: "Bij Rijschool Vlam houden we je altijd op de hoogte van de nieuwste ontwikkelingen op het gebied van rijopleidingen. Vanaf 7 april 2025 voert het CBR een vernieuwd theorie-examen in voor het B-rijbewijs. Dit betekent een aantal veranderingen in de manier waarop het examen wordt afgenomen. In dit artikel leggen we uit wat er precies verandert en hoe jij je hierop kunt voorbereiden.",
      },
      { type: "h2", text: "Wat verandert er aan het theorie-examen?" },
      { type: "p", text: "Het vernieuwde theorie-examen bestaat uit:" },
      {
        type: "ul",
        items: [
          "50 vragen in één doorlopend examen – In plaats van de huidige 65 vragen, waarbij de onderdelen kennis, inzicht en gevaarherkenning apart werden getoetst, wordt nu alles geïntegreerd.",
          "Één uitslag – Kandidaten krijgen pas aan het einde van het examen te zien of ze geslaagd of gezakt zijn.",
          "Nieuwe cesuur – Om te slagen moet je minstens 44 van de 50 vragen goed beantwoorden.",
          "Evenveel examentijd – Je krijgt 30 minuten om het examen te maken. Voor examens met extra tijd, een individueel begeleid examen of een examen met tolk blijft dit 45 minuten.",
          "Dynamische animaties – Voor sommige vragen worden korte animatiefilmpjes gebruikt om realistische verkeerssituaties beter te schetsen. Hiermee wordt ook gevaarherkenning op een natuurlijke manier getoetst.",
        ],
      },
      { type: "h2", text: "Wordt het examen moeilijker?" },
      {
        type: "p",
        text: "Nee, het vernieuwde examen is niet per se moeilijker of makkelijker. De examenstof blijft hetzelfde en het examen toetst nog steeds of je de verkeersregels en -situaties goed begrijpt en kunt toepassen. De verandering zit vooral in de manier waarop de vragen worden aangeboden en beoordeeld.",
      },
      { type: "h2", text: "Hoe bereid je je goed voor?" },
      {
        type: "p",
        text: "Bij Rijschool Vlam raden we onze leerlingen aan om tijdig te beginnen met studeren en gebruik te maken van een leermethode die bij hen past. Hier zijn enkele tips:",
      },
      {
        type: "ul",
        items: [
          "Gebruik geactualiseerd lesmateriaal – Zorg ervoor dat je oefent met de nieuwste theorieboeken en online oefenexamens die aansluiten op het vernieuwde examen.",
          "Oefen met praktijkvoorbeelden – Animaties en filmpjes helpen om verkeerssituaties beter te begrijpen. Zoek naar studiemateriaal dat deze gebruikt.",
          "Leer in kleine stappen – Verdeel de leerstof over meerdere dagen en herhaal regelmatig om de kennis beter te onthouden.",
          "Doe oefenexamens – Door regelmatig oefenexamens te maken, raak je vertrouwd met de nieuwe vraagstelling en toetsvorm.",
        ],
      },
      { type: "h2", text: "Waarom deze verandering?" },
      {
        type: "p",
        text: "Het CBR wil met deze aanpassing de effectiviteit van het examen verbeteren en beter toetsen of kandidaten de verkeersregels en -situaties goed begrijpen. Door het integreren van de verschillende onderdelen en het gebruik van animaties wordt het examen realistischer en sluit het beter aan op de praktijk.",
      },
      { type: "h2", text: "Rijschool Vlam helpt je slagen!" },
      {
        type: "p",
        text: "Bij Rijschool Vlam zorgen we ervoor dat je optimaal bent voorbereid op het vernieuwde theorie-examen. We bieden actuele lesmaterialen en ondersteunen je bij het leren. Wil je meer weten of je inschrijven voor theorielessen? Neem dan contact met ons op!",
      },
      { type: "cta", text: "Bekijk onze theorieles", href: "/theorieles" },
      {
        type: "p",
        text: "Blijf op de hoogte van de nieuwste ontwikkelingen en bereid je goed voor met Rijschool Vlam. Samen zorgen we ervoor dat jij in één keer slaagt!",
      },
    ],
    imageSrc: "/blog/vernieuwdetheorie.png",
    publishedAt: "2026-05-06",
    readTimeMinutes: 7,
    tags: ["Theorie"],
  },
  {
    slug: "autorijden-onder-invloed-van-drugs-een-groot-risico-op-de-weg",
    title: "Autorijden Onder Invloed van Drugs: Een Groot Risico op de Weg",
    excerpt:
      "Drugs achter het stuur is levensgevaarlijk én strafbaar. Lees de effecten per middel, de gevolgen, detectietijden en tips om veilig thuis te komen.",
    content: [
      {
        type: "p",
        text: "Autorijden vereist volledige concentratie en snelle reacties. Autorijden onder invloed van drugs wordt dit vermogen ernstig aangetast, met alle gevaren van dien. In deze blog bespreken we de effecten van drugs op rijgedrag, de juridische gevolgen en hoe we samen kunnen bijdragen aan veiliger verkeer",
      },
      { type: "h2", text: "De gevaren van drugs achter het stuur" },
      {
        type: "p",
        text: "Drugs hebben verschillende effecten op lichaam en geest, afhankelijk van het type en de hoeveelheid die je gebruikt. Hieronder vind je een overzicht van hoe de meest voorkomende drugs je rijvaardigheid beïnvloeden:",
      },
      { type: "h3", text: "1. Cannabis (wiet, hasj)" },
      {
        type: "ul",
        items: [
          "Effect op rijgedrag: Verminderde concentratie, vertraagde reacties, slechter inschatten van snelheid en afstand.",
          "Risico: Zelfs enkele uren na gebruik kunnen de effecten nog merkbaar zijn.",
        ],
      },
      { type: "h3", text: "2. Cocaïne en andere stimulerende middelen" },
      {
        type: "ul",
        items: [
          "Effect op rijgedrag: Overmoed, agressief rijgedrag, verhoogde hartslag en vermoeidheid na de “high”.",
          "Risico: Kans op gevaarlijk rijgedrag door overschatting van eigen kunnen.",
        ],
      },
      { type: "h3", text: "3. XTC (MDMA)" },
      {
        type: "ul",
        items: [
          "Effect op rijgedrag: Verminderde focus, visuele verstoringen, hallucinaties en een verhoogd risico op oververmoeidheid.",
          "Risico: De kans op fouten neemt toe, vooral op lange ritten of in druk verkeer.",
        ],
      },
      { type: "h3", text: "4. Kalmeringsmiddelen en GHB" },
      {
        type: "ul",
        items: [
          "Effect op rijgedrag: Slaperigheid, verminderde coördinatie en verwardheid.",
          "Risico: Bij hogere doses kun je zelfs buiten bewustzijn raken.",
        ],
      },
      { type: "h3", text: "5. Hallucinogenen (LSD, paddo’s)" },
      {
        type: "ul",
        items: [
          "Effect op rijgedrag: Verstoorde waarneming van de realiteit, hallucinaties, en verlies van controle.",
          "Risico: Extreem gevaarlijk, omdat je niet meer adequaat op verkeerssituaties kunt reageren.",
        ],
      },
      { type: "h2", text: "De juridische gevolgen van drugs in het verkeer" },
      {
        type: "p",
        text: "In Nederland is het verboden om onder invloed van drugs te rijden. Sinds 2017 worden grenswaarden voor drugs in het verkeer strikt gehandhaafd, vergelijkbaar met alcoholpromillages.",
      },
      { type: "h3", text: "Wat gebeurt er als je gepakt wordt?" },
      {
        type: "ul",
        items: [
          "Drugscontrole: De politie kan een speekseltest afnemen als ze vermoeden dat je onder invloed bent.",
          "Bloedonderzoek: Als de speekseltest positief is, wordt er bloed afgenomen om de hoeveelheid drugs vast te stellen.",
          "Straf:",
          "Boete: Hoge geldboetes, afhankelijk van de situatie.",
          "Rijbewijs kwijt: In sommige gevallen kan je rijbewijs direct worden ingenomen.",
          [
            { type: "a", text: "Strafblad", href: "https://www.rijksoverheid.nl/onderwerpen/verkeersveiligheid/vraag-en-antwoord/drugs-in-het-verkeer#:~:text=Bij%20combinatiegebruik%20gelden%20nullimieten%20voor,hoeveelheid%20maakt%20daarbij%20niet%20uit." },
            ": Drugsgebruik in het verkeer kan leiden tot een strafblad, wat gevolgen heeft voor je werk of reizen naar het buitenland.",
          ],
        ],
      },
      { type: "h2", text: "Hoe lang blijven drugs in je lichaam?" },
      {
        type: "p",
        text: "De tijd dat drugs in je lichaam detecteerbaar zijn, verschilt per middel:",
      },
      {
        type: "ul",
        items: [
          "Cannabis: Enkele uren tot meerdere dagen (afhankelijk van gebruik).",
          "Cocaïne: 1 tot 2 dagen.",
          "XTC en amfetaminen: 1 tot 3 dagen.",
          "GHB: 6 tot 12 uur.",
          "LSD: Tot 24 uur.",
        ],
      },
      {
        type: "p",
        text: "Let op: zelfs als je je niet meer “stoned” of “high” voelt, kunnen reststoffen in je lichaam achterblijven die je rijvaardigheid beïnvloeden.",
      },
      { type: "h2", text: "Waarom is drugs en autorijden zo gevaarlijk?" },
      {
        type: "p",
        text: "Het combineren van drugs en autorijden verhoogt de kans op ongelukken aanzienlijk. Dit komt door:",
      },
      {
        type: "ul",
        items: [
          "Verstoorde reacties: Je reageert trager op onverwachte situaties.",
          "Verkeerde inschattingen: Afstanden en snelheden worden niet goed waargenomen.",
          "Risicovol gedrag: Sommige drugs geven een vals gevoel van zelfvertrouwen, wat leidt tot gevaarlijk rijgedrag.",
        ],
      },
      {
        type: "p",
        text: "Uit onderzoek blijkt dat rijden onder invloed van drugs je kans op een ongeluk tot wel 10 keer vergroot, afhankelijk van het type drug.",
      },
      { type: "h2", text: "Hoe voorkom je rijden onder invloed?" },
      {
        type: "ul",
        items: [
          "Plan vooruit: Als je van plan bent om drugs te gebruiken, zorg voor een alternatieve manier om thuis te komen, zoals een taxi of een Bob.",
          "Zeg “nee” tegen groepsdruk: Laat je niet overhalen om te rijden als je onder invloed bent.",
          "Ken de gevaren: Wees je bewust van de risico’s, zowel voor jezelf als voor anderen.",
        ],
      },
      { type: "h2", text: "Conclusie" },
      {
        type: "p",
        text: "Autorijden onder invloed van drugs is niet alleen illegaal, maar ook levensgevaarlijk. Of je nu cannabis, cocaïne of andere drugs gebruikt, het effect op je rijvaardigheid kan desastreus zijn. Veilig verkeer begint bij verantwoordelijkheid nemen. Laat de auto staan als je drugs hebt gebruikt en moedig anderen aan om hetzelfde te doen.",
      },
    ],
    imageSrc: "/blog/autorijdenonderinvloed.png",
    publishedAt: "2026-05-06",
    readTimeMinutes: 6,
    tags: ["Veiligheid", "Regels"],
  },
  {
    slug: "medicijnen-en-autorijden-wat-mag-wel-en-wat-mag-niet",
    title: "Medicijnen en Autorijden: Wat Mag Wel en Wat Mag Niet?",
    excerpt:
      "Medicijnen kunnen je concentratie en reacties beïnvloeden. Lees welke medicijngroepen risico geven, wanneer je beter niet rijdt en wat je kunt doen bij twijfel.",
    content: [
      {
        type: "p",
        text: "Autorijden is een activiteit waarbij concentratie, reactievermogen en coördinatie essentieel zijn. Medicijnen kunnen echter een grote invloed hebben op deze vaardigheden. In deze blog bespreken we welke medicijnen autorijden beïnvloeden, welke medicijnen verboden zijn tijdens het rijden en hoe je kunt bepalen of je veilig de weg op kunt.",
      },
      { type: "h2", text: "Hoe beïnvloeden medicijnen het autorijden?" },
      {
        type: "p",
        text: "Sommige medicijnen hebben bijwerkingen die je rijvaardigheid kunnen verminderen. Denk hierbij aan:",
      },
      {
        type: "ul",
        items: [
          "Verminderde concentratie",
          "Vertraging van het reactievermogen",
          "Slaperigheid of sufheid",
          "Verminderde coördinatie of balans",
          "Wazig zicht",
        ],
      },
      {
        type: "p",
        text: "Deze effecten verhogen het risico op ongelukken en maken autorijden gevaarlijk, zowel voor jezelf als voor anderen.",
      },
      { type: "h2", text: "Medicijngroepen die je rijvaardigheid kunnen beïnvloeden" },
      {
        type: "p",
        text: "Hieronder een overzicht van medicijnen die vaak invloed hebben op autorijden:",
      },
      { type: "h3", text: "1. Kalmeringsmiddelen en slaapmiddelen" },
      {
        type: "p",
        text: "Voorbeelden: benzodiazepinen zoals diazepam, temazepam en lorazepam.",
      },
      {
        type: "ul",
        items: [
          "Deze medicijnen worden vaak voorgeschreven bij angst, slapeloosheid of stress.",
          "Bijwerking: sufheid en vertraagd reactievermogen.",
          "Advies: Vermijd autorijden gedurende minimaal 24 uur na inname.",
        ],
      },
      { type: "h3", text: "2. Pijnstillers (opioïden)" },
      { type: "p", text: "Voorbeelden: morfine, oxycodon, tramadol." },
      {
        type: "ul",
        items: [
          "Sterke pijnstillers kunnen slaperigheid veroorzaken en het beoordelingsvermogen beïnvloeden.",
          "Advies: Controleer altijd de bijsluiter of overleg met je arts.",
        ],
      },
      { type: "h3", text: "3. Antidepressiva en antipsychotica" },
      { type: "p", text: "Voorbeelden: amitriptyline, sertraline en haloperidol." },
      {
        type: "ul",
        items: [
          "Deze medicijnen kunnen duizeligheid en concentratieproblemen veroorzaken, vooral in de eerste weken van gebruik.",
          "Advies: Let extra op bij nieuwe medicatie en bespreek je rijgeschiktheid met je arts.",
        ],
      },
      { type: "h3", text: "4. Allergiemedicatie (antihistaminica)" },
      { type: "p", text: "Voorbeelden: cetirizine, loratadine, difenhydramine." },
      {
        type: "ul",
        items: [
          "Oudere antihistaminica, zoals difenhydramine, maken je slaperig. Nieuwere varianten hebben dit effect vaak minder.",
          "Advies: Kies waar mogelijk voor een niet-sederend antihistaminicum.",
        ],
      },
      { type: "h3", text: "5. Medicatie tegen epilepsie en neurologische aandoeningen" },
      { type: "p", text: "Voorbeelden: carbamazepine, valproïnezuur." },
      {
        type: "ul",
        items: [
          "Deze medicijnen kunnen duizeligheid of sufheid veroorzaken.",
          "Advies: Overleg met je arts; soms wordt autorijden afgeraden.",
        ],
      },
      { type: "h2", text: "Met welke medicijnen mag je wel autorijden?" },
      {
        type: "p",
        text: "Niet alle medicijnen hebben een negatieve invloed op je rijvaardigheid. Veel medicijnen tegen hoge bloeddruk, diabetes, of cholesterol hebben bijvoorbeeld geen directe impact. Toch is het belangrijk om de bijsluiter te lezen, omdat individuele reacties kunnen verschillen.",
      },
      { type: "h2", text: "Wat kun je doen?" },
      {
        type: "ul",
        items: [
          "Lees de bijsluiter: Zoek naar waarschuwingen over autorijden. Vaak staat er een geel waarschuwingssymbool op de verpakking.",
          "Overleg met je arts of apotheek: Vraag of je medicatie rijgeschikt is en of er alternatieven zijn.",
          "Probeer de medicatie thuis: Kijk hoe je lichaam reageert voordat je achter het stuur kruipt.",
        ],
      },
      { type: "h2", text: "Medicijnen waarmee je niet mag rijden" },
      {
        type: "p",
        text: "Als er op de verpakking een geel waarschuwingssticker zit, is voorzichtigheid geboden. In sommige gevallen is autorijden volledig verboden. Dit geldt met name voor:",
      },
      {
        type: "ul",
        items: [
          "Sterke slaapmiddelen (zoals zolpidem).",
          "Hoge doses kalmeringsmiddelen.",
          "Combinatie van medicijnen met alcohol.",
        ],
      },
      {
        type: "p",
        text: "Bij twijfel kun je de CBR-regels of de rijgeschiktheidseisen van je medicatie raadplegen.",
      },
      { type: "h2", text: "Wat zijn de gevolgen van rijden onder invloed van medicatie?" },
      {
        type: "p",
        text: "Als je met medicijnen rijdt die je rijvaardigheid beïnvloeden, kun je juridisch aansprakelijk worden gesteld bij ongelukken. Je kunt een boete krijgen, je rijbewijs verliezen of zelfs strafrechtelijk vervolgd worden.",
      },
      { type: "h2", text: "Conclusie" },
      {
        type: "p",
        text: "Het gebruik van medicijnen en autorijden gaat niet altijd samen. Om veilig deel te nemen aan het verkeer:",
      },
      {
        type: "ul",
        items: [
          "Lees altijd de bijsluiter van je medicijnen.",
          "Raadpleeg je arts of apotheker bij twijfel.",
          "Test hoe je reageert op nieuwe medicatie voordat je gaat rijden.",
        ],
      },
      {
        type: "p",
        text: "Veiligheid gaat boven alles. Als je medicatie gebruikt die invloed heeft op je rijgedrag, is het verstandig om alternatieven te overwegen of een andere vervoerswijze te kiezen.",
      },
    ],
    imageSrc: "/blog/medicijnen.png",
    publishedAt: "2026-05-06",
    readTimeMinutes: 6,
    tags: ["Veiligheid", "Regels"],
  },
  {
    slug: "autorijden-zonder-rijbewijs-de-gevolgen-en-boetes-in-nederland",
    title: "Autorijden Zonder Rijbewijs: De Gevolgen en Boetes in Nederland",
    excerpt:
      "Rijden zonder rijbewijs is verboden en kan grote gevolgen hebben: boetes, verzekeringsproblemen en zelfs strafrechtelijke maatregelen. Dit zijn de belangrijkste risico’s.",
    content: [
      {
        type: "p",
        parts: [
          "Autorijden is een van de meest voorkomende manieren om je te verplaatsen in Nederland, maar het brengt ook een grote verantwoordelijkheid met zich mee. Het behalen van een rijbewijs is een essentieel onderdeel van die verantwoordelijkheid. Toch zijn er mensen die ervoor kiezen om zonder rijbewijs achter het stuur te stappen. Wat zijn de gevolgen? Hoeveel boete kun je verwachten? In deze blog duiken we in de risico’s, juridische consequenties, en financiële sancties van autorijden zonder ",
          {
            type: "a",
            text: "rijbewijs",
            href: "https://www.ingevorderd-rijbewijs.nl/komt-er-cbr-ontzegging-bij-na-rijden-zonder-rijbewijs/",
          },
          ".",
        ],
      },
      { type: "h2", text: "Waarom is een rijbewijs zo belangrijk?" },
      {
        type: "p",
        text: "Een rijbewijs is niet zomaar een document; het is een bewijs dat je beschikt over de kennis, vaardigheden en het inzicht om een voertuig veilig te besturen. Het toont aan dat je verkeersregels kent, verantwoordelijk kunt handelen, en in staat bent om adequaat te reageren op verschillende situaties op de weg.",
      },
      {
        type: "p",
        text: "Autorijden zonder rijbewijs brengt niet alleen jezelf in gevaar, maar ook andere weggebruikers. Je mist immers de officiële bevestiging dat je geschikt bent om veilig deel te nemen aan het verkeer.",
      },
      { type: "h2", text: "Wat zegt de wet?" },
      {
        type: "p",
        text: "In Nederland is het verboden om een motorvoertuig te besturen zonder geldig rijbewijs. Dit staat beschreven in artikel 107 van de Wegenverkeerswet 1994. Er zijn verschillende scenario’s waarin iemand zonder rijbewijs kan rijden, bijvoorbeeld:",
      },
      {
        type: "ul",
        items: [
          "Je hebt nog nooit een rijbewijs gehaald.",
          "Je rijbewijs is verlopen.",
          "Je rijbewijs is ingenomen door de politie of het CBR.",
        ],
      },
      {
        type: "p",
        text: "In al deze gevallen ben je strafbaar en kun je te maken krijgen met forse sancties.",
      },
      { type: "h2", text: "Wat zijn de gevolgen?" },
      {
        type: "p",
        text: "Autorijden zonder rijbewijs heeft ernstige juridische, financiële en zelfs persoonlijke consequenties. Hieronder een overzicht:",
      },
      { type: "h3", text: "1. Boetes en financiële sancties" },
      {
        type: "p",
        text: "De boete voor het rijden zonder rijbewijs in Nederland kan oplopen. In 2025 bedraagt de standaardboete:",
      },
      {
        type: "ul",
        items: [
          "€410: Als je nooit een rijbewijs hebt gehaald.",
          "€340: Als je rijbewijs is verlopen, maar je ooit wel een rijbewijs hebt gehad.",
        ],
      },
      {
        type: "p",
        text: "Deze bedragen zijn exclusief eventuele administratiekosten. Het niet kunnen tonen van je rijbewijs bij een controle (maar wel een geldig rijbewijs hebben) is een lichtere overtreding, met een boete van ongeveer €110.",
      },
      { type: "h3", text: "2. Strafblad" },
      {
        type: "p",
        text: "Rijden zonder rijbewijs kan worden geregistreerd op je strafblad, vooral als het niet de eerste keer is of als er sprake is van herhaaldelijk gevaarlijk rijgedrag of rijden onder invloed. Dit kan invloed hebben op je toekomst, bijvoorbeeld bij het aanvragen van een Verklaring Omtrent het Gedrag (VOG).",
      },
      { type: "h3", text: "3. Verzekeringsproblemen" },
      {
        type: "p",
        text: "Als je zonder rijbewijs betrokken raakt bij een ongeval, ben je niet verzekerd. De verzekeringsmaatschappij zal de schade niet dekken, en jij draait op voor alle kosten – inclusief die van eventuele andere betrokkenen. Dit kan in de duizenden euro’s lopen.",
      },
      { type: "h3", text: "4. Inbeslagname van het voertuig" },
      {
        type: "p",
        text: "De politie heeft het recht om het voertuig waarmee je rijdt in beslag te nemen, vooral als je meerdere keren betrapt bent. Dit kan tot aanzienlijke extra kosten en veel ongemak leiden.",
      },
      { type: "h3", text: "5. Mogelijke gevangenisstraf" },
      {
        type: "p",
        text: "In voorkomende gevallen kan de rechter een (voorwaardelijke) gevangenisstraf opleggen. Dit gebeurt vaker als je herhaaldelijk in de fout gaat of als er sprake is van aanvullende zware overtredingen.",
      },
      { type: "h2", text: "Waarom mensen zonder rijbewijs rijden" },
      {
        type: "p",
        text: "Hoewel het logisch lijkt om pas te gaan rijden nadat je een rijbewijs hebt behaald, zijn er mensen die toch de regels overtreden. Mogelijke redenen hiervoor zijn:",
      },
      {
        type: "ul",
        items: [
          "Onwetendheid: Sommige mensen onderschatten de ernst van de overtreding.",
          "Praktische redenen: Bijvoorbeeld in noodgevallen.",
          "Kosten: Het halen van een rijbewijs kan duur zijn, en sommige mensen proberen de regels te omzeilen.",
          "Risico’s onderschatten: Mensen gaan ervan uit dat ze niet betrapt zullen worden.",
        ],
      },
      {
        type: "p",
        text: "Hoewel deze redenen voor sommige mensen logisch lijken, wegen ze absoluut niet op tegen de gevolgen.",
      },
      { type: "h2", text: "Hoe kun je problemen voorkomen?" },
      {
        type: "ul",
        items: [
          "Behaal je rijbewijs voordat je gaat rijden. Volg lessen bij een erkende rijschool en doe je theorie- en praktijkexamen.",
          "Controleer de geldigheid van je rijbewijs. Verleng je rijbewijs op tijd om te voorkomen dat het verloopt.",
          "Houd je aan de regels. Ook als je ooit een rijbewijs had dat nu verlopen is, moet je dit vernieuwen voordat je de weg op gaat.",
          "Neem verantwoordelijkheid. Autorijden zonder rijbewijs brengt onnodige risico’s met zich mee, niet alleen voor jou maar ook voor anderen.",
        ],
      },
      { type: "h2", text: "Tot slot" },
      {
        type: "p",
        text: "Autorijden zonder rijbewijs is niet alleen illegaal, maar ook gevaarlijk en duur. De boetes kunnen flink oplopen, en de gevolgen gaan verder dan alleen een financiële straf. Denk aan mogelijke schadeclaims, een strafblad, of zelfs een gevangenisstraf.",
      },
      {
        type: "p",
        text: "Het goede nieuws? Het is allemaal te vermijden door een paar eenvoudige regels te volgen. Het behalen en onderhouden van een geldige rijbevoegdheid is niet alleen een wettelijke plicht, maar ook een teken van verantwoordelijkheid en respect voor andere weggebruikers.",
      },
      {
        type: "p",
        text: "Heb jij je rijbewijs nog niet behaald? Begin dan vandaag nog, en zorg ervoor dat je veilig en juridisch de weg op gaat. Het is de enige juiste manier om autorijden zonder zorgen te ervaren.",
      },
    ],
    imageSrc: "/blog/autorijdenzonderrijbewijs.png",
    publishedAt: "2026-05-06",
    readTimeMinutes: 6,
    tags: ["Regels"],
  },
] as const;

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export async function getBlogPostBySlugWithFallback(
  slug: string,
): Promise<BlogPost | undefined> {
  try {
    const node = await getCmsBlogPostBySlug(slug);
    if (node) {
      const mapped = mapCmsBlogPostToDetail(node);
      if (mapped) {
        return mapped;
      }
    }
  } catch {
    // CMS onbereikbaar of query mislukt → statische post
  }

  return getBlogPostBySlug(slug);
}

export async function getBlogPostsForOverviewWithFallback(): Promise<BlogPost[]> {
  try {
    const nodes = await getBlogPosts();
    const mapped = mapCmsBlogPostsToListItems(nodes);
    if (mapped.length > 0) {
      return mapped;
    }
  } catch {
    // CMS onbereikbaar of query mislukt → statische lijst
  }

  return [...BLOG_POSTS];
}

