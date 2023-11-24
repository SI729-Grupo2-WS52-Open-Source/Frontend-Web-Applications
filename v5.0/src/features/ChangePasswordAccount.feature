Feature: Cambiar contraseña de la cuenta

  Scenario 1: Cambiando la contraseña de la cuenta
    Given que soy un usuario con sesión iniciada en la aplicación
    When navego hacia la sección de configuración de la cuenta o "Mi cuenta"
    And selecciono la opción para cambiar mi contraseña
    Then debería ver un formulario donde pueda ingresar mi contraseña actual y la nueva contraseña deseada
    And al guardar los cambios, mi contraseña debería actualizarse correctamente y ser válida para futuras sesiones de inicio de sesión