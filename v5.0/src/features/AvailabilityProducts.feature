Feature: Filtrar productos por categoría

  Scenario 1: Filtrar productos por categoría
    Given que soy un usuario en la página principal de Akira
    When selecciono una categoría específica de productos
    Then se muestran solo los productos que pertenecen a esa categoría
    And puedo ver los productos filtrados según la categoría seleccionada