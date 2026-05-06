import { LESSON_PRICE_EUR } from "@/lib/constants";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  answerImage?: {
    src: string;
    alt: string;
  };
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "lesduur-utrecht",
    question: "Hoelang duurt de rijlessen bij autorijschool Vlam?",
    answer:
      "Bij Rijschool Vlam duurt een standaardrijles 60 minuten zodat je tijd hebt om rustig te oefenen én te reflecteren. Langere blokken (bijvoorbeeld 90 of 120 minuten) zijn soms mogelijk in overleg met je instructeur. Zie ook onze pagina met tarieven voor actuele prijsinformatie.",
  },
  {
    id: "waar-lessen",
    question: "Waar ga ik lessen bij rijschool Vlam?",
    answer:
      "Rijschool Vlam biedt rijlessen in Utrecht. Dat betekent dat je op examenroutes in Utrecht kunt lessen, zoals Utrecht Zuilen, Utrecht Overvecht, Maarssen Dorp, Maarssen Broek en bedrijventerrein Lage Weide.\n\nHeb je specifieke locaties waar je interesse in hebt, of wil je weten of er lessen beschikbaar zijn in jouw buurt? Zoek je informatie over onze routekeuzes?",
  },
  {
    id: "slagingspercentage",
    question: "Wat is het slagingspercentage van rijschool Vlam?",
    answer:
      "Rijschool Utrecht Vlam heeft doorgaans een hoger slagingspercentage dan het gemiddelde in Utrecht, en onze kandidaten slagen vaak in één keer voor hun rijbewijs. Op dit moment ligt ons gemiddelde slagingspercentage op 84%. Het slagingspercentage bij het eerste examen is 88%.",
    answerImage: {
      src: "/faq/rijschoolvlamslagingpercentage.webp",
      alt: "Slagingspercentage Rijschool Vlam vergeleken met het gemiddelde in Utrecht",
    },
  },
  {
    id: "kosten-20-uur",
    question: "Hoeveel kost 20 uur praktijkles in een rijschool?",
    answer:
      `De kosten voor 20 uur praktijkles bij een rijschool kunnen sterk variëren. Dat heeft te maken met de regio, het type aanbod (losse lessen versus pakket) en extras zoals examenbegeleiding of andere examenservices.\n\nBij Rijschool Vlam is 20 uur praktijk hetzelfde als twintig standaard rijlessen van elk 60 minuten: ons Pakket 2, voor €1.900,-. Alle pakketprijzen zijn inclusief 21% btw; in dit pakket zitten je lestijden (schakel of automaat naar keuze), het CBR-praktijkexamen, flexibel in te plannen lessen én géén inschrijfgeld. Alle voorwaarden staan beschreven op de tarievenpagina.\n\nGeen vaste bundel nodig? Een losse les kost €${LESSON_PRICE_EUR},- per uur; twintig losse lessen zijn daarmee €${20 * LESSON_PRICE_EUR},- aan praktijkles, exclusief een apart aan te vragen praktijkexamen en overige CBR‑producten. Voor het volledige overzicht kun je terecht op /tarieven.`,
  },
  {
    id: "minimum-lessen",
    question: "Hoeveel rijlessen moet je minimaal hebben?",
    answer:
      "Er is in Nederland geen wettelijk minimumaantal rijlessen dat je móét volgen om je rijbewijs te halen. Hoeveel lessen je nodig hebt, hangt af van je ervaring, leersnelheid en rijvaardigheid.\n\nGemiddeld aantal lessen: ongeveer 35 tot 45 uur praktijkles.\nVoor snelle leerlingen: soms is 20 tot 30 uur voldoende.\nVoor minder ervaren leerlingen: dit kan oplopen tot 65 uur of meer.\n\nHet CBR adviseert om pas examen te doen als je instructeur vindt dat je er klaar voor bent. Dat wordt vaak ingeschat met een proefexamen of een tussentijdse toets.\n\nBij een goede rijschool, zoals Rijschool Vlam in Utrecht, krijg je advies op maat over wat jij nodig hebt om efficiënt en goed voorbereid te slagen.",
  },
  {
    id: "hoelang-lerenrijden-nl",
    question: "Hoe lang duurt het om te leren rijden in Nederland?",
    answer:
      "De tijd die nodig is om te leren rijden in Nederland verschilt per persoon. Het hangt af van je leersnelheid, hoe vaak je kunt lessen en hoeveel tijd je hebt om te oefenen. Hieronder een paar richtlijnen.\n\nGemiddelde tijd:\n3 tot 6 maanden: gemiddeld bij 1–2 rijlessen per week.\nSneller: bij intensieve pakketten (bijvoorbeeld 3–4 lessen per week) kan het in 1–2 maanden.\nLangzamer: als je minder tijd hebt of meer oefening nodig hebt, kan het 6 maanden tot een jaar duren.\n\nAantal lessen:\nDe gemiddelde leerling heeft 35–45 uur rijles nodig, verspreid over meerdere weken of maanden.\n\nAndere factoren die je planning beïnvloeden:\nTijd voor theorie-examen: je theoriecertificaat halen kost vaak ook tijd (gemiddeld 1–2 maanden studeren).\nTussentijdse toets (TTT): kan helpen om sneller examen-klaar te worden.\nBeschikbaarheid: wachttijden bij het CBR voor praktijkexamens kunnen je planning beïnvloeden.\n\nSnelcursussen:\nBij sommige rijscholen kun je met een intensief programma in 10 dagen tot een maand je rijbewijs halen. Dat vraagt wel om een grote tijdsinvestering in korte tijd.\n\nWil je specifieke tips over hoe je jouw rijopleiding in Utrecht het beste kunt plannen? Ik help je graag!",
  },
  {
    id: "theorie-zakken-hoevaak",
    question: "Hoe vaak mag je zakken voor je theorie?",
    answer:
      "In Nederland mag je zo vaak zakken voor je theorie-examen als nodig is. Er is geen limiet aan het aantal pogingen. Wel is het handig om met een paar dingen rekening te houden.\n\nGeldigheid van het theoriecertificaat:\nAls je slaagt, is je theoriecertificaat 1,5 jaar geldig. Binnen die periode moet je je praktijkexamen halen.\n\nKosten:\nElke keer dat je het theorie-examen doet, betaal je opnieuw de examenkosten (momenteel €41,50 bij het CBR, exclusief administratiekosten als je via een rijschool boekt).\n\nTijd en wachttijd:\nJe kunt niet altijd meteen herexamen doen. Afhankelijk van de beschikbaarheid bij het CBR moet je soms even wachten voordat je een nieuwe poging kunt doen.\n\nVoorbereiding en alternatieven:\nHet is slim om goed voorbereid naar je theorie-examen te gaan, bijvoorbeeld met oefenexamens en/of een cursus. Als je moeite hebt met het standaardexamen, kun je ook kiezen voor een theorie-examen met extra tijd of een mondeling examen (bijvoorbeeld bij lees- of taalproblemen).\n\nHeb je meer tips nodig voor je theorie-examen? Laat het weten!",
  },
  {
    id: "prijs-1-uur",
    question: "Hoe duur is 1 uur rijles?",
    answer:
      `Bij Rijschool Vlam kost een losse les van 60 minuten €${LESSON_PRICE_EUR},- (zie /tarieven; geen verborgen inschrijfgeld). Langere blokken zijn apart te bespreken.`,
  },
  {
    id: "10-uur-genoeg",
    question: "Is 10 uur rijles genoeg?",
    answer:
      "Het aantal rijlessen dat iemand nodig heeft om veilig en zelfstandig te leren rijden, verschilt sterk per persoon. Het hangt af van factoren zoals rijervaring, aanleg, leervermogen en vertrouwen in het verkeer.\n\n## Is 10 uur rijles genoeg?\n\nVoor de meeste beginners: meestal niet. Tien uur is zelden genoeg om echt examen‑klaar te zijn. Het CBR houdt als richting aan dat kandidaten gemiddeld ongeveer 48 uur rijles nodig hebben om te slagen.\n\n## Wanneer kan 10 uur wél genoeg zijn?\n\nErvaring: heb je eerder gereden (bijvoorbeeld brommer, scooter, of als je al onofficieel in een auto hebt geoefend)? Dan kan tien uur genoeg zijn om je rijvaardigheid op te frissen.\n\nIntensieve training: bij een spoedcursus of intensief pakket, als je al enige basis hebt, kan dit soms voldoende zijn.\n\nOefening buiten lessen: als je veel kunt oefenen met een coach (bijvoorbeeld via 2toDrive), kan dat het aantal lessen verkorten.\n\n## Proefles\n\nPlan een proefles voor een realistische inschatting: de instructeur adviseert hoeveel lessen je waarschijnlijk nodig hebt.\n\n## Gemiddeld aantal lessen — wat speelt mee?\n\nVolgens CBR‑gegevens kom je landelijk vaak uit rond 48 lesuren. Dat verschilt per persoon. Factoren die meespelen:\n\nLeervermogen en aanleg: sommige mensen pakken autorijden sneller op; motoriek en verkeersinzicht spelen een grote rol.\n\nFrequentie van de lessen: regelmatig lessen (bijvoorbeeld één of twee keer per week) helpt om sneller vooruitgang te boeken.\n\nErvaring: 2toDrive (rijden met een coach) of eerdere oefening op privéterrein kan het benodigde aantal lessen verlagen.\n\nVerkeerssituatie en lesomgeving: druk stadsverkeer (zoals Utrecht) vraagt vaak meer aandacht dan rustige routes.\n\nLestijd per afspraak: rijscholen hanteren 50, 60 of 90 minuten per les — dat beïnvloedt je totaal benodigde lestijd.\n\n## Tips om minder lessen nodig te hebben\n\nVolg een proefles: zo krijg je een eerlijk beeld van je persoonlijke traject.\n\nOefen regelmatig met een coach waar dat kan (bijvoorbeeld via 2toDrive).\n\nKies een goede rijschool: een ervaren instructeur begeleidt je gericht — dat kan schelen in het totaal aantal lessen.\n\n## Totaalkosten (indicatie)\n\nGemiddeld komt het totaalbedrag voor rijlessen en examens vaak uit rond €3.500,-, afhankelijk van de rijschool en het pakket.",
  },
  {
    id: "afrijden-automaat",
    question: "Kan je afrijden in een automaat?",
    answer:
      "Ja, je kunt zeker afrijden in een automaat — dat wordt steeds populairder, ook omdat veel elektrische en hybride auto’s alleen als automaat beschikbaar zijn.\n\n## Hoe werkt afrijden in een automaat?\n\nHet is hetzelfde praktijkexamen als bij een schakelauto, maar je rijdt een auto met automatische transmissie. Slaag je? Dan staat een automaatbeperking op je rijbewijs (vaak bekend als code 78): je mag dan alleen in voertuigen met automatische transmissie rijden.\n\n## Voordelen\n\nPraktischer om aan te leren: geen schakelen of koppeling, dus meer aandacht voor verkeersinzicht, veilige keuzes en verkeersregels — prettig als coördinatie tussen bediening, sturen en kijken zwaar vindt.\n\nVaak minder lestijd nodig voor de bediening: omdat schakelen wegvalt, ben je eerder met de inhoud van het examen bezig (hoeveel lessen je totaal nodig hebt blijft persoonlijk).\n\nRust en overzicht op het examen: minder handelingen betekent vaak minder stress rond foutjes door schakelmomenten.\n\nToekomstgericht: EV’s zijn vrijwel altijd automaat; met dit rijbewijs sluit je daar goed op aan.\n\nToegankelijker bij motorische beperkingen of coördinatie‑uitdagingen: automatische transmissie kan dan een werkbaar pad zijn.\n\n## Nadelen en beperking (code 78)\n\nMinder vrijheid: je mag niet in een schakelauto rijden, tenzij je later een aanvullende procedure/examen aflegt (waar nodig).\n\nMinder flexibel bij huren, lenen of auto’s ruilen — schakel komt nog vaak voor, ook op reis.\n\n## Schakelrijbewijs of automaat?\n\nWil je later maximaal vrij zijn in het kiezen van auto’s, dan is een B‑rijbewijs op schakel breed toepasbaarder. Als je weet dat je vooral automatisch gaat rijden (zeker elektrisch/hybride), is afrijden in een automaat vaak slim en comfortabel.\n\nBij Rijschool Vlam kun je het traject aan laten sluiten op wat bij jou hoort — schakel, automaat of elektrisch — telkens in overleg.",
  },
  {
    id: "examinator-slagen-quota",
    question: "Hoeveel mensen mag een examinator laten slagen?",
    answer:
      "Er is geen vaste limiet op het aantal mensen dat een examinator bij het CBR mag laten slagen. Je uitslag hangt af van jouw prestaties, niet van een quotum of maximum.\n\n## Hoe werkt de beoordeling?\n\nExaminatoren volgen vaste criteria om te bepalen of je veilig en zelfstandig aan het verkeer kunt deelnemen. Ze letten onder andere op rijvaardigheid (bediening en voertuigbeheersing), verkeersinzicht (anticiperen, voorrang verlenen, veilige keuzes) en het correct toepassen van verkeersregels.\n\n## Geen quota of vaste slagingspercentages\n\nHet CBR heeft vaker aangegeven dat er geen vaste slagingspercentages of dagquota per examinator zijn. Elke kandidaat wordt individueel beoordeeld. Als iedereen goed rijdt, kan in theorie ook iedereen slagen.\n\n## Gemiddeld slagingspercentage (landelijk)\n\nLandelijk ligt het gemiddelde slagingspercentage voor praktijkexamen B vaak rond de 50% tot 55%. Dat kan verschillen per regio, periode, rijschool en uiteraard per kandidaat.\n\n## Waar hangt jouw resultaat van af?\n\nJe rijvaardigheid: voertuigbeheersing en het correct uitvoeren van handelingen.\n\nJe verkeersinzicht: hoe je situaties inschat en daarop reageert.\n\nJe veiligheid: risico’s vermijden en anderen niet in gevaar brengen.\n\n## Tot slot\n\nExaminatoren worden regelmatig getraind en gecontroleerd om objectief en consistent te beoordelen. Wil je je slagingskans vergroten? Zorg voor goede voorbereiding, voldoende oefening en een duidelijk lesplan richting examen.",
  },
  {
    id: "rijexamen-niet-doen",
    question: "Wat niet doen tijdens rijexamen?",
    answer:
      "Tijdens je rijexamen is het slim om fouten te vermijden die je veiligheid en je kans op slagen direct beïnvloeden. Hieronder de belangrijkste dingen die je níet moet doen.\n\n## Verkeersregels negeren\n\nNiet stoppen bij een stopbord.\n\nGeen voorrang verlenen waar dat verplicht is.\n\nDoor rood rijden of onjuist invoegen.\n\n## Onveilig rijden\n\nHard remmen of onverwacht stoppen zonder reden.\n\nTe dicht op je voorganger rijden (onvoldoende volgafstand).\n\nOnvoldoende kijken bij rijstrookwissel of afslaan.\n\n## Slecht verkeersinzicht\n\nNiet anticiperen op andere weggebruikers.\n\nTwijfelen bij simpele voorrangssituaties.\n\nNiet aanpassen aan omstandigheden (bijvoorbeeld regen of drukte).\n\n## Snelheid verkeerd gebruiken\n\nTe langzaam rijden en het verkeer ophouden.\n\nDe maximumsnelheid overschrijden.\n\nTe snel een bocht in of te hard rijden bij onoverzichtelijke/gevaarlijke situaties.\n\n## Technische fouten (vooral bij schakel)\n\nOnhandig schakelen (verkeerde versnelling voor de situatie).\n\nOnnodig op de koppeling blijven staan.\n\nDe motor vaak laten afslaan (bijvoorbeeld bij wegrijden).\n\n## Tips om dit te voorkomen\n\nBereid je goed voor: oefen lastige situaties en bespreek onzekerheden met je instructeur.\n\nBlijf rustig: één kleine fout is niet meteen gezakt — het gaat om het totaalbeeld.\n\nLuister goed: volg instructies duidelijk op en vraag om herhaling als je iets écht niet begrepen hebt.\n\nOefen regelmatig en uitgerust: ga geconcentreerd je examen in.\n\nEen proefexamen kan helpen om te wennen aan de examenomstandigheden.\n\n## Als je een fout maakt\n\nRaak niet in paniek. Herstel veilig, blijf rustig rijden en laat zien dat je de controle houdt. Examinatoren kijken naar je totale rijgedrag en veiligheid.",
  },
  {
    id: "tussentijdse-toets-verplicht",
    question: "Tussentijdse toets verplicht?",
    answer:
      "Ja: bij Rijschool Vlam is de tussentijdse toets (TTT) verplicht vóór je praktijkexamen — dit hoort bij onze werkwijze en voorwaarden. Voor actuele prijzen kun je terecht op /tarieven.\n\nLet op: bij het CBR kan je persoonlijke traject verschillen; controleer altijd jouw planning en stappen in MijnCBR.\n\n## Wat is een tussentijdse toets (TTT)?\n\nEen TTT is een proefmoment bij het CBR dat sterk lijkt op een praktijkexamen: je krijgt instructies van een examinator en rijdt onder beoordelingsdruk. Het verschil met je echte examen is vooral dat het bedoeld is als leer‑ en oriëntatiemoment (met nadruk op feedback en voorbereiding).\n\n## Belangrijkste voordelen\n\nErvaring met examenritme: je went aan instructies, structuur en het gevoel van “beoordeeld worden”.\n\nMinder zenuwen later: veel leerlingen vinden het fijner als het echte examen niet de allereerste keer is onder die druk.\n\nKans op vrijstelling bijzondere verrichtingen: als je manoeuvres tijdens de TTT voldoende goed uitvoert, kun je in veel gevallen vrijstelling krijgen voor die onderdelen op je echte praktijkexamen (afhankelijk van de situatie en regels zoals ze op dat moment gelden).\n\nInzicht in verbeterpunten: je krijgt duidelijke feedback over wat goed gaat en waar je nog aan werkt.\n\nZelfvertrouwen: je krijgt een realistischer beeld van wat er op het praktijkexamen van je wordt verwacht.\n\nVeel kandidaten merken dat ze na een TTT gerichter kunnen oefenen richting het praktijkexamen.\n\n## Video\n\n[[YOUTUBE:AuwVmShBw-A:4]]\n\n## Wanneer is een TTT slim?\n\nHalverwege je opleiding (met een goede basis): je wilt weten hoe dicht je bij examenniveau zit en welke onderdelen nog extra aandacht nodig hebben.\n\nAls je je zelfverzekerd voelt, maar twijfelt over je voorbereiding: je zoekt extra zekerheid en objectieve feedback vóór je aanvraag/planning richting praktijkexamen.\n\nAls je zenuwachtig bent: wennen aan de examensituatie kan helpen om later rustiger te rijden.\n\nAls je vrijstelling voor bijzondere verrichtingen wilt maximaliseren: goed uitgevoerde manoeuvres tijdens de TTT kunnen later schelen op je praktijkexamen.\n\nAls je weinig zicht hebt op je niveau: een TTT geeft helderheid en maatwerk voor je verdere lessen.\n\nAls je slagkracht wilt verhogen door gerichter te trainen op zwakke punten (minder “gissen”, meer plan).\n\n## Wanneer is een TTT minder nodig?\n\nAls je nog weinig lessen hebt en de basis nog wankel is (bediening, kijkgedrag, voorrang): bouw eerst die basis verder op met je instructeur en stem daarna tijdig af op een TTT.\n\n## Tot slot\n\nEen TTT is vooral waardevol als je al goed op weg bent en je voorbereiding scherp wilt zetten vóór je praktijkexamen. Lukt het niet in één optimale planning? Maak het bespreekbaar — dan zoeken we een moment dat past bij jouw tempo en niveau.",
  },
  {
    id: "moeilijkste-bijzondere-verrichting",
    question: "Wat is de moeilijkste bijzondere verrichting van een auto?",
    answer:
      "De ‘moeilijkste’ bijzondere verrichting is persoonlijk: veel leerlingen vinden achteruit parkeren in een krappe situatie erg lastig — maar anderen worstelen meer met keren of juist vooruit inparkeren. Bij het examen gaat het vooral om veilig, gecontroleerd en met goed zoek-/kijkgedrag manoeuvreren, niet om wie iets theoretisch het moeilijkst vindt. Hieronder veelvoorkomende uitdagers (en invoegen als zware verkeerssituatie), met korte videoclips ter illustratie.\n\n## Achteruit parkeren (vaak als haaks inparkeren bedoeld)\n\nJe moet precies inschatten, goed gebruik maken van spiegels/rug-kijk-lijn én evt. een achteruitrijcamera, en rustig corrigeren zonder anderen te hinderen.\n\n[[YOUTUBE:Zsk42Krhodg:1]]\n\n## Keren op de weg (3‑puntsbocht)\n\nRuimte is vaak beperkt en andere weggebruikers kunnen druk zijn: je wilt gecontroleerd sturen/remmen en steeds eerst kijkgedrag houden.\n\n[[YOUTUBE:kzudzYizVu0]]\n\n## Vooruit parkeren / vooruit inparkeren in een vak\n\nHet kost inzicht in afstand, aanloop en hoe je eerder “ziet waar je terechtkomt” — veel mensen oefenen dit extra gericht om lijn-contact te vermijden.\n\n[[YOUTUBE:YvfLBzBZ0ys]]\n\n## Achteruit de straat-/inrit uit (achteruit steken uit een doodlopende situatie)\n\nAchteruit met overzicht, rustige cadans en continu kijken: snelheid en eindpunten worden snel fout ingeschat.\n\n[[YOUTUBE:nY0JsyKOoa8]]\n\n## Invoegen op de snelweg (en invoegen na inhaalacties)\n\nNiet elk examen heeft dit voor iedereen op dezelfde manier, maar het wordt vaak als zwaar ervaren: timing en snelheidsmatching met de hoofdrijbaan vragen veel verkeersinzicht.\n\n[[YOUTUBE:OcOJgiUW13U:26]]\n\n## Hoe maak je het makkelijker?\n\nOefen stap voor stap met je instructeur en herhaal vaste denk-/kijksequenties.\nSpiegels niet vergeten: elke manoeuvre begint bij goed zoek-/kijkgedrag.\nBlijf kalm — haast bij manoeuvres lever je zelden echte nauwkeurigheid op.\n\nMet oefening en geduld wordt bijna elke verrichting strak onder controle te krijgen.",
  },
  {
    id: "kosten-rijbewijs-utrecht",
    question: "Wat kost een rijbewijs halen bij Rijschool Vlam?",
    answer:
      "Totale kosten = rijlessen + theorie‑producten/examen(s) + CBR‑examens + evt. spoed/medisch traject + paspoort/ID‑kosten bij gemeente voor het pasje na slagen. Omdat iedereen een ander aantal lessen nodig heeft, is jouw bedrag pas concreet na een intake/proefles. Startpunten voor onze lestarieven/examen‑tarieven staan op /tarieven.",
  },
  {
    id: "meerdere-lessen-week",
    question: "Kan ik meerdere rijlessen per week volgen?",
    answer:
      "Ja, dat kan vaak prima — vooral als je sneller vooruit wilt of voorbereid wilt zijn op spoed‑achtige schema’s. Wel kijken we naar jouw verwerkings‑tempo: soms is rust tussen twee intensive dagen ook waardevol. Samen zoeken we een schema dat bij jou past.",
  },
  {
    id: "leeftijd-rijles",
    question: "Welke leeftijd rijles volgen bij rijschool Utrecht?",
    answer:
      "In Nederland mag je vanaf 16,5 jaar beginnen met rijlessen voor een autorijbewijs (rijbewijs B). Vanaf je 17e kun je het praktijkexamen afleggen. Als je op je 17e je rijbewijs haalt, mag je tot je 18e alleen onder begeleiding van een coach rijden. Hiervoor heb je een begeleiderspas nodig, waarop maximaal vijf coaches staan die aan bepaalde voorwaarden voldoen. Vanaf je 18e mag je zelfstandig de weg op.",
  },
  {
    id: "betrouwbare-rijschool",
    question: "Waar kan ik kijken of rijschool Utrecht betrouwbaar is?",
    answer:
      "Een betrouwbare rijschool vinden kan niet altijd makkelijk zijn. Je kunt eerst nagaan of de rijschool bij een van de brancheorganisaties is aangesloten, zoals BOVAG — zo weet je zeker dat je een goede rijschool kiest.\n\nVia de site van [[CBR]] kun je alle tips gebruiken om een goede en betrouwbare rijschool in Utrecht te vinden. Een goede rijschool is niet altijd de goedkoopste rijschool. Let op een hoog slagingspercentage. Vraag aan de rijschool hoeveel uren je ongeveer nodig hebt. Een tussentijdse toets vergroot je kans om te slagen met ongeveer 15%. Let erop of de rijschool op tijd is bij de rijlessen. Probeer ongeveer twee keer in de week te lessen tot je examen.",
  },
  {
    id: "verantwoordelijk-ongeval-les",
    question: "Wie is verantwoordelijk tijdens rijles met een ongeval?",
    answer:
      "Bij een ongeval tijdens de rijles is de instructeur doorgaans verantwoordelijk. Hoewel de leerling achter het stuur zit, wordt de rijinstructeur beschouwd als de feitelijke bestuurder, omdat hij of zij toezicht houdt en de leerling aanwijzingen geeft. De rijschool moet daarom een speciale verzekering hebben die de kosten dekt in het geval van een ongeluk tijdens de les. Onze rijschool Vlam is verzekerd voor alle ongevallen samen met inzittenden (Kandidaten ook).",
  },
  {
    id: "theorie-geldig",
    question: "Hoelang is mijn theorie-certificaat geldig?",
    answer:
      "Het theorie-certificaat is 1,5 jaar geldig, daarna zul je opnieuw je theorie moeten halen. Je kunt je theorie-examen niet reserveren voordat je oude certificaat verloopt.",
  },
  {
    id: "bijzondere-verrichtingen",
    question: "Wat zijn bijzondere verrichtingen of bijzondere manoeuvres?",
    answer:
      "Bijzondere verrichtingen, ook wel bijzondere manoeuvres genoemd, zijn specifieke rijhandelingen die je tijdens het rijexamen moet beheersen om te laten zien dat je de auto volledig onder controle hebt. In Nederland zijn de volgende bijzondere verrichtingen verplicht tijdens het rijexamen voor een autorijbewijs:\n\n## Achteruit inparkeren (in een vak of fileparkeren)\n\n## Keren (bijvoorbeeld door een halve draai of een bocht achteruit)\n\n## Achteruitrijden in een rechte lijn\n\n## Wegrijden vanuit een parkeervak of vanaf de kant van de weg\n\n## Hellingproef (wegrijden op een helling zonder terug te rollen)\n\nDeze manoeuvres worden beoordeeld om te controleren of je ze veilig, beheerst en met een goed overzicht kunt uitvoeren. Het correct uitvoeren van deze bijzondere verrichtingen laat zien dat je niet alleen kunt rijden, maar ook volledige voertuigbeheersing hebt in uiteenlopende situaties.\n\nWil je ze vast oefenen? [[KIJK_HIER_BV]].",
  },
  {
    id: "praktijkexamen-auto-verloop",
    question: "Hoe gaat het praktijkexamen auto?",
    answer: `Het praktijkexamen bij het CBR (Centraal Bureau Rijvaardigheidsbewijzen) bestaat uit een aantal vaste onderdelen en wordt afgenomen door een examinator. Hier is een overzicht van hoe het proces verloopt:

[[YOUTUBE:90DRSSl4QLw:1]]

Het examen duurt in totaal 55 minuten. Het bestaat uit de volgende onderdelen:

## Voorbereiding op het examen

Je ontmoet je rijinstructeur bij het CBR-examencentrum, vaak zo’n 15 minuten voor aanvang van het examen. Je krijgt nog wat laatste tips en kunt eventuele vragen stellen.

## Kennismaking met de examinator

De examinator haalt je op en legt kort uit hoe het examen zal verlopen. Je moet je identiteitsbewijs tonen, en soms wordt gevraagd om het formulier zelfreflectie in te vullen. Dit formulier helpt je achteraf om inzicht te krijgen in je rijvaardigheid.

## Oog test

Voordat je de auto instapt, doet de examinator meestal een korte oogtest. Je wordt gevraagd om een kenteken van een geparkeerde auto op een afstand van ongeveer 25 meter af te lezen. Dit is om te controleren of je goed kunt zien.

## Voertuig controle

De examinator stelt enkele vragen over de auto, zoals hoe je de verlichting, ruitenwissers of andere basisfuncties bedient. Soms wordt er ook gevraagd om onder de motorkap iets aan te wijzen, zoals de oliepeilstok of de koelvloeistof.

## Rijden op de weg

Dit is het grootste deel van het examen. Je rijdt ongeveer 35 minuten, waarbij de examinator beoordeelt hoe je omgaat met verschillende verkeerssituaties. Hierbij kijkt hij/zij naar je kijkgedrag en anticipatievermogen, naar voertuigbeheersing, naar verkeersinzicht en veiligheid, en naar de manier waarop je zelfstandig beslissingen neemt.

## Zelfstandig route rijden

Een deel van de rit moet je zelfstandig rijden, bijvoorbeeld met behulp van een navigatiesysteem of door naar een bepaalde bestemming te rijden. Dit onderdeel heet de zelfstandige route en helpt om te beoordelen of je ook zonder instructies de weg kunt vinden en veilig kunt rijden.

## Bijzondere verrichtingen

De examinator vraagt je meestal om enkele bijzondere verrichtingen uit te voeren, zoals parkeren, keren of een stopopdracht uitvoeren. Dit toont je beheersing van de auto in specifieke situaties.

## Afronding en uitslag

Terug bij het examencentrum geeft de examinator direct feedback. Hij/zij vertelt of je geslaagd bent en licht de beoordeling toe, inclusief de sterke en verbeterpunten in je rijgedrag.

Na afloop ontvang je het uitslagformulier met daarop een overzicht van je prestaties tijdens het examen. Als je slaagt, kun je je rijbewijs aanvragen bij de gemeente.

Bij Rijschool Vlam bereiden we je voor op elk aspect van dit examen, zodat je met zelfvertrouwen en kennis het praktijkexamen in kunt gaan. Heb je specifieke vragen over bepaalde onderdelen van het examen?`,
  },
];

export const FAQ_PREVIEW_COUNT = 6;
