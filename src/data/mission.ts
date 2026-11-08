// All CV content lives here. `null` renders as a visible gap, never as invented text.
//
// Voice: a straight face with a wink. Short sentences, second person, spoken to the player.

export type Episode = {
  code: string;
  genre: string;
  title: string;
  logline: string;
  meta: string | null;
  brief: string | null;
  wentWrong: string | null;
  action: string | null;
  result: string | null;
  bonus?: string;
  film: FilmId;
  // Colour of the card and of the file slate. Each episode is its own genre.
  accent: string;
  stamp: string;
  // Optional real proof shown in the episode file, e.g. a photo of a role card.
  evidence?: { src: string; caption: string };
};

export type FilmId = 'ep1' | 'ep2' | 'ep3' | 'ep4';

export const scenes = [
  { id: 1, title: 'Cold open', slug: 'EXT. Někde v Česku, noc' },
  { id: 2, title: 'Brief', slug: 'INT. Produkce, den' },
  { id: 3, title: 'V předchozích dílech', slug: 'Montáž' },
  { id: 4, title: 'V civilu', slug: 'INT. Laboratoř, den' },
  { id: 5, title: 'Teď hraješ ty', slug: 'EXT. Terén, noc, prší' },
  { id: 6, title: 'Štáb', slug: 'INT. Zázemí štábu, ráno' },
  { id: 7, title: 'Karty na stůl', slug: 'INT. Místnost bez kamer' },
  { id: 8, title: 'Finále', slug: 'INT. Sál, půlnoc' },
];

export const coldOpen = {
  lines: [
    'Stovky dětí, které nikdy nečetly brief.',
    'Parta dospělých, která tvrdí, že už si hrát neumí.',
    'A jeden člověk, který ví, jak to skončí.',
  ],
  kicker: 'Přihláška · Mission Coordinator · Zrádci',
  title: ['Mise:', 'najmi Kolise'],
  lead: 'Jan Kolátor, alias Kolis. Vymýšlím hry, záhady a programy pro děti i dospělé a pak hlídám, aby to v terénu opravdu běželo.',
};

export const brief = {
  title: 'Brief pro Markuse',
  rows: [
    { key: 'Hráč', value: 'Markus Krug. Platí i pro každého, komu to přepošleš.' },
    { key: 'Cíl', value: 'Zjistit, jestli má Jan Kolátor koordinovat tvoje mise.' },
    { key: 'Čas', value: '10 až 15 minut.' },
    { key: 'Pravidla', value: 'Nic tu není vymyšlené. Co ještě neumím, ukážu ve scéně 7.' },
    { key: 'Riziko', value: 'Pozveš mě na pohovor.' },
  ],
};

export const previously = {
  title: 'V předchozích dílech',
  playAll: '▶ Přehrát všechny díly',
};

