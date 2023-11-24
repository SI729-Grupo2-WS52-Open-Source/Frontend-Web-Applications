Feature: Cierre de sesión en la cuenta

  Scenario 1: Cerrando sesión en la cuenta
    Given que soy un usuario con sesión iniciada en la aplicación
    Then debería ser redirigido a la página de inicio de sesión
    And debería recibir una confirmación de que mi sesión se ha cerrado correctamente
