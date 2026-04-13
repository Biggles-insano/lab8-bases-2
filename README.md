# Laboratorio: aplicaciones con Neo4j

**Universidad del Valle de Guatemala**  
**CC3089 — Bases de Datos 2** · Laboratorio 08 · *Building Neo4j applications*

## Autores

- Pablo Cabrera  
- Samuel Mejía  
- Luis Palacios  

## Objetivo del trabajo

Se desarrolló una aplicación en **JavaScript (Node.js)** que se conecta a una base de datos **Neo4j AuraDB** mediante el driver oficial **neo4j-driver**. El propósito es modelar un grafo de propiedades con nodos y relaciones parametrizados, expresados en **Cypher**, y documentar el comportamiento mediante un informe con capturas de pantalla.

## Contenido desarrollado

### Modelo de datos

- **Nodos:** `User`, `Movie`, `Person`, `Genre`.  
- **Relaciones:** `RATED` (usuario → película, con puntuación y marca de tiempo), `ACTED_IN` y `DIRECTED` (persona → película, con rol), `IN_GENRE` (película → género).

### Incisos del laboratorio

1. **Funciones de construcción del grafo:** abstracción en forma de métodos que reciben parámetros para crear y actualizar nodos y relaciones (clase `Neo4jService` en `service.js`).  
2. **Población inicial:** cinco usuarios; cada uno califica al menos dos películas distintas (`inciso1y2.js`).  
3. **Consultas de lectura:** búsqueda de usuario por nombre, de película por título y recuperación de relaciones `RATED` entre un usuario y las películas calificadas (`inciso3.js`, métodos en `service.js`).  
4. **Grafo ampliado:** instancia completa con propiedades alineadas al esquema del enunciado (personas como actores y directores, géneros, y el conjunto de relaciones indicado) (`inciso4.js`).

### Documentación complementaria

Las evidencias gráficas y de ejecución se recopilaron en el archivo **`Capturas_Incisos_1-4_y_grafos.pdf`**.

## Estructura del repositorio

| Archivo | Descripción |
|---------|-------------|
| `service.js` | Definición de `Neo4jService`: conexión, creación de nodos y relaciones, consultas y utilidades. |
| `inciso1y2.js` | Script correspondiente a los incisos 1 y 2. |
| `inciso3.js` | Script correspondiente al inciso 3. |
| `inciso4.js` | Script correspondiente al inciso 4. |
| `package.json` | Metadatos del proyecto y dependencias. |

## Dependencia principal

- **neo4j-driver** — cliente oficial para bases de datos Neo4j.