export const episodes: Episode[] = [
  {
    code: 'EP 01',
    genre: 'Detektivka · dospělí',
    title: 'Kdo vypil posledního Radka?',
    logline: 'Poslední Radegast zmizel. Šestnáct lidí, každý s tajemstvím, a na konci hlasování u kulatého stolu. Povědomé?',
    film: 'ep1',
    accent: '#f4c15d',
    stamp: 'Případ uzavřen',
    meta: 'Vlastní detektivní hra · podzim 2026 · autor a moderátor',
    brief: 'Víkend jen pro dospělé a detektivka, kde nikdo není jen divák. Každý zná jen kus příběhu a má vlastní tajemství. Pachatel se přitom dá skutečně odhalit.',
    wentWrong: null,
    action: 'Každému z 16 hráčů jsem napsal osobní kartičku: pozici, charakter, oblečení, jednu stopu a jedno tajemství. Časovou linku celého dne jsem si srovnal tak, aby si nic neodporovalo. Stopy k pachateli jsem rozdal čtyřem lidem, takže to nikdo nemohl vyřešit sám. Od pátečního večera do soboty jsem hru moderoval a vyšetřování nechal na hráčích.',
    result: 'Hra vyvrcholila u kulatého stolu: vlastní teorie, konfrontace výpovědí a hlasování. Ze 16 hlasů šel na pachatele jediný, 11 skončilo u vedoucích.',
    bonus: 'Ze stejného víkendu pro zhruba 20 lidí: vlastní edice hry Time’s Up! se 40 kartami s postavami, místy a událostmi z našich táborů. Takových víkendovek už mám za sebou několik.',
  },
  {
    code: 'EP 02',
    genre: 'Velkofilm · děti',
    title: '24 planet, 6 kamenů, 12 dní',
    logline: '„Avengers!“ A 120 dětí odpoví: „Jsme připraveni, pane Fury!“',
    film: 'ep2',
    accent: '#8fbcf0',
    stamp: 'Odtajněno',
    meta: 'Programový vedoucí a v příběhu Nick Fury · Agentura PAC · tábor Avengers, léto 2025',
    brief: 'Dvanáctidenní tábor ve třech bězích. V každém přibližně 120 dětí v šesti týmech, 23 vedoucích a praktikantů a pokaždé jiná parta dospělých. Mladí Avengers se vydali přes 24 planet získat všech šest Kamenů nekonečna a dostat je pod kontrolu, aby nemohly být zneužity. Pak se nečekaně vrátil Thanos a zajal všechny původní superhrdiny. Každý tým musel osvobodit toho svého a z mise za kameny se stal boj o záchranu samotných Avengers.',
    wentWrong: null,
    action: 'Navrhl jsem celý program a propojil příběh, strategii a soutěže do jednoho celku. Každý kámen měl vlastní schopnosti, které se promítaly do pravidel a průběhu etapových her. Každá hra ovlivňovala další možnosti týmu a Nádoba osudu s více než 50 efekty uměla průběh nečekaně změnit: tým v ní mohl získat nebo ztratit vibranium (hlavní body hry) a hyperpohony (palivo na cestování) a k tomu výhody do dalších her. Koordinoval jsem aktivity i tým, vedl porady a operativně řešil změny.',
    result: 'Dva ročníky mám úspěšně za sebou: hry Avengers a Mimoni. Třetí, Piráti z Karibiku, mám připravený na rok 2027.',
  },
  {
    code: 'EP 03',
    genre: 'Dokument · produkce',
    title: 'Část bez kamer',
    logline: 'Žádosti, papíry a termíny, bez kterých se žádná mise nerozjede.',
    film: 'ep3',
    accent: '#b9c49a',
    stamp: 'Nudné, ale nutné',
    meta: 'Projektové řízení · nanomateriály a energetika',
    brief: 'Dobíjecí infrastruktura pro elektromobily, fotovoltaika a vývojové projekty. Hodně lidí, termínů a podmínek, které musí sedět najednou.',
    wentWrong: null,
    action: 'Podílel jsem se na koordinaci dodavatelů, výběrových řízeních a komunikaci se zapojenými subjekty. Vyhledával jsem dotační příležitosti a připravoval žádosti (OP TAK, RES+). Jeden z projektů: vlákenné materiály jen z přírodních biopolymerů, například ze škrobů, pro kosmetické a dermatologické masky a jako aktivní filtr do respirátorů. V přírodě se snadno rozloží. Druhý: moderní energetika v nemovitostech, tedy fotovoltaika, bateriová úložiště, dobíjecí infrastruktura, energetický management a dotace.',
    result: 'Výsledky projektu s přírodními vlákny se budou komercializovat. U nemovitostí je záměr nižší energetická náročnost a vyšší tržní a investiční hodnota.',
  },
  {
    code: 'EP 04',
    genre: 'Příští řada',
    title: 'Piráti z Karibiku',
    logline: 'Třetí celotáborová hra, rok 2027: Konec legendy. Mapa se teprve kreslí.',
    film: 'ep4',
    accent: '#74c4b4',
    stamp: 'Rozepsáno',
    meta: 'Programový vedoucí · ročník 2027 · program připravený',
    brief: 'Třetí ročník a třetí celotáborová hra: Piráti z Karibiku: Konec legendy. Devět pirátských lordů se po třiceti letech znovu setkává na Bratrském sněmu. Jack Sparrow povede společnou výpravu za aztéckým zlatem, hlavním protivníkem bude Davy Jones.',
    wentWrong: null,
    action: 'Děti se na začátku stanou členy pirátských posádek, které spolu soupeří o zlato. Kromě etapových her chci postavit velké celotáborové herní pole na principu Monopoly: posádky si kupují přístavy, vybírají poplatky za zakotvení a rozhodují se, jestli zlato investovat, nebo šetřit. Celým táborem se prolíná příběh s hranými scénkami, který vyvrcholí společným prolomením dávné legendy.',
    result: 'Kapitán nejúspěšnější posádky se stane jediným vládcem všech pirátů.',
  },
];

