# Google Ads Campaign Plan - Cerrajeria Clavem

Plan aplicado al sitio `https://www.cerrajeriaclavem.com.ar` y a sus landings actuales:

- `/cerrajero-urgente-caba`
- `/apertura-de-puertas`
- `/cambio-de-cerraduras`

Nota: este plan no usa datos reales de Keyword Planner porque el entorno no tiene conectado el MCP/API de Google Ads. Antes de activar, validar volumen, CPC y competencia en Google Ads para CABA.

## Objetivo

Generar llamadas y consultas por WhatsApp de personas en CABA con intencion urgente o comercial para servicios de cerrajeria:

- Cerrajero urgente 24 horas
- Apertura de puertas
- Cambio, reparacion e instalacion de cerraduras
- Cerrajeria automotriz
- Cajas fuertes y seguridad

Conversiones principales:

- Click en telefono: `tel:1136219993`
- Click en WhatsApp: `https://wa.me/5491136219993`
- Click en Google Maps desde anuncios o sitio

Conversiones secundarias:

- Visita a pagina de contacto
- Click en Instagram

## Configuracion Recomendada

```yaml
account:
  business: Cerrajeria Clavem
  country: Argentina
  currency: ARS
  language: es

targeting:
  primary_location: Ciudad Autonoma de Buenos Aires
  radius_priority:
    - Palermo
    - Almagro
    - Villa Crespo
    - Recoleta
    - Balvanera
    - Caballito
    - Belgrano
    - Colegiales
  location_setting: Personas en mis ubicaciones objetivo
  exclude_setting: Personas interesadas pero fuera de mis ubicaciones

schedule:
  urgent_campaign: 24/7
  non_urgent_campaigns: 08:00-22:00

networks:
  search: true
  search_partners: false
  display: false
```

## Presupuesto Inicial

Distribucion sugerida para iniciar con control:

| Campana | Presupuesto diario | Prioridad |
| --- | ---: | --- |
| Emergencias 24hs | ARS 12.000-20.000 | Alta |
| Apertura de puertas | ARS 6.000-10.000 | Alta |
| Cambio de cerraduras | ARS 5.000-8.000 | Media |
| Marca y Maps | ARS 2.000-4.000 | Alta defensiva |
| Competidores | ARS 2.000-4.000 | Test |

Si el presupuesto es bajo, empezar solo con `Emergencias 24hs` y `Apertura de puertas`.

## Campana 1: Emergencias 24hs CABA

```yaml
campaign:
  name: Clavem - Search - Urgencias 24hs CABA
  type: SEARCH
  landing_page: /cerrajero-urgente-caba
  bidding:
    launch: Maximize Conversions
    after_30_conversions_month: Target CPA
  schedule: 24/7
```

### Ad Group: Cerrajero Urgente

Keywords:

- [cerrajero urgente]
- [cerrajero urgente caba]
- [cerrajero urgente buenos aires]
- [cerrajero 24 horas]
- [cerrajero 24 hs caba]
- "cerrajero urgente cerca de mi"
- "cerrajeria 24 horas"
- "cerrajeria de emergencia"
- "cerrajero a domicilio urgente"

RSA headlines:

1. Cerrajero Urgente CABA
2. Cerrajeria 24 Horas
3. Llamanos Ahora
4. Atencion Inmediata
5. Llegamos Rapido
6. Clavem Cerrajeria
7. Servicio Garantizado
8. Cerrajero A Domicilio
9. Emergencias 24/7
10. Presupuesto Por Telefono
11. Tecnicos Con Experiencia
12. En Palermo Y CABA
13. Solucion En El Acto
14. WhatsApp 24hs
15. Cerrajeria De Confianza

RSA descriptions:

- Cerrajeria Clavem atiende urgencias 24 horas en CABA. Llama ahora y coordinamos la visita.
- Aperturas, cambios de combinacion, autos y cajas fuertes. Servicio profesional y rapido.
- Estamos en Jeronimo Salguero 1061. Atencion por telefono y WhatsApp todos los dias.
- Presupuesto estimado por telefono. Tecnicos con experiencia y trabajos garantizados.

Display path:

- `cerrajero`
- `urgente`

## Campana 2: Apertura de Puertas

```yaml
campaign:
  name: Clavem - Search - Apertura de Puertas CABA
  type: SEARCH
  landing_page: /apertura-de-puertas
  bidding:
    launch: Maximize Conversions
    mature: Target CPA
```

### Ad Group: Apertura Sin Llave

Keywords:

