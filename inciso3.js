/**
 * INCISO 3: Funciones de busqueda
 *   1. Buscar un usuario
 *   2. Buscar una pelicula
 *   3. Buscar un usuario con su relacion RATED hacia peliculas
 *
 * NOTA: Ejecutar primero inciso1y2.js para que existan datos en la base.
 */
import { getService } from './service.js';

async function main() {
  const svc = getService();

  try {
    console.log('=== INCISO 3: Funciones de busqueda ===\n');

    // ─── 3.1  Buscar un usuario por nombre ───
    console.log('--- 3.1 Buscar usuario: "Alice" ---');
    const users = await svc.findUser('Alice');
    if (users.length > 0) {
      console.log('  Resultado:', JSON.stringify(users, null, 2));
    } else {
      console.log('  No se encontro el usuario.');
    }

    // ─── 3.2  Buscar una pelicula por titulo ───
    console.log('\n--- 3.2 Buscar pelicula: "The Matrix" ---');
    const movies = await svc.findMovie('The Matrix');
    if (movies.length > 0) {
      console.log('  Resultado:', JSON.stringify(movies, null, 2));
    } else {
      console.log('  No se encontro la pelicula.');
    }

    // ─── 3.3  Buscar un usuario con su relacion RATED hacia peliculas ───
    console.log('\n--- 3.3 Buscar relaciones RATED del usuario "Alice" ---');
    const ratings = await svc.findUserRatings('Alice');
    if (ratings.length > 0) {
      for (const { user, rating, movie } of ratings) {
        console.log(`  ${user.name} -> RATED(rating=${rating.rating}) -> ${movie.title}`);
      }
    } else {
      console.log('  No se encontraron ratings para este usuario.');
    }

    // ─── Busqueda adicional para evidenciar funcionamiento ───
    console.log('\n--- 3.3 (extra) Buscar relaciones RATED del usuario "Bob" ---');
    const bobRatings = await svc.findUserRatings('Bob');
    if (bobRatings.length > 0) {
      for (const { user, rating, movie } of bobRatings) {
        console.log(`  ${user.name} -> RATED(rating=${rating.rating}) -> ${movie.title}`);
      }
    } else {
      console.log('  No se encontraron ratings para este usuario.');
    }

    console.log('\n=== Busquedas finalizadas exitosamente! ===');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await svc.close();
  }
}

main();