// `audio` stays null until he records it, then the clock follows the recording and the temporary voice switches off.
// `t` is in milliseconds, `beat` adds one step of the animation. Retime `t` to the recording.
const radek = {
  code: 'EP 01',
  title: 'Kdo vypil posledního Radka?',
  audio: 'audio/ep1.m4a' as string | null,
  // The whole case runs on its own, solution included. Nobody has to click anything.
  endsAt: 129000,
  // Spoken text has no digits, the times are on screen. Voice: the game maker who built the arena.
  cues: [
    { t: 0, beat: 1, text: 'Poslední společný večer. V lednici v kanclu stojí poslední Radek. Za hodinu bude pryč. Přesně tak jsem to napsal.' },
    { t: 9300, beat: 2, text: 'Šestnáct hráčů. Každému jsem určil, kým je, co má na sobě a co ten večer udělal.' },
    { t: 16100, beat: 3, text: 'Každému jsem dal jednu věc, kterou viděl, a jedno tajemství, které musí chránit.' },
    { t: 22500, beat: 4, text: 'Časovou linku jsem srovnal tak, aby si nic neodporovalo. A jednomu z nich jsem dal zvláštní rozkaz: „Zajisti si alibi a odveď pozornost.“' },
    { t: 32300, beat: 5, text: 'Pak jsem je pustil do hry. Od pátečního večera do soboty se vyslýchali navzájem a pravda se začala skládat.' },
    { t: 40100, beat: 6, text: 'Devět minut po půlnoci Radek v lednici ještě stojí. V jednu deset už tam není.' },
    { t: 46000, beat: 7, text: 'Teď začaly fungovat moje návnady. Jednomu z hlavních vedoucích cinká batoh, jenže jedna láhev necinká.' },
    { t: 52600, beat: 8, text: 'Jeden ze zdravotníků jde naštvaný do kanclu a vychází nervózní.' },
    { t: 57000, beat: 9, text: 'Jednoho z oddílových vedoucích jsem tam poslal rovnou třikrát.' },
    { t: 60400, beat: 10, text: 'A jeden z praktikantů ve vestibulu pozdraví a jde dál. Toho si nikdo nevšímá.' },
    { t: 66500, beat: 11, text: 'Čtyři stopy k pachateli jsem rozdělil mezi čtyři lidi. Ruka pod mikinou, cvaknutí lahváče, postava od palet a pozdrav. Tmavou mikinu jsem dal šesti hráčům ze šestnácti.' },
    { t: 78400, beat: 12, text: 'Kulatý stůl. Šestnáct hráčů, jedna odpověď.' },
    { t: 82100, beat: 13, text: 'Jedenáct tipů na vedoucí, tři na zdravotníka, jeden na vedení a jeden jediný na praktikanty.' },
    { t: 89300, beat: 14, text: 'Správně. V půl jedné vzal praktikant Radka z lednice, vypil ho na paletách a za dvanáct minut jedna už zase zdravil ve vestibulu.' },
    { t: 98000, beat: 15, text: 'Náhoda v téhle hře nebyla.' },
    { t: 99500, beat: 16, text: 'Hráči hledají viníka tam, kde je moc. Proto jsem nápadné chování dal vedoucím a pachatele schoval úplně dolů.' },
    { t: 106900, beat: 17, text: 'Stopy jsem rozdělil tak, aby opravdu složil jen ten, kdo mluvil se všemi.' },
    { t: 111100, beat: 18, text: 'A tu roli jsem svěřil člověku, o kterém jsem věděl, že ji udrží až do konce.' },
    { t: 116400, beat: 19, text: 'Patnáct tipů šlo přesně tam, kam jsem je nasměroval. Šestnáctý ukázal, že hra byla férová.' },
    { t: 122300, beat: 20, text: 'Šestnáct hráčů hledalo pachatele, pravidla toho hledání jsem napsal ale já.' },
  ],
  portrait: 'img/kolis-game-maker.webp',
  caseLabel: 'Případ č. 1',
  caseTitle: 'Poslední Radek',
  caseNote: 'Víkend jen pro dospělé. Kancl, poslední večer.',
  cardLabels: ['Pozice', 'Oblečení', 'Stopa', 'Tajemství'],
  fakeLabel: 'Falešná stopa',
  // The rules of the game: everyone interrogates everyone, and only the whole table can get to the truth.
  talk: { words: ['Řekneš', 'Zatajíš'], note: 'Pravdu složí jen všichni dohromady.' },
  clock: {
    from: { time: '00:09', label: 'Radek stojí v lednici' },
    to: { time: '01:10', label: 'Lednice je prázdná' },
    note: 'Hodina. 16 lidí. Každý si něco tají.',
  },
  // Points come from the other players' cards, so they are what the table really heard.
  // Each role was held by several people, so a suspect is always "one of them".
  suspects: [
    { role: 'Hlavní vedoucí', title: 'Jeden z hlavních vedoucích', figure: null as string | null, points: ['Tmavě modrá mikina.', 'Prošel do jídelny a něco mu cinkalo v batohu.', 'Jedna láhev ale necinká.'] },
    { role: 'Zdravotník', title: 'Jeden ze zdravotníků', figure: null as string | null, points: ['Černá mikina.', 'Kolem půlnoci míří naštvaný ke kanclu.', 'V 00:09 z něj vychází nervózní.'] },
    { role: 'Oddílový vedoucí', title: 'Jeden z oddílových vedoucích', figure: null as string | null, points: ['Tmavě šedá mikina.', 'V kanclu ho viděli třikrát.', 'V 00:45 jde dovnitř tak, aby ho nikdo neviděl.'] },
    { role: 'Praktikant', title: 'Jeden z praktikantů', figure: null as string | null, points: ['Černá mikina, černé kalhoty.', 'Kolem půlnoci sedí v jídelně s ostatními.', 'V 00:48 ve vestibulu pozdraví a jde dál.'] },
  ],
  suspectLabel: 'Podezřelý',
  clues: {
    title: 'Čtyři stopy, čtyři lidé',
    rows: [
      { time: '00:32', text: 'Vestibulem jde ven někdo v tmavé mikině. Jednu ruku má pod ní.' },
      { time: '00:38', text: 'Na štěrku cvakne otevřený lahváč.' },
      { time: '00:43', text: 'Od palet míří k budově postava v tmavé mikině.' },
      { time: '00:48', text: 'Ve vestibulu pozdrav, každý jde svou cestou.' },
    ],
    fake: 'Tmavá mikina: 6 lidí ze 16',
  },
  tableWord: 'Kdo?',
  votes: {
    title: '16 tipů u kulatého stolu, podle rolí',
    rows: [
      { label: 'Vedoucí', value: 11, culprit: false },
      { label: 'Zdravotníci', value: 3, culprit: false },
      { label: 'Vedení', value: 1, culprit: false },
      { label: 'Praktikanti', value: 1, culprit: true },
    ],
  },
  card: {
    kicker: 'Kartička pachatele',
    rows: [
      { key: 'Pozice', value: 'Praktikant' },
      { key: 'Oblečení', value: 'Černá mikina a černé kalhoty.' },
      { key: 'Tajemství', value: 'To ty jsi vypil posledního Radka.' },
      { key: 'Úkol', value: 'Zajisti si alibi, vymysli si věrohodný příběh. Musíš odvést pozornost na někoho jiného.' },
    ],
    stamp: 'Vyhrál',
  },
  route: [
    { time: '00:30', text: 'Lednice v kanclu, lahváč pod mikinu' },
    { time: '00:32', text: 'Vestibul, ven na štěrk' },
    { time: '00:38', text: 'Cvak. Pak palety' },
    { time: '00:43', text: 'Flaška schovaná, zpátky k budově' },
    { time: '00:48', text: 'Vestibul. Pozdrav, jako by nic' },
  ],
  design: {
    title: 'Jak jsem tu hru postavil',
    moves: [
      { title: 'Pachatel', text: 'Nápadné chování dostali vedoucí. Viník je schovaný úplně dole.' },
      { title: 'Stopy', text: 'Čtyři lidé, jedna pravda. Složí ji jen ten, kdo mluví se všemi.' },
      { title: 'Role', text: 'Dostal ji člověk, který ji udrží až do konce.' },
    ],
    results: [
      { value: '15', label: 'tipů tam, kam jsem je nasměroval' },
      { value: '1', label: 'správně: hra byla férová' },
    ],
  },
  verdict: { kicker: 'Pravidla napsal', name: 'Kolis' },
  endTitle: 'Případ uzavřen',
  revealTitle: 'Spis případu',
  reveal: [
    { key: 'Pachatel', value: 'Jeden z praktikantů. Všichni, kdo by to mohli být, byli moc prvoplánoví a ostatní by to celou hru neuhráli. O něm jsem věděl, že mu to sedne.' as string | null, ask: 'kdo to byl' },
    { key: 'Motiv', value: 'Žádná velká zápletka. Radek byl poslední a někdo byl hajzel.' as string | null, ask: 'proč to udělal' },
    { key: 'Klíčové stopy', value: 'Každý kus cesty viděl někdo jiný: ruka pod mikinou ve vestibulu, lahváč na štěrku, postava od palet, pozdrav v 00:48. Až dohromady ukazují na jednoho člověka.' as string | null, ask: '2 až 3 stopy' },
    { key: 'Falešná stopa', value: 'Tmavá mikina. Mělo ji šest lidí ze šestnácti.' as string | null, ask: 'a koho zmátla' },
    { key: 'Tajemství hráčů', value: 'Někdo snědl celou šunku na poslední snídani. Někdo si tajně tiskl zlatou medaili. Někdo se šel podívat na téma příštího ročníku. A někdo schovával za popelnice cizí oblečení.' as string | null, ask: '2 až 3 tajemství' },
    { key: 'U kulatého stolu', value: 'Šestnáct tipů podle rolí. Vedoucí 11, zdravotníci 3, vedení 1, praktikanti 1. Správně tipoval jediný.' as string | null, ask: 'kolik lidí uhodlo správně' },
  ],
};

