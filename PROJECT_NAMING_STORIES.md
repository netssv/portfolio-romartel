# Project Naming Stories & Strategic Narrative Guide

Este documento está diseñado como una plantilla estructurada donde puedes documentar la historia, origen y el "por qué" detrás del nombre de cada uno de tus proyectos. Además, incluye sugerencias de narrativa y posicionamiento estratégico para entrevistas y clientes.

---

## 1. FIFA World Cup 2026 AI Lab

* **Categoría:** Machine Learning & Data Analytics
* **Stack:** Python, Random Forest, Poisson Distribution, Next.js, TypeScript
* **Repositorio:** [github.com/netssv/fifa-world-cup-2026-predictor](https://github.com/netssv/fifa-world-cup-2026-predictor)
* **Demo en Vivo:** [fifa2026worldcup.vercel.app](https://fifa2026worldcup.vercel.app/)

### ¿Por qué se llama así? (Tu Historia / Razón)
Es un proyecto personal donde intento predecir los resultados de la copa del mundo de 2026. En un inicio era solo para mí, pero luego me animé a subirlo a internet. El nombre es simple, directo y describe lo que hace el proyecto, no hay mucho más misterio detrás. Es importante recalcar que es solo un hobby y no tengo intenciones de lucrar con esto, aunque para ser sincero sí gané unos cuantos dólares apostando con los resultados que me daba el modelo: acertó 6 de 10 partidos, y sobre todo acertó que el ganador de la copa del mundo de 2026 sería España. Hasta a mí me sorprendió lo acertado que fue, lo cual me hace pensar que este tipo de modelos tiene potencial real.

### Sugerencias & Ideas de Narrativa
* **El gancho técnico:** Resalta el término "AI Lab" como un laboratorio experimental de ciencia de datos donde combinas modelos probabilísticos (Poisson para goles) con ensamble supervisado (Random Forest para emparejamientos).
* **El ángulo de negocio:** "Demuestra cómo tomar datasets masivos de torneos históricos y convertirlos en simulaciones de 1,000,000 iteraciones Monte Carlo con visualización interactiva sin latencia".
* **Pregunta clave para entrevistas:** *"¿Por qué Monte Carlo?"* -> Porque los torneos cortos tienen alta varianza probabilística; simular miles de escenarios permite cuantificar probabilidades reales en lugar de una simple predicción determinista.

---

## 2. HODL Watcher

* **Categoría:** Quantitative Finance & Serverless Data Pipelines
* **Stack:** Python FastAPI, Make.com Cron, Render Cloud, React 19, Binance API
* **Repositorio:** [github.com/netssv/HODL_watcher](https://github.com/netssv/HODL_watcher)
* **Demo en Vivo:** [hodl-watcher.vercel.app](https://hodl-watcher.vercel.app/)

### ¿Por qué se llama así? (Tu Historia / Razón)
Surgió de una conversación con unos amigos a los que les gustan mucho las criptomonedas: me preguntaron si podía hacer una página que les mostrara en tiempo real las comisiones que se pagan por cada bloque en la red de Bitcoin. Así que se me ocurrió ir más allá y hacer una página que muestre en tiempo real múltiples métricas de redes blockchain, todo en un solo lugar. Además, integré múltiples APIs que funcionan como fallback unas de otras; por ejemplo, si la API de Binance no responde, se usa la de KuCoin, y así sucesivamente con las demás.

### Sugerencias & Ideas de Narrativa
* **El gancho técnico:** Combina el término de la cultura cripto ("HODL" / mantener posición a largo plazo) con "Watcher" (el perro guardián o centinela que vigila las comisiones del mempool y el order flow).
* **El ángulo de negocio:** "Es un ejemplo práctico de arquitectura serverless con $0 de costo mensual: un cron en Make.com que vigila la salud del sistema y mantiene caliente un microservicio en FastAPI evitando arranques en frío".
* **Pregunta clave para entrevistas:** *"¿Qué valor entrega?"* -> Transforma datos crudos de mercado en señales estructuradas y métricas on-chain en tiempo real sin requerir bases de datos costosas.

---

## 3. WhatHappened

* **Categoría:** Web Infrastructure, Security & Networking Triage
* **Stack:** Chrome Extensions Manifest V3, TypeScript, DNS over HTTPS (DoH), POSIX Terminal Emulator
* **Repositorio:** [github.com/netssv/whathappend](https://github.com/netssv/whathappend)
* **Chrome Web Store:** [Enlace a extensión](https://chromewebstore.google.com/detail/whathappened/jkohefabbnobompohkedfaodcnfdplom)

### ¿Por qué se llama así? (Tu Historia / Razón)
Surgió porque desde hace tiempo trabajo con páginas web, y por lo general uno nota que un sitio está caído o lento, pero no sabe por qué. Así que se me ocurrió hacer una extensión que muestre en tiempo real múltiples métricas de red, como el tiempo de respuesta, el estado del DNS, etc. Además, quería que permitiera simular una terminal dentro del navegador para hacer diagnósticos rápidos de la red y del servidor: que te diga si un certificado SSL está por vencer o si hay un bloqueo de IP, todo de forma segura tanto para el usuario como para la página.

### Sugerencias & Ideas de Narrativa
* **El gancho técnico:** *"WhatHappened"* representa la pregunta instantánea que se hace cualquier administrador de sistemas, DevOps o soporte cuando un sitio web se cae: "¿Qué pasó?".
* **El ángulo de negocio:** "Una navaja suiza en el navegador que elimina la necesidad de abrir terminales externas para diagnosticar problemas de propagación DNS, certificados SSL vencidos o headers HTTP".
* **Pregunta clave para entrevistas:** *"¿Por qué en Chrome MV3?"* -> Porque el nuevo estándar Manifest V3 impone restricciones estrictas de seguridad y rendimiento; implementarlo con un emulador POSIX demuestra dominio de arquitectura de extensiones modernas.

---

## 4. caniarun

* **Categoría:** Developer Tooling & Open-Source AI Hardware Profiler
* **Stack:** Python CLI, PyPI Package, CUDA / VRAM Profiling, GGUF Quantization Matrix
* **Repositorio:** [github.com/netssv/can_ia_run](https://github.com/netssv/can_ia_run)
* **PyPI:** [pypi.org/project/caniarun](https://pypi.org/project/caniarun/)

### ¿Por qué se llama así? (Tu Historia / Razón)
Es un juego de palabras con el clásico "Can You Run It" de los videojuegos, adaptado a la era de la Inteligencia Artificial local: *"Can I Run [this AI model]?"* (`can-ia-run` / `caniarun`). Se me ocurrió cuando andaba probando modelos de lenguaje en mi propia máquina y me cansé de descargar modelos gigantes solo para darme cuenta después de que no me iban a correr bien. El nombre ya suena un poco desactualizado para lo rápido que cambia el ecosistema de IA local, pero se mantiene porque sigue dando una idea clara de lo que hace el proyecto.

### Sugerencias & Ideas de Narrativa
* **El gancho técnico:** Juego de palabras con el clásico "Can You Run It" (de videojuegos), adaptado a la era de Inteligencia Artificial local: *"Can I Run [this AI model]?"* (`can-ia-run` / `caniarun`).
* **El ángulo de negocio:** "Resuelve la frustración común de descargar modelos LLM de 20 GB en HuggingFace solo para descubrir que la GPU no tiene suficiente VRAM. `caniarun` perfila el hardware en 1 segundo y categoriza la compatibilidad según el nivel de cuantización (Q4, Q8, FP16)".
* **Pregunta clave para entrevistas:** *"¿Cómo lo distribuiste?"* -> Empaquetado y publicado directamente en el índice oficial de paquetes de Python (PyPI) con soporte para detección de hardware multiplataforma.

---

## 5. btkey_sync

* **Categoría:** Systems Automation, OS Internals & Bluetooth LE
* **Stack:** Python, Windows Registry Extraction, Linux BlueZ Configuration, BLE Cryptography
* **Repositorio:** [github.com/netssv/btkey_sync](https://github.com/netssv/btkey_sync)
* **PyPI:** [pypi.org/project/Btkey-Sync](https://pypi.org/project/Btkey-Sync/)

### ¿Por qué se llama así? (Tu Historia / Razón)
Mi computadora trabaja en dual-boot con Windows y Linux. Uso Windows en mi día a día con mi teclado y mouse, y con el tiempo me cansé de que cada vez que entraba a Linux tenía que volver a emparejar el teclado y el mouse, porque Windows no guarda las claves Bluetooth en un formato que Linux pueda entender, y viceversa. Así que se me ocurrió hacer un script que automatizara el proceso de sincronización de claves Bluetooth entre ambos sistemas.

### Sugerencias & Ideas de Narrativa
* **El gancho técnico:** Nombre conciso y autodescriptivo: sincronizador de claves criptográficas de Bluetooth (`Bluetooth Key Sync`).
* **El ángulo de negocio:** "Elimina por completo la fricción de tener que reemparejar teclados, ratones o auriculares cada vez que alternas entre particiones Windows y Linux en un entorno dual-boot de trabajo".
* **Pregunta clave para entrevistas:** *"¿Qué dificultad técnica tiene?"* -> Las claves LTK en Windows están protegidas a nivel del subsistema `SYSTEM` del registro. El script automatiza la extracción segura, el formateo endian y la inyección en los archivos de configuración de BlueZ en Linux.

---

## 6. Rebusca

* **Categoría:** Mobile Application & Web Scraping