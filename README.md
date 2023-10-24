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
- [nodejs](https://nodejs.org/es/download)
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
   - `npm dedupe`: Resuelve y elimina duplicados de las dependencias en el archivo package.json. Ayuda a optimizar y simplificar la estructura de dependencias.
   - `Remove-Item -Path "package-lock.json" -Force; Remove-Item -Path ".\node_modules" -Force -Recurse; npm install; npm dedupe; Remove-Item -Path $env:TEMP\metro-* -Force -Recurse; npm cache clean --force; npx react-native run-android -- --reset-cache`: Este conjunto de comandos realiza varias acciones, como eliminar el archivo package-lock.json, eliminar la carpeta node_modules y luego reinstalar las dependencias, ejecutar npm dedupe para resolver duplicados, eliminar archivos temporales de Metro Bundler (usado en React Native), limpiar la memoria caché de npm y finalmente iniciar la aplicación.
   - `mkdir android/app/src/main/assets`: Crea un directorio en la estructura del proyecto de Android donde se colocarán los activos de la aplicación.
   - `react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`: Este comando genera un archivo de paquete JavaScript (bundle) optimizado para producción y lo coloca en la carpeta de activos de la aplicación de Android. También copia los recursos necesarios. 
   - `./gradlew clean`: Limpia el proyecto, eliminando archivos generados previamente.
   - `./gradlew build`: Compila el proyecto, incluyendo la generación de un archivo de instalación de la aplicación.
   - `./gradlew --refresh-dependencies`: Actualiza las dependencias del proyecto desde los repositorios definidos.
   - `./gradlew assembleDebug`: Genera una versión de depuración de la aplicación, lista para pruebas y desarrollo.
   - `npx react-native start --reset-cache`: Limpiar cache de CLI METRO

## Huella digital de la aplicación en debug/release. 
   - Variant: debug/release
   - Alias: androiddebugkey 
   - MD5: `20:F4:61:48:B7:2D:8E:5E:5C:A2:3D:37:A4:F4:14:90`
   - SHA1: `5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25`
   - SHA-256: `FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C`
   - Valid until: martes, 30 de abril de 2052