const avengers = {
  code: 'EP 02',
  title: '24 planet, 6 kamenů, 12 dní',
  audio: 'audio/ep2.m4a' as string | null,
  endsAt: 74000,
  cues: [
    { t: 0, beat: 1, text: 'Dvanáct dní, dvacet čtyři planet, šest Kamenů nekonečna.' },
    { t: 5000, beat: 2, text: 'Sto dvacet dětí v šesti týmech, dvacet tři vedoucích a praktikantů.' },
    { t: 11000, beat: 3, text: 'Náš cíl? Dostat všech šest Kamenů nekonečna pod naši kontrolu, aby je nikdo nezneužil. Každý kámen mění pravidla hry, která k němu vede.' },
    { t: 24100, beat: 4, text: 'A pak přijde Nádoba osudu. Víc než padesát efektů.' },
    { t: 29700, beat: 4, text: 'Tým v ní může získat nebo ztratit vibranium, hlavní body hry. Nebo hyperpohony, palivo na cestování po vesmíru. A k tomu výhody do dalších her.' },
    { t: 42700, beat: 8, text: 'Jenže pak se na svět vrátí Thanos, kterého už jsme jednou porazili, a zajme všechny původní superhrdiny. Mladí Avengers zůstanou bez ochránců.' },
    { t: 54200, beat: 8, text: 'Každý tým musí osvobodit toho svého. A z honby za kameny je najednou boj o záchranu samotných Avengers.' },
    { t: 62500, beat: 5, text: 'Příběh, strategie a soutěže v jednom celku.' },
    { t: 66300, beat: 6, text: 'A uprostřed toho já, Nick Fury.' },
    { t: 69900, beat: 7, text: '' },
  ],
  numbers: [
    { value: '12', label: 'dní' },
    { value: '24', label: 'planet' },
    { value: '6', label: 'kamenů' },
  ],
  crowd: [
    { value: '3', label: 'běhy' },
    { value: '120', label: 'dětí v každém' },
    { value: '23', label: 'vedoucích a praktikantů' },
  ],
  jarTitle: 'Nádoba osudu',
  jarCount: '50+',
  jarLabel: 'efektů',
  jarStakes: [
    { name: 'Vibranium', note: 'hlavní body hry' },
    { name: 'Hyperpohony', note: 'palivo na cestování' },
    { name: 'Výhody', note: 'do dalších her' },
  ],
  twist: {
    kicker: 'Zvrat',
    title: 'Thanos se vrátil',
    lines: ['Všichni původní superhrdinové v zajetí.', 'Každý tým osvobozuje toho svého.', 'Z mise za kameny je boj o záchranu Avengers.'],
  },
  threeWords: ['Příběh', 'Strategie', 'Soutěže'],
  // The narrator on the comms screen. `face` is an image path once a portrait exists; until then a drawn silhouette.
  comms: { label: 'Velitelství', name: 'Kolis', live: 'Příchozí hlášení', face: 'img/kolis-velitel.webp' as string | null },
  hud: { stones: 'Kameny', fuel: 'Hyperpohon', points: 'Vibranium' },
  jarDraws: [
    { sign: '+', text: 'vibranium', tone: 'up' },
    { sign: '−', text: 'hyperpohon', tone: 'down' },
    { sign: '+', text: 'výhoda', tone: 'up' },
    { sign: '−', text: 'vibranium', tone: 'down' },
    { sign: '+', text: 'hyperpohon', tone: 'up' },
  ],
  alarm: { top: 'Poplach', status: 'Spojení s hrdiny ztraceno' },
  cells: { label: 'Tým', freed: 'volno' },
  starring: { kicker: 'V hlavní roli', name: 'Kolis', alias: 'v příběhu Nick Fury' },
  call: 'Avengers!',
  reply: '„Jsme připraveni, pane Fury!“',
  drawHint: 'Dnes vytáhla',
  drawTitle: 'Nádoba osudu',
  drawSlip: 'Efekt z Nádoby',
  effects: [
    'Tým získává vibranium.',
    'Tým ztrácí vibranium.',
    'Tým získává hyperpohon.',
    'Tým ztrácí hyperpohon.',
    'Tým získává výhodu do další hry.',
  ] as string[],
};

