# Education-App
--------------------------

# SERVER

# Auth

## Signup

| METHOD |        URL       |                 DESCRIPTION                     |
|--------|------------------|-------------------------------------------------|
| POST |  api/auth/register         |  Formulario de registro                         |

## Login

| METHOD |        URL       |                 DESCRIPTION                     |
|--------|------------------|-------------------------------------------------|
| POST |  api/auth/login            |  Formulario de inicio de sesión         |


## Verify

| METHOD |        URL       |                 DESCRIPTION                     |
|--------|------------------|-------------------------------------------------|
| GET   | api/auth/verify         |  Formulario de verificación de sesión     |


# Courses

## List of Courses

| METHOD |        URL       |                 DESCRIPTION                     |
|--------|------------------|-------------------------------------------------|
|GET     |  api/courses/:search            |  Listado de cursos            |

## Details of each course

| METHOD |        URL       |                 DESCRIPTION                     |
|--------|------------------|-------------------------------------------------|
|GET     |  api/courses/details/:id   |  Detalles de un curso              |


## Create each course

| METHOD |        URL       |                 DESCRIPTION                     |
|--------|------------------|-------------------------------------------------|
|POST    |  api/courses/create   |  Creación de un curso              |

## Edit each course

| METHOD |        URL       |                 DESCRIPTION                     |
|--------|------------------|-------------------------------------------------|
|PUT    |  api/courses/edit/:id   |  Edición de un curso                     |


## Notes of each course

| METHOD |        URL       |                 DESCRIPTION                     |
|--------|------------------|-------------------------------------------------|
|POST    |  api/courses/note/:id   |  Notas sobre un curso                    |

## Delete each course

| METHOD |        URL       |                 DESCRIPTION                     |
|--------|------------------|-------------------------------------------------|
|DELETE    |  api/courses/delete/:id  |  Borrar  un curso                     |



#  Users

## List of Students

| METHOD |        URL       |                 DESCRIPTION                     |
|--------|------------------|-------------------------------------------------|
|GET     |  api/users/students  |  Listado de estudiantes                  |


## Details of each Student

| METHOD |        URL       |                 DESCRIPTION                     |
|--------|------------------|-------------------------------------------------|
|GET     |  api/users/students:id   |  Detalles de un estudiante              |

## Edit each Student

| METHOD |        URL       |                 DESCRIPTION                     |
|--------|------------------|-------------------------------------------------|
|POST    |  api/users/students/edit/:id   |  Edición de un estudiante         |

## List of Teachers

| METHOD |        URL       |                 DESCRIPTION                     |
|--------|------------------|-------------------------------------------------|
|GET     |  api/users/teachers  |  Listado de profesores                     |


## Details of each Teeacher

| METHOD |        URL       |                 DESCRIPTION                     |
|--------|------------------|-------------------------------------------------|
|GET     |  api/users/teachers/:id   |  Detalles de un profesor/a         |

## Edit each Student

| METHOD |        URL       |                 DESCRIPTION                     |
|--------|------------------|-------------------------------------------------|
|PUT    |  api/users/teachers/edit/:id   |  Edición de un profesor/a           |


## Delete each User (student/teacher)

| METHOD |        URL       |                 DESCRIPTION                     |
|--------|------------------|-------------------------------------------------|
|DELETE  |  api/users/delete/:id  |  Borrar  un usuario/a                     |






