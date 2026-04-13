/**
 * INCISO 1: Funciones para crear el grafo (ver service.js)
 * INCISO 2: Poblar el grafo con 5 usuarios que cada uno tiene RATED hacia minimo 2 peliculas
 */
import { getService } from './service.js';

async function main() {
  const svc = getService();

  try {
    console.log('=== INCISO 1 & 2: Creacion y poblacion del grafo basico ===\n');

    // Limpiar la base de datos para empezar en limpio
    console.log('--- Limpiando base de datos ---');
    await svc.clearDatabase();

    // ─── Crear 5 usuarios ───
    console.log('\n--- Creando Usuarios ---');
    const users = [
      { userId: 1, name: 'Alice' },
      { userId: 2, name: 'Bob' },
      { userId: 3, name: 'Charlie' },
      { userId: 4, name: 'David' },
      { userId: 5, name: 'Eve' },
    ];
    for (const u of users) await svc.createUser(u);

    // ─── Crear peliculas ───
    console.log('\n--- Creando Peliculas ---');
    const movies = [
      { movieId: 1, title: 'Inception',     year: 2010, plot: 'A thief steals corporate secrets through dream-sharing technology.' },
      { movieId: 2, title: 'The Matrix',     year: 1999, plot: 'A computer hacker learns the true nature of his reality.' },
      { movieId: 3, title: 'Interstellar',   year: 2014, plot: 'Explorers travel through a wormhole to save humanity.' },
      { movieId: 4, title: 'The Godfather',  year: 1972, plot: 'The patriarch of a crime dynasty transfers control to his son.' },
      { movieId: 5, title: 'Pulp Fiction',   year: 1994, plot: 'The lives of hitmen, a boxer, and a gangster intertwine.' },
    ];
    for (const m of movies) await svc.createMovie(m);

    // ─── Crear relaciones RATED (cada usuario califica minimo 2 peliculas) ───
    console.log('\n--- Creando Ratings ---');
    // Alice  -> Inception(5), The Matrix(4), Interstellar(5)
    await svc.createRated({ userId: 1, movieId: 1, rating: 5 });
    await svc.createRated({ userId: 1, movieId: 2, rating: 4 });
    await svc.createRated({ userId: 1, movieId: 3, rating: 5 });
    // Bob    -> The Godfather(5), Pulp Fiction(4)
    await svc.createRated({ userId: 2, movieId: 4, rating: 5 });
    await svc.createRated({ userId: 2, movieId: 5, rating: 4 });
    // Charlie -> Inception(3), The Godfather(4)
    await svc.createRated({ userId: 3, movieId: 1, rating: 3 });
    await svc.createRated({ userId: 3, movieId: 4, rating: 4 });
    // David  -> The Matrix(5), Interstellar(4)
    await svc.createRated({ userId: 4, movieId: 2, rating: 5 });
    await svc.createRated({ userId: 4, movieId: 3, rating: 4 });
    // Eve    -> Pulp Fiction(5), Inception(4)
    await svc.createRated({ userId: 5, movieId: 5, rating: 5 });
    await svc.createRated({ userId: 5, movieId: 1, rating: 4 });

    console.log('\n=== Poblacion finalizada exitosamente! ===');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await svc.close();
  }
}

main();
