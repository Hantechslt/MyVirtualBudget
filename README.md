# MyVirtualBudget

MyVirtualBudget es una aplicación móvil desarrollada en React Native que ayuda a las personas a gestionar sus finanzas mediante un sistema de presupuesto.

## Índice

- [Instalación en Windows](#instalación-en-windows)
  - [Dependencias necesarias](#dependencias-necesarias)
  - [Instalación de Gradle](#instalación-de-gradle)
  - [Instalación de Android Studio](#instalación-de-android-studio)
  - [Variables de entorno](#variables-de-entorno)
  - [Clonar el repositorio](#clonar-el-repositorio)
  - [Ejecución](#ejecución)

## Instalación en Windows

### Dependencias necesarias

Antes de comenzar, asegúrate de tener las siguientes dependencias instaladas:

- [Java 11](https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html)
- [Gradle 8.0.1](https://gradle.org/releases/)
- [Android Studio](https://developer.android.com/studio?gclid=Cj0KCQjwj5mpBhDJARIsAOVjBdoOuW9SuQzIDIE7sdQDlY_xLLC0Th_Awm2rIHfg5GjX0KjJZAvhxs4aAnsoEALw_wcB&gclsrc=aw.ds)
- [git](https://git-scm.com/)
- [github desktop](https://desktop.github.com/) (opcional)

### Instalación de Gradle

Sigue las instrucciones en el enlace proporcionado para instalar Gradle.

### Instalación de Android Studio

Una vez instalado Android Studio, realiza los siguientes pasos:

1. Abre Android Studio.
2. Ve a `File -> Settings -> Languages and Frameworks -> Android SDK`.
3. En la parte inferior derecha de la ventana, haz clic en "Show Package Details".
4. Busca e instala "Android 13.0 ("Tiramisu")".
5. Selecciona las siguientes opciones:
   - Intel x86 Atom_64 System Image
   - Google APIs Intel x86 Atom System Image
6. Aplica los cambios.

Asegúrate de verificar la versión de Gradle:

1. Ve a `File -> Project Structure -> Project`.
2. Si la versión de Gradle no es 8.0.1, selecciona o descarga la versión adecuada (ver punto 2).

### Variables de entorno

Es importante configurar las siguientes variables de entorno:

1. `ANDROID_HOME`: Normalmente se encuentra en `C:\Users\User\AppData\Local\Android\Sdk`. Agrégala como una variable de entorno siguiendo [estas instrucciones](https://developer.android.com/studio/command-line/variables?hl=es-419). Además, asegúrate de agregar las siguientes rutas a la variable `Path`:
   - `%ANDROID_HOME%\tools`
   - `%ANDROID_HOME%\tools\bin`
   - `%ANDROID_HOME%\tools\platform-tools`
   - `%ANDROID_HOME%\cmdline-tools\latest\bin`

2. `JAVA_HOME`: Normalmente se encuentra en `C:\Program Files\Java\jdk-11`. Configura esta variable siguiendo [estas instrucciones](https://confluence.atlassian.com/doc/setting-the-java_home-variable-in-windows-8895.html). Además, asegúrate de agregar la siguiente ruta a la variable `Path`:
   - `%JAVA_HOME%\bin`

### Clonar el repositorio
1. git clone https://github.com/Hantechslt/MyVirtualBudget.git
2. puedes utilizar la interfaz de github desktop para hacer de forma facil-
    - Ve a `File -> Clone a repository -> URL`.
    - Colocar la URL proporcionada en el punto 1 y presionar el boton de clonar. 
    - Asegurate que la ruta para almacenar el repositorio no tenga espacios en el nombre. 

### Ejecución

Asegúrate de que tu teléfono esté en modo de desarrollador con la depuración USB activada o que tu emulador esté debidamente configurado. Luego, ejecuta los siguientes comandos de npm:

1. npm install
2. npx react-native run-android

## Algunos comandos utiles 
   1. `npm dedupe` utilizado para reconstruir el arbol de dependencias cuando hay conflicto. 
   2. `Remove-Item -Path "package-lock.json" -Force ; Remove-Item -Path ".\node_modules" -Force -Recurse; npm install ; npm dedupe ; Remove-Item -Path $env:TEMP\metro-* -Force -Recurse;npm cache clean --force; npm run local-start` este comando se utiliza como ultimo recurso cuando las dependencias no funcionan y se requiere hacer una limpieza general. 
   3. `mkdir android/app/src/main/assets` y `react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res` este comando funciona para agregar todo la funcionalidad al archivo index.android.bundle esto para que android studio tome los cambios para crear el APK
   4. `./gradlew clean;./gradlew build;./gradlew --refresh-dependencies; ./gradlew assembleDebug` se utilizan para hacer una limpieza y recontrucción de gradle. 
      - `./gradlew clean`: Limpia el proyecto, eliminando archivos generados previamente.
      - `./gradlew build`: Compila el proyecto, incluyendo la generación de un archivo de instalación de la aplicación.
      - `./gradlew --refresh-dependencies`: Actualiza las dependencias del proyecto desde los repositorios definidos.
      - `./gradlew assembleDebug`: Genera una versión de depuración de la aplicación, lista para pruebas y desarrollo.