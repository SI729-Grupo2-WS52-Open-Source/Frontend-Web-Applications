Feature: Inicio de sesión en la aplicación de Akira

  Scenario 1: Iniciando sesión en la aplicación
    Given que soy un usuario registrado de Akira
    When hago clic en el botón "Iniciar sesión" e ingreso mis datos
    Then la aplicación debería validar mis datos y otorgarme acceso a mi cuenta
    And debería ser redirigido al panel de control de mi cuenta o a la página principal de Akira