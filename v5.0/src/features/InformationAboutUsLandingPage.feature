Feature: Sección "Acerca de nosotros" en la landing page

  Scenario 1: Sección "Acerca de nosotros" en la landing page
    Given que soy un usuario interesado en el startup Lambders
    When visito la landing page de Lambders
    Then espero encontrar una sección claramente visible titulada "Acerca de nosotros"
    And veo una descripción completa de Lambders
    And noto que se presentan los valores fundamentales de Akira, resaltando los principios éticos y la cultura empresarial