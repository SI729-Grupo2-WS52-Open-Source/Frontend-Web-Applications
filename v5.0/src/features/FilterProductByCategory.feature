Feature: Barra de búsqueda de productos

  Scenario 1: Buscar un producto por su nombre
    Given que soy un usuario en la página principal de Akira
    When ingreso el nombre de un producto en la barra de búsqueda
    And presiono el botón de búsqueda
    Then se muestran los resultados de búsqueda relacionados con el nombre del producto ingresado
    And puedo ver los productos que coinciden con el nombre buscado