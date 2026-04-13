import neo4j from 'neo4j-driver';

const NEO4J_URI   = 'neo4j+s://4684b95c.databases.neo4j.io';
const NEO4J_USER   = '4684b95c';
const NEO4J_PASS   = 'VmXhuiwdIpAPlQnY9CEwzP87IwYTfpY_MeafFYlP-88';
const NEO4J_DB     = '4684b95c';

export class Neo4jService {
  constructor(uri = NEO4J_URI, user = NEO4J_USER, password = NEO4J_PASS, database = NEO4J_DB) {
    this.driver   = neo4j.driver(uri, neo4j.auth.basic(user, password));
    this.database = database;
  }

  async close() {
    await this.driver.close();
  }

  async run(cypher, params = {}) {
    const session = this.driver.session({ database: this.database });
    try {
      return await session.run(cypher, params);
    } finally {
      await session.close();
    }
  }

  // ────────────────────── Node creation ──────────────────────

  async createUser({ userId, name }) {
    await this.run(
      `MERGE (u:User {userId: $userId})
       SET u.name = $name
       RETURN u`,
      { userId: neo4j.int(userId), name }
    );
    console.log(`  [User]   ${name} (id=${userId})`);
  }

  async createMovie(m) {
    await this.run(
      `MERGE (mv:Movie {movieId: $movieId})
       SET mv.title      = $title,
           mv.tmdbId     = $tmdbId,
           mv.released   = $released,
           mv.imdbRating = $imdbRating,
           mv.year       = $year,
           mv.imdbId     = $imdbId,
           mv.runtime    = $runtime,
           mv.countries  = $countries,
           mv.imdbVotes  = $imdbVotes,
           mv.url        = $url,
           mv.revenue    = $revenue,
           mv.plot       = $plot,
           mv.poster     = $poster,
           mv.budget     = $budget,
           mv.languages  = $languages
       RETURN mv`,
      {
        movieId:    neo4j.int(m.movieId),
        title:      m.title,
        tmdbId:     m.tmdbId     != null ? neo4j.int(m.tmdbId) : null,
        released:   m.released   ?? null,
        imdbRating: m.imdbRating ?? null,
        year:       m.year       != null ? neo4j.int(m.year) : null,
        imdbId:     m.imdbId     != null ? neo4j.int(m.imdbId) : null,
        runtime:    m.runtime    != null ? neo4j.int(m.runtime) : null,
        countries:  m.countries  ?? null,
        imdbVotes:  m.imdbVotes  != null ? neo4j.int(m.imdbVotes) : null,
        url:        m.url        ?? null,
        revenue:    m.revenue    != null ? neo4j.int(m.revenue) : null,
        plot:       m.plot       ?? null,
        poster:     m.poster     ?? null,
        budget:     m.budget     != null ? neo4j.int(m.budget) : null,
        languages:  m.languages  ?? null,
      }
    );
    console.log(`  [Movie]  ${m.title} (${m.year})`);
  }

  async createPerson(p) {
    await this.run(
      `MERGE (pe:Person {tmdbId: $tmdbId})
       SET pe.name   = $name,
           pe.born   = $born,
           pe.bornIn = $bornIn,
           pe.imdbId = $imdbId,
           pe.bio    = $bio,
           pe.poster = $poster
       RETURN pe`,
      {
        tmdbId: neo4j.int(p.tmdbId),
        name:   p.name,
        born:   p.born   ?? null,
        bornIn: p.bornIn ?? null,
        imdbId: p.imdbId != null ? neo4j.int(p.imdbId) : null,
        bio:    p.bio    ?? null,
        poster: p.poster ?? null,
      }
    );
    console.log(`  [Person] ${p.name}`);
  }

  async createGenre({ name }) {
    await this.run(
      `MERGE (g:Genre {name: $name}) RETURN g`,
      { name }
    );
    console.log(`  [Genre]  ${name}`);
  }

  // ────────────────────── Relationship creation ──────────────────────

  async createActedIn({ personTmdbId, movieId, role }) {
    await this.run(
      `MATCH (p:Person {tmdbId: $tmdbId})
       MATCH (m:Movie  {movieId: $movieId})
       MERGE (p)-[r:ACTED_IN]->(m)
       SET r.role = $role
       RETURN p, r, m`,
      { tmdbId: neo4j.int(personTmdbId), movieId: neo4j.int(movieId), role }
    );
    console.log(`  [ACTED_IN]  Person(${personTmdbId}) -> Movie(${movieId}) role="${role}"`);
  }

  async createDirected({ personTmdbId, movieId, role }) {
    await this.run(
      `MATCH (p:Person {tmdbId: $tmdbId})
       MATCH (m:Movie  {movieId: $movieId})
       MERGE (p)-[r:DIRECTED]->(m)
       SET r.role = $role
       RETURN p, r, m`,
      { tmdbId: neo4j.int(personTmdbId), movieId: neo4j.int(movieId), role: role ?? 'Director' }
    );
    console.log(`  [DIRECTED]  Person(${personTmdbId}) -> Movie(${movieId})`);
  }

  async createRated({ userId, movieId, rating }) {
    const ts = Date.now();
    await this.run(
      `MATCH (u:User  {userId:  $userId})
       MATCH (m:Movie {movieId: $movieId})
       MERGE (u)-[r:RATED]->(m)
       SET r.rating = $rating, r.timestamp = $ts
       RETURN u, r, m`,
      { userId: neo4j.int(userId), movieId: neo4j.int(movieId), rating: neo4j.int(rating), ts: neo4j.int(ts) }
    );
    console.log(`  [RATED]     User(${userId}) -> Movie(${movieId}) rating=${rating}`);
  }

  async createInGenre({ movieId, genreName }) {
    await this.run(
      `MATCH (m:Movie {movieId: $movieId})
       MATCH (g:Genre {name: $genreName})
       MERGE (m)-[r:IN_GENRE]->(g)
       RETURN m, r, g`,
      { movieId: neo4j.int(movieId), genreName }
    );
    console.log(`  [IN_GENRE]  Movie(${movieId}) -> Genre(${genreName})`);
  }

  // ────────────────────── Search / query functions (Inciso 3) ──────────────────────

  async findUser(name) {
    const res = await this.run(
      `MATCH (u:User {name: $name}) RETURN u`,
      { name }
    );
    return res.records.map(r => r.get('u').properties);
  }

  async findMovie(title) {
    const res = await this.run(
      `MATCH (m:Movie {title: $title}) RETURN m`,
      { title }
    );
    return res.records.map(r => r.get('m').properties);
  }

  async findUserRatings(userName) {
    const res = await this.run(
      `MATCH (u:User {name: $userName})-[r:RATED]->(m:Movie)
       RETURN u, r, m`,
      { userName }
    );
    return res.records.map(r => ({
      user:   r.get('u').properties,
      rating: r.get('r').properties,
      movie:  r.get('m').properties,
    }));
  }

  // ────────────────────── Utility ──────────────────────

  async clearDatabase() {
    await this.run('MATCH (n) DETACH DELETE n');
    console.log('  Base de datos limpiada.');
  }
}

export function getService() {
  return new Neo4jService();
}
