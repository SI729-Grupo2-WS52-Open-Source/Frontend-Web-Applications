Feature: Ver información detallada del producto

  Scenario 1: Ver información detallada del producto
    Given que soy un usuario en la página de un producto en Akira
    When visualizo la información del producto
    Then puedo ver las especificaciones detalladas del producto 
    And puedo ver fotos referenciales del producto para tener una idea clara de su apariencia, para tomar una decisión informada sobre la compra del producto.