## Ego-Lifting

El proyecto se realizo utilizando Next. Js. Se utiliza Supabase para la base de datos y la autenticacion. Permite crear rutinas de ejercicios y llevar un seguimiento de los entrenamientos realizados. Se puede registrar un usuario con email y contraseña o utilizando una cuenta de Google. Ademas se permite restablecer la contraseña de un usuario en caso de olvidarla.
Para facilitar el testeo se agrego un usuario de prueba:
email: a@yopmail.com
password: 12345678

## Main Page
La pagina principal muestra un saludo, el nombre del usuario y los entrenamientos. Ademas, se muestra el entramiento del dia de hoy en un tamaño mayor al del resto y se permite buscar entrenamientos por nombre. A la hora de guardar el entrenamiento se le asocia una imagen al azar obtenida utilizando la api de Unsplash o se coloca una por defecto en caso de que halla algun error.

![Mainpage-desktop](https://user-images.githubusercontent.com/99894603/228595455-9dd7a442-a55c-4da0-acc4-5620032e2b4d.jpg) ![Mainpage](https://user-images.githubusercontent.com/99894603/228594766-ff2eeba7-5edf-4ec6-b194-f28727efbe53.jpg)

Mobile y Desktop


## Exercises
La pagina de ejercicios muestra una lista con todos los ejercicios disponibles. La list se carga a medida que el usuario scrollea hacia abajo para evitar problemas de rendimiento. Se permite buscar ejercicios por nombre y al seleccionar un ejercicio especifico se muestran detalles del mismo. Entre los detalles se incluye el peso maximo que se realizo en dicho ejercico, que se actualiza en caso de que se supere en un nuevo entrenamiento y a su vez se calcula el 1RM y se muestra el set con mejor volumen de entre los entrenamientos de un usuario.

![Exercises](https://user-images.githubusercontent.com/99894603/228603214-778917c1-4a85-46a2-99d8-65b4762ea076.jpg) ![BenchPress](https://user-images.githubusercontent.com/99894603/228603594-ba417bf3-228f-4ca3-bddd-3b1e60d20075.jpg)


## Profile Page
La pagina de perfil muestra 3 rutinas predeterminadas y a su vez permite acceder a las rutinas personalizadas creadas por el usuario. Las rutinas creadas por un usuario se almacenan utilizando Supabase. Tambien permite acceder a la seccion de crear rutinas y a la seccion para editar el perfil.

![ProfilePage](https://user-images.githubusercontent.com/99894603/228597713-c2fc2e3a-de1f-4791-893d-5ad4740525a3.jpg)

La seccion para editar el perfil permite cambiar el nombre de usuario o la imagen de perfil. Se puede previsualizar la imagen antes de guardar los cambios y la nueva imagen se almacena en Supabase sobreescribiendo a la imagen anterior.

![EditProfile](https://user-images.githubusercontent.com/99894603/228599364-e9ff380c-ef78-4142-9510-a307c7cc94fc.jpg)

## Workout
La pagina de un entrenamiento muestra el nombre de la rutina elegida en la parte superior, junto con el tiempo transcurrido, la cantidad de sets realizados hasta el momento y el volumen (CantidadDeReps x Peso). A su vez se permite agregar mas sets durante el entrenamiento o eliminar algun set deslizando el mismo hacia la izquierda.
Tambien se pueden agregar otros ejercicios a la rutina o eliminar alguno en caso de cambiar de opinion.

![WorkoutPage](https://user-images.githubusercontent.com/99894603/228600805-7ff20bf8-3250-485a-a148-7fcab981ea0f.jpg)   ![ExerciseDelete](https://user-images.githubusercontent.com/99894603/228602143-719edaba-656f-4662-b2fe-40de997d8a6c.jpg)