- [apertura de puertas]
- [apertura de puertas caba]
- [abrir puerta trabada]
- [cerrajero apertura puerta]
- "abrir puerta sin llave"
- "me quede afuera de casa"
- "llaves adentro puerta"
- "puerta cerrada con llave"
- "apertura de cerraduras"

RSA headlines:

1. Apertura De Puertas
2. Abrimos Sin Roturas
3. Cerrajero En CABA
4. Llamanos Ahora
5. Atencion 24 Horas
6. Servicio En El Dia
7. Tecnicos Especializados
8. Puertas Trabadas
9. Llaves Adentro
10. Clavem Cerrajeria
11. Presupuesto Rapido
12. Puertas Y Cerraduras
13. Servicio Garantizado
14. Consulta Por WhatsApp
15. Cerrajero A Domicilio

RSA descriptions:

- Apertura de puertas residenciales y comerciales en CABA. Tecnicas cuidadosas y servicio profesional.
- Si te quedaste afuera o la cerradura se trabo, llamanos. Atencion rapida todos los dias.
- Trabajamos con puertas blindadas, blindex, portones y rejas. Consulta por telefono o WhatsApp.
- Cerrajeria Clavem: local en Jeronimo Salguero 1061 y servicio a domicilio en CABA.

Display path:

- `apertura`
- `puertas`

## Campana 3: Cambio de Cerraduras

```yaml
campaign:
  name: Clavem - Search - Cambio de Cerraduras CABA
  type: SEARCH
  landing_page: /cambio-de-cerraduras
  bidding:
    launch: Maximize Conversions
    mature: Target CPA
```

### Ad Group: Cambio e Instalacion

Keywords:

- [cambio de cerraduras]
- [cambio de cerraduras caba]
- [instalacion de cerraduras]
- [reparar cerradura caba]
- "cerraduras de alta seguridad"
- "cambiar cilindro cerradura"
- "cerrajero cambio cerradura"
- "cerradura trabada reparacion"
- "instalar cerradura puerta"

RSA headlines:

1. Cambio De Cerraduras
2. Instalacion En CABA
3. Cerraduras De Seguridad
4. Pedir Presupuesto
5. Envia Foto Por WhatsApp
6. Repuestos Originales
7. Trabajo En El Dia
8. Servicio Garantizado
9. Cerrajeria Clavem
10. Tecnicos Especializados
11. Reparacion De Cerraduras
12. Cambio De Cilindros
13. Cerraduras Multimarca
14. Local En Palermo
15. Llamanos Ahora

RSA descriptions:

- Cambio, reparacion e instalacion de cerraduras en CABA. Atencion para hogares y comercios.
- Envia una foto por WhatsApp y recibe un presupuesto estimado. Trabajos con garantia.
- Trabajamos con Trabex, Prive, Sekur, cilindros, blindajes y cerraduras digitales.
- Si perdiste las llaves o hubo intento de forzado, te asesoramos y resolvemos en el dia.

Display path:

- `cambio`
- `cerraduras`

## Campana 4: Marca y Ubicacion

```yaml
campaign:
  name: Clavem - Search - Marca y Maps
  type: SEARCH
  landing_page: /
  bidding: Maximize Conversions
```

### Ad Group: Marca

Keywords:

- [clavem]
- [cerrajeria clavem]
- [cerrajeria 24 hs clavem]
- [cerrajeria clavem palermo]
- "clavem cerrajero"

RSA headlines:

1. Cerrajeria Clavem
2. Sitio Oficial
3. Cerrajeria 24 Horas
4. Llamar 11-3621-9993
5. Local En Palermo
6. Servicio A Domicilio
7. Atencion Por WhatsApp
8. Urgencias 24/7
9. Jeronimo Salguero 1061
10. Cerrajeria De Confianza

RSA descriptions:

- Cerrajeria Clavem en CABA. Urgencias 24 horas, aperturas y cambio de cerraduras.
- Estamos en Jeronimo Salguero 1061. Llama o escribi por WhatsApp para coordinar.

## Campana 5: Competidores y Alternativas

Usar presupuesto bajo y revisar terminos de busqueda con frecuencia. Evitar usar marcas registradas en el texto del anuncio.

### Ad Group: Alternativas

Keywords:

- "cerrajeria cerca de mi"
- "cerrajero cerca de mi"
- "cerrajero palermo"
- "cerrajeria palermo"
- "cerrajero almagro"
- "cerrajeria villa crespo"
- "cerrajero recoleta"
- "cerrajero caballito"

RSA headlines:

1. Cerrajero Cerca De Mi
2. Cerrajeria En CABA
3. Atencion 24 Horas
4. Clavem Cerrajeria
5. Llamanos Ahora
6. Servicio A Domicilio
7. Presupuesto Por Telefono
8. Local En Palermo
9. Trabajos Garantizados
10. Consulta Por WhatsApp

