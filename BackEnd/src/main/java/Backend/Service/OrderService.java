package Backend.Service;

import Backend.DTO.OrderDTO;
import Backend.DTO.OrderResponseDTO;
import Backend.Model.Order;
import org.springframework.stereotype.Component;

@Component
public interface OrderService {
    Order readById(Long id);
    OrderResponseDTO addOrder(OrderDTO orderDTO);
    Order update(Order order);
    void cancelOrder(Long id);
}