const documentary = {
  portrait: 'img/kolis-vyzkum.webp',
  code: 'EP 03',
  title: 'Část bez kamer',
  audio: 'audio/ep3.m4a' as string | null,
  endsAt: 54400,
  cues: [
    { t: 0, beat: 1, text: 'Tohle je část, kterou nikdo netočí.' },
    { t: 2500, beat: 2, text: 'Dodavatelé, výběrová řízení, harmonogramy, dotační žádosti.' },
    { t: 7400, beat: 3, text: 'Dobíjecí stanice, fotovoltaika a nanomateriály.' },
    { t: 11700, beat: 6, text: 'Třeba tenhle projekt. Vlákna čistě z přírodních biopolymerů, například ze škrobu. Snadno dostupné a ekologické.' },
    { t: 19200, beat: 7, text: 'Stanou se z nich kosmetické masky pro hydrataci a výživu pleti, dermatologické masky na akné a ekzém nebo aktivní filtr v respirátorech.' },
    { t: 28500, beat: 8, text: 'Planeta je zamořená miliardami kusů těchto výrobků. Tyhle se v přírodě snadno rozloží a výsledky půjdou na trh.' },
    { t: 36400, beat: 9, text: 'Nebo energetika v nemovitostech. Fotovoltaika, bateriová úložiště, dobíjení, chytřejší hospodaření s energií a dotace na to všechno. Nemovitost spotřebuje méně a má vyšší hodnotu.' },
    { t: 48000, beat: 4, text: 'Žádný potlesk, žádná hudba.' },
    { t: 50200, beat: 5, text: 'Ale když tohle neklapne, žádná mise se nerozjede.' },
  ],
  rec: 'Kamera: nikdo',
  caption: { species: 'Projektový manažer obecný', habitat: 'Přirozené prostředí: tabulka' },
  nanoCaption: { species: 'Vlákno přírodní', habitat: 'Přirozené prostředí: obličej, pak les' },
  nano: {
    source: { title: 'Přírodní biopolymery', note: 'například škrob', tags: ['dostupné', 'biodegradabilní', 'ekologické'] },
    products: [
      { kind: 'cosmetic', name: 'Kosmetická maska', note: 'hydratace a výživa pleti' },
      { kind: 'derma', name: 'Dermatologická maska', note: 'akné a ekzém' },
      { kind: 'filter', name: 'Respirátor', note: 'aktivní filtrační materiál' },
    ],
    heap: 'Miliardy kusů',
    ground: 'V přírodě snadno rozložitelné',
    market: 'Výsledky na trh',
  },
  energy: {
    title: 'Energetika v nemovitostech',
    parts: ['Fotovoltaika', 'Bateriová úložiště', 'Dobíjecí infrastruktura', 'Energetický management', 'Dotace'],
    down: 'Energetická náročnost',
    up: 'Investiční hodnota',
  },
  // Bars of the moving Gantt, in percent of the timeline. Illustration, not real dates.
  rows: [
    { label: 'Dodavatelé', from: 4, to: 38, beat: 2 },
    { label: 'Výběrová řízení', from: 16, to: 54, beat: 2 },
    { label: 'Harmonogramy', from: 8, to: 92, beat: 2 },
    { label: 'Dotační žádosti', from: 42, to: 76, beat: 2 },
    { label: 'Dobíjecí stanice', from: 30, to: 66, beat: 3 },
    { label: 'Fotovoltaika', from: 52, to: 88, beat: 3 },
    { label: 'Nanomateriály', from: 10, to: 96, beat: 3 },
  ],
  meters: [
    { label: 'Potlesk', value: '0' },
    { label: 'Hudba', value: '0' },
  ],
  stamps: ['OP TAK', 'RES+', 'Termín'],
  endTitle: 'Konec dokumentu.',
  endCredits: [
    { key: 'Potlesk', value: 'žádný' },
    { key: 'Hudba', value: 'chvíli žádná' },
    { key: 'Kamera', value: 'nikdo' },
  ],
  projectLabel: 'Dva skutečné projekty',
  project: 'Vlákenné materiály jen z přírodních biopolymerů pro kosmetické a dermatologické masky a jako filtr do respirátorů. V přírodě se snadno rozloží, výsledky se budou komercializovat. A energetika v nemovitostech: fotovoltaika, baterie, dobíjení a dotace pro nižší spotřebu a vyšší hodnotu.' as string | null,
};

