import neo4j, { Driver, Session } from 'neo4j-driver';

// Interfaces para definir los tipos de datos requeridos 
export interface User {
  userId: string;
  name: string;
}

export interface Movie {
  movieId: number;
  title: string;
  year: number;
  plot: string;
}

export interface Rating {
  userId: string;
  movieId: number;
  rating: number; // del 0 al 5
}

// Clase de Servicio que contiene las funciones para el grafo
export class Neo4jGraphService {
  private driver: Driver;
  private database: string;

  constructor(uri: string, user: string, pass: string, database: string = 'neo4j') {
    // Inicializar el driver de Neo4j
    this.driver = neo4j.driver(uri, neo4j.auth.basic(user, pass));
    this.database = database;
  }

  public async close() {
    await this.driver.close();
  }

  // 1. Función para crear o actualizar un USER a partir de parámetros
  public async createUser(user: User): Promise<void> {
    const session = this.driver.session({ database: this.database });
    try {
      await session.run(
        `
        MERGE (u:USER {userId: $userId})
        SET u.name = $name
        `,
        { userId: user.userId, name: user.name }
      );
      console.log(` Usuario creado: ${user.name}`);
    } finally {
      await session.close();
    }
  }

  // 2. Función para crear o actualizar un MOVIE a partir de parámetros
  public async createMovie(movie: Movie): Promise<void> {
    const session = this.driver.session({ database: this.database });
    try {
      await session.run(
        `
        MERGE (m:MOVIE {movieId: $movieId})
        SET m.title = $title, m.year = $year, m.plot = $plot
        `,
        { ...movie }
      );
      console.log(` Película creada: ${movie.title}`);
    } finally {
      await session.close();
    }
  }

  // 3. Función para crear la relación RATED de un USER hacia un MOVIE
  public async rateMovie(ratingData: Rating): Promise<void> {
    const session = this.driver.session({ database: this.database });
    try {
      // UNIX timestamp actual expresado en enteros
      const timestamp = Date.now();

      await session.run(
        `
        MATCH (u:USER {userId: $userId})
        MATCH (m:MOVIE {movieId: $movieId})
        MERGE (u)-[r:RATED]->(m)
        SET r.rating = $rating, r.timestamp = $timestamp
        `,
        {
          userId: ratingData.userId,
          movieId: ratingData.movieId,
          rating: ratingData.rating,
          timestamp
        }
      );
      console.log(` Rating añadido: Usuario [${ratingData.userId}] rateó Película [${ratingData.movieId}] con score ${ratingData.rating}`);
    } finally {
      await session.close();
    }
  }
}

// Función Principal (Poblar el grafo con el caso de uso)
async function main() {
  // Ajusta estas credenciales a tu ambiente local o remoto de Neo4j (por defecto usa localhost)
  const uri = process.env.NEO4J_URI || 'neo4j+s://bd2162e2.databases.neo4j.io';
  const user = process.env.NEO4J_USER || 'bd2162e2';
  const password = process.env.NEO4J_PASSWORD || 'udktT-7sVIm2rSQxn5RX9Yls-oDjLg_VIlO2nmo3cfQ';
  const database = process.env.NEO4J_DATABASE || 'bd2162e2';

  console.log('Conectando a la base de datos Neo4j...\\n');
  const graphService = new Neo4jGraphService(uri, user, password, database);

  try {
    // 5 usuarios
    const users: User[] = [
      { userId: 'USR01', name: 'Alice' },
      { userId: 'USR02', name: 'Bob' },
      { userId: 'USR03', name: 'Charlie' },
      { userId: 'USR04', name: 'David' },
      { userId: 'USR05', name: 'Eve' }
    ];

    // Diferentes películas para poder evaluarlas
    const movies: Movie[] = [
      { movieId: 101, title: 'Inception', year: 2010, plot: 'A thief who steals corporate secrets through the use of dream-sharing technology...' },
      { movieId: 102, title: 'The Matrix', year: 1999, plot: 'A computer hacker learns from mysterious rebels about the true nature of his reality...' },
      { movieId: 103, title: 'Interstellar', year: 2014, plot: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity survival.' },
      { movieId: 104, title: 'The Godfather', year: 1972, plot: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.' },
      { movieId: 105, title: 'Pulp Fiction', year: 1994, plot: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence...' }
    ];

    // 1. Registrar a los usuarios
    console.log('--- Creando Usuarios ---');
    for (const u of users) {
      await graphService.createUser(u);
    }

    // 2. Registrar películas
    console.log('\\n--- Creando Películas ---');
    for (const m of movies) {
      await graphService.createMovie(m);
    }

    // 3. Registrar ratings (5 usuarios rankeando mínimo 2 películas distintas)
    console.log('\\n--- Populando Ratings ---');

    // Alice
    await graphService.rateMovie({ userId: 'USR01', movieId: 101, rating: 5 });
    await graphService.rateMovie({ userId: 'USR01', movieId: 102, rating: 4 });
    await graphService.rateMovie({ userId: 'USR01', movieId: 103, rating: 5 });

    // Bob
    await graphService.rateMovie({ userId: 'USR02', movieId: 104, rating: 5 });
    await graphService.rateMovie({ userId: 'USR02', movieId: 105, rating: 4 });

    // Charlie
    await graphService.rateMovie({ userId: 'USR03', movieId: 101, rating: 3 });
    await graphService.rateMovie({ userId: 'USR03', movieId: 104, rating: 4 });

    // David
    await graphService.rateMovie({ userId: 'USR04', movieId: 102, rating: 5 });
    await graphService.rateMovie({ userId: 'USR04', movieId: 103, rating: 4 });

    // Eve
    await graphService.rateMovie({ userId: 'USR05', movieId: 105, rating: 5 });
    await graphService.rateMovie({ userId: 'USR05', movieId: 101, rating: 4 });

    console.log('\\n¡Población finalizada exitosamente!');
  } catch (error) {
    console.error('Error durante la ejecución:', error);
  } finally {
    // Importante liberar los recursos al terminar
    await graphService.close();
  }
}

// Para ejecutar el script directamente
main();
