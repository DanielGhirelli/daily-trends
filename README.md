# Daily Trends
## Descripción
Se pide realizar un API (DailyTrends) que exponga un feed de noticias. Este feed es un agregador de noticias de diferentes periódicos. DailyTrends es un periódico que une las portadas de los periódicos número uno.
					
Cuando un usuario abre DailyTrends, se encuentra con las 5 noticias de portada de El País y El Mundo del día en el que lo abre, además se pueden añadir noticias a mano desde el API.

## Tareas previas
Crear un repositorio de GIT (Bitbucket, GitHub o similar) con acceso público.
Antes de empezar las tareas envíanos por e-mail el enlace del repositorio.
Haz los commits que consideres oportunos conforme vayas desarrollando las diferentes tareas (Mínimo un commit por tarea).

## Tareas a realizar
1. Crea un proyecto TypeScript con una arquitectura de ficheros que consideres apropiada.
2. Crea un modelo Feed y define sus atributos. El origen de datos tiene que ser MongoDB, por lo que puedes usar algún ODM.
3. Define los diferentes endpoints para gestionar los servicios CRUD del modelo Feed. Intenta desacoplar las capas del API lo máximo posible.
4. Crea un “servicio de lectura de feeds” que extraiga por web scraping (no lectura de fuentes RSS) en cada uno de los periódicos sus noticias de portada y que las guarde como Feeds. Esta es la parte donde más conceptos de orientación a objetos puedes usar y la más “compleja”, ponle especial atención.
## Otros detalles
1. Representa en un dibujo la arquitectura y las capas de la aplicación.
2. Usa todas las buenas prácticas que conozcas.
3. Demuestra conocimientos en programación orientada a objetos: abstracción, encapsulamiento, herencia y polimorfismo.
4. Haz los tests que consideres necesarios.

