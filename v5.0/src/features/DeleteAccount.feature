Feature: Eliminar permanentemente la cuenta

  Scenario 1: Eliminar permanentemente la cuenta
    Given que soy un usuario autenticado en Akira
    When accedo a la configuración de mi cuenta
    And selecciono la opción de eliminar permanentemente mi cuenta
    Then se me muestra una confirmación para asegurarme de mi decisión
    And al confirmar, mi cuenta y todos mis datos asociados se eliminan de forma permanente de Akira