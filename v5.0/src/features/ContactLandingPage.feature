Feature: Sección de contacto en la landing page de Akira

  Scenario 1: Sección de contacto en la landing page de Akira
    Given que soy un usuario interesado en contactar con el equipo de Lambders
    When visito la landing page de Akira
    Then espero encontrar una sección claramente visible titulada "Contacto"
    And veo la información de contacto, como la dirección de correo electrónico y el número de teléfono del equipo de Akira
    And encuentro enlaces o botones que me permitan acceder a las redes sociales de Akira para obtener más opciones de contacto