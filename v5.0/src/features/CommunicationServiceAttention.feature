Feature: Seguimiento del envío de productos

  Scenario 1: Seguimiento del envío
    Given que soy un usuario que ha realizado un pedido en Akira
    When accedo a la sección de seguimiento de envío en mi cuenta
    Then puedo ver el estado actual del envío de mis productos

  Scenario 2: Notificaciones de actualización de envío
    Given que soy un usuario que ha realizado un pedido en Akira
    When se produce una actualización en el estado de envío de mis productos
    Then recibo notificaciones o correos electrónicos informativos