const pirates = {
  portrait: 'img/kolis-kapitan.webp',
  portraitEnd: 'img/kolis-kapitan-b.webp',
  code: 'EP 04',
  title: 'Piráti z Karibiku',
  audio: 'audio/ep4.m4a' as string | null,
  endsAt: 44500,
  cues: [
    { t: 0, beat: 1, text: 'Přichází nová řada.' },
    { t: 2600, beat: 2, text: 'Příští léto. Dva tisíce dvacet sedm.' },
    { t: 6800, beat: 3, text: 'Piráti z Karibiku. Konec legendy.' },
    { t: 10400, beat: 6, text: 'Po třiceti letech se devět pirátských lordů znovu setká na Bratrském sněmu. Jack Sparrow je povede za aztéckým zlatem. V cestě jim však stojí Davy Jones.' },
    { t: 23100, beat: 7, text: 'Posádky kupují přístavy, vybírají poplatky za zakotvení a musí se rozhodnout: zlato investovat, nebo šetřit.' },
    { t: 31300, beat: 8, text: 'Všechny posádky společně prolomí dávnou legendu. A kapitán, ten nejúspěšnější, se stane jediným vládcem všech pirátů.' },
    { t: 39700, beat: 4, text: 'Mapa se teprve kreslí.' },
    { t: 41400, beat: 5, text: 'A já ti teď prozradím, jak to celé' },
  ],
  // Own ships and sea drawn in code. Names of the game stay as text only.
  trailer: {
    coming: 'Přichází nová řada',
    yearNote: 'Příští rok',
    year: '2027',
    title: 'Piráti z Karibiku',
    subtitle: 'Konec legendy',
    lords: {
      count: '9',
      label: 'pirátských lordů',
      lines: ['Bratrský sněm po 30 letech', 'Jack Sparrow vede za aztéckým zlatem', 'V cestě stojí Davy Jones'],
    },
    ports: ['Kupují přístavy', 'Vybírají poplatky', 'Investovat, nebo šetřit?'],
    legend: 'Prolomení dávné legendy',
    ruler: 'Jediný vládce všech pirátů',
  },
  mapTitle: 'Piráti z Karibiku',
  mapSubtitle: 'Konec legendy',
  mapYear: '2027',
  unknown: 'Sem ještě nikdo nedošel',
  // His voice stops on "jak to celé". This black page finishes the sentence, then the next scene.
  endTitle: 'Jak to celé skončí…',
};

export const films = { ep1: radek, ep2: avengers, ep3: documentary, ep4: pirates };

export const civil = {
  title: 'V civilu',
  roles: [
    {
      years: '2025 až dnes',
      role: 'Projektový manažer',
      field: 'energetika a nemovitosti',
      org: 'REALACTIVA, a.s.',
      what: 'Dobíjecí stanice, fotovoltaika a rekonstrukce nemovitostí. Dodavatelé, výběrová řízení, harmonogramy, rozpočty a dotace (OP TAK, RES+).',
      mission: 'Hodně stran, jeden termín a rozpočet, který někdo hlídá.',
    },
    {
      years: '2023 až dnes',
      role: 'R&D Engineer',
      field: 'nanovlákenné materiály',
      org: 'PARDAM NANO4FIBERS s.r.o.',
      what: 'Vývoj filtračních materiálů a respirátorů. Projekty od zadání přes testování po dodání vzorků, technické podklady a prezentace.',
      mission: 'Nejdřív test, pak ostrý provoz.',
    },
    {
      years: '2018 až dnes',
      role: 'Programový vedoucí',
      field: 'dětské tábory',
      org: 'Agentura PAC',
      what: 'Programy na ročníky 2025 a 2026, třetí mám připravený na 2027. Každý běží ve třech bězích po zhruba 120 dětech, pokaždé s jinou partou dospělých. Předtím oddílový vedoucí se zodpovědností za skupinu dětí.',
      mission: null,
    },
  ],
  missionLabel: 'Na misi',
  file: {
    title: 'Spis',
    stamp: 'Odtajněno',
    rows: [
      { key: 'Vzdělání', lines: ['MBA, European School of Business & Management, 2024 až 2025', 'Magisterské studium nanotechnologií, Technická univerzita v Liberci, 2018 až 2023'] },
      { key: 'Jazyky', lines: ['Čeština, angličtina B2, němčina A2'] },
      { key: 'Základna', lines: ['Ústí nad Labem'] },
    ],
  },
};

