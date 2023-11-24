Feature: Modificar la dirección de envío

  Scenario 1: Modificar la dirección de envío
    Given que soy un usuario autenticado en Akira
    When accedo a la configuración de mi cuenta
    And selecciono la opción de modificar mi dirección de envío
    Then se me permite editar mi dirección de envío
    And la dirección de envío en mi perfil se actualiza con la nueva dirección ingresada

  Scenario 2: Verificar la dirección de envío modificada
    Given que soy un usuario autenticado en Akira
    When accedo a la configuración de mi cuenta
    And verifico la sección de dirección de envío
    Then puedo confirmar que la dirección de envío se ha modificado correctamente
    And puedo asegurarme de que los futuros pedidos se enviarán a la nueva dirección especificada