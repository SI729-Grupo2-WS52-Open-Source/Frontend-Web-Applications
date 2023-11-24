Feature: Modificar el método de pago

  Scenario 1: Modificar el método de pago
    Given que soy un usuario autenticado en Akira
    When accedo a la configuración de mi cuenta
    And selecciono la opción de modificar mi método de pago
    Then se me permite editar mi tarjeta de crédito o débito
    And el método de pago en mi perfil se actualiza con la nueva tarjeta seleccionada

  Scenario 2: Verificar el método de pago modificado
    Given que soy un usuario autenticado en Akira
    When accedo a la configuración de mi cuenta
    And verifico la sección de métodos de pago
    Then puedo confirmar que el método de pago se ha modificado correctamente
    And puedo asegurarme de que los futuros pagos se realizarán con la nueva tarjeta especificada