// The one-page PDF CV that goes out with the site. Same facts, shorter words. Rendered by src/pages/cv.astro.
export const cvSheet = {
  kicker: 'Přihláška · Mission Coordinator · Zrádci',
  name: 'Jan Kolátor',
  alias: 'alias Kolis',
  lead: 'Vymýšlím hry, záhady a programy pro děti i dospělé a pak hlídám, aby to v terénu opravdu běželo. Přes den nanovlákna a dobíjecí stanice.',
  stats: [
    { value: '3 × 120', label: 'dětí, tři běhy jednoho programu' },
    { value: '12', label: 'dní v kuse, každý běh' },
    { value: '23', label: 'vedoucích a praktikantů na běh' },
    { value: '3', label: 'celotáborové programy' },
  ],
  episodesTitle: 'V předchozích dílech',
  episodes: [
    {
      code: 'EP 01',
      genre: 'Detektivka · dospělí',
      title: 'Kdo vypil posledního Radka?',
      meta: 'Podzim 2026 · autor a moderátor',
      text: 'Vlastní detektivka pro 16 dospělých: osobní kartička pro každého hráče, časová linka celého dne bez jediného rozporu a stopy k pachateli rozdané čtyřem lidem. U kulatého stolu šel na pachatele jediný hlas z 16. Jedna z několika víkendovek. Ze stejné je i vlastní edice Time’s Up! se 40 kartami.',
    },
    {
      code: 'EP 02',
      genre: 'Velkofilm · děti',
      title: '24 planet, 6 kamenů, 12 dní',
      meta: 'Tábor Avengers, léto 2025 · programový vedoucí',
      text: 'Tři běhy, v každém zhruba 120 dětí v šesti týmech a jiná parta 23 vedoucích a praktikantů. Příběh, strategie a soutěže v jednom systému, Nádoba osudu s více než 50 efekty. V příběhu jsem hrál Nicka Furyho.',
    },
    {
      code: 'EP 03',
      genre: 'Dokument · produkce',
      title: 'Část bez kamer',
      meta: 'Projektové řízení · nanomateriály a energetika',
      text: 'Koordinace dodavatelů, výběrová řízení, harmonogramy a dotační žádosti (OP TAK, RES+).',
    },
    {
      code: 'EP 04',
      genre: 'Příští řada',
      title: 'Piráti z Karibiku',
      meta: 'Ročník 2027 · program připravený',
      text: 'Třetí ročník a třetí celotáborová hra: devět pirátských lordů, posádky a velké herní pole na principu Monopoly.',
    },
  ],
  honestTitle: 'Karty na stůl',
  webLabel: 'Hravá verze za zámkem',
  webUrl: 'https://najmikolise.cz',
  webHint: 'Heslo je na zdi. Baterku máš v ruce.',
};

export const decision = {
  time: '03:07',
  situation: 'Prší, fouká a mise se začíná sypat. Hráči čekají, štáb se dívá na tebe.',
  choices: [
    { label: 'Zrušit misi', reaction: 'Hráči jdou spát. Diváci nejspíš taky.' },
    { label: 'Opravit to za běhu', reaction: 'Přesně to jsem udělal. Doslova, běžel jsem.' },
    { label: 'Vytáhnout plán B z briefu', reaction: 'Správná odpověď. Já tu noc místo plánu B držel mrtvý zapalovač. Tak jsem běžel.' },
  ],
  story: {
    title: 'Ta noc, kdy jsem v tom stál já',
    intro: 'Noční mise v lese, oddíly dětí na trati. Celý den slunce, předpověď slibovala jasnou noc. Nepřišla.',
    beats: [
      { label: 'Zvrat', text: 'První skupinky byly sotva na trase, když se zvedl vítr a spustil se déšť. Na odkrytém úseku zhasla světla, podle kterých se šlo. Trasa zmizela a děti se začaly vracet. Mise se sypala přímo před očima.' },
      { label: 'Zásah', text: 'Vyrazil jsem lesem mimo dohled i doslech všech na trase. Na místě selhal zapalovač. Zpátky do tábora pro nový a znovu celou cestu k trase. Světla jsem znovu zapálil a přemístil tam, kde je vítr a déšť tolik nebraly.' },
      { label: 'Druhá rána', text: 'Hned nato moje vlastní role: zraněný v lese, kterého má oddíl dopravit do tábora. Nosítka prošla zátěžovými testy a stejně se pode mnou rozpadla. Nikomu se nic nestalo, tak jsem roli neopustil. Oddíl se domluvil sám: chytili mě za ruce a nohy a odnesli mě.' },
    ],
    outcome: 'Program jsme nezrušili. Děti netušily, že se něco pokazilo. Pro ně to byla další překážka mise. Hráč vidí hru. Co se za ní sype, řeším já.',
  },
};

export const crewTitle = 'Jedna mise, čtyři různé papíry';
export const crewVoiceOver = 'Každá složka štábu potřebuje z téže mise něco jiného.';

