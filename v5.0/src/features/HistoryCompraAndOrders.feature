Feature: Visualizar historial de compras y pedidos

  Scenario 1: Visualizando historial de compras y pedidos
    Given que soy un usuario con sesión iniciada en la aplicación
    When navego hacia la sección de historial de compras o pedidos en mi perfil
    Then debería ver una lista de mis pedidos pendientes
    And para cada pedido, debería poder ver información relevante como el número de pedido, estado del pedido, detalles de los productos comprados, etc.