import { MediaType } from "@/domain/media/media";
import { createId } from "@paralleldrive/cuid2";
import { db } from "./connection";
import { media as mediaSchema } from "./schema";

async function seedMedia() {
	const mediaItems = [
		// Filmes
		{
			id: createId(),
			name: "A Origem",
			originalName: "Inception",
			duration: 148,
			releaseYear: 2010,
			actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
			categories: ["Ficção Científica", "Ação", "Aventura"],
			type: MediaType.MOVIE,
			description:
				"Um ladrão que rouba segredos corporativos através do uso de tecnologia de compartilhamento de sonhos é encarregado da tarefa inversa de plantar uma ideia na mente de um CEO.",
			director: "Christopher Nolan",
			awards: ["Academy Award for Best Cinemography", "Golden Globe Award"],
			rating: 8,
			coverLink:
				"https://image.tmdb.org/t/p/w600_and_h900_bestv2/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
			trailerLink: "https://youtu.be/cdx31ak4KbQ",
		},
		{
			id: createId(),
			name: "O Resgate do Soldado Ryan",
			originalName: "Saving Private Ryan",
			duration: 169,
			releaseYear: 1998,
			actors: ["Tom Hanks", "Matt Damon", "Tom Sizemore"],
			categories: ["Guerra", "Drama"],
			type: MediaType.MOVIE,
			description:
				"Após o desembarque na Normandia, um grupo de soldados dos EUA parte em uma missão perigosa para resgatar o soldado James Ryan, cujos irmãos foram mortos em combate.",
			director: "Steven Spielberg",
			awards: ["5 Academy Awards", "Golden Globe Award"],
			rating: 8,
			coverLink:
				"https://image.tmdb.org/t/p/w600_and_h900_bestv2/hMLxNLCXRDd62acfCBn6mIyW1HU.jpg",
			trailerLink: "https://youtu.be/zwhP5b4tD6g",
		},
		{
			id: createId(),
			name: "Clube da Luta",
			originalName: "Fight Club",
			duration: 139,
			releaseYear: 1999,
			actors: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
			categories: ["Drama", "Suspense"],
			type: MediaType.MOVIE,
			description:
				"Um homem insatisfeito com sua vida cria um clube de luta clandestino com um vendedor de sabão e se envolve em uma espiral de caos.",
			director: "David Fincher",
			awards: ["N/A"],
			rating: 8,
			coverLink:
				"https://image.tmdb.org/t/p/w600_and_h900_bestv2/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
			trailerLink: "https://youtu.be/qtRKdVHc-cE",
		},
		{
			id: createId(),
			name: "O Cavaleiro das Trevas",
			originalName: "The Dark Knight",
			duration: 152,
			releaseYear: 2008,
			actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
			categories: ["Ação", "Crime", "Drama"],
			type: MediaType.MOVIE,
			description:
				"Quando o Coringa emerge como uma nova ameaça, Batman deve enfrentar um desafio moral para salvar Gotham da destruição total.",
			director: "Christopher Nolan",
			awards: ["2 Academy Awards", "BAFTA Award"],
			rating: 9,
			coverLink:
				"https://image.tmdb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
			trailerLink: "https://youtu.be/EXeTwQWrcwY",
		},
		{
			id: createId(),
			name: "Forrest Gump: O Contador de Histórias",
			originalName: "Forrest Gump",
			duration: 142,
			releaseYear: 1994,
			actors: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
			categories: ["Drama", "Romance"],
			type: MediaType.MOVIE,
			description:
				"As aventuras de um homem simples e de bom coração que testemunha vários eventos históricos importantes enquanto vive sua vida.",
			director: "Robert Zemeckis",
			awards: ["6 Academy Awards", "Golden Globe Award"],
			rating: 8,
			coverLink:
				"https://image.tmdb.org/t/p/w600_and_h900_bestv2/h5J4W4veyxMXDMjeNxZI46TsHOb.jpg",
			trailerLink: "https://youtu.be/bLvqoHBptjg",
		},
		{
			id: createId(),
			name: "Pulp Fiction: Tempo de Violência",
			originalName: "Pulp Fiction",
			duration: 154,
			releaseYear: 1994,
			actors: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
			categories: ["Crime", "Drama"],
			type: MediaType.MOVIE,
			description:
				"As vidas de dois assassinos, um boxeador, a esposa de um gângster e dois ladrões de restaurante se entrelaçam em quatro contos de violência e redenção.",
			director: "Quentin Tarantino",
			awards: ["Palme d'Or", "Academy Award for Best Screenplay"],
			rating: 8,
			coverLink:
				"https://image.tmdb.org/t/p/w600_and_h900_bestv2/tptjnB2LDbuUWya9Cx5sQtv5hqb.jpg",
			trailerLink: "https://youtu.be/s7EdQ4FqbhY",
		},
		{
			id: createId(),
			name: "O Senhor dos Anéis: A Sociedade do Anel",
			originalName: "The Lord of the Rings: The Fellowship of the Ring",
			duration: 178,
			releaseYear: 2001,
			actors: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"],
			categories: ["Aventura", "Fantasia", "Ação"],
			type: MediaType.MOVIE,
			description:
				"Um jovem hobbit é encarregado de destruir um anel mágico antes que ele caia nas mãos de um vilão maligno.",
			director: "Peter Jackson",
			awards: ["4 Academy Awards", "BAFTA Award"],
			rating: 8,
			coverLink:
				"https://image.tmdb.org/t/p/w600_and_h900_bestv2/56zTpe2xvaA4alU51sRWPoKPYZy.jpg",
			trailerLink: "https://youtu.be/V75dMMIW2B4",
		},
		{
			id: createId(),
			name: "Matrix",
			originalName: "The Matrix",
			duration: 136,
			releaseYear: 1999,
			actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
			categories: ["Ação", "Ficção Científica"],
			type: MediaType.MOVIE,
			description:
				"Um programador de computadores descobre que a realidade como ele a conhece é uma simulação e lidera a resistência contra seus controladores.",
			director: "The Wachowskis",
			awards: ["4 Academy Awards"],
			rating: 8,
			coverLink:
				"https://image.tmdb.org/t/p/w600_and_h900_bestv2/qFHE09iQDbpHUBXJ8cFZu9v2ViO.jpg",
			trailerLink: "https://youtu.be/vKQi3bBA1y8",
		},
		{
			id: createId(),
			name: "Gladiador",
			originalName: "Gladiator",
			duration: 155,
			releaseYear: 2000,
			actors: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
			categories: ["Ação", "Aventura", "Drama"],
			type: MediaType.MOVIE,
			description:
				"Um general romano é traído e reduzido à escravidão, mas retorna a Roma como gladiador em busca de vingança.",
			director: "Ridley Scott",
			awards: ["5 Academy Awards", "Golden Globe Award"],
			rating: 8,
			coverLink:
				"https://image.tmdb.org/t/p/w600_and_h900_bestv2/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
			trailerLink: "https://youtu.be/owK1qxDselE",
		},
		{
			id: createId(),
			name: "Os Bons Companheiros",
			originalName: "Goodfellas",
			duration: 145,
			releaseYear: 1990,
			actors: ["Robert De Niro", "Ray Liotta", "Joe Pesci"],
			categories: ["Crime", "Drama"],
			type: MediaType.MOVIE,
			description:
				"A história real de Henry Hill, um mafioso que ascende nas fileiras do crime organizado antes de cair em desgraça.",
			director: "Martin Scorsese",
			awards: ["Academy Award for Best Supporting Actor"],
			rating: 8,
			coverLink:
				"https://image.tmdb.org/t/p/w600_and_h900_bestv2/sTReXuaND1AjkXUfjl1gqRcuGfI.jpg",
			trailerLink: "https://youtu.be/qo5jJpHtI1Y",
		},

		// Séries
		{
			id: createId(),
			name: "Breaking Bad",
			originalName: "Breaking Bad",
			duration: 47,
			releaseYear: 2008,
			actors: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
			categories: ["Crime", "Drama", "Thriller"],
			type: MediaType.SERIES,
			description:
				"Um professor de química do ensino médio, convertido em fabricante de metanfetamina, enfrenta dilemas morais e desafios criminais.",
			director: "Vince Gilligan",
			awards: ["16 Primetime Emmy Awards", "Golden Globe Award"],
			rating: 9,
			coverLink:
				"https://image.tmdb.org/t/p/w600_and_h900_bestv2/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
			trailerLink: "https://youtu.be/XZ8daibM3AE",
		},
		{
			id: createId(),
			name: "Game of Thrones",
			originalName: "Game of Thrones",
			duration: 57,
			releaseYear: 2011,
			actors: ["Emilia Clarke", "Kit Harington", "Lena Headey"],
			categories: ["Fantasia", "Drama", "Ação"],
			type: MediaType.SERIES,
			description:
				"Famílias nobres lutam pelo controle do trono de ferro no continente fictício de Westeros.",
			director: "David Benioff, D.B. Weiss",
			awards: ["59 Primetime Emmy Awards", "Golden Globe Award"],
			rating: 9,
			coverLink:
				"https://image.tmdb.org/t/p/w600_and_h900_bestv2/l2ezB41chGDjXcKo24lseuXYtKP.jpg",
			trailerLink: "https://youtu.be/KPLWWIOCOOQ",
		},
		{
			id: createId(),
			name: "Stranger Things",
			originalName: "Stranger Things",
			duration: 50,
			releaseYear: 2016,
			actors: ["Winona Ryder", "David Harbour", "Millie Bobby Brown"],
			categories: ["Ficção Científica", "Drama", "Terror"],
			type: MediaType.SERIES,
			description:
				"Um grupo de crianças descobre mistérios sobrenaturais e segredos do governo em sua pequena cidade.",
			director: "The Duffer Brothers",
			awards: ["7 Primetime Emmy Awards"],
			rating: 8,
			coverLink:
				"https://image.tmdb.org/t/p/w600_and_h900_bestv2/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
			trailerLink: "https://youtu.be/b9EkMc79ZSU",
		},
		{
			id: createId(),
			name: "The Crown",
			originalName: "The Crown",
			duration: 58,
			releaseYear: 2016,
			actors: ["Claire Foy", "Olivia Colman", "Matt Smith"],
			categories: ["Drama", "Histórico"],
			type: MediaType.SERIES,
			description:
				"A série retrata o reinado da Rainha Elizabeth II e os eventos políticos que moldaram o século XX.",
			director: "Peter Morgan",
			awards: ["11 Primetime Emmy Awards"],
			rating: 8,
			coverLink:
				"https://image.tmdb.org/t/p/w600_and_h900_bestv2/ziz3P73zq9EgoT3b2lGJ46BML78.jpg",
			trailerLink: "https://youtu.be/JWtnJjn6ng0",
		},
		{
			id: createId(),
			name: "Game of Thrones",
			originalName: "Game of Thrones",
			duration: 57,
			releaseYear: 2011,
			actors: ["Emilia Clarke", "Kit Harington", "Peter Dinklage"],
			categories: ["Fantasia", "Drama", "Ação"],
			type: MediaType.SERIES,
			description:
				"Nove famílias nobres lutam pelo controle da terra mística de Westeros.",
			director: "David Benioff, D.B. Weiss",
			awards: ["59 Primetime Emmy Awards"],
			rating: 9,
			coverLink:
				"https://image.tmdb.org/t/p/w600_and_h900_bestv2/7WwnY62NdOfkZL62HVGXAU3GqVt.jpg",
			trailerLink: "https://youtu.be/KPLWWIOCOOQ",
		},
		{
			id: createId(),
			name: "La Casa de Papel",
			originalName: "Money Heist",
			duration: 70,
			releaseYear: 2017,
			actors: ["Álvaro Morte", "Úrsula Corberó", "Pedro Alonso"],
			categories: ["Crime", "Suspense", "Ação"],
			type: MediaType.SERIES,
			description:
				"Um grupo de criminosos planeja o maior assalto da história, invadindo a Casa da Moeda da Espanha.",
			director: "Álex Pina",
			awards: ["Emmy Internacional de Melhor Série Dramática"],
			rating: 8,
			coverLink:
				"https://image.tmdb.org/t/p/w600_and_h900_bestv2/qUmlmYWx3WndM01DHOTrmeiklVW.jpg",
			trailerLink: "https://youtu.be/hMANIarjT50",
		},
		{
			id: createId(),
			name: "Dark",
			originalName: "Dark",
			duration: 60,
			releaseYear: 2017,
			actors: ["Louis Hofmann", "Lisa Vicari", "Maja Schöne"],
			categories: ["Ficção Científica", "Mistério", "Drama"],
			type: MediaType.SERIES,
			description:
				"Quatro famílias descobrem segredos ao tentar desvendar a verdade por trás de uma série de desaparecimentos misteriosos.",
			director: "Baran bo Odar",
			awards: ["Grimme-Preis"],
			rating: 8,
			coverLink:
				"https://image.tmdb.org/t/p/w600_and_h900_bestv2/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg",
			trailerLink: "https://youtu.be/rrwycJ08PSA",
		},
		{
			id: createId(),
			name: "Black Mirror",
			originalName: "Black Mirror",
			duration: 60,
			releaseYear: 2011,
			actors: ["Bryce Dallas Howard", "Daniel Kaluuya", "Michaela Coel"],
			categories: ["Ficção Científica", "Suspense", "Drama"],
			type: MediaType.SERIES,
			description:
				"Uma série de antologia que explora um futuro próximo e o impacto sombrio da tecnologia na sociedade.",
			director: "Charlie Brooker",
			awards: ["6 Primetime Emmy Awards"],
			rating: 8,
			coverLink:
				"https://image.tmdb.org/t/p/w600_and_h900_bestv2/p2nvNU10o93WkrAWfQ4D3QJAxdb.jpg",
			trailerLink: "https://youtu.be/jROLrhQkK78",
		},
		{
			id: createId(),
			name: "The Witcher",
			originalName: "The Witcher",
			duration: 60,
			releaseYear: 2019,
			actors: ["Henry Cavill", "Anya Chalotra", "Freya Allan"],
			categories: ["Fantasia", "Ação", "Aventura"],
			type: MediaType.SERIES,
			description:
				"Geralt de Rivia, um caçador de monstros mutante, luta para encontrar seu lugar em um mundo onde as pessoas muitas vezes são mais perversas do que as bestas.",
			director: "Lauren Schmidt Hissrich",
			awards: ["People's Choice Awards"],
			rating: 8,
			coverLink:
				"https://image.tmdb.org/t/p/w600_and_h900_bestv2/uJ1kQWTY1nElMcrrbHtDitbV85K.jpg",
			trailerLink: "https://youtu.be/ndl1W4ltcmg",
		},
		{
			id: createId(),
			name: "Narcos",
			originalName: "Narcos",
			duration: 49,
			releaseYear: 2015,
			actors: ["Wagner Moura", "Pedro Pascal", "Boyd Holbrook"],
			categories: ["Crime", "Drama"],
			type: MediaType.SERIES,
			description:
				"A história da ascensão do cartel de drogas de Pablo Escobar na Colômbia e as tentativas da DEA de derrubá-lo.",
			director: "Chris Brancato",
			awards: ["3 Primetime Emmy Awards"],
			rating: 8,
			coverLink:
				"https://image.tmdb.org/t/p/w600_and_h900_bestv2/8esiSJxwNY6Q5gNSMWPfMSqarGv.jpg",
			trailerLink: "https://youtu.be/U7elNhHwgBU",
		},
		{
			id: createId(),
			name: "The Mandalorian",
			originalName: "The Mandalorian",
			duration: 40,
			releaseYear: 2019,
			actors: ["Pedro Pascal", "Carl Weathers", "Gina Carano"],
			categories: ["Aventura", "Ficção Científica", "Fantasia"],
			type: MediaType.SERIES,
			description:
				"Um caçador de recompensas embarca em uma missão no lado mais sombrio da galáxia, distante da autoridade da Nova República.",
			director: "Jon Favreau",
			awards: ["7 Primetime Emmy Awards"],
			rating: 8,
			coverLink:
				"https://image.tmdb.org/t/p/w600_and_h900_bestv2/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg",
			trailerLink: "https://youtu.be/aOC8E8z_ifw",
		},
	];

	for (const mediaItem of mediaItems) {
		await db.insert(mediaSchema).values(mediaItem);
	}

	console.log("Database seeded with media items");
}

seedMedia()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
