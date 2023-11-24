Feature: Creación de cuenta en Akira

  Scenario 1: Creando una nueva cuenta
    Given que soy un nuevo usuario en el sitio web de Akira
    When hago clic en el botón "Registrarse"
    Then debería ser dirigido a la página de creación de cuenta
    And debería poder ingresar mis datos personales, como nombre, correo electrónico, contraseña
    And al enviar exitosamente, se debería crear mi cuenta