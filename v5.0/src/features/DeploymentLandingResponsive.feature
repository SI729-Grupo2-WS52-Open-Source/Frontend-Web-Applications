Feature: Landing page responsive

  Scenario 1: Landing page responsive en pantalla de escritorio
    Given que soy un usuario que visita la landing page de Lambders desde mi computadora de escritorio
    When accedo a la página principal
    Then espero que la landing page se adapte automáticamente a la resolución de mi pantalla
    And veo que los elementos y secciones de la página se distribuyen de manera óptima en el espacio disponible
    And noto que el contenido se muestra de forma legible y clara, sin requerir desplazamiento horizontal excesivo
    And puedo interactuar con los elementos de la página, como botones y enlaces, de manera precisa y sin problemas

  Scenario 2: Landing page responsive en dispositivo móvil
    Given que soy un usuario que visita la landing page de Lambders desde mi teléfono móvil
    When ingreso a la página principal
    Then espero que la landing page se ajuste automáticamente a la resolución de mi pantalla móvil
    And veo que los elementos y secciones de la página se adaptan y reorganizan de manera óptima para una visualización móvil
    And el contenido se muestra de forma legible y clara, sin requerir zoom excesivo o desplazamiento horizontal
    And puedo interactuar fácilmente con los elementos de la página mediante gestos táctiles, como deslizamientos y toques