// Promises for the job, plus a sample of the paper each department would get.
// The sample mission is made up and marked as a sample; it is not a real production document.
export const crew = [
  {
    id: 'rezie',
    name: 'Režie',
    items: [
      'Každá mise na jedné stránce: cíl, zlom a co musí být v záběru.',
      'Změny hlásím hned a rovnou s dopadem na další scény.',
      'Víte, co se stalo i tam, kde kamera nebyla. To sbírám za vás.',
    ],
    doc: {
      title: 'Mise na jednu stránku',
      rows: [
        { key: 'Cíl', value: 'Tým dostane truhlu přes les dřív, než padne tma.' },
        { key: 'Zlom', value: 'V půlce cesty dostane jeden hráč tajný vzkaz. Od té chvíle nikdo neví, komu věřit.' },
        { key: 'V záběru', value: 'Předání vzkazu, reakce týmu u truhly, poslední metry.' },
      ],
    },
  },
  {
    id: 'produkce',
    name: 'Produkce',
    items: [
      'Časový plán, ve kterém je rovnou plán B na počasí i zpoždění.',
      'Lidi, rekvizity a povolení přehledně na jednom místě.',
      'Jedna živá prezentace místo pěti verzí v mailu.',
    ],
    doc: {
      title: 'Plán dne',
      rows: [
        { key: '17:30', value: 'Štáb na místě' },
        { key: '18:15', value: 'Rekvizity a zvuk připravené' },
        { key: '18:45', value: 'Hráči na startu' },
        { key: 'Plán B', value: 'Déšť: krytá trasa, start o 20 minut později.' },
      ],
    },
  },
  {
    id: 'kamera',
    name: 'Kamera a zvuk',
    items: [
      'Kdo se kdy a kudy pohybuje, víte dřív, než přijedete na místo.',
      'Místa, kde se hra může zlomit, jsou označená předem.',
      'Časy a světelné podmínky máte v jednom přehledu.',
    ],
    doc: {
      title: 'Kudy a kdy',
      map: true,
      rows: [
        { key: '19:40', value: 'Zlom na mýtině, ještě za světla' },
        { key: 'Zvuk', value: 'Vzkaz se předává potichu, mikrofon na hráči.' },
      ],
    },
  },
  {
    id: 'hraci',
    name: 'Hráči',
    items: [
      'Pravidla bez skulin, takže se po misi nikdo nehádá, kdo měl pravdu.',
    ],
    doc: {
      title: 'Brief do kapsy',
      rows: [
        { key: 'Úkol', value: 'Doneste truhlu k jezu do 20:30.' },
        { key: 'Pravidlo', value: 'Truhla se nesmí dotknout země.' },
        { key: 'Pozor', value: 'Někdo z vás možná hraje proti vám.' },
      ],
    },
  },
];

export const cards = {
  title: 'Karty na stůl',
  voiceOver: 'Tohle umím a tohle se ještě doučím.',
};

export const honest = [
  {
    need: 'Organizace netradičních akcí',
    proof: 'Tři celotáborové programy, dva odehrané a třetí připravený. Každý na dvanáct dní ve třech bězích po zhruba 120 dětech, pokaždé s jinou partou dospělých. K tomu několik víkendovek pro dospělé, třeba detektivka pro 16 hráčů.' as string | null,
  },
  {
    need: 'Zkušenost s natáčením',
    proof: 'Jeden natáčecí den ve filmu Vyšehrad: Dvje, kam vybrali náš fotbalový klub. Překvapilo mě, kolik opakování stojí scéna na tři minuty. Víc zatím nemám.' as string | null,
  },
  {
    need: 'Znalost struktury štábu',
    proof: 'Základní představa z toho jednoho dne: kdo za co odpovídá a na koho navazuje. Štáb jsem nikdy nevedl, tohle se doučím. Vedl jsem ale týmy ve firmě a na projektech.' as string | null,
  },
  {
    need: 'Briefy a pravidla pro hráče',
    proof: 'Před každou hrou píšu koncept, pravidla, mechaniky a pokyny pro vedoucí. Hráčům je podávám ústně, často scénkou.' as string | null,
  },
  {
    need: 'Tvorba prezentací',
    proof: 'Ne pravidelně, ale pro vedení firmy: nové projekty, investiční záměry a jejich stav, aby se podle nich dalo rozhodnout.' as string | null,
  },
  {
    need: 'Přirozená autorita a klid',
    proof: 'Když vedoucí či projektový manažer panikaří, přenese to na děti nebo na svůj tým, takže komplikace řeším tak, aby je nepoznaly. Když se pode mnou v lese rozpadla nosítka, zůstal jsem v roli.' as string | null,
  },
];

export const finale = {
  title: 'Hlasuj.',
  photo: 'img/kolis-sako-a.webp',
  photoAlt: 'Jan Kolátor v saku',
  ballot: { kicker: 'Hlasovací lístek', name: 'Jan „Kolis“ Kolátor', role: 'Mission Coordinator' },
  letter: {
    kicker: 'Můj main quest',
    text: 'Chci dělat hry, ze kterých má člověk husinu ještě za pět let. Hry, u kterých ti dojde, že už se nedíváš, protože jsi součástí hry. Tahle role je můj level 1. Přijdu první, odejdu poslední a všechno, co umíte, si od vás vezmu. A až se o naší hře bude bavit celé Česko, budu vědět, že je čas na level 2.',
    sign: 'Kolis',
  },
  // The runaway button changes its mind on every escape.
  taunts: ['Vyloučit', 'Tudy ne', 'Ani náhodou', 'Skoro', 'Poslední pokus'],
  gaveUp: 'Dobře, tohle je znamení',
  decided: 'Vyloučení se nekoná',
  proofTitle: 'Důkazy ve spisu',
  replay: 'Přehrát znovu',
  proofs: [
    { play: 'ep1', code: 'EP 01', title: 'Detektivka', note: '16 hráčů, 15 tipů vedle' },
    { play: 'ep2', code: 'EP 02', title: 'Tábor Avengers', note: '3 × 120 dětí, 24 planet' },
    { play: 'ep3', code: 'EP 03', title: 'Část bez kamer', note: 'Vlákna, energetika, dotace' },
    { play: 'ep4', code: 'EP 04', title: 'Piráti 2027', note: 'Mapa se teprve kreslí' },
  ],
};

export const contact = {
  email: 'kolatorhonza@gmail.com' as string | null,
  phone: '+420 607 104 921' as string | null,
};

