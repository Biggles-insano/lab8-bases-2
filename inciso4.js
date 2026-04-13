/**
 * INCISO 4: Construir el grafo COMPLETO
 *
 * Labels:  Person, Movie, Genre, User
 * Relaciones: ACTED_IN (role), DIRECTED (role), RATED (rating, timestamp), IN_GENRE
 *
 * Se reutilizan las funciones creadas en service.js (incisos anteriores).
 * Se limpia la base de datos para empezar desde cero.
 */
import { getService } from './service.js';

async function main() {
  const svc = getService();

  try {
    console.log('=== INCISO 4: Grafo completo ===\n');

    console.log('--- Limpiando base de datos ---');
    await svc.clearDatabase();

    // ══════════════════════════════════════════════════════
    //  NODOS: Genre
    // ══════════════════════════════════════════════════════
    console.log('\n--- Creando Generos ---');
    const genres = ['Action', 'Sci-Fi', 'Crime', 'Drama', 'Thriller', 'Adventure', 'Comedy', 'Romance'];
    for (const g of genres) await svc.createGenre({ name: g });

    // ══════════════════════════════════════════════════════
    //  NODOS: Movie  (con TODAS las propiedades del esquema)
    // ══════════════════════════════════════════════════════
    console.log('\n--- Creando Peliculas ---');
    const movies = [
      {
        movieId: 1, title: 'The Matrix', tmdbId: 603, released: '1999-03-31',
        imdbRating: 8.7, year: 1999, imdbId: 133093, runtime: 136,
        countries: ['USA'], imdbVotes: 1900000,
        url: 'https://www.imdb.com/title/tt0133093/',
        revenue: 463517383,
        plot: 'A computer hacker learns from mysterious rebels about the true nature of his reality.',
        poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
        budget: 63000000, languages: ['English'],
      },
      {
        movieId: 2, title: 'Inception', tmdbId: 27205, released: '2010-07-16',
        imdbRating: 8.8, year: 2010, imdbId: 1375666, runtime: 148,
        countries: ['USA', 'UK'], imdbVotes: 2300000,
        url: 'https://www.imdb.com/title/tt1375666/',
        revenue: 836836967,
        plot: 'A thief who steals corporate secrets through dream-sharing technology is given a final job: inception.',
        poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEhniVolU8oiE.jpg',
        budget: 160000000, languages: ['English', 'Japanese', 'French'],
      },
      {
        movieId: 3, title: 'The Godfather', tmdbId: 238, released: '1972-03-14',
        imdbRating: 9.2, year: 1972, imdbId: 68646, runtime: 175,
        countries: ['USA'], imdbVotes: 1800000,
        url: 'https://www.imdb.com/title/tt0068646/',
        revenue: 245066411,
        plot: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
        budget: 6000000, languages: ['English', 'Italian', 'Latin'],
      },
      {
        movieId: 4, title: 'Pulp Fiction', tmdbId: 680, released: '1994-10-14',
        imdbRating: 8.9, year: 1994, imdbId: 110912, runtime: 154,
        countries: ['USA'], imdbVotes: 2000000,
        url: 'https://www.imdb.com/title/tt0110912/',
        revenue: 213928762,
        plot: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine.',
        poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
        budget: 8000000, languages: ['English', 'Spanish', 'French'],
      },
      {
        movieId: 5, title: 'Interstellar', tmdbId: 157336, released: '2014-11-07',
        imdbRating: 8.6, year: 2014, imdbId: 816692, runtime: 169,
        countries: ['USA', 'UK', 'Canada'], imdbVotes: 1700000,
        url: 'https://www.imdb.com/title/tt0816692/',
        revenue: 677471339,
        plot: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanitys survival.',
        poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        budget: 165000000, languages: ['English'],
      },
      {
        movieId: 6, title: 'The Dark Knight', tmdbId: 155, released: '2008-07-18',
        imdbRating: 9.0, year: 2008, imdbId: 468569, runtime: 152,
        countries: ['USA', 'UK'], imdbVotes: 2500000,
        url: 'https://www.imdb.com/title/tt0468569/',
        revenue: 1004558444,
        plot: 'When the menace known as the Joker wreaks havoc on Gotham, Batman must face one of the greatest tests.',
        poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911BTUgME1F2Iam.jpg',
        budget: 185000000, languages: ['English', 'Mandarin'],
      },
      {
        movieId: 7, title: 'Fight Club', tmdbId: 550, released: '1999-10-15',
        imdbRating: 8.8, year: 1999, imdbId: 137523, runtime: 139,
        countries: ['USA', 'Germany'], imdbVotes: 2100000,
        url: 'https://www.imdb.com/title/tt0137523/',
        revenue: 101209702,
        plot: 'An insomniac office worker and a soap salesman build a global underground fight organization.',
        poster: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
        budget: 63000000, languages: ['English'],
      },
      {
        movieId: 8, title: 'Forrest Gump', tmdbId: 13, released: '1994-07-06',
        imdbRating: 8.8, year: 1994, imdbId: 109830, runtime: 142,
        countries: ['USA'], imdbVotes: 2000000,
        url: 'https://www.imdb.com/title/tt0109830/',
        revenue: 677387716,
        plot: 'The presidencies of Kennedy and Johnson through the eyes of an Alabama man with an IQ of 75.',
        poster: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
        budget: 55000000, languages: ['English'],
      },
    ];
    for (const m of movies) await svc.createMovie(m);

    // ══════════════════════════════════════════════════════
    //  NODOS: Person  (actores y directores)
    // ══════════════════════════════════════════════════════
    console.log('\n--- Creando Personas (Actores / Directores) ---');
    const persons = [
      { tmdbId: 6384,  name: 'Keanu Reeves',          born: '1964-09-02', bornIn: 'Beirut, Lebanon',        imdbId: 206, bio: 'Canadian actor known for The Matrix and John Wick.' },
      { tmdbId: 2975,  name: 'Laurence Fishburne',    born: '1961-07-30', bornIn: 'Augusta, Georgia, USA',  imdbId: 401, bio: 'American actor known for The Matrix trilogy.' },
      { tmdbId: 9340,  name: 'Lana Wachowski',        born: '1965-06-21', bornIn: 'Chicago, Illinois, USA', imdbId: 905152, bio: 'Director and writer of The Matrix.' },
      { tmdbId: 6193,  name: 'Leonardo DiCaprio',     born: '1974-11-11', bornIn: 'Los Angeles, CA, USA',   imdbId: 138, bio: 'Oscar-winning actor known for versatility.' },
      { tmdbId: 525,   name: 'Christopher Nolan',     born: '1970-07-30', bornIn: 'London, England, UK',    imdbId: 634, bio: 'British-American filmmaker known for complex narratives.' },
      { tmdbId: 3084,  name: 'Marlon Brando',         born: '1924-04-03', bornIn: 'Omaha, Nebraska, USA',   imdbId: 4, bio: 'Legendary actor considered one of the greatest of all time.' },
      { tmdbId: 1158,  name: 'Al Pacino',             born: '1940-04-25', bornIn: 'New York City, NY, USA', imdbId: 199, bio: 'Iconic actor known for intense performances.' },
      { tmdbId: 1776,  name: 'Francis Ford Coppola',  born: '1939-04-07', bornIn: 'Detroit, Michigan, USA', imdbId: 338, bio: 'Director of The Godfather and Apocalypse Now.' },
      { tmdbId: 8891,  name: 'John Travolta',         born: '1954-02-18', bornIn: 'Englewood, NJ, USA',    imdbId: 855, bio: 'Actor and dancer known for Grease and Pulp Fiction.' },
      { tmdbId: 2231,  name: 'Samuel L. Jackson',     born: '1948-12-21', bornIn: 'Washington, D.C., USA',  imdbId: 5132, bio: 'Prolific actor appearing in over 150 films.' },
      { tmdbId: 138,   name: 'Quentin Tarantino',     born: '1963-03-27', bornIn: 'Knoxville, TN, USA',    imdbId: 233, bio: 'Director known for nonlinear storytelling and stylized violence.' },
      { tmdbId: 10297, name: 'Matthew McConaughey',   born: '1969-11-04', bornIn: 'Uvalde, Texas, USA',     imdbId: 190, bio: 'Oscar-winning actor known for dramatic and comedic roles.' },
      { tmdbId: 3894,  name: 'Christian Bale',        born: '1974-01-30', bornIn: 'Haverfordwest, Wales, UK', imdbId: 288, bio: 'Method actor known for physical transformations.' },
      { tmdbId: 1810,  name: 'Heath Ledger',          born: '1979-04-04', bornIn: 'Perth, Australia',       imdbId: 2778, bio: 'Australian actor known for his Oscar-winning Joker role.' },
      { tmdbId: 287,   name: 'Brad Pitt',             born: '1963-12-18', bornIn: 'Shawnee, Oklahoma, USA', imdbId: 93, bio: 'Oscar-winning actor and producer.' },
      { tmdbId: 819,   name: 'Edward Norton',         born: '1969-08-18', bornIn: 'Boston, MA, USA',        imdbId: 368, bio: 'Acclaimed actor known for Fight Club and American History X.' },
      { tmdbId: 7467,  name: 'David Fincher',         born: '1962-08-28', bornIn: 'Denver, Colorado, USA',  imdbId: 274, bio: 'Director known for dark thrillers like Se7en and Fight Club.' },
      { tmdbId: 31,    name: 'Tom Hanks',             born: '1956-07-09', bornIn: 'Concord, CA, USA',       imdbId: 158, bio: 'Two-time Oscar-winning actor and filmmaker.' },
      { tmdbId: 24,    name: 'Robert Zemeckis',       born: '1951-05-14', bornIn: 'Chicago, Illinois, USA', imdbId: 709, bio: 'Director of Back to the Future and Forrest Gump.' },
    ];
    for (const p of persons) await svc.createPerson(p);

    // ══════════════════════════════════════════════════════
    //  NODOS: User
    // ══════════════════════════════════════════════════════
    console.log('\n--- Creando Usuarios ---');
    const users = [
      { userId: 1, name: 'Alice' },
      { userId: 2, name: 'Bob' },
      { userId: 3, name: 'Charlie' },
      { userId: 4, name: 'David' },
      { userId: 5, name: 'Eve' },
    ];
    for (const u of users) await svc.createUser(u);

    // ══════════════════════════════════════════════════════
    //  RELACIONES: ACTED_IN
    // ══════════════════════════════════════════════════════
    console.log('\n--- Creando relaciones ACTED_IN ---');
    const actedInData = [
      // The Matrix
      { personTmdbId: 6384, movieId: 1, role: 'Neo' },
      { personTmdbId: 2975, movieId: 1, role: 'Morpheus' },
      // Inception
      { personTmdbId: 6193, movieId: 2, role: 'Dom Cobb' },
      // The Godfather
      { personTmdbId: 3084, movieId: 3, role: 'Don Vito Corleone' },
      { personTmdbId: 1158, movieId: 3, role: 'Michael Corleone' },
      // Pulp Fiction
      { personTmdbId: 8891, movieId: 4, role: 'Vincent Vega' },
      { personTmdbId: 2231, movieId: 4, role: 'Jules Winnfield' },
      // Interstellar
      { personTmdbId: 10297, movieId: 5, role: 'Cooper' },
      // The Dark Knight
      { personTmdbId: 3894, movieId: 6, role: 'Bruce Wayne / Batman' },
      { personTmdbId: 1810, movieId: 6, role: 'The Joker' },
      // Fight Club
      { personTmdbId: 287, movieId: 7, role: 'Tyler Durden' },
      { personTmdbId: 819, movieId: 7, role: 'The Narrator' },
      // Forrest Gump
      { personTmdbId: 31, movieId: 8, role: 'Forrest Gump' },
    ];
    for (const a of actedInData) await svc.createActedIn(a);

    // ══════════════════════════════════════════════════════
    //  RELACIONES: DIRECTED
    // ══════════════════════════════════════════════════════
    console.log('\n--- Creando relaciones DIRECTED ---');
    const directedData = [
      { personTmdbId: 9340, movieId: 1, role: 'Director' },           // Lana Wachowski -> The Matrix
      { personTmdbId: 525,  movieId: 2, role: 'Director' },           // Nolan -> Inception
      { personTmdbId: 1776, movieId: 3, role: 'Director' },           // Coppola -> The Godfather
      { personTmdbId: 138,  movieId: 4, role: 'Director' },           // Tarantino -> Pulp Fiction
      { personTmdbId: 525,  movieId: 5, role: 'Director' },           // Nolan -> Interstellar
      { personTmdbId: 525,  movieId: 6, role: 'Director' },           // Nolan -> The Dark Knight
      { personTmdbId: 7467, movieId: 7, role: 'Director' },           // Fincher -> Fight Club
      { personTmdbId: 24,   movieId: 8, role: 'Director' },           // Zemeckis -> Forrest Gump
    ];
    for (const d of directedData) await svc.createDirected(d);

    // ══════════════════════════════════════════════════════
    //  RELACIONES: RATED  (5 usuarios, cada uno minimo 2 peliculas)
    // ══════════════════════════════════════════════════════
    console.log('\n--- Creando relaciones RATED ---');
    const ratedData = [
      // Alice rates 3 movies
      { userId: 1, movieId: 1, rating: 5 },  // The Matrix
      { userId: 1, movieId: 2, rating: 5 },  // Inception
      { userId: 1, movieId: 5, rating: 4 },  // Interstellar
      // Bob rates 3 movies
      { userId: 2, movieId: 3, rating: 5 },  // The Godfather
      { userId: 2, movieId: 4, rating: 4 },  // Pulp Fiction
      { userId: 2, movieId: 7, rating: 4 },  // Fight Club
      // Charlie rates 2 movies
      { userId: 3, movieId: 6, rating: 5 },  // The Dark Knight
      { userId: 3, movieId: 1, rating: 4 },  // The Matrix
      // David rates 3 movies
      { userId: 4, movieId: 8, rating: 5 },  // Forrest Gump
      { userId: 4, movieId: 5, rating: 4 },  // Interstellar
      { userId: 4, movieId: 2, rating: 5 },  // Inception
      // Eve rates 2 movies
      { userId: 5, movieId: 4, rating: 5 },  // Pulp Fiction
      { userId: 5, movieId: 6, rating: 4 },  // The Dark Knight
    ];
    for (const r of ratedData) await svc.createRated(r);

    // ══════════════════════════════════════════════════════
    //  RELACIONES: IN_GENRE
    // ══════════════════════════════════════════════════════
    console.log('\n--- Creando relaciones IN_GENRE ---');
    const inGenreData = [
      // The Matrix -> Action, Sci-Fi
      { movieId: 1, genreName: 'Action' },
      { movieId: 1, genreName: 'Sci-Fi' },
      // Inception -> Action, Sci-Fi, Thriller
      { movieId: 2, genreName: 'Action' },
      { movieId: 2, genreName: 'Sci-Fi' },
      { movieId: 2, genreName: 'Thriller' },
      // The Godfather -> Crime, Drama
      { movieId: 3, genreName: 'Crime' },
      { movieId: 3, genreName: 'Drama' },
      // Pulp Fiction -> Crime, Thriller
      { movieId: 4, genreName: 'Crime' },
      { movieId: 4, genreName: 'Thriller' },
      // Interstellar -> Sci-Fi, Adventure, Drama
      { movieId: 5, genreName: 'Sci-Fi' },
      { movieId: 5, genreName: 'Adventure' },
      { movieId: 5, genreName: 'Drama' },
      // The Dark Knight -> Action, Crime, Drama, Thriller
      { movieId: 6, genreName: 'Action' },
      { movieId: 6, genreName: 'Crime' },
      { movieId: 6, genreName: 'Drama' },
      { movieId: 6, genreName: 'Thriller' },
      // Fight Club -> Drama, Thriller
      { movieId: 7, genreName: 'Drama' },
      { movieId: 7, genreName: 'Thriller' },
      // Forrest Gump -> Drama, Comedy, Romance
      { movieId: 8, genreName: 'Drama' },
      { movieId: 8, genreName: 'Comedy' },
      { movieId: 8, genreName: 'Romance' },
    ];
    for (const ig of inGenreData) await svc.createInGenre(ig);

    console.log('\n=== Grafo completo creado exitosamente! ===');

    // ── Resumen ──
    const countRes = await svc.run(`
      MATCH (n)
      RETURN labels(n)[0] AS label, count(n) AS total
      ORDER BY label
    `);
    console.log('\n--- Resumen de nodos ---');
    for (const rec of countRes.records) {
      console.log(`  ${rec.get('label')}: ${rec.get('total')}`);
    }

    const relRes = await svc.run(`
      MATCH ()-[r]->()
      RETURN type(r) AS tipo, count(r) AS total
      ORDER BY tipo
    `);
    console.log('\n--- Resumen de relaciones ---');
    for (const rec of relRes.records) {
      console.log(`  ${rec.get('tipo')}: ${rec.get('total')}`);
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await svc.close();
  }
}

main();