RSA descriptions:

- Cerrajeria en CABA con local en Palermo y servicio a domicilio. Urgencias 24 horas.
- Aperturas, cerraduras, autos y cajas fuertes. Consulta por telefono o WhatsApp.

## Negativas

### Account Level

- gratis
- free
- curso
- cursos
- trabajo
- empleo
- sueldo
- salario
- pdf
- tutorial
- como hacer
- mercado libre
- herramientas
- ganzuas comprar
- duplicadora
- llavero
- llaveros
- plantilla
- manual
- definicion
- imagenes

### Campaign Level - Urgencias

- programar mantenimiento
- mayorista
- fabrica
- proveedor

### Campaign Level - Cambio de Cerraduras

- precio cerradura sola
- comprar cerradura
- catalogo
- repuestos mayorista

## Extensiones

Sitelinks:

- Cerrajero Urgente 24hs -> `/cerrajero-urgente-caba`
- Apertura de Puertas -> `/apertura-de-puertas`
- Cambio de Cerraduras -> `/cambio-de-cerraduras`
- Contacto y Ubicacion -> `/#contacto`

Callouts:

- Atencion 24 Horas
- Presupuesto Por Telefono
- Servicio Garantizado
- Local En Palermo
- WhatsApp Disponible
- Tecnicos Con Experiencia

Structured snippets:

- Servicios: Aperturas, Cerraduras, Autos, Cajas Fuertes, Blindajes
- Zonas: Palermo, Almagro, Villa Crespo, Recoleta, Caballito, CABA

Call extension:

- `+54 11 3621-9993`

Location extension:

- Cerrajeria Clavem, Jeronimo Salguero 1061, CABA

## Puja y Optimizacion

Primeras 2-4 semanas:

- Usar `Maximize Conversions` si el tracking esta bien configurado.
- Si no hay conversiones configuradas, usar `Maximize Clicks` con limite de CPC mientras se implementa tracking.
- Separar urgencias 24/7 de servicios no urgentes para no mezclar CPA nocturno con CPA diurno.

Cuando haya 30+ conversiones mensuales:

- Pasar a `Target CPA`.
- Definir CPA objetivo por campana segun margen real.
- Subir presupuesto donde la tasa de llamadas calificadas sea mayor.

Ajustes sugeridos:

- +20% a +40% en radio cercano a Jeronimo Salguero 1061 si convierte mejor.
- +15% en horarios con mayor tasa de llamada atendida.
- -30% en horarios donde no se puedan atender llamadas rapidamente.
- Revisar mobile como prioridad: este rubro suele convertir por llamada desde celular.

## Reporte Semanal

```markdown
# Google Ads Report - Cerrajeria Clavem - {Rango}

| Campana | Spend | Clicks | Calls/WA | CPA | CTR | CPC |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Urgencias 24hs | ARS | | | ARS | % | ARS |
| Apertura Puertas | ARS | | | ARS | % | ARS |
| Cambio Cerraduras | ARS | | | ARS | % | ARS |
| Marca y Maps | ARS | | | ARS | % | ARS |

## Acciones
- Agregar negativas desde terminos de busqueda.
- Pausar keywords con gasto alto y cero llamadas calificadas.
- Duplicar anuncios con mejor CTR y probar variacion de CTA.
- Revisar llamadas perdidas y ajustar horarios.
- Mover presupuesto hacia campanas con mejor CPA y mejor calidad de consulta.
```

## Checklist Antes de Activar

- Crear conversiones de click en telefono y WhatsApp.
- Instalar Google Tag Manager o Google Ads tag.
- Vincular Google Business Profile para extensiones de ubicacion.
- Usar solo ubicacion real: personas en CABA, no interesadas en CABA.
- Confirmar que el telefono principal sea consistente en sitio y anuncios.
- Corregir inconsistencias de WhatsApp: el sitio usa `11-6524-9874` en contacto y `11-3621-9993` en floating/landings.
- Revisar textos con caracteres mal codificados antes de escalar trafico.
- Definir valor de conversion estimado para llamada o WhatsApp calificado.

## Proxima Iteracion Recomendada

1. Implementar tracking de eventos para `tel:` y `wa.me`.
2. Crear una landing especifica para `cerrajero automotriz CABA`.
3. Crear una landing especifica para `cajas fuertes CABA`.
4. Agregar schema y copy localizado por barrios de mayor prioridad.
5. Validar keywords y CPC en Keyword Planner antes de cargar presupuesto alto.
