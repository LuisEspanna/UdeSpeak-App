# Udespeak

Udespeak es una aplicación móvil creada para aprender y practicar otros idiomas, inicialmente será probada con el primer nivel de **Inglés (A1)**, Udespeak cuenta con una base de datos no relacional y todos los servicios de autenticación, almacenamiento de imagenes y audio están configurados dentro de Google Firebase.

Udespeak necesita de otros programas para funcionar:

* Udespeak-Admin: Aplicación para editar el contenido de la aplicación móvil Udespeak.
* Udespeak-server: Servicio creado con **Flask** Python el cual cuenta con un modelo de IA para realizar la transcripción de audio a texto (Whisper IA), además del modelo de modelo de eliminación de ruido, preferiblemente montar el la imagen docker para evitar problemas de compatibilidad.


# Ejecutar el proyecto
```sh
npx react-native start
npx react-native run-android
```

## Capturas

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgZhHhkNJJsO84N_61tDeY2TeM2wBZ9QuE9lPIAvRc-091xgS7MaqHqil8KOQdMFx1Dn4IclnsAamgVUw4qdpkYYhGhXfiJN-J1A-LpmNhHp2IgGiTaMBClCy8EVWC7Uac1PJaLx6L8m_6jBpwZrQMbY-HRDdqFEWzebWh0KAmekb8XmcKkR7Seiz-xe-K9/s16000/captura%20udespeak%201.png)

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhv-8UXr6hDuGEoZtAfSeylMgVmdRhbjnosd9_WECwkN_1fGcXy2RkSqVpPliOWW6RYlPwxnxjs3IF0m3HAeWiOsA5w1ekuMpw0woyPfg7QbCmdmdjRtaRCe_-vHanb8A5Ti5c04BTjUVsNgNYayPJVakCazqNisj9vCRjc-urBIibun4XqyiOH2zidlO_7/s16000/captura%20udespeak%202.png)

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgYSlwk4ZK9Cw4XJGxFj1Ie7oy0zk1fzE0WjDpcIJbv9cc9xt_SVMjQq_uQskObi1sEx6LhYCDVPuLM5Uh4SRxZAf_nUnG7ybb1valNvXTYEOzLNa50BqBHEq9JNMrMoeoNdewfyL715vVPDX2oFXbJyKISB0Xx30qdamtBXEnRtUZAoK4yRmM5cvQqcmYJ/s16000/captura%20udespeak%203.png)


### Firebase login config
https://www.pradipdebnath.com/2020/10/06/how-to-implement-google-login-in-react-native-with-firebase/